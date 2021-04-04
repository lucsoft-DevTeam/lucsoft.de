import { span } from '@lucsoft/webgen';

import '../styles/footer.css';

export const renderFooter = () => ({
    draw: () => {
        const footer = span(undefined, 'footer');
        const right = span(undefined);
        right.innerHTML = `<a href="https://hmsys.de/">HmSYS</a><a href="https://github.com/lucsoft">GitHub</a><a href="https://twitter.com/lucsoft">Twitter</a><a href="https://lucsoft.de/p/imprint">Imprint</a>`
        footer.append(span("lucsoft.de – Copyright 2021"), right);
        return footer;
    }
})