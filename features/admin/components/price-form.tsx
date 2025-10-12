import { Button } from '@/components/ui/button';
import { PriceData } from '@/types/admin';
import React from 'react';
import { useProgramDetailStore } from '../stores/program-detail';
import { X } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { PACKAGE_OPTIONS } from '../constants/config';
import { cn } from '@/lib/utils';
import { formatAmont } from '@/features/auth/utils/string.helper';

const DURATION_TYPES = [{ value: 'months', label: 'Months' }];

const PriceForm = ({
    packageData,
    index,
    packages,
}: {
    packageData: PriceData;
    index: number;
    packages: PriceData[];
}) => {
    const error = useProgramDetailStore(s => s.error);
    const packageId = useProgramDetailStore(s => s.packageId);
    const setPackages = useProgramDetailStore(s => s.setState);
    const handleInputChange = useProgramDetailStore(s => s.handleInputChange);
    const removePackage = (id: string) => {
        if (packages.length > 1) {
            setPackages({ packages: packages.filter(pkg => pkg.id !== id) });
        }
    };

    return (
        <div
            key={packageData.id}
            className="space-y-4 p-4 border border-neutral-500 rounded-lg relative"
        >
            <div className="flex items-center justify-between">
                <h3 className="font-medium text-sm text-muted-foreground">Harga {index + 1}</h3>
                {packages.length > 1 && (
                    <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removePackage(packageData.id)}
                        className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive"
                    >
                        <X className="h-4 w-4" />
                    </Button>
                )}
            </div>

            {/* Price Input */}
            <div className="space-y-2">
                <Label htmlFor={`${packageData.id}-price`}>Harga</Label>
                <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
                        Rp.
                    </span>
                    <Input
                        id={`${packageData.id}-price`}
                        type="number"
                        step="1000"
                        min="0"
                        placeholder="xxxxxx"
                        value={packageData.price}
                        onChange={e => handleInputChange(packageData.id, 'price', e.target.value)}
                        className={cn(error?.[index]?.amount && 'border-red-500', 'pl-10')}
                    />
                </div>
                {error?.[index]?.amount && (
                    <p className="text-red-500 text-sm mt-1">
                        {error?.[index]?.amount._errors[0]?.toString()}
                    </p>
                )}
            </div>

            {/* Duration Input */}
            <div className="space-y-2">
                <Label htmlFor={`${packageData.id}-duration`}>Durasi</Label>
                <div className="flex gap-2">
                    <Input
                        id={`${packageData.id}-duration`}
                        type="number"
                        min="1"
                        placeholder="Durasi"
                        value={packageData.duration}
                        onChange={e =>
                            handleInputChange(packageData.id, 'duration', e.target.value)
                        }
                        className={cn(error?.[index]?.timeframe && 'border-red-500', 'flex-1')}
                    />

                    <Select
                        value={packageData.durationType}
                        onValueChange={(value: 'days' | 'weeks' | 'months' | 'years') =>
                            handleInputChange(packageData.id, 'durationType', value)
                        }
                    >
                        <SelectTrigger className="w-32">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            {DURATION_TYPES.map(type => (
                                <SelectItem key={type.value} value={type.value}>
                                    {type.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
                {error?.[index]?.timeframe && (
                    <p className="text-red-500 text-sm mt-1">
                        {error?.[index]?.timeframe._errors[0]?.toString()}
                    </p>
                )}
            </div>

            {/* Individual Preview */}
            {packageData.price && (
                <div className="p-3 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">Preview:</p>
                    <p className="font-medium">
                        {PACKAGE_OPTIONS.find(p => p.value === packageId)?.label} -{' '}
                        <span className="text-primary">
                            {formatAmont(Number(packageData.price))}
                        </span>{' '}
                        per <span className="text-primary">{packageData.duration || 'xx'}</span>{' '}
                        bulan
                    </p>
                </div>
            )}
        </div>
    );
};

export default PriceForm;
