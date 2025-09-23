import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Label } from '@radix-ui/react-label';
import { Phone } from 'lucide-react';
import { Toaster } from 'sonner';
import { PHONE } from '../constants/config';
import usePhoneNumberLogin from '../hooks/usePhoneNumberLogin';

const PhoneNumber = () => {
    const { register, handleSubmit, formState, isLoading } = usePhoneNumberLogin();
    const { errors, isDirty } = formState;

    return (
        <div className="w-full max-w-md">
            <Toaster />
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900">Sign in to your account</h2>
                <p className="mt-2 text-azure-34 font-normal">Access your learning dashboard</p>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle className="text-center text-lg">Enter Phone Number</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <Label htmlFor="phone" className="flex items-center mb-2">
                                <Phone className="w-4 h-4 mr-2 text-[#CE6439]" />
                                Phone Number
                            </Label>
                            <Input
                                placeholder="e.g. 08123456789"
                                {...register(PHONE)}
                                className={cn(errors.phone && 'border-red-500')}
                            />
                            {errors.phone && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.phone.message?.toString()}
                                </p>
                            )}
                            <p className="text-xs text-gray-500 mt-1">
                                Enter your registered phone number (WhatsApp number)
                            </p>
                        </div>
                        <Button
                            type="submit"
                            disabled={isLoading || !isDirty}
                            className="w-full bg-[#CE6439] hover:bg-[#CE6439]/90"
                        >
                            {isLoading ? 'Checking...' : 'Continue'}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
};

export default PhoneNumber;
