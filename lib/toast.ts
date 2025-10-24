import { toast } from 'sonner';

export const errorToast = (message: string) =>
    toast.error(message, { position: 'top-center', className: 'bg-red-100' });
