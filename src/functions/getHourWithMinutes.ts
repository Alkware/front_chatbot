export function getHourWithMinutes() {
    const date = new Date();
    const time = `${date.getHours().toString().padStart(2, "0")}:${date.getMinutes().toString().padStart(2, "0")}`
    return time;
}