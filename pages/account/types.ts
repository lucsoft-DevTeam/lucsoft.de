export type ViewState = {
    profile: ProfileData;
    stats: StatsType;
    menuState: number;
};
export type ProfileData = {
    accountType: string;
    groupes: string[];
    profile: {
        email: string;
        calledAfter: string;
        permissions: [];
        username: string;
    };
};

export type StatsType = {
    nextUpdate: number
    userCount: number
    uptime: number
    hmsys: {
        moduleCount: number,
        eventsEmitted: number
        eventListeners: number
    }
    leaks: Deno.OpMetrics
    host: {
        heap: number
        "sysMem%": number
        loadAverage: number[]
        target: string
    }
};