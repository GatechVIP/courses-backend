We’re flexible in accepting contributions to the project, but we do try to follow the following guidelines. For pull requests that require exceptions, a prominent explanatory note that (briefly) justifies the exception is appreciated.

## General

All pull requests undergo peer review before merging. In most cases, several review iterations should be expected.

## HTML

This project is a single page application with a minimal HTML skeleton and dynamic content. With this architecture, most of the HTML markup resides within JavaScript templates. Those templates are located in the `app/scripts/templates/` folder. A template should have the same name as the view it supports with an added `.ejs` file extension.

Templates use [Underscore.js](http://underscorejs.org/#template) syntax. We strongly prefer simple interpolated values `<%= … %>` to arbitrary code `<% … %>`.

Accessibility is a requirement. Contributions should be based on [HTML5 semantic markup](http://webaim.org/blog/future-web-accessibility-html5-semantic-tags/) and include appropriate [ARIA](http://www.w3.org/WAI/intro/aria) attributes.

Attributes should be defined in the following order:

1. class
2. id, name
3. data-*
4. src, for, type, href, value
5. title, alt
6. role, aria-*

## CSS

Although the project relies on [SASS](http://sass-lang.com) to build its CSS files for deployment, we try to stick to plain CSS3 (via SCSS syntax) as much as possible. Generally that means we limit the use of SASS features to simple variables such as for theme colors. More advanced features such as nesting and extensions can sometimes obscure code that results in overly large files and poor browser performance.

Style rules should generally be limited to a single view. Styles are located in the `app/styles/` folder and should have the same name as the view to which they apply (with an extension of  `.scss`).

CSS class names should begin with the prefix `vip-` [subject to change].

Custom CSS for the project uses the [Block Element Modifier](http://getbem.com) methodology. We also use BEM notation for SASS variables, for example `$vip-color--primary__tinted`.

Primary CSS selectors should generally target class names, not element tags or identifiers.

Nesting of CSS selectors is discouraged. For example, instead of styling a list item using `.vip-list li { … }`, give the list items a custom class per BEM conventions and style the list item using, e.g., `.vip-list--list-item { … }`.

Class names should be selected to avoid possible confusion with element names. (E.g. `.btn` instead of  `.button`.)

When grouping selectors, keep individual selectors to a single line.

Properties within a declaration block should be ordered alphabetically.

CSS property shorthands are discouraged. For example, use explicit `margin-top:` and `margin-bottom:`instead of the shorthand `margin:`

Vendor prefixes are added to the CSS during the build phase, so don’t include vendor prefixes within the CSS source code.

We use [CSS Lint](http://csslint.net) to ensure consistent and maintainable code.

## JavaScript

For the most part JavaScript code should be confined to Backbone models, collections or views.

The [jQuery](http://jquery.com), [Underscore.js](http://underscorejs.org), and [Backbone.js](http://backbonejs.org) libraries are globally available.

The custom [Bootstrap](http://getbootstrap.com) components are available. When possible, they should be enabled using a declarative syntax within the markup rather than via JavaScript.

When both jQuery and Underscore provide equivalent functionality (e.g. `$.each()` and `_.each()`, prefer the Underscore version.

All custom code should use the `VIP` namespace [subject to change]. Models, collections, and views reside in appropriate subdomains of that namespace.

Model names should be singular nouns (e.g. `Course`, and collection names should be plural nouns (e.g. `Courses`). The names of views should include both the model or collection that provides the view data and an indication of the view type, for example `CourseAsListItem` or `CoursesAsList`.

All models, views, and collections should include a unit test module in the appropriate folder within `test/`.

In general pull requests that do not pass all unit tests and demonstrate 100% test coverage will not be merged.

JavaScript should not generate markup. It should instead rely on the templates associated with the appropriate view for all markup.

JavaScript should not add or remove classes from HTML elements. Instead, JavaScript can provide styling hooks or hints using the `data-` attribute.

The `render()` method of all views should return `this` for method chaining. (Unit tests for all views should verify this functionality.)

We use [JSHint](http://jshint.com) to ensure consistent and maintainable code.

