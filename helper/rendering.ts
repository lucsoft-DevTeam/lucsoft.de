import { Style } from "https://deno.land/x/webgen@2.0.0-beta.9/src/lib/Style.ts";
import { SupportedThemes } from "https://deno.land/x/webgen@2.0.0-beta.9/mod.ts";

export function getDefault(theme: Style) {
    return theme.getTheme() == SupportedThemes.autoLight ? "black" : "white";
}