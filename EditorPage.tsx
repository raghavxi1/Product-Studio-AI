import React, { useState, useCallback } from 'react';
import { ImageUploader } from './components/ImageUploader';
import { Loader } from './components/Loader';
import { UpgradeModal } from './components/UpgradeModal';
import { editImage } from './services/geminiService';
import { type ImageData } from './types';

declare const JSZip: any;

const SparklesIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" {...props}>
        <path fillRule="evenodd" d="M10.868 2.884c.321.64.321 1.415 0 2.055a8.348 8.348 0 01-2.122 1.487.75.75 0 01-.97-1.042 6.837 6.837 0 001.06-1.542c.32-.64.97-.97 1.612-.97a.75.75 0 01.42.112zM8.348 4.939a6.837 6.837 0 00-1.06 1.542.75.75 M10 18a8 8 0 100-16 8 8 0 000 16zM6.331 4.223a.75.75 0 01.97-1.042 6.837 6.837 0 00-1.542-1.06.75.75 0 01-.57.01c-.64.32-1.292.65-1.612-.97-.321.64-.321 1.415 0 2.055a8.348 8.348 0 012.122 1.487.75.75 0 01.633-.362zM13.669 4.223a.75.75 0 01-.362-.633 8.348 8.348 0 012.122-1.487c.321-.64.321-1.415 0-2.055-.32-.64-.97-.97-1.612-.97a.75.75 0 01-.57.01 6.837 6.837 0 00-1.542 1.06.75.75 0 01.97 1.042z" clipRule="evenodd" />
    </svg>
);

const HomeIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" {...props}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
    </svg>
);


interface EditorPageProps {
    navigateToHome: () => void;
}

type ProcessedImages = { [fileName: string]: string };

