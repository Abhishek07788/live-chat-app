import { PaletteMode } from "@mui/material";
import { alpha, createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import breakpoints from "./breakpoints";
import palette from "./palette";
import shadows, { customShadows } from "./shadows";
import shape from "./shape";
import studentPalette from "./studentPalette";
import typography from "./typography";
import { CustomTheme, ThemeDirection, ThemeMode } from "@/types/theme";

export { default as GlobalStyles } from "./globalStyles";
export type { CustomShadowOptions } from "./shadows";
export { default as customTypography } from "./typography";
export { studentPalette, palette };
// ----------------------------------------------------------------------

const paletteMode: Record<string, PaletteMode> = {
  light: "light",
  dark: "dark",
};

export function useChatTheme(
  themeMode: ThemeMode = "light",
  themeDirection: ThemeDirection = "ltr"
): CustomTheme {
  const isLight = themeMode === "light";

  const themeOptions = useMemo(
    () => ({
      palette: isLight
        ? { ...palette.light, mode: paletteMode.light }
        : { ...palette.dark, mode: paletteMode.dark },
      shape,
      typography,
      breakpoints,
      direction: themeDirection,
      shadows: isLight ? shadows.light : shadows.dark,
      customShadows: isLight ? customShadows.light : customShadows.dark,
    }),
    [isLight, themeDirection]
  );

  const theme = createTheme(themeOptions);
  // theme.components = componentsOverride(theme);
  return theme;
}

export function useStudentTheme(
  themeMode: ThemeMode = "light",
  themeDirection: ThemeDirection = "ltr"
): CustomTheme {
  const outerTheme = useChatTheme(themeMode, themeDirection);

  const themeOptions = useMemo(
    () => ({
      ...outerTheme,
      palette: {
        ...outerTheme.palette,
        primary: studentPalette.primary,
        secondary: studentPalette.secondary,
        //   warning: studentPalette.warning
      },
      customShadows: {
        ...outerTheme.customShadows,
        primary: `0 4px 8px 0 ${alpha(studentPalette.primary.main, 0.24)}`,
        secondary: `0 4px 8px 0 ${alpha(studentPalette.secondary.main, 0.24)}`,
      },
    }),
    [outerTheme]
  );

  const theme = createTheme(themeOptions);
  // theme.components = componentsOverride(theme);
  return theme;
}
