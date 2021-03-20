import { createElement } from "@lucsoft/webgen";

export const getInputField = (onSuccess: () => void) =>
{
    const input = createElement('input') as HTMLInputElement;
    input.maxLength = 1;
    input.style.maxWidth = "26.3rem";
    input.style.margin = "0.8rem auto";
    input.classList.add('maxWidth', 'default');
    input.placeholder = "Type a character";
    input.addEventListener("keyup", (event) => { if (event.key.match(/^[a-zA-Z]$/)) onSuccess(); else input.value = "" });

    return input;
}