import { custom, WebGenElements } from '@lucsoft/webgen';

import WifiNode3 from '../imgs/wifinode3.svg';

import '../styles/opener.css'

export function renderOpener(body: WebGenElements)
{
    const opener = custom('div', undefined, "opener");

    const imageContainer = document.createElement('div');

    const images = [ 'image-left', 'image-right' ].map(x =>
    {
        const image = custom('img', undefined, x) as HTMLImageElement;
        image.src = WifiNode3;
        image.height = 280;
        image.width = 90;
        return image;
    })

    imageContainer.append(...images);
    opener.append(imageContainer);

    opener.append(custom('h1', "18 years young developer & designer creating software and hardware with ❤️", "opener-text"));
    body.custom(opener)
}