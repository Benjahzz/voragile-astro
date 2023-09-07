import tailwind from "@astrojs/tailwind";

module.exports = {
  content: [
    "./src/**/*.{astro,html,md,mdx,ts,tsx}",
  ],
  integrations: [
    tailwind(),
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial":
          "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        primary: "#6F2DBD",
        colorText: "#292929",
      },
    },
  },
  plugins: [],
};
