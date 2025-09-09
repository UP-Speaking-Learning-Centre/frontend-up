import useProgramSelection from '@/features/select-program/hooks/use-program-selection';
import { CHOOSE_GROUP_STEP, CHOOSE_LEVEL_STEP } from '@/constants/program-selections';
import Title from '../title';
import LevelCards from './level-cards';

const ChooseLevel = () => {
    const { isStepDisplayed } = useProgramSelection();

    if (!isStepDisplayed(CHOOSE_LEVEL_STEP)) {
        return null;
    }

    return (
        <div
            id={CHOOSE_LEVEL_STEP}
            className="min-h-[calc(100vh-64px)] py-24 flex flex-col justify-center"
        >
            <Title
                title="Pilih Level Anda"
                description="Pilih tingkat yang paling sesuai dengan kemampuan dan pengetahuan Anda saat ini.   "
            />

            <LevelCards />
        </div>
    );
};

export default ChooseLevel;
