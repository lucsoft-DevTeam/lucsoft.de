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
    "nextUpdate": number;
    "userCount": number;
    "uptime": number;
    "hmsys": {
        "eventsEmitted": number;
        "eventListeners": number;
        "moduleCount": number;
    };
    "leaks": {
        "opsDispatched": number;
        "opsDispatchedSync": number;
        "opsDispatchedAsync": number;
        "opsDispatchedAsyncUnref": number;
        "opsCompleted": number;
        "opsCompletedSync": number;
        "opsCompletedAsync": number;
        "opsCompletedAsyncUnref": number;
        "bytesSentControl": number;
        "bytesSentData": number;
        "bytesReceived": number;
    };
    "host": {
        "memory": {
            "rss": number;
            "heapTotal": number;
            "heapUsed": number;
            "external": number;
        };
        "systemMemory": {
            "total": number;
            "free": number;
            "available": number;
            "buffers": number;
            "cached": number;
            "swapTotal": number;
            "swapFree": number;
        };
        "loadAverage": [ number, number, number ];
        "target": string;
    };
};
