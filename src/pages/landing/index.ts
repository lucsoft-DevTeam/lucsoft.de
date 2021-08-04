import { View, WebGen } from '@lucsoft/webgen';
import { renderCards } from './cards';
import { renderFooter } from '../../components/footer';
import { renderNavigation } from '../../components/navigation';
import { renderOpener } from './opener';
import { renderSkills } from './skills';

WebGen();

View(({ use }) => {
    use(renderNavigation())
    use(renderOpener())
    use(renderCards())
    use(renderSkills())
    use(renderFooter())
})
    .setMaxWidth('80rem')
    .appendOn(document.body)
