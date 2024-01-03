export function convertDateInHour(date: string | Date) {
    const currentDate = Number(new Date());
    const createdDate = Number(new Date(date));
    const timeDifference = currentDate - createdDate
    const hoursDifference = timeDifference / (1000 * 3600)
    return Math.floor(hoursDifference)
}