import { custom, img } from '@lucsoft/webgen';

import WifiNode3 from '../imgs/wifinode3.svg';

import '../styles/opener.css'

export const renderOpener = () => ({
    draw: () => {
        const opener = custom('div', undefined, "opener");

        const imageContainer = document.createElement('div');

        const images = [ 'image-left', 'image-right' ].map(x => {
            const image = img('img', WifiNode3, x);
            image.src = WifiNode3;
            image.height = 280;
            image.width = 90;
            return image;
        })

        imageContainer.append(...images);
        opener.append(imageContainer);

        opener.append(custom('h1', "18 years young developer & designer creating software and hardware with ❤️", "opener-text"));
        return opener;
    }
})