import { SupportedThemes, WebGen } from '@lucsoft/webgen';
import { renderCards } from './components/cards';
import { renderFooter } from './components/footer';
import { renderNavigation } from './components/navigation';
import { renderOpener } from './components/opener';
import { renderSkills } from './components/skills';

const web = new WebGen();

const page = web.elements.body({ maxWidth: '80rem' })

renderNavigation(page)
renderOpener(page)
renderCards(page)
renderSkills(page)
renderFooter(page)

web.style.handleTheme(SupportedThemes.auto);