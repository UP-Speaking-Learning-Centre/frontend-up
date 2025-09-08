import { Alert, AlertDescription } from '@/components/ui/alert';
import { Card, CardContent } from '@/components/ui/card';
import { Clock, Info } from 'lucide-react';
import React from 'react';

const PlacementTestPending = () => {
    return (
        <Card className="bg-white shadow-sm border border-gray-200 w-3/4 mx-auto">
            <CardContent className="p-8">
                {/* Clock Icon and Title */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-100 rounded-full mb-4">
                        <Clock className="w-8 h-8 text-yellow-600" />
                    </div>
                    <h2 className="text-xl font-semibold text-gray-900">
                        Placement Test Results Pending
                    </h2>
                </div>

                {/* Warning Alert */}
                <Alert className="mb-8 bg-yellow-50 border-yellow-200">
                    <Info className="h-4 w-4 text-yellow-600" />
                    <div>
                        <h3 className="font-medium text-yellow-800 mb-2">
                            Results Not Available Yet
                        </h3>
                        <AlertDescription className="text-yellow-700">
                            Hasil Placement Test Anda belum tersedia. Mohon tunggu hingga hasil
                            diumumkan untuk dapat memilih jadwal kelas.
                        </AlertDescription>
                    </div>
                </Alert>

                {/* What happens next section */}
                <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-4 text-center">
                        What happens next?
                    </h3>

                    <div className="space-y-3">
                        <div className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-orange-500 rounded-full mt-2 flex-shrink-0"></div>
                            <p className="text-gray-700">
                                Our team is reviewing your placement test results
                            </p>
                        </div>

                        <div className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-gray-300 rounded-full mt-2 flex-shrink-0"></div>
                            <p className="text-gray-700">
                                You'll receive a notification when results are ready
                            </p>
                        </div>

                        <div className="flex items-start gap-3">
                            <div className="w-2 h-2 bg-gray-300 rounded-full mt-2 flex-shrink-0"></div>
                            <p className="text-gray-700">
                                You can then select your preferred class schedule
                            </p>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
};

export default PlacementTestPending;
