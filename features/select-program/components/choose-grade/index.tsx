import Title from '../title';
import useProgramSelection from '../../hooks/use-program-selection';
import { CHOOSE_GRADE_STEP } from '@/constants/program-selections';

const ChooseGrade = () => {
    const { isStepDisplayed } = useProgramSelection();

    if (!isStepDisplayed(CHOOSE_GRADE_STEP)) {
        return null;
    }

    return (
        <div id={CHOOSE_GRADE_STEP} className="py-24">
            <Title
                title="Pilih Grade Anda"
                description="Pilih kelas yang sesuai dengan kebutuhan Anda."
            />
        </div>
    );
};

export default ChooseGrade;
