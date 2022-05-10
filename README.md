# Tricks

![Trickz logo](assets/images/tricks_logo.png)


## What is Trickz?

Trickz is a simple tool to generate documentation from markdown files.
It supports the usage of Vue components and has multiple enhancements around code/command snippets, meaning is thought around the use for technical documentation related to the IT field.
I personally made this tool to help me to generate documentation for my infosec projects and resources.

## Build Setup

### Build for development

Install the dependencies: 

```bash
yarn install
```

Run in development mode: 

```bash
yarn dev
```

### Build for production

Install the dependencies and build it:

```bash
yarn install
yarn build
```

Run in production mode: 

```bash
yarn start
```

Generate a static page:

```bash
yarn generate
```

## Usage

Just place your markdown files at the root of the project on a directory named `content` and run it.
You should name your files the same way you would if it was a GitHub / Gitlab repository; folders create sections and `README.md` files are the _index_ equivalent of the section. You can also use the same name for the file and the folder as you would do for a Gitbook based project.

### File format

Markdown files are required to have the following structure to work properly:

```markdown
---
title: A title for your page / section
---

Your markdown content

## Title 1

### Subtitle 2

...
```

There are additional and optional properties that can be used.
The following is a list with a description of all the available properties:

- `title` _(required)_: The title from the page. Will be displayed at the top of the page as well as on the sidebar.
- `description`: A brief description of the page that will appear under the page title.
- `badge`: A higlighted badge/keyword/tag to display on top of your page with the title.
- `position`: An integer that will be used to order the pages on the sidebar.

The following is an example of a page with all the available properties:

```markdown
---
title: Adding content
description: How to add content to the tricks repo
badge: Trickz
position: 1
---

Your markdown content
```

