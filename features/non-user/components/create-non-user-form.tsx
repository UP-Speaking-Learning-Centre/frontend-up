'use client';

import { useCreateNonUserForm } from '../hooks/use-create-non-user-form';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { FunnelStage, LeadStatus, SourceLead, Role } from '../types';
import { useGetStaffsByRole } from '@/features/staff-management/queries/use-get-staffs-by-role';
import { useEffect } from 'react';

export const CreateNonUserForm = () => {
    const { form, onSubmit } = useCreateNonUserForm();
    const picRole = form.watch('picRole');

    const { data: staffsData } = useGetStaffsByRole(picRole ? [picRole] : []);
    const picStaffOptions = staffsData?.data || [];

    useEffect(() => {
        form.setValue('picStaff', undefined);
        form.setValue('adminPicId', undefined);
    }, [picRole, form]);

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Left Column */}
                    <div className="space-y-4">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nama</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Masukkan nama" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="phone"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Phone</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Masukkan nomor telepon" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="instagram"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Instagram</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Masukkan username instagram"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="picRole"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>PIC Role</FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        value={field.value || undefined}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Pilih PIC Role" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {[
                                                Role.StaffAdminBabyBear,
                                                Role.StaffAdminPapaBear,
                                                Role.StaffAdminMamaBear,
                                                Role.StaffMarketing,
                                            ].map(role => (
                                                <SelectItem key={role} value={role}>
                                                    {role}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    {/* Right Column */}
                    <div className="space-y-4">
                        <FormField
                            control={form.control}
                            name="sourceLead"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Source Lead</FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Pilih source lead" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {Object.values(SourceLead).map(source => (
                                                <SelectItem key={source} value={source}>
                                                    {source}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="funnelStage"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Funnel Stage</FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Pilih funnel stage" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {Object.values(FunnelStage).map(stage => (
                                                <SelectItem key={stage} value={stage}>
                                                    {stage}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="statusLead"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Lead Status</FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Pilih lead status" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {Object.values(LeadStatus).map(status => (
                                                <SelectItem key={status} value={status}>
                                                    {status}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="picStaff"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>PIC Staff</FormLabel>
                                    <Select
                                        disabled={!picRole}
                                        onValueChange={val => {
                                            field.onChange(val);
                                            const selectedStaff = picStaffOptions.find(
                                                s => s.name === val
                                            );
                                            form.setValue(
                                                'adminPicId',
                                                selectedStaff?.adminPicId || undefined
                                            );
                                        }}
                                        value={field.value || undefined}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue
                                                    placeholder={
                                                        !picRole
                                                            ? 'Pilih Role terlebih dahulu'
                                                            : 'Pilih PIC Staff'
                                                    }
                                                />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {picStaffOptions.map(staff => (
                                                <SelectItem
                                                    key={staff.adminPicId}
                                                    value={staff.name}
                                                >
                                                    {staff.name}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>

                <FormField
                    control={form.control}
                    name="notes"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Notes</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="Tambahkan catatan (opsional)"
                                    className="resize-none h-32"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="flex justify-end pt-4">
                    <Button type="submit" className="w-full md:w-auto">
                        Simpan Non User
                    </Button>
                </div>
            </form>
        </Form>
    );
};
