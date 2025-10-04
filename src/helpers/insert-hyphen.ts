export const insertHyphen = (number: string): string => {
    if (!number) return ''
    if (number.length === 11)
        return (
            number.slice(0, 3) +
            '-' +
            number.slice(3, 7) +
            '-' +
            number.slice(7, 11)
        )
    else
        return (
            number.slice(0, 3) +
            '-' +
            number.slice(3, 6) +
            '-' +
            number.slice(6, 10)
        )
}
