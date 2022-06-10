module.exports = {
  purge: ['./dist/*.html', './src/**/*.js', './src/**/*.jsx'],
  content: ["./src/**/*.{html,js, jsx}"],
  theme: {
    extend: {
      colors: {
        "blue-30": "#1e9fd2",
        "gray-90": "#595959"
      }
    },
  },
  plugins: [],
}
