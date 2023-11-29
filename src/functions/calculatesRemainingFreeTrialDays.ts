export function calculatesRemainingFreeTrialDays(freeTrial: Date) {
    const freeTrialDate: any = new Date(freeTrial);
    const date: any = new Date();
    const differenceInMiliseconds = freeTrialDate - date
    const differenceInDays =  differenceInMiliseconds / (1000 * 60 * 60 * 24)

    return Number(differenceInDays.toFixed(0))
}