export const EditorPage: React.FC<EditorPageProps> = ({ navigateToHome }) => {
    const [originalImages, setOriginalImages] = useState<ImageData[]>([]);
    const [processedImages, setProcessedImages] = useState<ProcessedImages>({});
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [progressText, setProgressText] = useState('');
    const [isUpgradeModalOpen, setIsUpgradeModalOpen] = useState(false);
    
    const FREE_TIER_UPLOAD_LIMIT = 10;
    const FREE_TIER_BATCH_LIMIT = 3;

    const handleImageUpload = (imageData: ImageData[]) => {
        setOriginalImages(imageData);
        setProcessedImages({});
        setError(null);
    };

    const runBatchProcess = async (promptFn: (image: ImageData) => string) => {
        if (originalImages.length === 0) {
            setError('Please upload at least one image.');
            return;
        }
        if (originalImages.length > FREE_TIER_BATCH_LIMIT) {
            setIsUpgradeModalOpen(true);
            return;
        }

        setIsLoading(true);
        setError(null);
        setProcessedImages({});
        
        const newProcessedImages: ProcessedImages = {};

        for (let i = 0; i < originalImages.length; i++) {
            const image = originalImages[i];
            setProgressText(`Processing image ${i + 1} of ${originalImages.length}...`);
            try {
                const [, base64Data] = image.dataUrl.split(',');
                if (!base64Data) throw new Error("Invalid image data format.");
                
                const prompt = promptFn(image);
                const newBase64Data = await editImage(base64Data, image.mimeType, prompt);
                newProcessedImages[image.file.name] = `data:image/png;base64,${newBase64Data}`;
                setProcessedImages({ ...newProcessedImages }); // Update state incrementally
            } catch (e) {
                console.error(`Failed to process ${image.file.name}:`, e);
                setError(`Failed to process ${image.file.name}. ${e instanceof Error ? e.message : ''}`);
                // Stop the batch on first error to avoid cascading failures
                break; 
            }
        }

        setProgressText('');
        setIsLoading(false);
    };

    const handleAmazonReady = () => {
        const prompt = `Remove the background from this product image. Requirements: Identify the main product object, create clean edges with anti-aliasing, remove ALL background elements, preserve product shadows if natural, return transparent PNG, ensure high precision around complex edges (fur, hair, transparent objects).`;
        runBatchProcess(() => prompt);
    };

    const handleAutoEnhance = () => {
        const prompt = `Optimize this product photo for e-commerce: Adjust white balance, increase sharpness by 20%, boost saturation slightly (10-15%), enhance lighting evenly, remove color casts, maintain natural product colors. Output: High-quality, e-commerce ready image.`;
        runBatchProcess(() => prompt);
    };

    const handleAddShadow = () => {
        const prompt = `Identify the main product in this image, remove the background, and then add a subtle, realistic drop shadow to the product. The final image must have a transparent background.`;
        runBatchProcess(() => prompt);
    };

    const handleReset = () => {
        setOriginalImages([]);
        setProcessedImages({});
        setError(null);
        setIsLoading(false);
    };

    const handleDownloadAll = async () => {
        if (Object.keys(processedImages).length === 0) return;
    
        setIsLoading(true);
        setProgressText('Creating ZIP file...');
    
        try {
            const zip = new JSZip();
    
            const imagePromises = Object.entries(processedImages).map(async ([fileName, dataUrl]) => {
                const response = await fetch(dataUrl);
                const blob = await response.blob();
                const nameParts = fileName.split('.');
                nameParts.pop(); // remove extension
                const newFileName = `${nameParts.join('.')}_edited.png`;
                zip.file(newFileName, blob);
            });
    
            await Promise.all(imagePromises);
    
            const content = await zip.generateAsync({ type: 'blob' });
            
            const link = document.createElement('a');
            link.href = URL.createObjectURL(content);
            link.download = 'ProductStudio_AI_Batch.zip';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            URL.revokeObjectURL(link.href);
    
        } catch (err) {
            console.error("Error creating ZIP file:", err);
            setError("Could not create ZIP file. Please try again or download images individually.");
        } finally {
            setIsLoading(false);
            setProgressText('');
        }
    };

    const allImagesProcessed = originalImages.length > 0 && Object.keys(processedImages).length === originalImages.length;

    return (
        <div className="min-h-screen bg-gray-50 text-gray-800 font-sans">
            {isLoading && <Loader progressText={progressText} />}
            <UpgradeModal 
                isOpen={isUpgradeModalOpen}
                onClose={() => setIsUpgradeModalOpen(false)}
                onUpgrade={navigateToHome} // Simple navigation for now
                currentCount={originalImages.length}
                limit={FREE_TIER_BATCH_LIMIT}
            />

            <header className="py-6 bg-white shadow-sm">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button onClick={navigateToHome} className="flex items-center gap-2 text-sm text-gray-600 hover:text-indigo-600 transition-colors focus:outline-none" aria-label="Back to Home">
                            <HomeIcon className="w-5 h-5"/>
                            Back to Home
                        </button>
                    </div>
                    <div onClick={navigateToHome} className="flex items-center cursor-pointer absolute left-1/2 -translate-x-1/2">
                        <SparklesIcon className="w-8 h-8 text-indigo-500 mr-3" />
                        <h1 className="text-3xl font-bold tracking-tight text-gray-900 hidden sm:block">ProductStudio AI</h1>
                    </div>
                    <div className="text-sm font-semibold text-gray-600 bg-gray-100 px-3 py-1 rounded-full">
                        <span className="font-bold">{originalImages.length}</span> uploaded (Batch limit: <span className="font-bold">{FREE_TIER_BATCH_LIMIT}</span>)
                    </div>
                </div>
            </header>

            <main className="container mx-auto p-4 sm:p-6 lg:p-8">
                {originalImages.length === 0 ? (
                    <div className="max-w-3xl mx-auto">
                         <h2 className="text-center text-2xl font-semibold text-gray-700 mb-2">Bulk Edit Your Product Photos</h2>
                         <p className="text-center text-gray-500 mb-6">Upload up to {FREE_TIER_UPLOAD_LIMIT} images on the free plan. Our AI will do the rest.</p>
                        <ImageUploader onImageUpload={handleImageUpload} maxFiles={FREE_TIER_UPLOAD_LIMIT} />
                    </div>
                ) : (
                    <div>
                        {/* Control Panel */}
                        <div className="w-full max-w-4xl mx-auto bg-white p-6 rounded-xl shadow-md border mb-8">
                            <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">Step 2: Choose an Action to Apply to All Images</h3>
                             <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <button onClick={handleAmazonReady} disabled={isLoading} className="p-4 border rounded-lg hover:bg-indigo-50 hover:border-indigo-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                                    <h4 className="font-bold text-indigo-600">Amazon Ready</h4>
                                    <p className="text-sm text-gray-500">Removes background for a pure white result.</p>
                                </button>
                                <button onClick={handleAutoEnhance} disabled={isLoading} className="p-4 border rounded-lg hover:bg-indigo-50 hover:border-indigo-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                                    <h4 className="font-bold text-indigo-600">Auto-Enhance</h4>
                                    <p className="text-sm text-gray-500">Optimizes color, sharpness, and lighting.</p>
                                </button>
                                <button onClick={handleAddShadow} disabled={isLoading} className="p-4 border rounded-lg hover:bg-indigo-50 hover:border-indigo-500 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                                    <h4 className="font-bold text-indigo-600">Add Drop Shadow</h4>
                                    <p className="text-sm text-gray-500">Adds a soft, realistic shadow for depth.</p>
                                </button>
                            </div>
                        </div>

                         {error && (
                            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-md relative my-4 max-w-4xl mx-auto text-center" role="alert">
                                <span className="block sm:inline">{error}</span>
                            </div>
                        )}

                        {/* Image Gallery */}
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                            {originalImages.map((image) => (
                                <div key={image.file.name} className="relative aspect-square border rounded-lg shadow-sm bg-white overflow-hidden">
                                     <img 
                                        src={processedImages[image.file.name] || image.dataUrl} 
                                        alt={image.file.name} 
                                        className="w-full h-full object-contain" 
                                     />
                                     <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs text-center p-1 truncate">
                                        {image.file.name}
                                     </div>
                                </div>
                            ))}
                        </div>
                        
                        {/* Download/Reset Actions */}
                        <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-4">
                             <button
                                onClick={handleReset}
                                disabled={isLoading}
                                className="px-6 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                            >
                                Start Over
                            </button>
                           {allImagesProcessed && (
                                <button
                                    onClick={handleDownloadAll}
                                    disabled={isLoading}
                                    className="px-6 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50"
                                >
                                    Download All ({originalImages.length})
                                </button>
                            )}
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}
