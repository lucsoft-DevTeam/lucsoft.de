import { custom, RenderElement } from '@lucsoft/webgen';

import '../styles/navigation.css';

const navigationElements = [
    { title: 'lucsoft.de', url: 'https://lucsoft.de' },
    { title: 'GitHub', url: 'https://github.com/lucsoft' },
    { title: 'HmSYS', url: 'https://lucsoft.de/p/hmsys' },
    { title: 'Contact', url: 'mailto:mail@lucsoft.de' }
];

export const renderNavigation = (): RenderElement => ({
    draw: () => {
        const nav = custom('div', undefined, 'nav')
        navigationElements.forEach((x) => {
            const label = custom('a', x.title) as HTMLAnchorElement
            label.href = x.url
            nav.append(label)
        })
        return nav
    }
})