import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Form } from '@/components/ui/form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm, UseFormReturn } from 'react-hook-form';
import * as z from 'zod';

export function EditableFormSection<T extends z.ZodTypeAny>({
    title,
    schema,
    defaultValues,
    onSave,
    renderFields,
}: {
    title: string;
    schema: T;
    defaultValues: z.infer<T>;
    onSave: (oldVal: z.infer<T>, newVal: z.infer<T>, onSuccess: () => void, onCancel: () => void) => void;
    renderFields: (form: UseFormReturn<z.infer<T>>, isEditing: boolean) => React.ReactNode;
}) {
    const [isEditing, setIsEditing] = useState(false);
    const form = useForm({ resolver: zodResolver(schema), defaultValues });

    const handleSubmit = (data: z.infer<T>) => {
        onSave(
            defaultValues,
            data,
            () => {
                setIsEditing(false);
            },
            () => {
                // If cancelled from dialog, do nothing, stay in edit mode
            }
        );
    };

    return (
        <Card className="overflow-hidden mb-6">
            <div className="bg-secondary text-white p-4 flex items-center justify-between">
                <h2 className="text-lg font-semibold">{title}</h2>
                {isEditing ? (
                    <Button
                        variant="destructive"
                        size="sm"
                        className="h-7 text-xs"
                        type="button"
                        onClick={() => {
                            setIsEditing(false);
                            form.reset();
                        }}
                    >
                        Batalkan Edit
                    </Button>
                ) : (
                    <Button
                        variant="outline"
                        size="sm"
                        className="h-7 text-xs text-black"
                        type="button"
                        onClick={() => {
                            form.reset(defaultValues);
                            setIsEditing(true);
                        }}
                    >
                        Edit Bagian Ini
                    </Button>
                )}
            </div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className="p-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {renderFields(form, isEditing)}
                    </div>
                    {isEditing && (
                        <div className="mt-6 flex justify-end">
                            <Button type="submit" size="sm">
                                Review Perubahan
                            </Button>
                        </div>
                    )}
                </form>
            </Form>
        </Card>
    );
}
