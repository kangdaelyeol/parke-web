export const formatPhone = (number: string): string => {
    const rawPhone = number.replace(/[^0-9]/g, '')

    if (!rawPhone) return ''

    if (rawPhone.length <= 3) return rawPhone

    if (rawPhone.length <= 7)
        return rawPhone.slice(0, 3) + '-' + rawPhone.slice(3)

    return (
        rawPhone.slice(0, 3) +
        '-' +
        rawPhone.slice(3, 7) +
        '-' +
        rawPhone.slice(7)
    )
}
