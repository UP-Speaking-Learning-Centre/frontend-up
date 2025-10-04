import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
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
import { Plus } from 'lucide-react';
import { INITIAL_PRICE, PACKAGE_OPTIONS } from '../constants/config';
import usePrices from '../hooks/usePrices';
import { useProgramDetailStore } from '../stores/program-detail';
import PriceForm from './price-form';

const ProgramDetailAddFormPrice = ({ ...props }: DialogProps) => {
    const packages = useProgramDetailStore(s => s.packages);
    const packageId = useProgramDetailStore(s => s.packageId);
    const setState = useProgramDetailStore(s => s.setState);
    const setPackages = (packages: PriceData[]) => setState({ packages });
    const setPackageId = (packageId: number) => setState({ packageId });

    const { isSubmitting, handleSubmit, addPackage } = usePrices();

    const handleOpenChange = (open: boolean) => {
        props.onOpenChange?.(open);
        if (open) {
            setPackages(INITIAL_PRICE);
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
                    <Label htmlFor={`${packageId}-package`}>Package</Label>
                    <Select
                        value={packageId?.toString()}
                        onValueChange={value => setPackageId(Number(value))}
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
                    {packages.map((packageData, index) => (
                        <PriceForm packageData={packageData} index={index} packages={packages} />
                    ))}

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
