import { Button } from '@/components/ui/button';
import DashboardContentLayout from '@/features/dashboard/components/dashboard-content-layout';

const Page = () => {
    return (
        <DashboardContentLayout pageTitle="New Student">
            <div className="h-[calc(100vh-12rem)] px-10 flex items-center justify-center">
                <div className="flex flex-col text-center items-center gap-1">
                    <h3 className="text-xl font-semibold">Tidak ada student baru!</h3>
                    <p className="text-sm text-muted-foreground">
                        Belum ada lagi student baru yang belum mendaftar. Semua student yang
                        mendaftar sudah diproses
                    </p>

                    <Button className="mt-4 w-fit">Perbarui Data</Button>
                </div>
            </div>
        </DashboardContentLayout>
    );
};

export default Page;
