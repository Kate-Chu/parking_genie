/* eslint-disable no-param-reassign */
const plugin = require('tailwindcss/plugin');

/**
 * @type {import('tailwindcss').Config}
 */
module.exports = {
  jit: true,
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      white: '#ffffff',
      black: '#000000',
      blue: {
        DEFAULT: '#0062ff',
      },
      primary: {
        DEFAULT: '#06c755',
      },
      light: {
        DEFAULT: '#F5F8FA',
      },
      red: {
        DEFAULT: '#c0392b',
      },
      gray: {
        100: '#657786',
        80: '#696974',
        60: '#b5b5be',
      },
    },
  },
  plugins: [
    plugin(({ addUtilities, addComponents, addVariant, e }) => {
      addComponents({
        '.form-step-title': {}, // define in app.scss
        '.form-label': {}, // define in app.scss
        '.form-control': {}, // define in app.scss
      });

      const newUtilities = {
        '.flex-center': {
          display: 'flex',
          'justify-content': 'center',
          'align-items': 'center',
        },
      };
      addUtilities(newUtilities);

      addVariant('data-active', ({ modifySelectors, separator }) => {
        modifySelectors(({ className }) => {
          return `.${e(`data-active${separator}${className}`)}[data-active="true"]`;
        });
      });
      addVariant('data-error', ({ modifySelectors, separator }) => {
        modifySelectors(({ className }) => {
          return `.${e(`data-error${separator}${className}`)}[data-error="true"]`;
        });
      });

      addVariant('children', '& > *');

      // https://tailwindcss.com/docs/plugins#complex-variants
      addVariant('important', ({ container }) => {
        container.walkRules((rule) => {
          rule.selector = `.\\!${rule.selector.slice(1)}\\`;
          rule.walkDecls((decl) => {
            decl.important = true;
          });
        });
      });
    }),
  ],
};
