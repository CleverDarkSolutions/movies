/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          light: "#e5e5e5", // Light Gray (off-white)
          DEFAULT: "#ffffff", // White
          dark: "#d4d4d4" // Soft Dark Gray
        },
        secondary: {
          light: "#f1f1f1", // Very light gray
          DEFAULT: "#000000", // Black
          dark: "#333333" // Dark grayish black
        },
        background: "#ffffff", // Plain white background
        foreground: "#f4f4f4", // Light gray foreground
        text: "#1a1a1a", // Near black text
      }
    }
  },
  plugins: [],
};
