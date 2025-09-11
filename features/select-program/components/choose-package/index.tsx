import useProgramSelection from '@/features/select-program/hooks/use-program-selection';
import { CHOOSE_PACKAGE_STEP } from '@/constants/program-selections';
import Title from '../title';
import PackageCards from './package-cards';

const ChoosePackage = () => {
    const { isStepDisplayed } = useProgramSelection();

    if (!isStepDisplayed(CHOOSE_PACKAGE_STEP)) {
        return null;
    }

    return (
        <div
            id={CHOOSE_PACKAGE_STEP}
            className="min-h-[calc(100vh-64px)] py-24 flex flex-col justify-center"
        >
            <Title
                title="Pilih Paket Anda"
                description="Pilih paket yang paling sesuai dengan kebutuhan Anda. "
            />

            <PackageCards />
        </div>
    );
};

export default ChoosePackage;
