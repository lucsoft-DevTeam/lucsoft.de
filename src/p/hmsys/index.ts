import { SupportedThemes, WebGen, cards } from '@lucsoft/webgen';
import { renderNavigation } from '../../components/navigation';
import './animation.css';
import { svgElements } from './componets/svgRender';

const web = new WebGen();
web.ready = async () =>
{
    const services = Promise.allSettled([
        fetch("https://eu01.hmsys.de/stats"),
        fetch("https://eu01.hmsys.de:444/stats")
    ]);
    const servicesName = [
        "Europa Stable Server (eu01/stable)",
        "Europa Development Server (eu01/dev)"
    ]

    const body = web.elements.body({ maxWidth: "80rem" })

    const { action, list, span } = web.elements.none().components;
    const background = document.createElement('div');
    background.style.position = "fixed"
    background.style.top = "5rem";
    background.style.left = "-8%";
    background.style.right = "25%";
    background.style.zIndex = "-1";

    background.innerHTML = `<svg viewBox="0 0 5019 4492" fill="none" xmlns="http://www.w3.org/2000/svg">${svgElements.map(x => `<rect width="${x[ 0 ]}" height="${x[ 0 ]}" transform="matrix(${x[ 1 ]})" fill="${x[ 2 ]}" ${typeof x[ 3 ] !== "undefined" ? `class="mv ${x[ 3 ]}"` : ''}/>`)}</svg>`;
    renderNavigation(body)

    body.custom({ element: background })

    const statusCard = body.cards({ maxWidth: "50rem" }).last

    statusCard.style.marginTop = "10%";

    let statusPage = [ cards.richCard({
        title: 'HmSYS Status',
        content: span('Fetching Service...')

    }) ];
    action(statusCard, 'value', statusPage);
    services.then(async x =>
    {
        const data = await Promise.all(x.map(x => x.status == "fulfilled" ? x.value.json() : undefined))

        statusPage = [
            cards.richCard({
                title: 'HmSYS Status',
                content:
                    list({ noHeigthLimit: false }, ...data.map((entry, index) => ({
                        left: servicesName[ index ],
                        right: span((() =>
                        {
                            if (!entry)
                                return "Offline";
                            else if (entry.host.loadAverage[ 0 ] < 3)
                                return "Operational"
                            else if (entry.host.loadAverage[ 0 ] > 3)
                                return "Abnormal load"
                            return "Timeout"
                        })())
                    })))

            }),
            ...data.filter(x => x != undefined).map((entry, index) => cards.richCard({
                title: servicesName[ index ],
                content:
                    list(
                        { noHeigthLimit: false },
                        {
                            left: 'LoadAverage',
                            right: entry.host.loadAverage.map((x: number) => x.toFixed(2)).join(' ')
                        },
                        {
                            left: 'Uptime (HmSYS)',
                            right: span(new Date(entry.uptime).toLocaleString())
                        },
                        {
                            left: 'Uptime (Host)',
                            right: span(new Date(entry.host.uptime).toLocaleString())
                        },
                        {
                            left: 'Events since Restart',
                            right: span(entry.eventsEmitted)
                        }
                    )
            }))
        ];
        action(statusCard, 'value', statusPage);
    })

}

web.enable(SupportedThemes.auto)