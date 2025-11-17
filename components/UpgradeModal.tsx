import React from 'react';

interface UpgradeModalProps {
    isOpen: boolean;
    onClose: () => void;
    onUpgrade: () => void;
    currentCount: number;
    limit: number;
}

const CheckIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3} {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
);


export const UpgradeModal: React.FC<UpgradeModalProps> = ({ isOpen, onClose, onUpgrade, currentCount, limit }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex justify-center items-center p-4">
            <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-8 text-center transform transition-all" role="dialog" aria-modal="true" aria-labelledby="modal-title">
                <h2 id="modal-title" className="text-3xl font-extrabold text-gray-900">
                    🚀 Upgrade to Premium
                </h2>
                <p className="mt-4 text-gray-600">
                    You're trying to process <span className="font-bold text-indigo-600">{currentCount} images</span>, but the free plan is limited to <span className="font-bold text-indigo-600">{limit}</span> per batch.
                </p>

                <div className="mt-8 text-left bg-indigo-50 p-6 rounded-lg border border-indigo-200">
                    <h3 className="text-xl font-bold text-gray-900">Premium - $19.99/mo</h3>
                     <ul className="mt-4 space-y-3">
                        <li className="flex items-start"><CheckIcon className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-1" /><span>Process up to <span className="font-bold">20 images</span> at once</span></li>
                        <li className="flex items-start"><CheckIcon className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-1" /><span>Upload up to <span className="font-bold">50 images</span></span></li>
                        <li className="flex items-start"><CheckIcon className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-1" /><span><span className="font-bold">No watermarks</span> on output</span></li>
                        <li className="flex items-start"><CheckIcon className="w-5 h-5 text-green-500 mr-3 flex-shrink-0 mt-1" /><span>All premium features unlocked</span></li>
                    </ul>
                </div>

                <div className="mt-8 flex flex-col gap-4">
                     <button
                        onClick={() => {
                            onUpgrade(); // Navigate to home to see pricing
                            onClose();
                        }}
                        className="w-full inline-flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                    >
                        Upgrade Now
                    </button>
                    <button
                        onClick={onClose}
                        className="w-full inline-flex justify-center items-center px-6 py-3 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    );
};
