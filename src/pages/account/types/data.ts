
export type User = {
    id: string;
    accountType: "developer" | "tester" | "autoCreateAccount";
    profile: {
        email: string;
        calledAfter?: string;
        username: string;
        avatar?: string;
        created: number;
        permissions: string[];
    };
    groupes: string[];
    services: {
        [ key in string ]: unknown;
    };
};

export type ViewOptions = {
    networkInit: boolean;
    loginRequired: boolean;
    openView: "Dashboard" | "Profile" | "Security" | "Services"
    loggedIn: boolean;
    user: User;
};
