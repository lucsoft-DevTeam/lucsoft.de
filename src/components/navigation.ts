import { WebGenElements } from '@lucsoft/webgen';

import '../styles/navigation.css';

const navigationElements = [
    { title: 'lucsoft.de', url: 'https://lucsoft.de' },
    { title: 'GitHub', url: 'https://github.com/lucsoft' },
    { title: 'HmSYS', url: 'https://lucsoft.de/p/hmsys' },
    { title: 'Contact', url: 'mailto:mail@lucsoft.de' }
];

export function renderNavigation(body: WebGenElements)
{
    const nav = document.createElement('div')
    nav.classList.add('nav')
    navigationElements.forEach((x) =>
    {
        const label = document.createElement('a')
        label.innerText = x.title
        label.href = x.url
        nav.append(label)
    })
    body.custom({ element: nav })
}