export const formatPhoneNumber = (value: string) => {
    // Remove all non-digits
    const digits = value.replace(/\D/g, '');

    // Convert 08 to 628
    if (digits.startsWith('08')) {
        return '62' + digits.substring(1);
    }

    // If starts with 62, keep as is
    if (digits.startsWith('62')) {
        return digits;
    }

    // If starts with 8, add 62
    if (digits.startsWith('8')) {
        return '62' + digits;
    }

    return digits;
};

export function capitalizeFirstLetter(val: string) {
    return String(val).charAt(0).toUpperCase() + String(val).slice(1);
}
