import fetch from 'node-fetch';
import tricksConfig from '../tricks.config.js';

const createDOMPurify = require('dompurify');
const {JSDOM} = require('jsdom');

/*
*
* Smart Variables Regex:
* */
const findTplRegex = /{{ *([a-zA-Z_\-]+) (.+?) *}( *[a-zA-Z-\d,\s]+ *)?}/g;

const codeBlockRegex = /```([\s\S]*?)```/g;
const inlineCodeRegex = /([^`])`([^`][^\n\r]*?)`([^`])/g;

exports.beforeParse = file => {
  if (file.extension !== '.md') {
    return
  }

  // Apply DOMPurify to text
  if (tricksConfig.sanitize) {
    const dom = new JSDOM(document.content);
    const window = dom.window;
    const DOMPurify = createDOMPurify(window);

    let fileData = file.data;
    fileData = fileData.replaceAll(codeBlockRegex, function (match, p1, offset, string) {
      const buff = Buffer.from(p1);
      return `\`\`\`${buff.toString('base64')}\`\`\``;
    });

    fileData = fileData.replaceAll(inlineCodeRegex, function (match, p1, p2, p3, offset, string) {
      const buff = Buffer.from(p2);
      return `${p1}\`${buff.toString('base64')}\`${p3}`;
    });

    fileData = DOMPurify.sanitize(fileData, {
      ADD_TAGS: ['iframe', 'video', 'audio', 'source', 'track', 'template'],
      ADD_ATTR: ['allowfullscreen', 'controls', 'src', 'type', 'width', 'height', 'poster', 'preload', 'autoplay', 'loop', 'muted', 'default', 'srcset'],
      USE_PROFILES: {
        html: true,
        svg: true,
        svgFilters: true,
      },
      CUSTOM_ELEMENT_HANDLING: {
        tagNameCheck: /^(tricks|smart|content)-/,
        attributeNameCheck: /.*/,
        allowCustomizedBuiltInElements: false,
      },
    });

    // DOMPurify encodes the markdown "note blocks"
    fileData = fileData.replace(/^&gt;/gm, '>');

    fileData = fileData.replaceAll(codeBlockRegex, function (match, p1, offset, string) {
      const buff = Buffer.from(p1, 'base64');
      return `\`\`\`${buff.toString('utf-8')}\`\`\``;
    });

    fileData = fileData.replaceAll(inlineCodeRegex, function (match, p1, p2, p3, offset, string) {
      const buff = Buffer.from(p2, 'base64');
      return `${p1}\`${buff.toString('utf-8')}\`${p3}`;
    });

    file.data = fileData;
  }

  // file.data = file.data.replace(/[^`]`([^`]+)`[^`]/g, '<tricks-copy-inline>$1</tricks-copy-inline>');
  file.data = file.data.replace(/\[ ] (.*)/g, '<smart-check variable="test" :value="1 === 2">$1</smart-check>');
  file.data = file.data.replace(/(\[x]|\[X]) (.*)/g, '<smart-check variable="test" :value="true">$2</smart-check>');
}


function buildContributorQuery(filePath) {
  return `{
  repository(owner: "luastan", name: "tricks-content") {
    object(expression: "master") {
      ... on Commit {
        history(first: 100, path: "${filePath.substring(1)}") {
          nodes {
            author {
              email
              name
              user {
                email
                name
                avatarUrl
                login
                url
              }
            }
          }
        }
      }
    }
  }
}`;
}


function buildDateQuery(filePath) {
  return `{
  repository(owner: "luastan", name: "tricks-content") {
    object(expression: "master") {
      ... on Commit {
        history(first: 1, path: "${filePath.substring(1)}") {
          edges {
            node {
              commitUrl
              committedDate
            }
          }
        }
      }
    }
  }
}`;
}

exports.beforeInsert = ghToken => (async (document, database) => {
  // Repo URL for edition
  const repoType = tricksConfig.repoType.toLowerCase();
  if (tricksConfig.repoURL) {
    if (repoType === 'github') {
      document.editURL = `${tricksConfig.repoURL}/edit/${tricksConfig.repoBranch}${document.path}${document.extension}`;
    } else if (repoType === 'gitlab') {
      document.editURL = `${tricksConfig.repoURL}/-/edit/${tricksConfig.repoBranch}${document.path}${document.extension}`;
    }
  }

  // Readme as top level
  if (tricksConfig.readmeAsTopLevel) {
    if (document.path === '/README') {
      document.path = `/${tricksConfig.defaultPage}`;
    } else {
      const readmeRegex = /(.+)\/README$/g;
      document.path = document.path.replaceAll(readmeRegex, '$1');
    }
  }

  // Fetching the contributor list

  if (repoType !== 'github') {
    document.contributors = [];
    return;
  }

  if (ghToken === undefined || ghToken === null || ghToken.length <= 0 || ghToken === "$GH_TOKEN") {
    return
  }

  let res = await fetch("https://api.github.com/graphql", {
    body: JSON.stringify({
      query: buildContributorQuery(`${document.path}${document.extension}`),
    }),
    headers: {
      Authorization: `token ${ghToken}`,
      "Content-Type": "application/json"
    },
    method: "POST"
  });

  if (res.status === 200) {
    document.contributors = (await res.json())
      .data
      .repository
      .object
      .history
      .nodes
      .map(n => n.author)
      .filter((value, index, self) => self.findIndex(author => author.user.login === value.user.login) === index);
  } else {
    document.contributors = [];
  }


  // Last commit date

  res = await fetch("https://api.github.com/graphql", {
    body: JSON.stringify({
      query: buildDateQuery(`${document.path}${document.extension}`),
    }),
    headers: {
      Authorization: `token ${ghToken}`,
      "Content-Type": "application/json"
    },
    method: "POST"
  });

  if (res.status === 200) {
    const edges = (await res.json())
      .data
      .repository
      .object
      .history
      .edges;

    if (edges.length > 0) {
      document.lastCommitDate = edges[0].node.committedDate;
    }
  }
})


/*




VERY CUSTOM HIGHLIGHTER



*/
const {document} = (new JSDOM("")).window

const Prism = require('prismjs')
const detab = require('detab')
const u = require('unist-builder')
const escapeHtml = require('escape-html')
const {parseThematicBlock} = require('@nuxt/content/parsers/markdown/handlers/utils')


require('prismjs/components/index')()


// enable syntax highlighting on diff language
require('prismjs/components/prism-diff')
require('prismjs/plugins/diff-highlight/prism-diff-highlight')


if (!Prism.plugins.KeepMarkup) {
  Prism.plugins.KeepMarkup = true;
  Prism.hooks.add('before-highlight', function (env) {
    if (!env.element.children.length) {
      return;
    }

    if (!Prism.util.isActive(env.element, 'keep-markup', true)) {
      return;
    }

    var dropTokens = Prism.util.isActive(env.element, 'drop-tokens', false);

    /**
     * Returns whether the given element should be kept.
     *
     * @param {HTMLElement} element
     * @returns {boolean}
     */
    function shouldKeep(element) {
      const whitelist = [
        'smart-variable',
        'span',
        'b',
        'i',
      ];
      if (dropTokens && element.nodeName && whitelist.includes(element.nodeName.toLowerCase()) && element.classList.contains('token')) {
        return false;
      }
      return element.nodeName && whitelist.includes(element.nodeName.toLowerCase());
    }

    var pos = 0;
    var data = [];

    function processElement(element) {
      if (!shouldKeep(element)) {
        // don't keep this element and just process its children
        processChildren(element);
        return;
      }

      var o = {
        // Clone the original tag to keep all attributes
        clone: element.cloneNode(false),
        posOpen: pos
      };
      data.push(o);

      processChildren(element);

      o.posClose = pos;
    }

    function processChildren(element) {
      for (var i = 0, l = element.childNodes.length; i < l; i++) {
        var child = element.childNodes[i];
        if (child.nodeType === 1) { // element
          processElement(child);
        } else if (child.nodeType === 3) { // text
          pos += child.data.length;
        }
      }
    }

    processChildren(env.element);

    if (data.length) {
      // data is an array of all existing tags
      env.keepMarkup = data;
    }
  });

  Prism.hooks.add('after-highlight', function (env) {

    if (env.keepMarkup && env.keepMarkup.length) {

      var walk = function (elt, nodeState) {
        for (var i = 0, l = elt.childNodes.length; i < l; i++) {

          var child = elt.childNodes[i];

          if (child.nodeType === 1) { // element
            if (!walk(child, nodeState)) {
              return false;
            }

          } else if (child.nodeType === 3) { // text
            if (!nodeState.nodeStart && nodeState.pos + child.data.length > nodeState.node.posOpen) {
              // We found the start position
              nodeState.nodeStart = child;
              nodeState.nodeStartPos = nodeState.node.posOpen - nodeState.pos;
            }
            if (nodeState.nodeStart && nodeState.pos + child.data.length >= nodeState.node.posClose) {
              // We found the end position
              nodeState.nodeEnd = child;
              nodeState.nodeEndPos = nodeState.node.posClose - nodeState.pos;
            }

            nodeState.pos += child.data.length;
          }

          if (nodeState.nodeStart && nodeState.nodeEnd) {
            // Select the range and wrap it with the clone
            var range = document.createRange();
            range.setStart(nodeState.nodeStart, nodeState.nodeStartPos);
            range.setEnd(nodeState.nodeEnd, nodeState.nodeEndPos);
            nodeState.node.clone.appendChild(range.extractContents());
            range.insertNode(nodeState.node.clone);
            range.detach();

            // Process is over
            return false;
          }
        }
        return true;
      };

      // For each tag, we walk the DOM to reinsert it
      env.keepMarkup.forEach(function (node) {
        walk(env.element, {
          node: node,
          pos: 0
        });
      });
      // Store new highlightedCode for later hooks calls
      env.highlightedCode = env.element.innerHTML;
    }
  });
}


const DIFF_HIGHLIGHT_SYNTAX = /^(diff)-([\w-]+)/i

const prismHighlighter = (rawCode, language, {lineHighlights, fileName}, {h, node}) => {

  let lang = language || ''
  let grammer

  const diffLanguage = lang.match(DIFF_HIGHLIGHT_SYNTAX)
  if (diffLanguage) {
    lang = diffLanguage[2]
    grammer = Prism.languages.diff
  }
  lang = lang === 'vue' ? 'html' : lang

  if (!grammer) {
    grammer = Prism.languages[lang]
  }

  const highlightLanguage = diffLanguage
    ? `diff-${lang}`
    : lang

  let preElement = document.createElement('pre');
  let codeElement = document.createElement('code');
  preElement.appendChild(codeElement);

  const regexResults = rawCode.matchAll(findTplRegex);

  const guessedLang = (lang || grammer || 'text').toLowerCase();
  rawCode =
    guessedLang === 'html' ||
    guessedLang === 'markdown' ||
    guessedLang === 'markup' ||
    guessedLang === 'svg' ||
    guessedLang === 'xml'
      ? escapeHtml(rawCode) : rawCode;

  rawCode = rawCode.replaceAll(
    findTplRegex,
    (match, p1, p2, p3) => {
      p2 = escapeHtml(p2);
      return `<smart-variable default-value="${p2}" variable="${p1}" value-filters="${p3}">${p2}</smart-variable>`
    },
  );


  codeElement.innerHTML = rawCode;

  codeElement.classList.add(`lang-${guessedLang}`);

  Prism.highlightElement(codeElement)

  let code = grammer
    ? codeElement.innerHTML
    : rawCode

  // if (!lang || !grammer) {
  //   lang = 'text'
  //   code = escapeHtml(code)
  // }

  const props = {
    className: [`language-${lang}`, 'line-numbers', 'fancy-scrollbar']
  }

  if (lineHighlights) {
    props.dataLine = lineHighlights
  }

  const childs = []

  /**
   * If filename, then set span as a first child
   */
  if (fileName) {
    childs.push(h(node, 'span', {className: ['filename']}, [u('text', fileName)]))
  }

  /**
   * Set pre as a child
   */
  childs.push(h(node, 'pre', props, [
    h(node, 'code', {className: []}, [u('raw', code)]),
  ]))

  // =( Does not seem to work here:
  // const smartInputs = []
  // const found = {}
  // for (const match of regexResults) {
  //   const variable = match[1];
  //   const defaultValue = match[2].trim();
  //   if (!found[variable]) {
  //     smartInputs.push(h(
  //       node,
  //       'smart-input',
  //       {
  //         variable: variable,
  //         defaultValue: defaultValue,
  //       }
  //     ));
  //   }
  //   found[variable] = true;
  // }

  const smartVariables = {};

  for (const result of regexResults) {
    const variable = result[1];
    const defaultValue = result[2];
    if (variable !== '__proto__') {
      smartVariables[variable] = defaultValue;
    }
  }


  return h(node, 'smart-code-block-wrapper', {
    'smart-variables': JSON.stringify(smartVariables),
    className: ['nuxt-content-highlight', 'relative'],
  }, childs)
}

module.exports.highlighter = (code, language, {lineHighlights, fileName}, {h, node}) => {
  return prismHighlighter(code, language, {lineHighlights, fileName}, {h, node})
}

