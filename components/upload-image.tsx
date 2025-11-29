import { cn } from '@/lib/utils';
import { Input } from './ui/input';
import { UploadIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import CropImage from './crop-image';
import ImageWithFallback from './ui/image-with-fallback';

interface UploadImageProps {
    handleUpload: (file: File) => void;
    label?: string;
    value?: string | null;
    width?: number;
    height?: number;
    size?: number;
}

const UploadImage = ({
    handleUpload,
    label = 'Upload Image',
    value,
    width = 320,
    height = 170,
    size = 4,
}: UploadImageProps) => {
    const [open, setOpen] = useState(false);
    const [tempImage, setTempImage] = useState<string | null>(null);
    const [fileUrl, setFileUrl] = useState<string | null>('');

    const [isLimitSize, setIsLimitSize] = useState(false);

    const onSave = (file: File) => {
        if (file.size > 1024 * 1024 * size) {
            setIsLimitSize(true);
            return;
        }
        setIsLimitSize(false);
        handleUpload(file);
        setTempImage('');
        setFileUrl(URL.createObjectURL(file));
        setOpen(false);
    };

    useEffect(() => {
        if (value && !fileUrl) {
            setFileUrl(value);
        }
    }, [value, fileUrl]);

    return (
        <>
            <CropImage
                open={open}
                onCancel={() => {
                    setOpen(false);
                    setTempImage('');
                }}
                onSave={file => onSave(file)}
                aspect={width / height}
                image={tempImage || ''}
            />
            {fileUrl && (
                <div
                    style={{ width: '70%', maxWidth: width, aspectRatio: width / height }}
                    className={cn('relative mx-auto mb-4 rounded-md overflow-hidden')}
                >
                    <ImageWithFallback
                        src={fileUrl}
                        fallbackSrc="/location.svg"
                        alt="Preview"
                        fill
                        className="object-cover"
                    />
                </div>
            )}
            <div className="border flex items-center justify-center border-gray-300 rounded-md px-4 py-2 w-full">
                <Input
                    type="file"
                    id="file"
                    accept="image/*"
                    className={cn('w-full hidden')}
                    onChange={e => {
                        if (!e.target.files?.length) throw new Error('No file to upload');
                        setOpen(true);
                        setTempImage(URL.createObjectURL(e.target.files[0]));
                    }}
                />
                <label
                    htmlFor="file"
                    className="cursor-pointer w-full h-full flex gap-2 text-sm items-center justify-center"
                >
                    <UploadIcon className="size-4" /> {label} {fileUrl ? 'Lainnya' : ''}
                </label>
            </div>
            {isLimitSize && (
                <p className="text-red-500 text-sm mt-1">
                    File size tidak boleh lebih dari {size}MB
                </p>
            )}
        </>
    );
};

export default UploadImage;
