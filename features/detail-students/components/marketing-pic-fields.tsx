import { FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { FieldDisplay } from './field-display';
import { FormFieldDisplay } from './form-field-display';
import { Role } from '@/features/non-user/types';
import { useGetStaffsByRole } from '@/features/staff-management/queries/use-get-staffs-by-role';
import { UseFormReturn } from 'react-hook-form';

export const MarketingPicFields = ({
    form,
    isEditing,
}: {
    form: UseFormReturn<any>;
    isEditing: boolean;
}) => {
    const picRole = form.watch('marketing.picRole');
    const { data: staffs } = useGetStaffsByRole(picRole ? [picRole] : []);

    return (
        <div className="space-y-4">
            <FormField
                control={form.control}
                name="marketing.picRole"
                render={({ field }) => (
                    <FormItem>
                        {isEditing ? (
                            <>
                                <FormLabel className="text-sm text-gray-600 mb-1">
                                    PIC Role
                                </FormLabel>
                                <FormControl>
                                    <Select
                                        onValueChange={val => {
                                            field.onChange(val);
                                            form.setValue('marketing.picPerson', '');
                                            form.setValue('marketing.adminPicId', undefined);
                                        }}
                                        value={field.value}
                                    >
                                        <SelectTrigger>
                                            <SelectValue placeholder="Pilih PIC Role" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {Object.values(Role)
                                                .filter(
                                                    r =>
                                                        r !== Role.SuperAdmin &&
                                                        r !== Role.LeadAdmin &&
                                                        r !== Role.LeadMarketing
                                                )
                                                .map(v => (
                                                    <SelectItem key={v} value={v}>
                                                        {v}
                                                    </SelectItem>
                                                ))}
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                            </>
                        ) : (
                            <FieldDisplay label="PIC Role" value={field.value} />
                        )}
                        <FormMessage />
                    </FormItem>
                )}
            />

            <FormField
                control={form.control}
                name="marketing.picPerson"
                render={({ field }) => (
                    <FormItem>
                        {isEditing ? (
                            <>
                                <FormLabel className="text-sm text-gray-600 mb-1">
                                    PIC Person
                                </FormLabel>
                                <FormControl>
                                    <Select
                                        onValueChange={val => {
                                            field.onChange(val);
                                            const selectedStaff = staffs?.data?.find(
                                                (s: any) => s.name === val
                                            );
                                            if (selectedStaff) {
                                                form.setValue(
                                                    'marketing.adminPicId',
                                                    selectedStaff.adminPicId
                                                );
                                            } else {
                                                form.setValue('marketing.adminPicId', undefined);
                                            }
                                        }}
                                        value={field.value}
                                        disabled={!picRole}
                                    >
                                        <SelectTrigger>
                                            <SelectValue
                                                placeholder={
                                                    picRole
                                                        ? 'Pilih PIC Person'
                                                        : 'Pilih Role terlebih dahulu'
                                                }
                                            />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {staffs?.data?.map((staff: any) => (
                                                <SelectItem
                                                    key={staff.adminPicId}
                                                    value={staff.name}
                                                >
                                                    {staff.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                            </>
                        ) : (
                            <FieldDisplay label="PIC Person" value={field.value} />
                        )}
                        <FormMessage />
                    </FormItem>
                )}
            />
            {/* hidden adminPicId */}
            <FormField control={form.control} name="marketing.adminPicId" render={() => <></>} />

            <FormFieldDisplay
                form={form}
                name="marketing.lastUpdate"
                label="Last Follow Up"
                isEditing={isEditing}
                type="datetime-picker"
            />
        </div>
    );
};
