import { createContext, useState, useMemo } from "react";
import { createTheme } from "@mui/material/styles";
import { purple } from "@mui/material/colors";

// color design tokens export
export const tokens = (mode) => ({
  ...(mode === "dark"
    ? {
        grey: {
          100: "#e0e0e0",
          200: "#c2c2c2",
          300: "#a3a3a3",
          400: "#858585",
          500: "#666666",
          600: "#525252",
          700: "#3d3d3d",
          800: "#292929",
          900: "#141414",
        },
        primary: {
          100: "#d0d1d5",
          200: "#a1a4ab",
          300: "#727681",
          400: "#1F2A40",
          500: "#141b2d",
          600: "#101624",
          700: "#0c101b",
          800: "#080b12",
          900: "#040509",
        },
        greenAccent: {
          100: "#dbf5ee",
          200: "#b7ebde",
          300: "#94e2cd",
          400: "#70d8bd",
          500: "#4cceac",
          600: "#3da58a",
          700: "#2e7c67",
          800: "#1e5245",
          900: "#0f2922",
        },
        redAccent: {
          100: "#f8dcdb",
          200: "#f1b9b7",
          300: "#e99592",
          400: "#e2726e",
          500: "#db4f4a",
          600: "#af3f3b",
          700: "#832f2c",
          800: "#58201e",
          900: "#2c100f",
        },
        blueAccent: {
          100: "#e1e2fe",
          200: "#c3c6fd",
          300: "#a4a9fc",
          400: "#868dfb",
          500: "#6870fa",
          600: "#535ac8",
          700: "#3e4396",
          800: "#2a2d64",
          900: "#151632",
        },
        // New
        purple: {
          50: "#F4F4FE",
          100: "#DEDDFB",
          200: "#CECCF9",
          300: "#B8B5F6",
          400: "#AAA7F5",
          500: "#9591F2",
          600: "#8884DC",
          700: "#6A67AC",
          800: "#525085",
          900: "#3F3D66",
        },
        mint: {
          50: "#F8FBF8",
          100: "#E8F3E9",
          200: "#DDEEDE",
          300: "#CDE6CF",
          400: "#C3E1C6",
          500: "#B4D9B8",
          600: "#A4C5A7",
          700: "#809A83",
          800: "#637765",
          900: "#4C5B4D",
        },
        green: {
          50: "#ECF8EF",
          100: "#C5EACF",
          200: "#A9E0B7",
          300: "#81D296",
          400: "#69C982",
          500: "#43BC63",
          600: "#3DAB5A",
          700: "#308546",
          800: "#256736",
          900: "#1C4F2A",
        },
        category: {
          purple: "#7772F2",
          light_purple: "#AAA7F5",
          light_blue: "#A8E2F5",
          orange: "#F5CCA8",
          blue: "#A8BCF5",
          red: "#F5ADA8",
          yellow: "#F5EEA8",
        },
        extra: {
          pure_white: "FFFFFF",
          faint_white: "#F5F5F5",
          light_grey: "#F0F0F0",
          grey: "#D6D6D6",
          grey_accent: "#7F7F7F",
          yellow_accent: "#C7B50F",
          red_accent: "#FE3F2F",
          faint_black: "#111111",
        },
        vibrant: {
          yellow: "#EFE371",
          light_blue: "#71D0EF",
          red: "#EF7971",
          green: "#71EFC1",
          orange: "#EFAC71",
          purple: "#7771EF",
          pink: "#E071EF",
        },
      }
    : {
        grey: {
          100: "#141414",
          200: "#292929",
          300: "#3d3d3d",
          400: "#525252",
          500: "#666666",
          600: "#858585",
          700: "#a3a3a3",
          800: "#c2c2c2",
          900: "#e0e0e0",
        },
        primary: {
          100: "#040509",
          200: "#080b12",
          300: "#0c101b",
          400: "#f2f0f0", // manually changed
          500: "#141b2d",
          600: "#1F2A40",
          700: "#727681",
          800: "#a1a4ab",
          900: "#d0d1d5",
        },
        greenAccent: {
          100: "#0f2922",
          200: "#1e5245",
          300: "#2e7c67",
          400: "#3da58a",
          500: "#4cceac",
          600: "#70d8bd",
          700: "#94e2cd",
          800: "#b7ebde",
          900: "#dbf5ee",
        },
        redAccent: {
          100: "#2c100f",
          200: "#58201e",
          300: "#832f2c",
          400: "#af3f3b",
          500: "#db4f4a",
          600: "#e2726e",
          700: "#e99592",
          800: "#f1b9b7",
          900: "#f8dcdb",
        },
        blueAccent: {
          100: "#151632",
          200: "#2a2d64",
          300: "#3e4396",
          400: "#535ac8",
          500: "#6870fa",
          600: "#868dfb",
          700: "#a4a9fc",
          800: "#c3c6fd",
          900: "#e1e2fe",
        },
        // New
        purple: {
          50: "#F4F4FE",
          100: "#DEDDFB",
          200: "#CECCF9",
          300: "#B8B5F6",
          400: "#AAA7F5",
          500: "#9591F2",
          600: "#8884DC",
          700: "#6A67AC",
          800: "#525085",
          900: "#3F3D66",
        },
        mint: {
          50: "#F8FBF8",
          100: "#E8F3E9",
          200: "#DDEEDE",
          300: "#CDE6CF",
          400: "#C3E1C6",
          500: "#B4D9B8",
          600: "#A4C5A7",
          700: "#809A83",
          800: "#637765",
          900: "#4C5B4D",
        },
        green: {
          50: "#ECF8EF",
          100: "#C5EACF",
          200: "#A9E0B7",
          300: "#81D296",
          400: "#69C982",
          500: "#43BC63",
          600: "#3DAB5A",
          700: "#308546",
          800: "#256736",
          900: "#1C4F2A",
        },
        category: {
          purple: "#7772F2",
          light_purple: "#AAA7F5",
          light_blue: "#A8E2F5",
          orange: "#F5CCA8",
          blue: "#A8BCF5",
          red: "#F5ADA8",
          yellow: "#F5EEA8",
        },
        extra: {
          pure_white: "FFFFFF",
          faint_white: "#F5F5F5",
          light_grey: "#F0F0F0",
          grey: "#D6D6D6",
          grey_accent: "#7F7F7F",
          yellow_accent: "#C7B50F",
          red_accent: "#FE3F2F",
          faint_black: "#111111",
        },
        vibrant: {
          yellow: "#EFE371",
          light_blue: "#71D0EF",
          red: "#EF7971",
          green: "#71EFC1",
          orange: "#EFAC71",
          purple: "#7771EF",
          pink: "#E071EF",
        },
      }),
});

