const screens = {
  mobile: "320px",
  tablet: "640px",
  laptop: "1150px",
  desktop: "1280px",
  "13-inches": "1248px",
  "2xl": "1536px",
};

/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit", // ✅ Ensure JIT mode is enabled
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./src/app/globals.css", // ✅ Explicitly include globals.css
  ],
  theme: {
    /* Reference custom tailwind-css https://tailwindcss.com/docs/theme */
    extend: {
      aspectRatio: {
        "4/3": "4 / 3", // aspect-[4/3]
        "2/3": "2 / 3", // aspect-[2/3]
      },
      height: {
        11: "44px",
        36: "144px",
        45: "180px",
        49: "196px",
        58: "232px",
        59: "236px",
        87: "348px",
        117: "468px",
      },
      borderWidth: {
        0.5: "0.5px",
        1: "1px",
      },
      width: {
        ...screens,
        58: "232px",
        96: "384px",
        118: "472px",
        120: "480px",
        51: "206px",
        90: "360px",
        87: "348px",
        163: "652px",
      },
      minHeight: {
        "1/2": "50vh",
        "3/4": "75vh",
        "4/5": "80vh",
      },
      minWidth: {
        ...screens,
        "1/2": "50vw",
        "2/5": "40vw",
        "3/5": "60vw",
        "3/4": "75vw",
        "4/5": "80vw",
        80: "320px",
        317: "1268px",
      },
      maxWidth: {
        ...screens,
        50: "200px",
        96: "384px",
        143: "572px",
        331: "1324px",
      },
      padding: {
        "2%": "2%",
        "4%": "4%",
        1.5: "6px",
        0.25: "2px",
      },
      borderRadius: {
        2: "2px",
        4: "4px",
        6: "6px",
      },
      screens: {
        ...screens,
      },
      boxShadow: {
        boxTop:
          "0px -4px 8px rgba(0, 0, 0, 0.04), 0px 0px 2px rgba(0, 0, 0, 0.06), 0px 0px 1px rgba(0, 0, 0, 0.04)",
        1: "0px 0px 1px 0px #0000000A,0px 0px 2px 0px #0000000F,0px 4px 8px 0px #0000000A;",
        2: "0px 0px 1px 0px #0000000A, 0px 2px 6px 0px #0000000A, 0px 16px 30px 0px #00000014;",
      },
      lineHeight: {
        11: "44px",
        "5xl": "48px",
        "6xl": "60px",
      },
      spacing: {
        17: "4.25rem",
        18: "4.5rem",
        19: "4.75rem",
      },
      colors: {
        primary: {
          100: "#ECFDF5", // Very light cyan-green (calm & refreshing)
          200: "#D1FAE5", // Soft mint green (balance & harmony)
          300: "#A7F3D0", // Bright pastel green (growth & energy)
          400: "#6EE7B7", // Vibrant green (success & vitality)
          500: "#34D399", // Classic green (pure Wood element)
          600: "#059669", // Deep teal green (stability & focus)
          700: "#047857", // Darker green (wisdom & endurance)
          800: "#065F46", // Rich green-teal mix
        },
        neutral: {
          100: "#f6f9fc",
          200: "#eef1f4",
          300: "#dde3e8",
          400: "#c0c8d0",
          500: "#a5aeb7",
          600: "#8b949e",
          700: "#727c85",
          800: "#5a636d",
          900: "#444c54",
          1000: "#2d3034",
        },
        error: {
          0: "#fff7f7",
          20: "#ff4d4f",
          40: "#d64949",
          50: "#B23D3D",
          60: "#891a16",
        },
        warning: {
          0: "#FFFBF5",
          10: "#F8DCAB",
          40: "#cb8608",
          60: "#825700",
        },
        success: {
          0: "#008201",
        },
        info: {
          0: "#F5F8FF",
          10: "#ABC4F8",
          20: "#0845CB",
          30: "#002682",
        },
        disabled: {
          0: "#f5f5f5",
        },
        graph: {
          1: "#48BFB8",
          2: "#0845cb",
          3: "#F240A0",
          4: "#FF986D",
        },
        orange: {
          30: "#FF7E47",
          60: "#AA4317",
        },
        magenta: {
          40: "#EE178B",
          60: "#9F0F5D",
        },
        pending: {
          0: "#F5F8FF",
          10: "#ABC4F8",
          60: "#002682",
        },
        green: {
          600: "#2E862D",
        },
        red: {
          500: "#E82F2F",
        },
      },
    },
    fontFamily: {
      sans: ["Nunito Sans"], // font-sans
      serif: ["GT Super"], // font-serif
    },
  },
  darkMode: "class",
  corePlugins: {
    preflight: true,
  },
};
