import { WebGenElements } from '@lucsoft/webgen';

import WifiNode3 from '../imgs/wifinode3.svg';

import '../styles/opener.css'

export function renderOpener(body: WebGenElements)
{
    const opener = document.createElement('div');
    opener.id = "opener";

    const imageContainer = document.createElement('div');

    const images = [ 'image-left', 'image-right' ].map(x =>
    {
        const image = document.createElement('img');
        image.src = WifiNode3;
        image.id = x;
        image.height = 280;
        image.width = 90;
        return image;
    })

    imageContainer.append(...images);
    opener.append(imageContainer);

    const openerText = document.createElement('h1');
    openerText.innerText = "18 years young developer & designer creating software and hardware with ❤️";
    openerText.id = "opener-text";
    opener.append(openerText);
    body.custom(opener)
}