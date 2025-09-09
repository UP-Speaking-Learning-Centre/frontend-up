import Title from '../title';
import useProgramSelection from '../../hooks/use-program-selection';
import { CHOOSE_GRADE_STEP } from '@/constants/program-selections';
import GradeCards from './grade-cards';

const ChooseGrade = () => {
    const { isStepDisplayed } = useProgramSelection();

    if (!isStepDisplayed(CHOOSE_GRADE_STEP)) {
        return null;
    }

    return (
        <div
            id={CHOOSE_GRADE_STEP}
            className="min-h-[calc(100vh-64px)] py-24 flex flex-col justify-center"
        >
            <Title
                title="Pilih Grade Anda"
                description="Pilih kelas yang sesuai dengan kebutuhan Anda."
            />
            <GradeCards />
        </div>
    );
};

export default ChooseGrade;
