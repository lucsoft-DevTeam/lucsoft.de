import { SupportedThemes, WebGen } from '@lucsoft/webgen';

import digiifyLogo from './imgs/digiify_logo.svg';
import hmsysLogo from './imgs/hmsys_logo.svg';
import homesysLogo from './imgs/homesys_logo.svg';
import rubiconLogo from './imgs/rubicon_logo.svg';
import test from './imgs/wifinode3.svg';

const web = new WebGen();
var customStyle = document.createElement('style');
document.head.append(customStyle);

customStyle.innerHTML = `
        #nav {
            padding: 0;
            margin: 0 auto;
            max-width: 68.5rem;
            grid-template-columns: auto max-content max-content max-content;
            opacity: 0.6;
            display: grid;
            animation: flowIn 1500ms ease;
        }

        #nav a {
            font-size: 1.8rem;
            padding: 1.6rem;
            display: inline-block;
            cursor: pointer;
            color: var(--default-card-color);
            text-decoration: none;
        }

        #opener-text {
            font-weight: bold;
            display: inline-block;
            text-align: right;
            font-size: 3.9rem;
            width: 43rem;
            text-align-last: right;
        }

        #opener {
            text-align-last: center;
            display: grid;
            max-width: 65.3rem;
            margin: 8rem auto 0;
            grid-template-columns: auto max-content;
            animation: flowIn 700ms ease;
        }

        #image-left {
            transform: translate(-.8rem,3rem);
            animation: flyLeft 6000ms cubic-bezier(0.59, 0.35, 0.2, 1.07) infinite;
        }

        #image-right {
            transform: translate(0.8rem, -1.6rem) rotate(180deg);
            animation: flyRight 6000ms cubic-bezier(0.59, 0.35, 0.2, 1.07) infinite;
        }
        @keyframes flyRight {
            0% {
                transform: translate(0.8rem, 0rem) rotate(180deg);
            }
            50% {
                transform: translate(0.8rem, -2.6rem) rotate(180deg);
            }
            100% {
                transform: translate(0.8rem, 0rem) rotate(180deg);
            }
        }
        @keyframes flyLeft {
            0% {

            transform: translate(-.8rem,5rem);
            }
            50% {
                transform: translate(-.8rem,2.6rem);
            }
            100% {
                transform: translate(-.8rem,5rem);
            }
        }
        @keyframes flowIn {
            0% {
                filter: blur(0.05rem);
                opacity: 0.5;
                transform: translate(0,-0.2rem) scale(0.99);
            }
        }
        cardlist card {
            animation: flowIn 1500ms ease;
            margin: 0.75rem;
        }
        .skills-area {
            width: 70.5rem;
            margin: 4rem auto 10rem;
            display: grid;
        }
        .my-skills {
            font-size: 8rem;
            font-weight: 600;
            width: 28rem;
            margin: 0;
            margin-bottom: 2rem;
            text-align:left;
        }
        .skills {
            font-size: 5rem;
            font-weight: 600;
            width: 62rem;
            text-align: right;
            justify-self: right;
        }
        #footer {
            margin: 0 auto;
            display: grid;
            grid-template-columns: auto max-content;
            max-width: 64rem;
            opacity: .6;
        }
        #footer span a {
            color: var(--default-card-color);
            text-decoration: none;
            padding: 1rem;
        }
        cardlist {
            max-width: 67rem;
        }
        @media (max-width: 1129px)  {
            #nav a {
                font-size: 1.5rem;
                padding: 1.5rem;
            }
            #nav {
                max-width: 59.5rem;
            }
            #opener {
                max-width: 56.3rem;
            }
            #opener-text {
                font-size: 3.2rem;
                width: 34rem;
            }
            cardlist {
                max-width: 57rem !important;
            }
            card.modern {
                padding: 1.2rem;
                margin: 0.6rem
            }
            card.modern .subtitle {
                font-size: 1rem;
            }
            card.modern img {
                height: 3.5rem;
                left: 0;
                top: 0;
                float: left;
                position: relative;
            }
            card.modern .description {
                font-size: 1.1rem;
            }
            card.modern .title {
                font-size: 2.5rem;
            }
            .skills-area {
                max-width: 57rem;
                width: unset;
            }
            .my-skills {
                font-size: 5.5rem;
                margin-bottom: 1.2rem;
                width: min-content;
            }
            .skills {
                font-size: 4rem;
                max-width: 50rem;
            }
            #footer {
                max-width: 59rem;
            }
        }
        @media(max-width: 957px) {
            #nav {
                margin: 0 1.4rem;
            }
            #opener {
                margin: 4rem 2.2rem 0;
            }
            #opener #opener-text {
                font-size: 2.7rem;
                width: 29rem;
                padding-right: 2rem;
            }
            #opener div {
                transform: scale(0.7);
            }
            cardlist {
                margin-top: 3rem !important;
            }
            .skills-area {
                margin: 4rem 3rem 3rem;
            }
            .my-skills {
                font-size: 4rem;
                margin-bottom: 1rem;
            }
            .skills {
                font-size: 2.5rem;
                max-width: 70vw;
            }
            #footer {
                max-width: unset;
                width: unset;
                margin: 0 2rem;
            }
        }
        @media(max-width: 785px) {
            #opener #opener-text {
                padding-right: 1rem;
            }
            #opener div {
                width: 12rem;
            }

        }
        @media(max-width: 729px) {
            #opener {
                grid-template-columns: auto;
            }
            #nav a {
                font-size: 1rem;
                padding: 1rem 0.5rem 0.5rem;
            }
            #opener div {
                width: unset;
                margin-bottom: 1rem;
                transform: scale(0.7) translate(0, -4rem);
                justify-self: center;
            }
            .skills-area {
                margin: .5rem 1rem 3rem;
            }
            .my-skills {
                font-size: 3rem;
                margin-bottom: 1rem;
            }
            .skills {
                font-size: 2rem;
                max-width: 81vw;
            }
            #opener #opener-text {
                width: auto;
                padding: 0;
            }
            #footer {
                font-size: .8rem;
            }
            #footer span a {
                padding: 1rem 0.3rem;
            }
        }
    `;
