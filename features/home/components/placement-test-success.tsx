import { Check } from 'lucide-react';
import React from 'react';

const PlacementTestSuccess = () => {
    return (
        <div className="text-center mb-8 bg-white border rounded py-6 w-3/4 mx-auto">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-6">
                <Check className="w-8 h-8 text-green-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 mb-4">
                Hasil Placement Testmu sudah keluar!
            </h2>
            <p className="text-gray-600 text-center max-w-2xl mx-auto leading-relaxed">
                Anda bisa melihat rekomendasi program dan jadwal yang sesuai dengan anda pada
                informasi dibawah.
            </p>
        </div>
    );
};

export default PlacementTestSuccess;
