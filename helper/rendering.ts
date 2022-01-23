import { Style } from "https://deno.land/x/webgen@v2.0.0-beta.0/src/lib/Style.ts";
import { SupportedThemes } from "https://deno.land/x/webgen@v2.0.0-beta.0/mod.ts";

export function getDefault(theme: Style) {
    return theme.getTheme() == SupportedThemes.autoLight ? "black" : "white";
}