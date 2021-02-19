import { WebGenElements } from '@lucsoft/webgen';

import '../styles/footer.css';

export function renderFooter(body: WebGenElements)
{
    const footer = document.createElement('span');
    footer.classList.add('footer')
    const left = document.createElement('span');
    left.innerText = "lucsoft.de – Copyright 2021"
    const right = document.createElement('span');
    right.innerHTML = `<a href="https://hmsys.de/">HmSYS</a><a href="https://github.com/lucsoft">GitHub</a><a href="https://twitter.com/lucsoft_">Twitter</a><a href="https://lucsoft.de/p/imprint">Imprint</a>`
    footer.append(left, right);
    body.custom(footer);
}