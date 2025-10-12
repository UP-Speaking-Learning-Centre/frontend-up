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
import { Skeleton } from '@/components/ui/skeleton';

const ProgramDetailAddFormPrice = ({ ...props }: DialogProps) => {
    const packages = useProgramDetailStore(s => s.packages);
    const rawPackages = useProgramDetailStore(s => s.rawPackages);
    const packageId = useProgramDetailStore(s => s.packageId);
    const error = useProgramDetailStore(s => s.error);
    const setState = useProgramDetailStore(s => s.setState);
    const setPackages = (packages: PriceData[]) => setState({ packages });
    const setPackageId = (packageId: number) => setState({ packageId });

    const { isSubmitting, handleSubmit, addPackage } = usePrices();

    const handleOpenChange = (open: boolean) => {
        props.onOpenChange?.(open);
        if (open) {
            setPackages(INITIAL_PRICE);
        } else {
            setState({ packages: rawPackages, error: undefined, packageId: undefined });
        }
    };

    console.log(PACKAGE_OPTIONS);
    return (
        <Dialog {...props} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
                <Button variant="default" className="w-fit">
                    <Plus />
                    Tambah Aturan Harga Paket
                </Button>
            </DialogTrigger>
            <DialogContent
                className={cn(inter.className, 'max-w-2xl max-h-[90vh] overflow-hidden')}
            >
                <DialogHeader>
                    <DialogTitle>Atur Harga</DialogTitle>
                    <DialogDescription>
                        Atur harga untuk paket-paket yang tersedia
                    </DialogDescription>
                </DialogHeader>
                <div className="space-y-2">
                    <Label htmlFor={`${packageId}-package`}>Package</Label>
                    <Select
                        value={packageId?.toString()}
                        onValueChange={value => setPackageId(Number(value))}
                    >
                        <SelectTrigger>
                            <SelectValue placeholder="Pilih package" />
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
                {/* Package Selection */}

                {packageId && (
                    <div className="max-h-[60vh] space-y-4 overflow-y-auto">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {!packages.length ? (
                                <div className="space-y-8 p-4 border border-neutral-500 rounded-lg">
                                    <div className="space-y-2">
                                        <Skeleton className="h-8 w-4/12" />
                                        <Skeleton className="h-8 w-full" />
                                    </div>
                                    <div className="space-y-2">
                                        <Skeleton className="h-8 w-4/12" />
                                        <div className="flex gap-2">
                                            <Skeleton className="h-12 w-8/12" />
                                            <Skeleton className="h-12 w-4/12" />
                                        </div>
                                    </div>
                                    <Skeleton className="h-24" />
                                </div>
                            ) : (
                                packages.map((packageData, index) => (
                                    <PriceForm
                                        key={packageData.id}
                                        packageData={packageData}
                                        index={index}
                                        packages={packages}
                                    />
                                ))
                            )}

                            {!packages.length ? (
                                <div className="space-y-2">
                                    <Skeleton className="h-12 w-full" />
                                    <Skeleton className="h-12 w-full" />
                                </div>
                            ) : (
                                <>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        onClick={addPackage}
                                        className="w-full bg-transparent"
                                    >
                                        <Plus className="h-4 w-4 mr-2" />
                                        Tambah Pengaturan Harga
                                    </Button>

                                    {/* Submit Button */}
                                    <Button
                                        type="submit"
                                        className="w-full"
                                        disabled={isSubmitting || !packageId}
                                    >
                                        {isSubmitting
                                            ? 'Menambahkan Harga...'
                                            : 'Simpan Pengaturan Harga'}
                                    </Button>
                                </>
                            )}
                        </form>
                    </div>
                )}
            </DialogContent>
        </Dialog>
    );
};

export default ProgramDetailAddFormPrice;
