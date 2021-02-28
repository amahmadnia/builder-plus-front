const dict = {
    '0': '۰',
    '1': '۱',
    '2': '۲',
    '3': '۳',
    '4': '۴',
    '5': '۵',
    '6': '۶',
    '7': '۷',
    '8': '۸',
    '9': '۹',
}

function persianNumber(input: any): string {
    if (!['string', 'number'].includes(typeof input))
        return '';
    const sp = (input + '').split('');
    return sp.map(n => n in dict ? dict[n as keyof typeof dict] : n).join('');
}

export default persianNumber