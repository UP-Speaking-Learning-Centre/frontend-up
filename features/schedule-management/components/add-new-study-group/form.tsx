import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Plus } from 'lucide-react';
import { Controller, useForm } from 'react-hook-form';
import SelectProgram from './select-program';
import SelectPackage from './select-package';
import SelectGrade from './select-grade';
import SelectTeacher from './select-teacher';
import SelectLocation from './select-location';
import SelectGroup from './select-group';
import SelectLevel from './select-level';
import { InitialValue, useNewStudyGroupStore } from '../../stores/new-study-group-store';

const AddNewStudyGroup = ({
    open,
    setOpen,
}: {
    open: boolean;
    setOpen: (open: boolean) => void;
}) => {
    const initialValue = useNewStudyGroupStore(s => s.initialValue);
    const setValue = useNewStudyGroupStore(s => s.setValue);

    console.log('asdd');
    const form = useForm({
        defaultValues: initialValue,
    });

    const onChange = (key: keyof InitialValue, data: any) => {
        setValue(key, data);
    };

    const { handleSubmit, control } = form;

    return (
        <>
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="h-[calc(100vh-10rem)] overflow-y-auto">
                    <DialogTitle>Tambah Kelompok Belajar</DialogTitle>
                    <form className="space-y-4" onSubmit={handleSubmit(data => console.log(data))}>
                        <Controller
                            control={control}
                            name="title"
                            render={({ field }) => (
                                <div>
                                    <Label>Nama Kelompok*</Label>
                                    <Input
                                        className="mt-1"
                                        value={field.value}
                                        onChange={e => {
                                            onChange('title', e.target.value);
                                            field.onChange(e);
                                        }}
                                    />
                                </div>
                            )}
                        />

                        <Controller
                            control={control}
                            name="description"
                            render={({ field }) => (
                                <div>
                                    <Label>Deskripsi</Label>
                                    <Input
                                        className="mt-1"
                                        value={field.value}
                                        onChange={e => {
                                            onChange('description', e.target.value);
                                            field.onChange(e);
                                        }}
                                    />
                                </div>
                            )}
                        />

                        <Controller
                            control={control}
                            name="programId"
                            render={({ field }) => (
                                <SelectProgram
                                    value={field.value}
                                    onChange={value => {
                                        onChange('programId', value);
                                        field.onChange(value);
                                    }}
                                />
                            )}
                        />

                        <Controller
                            control={control}
                            name="groupId"
                            render={({ field }) => (
                                <SelectGroup
                                    value={field.value}
                                    onChange={value => {
                                        onChange('groupId', value);
                                        field.onChange(value);
                                    }}
                                />
                            )}
                        />

                        <Controller
                            control={control}
                            name="levelId"
                            render={({ field }) => (
                                <SelectLevel
                                    value={field.value}
                                    onChange={value => {
                                        onChange('levelId', value);
                                        field.onChange(value);
                                    }}
                                />
                            )}
                        />

                        <Controller
                            control={control}
                            name="gradeId"
                            render={({ field }) => (
                                <SelectGrade
                                    value={field.value}
                                    onChange={value => {
                                        onChange('gradeId', value);
                                        field.onChange(value);
                                    }}
                                />
                            )}
                        />

                        <Controller
                            control={control}
                            name="packageId"
                            render={({ field }) => (
                                <SelectPackage
                                    value={field.value}
                                    onChange={value => {
                                        onChange('packageId', value);
                                        field.onChange(value);
                                    }}
                                />
                            )}
                        />

                        <Controller
                            control={control}
                            name="teacherTeamMemberId"
                            render={({ field }) => (
                                <SelectTeacher
                                    value={field.value}
                                    onChange={value => {
                                        onChange('teacherTeamMemberId', value);
                                        field.onChange(value);
                                    }}
                                />
                            )}
                        />

                        <Controller
                            control={control}
                            name="locationId"
                            render={({ field }) => (
                                <SelectLocation
                                    value={field.value}
                                    onChange={value => {
                                        onChange('locationId', value);
                                        field.onChange(value);
                                    }}
                                />
                            )}
                        />

                        <div>
                            <Label>Jadwal 1*</Label>
                            <div className="flex gap-4">
                                <Controller
                                    control={control}
                                    name="day1"
                                    render={({ field }) => (
                                        <div className="grow shrink-0">
                                            <Label className="font-normal">Hari</Label>
                                            <Select>
                                                <SelectTrigger className="mt-1">
                                                    <SelectValue placeholder="Pilih Jadwal" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="schedule1">
                                                        Jadwal 1
                                                    </SelectItem>
                                                    <SelectItem value="schedule2">
                                                        Jadwal 2
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    )}
                                />
                                <Controller
                                    control={control}
                                    name="time1"
                                    render={({ field }) => (
                                        <div className="grow shrink-0">
                                            <Label className="font-normal">Waktu</Label>
                                            <Select>
                                                <SelectTrigger className="mt-1">
                                                    <SelectValue placeholder="Pilih Jadwal" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="schedule1">
                                                        Jadwal 1
                                                    </SelectItem>
                                                    <SelectItem value="schedule2">
                                                        Jadwal 2
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    )}
                                />
                            </div>
                        </div>

                        <div>
                            <Label>Jadwal 2*</Label>
                            <div className="flex gap-4">
                                <Controller
                                    control={control}
                                    name="day2"
                                    render={({ field }) => (
                                        <div className="grow shrink-0">
                                            <Label className="font-normal">Hari</Label>
                                            <Select>
                                                <SelectTrigger className="mt-1">
                                                    <SelectValue placeholder="Pilih Jadwal" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="schedule1">
                                                        Jadwal 1
                                                    </SelectItem>
                                                    <SelectItem value="schedule2">
                                                        Jadwal 2
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    )}
                                />
                                <Controller
                                    control={control}
                                    name="time2"
                                    render={({ field }) => (
                                        <div className="grow shrink-0">
                                            <Label className="text-sm font-normal">Waktu</Label>
                                            <Select>
                                                <SelectTrigger className="mt-1">
                                                    <SelectValue placeholder="Pilih Jadwal" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="schedule1">
                                                        Jadwal 1
                                                    </SelectItem>
                                                    <SelectItem value="schedule2">
                                                        Jadwal 2
                                                    </SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    )}
                                />
                            </div>
                        </div>

                        <div className="flex justify-end">
                            <Button type="submit">Buat Kelompok Belajar</Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default AddNewStudyGroup;
