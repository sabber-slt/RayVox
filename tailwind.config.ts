import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        main: "#fa7315",
        slate: "#1F2937",
      },
    },
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#dc2626",

          secondary: "#e5e7eb",

          accent: "#00ffff",

          neutral: "#ff00ff",

          "base-100": "#f8f8f7",

          info: "#0000ff",

          success: "#00ff00",

          warning: "#00ff00",

          error: "#ff0000",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
export default config;
