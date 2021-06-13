import { View, WebGen } from '@lucsoft/webgen';
import { renderCards } from './cards';
import { renderFooter } from '../../components/footer';
import { renderNavigation } from '../../components/navigation';
import { renderOpener } from './opener';
import { renderSkills } from './skills';

WebGen();

View(({ draw }) => {
    draw(renderNavigation())
    draw(renderOpener())
    draw(renderCards())
    draw(renderSkills())
    draw(renderFooter())
})
    .setMaxWidth('80rem')
    .appendOn(document.body)
