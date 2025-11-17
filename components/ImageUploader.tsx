import React, { useState, useCallback, useRef } from 'react';
import { type ImageData } from '../types';
import { fileToDataUrl } from '../utils/fileUtils';

interface ImageUploaderProps {
    onImageUpload: (imageData: ImageData[]) => void;
    maxFiles?: number;
}

const ImageUpArrowIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5m-13.5-9L12 3m0 0l4.5 4.5M12 3v13.5" />
    </svg>
);


export const ImageUploader: React.FC<ImageUploaderProps> = ({ onImageUpload, maxFiles = 50 }) => {
    const [isDragging, setIsDragging] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFiles = useCallback(async (files: FileList) => {
        setError(null);
        if (!files || files.length === 0) return;

        if (files.length > maxFiles) {
             setError(`You can upload a maximum of ${maxFiles} images at a time.`);
             return;
        }

        const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
        const maxSizeInMB = 10;
        const imagePromises: Promise<ImageData>[] = [];

        for (const file of Array.from(files)) {
            if (!allowedTypes.includes(file.type)) {
                setError(`File type not supported: ${file.name}. Please upload JPG, PNG, or WEBP.`);
                continue; // Skip this file
            }

            if (file.size > maxSizeInMB * 1024 * 1024) {
                setError(`File too large: ${file.name}. Maximum size is ${maxSizeInMB}MB.`);
                continue; // Skip this file
            }

            imagePromises.push(
                fileToDataUrl(file).then(dataUrl => ({ file, dataUrl, mimeType: file.type }))
            );
        }

        try {
            const imageDataArray = await Promise.all(imagePromises);
            if (imageDataArray.length > 0) {
                 onImageUpload(imageDataArray);
            }
        } catch (err) {
            setError('Could not read one or more files.');
            console.error(err);
        }
    }, [onImageUpload, maxFiles]);

    const onDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(true);
    };

    const onDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
    };

    const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
    };

    const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
        handleFiles(e.dataTransfer.files);
    };

    const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            handleFiles(e.target.files);
        }
    };

    const onAreaClick = () => {
        fileInputRef.current?.click();
    };

    const dynamicBorder = isDragging ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300 bg-white';

    return (
        <div className="flex flex-col items-center justify-center w-full">
            <div
                onClick={onAreaClick}
                onDrop={onDrop}
                onDragOver={onDragOver}
                onDragEnter={onDragEnter}
                onDragLeave={onDragLeave}
                className={`w-full p-8 text-center border-2 border-dashed ${dynamicBorder} rounded-xl cursor-pointer transition-colors duration-200 ease-in-out`}
            >
                <input
                    ref={fileInputRef}
                    type="file"
                    className="hidden"
                    accept="image/jpeg, image/png, image/webp"
                    onChange={onFileChange}
                    multiple
                />
                <ImageUpArrowIcon className="mx-auto h-12 w-12 text-gray-400" />
                <p className="mt-4 text-sm text-gray-600">
                    <span className="font-semibold text-indigo-600">Click to upload</span> or drag and drop
                </p>
                <p className="text-xs text-gray-500 mt-1">PNG, JPG, WEBP up to 10MB each (max {maxFiles} files)</p>
            </div>
            {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
        </div>
    );
};