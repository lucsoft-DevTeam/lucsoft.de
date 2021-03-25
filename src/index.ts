import { WebGen } from '@lucsoft/webgen';
import { renderCards } from './components/cards';
import { renderFooter } from './components/footer';
import { renderNavigation } from './components/navigation';
import { renderOpener } from './components/opener';
import { renderSkills } from './components/skills';

const web = WebGen();

web.render.toBody({ maxWidth: '80rem' }, {}, () => [
    renderNavigation(),
    renderOpener(),
    renderCards(),
    renderSkills(),
    renderFooter()

])
