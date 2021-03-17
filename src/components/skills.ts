import { custom, span, WebGenElements } from '@lucsoft/webgen';

import '../styles/skills.css';

const skillProgressData: [ string, number ][] = [
    [ "Web Development", 70 ],
    [ "UI / UX", 45 ],
    [ "Backend Development", 30 ],
    [ "Hardware/Firmware Development", 10 ],
    [ "Mobile Development", 8 ]
]
const skillsData = [
    'CSS', 'UI', 'UX', 'TYPESCRIPT',
    'JAVASCRIPT', 'PHP', 'C#', 'JAVA',
    'LUA', 'SWIFT', 'NODE.JS', 'WEBSOCKET',
    'SQL', 'NOSQL', 'SWT', 'WEBCOMPONENTS',
    'WEBPACK', 'LINUX', 'WINDOWS SERVER',
    'ESP8266',
    'ARDUINO', 'LIT-HTML', 'REDUX', 'C++',
    'UBUNTU', 'RASPBERRY PI', 'FIGMA'
]

export function renderSkills(body: WebGenElements)
{
    const skillsArea = custom('section', undefined, "skills-area");
    const mySkills = custom('h2', "MY SKILLS", 'my-skills')
    const renderProgressBar = (name: string, progress: number) =>
    {
        const background = custom('div', undefined, 'skill-bar');
        const foreground = custom('div', span(name))
        foreground.style.width = `${progress}%`;
        background.append(span(name), foreground)
        return background
    }
    const skills = span(skillsData.join(' '), 'skills')
    skillsArea.append(mySkills, ...skillProgressData.map(x => renderProgressBar(x[ 0 ], x[ 1 ])), skills)
    body.custom(skillsArea)
}