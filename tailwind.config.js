/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#EFCA95",
          secondary: "#874747",
          accent: "#4A4265",
          neutral: "#111827",
          "base-100": "#FFFFFF",
          info: "#BDB5F7",
          success: "#1F4A3F",
          warning: "#B9682B",
          error: "#A63D40",
        },
      },
    ],
  },
  plugins: [require("@tailwindcss/typography"), require("daisyui")],
};
