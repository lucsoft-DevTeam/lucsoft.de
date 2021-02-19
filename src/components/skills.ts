import { WebGenElements } from '@lucsoft/webgen';

import '../styles/skills.css';

const skillsData = [
    'CSS', 'UI', 'UX', 'TYPESCRIPT',
    'JAVASCRIPT', 'PHP', 'C#', 'JAVA',
    'LUA', 'SWIFT', 'NODE.JS', 'WEBSOCKET',
    'SQL', 'NOSQL', 'SWT', 'WEBCOMPONENTS',
    'ARDUINO', 'LIT-HTML', 'REDUX', 'C++',
    'UBUNTU', 'RASBERRYPI', 'FIGMA'
]

export function renderSkills(body: WebGenElements)
{
    const skillsArea = document.createElement('section');
    skillsArea.classList.add("skills-area")
    const mySkills = document.createElement('h2')
    mySkills.classList.add('my-skills')
    const skills = document.createElement('span')
    skills.classList.add('skills')
    mySkills.innerText = "MY SKILLS"
    skills.innerText = skillsData.join(' ');
    skillsArea.append(mySkills, skills)
    body.custom(skillsArea)
}