import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { FileText, Save } from 'lucide-react';
import React from 'react';
import AssignLevel from './assign-level';
import { Button } from '@/components/ui/button';
import { PlacementTestStatus } from '@/types/placement-test';
import useDetailPlacementTest from '../hooks/use-detail-placement-test';

const StatusManagement = () => {
    const { status, setState } = useDetailPlacementTest();

    const handleSave = () => {
        console.log('submit');
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    Status Management
                </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div>
                    <Label>Status</Label>
                    <Select
                        value={status}
                        onValueChange={value => setState({ status: value as PlacementTestStatus })}
                    >
                        <SelectTrigger>
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="notGraded">Not Graded</SelectItem>
                            <SelectItem value="reviewed">Reviewed</SelectItem>
                            <SelectItem value="inInterview">In Interview</SelectItem>
                            <SelectItem value="doneInterview">Done Interview</SelectItem>
                            <SelectItem value="graded">Graded</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {(status === 'doneInterview' || status === 'graded') && <AssignLevel />}

                <Button onClick={handleSave} className="w-full">
                    <Save className="w-4 h-4 mr-2" />
                    Save Changes
                </Button>
            </CardContent>
        </Card>
    );
};

export default StatusManagement;
