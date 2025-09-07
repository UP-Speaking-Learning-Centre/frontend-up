import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import React, { useState } from 'react';

const AssignLevel = () => {
    const [assignedLevel, setAssignedLevel] = useState('');
    const [assignedMentor, setAssignedMentor] = useState('');
    const [assignedSchedule, setAssignedSchedule] = useState('');

    return (
        <div className="space-y-4">
            <div>
                <Label>Assigned Level</Label>
                <Select value={assignedLevel} onValueChange={setAssignedLevel}>
                    <SelectTrigger>
                        <SelectValue placeholder="Select level" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="Beginner">Beginner</SelectItem>
                        <SelectItem value="Elementary">Elementary</SelectItem>
                        <SelectItem value="Intermediate">Intermediate</SelectItem>
                        <SelectItem value="Advanced">Advanced</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div>
                <Label>Assigned Mentor</Label>
                <Select value={assignedMentor} onValueChange={setAssignedMentor}>
                    <SelectTrigger>
                        <SelectValue placeholder="Select mentor" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="Ms. Feby">Ms. Feby</SelectItem>
                        <SelectItem value="Mr. Firdan">Mr. Firdan</SelectItem>
                        <SelectItem value="Ms. Binti">Ms. Binti</SelectItem>
                        <SelectItem value="Mr. Noval">Mr. Noval</SelectItem>
                    </SelectContent>
                </Select>
            </div>
            <div>
                <Label>Assigned Schedule</Label>
                <Input
                    value={assignedSchedule}
                    onChange={e => setAssignedSchedule(e.target.value)}
                    placeholder="e.g., Senin & Rabu, 15:00-17:00"
                />
            </div>
        </div>
    );
};

export default AssignLevel;
