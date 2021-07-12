// #! Voor een betere vergelijking en meer ritten zet ik de maand op 06 dit doe ik door de +1 te verwijderen
// als ik hem op 07 zet zijn er nog niet zo veel ritten beschikbaar
//originele functie hieronder
// let currentMonth = date.getFullYear()+'-'+(date.getMonth() + 1).toString().padStart(2, "0");
export function createCurrentMonthString() {
    const date = new Date();
    return date.getFullYear() + '-' + (date.getMonth()).toString().padStart(2, "0");
}

export function createCurrentYearString() {
    const date = new Date();
    return date.getFullYear().toString()
}




