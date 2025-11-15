export const getPackageColor = (packageType: string | null) => {
    switch (packageType) {
        case 'Semi Private':
            return 'bg-blue-100 text-blue-800 border-blue-500 hover:bg-blue-200';
        case 'Private':
            return 'bg-green-100 text-green-800 border-green-500 hover:bg-green-200';
        case 'Exclusive':
            return 'bg-red-100 text-red-800 border-red-500 hover:bg-red-200';
        default:
            return 'bg-gray-50 text-gray-600 border-gray-500 hover:bg-gray-200';
    }
};
