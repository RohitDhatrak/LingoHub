export function getLanguageList(array) {
    let str = "";
    for (let i = 0; i < array.length; i++) {
        if (i === array.length - 1) str += array[i];
        else str += array[i] + ", ";
    }
    return str;
}
