/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: "#3b82f6",    // used in bar charts
          green: "#10b981",   // used in line charts
          indigo: "#6366f1",  // used in pie chart palette
          amber: "#f59e0b",
          red: "#ef4444",
        },
      },
    },
  },
  plugins: [],
};
