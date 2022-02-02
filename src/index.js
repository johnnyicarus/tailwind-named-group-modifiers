const plugin = require('tailwindcss/plugin');
const _ = require('lodash');

const modifiers = [
  { modifier: 'hover' },
  { modifier: 'focus' },
  { modifier: 'focus-within' },
  { modifier: 'focus-visible' },
  { modifier: 'visited' },
  { modifier: 'target' },
  {
    classKey: 'first',
    modifier: 'first-child',
  },
  {
    classKey: 'last',
    modifier: 'last-child',
  },
  {
    classKey: 'only',
    modifier: 'only-child',
  },
  {
    classKey: 'odd',
    modifier: 'nth-child(odd)',
    themeKey: 'oddChild',
  },
  {
    classKey: 'even',
    modifier: 'nth-child(even)',
    themeKey: 'evenChild',
  },
  { modifier: 'first-of-type' },
  { modifier: 'last-of-type' },
  { modifier: 'only-of-type' },
  { modifier: 'empty' },
  { modifier: 'disabled' },
  { modifier: 'checked' },
  { modifier: 'indeterminate' },
  { modifier: 'default' },
  { modifier: 'valid' },
  { modifier: 'invalid' },
  { modifier: 'in-range' },
  { modifier: 'out-of-range' },
  { modifier: 'placeholder-shown' },
  { modifier: 'autofill' },
  { modifier: 'read-only' },
];

module.exports = plugin(function ({ addVariant, e, theme }) {
  const namedGroup = (name) => `group-${e(name)}`;
  const addVariantPerModifier = ({ classKey, themeKey, modifier }) => {
    (theme(`groups.${themeKey || _.camelCase(modifier)}`) || []).forEach(
      (name) => {
        addVariant(
          `${namedGroup(name)}-${classKey || modifier}`,
          `:merge(.${namedGroup(name)}):${modifier} &`,
        );
      },
    );
  };

  modifiers.forEach((modifier) => {
    addVariantPerModifier(modifier);
  });
});
