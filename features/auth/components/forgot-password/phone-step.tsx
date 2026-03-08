import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Phone } from 'lucide-react';

interface PhoneStepProps {
    phoneNumber: string;
    setPhoneNumber: (val: string) => void;
    isLoading: boolean;
    handlePhoneSubmit: (e: React.FormEvent) => void;
}

export default function PhoneStep({
    phoneNumber,
    setPhoneNumber,
    isLoading,
    handlePhoneSubmit,
}: PhoneStepProps) {
    return (
        <form onSubmit={handlePhoneSubmit} className="space-y-6">
            <div>
                <Label htmlFor="phone" className="flex items-center mb-2">
                    <Phone className="w-4 h-4 mr-2 text-primary" />
                    Phone Number
                </Label>
                <Input
                    id="phone"
                    type="tel"
                    value={phoneNumber}
                    onChange={e => setPhoneNumber(e.target.value)}
                    placeholder="08123456789 or 628123456789"
                    required
                    className="w-full"
                />
                <p className="text-xs text-gray-500 mt-1">
                    Enter your registered phone number (WhatsApp number)
                </p>
            </div>

            <Button
                type="submit"
                disabled={isLoading || !phoneNumber}
                className="w-full bg-primary hover:bg-primary/90"
            >
                {isLoading ? 'Sending OTP...' : 'Send OTP'}
            </Button>
        </form>
    );
}
