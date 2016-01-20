# BrowserInc

Used as a postinstall hook, this command-line utility can be used to re-include browserify excludes (including those specified in dependent packages).

## Why?
There are certain situations in which the --no-browser-field browserify flag is not accurate enough. Where one is running a browserified package in a specialized environment (eg. Chrome extension/app) and wants to exclude only certain parts of the browser field across multiple package dependencies.

This is where browserinc comes in.
## Installation
```
npm install browserinc
```
## Usage
What browserinc essentially does is edit the dependent package.json files of the root module and removes undesired browser-field excludes from them (thus including them).

The easiest way to use browserinc would be to include it as a postinstall hook in your package.json
eg.:

```
"scripts": {
  "postinstall": "browserinc"
}
```

In the same file, be sure to add a "browserinc" field with an "include" array that would specify which packages/files you'd like to include. eg.:

```
"browserinc": {
  "include": [
      "package1",
        "./path/to/specific/file"
    ]
}
```

## Issues / Contributions
If anything is broken or you'd like some behaviour changed, I would very much welcome your issues or PRs.
## License

MIT
