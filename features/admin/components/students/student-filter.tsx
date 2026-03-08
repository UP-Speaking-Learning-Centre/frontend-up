import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { ALL_GROUP, ALL_MENTOR, ALL_PROGRAM } from '@/features/admin/constants/config';
import DashboardFilter from '@/features/dashboard/components/filter';
import { cn } from '@/lib/utils';
import { ChevronDown, Filter } from 'lucide-react';

interface StudentFilterProps {
    isFilterOpen: boolean;
    setIsFilterOpen: (isOpen: boolean) => void;
    filter: any;
    onChangeFilter: (key: string, value: string) => void;
    debouncedSearch: (value: string) => void;
    programs: any[];
    onChangeProgram: (value: string) => void;
    groups: any[];
    onChangeGroup: (value: string) => void;
    mentors: any[];
    onChangeMentor: (value: string) => void;
}

export default function StudentFilter({
    isFilterOpen,
    setIsFilterOpen,
    filter,
    onChangeFilter,
    debouncedSearch,
    programs,
    onChangeProgram,
    groups,
    onChangeGroup,
    mentors,
    onChangeMentor,
}: StudentFilterProps) {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="text-xl flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                        <Filter className="size-5" />
                        Filters
                    </div>
                    <div className="size-8 flex items-center justify-center border border-primary rounded-sm cursor-pointer">
                        <ChevronDown
                            className={cn(
                                'size-5 transition-all duration-300 text-primary ease-in-out',
                                isFilterOpen ? 'rotate-180' : ''
                            )}
                            onClick={() => setIsFilterOpen(!isFilterOpen)}
                        />
                    </div>
                </CardTitle>
            </CardHeader>
            <CardContent className="p-0">
                <div
                    className={cn(
                        'grid grid-cols-1 mx-6 mt-0 overflow-hidden md:grid-cols-4 gap-4 h-fit transition-all duration-300 ease-in-out',
                        isFilterOpen ? 'max-h-[50vh] mb-6' : 'max-h-0 mb-0'
                    )}
                >
                    <div className="flex flex-col items-start gap-2">
                        <Label>Nama</Label>
                        <Input
                            value={filter.localSearchQuery}
                            placeholder="Cari Nama"
                            onChange={e => {
                                onChangeFilter('localSearchQuery', e.target.value);
                                debouncedSearch(e.target.value);
                            }}
                        />
                    </div>
                    <DashboardFilter
                        label="Program"
                        options={
                            programs?.map((program: any) => ({
                                id: program.id,
                                name: program.name,
                            })) || []
                        }
                        onSelect={onChangeProgram}
                        value={filter.program?.toString() || ''}
                        defaultValue={ALL_PROGRAM}
                    />
                    <DashboardFilter
                        label="Group"
                        options={groups}
                        onSelect={onChangeGroup}
                        value={filter.group?.toString() || ''}
                        defaultValue={ALL_GROUP}
                    />
                    <DashboardFilter
                        label="Mentor"
                        options={mentors}
                        onSelect={onChangeMentor}
                        value={filter.mentors.toString() || ''}
                        defaultValue={ALL_MENTOR}
                    />
                </div>
            </CardContent>
        </Card>
    );
}