const nav = document.createElement('ul')
nav.id = "nav";
[ { title: 'lucsoft.de', url: 'https://lucsoft.de' }, { title: 'GitHub', url: 'https://github.com/lucsoft' }, { title: 'HmSYS', url: 'https://hmsys.de' }, { title: 'Contact', url: 'mailto:mail@lucsoft.de' } ].forEach((x) =>
{
    const label = document.createElement('a');
    label.innerText = x.title;
    label.href = x.url;
    nav.append(label);
})
const opener = document.createElement('div');
opener.id = "opener";

const imageContainer = document.createElement('div');

const imageLeft = document.createElement('img');
imageLeft.src = test;
imageLeft.id = 'image-left';

const imageRight = document.createElement('img');
imageRight.src = test;
imageRight.id = 'image-right';

imageContainer.append(imageLeft, imageRight);
opener.append(imageContainer);

const openerText = document.createElement('h1');
openerText.innerText = "17 years young developer & designer creating software and hardware with ❤️";
openerText.id = "opener-text";
opener.append(openerText);

const cards = web.elements.body()
    .custom({ element: nav })
    .custom({ element: opener })
    .cards({
        columns: "auto",
        style: "modern",
        maxWidth: "null",
        cards: [
            {
                align: "right",
                icon: digiifyLogo,
                title: 'Digiify',
                subtitle: "SWIFT – HmSYS",
                description: "Digiify is a app that is currently in development more infos coming later"
            },
            {
                align: "right",
                icon: hmsysLogo,
                title: 'HmSYS',
                subtitle: "Typescript – Node.JS",
                description: "HmSYS is a Dynamic sharded server network that can handle multiple services and modules "
            },
            {
                align: "right",
                icon: homesysLogo,
                title: 'HomeSYS',
                subtitle: "Typescript – HmSYS",
                description: "HomeSYS is a Project that aims to provide a easy to use Platfrom for you Smart Home Devices "
            },
            {
                align: "right",
                title: 'WebGen',
                subtitle: "Typescript – NPM",
                description: "WebGen is a UI/Rest/Websocket lib to create Webtools or Websites, like this one"
            },
            {
                align: "right",
                title: "Rubicon",
                subtitle: "PHP",
                icon: rubiconLogo,
                description: "Rubicon was a Discord Bot where i worked on the webpanel ❤️ RIP"
            },
            {
                align: "right",
                title: "easyi2c",
                subtitle: "Javascript – NPM",
                description: "a tool for Pi’s to control i2c devices a modern way"
            },
            {
                align: "right",
                title: "NCSwitch",
                subtitle: "Typescript – NPM",
                description: "a pi program that allowed to use local/wired protocols"
            },
            {
                align: "right",
                title: "DRK PSYS",
                subtitle: "PHP – WebGen 2018/19",
                description: "Punktesystem is a small tool for DRK OV Furtwangen"
            }
        ]
    })
cards.last.style.marginTop = "9rem";
const title = cards.last.querySelectorAll('card')[ 2 ]?.querySelector?.('.title') as HTMLSpanElement | undefined;
if (title)
    title.style.letterSpacing = "-0.1rem";

const skillsArea = document.createElement('section');
skillsArea.classList.add("skills-area");
const mySkills = document.createElement('h2');
mySkills.classList.add('my-skills')
const skills = document.createElement('span');
skills.classList.add('skills');
mySkills.innerText = "MY SKILLS";
skills.innerText = `CSS UI UX TYPESCRIPT JAVASCRIPT PHP C# JAVA LUA SWIFT NODE.JS WEBSOCKET SQL NOSQL SWT WEBCOMPONENTS ARDUINO LIT-HTML REDUX C++ UBUNTU RASBERRY PI FIGMA`;
skillsArea.append(mySkills, skills);

const footer = document.createElement('span');
footer.id = "footer";
const left = document.createElement('span');
left.innerText = "lucsoft.de – Copyright 2020"
const right = document.createElement('span');
right.innerHTML = `<a href="https://hmsys.de/">HmSYS</a><a href="https://github.com/lucsoft">GitHub</a><a href="https://twitter.com/lucsoft_">Twitter</a><a href="https://lucsoft.de/p/imprint">Imprint</a>`
footer.append(left, right);
cards.custom({ element: skillsArea }).custom({ element: footer });

web.style.handleTheme(SupportedThemes.auto);