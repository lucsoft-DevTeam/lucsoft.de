import { WebGenElements } from '@lucsoft/webgen';

import WifiNode3 from '../imgs/wifinode3.svg';

import '../styles/opener.css'

export function renderOpener(body: WebGenElements)
{
    const opener = document.createElement('div');
    opener.id = "opener";

    const imageContainer = document.createElement('div');

    const imageLeft = document.createElement('img');
    imageLeft.src = WifiNode3;
    imageLeft.id = 'image-left';
    imageLeft.height = 280;

    const imageRight = document.createElement('img');
    imageRight.src = WifiNode3;
    imageRight.id = 'image-right';
    imageRight.height = 280;

    imageContainer.append(imageLeft, imageRight);
    opener.append(imageContainer);

    const openerText = document.createElement('h1');
    openerText.innerText = "18 years young developer & designer creating software and hardware with ❤️";
    openerText.id = "opener-text";
    opener.append(openerText);
    body.custom(opener)
}