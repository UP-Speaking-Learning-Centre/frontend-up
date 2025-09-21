import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
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
import { useToast } from '@/components/ui/use-toast';
import { PriceData } from '@/types/admin';
import { DialogProps } from '@radix-ui/react-dialog';
import { Plus, X } from 'lucide-react';
import React, { useState } from 'react';

const PACKAGE_OPTIONS = [
    { value: 'Semi-Private', label: 'Semi-Private' },
    { value: 'Private', label: 'Private' },
    { value: 'Ekslusif', label: 'Ekslusif' },
];

const DURATION_TYPES = [
    { value: 'months', label: 'Months' },
    { value: 'years', label: 'Years' },
];

const ProgramDetailAddFormPrice = ({ ...props }: DialogProps) => {
    const [packages, setPackages] = useState<PriceData[]>([
        {
            id: Date.now().toString(),
            packageName: '',
            price: '',
            duration: '',
            durationType: 'months',
        },
    ]);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { toast } = useToast();

    const addPackage = () => {
        const newPackage: PriceData = {
            id: Date.now().toString(),
            packageName: '',
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

        const invalidPackages = packages.filter(
            pkg => !pkg.packageName || !pkg.price || !pkg.duration
        );

        if (invalidPackages.length > 0) {
            toast({
                title: 'Missing Information',
                description: 'Please fill in all required fields for all packages.',
                variant: 'destructive',
            });
            return;
        }

        const packageNames = packages.map(pkg => pkg.packageName);
        const duplicates = packageNames.filter(
            (name, index) => packageNames.indexOf(name) !== index
        );

        if (duplicates.length > 0) {
            toast({
                title: 'Duplicate Packages',
                description: 'Please select different packages for each entry.',
                variant: 'destructive',
            });
            return;
        }

        setIsSubmitting(true);

        try {
            // Simulate API call - replace with your actual API endpoint
            await new Promise(resolve => setTimeout(resolve, 1000));

            console.log(
                'Multiple price data submitted:',
                packages.map(pkg => ({
                    ...pkg,
                    price: Number.parseFloat(pkg.price),
                    duration: Number.parseInt(pkg.duration),
                }))
            );

            toast({
                title: 'Prices Added Successfully',
                description: `${packages.length} package pricing${
                    packages.length > 1 ? 's' : ''
                } have been configured.`,
            });

            setPackages([
                {
                    id: '1',
                    packageName: '',
                    price: '',
                    duration: '',
                    durationType: 'months',
                },
            ]);
        } catch (error) {
            toast({
                title: 'Error',
                description: 'Failed to add prices. Please try again.',
                variant: 'destructive',
            });
        } finally {
            setIsSubmitting(false);
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

            {/* Package Selection */}
            <div className="space-y-2">
                <Label htmlFor={`${packageData.id}-package`}>Package</Label>
                <Select
                    value={packageData.packageName}
                    onValueChange={value => handleInputChange(packageData.id, 'packageName', value)}
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Select a package" />
                    </SelectTrigger>
                    <SelectContent>
                        {PACKAGE_OPTIONS.map(option => (
                            <SelectItem key={option.value} value={option.value}>
                                {option.label}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
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
            {packageData.packageName && packageData.price && packageData.duration && (
                <div className="p-3 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">Preview:</p>
                    <p className="font-medium">
                        {PACKAGE_OPTIONS.find(p => p.value === packageData.packageName)?.label} - Rp.
                        {packageData.price} for {packageData.duration} {packageData.durationType}
                    </p>
                </div>
            )}
        </div>
    );

    return (
        <Dialog {...props}>
            <DialogTrigger asChild>
                <Button variant={'outline'} className="w-full">
                    <Plus />
                    Add Price
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Add Prices</DialogTitle>
                    <DialogDescription>
                        Configure pricing for multiple packages with custom duration settings.
                    </DialogDescription>
                </DialogHeader>

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
                            : `Add ${packages.length} Price${packages.length > 1 ? 's' : ''}`}
                    </Button>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default ProgramDetailAddFormPrice;
