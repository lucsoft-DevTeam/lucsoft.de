import { span, WebGenElements } from '@lucsoft/webgen';

import '../styles/skills.css';

const skillProgressData: [ string, number ][] = [
    [ "Web Development", 77 ],
    [ "UI / UX", 50 ],
    [ "Backend Development", 32 ],
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
    const skillsArea = document.createElement('section');
    skillsArea.classList.add("skills-area")
    const mySkills = document.createElement('h2')
    mySkills.classList.add('my-skills')
    mySkills.innerText = "MY SKILLS"
    const renderProgressBar = (name: string, progress: number) =>
    {
        const background = document.createElement('div');
        background.classList.add('skill-bar')
        const foreground = document.createElement('div')
        foreground.style.width = `${progress}%`;
        foreground.append(span(name))
        background.append(span(name), foreground)
        return background
    }
    const skills = span(skillsData.join(' '))
    skills.classList.add('skills')
    skillsArea.append(mySkills, ...skillProgressData.map(x => renderProgressBar(x[ 0 ], x[ 1 ])), skills)
    body.custom(skillsArea)
}