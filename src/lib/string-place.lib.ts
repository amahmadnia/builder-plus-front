const words: { [key: string]: number } = {
    "آ": 0,
    "ا": 1,
    "ب": 2,
    "پ": 3,
    "ت": 4,
    "ث": 5,
    "ج": 6,
    "چ": 7,
    "ح": 8,
    "خ": 9,
    "د": 10,
    "ذ": 11,
    "ر": 12,
    "ز": 13,
    "ژ": 14,
    "س": 15,
    "ش": 16,
    "ص": 17,
    "ض": 18,
    "ط": 19,
    "ظ": 20,
    "ع": 21,
    "غ": 22,
    "ف": 23,
    "ق": 24,
    "ک": 25,
    "گ": 26,
    "ل": 27,
    "م": 28,
    "ن": 29,
    "و": 30,
    "ه": 31,
    "ی": 32,
    "ئ": 33,
    "ء": 34,
    "۰": -10,
    "۱": -9,
    "۲": -8,
    "۳": -7,
    "۴": -6,
    "۵": -5,
    "۶": -4,
    "۷": -3,
    "۸": -2,
    "۹": -1,
}

export function stringPlace(str1: string, str2: string): number {
    const U1 = str1.toUpperCase();
    const U2 = str2.toUpperCase();
    const min = Math.min(str1.length, str2.length);
    for (let i = 0; i < min; i++) {
        if ((U1[i] in words ? words[U1[i]] : U1[1]) < (U2[i] in words ? words[U2[i]] : U2[1]))
            return -1;
        if ((U1[i] in words ? words[U1[i]] : U1[1]) > (U2[i] in words ? words[U2[i]] : U2[1]))
            return 1
    }
    if (U1.length < U2.length)
        return -1
    if (U1.length > U2.length)
        return 1
    return 0
}