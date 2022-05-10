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

