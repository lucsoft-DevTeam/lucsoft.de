import { Component, custom, draw, Grid, loginCard, Vertical } from "@lucsoft/webgen";
import { EventTypes } from '@lucsoft/network-connector';
import { renderNavigation } from "../../components/navigation";
import { renderFooter } from "../../components/footer";
import { network, Spacer } from "./index";

export function renderLogin(use: (comp: Component) => void) {
    const div = custom("div", undefined);
    div.style.height = "100vh";
    div.append(draw(Vertical({ align: "space-between" },
        renderNavigation(),
        Grid({ maxWidth: "28rem" }, loginCard({
            email: { text: 'Email' },
            password: { text: 'Password' },
            makeLogin: async ({ password, email }) => new Promise(done => {
                network.rawOn(EventTypes.LoginFailed, () => {
                    done(false);
                });
                network.rawOn(EventTypes.LoginSuccessful, () => {
                    done(true);
                });
                network.authorize(email!, password);
            })
        })),
        Spacer(),
        Spacer(),
        renderFooter()
    )));
    use(div);
}
