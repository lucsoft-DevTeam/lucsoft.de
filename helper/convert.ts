export function bytes(number?: number) {
    if (!number) return undefined;
    let interval = number;
    interval = number / 1000000;
    if (interval > 1) return `${Math.floor(interval)}Mb`;
    interval = number / 1000;
    return `${Math.floor(interval)}Kb`;
}
export function timeSince(date?: number) {
    if (!date) return undefined;
    const seconds = Math.floor((new Date().getTime() - date) / 1000);
    let interval = seconds / 31536000;
    if (interval > 1) return `${Math.floor(interval)}y`;
    interval = seconds / 2592000;
    if (interval > 1) return `${Math.floor(interval)}m`;
    interval = seconds / 86400;
    if (interval > 1) return `${Math.floor(interval)}d`;
    interval = seconds / 3600;
    if (interval > 1) return `${Math.floor(interval)}h`;
    interval = seconds / 60;
    return `${Math.floor(interval)}min`;
}