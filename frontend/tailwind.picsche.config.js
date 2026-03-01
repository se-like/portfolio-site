/** PicSche 用 Tailwind ビルド（LP・法定ページのクラスをすべて含む） */
module.exports = {
  content: ['./public/products/picsche/**/*.html'],
  theme: {
    extend: {
      colors: {
        primary: '#4472C4',
        'primary-dark': '#365a9e',
        'background-light': '#F5F5F5',
        surface: '#FFFFFF',
      },
      fontFamily: {
        sans: ["'Noto Sans JP'", 'sans-serif'],
      },
    },
  },
  plugins: [],
};
