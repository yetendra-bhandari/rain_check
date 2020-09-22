module.exports = {
  future: {
    // removeDeprecatedGapUtilities: true,
    // purgeLayersByDefault: true,
  },
  purge: [],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        "background-text": "var(--background-text)",
        ui: "var(--ui)",
        "ui-focus": "var(--ui-focus)",
        "ui-background": "var(--ui-background)",
        theme: "var(--theme)",
        "theme-text": "var(--theme-text)",
      },
      fontFamily: {
        body: "Hind",
      },
      spacing: { 0.5: "0.125rem" },
    },
  },
  variants: {},
  plugins: [],
};
