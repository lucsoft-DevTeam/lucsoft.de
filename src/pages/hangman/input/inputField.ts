import { draw, Input } from "@lucsoft/webgen";

export function getInputFromComponent(input: HTMLElement) {
    return input.querySelector("input")!;
}

export const getInputField = (onSuccess: () => void) => {
    const shell = draw(Input({
        placeholder: "Type a character"
    }));
    const input = getInputFromComponent(shell);
    input.maxLength = 1;
    input.addEventListener("keyup", (event) => { if (event.key.match(/^[a-zA-Z]$/)) onSuccess(); else input.value = "" });

    return shell;
}