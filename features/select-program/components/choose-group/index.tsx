import Title from '../title';
import useProgramSelection from '../../hooks/use-program-selection';
import { CHOOSE_GROUP_STEP } from '@/constants/program-selections';
import GroupCards from './group-cards';

const ChooseGroup = () => {
    const { isStepDisplayed } = useProgramSelection();

    if (!isStepDisplayed(CHOOSE_GROUP_STEP)) {
        return null;
    }

    return (
        <div id={CHOOSE_GROUP_STEP} className="h-[calc(100vh-64px)] flex flex-col justify-center">
            <Title
                title="Pilih Grup Anda"
                description="Pilih grup yang sesuai dengan tingkat pendidikan Anda."
            />
            <GroupCards />
        </div>
    );
};

export default ChooseGroup;
