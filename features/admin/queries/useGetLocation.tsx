import { LocationAdmin } from '@/types/admin';
import { useQuery } from '@tanstack/react-query';
import { API_LOCATION } from '../constants/config';
import { useLocationManagementStore } from '../stores/location';
import { useEffect } from 'react';

const useGetLocation = () => {
    const setLocation = useLocationManagementStore(s => s.setLocation);
    
    const getLocation = (): LocationAdmin[] => {
        return [
            {
                id: 1,
                name: 'Stadion',
                address: null,
                img: null,
                googleMapsLink: null,
            },
            {
                id: 2,
                name: 'Luragung',
                address: null,
                img: null,
                googleMapsLink: null,
            },
            {
                id: 3,
                name: 'Alam Asri',
                address: null,
                img: null,
                googleMapsLink: null,
            },
        ];
    };

    const { data, isLoading } = useQuery({
        queryKey: ['GET' + API_LOCATION],
        queryFn: getLocation,
    });

    useEffect(() => {
        setLocation(data ?? []);
    }, [data]);

    return { data, isLoading };
};

export default useGetLocation;
