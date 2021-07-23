# Automotive Landing Page

## Preparing the Environment

- **Install Node.js**: [Follow the instructions here](https://nodejs.org/en/download/) to install Node.js on your particular operating system.

- **Install Gulp**: Run `npm install -g gulp-cli`, or [follow the instructions](https://gulpjs.com/docs/en/getting-started/quick-start/) here to install the Gulp CLI

## Compile Resources

- **Run Gulp**: In a new terminal window, run `gulp` to compile project resources.

- **(Optional) Gulp Watch**: You can use `gulp watch` to watch for resource changes and recompile them as you work.

## Code Style

#### HTML

[Code Guide](http://codeguide.co/#html)

- Self closing tags must use a trailing forward slash (e.g. `<img src="#" />`.
- Tags that do not require a closing tag (e.g. `<li>`) should always be closed with their corresponding closing tag (e.g. `<li></li>`)
- Use https for all hosted third party inclusions. We don't use protocol-relative URLs for practical and security reasons. [See Paul Irish's Update](http://www.paulirish.com/2010/the-protocol-relative-url/)
- Use [WAI-ARIA](https://developer.mozilla.org/en-US/docs/Web/Accessibility/ARIA) where necessary.

#### CSS

[Code Guide](http://codeguide.co/#css)

- When feasible, default color palettes should comply with [WCAG color contrast guidelines](http://www.w3.org/TR/WCAG20/#visual-audio-contrast).
- Always include alternative styles for `:focus` styles (via e.g. `outline: none;`). See [this A11Y Project post](http://a11yproject.com/posts/never-remove-css-outlines/) for more details.
