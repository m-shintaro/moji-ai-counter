/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'github-dark-bg': '#0d1117',
        'github-dark-bg-secondary': '#161b22',
        'github-dark-border': '#30363d',
        'github-dark-text': '#c9d1d9',
        'github-dark-text-secondary': '#8b949e',
        'github-dark-accent': '#58a6ff',
        'github-dark-success': '#3fb950',
        'github-dark-danger': '#f85149'
      }
    },
  },
  plugins: [],
}