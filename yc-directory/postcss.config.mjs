const config = {
  plugins: {
    "@tailwindcss/postcss": {
      plugins: [
        require("tailwindcss-animate"),
        require("@tailwindcss/typography"),
      ],
    },
  },
};

export default config;
