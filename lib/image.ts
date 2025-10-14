export const createImage = (url: string): Promise<HTMLImageElement> =>
    new Promise((resolve, reject) => {
        const image = new Image();
        image.addEventListener('load', () => resolve(image));
        image.addEventListener('error', error => reject(error));
        image.setAttribute('crossOrigin', 'anonymous');
        image.src = url;
    });

export const getRadianAngle = (degreeValue: number): number => {
    return (degreeValue * Math.PI) / 180;
};

interface RotateSizeResult {
    width: number;
    height: number;
}

export const rotateSize = (width: number, height: number, rotation: number): RotateSizeResult => {
    const rotRad = getRadianAngle(rotation);

    return {
        width: Math.abs(Math.cos(rotRad) * width) + Math.abs(Math.sin(rotRad) * height),
        height: Math.abs(Math.sin(rotRad) * width) + Math.abs(Math.cos(rotRad) * height),
    };
};

interface PixelCrop {
    x: number;
    y: number;
    width: number;
    height: number;
}

interface FlipOptions {
    horizontal: boolean;
    vertical: boolean;
}

const getCroppedImg = async (
    imageSrc: string,
    pixelCrop: PixelCrop,
    rotation: number = 0,
    flip: FlipOptions = { horizontal: false, vertical: false }
): Promise<Blob | null> => {
    const image = await createImage(imageSrc);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    if (!ctx) {
        return null;
    }

    const rotRad = getRadianAngle(rotation);

    const { width: bBoxWidth, height: bBoxHeight } = rotateSize(
        image.width,
        image.height,
        rotation
    );

    canvas.width = bBoxWidth;
    canvas.height = bBoxHeight;

    ctx.translate(bBoxWidth / 2, bBoxHeight / 2);
    ctx.rotate(rotRad);
    ctx.scale(flip.horizontal ? -1 : 1, flip.vertical ? -1 : 1);
    ctx.translate(-image.width / 2, -image.height / 2);
    ctx.drawImage(image, 0, 0);
    const data = ctx.getImageData(pixelCrop.x, pixelCrop.y, pixelCrop.width, pixelCrop.height);
    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;

    ctx.putImageData(data, 0, 0);

    return new Promise(resolve => {
        canvas.toBlob(blob => resolve(blob), 'image/jpeg', 0.8);
    });
};

export default getCroppedImg;

export async function imageUrlToFile(imageUrl: string, fileName?: string): Promise<File> {
    const response = await fetch(imageUrl);
    if (!response.ok) {
        throw new Error(`Failed to fetch image: ${response.statusText}`);
    }
    const blob = await response.blob();

    const ext = imageUrl.split('.').pop()?.split('?')[0] || 'jpg';
    const type = blob.type || `image/${ext}`;
    const name = fileName || `image.${ext}`;

    return new File([blob], name, { type });
}
