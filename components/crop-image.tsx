'use client';

import React, { useState, useCallback } from 'react';
import Cropper from 'react-easy-crop';
import getCroppedImg from '../lib/image';
import { Dialog, DialogContent, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { MinusCircle, PlusCircle } from 'lucide-react';

interface Point {
    x: number;
    y: number;
}

interface Area {
    x: number;
    y: number;
    width: number;
    height: number;
}

interface CropImageProps {
    open: boolean;
    title?: string;
    onCancel: () => void;
    onSave: (file: File) => void;
    aspect: number;
    image: string;
}

const CropImage: React.FC<CropImageProps> = ({ open, onCancel, onSave, aspect, image }) => {
    const minZoomValue = 1;
    const maxZoomValue = 3;
    const stepZoomValue = 0.1;

    const [crop, setCrop] = useState<Point>({ x: 0, y: 0 });
    const [zoom, setZoom] = useState<number>(minZoomValue);
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

    const onCropComplete = useCallback((croppedArea: Area, croppedAreaPixels: Area) => {
        setCroppedAreaPixels(croppedAreaPixels);
    }, []);

    const showCroppedImage = useCallback(async () => {
        try {
            if (!croppedAreaPixels) return;

            const croppedImage = await getCroppedImg(image, croppedAreaPixels);

            if (!croppedImage) return;

            const file = new File([croppedImage], 'cropped-image.jpg', { type: 'image/jpeg' });

            onSave(file);
            handleClose();
        } catch (e) {
            console.error('Error cropping image:', e);
        }
    }, [croppedAreaPixels, image, onSave]);

    const handleClose = () => {
        setCrop({ x: 0, y: 0 });
        setZoom(minZoomValue);
        setCroppedAreaPixels(null);
        onCancel();
    };

    if (!open) return null;

    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent>
                <DialogTitle className="sr-only" />
                <div style={{ height: '400px', position: 'relative' }}>
                    <Cropper
                        image={image}
                        crop={crop}
                        zoom={zoom}
                        aspect={aspect}
                        onCropChange={setCrop}
                        onZoomChange={setZoom}
                        onCropComplete={onCropComplete}
                        cropShape="rect"
                        showGrid={true}
                    />
                </div>
                <div className="flex justify-center mt-3">
                    <MinusCircle
                        className="me-3 cursor-pointer text-primary size-6"
                        onClick={() =>
                            setZoom(prev => Math.max(prev - stepZoomValue, minZoomValue))
                        }
                    />
                    <PlusCircle
                        className="ms-3 cursor-pointer text-primary size-6"
                        onClick={() =>
                            setZoom(prev => Math.min(prev + stepZoomValue, maxZoomValue))
                        }
                    />
                </div>
                <div className="flex items-center gap-4 mt-10">
                    <Button variant="outline" className="grow" onClick={handleClose}>
                        Cancel
                    </Button>
                    <Button variant="default" className="grow" onClick={showCroppedImage}>
                        Upload
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
};

export default CropImage;
