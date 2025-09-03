// postcss.config.js
export default {
  plugins: {
    "@tailwindcss/postcss": {}, // ✅ this is the new plugin
    autoprefixer: {},
  },
};
