module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  plugins: [
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/forms')
  ],
  corePlugins: {
    aspectRatio: false,
  },
  theme: {
    fontFamily: {
      sans: ['Mukta'] // Karla is also nice
    },
    extend: {
      colors: {
        "white": "#FFF",
        "black": "#000",
        "alert": "#EDDF4D",
        "alert-light": "#FFFAF0",
        "blue-dark": "#012C3D",
        "blue-high": "#01668D",
        "blue-deep": "#29A7D9",
        "blue-base": "#02ACF0",
        "blue-low": "#72D6FE",
        "blue-light": "#D6F3FF",
        "green-dark": "#012C3D",
        "green-deep": "#08361C",
        "green-high": "#127D40",
        "green-base": "#1FD66E",
        "green-low": "#82EDB0",
        "green-light": "#DBFAE9",
        "gray-dark": "#0A0A0B",
        "gray-high": "#44444B",
        "gray-base": "#747481",
        "gray-low": "#B4B4BB",
        "gray-light": "#EAEAEC",
        "pink": "#FFC0CB",
        "red": "#FF0000",
      }
    }
  }
};
