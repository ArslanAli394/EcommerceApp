
//convert array of object into key objects
export const arrayToObject1 = (arr, key) => {
    return arr.reduce((obj, item) => {
        obj[item[key].toLowerCase()] = item
        return obj
    }, {})
}