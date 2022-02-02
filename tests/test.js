const postcss = require('postcss');

it('correctly outputs no css when config is empty', () => {
  const css = postcss([
    require('tailwindcss')({
      content: [
        {
          raw: 'group-card-hover:opacity-100',
        },
      ],
      theme: {
        groups: {},
      },
      plugins: [require('../')],
    }),
  ]).process('@tailwind utilities').css;

  expect(css).toBe('');
});

const expectedCSS = `
.group-card:hover .group-card-hover\\:text-left {
    text-align: left
}
.group-header:focus-within .group-header-focus-within\\:opacity-100 {
    opacity: 1
}
.group-card:last-child .group-card-last\\:mb-0 {
    margin-bottom: 0px
}
.group-footer:nth-child(odd) .group-footer-odd\\:bg-black {
    --tw-bg-opacity: 1;
    background-color: rgb(0 0 0 / var(--tw-bg-opacity))
}
`;

it('correctly outputs css for used utilities based on config', () => {
  const css = postcss([
    require('tailwindcss')({
      content: [
        {
          raw: 'group-card-hover:text-left group-header-focus-within:opacity-100 group-card-last:mb-0 group-footer-odd:bg-black',
        },
      ],
      theme: {
        groups: {
          focus: ['header'],
          hover: ['card', 'header'],
          focusWithin: ['header'],
          lastChild: ['card'],
          oddChild: ['footer'],
        },
      },
      plugins: [require('../')],
    }),
  ]).process('@tailwind utilities').css;

  expect(css).toBe(expectedCSS.trim());
});
