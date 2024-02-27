import { Theme, ThemeOptions } from "@mui/material";
import {
  Palette,
  PaletteColor,
  PaletteOptions,
  SimplePaletteColorOptions,
  TypeBackground,
} from "@mui/material/styles/createPalette";
import { CustomShadowOptions } from "../theme/shadows";
import { GradientsPaletteOptions } from "@/theme/palette";

export type Modify<T, R> = Omit<T, keyof R> & R;

export type ThemeMode = "light" | "dark";
export type ThemeDirection = "rtl" | "ltr";
export type ThemeColor =
  | "default"
  | "purple"
  | "cyan"
  | "blue"
  | "orange"
  | "red";

// declare module "@mui/material/styles/createTheme" {
//   export type ITheme = Theme & {
//     customShadows: CustomShadowOptions;
//   };

//   export type IThemeOptions = ThemeOptions & {
//     customShadows?: CustomShadowOptions;
//   };

//   export function createTheme(
//     options?: IThemeOptions,
//     ...args: object[]
//   ): ITheme;

//   export function useTheme<T = ITheme>(): T;
// }

export type CustomTypebackground = Modify<
  TypeBackground,
  {
    neutral: string;
  }
>;

export type CustomSimplePaletteColorOptions = Modify<
  SimplePaletteColorOptions,
  {
    lighter: string;
    darker: string;
  }
>;

export type CustomPaletteColor = Modify<
  PaletteColor,
  {
    lighter: string;
    darker: string;
  }
>;

export type CustomPalette = Modify<
  Palette,
  {
    gradients: GradientsPaletteOptions;
  }
>;

export type CustomPaletteOptions = Modify<
  PaletteOptions,
  {
    gradients?: GradientsPaletteOptions;
  }
>;

export type CustomTheme = Modify<
  Theme,
  {
    customShadows: CustomShadowOptions;
    palette: CustomPalette;
  }
>;

export type CustomThemeOptions = Modify<
  ThemeOptions,
  {
    customShadows: CustomShadowOptions;
    palette: CustomPaletteOptions;
  }
>;
