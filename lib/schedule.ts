export const getPackageColor = (packageType: string | null) => {
    switch (packageType) {
        case 'Semi Private':
            return 'bg-blue-100 text-blue-800 border border-blue-500 hover:bg-blue-200';
        case 'Private':
            return 'bg-green-100 text-green-800 border border-green-500 hover:bg-green-200';
        case 'Eksklusif':
            return 'bg-yellow-100 text-yellow-800 border border-yellow-500 hover:bg-yellow-200';
        default:
            return 'bg-gray-50 text-gray-600 border border-gray-500 hover:bg-gray-200';
    }
};
