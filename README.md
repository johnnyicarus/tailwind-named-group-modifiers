# Named Group Modifiers for Tailwind CSS
*A Tailwind CSS (>= 3.0.0) plugin for using multiple themable group modifiers.*

Use as many group interlocking group modifiers as you wish by configuring them in your `tailwind.config.js` like so: 

```js
module.exports = {
    ...
    theme: {
        groups: {
            hover: ['card', 'section'],
            focusWithin: ['form'],
        },
    }
}
```

## Requirements
Tailwind CSS >= v3.0.0

## Installation

Install via NPM:
```console
$ npm i tailwind-named-group-modifiers
```

Install via Yarn:
```console
$ yarn add tailwind-named-group-modifiers
```

## Why this Plugin?
Tailwind 3 offers `group-*` variants that allow styling an element based on a parent's state (read from pseudo-classes), so applying `group` on a parent and `group-hover:opacity-100` on a child would result in CSS like this, making the child opaque when the parent is hovered over:

```css
.group:hover .group-hover:opacity-100 {
    opacity: 1
}
```

This is great for simpler views, but it runs into problems when we need more than one group modifers downstream from each other in a branch of the DOM. Every element we apply `group` to will trigger *all* the `group-*` children further down the DOM, causing unexpected behaviour. We can only use `group` once on a given branch of the DOM.

This plugin conveniently handles these use cases by giving you the option of adding named groups to your `tailwind.config.js`.

You can also just use the plugin if you want to have a better overview of your group modifier usage.

## Features
- As of Tailwind 3, the `group-*` pattern can be applied to all 25(!) pseudo-class modifiers shipped with the new JIT compiler, this plugin **includes all of them**.

- Using the config keeps you organized and maximally flexible with regards to other Tailwind features.

- Follows Tailwind naming conventions whereever possible.

## About the Configuration
Modifier names are the same as with the built-in `group` features, so `group-focus` e.g. becomes `group-card-focus`. Note that Tailwind e.g. shortens the `:last-child` pseudo-class to `last:`. We follow core as much as possible here.

The plugin is configured under the `groups` key in `tailwind.config.js`. In keeping with a Tailwind convention to have the config keys point to the actually used CSS more than the class naming, subkeys for the different pseudo-classes in the Tailwind config are usually the actual pseudo-class rendered in camelCase (e.g. `last:` must be configured under `lastChild`).

The exception to this are `odd:` and `even:`, which can be configured under `oddChild` and `evenChild`, respectively. Aside from the fact that `nthChild(odd)` (`nthChild(Odd)?`) seems kind of hard to remember, this also keeps greater consistency with `first:`, `last:` and `only:`.
