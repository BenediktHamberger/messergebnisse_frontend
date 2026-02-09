module.exports = {
  content: ['./src/**/*.{svelte,js,ts}'],
  plugins: [require('daisyui')],
  // daisyUI config (optional)
  daisyui: {
    styled: true,
    themes: [{
      light: {
        ...require('daisyui/src/theming/themes')['[light]'],
        "primary": "#EB602B", // Knott Orange
        "primary-content": "#FFFFFF",
        "secondary": "#005587", // Knott Blau
        "secondary-content": "#FFFFFF",
        "accent": "#37CDBE",
        "accent-content": "#000000",
        "info": "#3abff8",
        "info-content": "#000000",
        "success": "#80A41C",
        "warning": "#FAB600",
        "warning-content": "#000000",
        "error": "#cb010b",

        "neutral": "#c1c1c1",
        "base-100": "#FFFFFF",
        '--b4': '0 0% 70%',
        "fontFamily": "arial"
      },
    },
    {
      dark: {
        ...require('daisyui/src/theming/themes')['[dracula]'],
        "primary": "#EB602B",
        "primary-content": "#FFFFFF",
        "secondary": "#005587",
        "secondary-content": "#FFFFFF",
        "accent": "#37CDBE",
        "accent-content": "#000000",
        "info": "#3abff8",
        "info-content": "#000000",
        "success": "#80A41C",
        "warning": "#FAB600",
        "warning-content": "#000000",
        "error": "#cb010b",

        // "neutral": "#15171f",
        "neutral": "#2a323c",
        "base-100": "#1d232a",
        "neutral-content": "#FFFFFF",
        "base-content": "#FFFFFF",
        // "base-100": "#202330",
        '--b4': '#6b6d79',
        "fontFamily": "arial"
      },
    }],
    base: true,
    utils: true,
    logs: true,
    rtl: false,
    prefix: "",
    darkTheme: "dark",
  },
};