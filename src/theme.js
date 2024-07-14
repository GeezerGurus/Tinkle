import {
  createContext,
  useState,
  useMemo,
  useEffect,
  useCallback,
} from "react";
import { createTheme } from "@mui/material/styles";
import { getSettings, patchSettings } from "./api/generalSettings";

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
          purple: "#B3B1EB",
          light_purple: "#AAA7F5",
          light_blue: "#34CBCB",
          orange: "#CB7034",
          blue: "#345CCB",
          red: "#D1574D",
          yellow: "#BBAF44",
          pink: "#D998E2",
          green: "#6DB673",
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
        extra: {
          pure_white: "FFFFFF",
          faint_white: "#F5F5F5",
          light_grey: "#F0F0F0",
          grey: "#D6D6D6",
          grey_accent: "#7F7F7F",
          yellow_accent: "#C7B50F",
          red_accent: "#FE3F2F",
          faint_black: "#111111",
          sideBar: "#080927",
        },
        text: {
          text1: "#F5F5F5",
          text2: "#3F3D66",
          textSecondary: "#B5B5B5",
        },
        icon: {
          icon1: "#8884DC",
          icon2: "#F5F5F5",
        },
        button: {
          button1: "#6756D8",
          button2: "#B8B5F6",
          button3: "#525085",
          editButton: "#23B6E7",
        },
        panel: {
          panel1: "#323558",
          panel2: "#938EF5",
          panel3: "#323558",
          panelBorder: "#AAA7F5",
        },
        barMeter: {
          green: "#71EFC1",
          orange: "#EFAC71",
          yellow: "#EFE371",
          red: "#EF7971",
          gray: "#D6D6D6",
        },
        notice: {
          warning: "#E85245",
          accept: "#43BC63",
        },
        balance: {
          account1: "#4F49E9",
          account2: "#89C38F",
          account3: "#807BEF",
          account4: "#8FD6A2",
        },
        backGround: "#0D0F35",
        sideBar: "#080927",
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
          pink: "#ECA8F5",
          green: "#A8F5C2",
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
          sideBar: "#080927",
          pause: "#323558",
          underLine: "#8884DC",
          totalIncome: "#8884DC",
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
        title: {
          title1: "#3F3D66",
          title2: "#111111",
        },

        text: {
          text1: "#111111",
          text2: "#111111",
          textSecondary: "#B5B5B5",
        },
        icon: {
          icon1: "#8884DC",
          icon2: "#F5F5F5",
        },
        button: {
          button1: "#8884DC",
          button2: "#CECCF9",
          button3: "#8884DC",
          editButton: "#71D0EF",
        },
        panel: {
          panel1: "#DEDDFB",
          panel2: "#D9D9D9",
          panel3: "#FFFFFF",
          panelReached: "#F5F5F5",
          panelBorder: "#E0E0E0",
        },
        barMeter: {
          green: "#A8F5C2",
          orange: "#F5CCA8",
          yellow: "#EFE371",
          red: "#D9D9D9",
          gray: "#D6D6D6",
        },
        notice: {
          warning: "#FE3F2F",
          accept: "#43BC63",
        },
        backGround: "#F5F5F5",
        sideBar: "#fff",
        profileSignUp: "525085",
        balance: {
          account1: "#9591F2",
          account2: "#B4D9B8",
          account3: "#CECCF9",
          account4: "#C5EACF",
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
              default: colors.backGround,
            },
            frameBackground: {
              default: colors.backGround,
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
              default: colors.backGround,
            },
            frameBackground: {
              default: colors.backGround,
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
      body5: {
        fontFamily: ["Roboto, Source Sans Pro", "sans-serif"].join(","),
        fontSize: "0.625rem", // 10px
        fontWeight: 500,
        lineHeight: "140%",
      },
      title6: {
        fontFamily: ["Oswald", "Roboto, Source Sans Pro", "sans-serif"].join(
          ","
        ),
        fontSize: "7.563rem", // 121px
        fontWeight: 500,
        lineHeight: "120%",
      },
      title5: {
        fontFamily: ["Oswald", "Roboto, Source Sans Pro", "sans-serif"].join(
          ","
        ),
        fontSize: "5.75rem", // 92px
        fontWeight: 500,
        lineHeight: "120%",
      },
      title4: {
        fontFamily: ["Oswald", "Roboto, Source Sans Pro", "sans-serif"].join(
          ","
        ),
        fontSize: "4.375rem", // 70px
        fontWeight: 500,
        lineHeight: "120%",
      },
      title3: {
        fontFamily: ["Oswald", "Roboto, Source Sans Pro", "sans-serif"].join(
          ","
        ),
        fontSize: "3.375rem", // 54px
        fontWeight: 500,
        lineHeight: "120%",
      },
      title2: {
        fontFamily: ["Oswald", "Roboto, Source Sans Pro", "sans-serif"].join(
          ","
        ),
        fontSize: "2.563rem", // 41px
        fontWeight: 500,
        lineHeight: "120%",
      },
      title1: {
        fontFamily: ["Oswald", "Roboto, Source Sans Pro", "sans-serif"].join(
          ","
        ),
        fontSize: "1.938rem", // 31px
        fontWeight: 500,
        lineHeight: "120%",
      },
      Hbody1: {
        fontFamily: ["Open Sans", "Roboto, Source Sans Pro", "sans-serif"].join(
          ","
        ),
        fontSize: "1.5rem", // 24px
        fontWeight: 400,
        lineHeight: "120%",
      },
      Hbody2: {
        fontFamily: ["Open Sans", "Roboto, Source Sans Pro", "sans-serif"].join(
          ","
        ),
        fontSize: "1.125rem", // 18px
        fontWeight: 400,
        lineHeight: "120%",
      },
      Hbody3: {
        fontFamily: ["Open Sans", "Roboto, Source Sans Pro", "sans-serif"].join(
          ","
        ),
        fontSize: "0.875rem", // 14px
        fontWeight: 400,
        lineHeight: "120%",
      },
    },
    breakpoints: {
      values: {
        xxs: 0,
        xs: 400, // Extra small devices (phones)
        sm: 660, // Small devices (tablets)
        md: 960, // Medium devices (small laptops)
        lg: 1280, // Large devices (desktops)
        xl: 1920, // Extra large devices (large desktops)
        laptop: 1420, // Thuta's Laptop Break Point
        tablet: 768, // Custom breakpoint for tablets
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
  const [settingId, setSettingId] = useState(null);
  const [mode, setMode] = useState("light");

  const fetchSettings = async () => {
    try {
      const res = await getSettings();
      // Set the settings ID and mode after fetching settings
      if (res && res.length > 0) {
        setSettingId(res[0]._id);
        setMode(res[0].theme);
      }
    } catch (error) {
      console.error("Error fetching settings:", error);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  const handleSavetheme = useCallback(
    async (targetTheme) => {
      try {
        if (settingId) {
          const EditedSettings = { theme: targetTheme };
          await patchSettings(settingId, EditedSettings);
        } else {
          console.error("Setting ID not found");
        }
      } catch (error) {
        console.error("Error editing setting:", error);
      }
    },
    [settingId]
  );

  const colorMode = useMemo(
    () => ({
      LightMode() {
        setMode("light");
        handleSavetheme("light");
      },

      DarkMode() {
        setMode("dark");
        handleSavetheme("dark");
      },
    }),
    [handleSavetheme] // Add settingId as a dependency
  );
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return [theme, colorMode, mode];
};
export const theme = createTheme({
  // Add other theme customizations here
});