// mui theme settings
export const themeSettings = (mode) => {
  const colors = tokens(mode);
  return {
    palette: {
      mode: mode,
      ...(mode === "dark"
        ? {
            // palette values for dark mode
            primary: {
              main: colors.primary[500],
            },
            secondary: {
              main: colors.greenAccent[500],
            },
            neutral: {
              dark: colors.grey[700],
              main: colors.grey[500],
              light: colors.grey[100],
            },
            background: {
              default: colors.primary[500],
            },
            frameBackground: {
              default: "",
            },
          }
        : {
            // palette values for light mode
            primary: {
              main: colors.primary[100],
            },
            secondary: {
              main: colors.greenAccent[500],
            },
            neutral: {
              dark: colors.grey[700],
              main: colors.grey[500],
              light: colors.grey[100],
            },
            background: {
              default: "#F5F5F5",
            },
            frameBackground: {
              default: "white",
            },
          }),
    },
    typography: {
      fontFamily: ["Roboto, Source Sans Pro", "sans-serif"].join(","),
      fontSize: 12,
      h1: {
        fontFamily: ["Roboto, Source Sans Pro", "sans-serif"].join(","),
        fontSize: "3.563rem", // 57px
        fontWeight: 700,
        lineHeight: "140%",
      },
      h2: {
        fontFamily: ["Roboto, Source Sans Pro", "sans-serif"].join(","),
        fontSize: "3rem", // 48px
        fontWeight: 700,
        lineHeight: "140%",
      },
      h3: {
        fontFamily: ["Roboto, Source Sans Pro", "sans-serif"].join(","),
        fontSize: "2.5rem", // 40px
        fontWeight: 700,
        lineHeight: "140%",
      },
      h4: {
        fontFamily: ["Roboto, Source Sans Pro", "sans-serif"].join(","),
        fontSize: "2.063rem", // 33px
        fontWeight: 700,
        lineHeight: "140%",
      },
      h5: {
        fontFamily: ["Roboto, Source Sans Pro", "sans-serif"].join(","),
        fontSize: "1.75rem", // 28px
        fontWeight: 700,
        lineHeight: "140%",
      },
      h6: {
        fontFamily: ["Roboto, Source Sans Pro", "sans-serif"].join(","),
        fontSize: "1.438rem", // 23px
        fontWeight: 700,
        lineHeight: "140%",
      },
      body1: {
        fontFamily: ["Roboto, Source Sans Pro", "sans-serif"].join(","),
        fontSize: "1.188rem", // 19px
        fontWeight: 500,
        lineHeight: "140%",
      },
      body2: {
        fontFamily: ["Roboto, Source Sans Pro", "sans-serif"].join(","),
        fontSize: "1rem", // 16px
        fontWeight: 500,
        lineHeight: "140%",
      },
      body3: {
        fontFamily: ["Roboto, Source Sans Pro", "sans-serif"].join(","),
        fontSize: "1rem", // 16px
        fontWeight: 700,
        lineHeight: "140%",
      },
      body4: {
        fontFamily: ["Roboto, Source Sans Pro", "sans-serif"].join(","),
        fontSize: "0.813rem", // 13px
        fontWeight: 500,
        lineHeight: "140%",
      },
      placeholder: {
        opacity: "0.6",
        fontSize: "0.875rem",
        lineHeight: 1.6,
        fontWeight: "400",
      },
      title: {
        fontSize: "20px",
        fontWeight: "600",
        color: "#000000",
      },
      title2: {
        fontSize: "24px",
        fontWeight: "600",
        letterSpacing: "1%",
        lineHeight: "auto",
        color: "black",
      },
      title3: {
        fontSize: "32px",
        fontWeight: "800",
        letterSpacing: "1%",
        lineHeight: "auto",
        color: "black",
      },
      text: {
        fontSize: "12px",
        fontWeight: "200",
        lineHeight: "14.52px",
        letterSpacing: "1%",
        color: "black",
      },
      text2: {
        fontSize: "15px",
        color: "black",
        fontWeight: "600",
      },
      text3: {
        fontSize: "16px",
        color: "black",
        fontWeight: "400",
      },
    },
  };
};

// context for color mode
export const ColorModeContext = createContext({
  LightMode: () => {},
  DarkMode: () => {},
});

export const useMode = () => {
  const [mode, setMode] = useState("dark");
  const colorMode = useMemo(
    () => ({
      LightMode() {
        setMode("light");
      },

      DarkMode() {
        setMode("dark");
      },
    }),
    []
  );

  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return [theme, colorMode, mode];
};
