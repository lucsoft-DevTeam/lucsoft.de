import { cards, WebGenElements } from '@lucsoft/webgen';

import digiifyLogo from '../imgs/digiify_logo.svg';
import hmsysLogo from '../imgs/hmsys_logo.svg';
import homesysLogo from '../imgs/homesys_logo.svg';
import rubiconLogo from '../imgs/rubicon_logo.svg';

export function renderCards(body: WebGenElements)
{
    body.cards({},
        cards.modernCard({
            align: "right",
            title: 'DataStoreDB',
            subtitle: "Typescript – HmSYS",
            description: "If you know Panda you will love DataStoreDB"
        }),
        cards.modernCard({
            align: "right",
            icon: digiifyLogo,
            title: 'Digiify',
            subtitle: "SWIFT – HmSYS",
            description: "Digiify is a prototype for analysing and fetching data"
        }),
        cards.modernCard({
            align: "right",
            icon: hmsysLogo,
            title: 'HmSYS',
            subtitle: "Typescript – Node.JS",
            description: "HmSYS is a Dynamic sharded server network that can handle multiple services and modules "
        }),
        cards.modernCard({
            align: "right",
            icon: homesysLogo,
            title: 'HomeSYS',
            subtitle: "Typescript – HmSYS",
            description: "HomeSYS is a Project that aims to provide a easy to use Platfrom for you Smart Home Devices "
        }),
        cards.modernCard({
            align: "right",
            title: 'WebGen',
            subtitle: "Typescript – NPM",
            description: "WebGen is a UI/Rest/Websocket lib to create Webtools or Websites, like this one"
        }),
        cards.modernCard({
            align: "right",
            title: "Rubicon",
            subtitle: "PHP",
            icon: rubiconLogo,
            description: "Rubicon was a Discord Bot where i worked on the webpanel ❤️ RIP"
        }),
        cards.modernCard({
            align: "right",
            title: "easyi2c",
            subtitle: "Javascript – NPM",
            description: "a tool for Pi’s to control i2c devices a modern way"
        }),
        cards.modernCard({
            align: "right",
            title: "NCSwitch",
            subtitle: "Typescript – NPM",
            description: "a pi program that allowed to use local/wired protocols"
        }),
        cards.modernCard({
            align: "right",
            title: "DRK PSYS ",
            subtitle: "PHP – WebGen 2018/19",
            description: "Punktesystem is a small tool for DRK OV Furtwangen"
        }),
        cards.modernCard({
            align: "right",
            title: "PSYS 2.0",
            subtitle: "Typescript – WebGen",
            description: "PSYS 2.0 is the new version with better UI and UX for DRK OV Furtwangen"
        })
    ).last.style.marginTop = "9rem";
}