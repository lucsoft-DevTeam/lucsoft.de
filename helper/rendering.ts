import { Style } from "https://raw.githubusercontent.com/lucsoft/WebGen/104bc41/src/lib/Style.ts";
import { SupportedThemes } from "https://raw.githubusercontent.com/lucsoft/WebGen/104bc41/mod.ts";

export function getDefault(theme: Style) {
    return theme.getTheme() == SupportedThemes.autoLight ? "black" : "white";
}