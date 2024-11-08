/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui"

module.exports = {
  daisyui: {
    themes: [
      {
        light: {
          ...require("daisyui/src/theming/themes")["light"]
        },
        dark: {
          ...require("daisyui/src/theming/themes")["dark"],
          ".el-popover": {
            "background-color": "#2A2C32",
            "border": "1px solid #2F3136"
          },
          ".el-checkbox__label": {
            "color": "#E2E3E3"
          }
        }
      }
    ]
  },
  content: [],
  theme: {
    extend: {},
  },
  plugins: [daisyui]
}

