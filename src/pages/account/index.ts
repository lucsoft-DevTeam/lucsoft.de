import { BootstrapIcons, Button, ButtonStyle, Card, Component, createElement, custom, Dialog, draw, Horizontal, Icon, Input, loadingWheel, PageTitle, span, SupportedThemes, Vertical, View, WebGen } from "@lucsoft/webgen";
import './styles/startscreen.css';
import './styles/navigation.css';

import { NetworkConnector, EventTypes } from '@lucsoft/network-connector';
import { renderLogin } from "./login";
import { ViewOptions, User } from "./types/data";
import { timeSince } from "../../commons/time";

WebGen({ theme: SupportedThemes.light, icon: new BootstrapIcons() })
const activeView = createElement("article")
export const network = new NetworkConnector("dev.hmsys.de");
document.body.append(activeView)

View<ViewOptions>(({ use, state, update }) => {
    if (!state.networkInit) {
        network.rawOn(EventTypes.CredentialsRequired, () => {
            update({ loginRequired: true })
        })
        network.rawOn(EventTypes.LoginSuccessful, async (data) => {
            const userData = await network.api.requestUserData("profile", "groupe", "hmsys", "services") as { userData: User };
            update({ loggedIn: true, user: userData.userData, loginRequired: false })
        })
        network.ready();
        update({ networkInit: true })
        return;
    }
    if (state.loginRequired) {
        renderLogin(use);
    } else if (state.loggedIn) {
        use(Horizontal({ align: "center", margin: "13px", gap: "13px" },
            Navigation(),
            Vertical({ gap: "13px", align: "flex-start", classes: [ 'content-page' ] },
                Horizontal({ align: "space-between" },
                    ContentTitle("Profile"),
                    Button({
                        state: ButtonStyle.Inline,
                        text: state.user.profile.username ?? '???'
                    })
                ),
                createDataCard(
                    "General",
                    "Some of this data is public and will be shared with other services.",
                    OptionActionEntry("Username", state.user.profile.username, () => updateData("Username", state.user.profile.username)),
                    OptionActionEntry("Email", state.user.profile.email, () => updateData("Email", state.user.profile.email)),
                    OptionActionEntry("Password", "•••••••••••••••", () => updateData("Password", ""))
                ),
                createDataCard(
                    "Account Details",
                    "Yes",
                    OptionActionEntry("Account Age", timeSince((new Date().getTime() - state.user.profile.created) / 1000) + " ago; " + new Date(state.user.profile.created).toLocaleDateString())
                )
            )
        ))
    }
    else {
        const loadingMessage = custom("card", undefined, "loading")
        loadingMessage.append(loadingWheel())
        use(loadingMessage)
    }

})
    .addClass("startscreen")
    .setMaxWidth("80rem")
    .appendOn(activeView)

export const Spacer = () => span("");
function updateData(type: string, value: string) {
    Dialog(({ use }) => {
        use(Vertical({ margin: "0 -0.6rem", classes: [ "update-container" ] }, Input({
            placeholder: type,
            value,
            changeOn: () => {

            }
        })))
    })
        .setTitle(type)
        .allowUserClose()
        .addButton("Cancel", () => 'close')
        .addButton("Save", () => 'close')
        .open()
}


function Navigation(): Component {
    return Card(Vertical({ align: 'flex-start', classes: [ "navigation" ] },
        TitlePage(),
        Horizontal({ align: "flex-start", gap: "17px", classes: [ "link" ] }, Icon("bar-chart"), custom("div", "Dashboard")),
        Horizontal({ align: "flex-start", gap: "17px", classes: [ "link" ] }, Icon("person-circle"), custom("div", "Profile")),
        Horizontal({ align: "flex-start", gap: "17px", classes: [ "link" ] }, Icon("shield-exclamation"), custom("div", "Security log")),
        Horizontal({ align: "flex-start", gap: "17px", classes: [ "link" ] }, Icon("bag"), custom("div", "Services"))
    ));
}

function createDataCard(pageTitle: string, description: string, ...components: Component[]) {
    return Card(Vertical({ classes: [ "options" ], gap: ".5rem" },
        PageTitle(pageTitle),
        span(description, "description"),
        Vertical({ classes: [ "list" ] }, ...components)
    ));
}

function OptionActionEntry(label: string, value: string, action?: () => void) {
    if (action) {
        const data = draw(Horizontal({ align: "space-between", classes: [ "entry" ] },
            Horizontal({}, span(label, "label"), span(value)),
            Icon("chevron-right")
        ));
        data.onclick = () => action()
        return data;
    } else
        return Horizontal({ align: "space-between", classes: [ "entry", "nohover" ] },
            Horizontal({}, span(label, "label"), span(value))
        );
}

function ContentTitle(title: string) {
    const element = PageTitle(title).draw();
    element.classList.add('content-title')
    return element;
}

function TitlePage() {
    const page = PageTitle("HmSYS Network").draw();
    page.classList.add("menu-title")
    return page;
}
