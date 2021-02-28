export function convertPathToArray(path: string): string[] {
    const clearString = path.replace(/^(\? |#).+/g, '');
    const array = clearString.split('/');
    const returnArray: string[] = [];
    array.forEach(item => {
        if (item.length)
            returnArray.push(item)
    })
    return returnArray;
}