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
      primary: '#06c755',
      yellow: {
        DEFAULT: '#ffd500',
      },
      green: {
        DEFAULT: '#06bcc1',
      },
      blue: {
        DEFAULT: '#4171ff',
        icon: '#1a73e8',
        dark: '#162848',
        gray: '#83879b',
        black: '#00090B',
      },
      light: {
        DEFAULT: '#F5F8FA',
        180: '#d8d8d8',
        120: '#eaeaea',
        100: '#ebebeb',
        80: '#ededed',
        60: '#fdfdfd',
      },
      red: {
        DEFAULT: '#c0392b',
      },
      gray: {
        120: '#2f2f2f',
        100: '#657786',
        80: '#696974',
        60: '#b5b5be',
        40: '#ddd',
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
