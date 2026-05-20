/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", "system-ui", "sans-serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
      colors: {
        brand: {
          50:  "#f0f4ff",
          100: "#dde6ff",
          200: "#c3d1ff",
          300: "#9eb3ff",
          400: "#7b8dff",
          500: "#5c65f5",
          600: "#4a47e8",
          700: "#3c38cc",
          800: "#3130a3",
          900: "#2c2d81",
        },
      },
      animation: {
        "fade-in": "fadeIn 0.3s ease-out",
        "slide-up": "slideUp 0.3s ease-out",
        "scale-in": "scaleIn 0.2s ease-out",
      },
      keyframes: {
        fadeIn:  { from: { opacity: "0" },                        to: { opacity: "1" } },
        slideUp: { from: { opacity: "0", transform: "translateY(12px)" }, to: { opacity: "1", transform: "translateY(0)" } },
        scaleIn: { from: { opacity: "0", transform: "scale(0.95)" },      to: { opacity: "1", transform: "scale(1)" } },
      },
    },
  },
  plugins: [],
};
