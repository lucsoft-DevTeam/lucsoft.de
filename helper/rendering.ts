import { Style } from "../../WebGen/src/lib/Style.ts";
import { SupportedThemes } from "../../WebGen/src/webgen.ts";

export function getDefault(theme: Style) {
    return theme.getTheme() == SupportedThemes.autoLight ? "black" : "white";
}