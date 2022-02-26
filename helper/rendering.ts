import { Style } from "https://deno.land/x/webgen@v2.0.0-beta.1/src/lib/Style.ts";
import { SupportedThemes } from "https://deno.land/x/webgen@2.0.0-beta.8/mod.ts";

export function getDefault(theme: Style) {
    return theme.getTheme() == SupportedThemes.autoLight ? "black" : "white";
}