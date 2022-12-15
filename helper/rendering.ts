import { Style } from "webgen/src/lib/Style.ts";
import { SupportedThemes } from "webgen/mod.ts";

export function getDefault(theme: Style) {
    return theme.getTheme() == SupportedThemes.autoLight ? "black" : "white";
}