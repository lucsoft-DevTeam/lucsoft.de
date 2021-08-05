import { custom, Horizontal, span } from '@lucsoft/webgen';

import '../styles/footer.css';

export const renderFooter = () => Horizontal({ align: "space-between", classes: [ "footer" ] },
    span("lucsoft.de – Copyright 2021"),
    Horizontal({ align: 'flex-end', gap: "2rem" },
        ...[
            [ "hmsys.de/", "HmSYS" ],
            [ "github.com/lucsoft", "GitHub" ],
            [ "twitter.com/lucsoft", "Twitter" ],
            [ "lucsoft.de/p/imprint", "Imprint" ]
        ].map(([ url, name ]) => {
            const link = custom("a", name) as HTMLAnchorElement
            link.href = "https://" + url;
            return link
        })
    )
)