export function formatLongNumber(number: number) {
    let numberFormat = number.toString();

    if (number > 999 && number <= 9999) numberFormat = "+"+numberFormat.substring(0, 1) + "mil"
    else if (number > 9_999 && number <= 99_999) numberFormat = "+"+numberFormat.substring(0, 2) + "mil"
    else if (number > 99_999 && number <= 999_999) numberFormat = "+"+numberFormat.substring(0, 3) + "mil"
    else if (number > 999_999 && number <= 9_999_999) numberFormat = "+"+numberFormat.substring(0, 1) + "M"
    else if (number > 9_999_999 && number <= 99_999_999) numberFormat = "+"+numberFormat.substring(0, 2) + "M"
    else if (number > 99_999_999 && number <= 999_999_999) numberFormat = "+"+numberFormat.substring(0, 3) + "M"
    else if (number > 999_999_999 && number <= 9_999_999_999) numberFormat = "+"+numberFormat.substring(0, 1) + "B"


    return numberFormat
}