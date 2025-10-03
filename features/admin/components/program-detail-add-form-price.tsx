import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { inter } from '@/constants/fonts';
import { cn } from '@/lib/utils';
import { PriceData } from '@/types/admin';
import { DialogProps } from '@radix-ui/react-dialog';
import { Plus, X } from 'lucide-react';
import { useParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import useGetPrices from '../queries/useGetPrices';
import { useProgramDetailStore } from '../stores/program-detail';
import usePatchPrice from '../queries/usePatchPrice';
import { toast } from 'sonner';

const PACKAGE_OPTIONS = [
    { value: 1, label: 'Semi Private' },
    { value: 2, label: 'Private' },
    { value: 3, label: 'Ekslusif' },
];

const DURATION_TYPES = [
    { value: 'months', label: 'Months' },
    { value: 'years', label: 'Years' },
];

const ProgramDetailAddFormPrice = ({ ...props }: DialogProps) => {
    const { id } = useParams();
    const packageId = useProgramDetailStore(s => s.packageId);
    const setState = useProgramDetailStore(s => s.setState);
    const { data } = useGetPrices({ packageId, programId: id });
    const { mutateAsync } = usePatchPrice();

    const initialState: PriceData[] = [
        {
            id: Date.now().toString(),
            price: '',
            duration: '',
            durationType: 'months',
        },
    ];
    const [packages, setPackages] = useState<PriceData[]>(initialState);
    const [packageId_, setPackageId_] = useState(0);

    useEffect(() => {
        if (id && packageId) {
            setPackageId_(packageId);
            setPackages(
                data?.data.map(
                    price =>
                        ({
                            durationType: 'months',
                            duration: price.timeframe.split('_')[0],
                            id: price.id.toString(),
                            price: price.amount.toString(),
                        } satisfies PriceData)
                ) || []
            );
        }
    }, [id, packageId, data]);

    const [isSubmitting, setIsSubmitting] = useState(false);

    const addPackage = () => {
        const newPackage: PriceData = {
            id: Date.now().toString(),
            price: '',
            duration: '',
            durationType: 'months',
        };
        setPackages([...packages, newPackage]);
    };

    const removePackage = (id: string) => {
        if (packages.length > 1) {
            setPackages(packages.filter(pkg => pkg.id !== id));
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const invalidPackages = packages.filter(pkg => !pkg.price || !pkg.duration);

        if (invalidPackages.length > 0) {
            toast('Missing Information');
            return;
        }

        setIsSubmitting(true);

        try {
            // Simulate API call - replace with your actual API endpoint
            mutateAsync({
                packageId: packageId_,
                programId: Number(id),
                replaceAll: false,
                prices: packages.map(item => ({
                    timeframe: item.duration + '_' + item.durationType,
                    amount: Number(item.price),
                })),
            }).then(() => {
                toast('Prices Added Successfully');

                setPackages([
                    {
                        id: '1',
                        price: '',
                        duration: '',
                        durationType: 'months',
                    },
                ]);
            });
        } catch (error) {
            toast('Failed to add prices. Please try again.');
        } finally {
            setIsSubmitting(false);
            setState({ isPriceModalOpen: false });
        }
    };

    const handleInputChange = (id: string, field: keyof PriceData, value: string) => {
        setPackages(packages.map(pkg => (pkg.id === id ? { ...pkg, [field]: value } : pkg)));
    };

    const renderPackageForm = (packageData: PriceData, index: number) => (
        <div key={packageData.id} className="space-y-4 p-4 border rounded-lg relative">
            <div className="flex items-center justify-between">
                <h3 className="font-medium text-sm text-muted-foreground">Package {index + 1}</h3>
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
                <Label htmlFor={`${packageData.id}-price`}>Price</Label>
                <div className="relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
                        Rp.
                    </span>
                    <Input
                        id={`${packageData.id}-price`}
                        type="number"
                        step="1000"
                        min="0"
                        placeholder="1000000"
                        value={packageData.price}
                        onChange={e => handleInputChange(packageData.id, 'price', e.target.value)}
                        className="pl-10"
                    />
                </div>
            </div>

            {/* Duration Input */}
            <div className="space-y-2">
                <Label htmlFor={`${packageData.id}-duration`}>Duration</Label>
                <div className="flex gap-2">
                    <Input
                        id={`${packageData.id}-duration`}
                        type="number"
                        min="1"
                        placeholder="1"
                        value={packageData.duration}
                        onChange={e =>
                            handleInputChange(packageData.id, 'duration', e.target.value)
                        }
                        className="flex-1"
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
            </div>

            {/* Individual Preview */}
            {packageData.price && packageData.duration && (
                <div className="p-3 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">Preview:</p>
                    <p className="font-medium">
                        {PACKAGE_OPTIONS.find(p => p.value === packageId_)?.label} - Rp.
                        {packageData.price} for {packageData.duration} {packageData.durationType}
                    </p>
                </div>
            )}
        </div>
    );
    const handleOpenChange = (open: boolean) => {
        props.onOpenChange?.(open);
        if (open) {
            setPackages(initialState);
        }
    };

    return (
        <Dialog {...props} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
                <Button variant={'outline'} className="w-full">
                    <Plus />
                    Add Price
                </Button>
            </DialogTrigger>
            <DialogContent
                className={cn(inter.className, 'max-w-2xl max-h-[90vh] overflow-y-auto')}
            >
                <DialogHeader>
                    <DialogTitle>Add Prices</DialogTitle>
                    <DialogDescription>
                        Configure pricing for multiple packages with custom duration settings.
                    </DialogDescription>
                </DialogHeader>
                {/* Package Selection */}
                <div className="space-y-2">
                    <Label htmlFor={`${packageId_}-package`}>Package</Label>
                    <Select
                        value={packageId_.toString()}
                        onValueChange={value => setPackageId_(Number(value))}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Select a package" />
                        </SelectTrigger>
                        <SelectContent>
                            {PACKAGE_OPTIONS.map(option => (
                                <SelectItem key={option.value} value={option.value.toString()}>
                                    {option.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {packages.map((packageData, index) => renderPackageForm(packageData, index))}

                    <Button
                        type="button"
                        variant="outline"
                        onClick={addPackage}
                        className="w-full bg-transparent"
                    >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Another Package
                    </Button>

                    {/* Submit Button */}
                    <Button type="submit" className="w-full" disabled={isSubmitting}>
                        {isSubmitting
                            ? 'Adding Prices...'
                            : `${!packageId ? 'Add' : 'Edit'} ${packages.length} Price${
                                  packages.length > 1 ? 's' : ''
                              }`}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default ProgramDetailAddFormPrice;
