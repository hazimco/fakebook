/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
  future: {
    hoverOnlyWhenSupported: true, // fix: hover state would get applied to menu buttons after tapping them on mobile - https://github.com/tailwindlabs/tailwindcss/pull/8394
  },
};
