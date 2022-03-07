import {data} from "autoprefixer";
import {raw} from "express";

const createDOMPurify = require('dompurify');
const {JSDOM} = require('jsdom');

/*
*
* Smart Variables Regex:
* */
const findTplRegex = /{{ +([a-zA-Z\-]+) ([^}]+) +}}/g;




exports.beforeParse = (file) => {
  if (file.extension !== '.md') {
    return
  }

  file.data = file.data.replace(/\[ ] (.*)/g, '<smart-check variable="test" :value="1 === 2">$1</smart-check>');
  file.data = file.data.replace(/(\[x]|\[X]) (.*)/g, '<smart-check variable="test" :value="true">$2</smart-check>');
}


exports.beforeInsert = (document, database) => {

}


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
      return  element.nodeName && whitelist.includes(element.nodeName.toLowerCase());
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



  const guessedLang = (lang || grammer || 'text').toLowerCase();
  // rawCode =
  //   guessedLang === 'html' ||
  //   guessedLang === 'markdown' ||
  //   guessedLang === 'xml'
  //     ? escapeHtml(rawCode) : rawCode;
  rawCode = escapeHtml(rawCode);

  const regexResults = rawCode.matchAll(findTplRegex);

  rawCode = rawCode.replaceAll(
    findTplRegex,
    '<smart-variable variable="$1">$2</smart-variable>',
  );




  codeElement.innerHTML = rawCode;

  codeElement.classList.add(`lang-${guessedLang}`);

  Prism.highlightElement(codeElement)

  let code = grammer
    ? codeElement.innerHTML
    : rawCode

  if (!lang || !grammer) {
    lang = 'text'
    code = escapeHtml(code)
  }

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

