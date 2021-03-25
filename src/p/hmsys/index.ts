import { WebGen, list, span, Custom, Card, CommonCard, richCard } from '@lucsoft/webgen';
import { renderNavigation } from '../../components/navigation';
import './animation.css';
import { svgElements } from './componets/svgRender';

const web = WebGen();

const services = Promise.allSettled([
    fetch("https://eu01.hmsys.de/stats"),
    fetch("https://eu01.hmsys.de:444/stats")
]);
const servicesName = [
    "Europa Stable Server (eu01/stable)",
    "Europa Development Server (eu01/dev)"
]

const background = document.createElement('div');
background.style.position = "fixed"
background.style.top = "5rem";
background.style.left = "-8%";
background.style.right = "25%";
background.style.zIndex = "-1";

background.innerHTML = `<svg viewBox="0 0 5019 4492" fill="none" xmlns="http://www.w3.org/2000/svg">${svgElements.map(x => `<rect width="${x[ 0 ]}" height="${x[ 0 ]}" transform="matrix(${x[ 1 ]})" fill="${x[ 2 ]}" ${typeof x[ 3 ] !== "undefined" ? `class="mv ${x[ 3 ]}"` : ''}/>`)}</svg>`;

// statusCard.style.marginTop = "10%";
const body = web.render.toBody({ maxWidth: "80rem" }, {
    statusPage: [] as CommonCard[]
}, () => [
    renderNavigation(),
    Custom(background),
    (_, { statusPage }) => Card({ maxWidth: "50rem" },
        ...(statusPage.length == 0
            ? [ richCard({
                title: 'HmSYS Status',
                content: span('Fetching Service...')
            }) ]
            : statusPage
        )
    )
])

function timeSince(date: number) {

    var seconds = Math.floor(date);

    var interval = seconds / 31536000;

    interval = seconds / 86400;
    if (interval > 1) {
        return Math.floor(interval) + " days";
    }
    interval = seconds / 3600;
    if (interval > 1) {
        return Math.floor(interval) + " hours";
    }
    interval = seconds / 60;
    if (interval > 1) {
        return Math.floor(interval) + " minutes";
    }
    return Math.floor(seconds) + " seconds";
}
services.then(async x => {
    const data = await Promise.all(x.map(x => x.status == "fulfilled" ? x.value.json() : undefined))
    body.redraw({
        statusPage: [
            richCard({
                title: 'HmSYS Status',
                content:
                    list({ noHeigthLimit: false }, ...data.map((entry, index) => ({
                        left: servicesName[ index ],
                        right: span((() => {
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
            ...data.filter(x => x != undefined).map((entry, index) => richCard({
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
                            right: span(timeSince((new Date().getTime() - entry.uptime) / 1000))
                        },
                        {
                            left: 'Uptime (Host)',
                            right: span(timeSince(entry.host.uptime))
                        },
                        {
                            left: 'Events since Restart',
                            right: span(entry.eventsEmitted)
                        }
                    )
            }))
        ]
    })
})
