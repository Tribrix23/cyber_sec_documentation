/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./lib/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'cyber-cyan': '#00d9ff',
        'cyber-red': '#ff3366',
        'cyber-green': '#00ffbf',
        'cyber-amber': '#ffaa00',
        'cyber-bg': '#050508',
        'cyber-text': '#e8e8ec',
        'cyber-text-dim': '#6b6b7a',
        'cyber-text-muted': '#4a4a52',
        'cyber-border': '#1a1a24',
      }
    }
  },
  plugins: [],
}