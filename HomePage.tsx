import React from 'react';

const SparklesIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" {...props}>
        <path fillRule="evenodd" d="M10.868 2.884c.321.64.321 1.415 0 2.055a8.348 8.348 0 01-2.122 1.487.75.75 0 01-.97-1.042 6.837 6.837 0 001.06-1.542c.32-.64.97-.97 1.612-.97a.75.75 0 01.42.112zM8.348 4.939a6.837 6.837 0 00-1.06 1.542.75.75 0 11-.97 1.042 8.348 8.348 0 01-2.122-1.487c-.321-.64-.321-1.415 0-2.055a.75.75 0 011.042.97 6.837 6.837 0 001.542 1.06.75.75 0 01.57-.01z" clipRule="evenodd" />
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM6.331 4.223a.75.75 0 01.97-1.042 6.837 6.837 0 00-1.542-1.06.75.75 0 01-.57.01c-.64.32-1.292.65-1.612-.97-.321.64-.321 1.415 0 2.055a8.348 8.348 0 012.122 1.487.75.75 0 01.633-.362zM13.669 4.223a.75.75 0 01-.362-.633 8.348 8.348 0 012.122-1.487c.321-.64.321-1.415 0-2.055-.32-.64-.97-.97-1.612-.97a.75.75 0 01-.57.01 6.837 6.837 0 00-1.542 1.06.75.75 0 01.97 1.042z" clipRule="evenodd" />
    </svg>
);
const CheckIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
    <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3} {...props}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
);


interface HomePageProps {
    navigateToEditor: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({ navigateToEditor }) => {
    const faqs = [
        { q: "How many images can I edit for free?", a: "Our free plan allows you to process up to 5 images per month, which includes background removal." },
        { q: "What image formats are supported?", a: "We support the most common image formats: JPG, PNG, and WEBP." },
        { q: "Can I edit photos in bulk?", a: "Yes! Our Premium plan allows you to upload and process up to 50 images at once, applying the same settings to all of them." },
        { q: "What are Amazon's product photo requirements?", a: "Amazon requires a pure white background (#FFFFFF), and images should be at least 1000px on the longest side. Our 'Amazon Ready' preset handles this for you automatically." },
        { q: "How do I add shadows to product photos?", a: "After removing the background, you can use our 'Add Shadow' feature. Choose from a natural drop shadow or a reflection to add realism." },
        { q: "Can I cancel my subscription anytime?", a: "Absolutely. You can cancel your subscription at any time with no questions asked." },
    ];

    return (
        <div className="bg-gray-50 text-gray-800 font-sans">
            <header className="py-6 bg-white shadow-sm sticky top-0 z-10">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-center">
                    <SparklesIcon className="w-8 h-8 text-indigo-500 mr-3" />
                    <h1 className="text-3xl font-bold text-gray-900 tracking-tight">ProductStudio AI</h1>
                </div>
            </header>

            <main>
                {/* Hero Section */}
                <div className="bg-white">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-20 text-center">
                        <h2 className="text-4xl font-extrabold text-gray-900 sm:text-5xl md:text-6xl tracking-tight">
                            Edit 50 Product Photos in 1 Click
                        </h2>
                        <p className="mt-6 max-w-2xl mx-auto text-xl text-gray-500">
                           Remove backgrounds, add shadows, and auto-enhance for Amazon & Shopify—all in one batch.
                        </p>
                        <div className="mt-8 flex justify-center">
                            <button
                                onClick={navigateToEditor}
                                className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
                            >
                                Start Free (No Credit Card)
                            </button>
                        </div>
                    </div>
                </div>

                {/* Problem/Solution Section */}
                 <div className="py-20 sm:py-24">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center">
                            <h3 className="text-base font-semibold text-indigo-600 tracking-wider uppercase">Stop Editing One By One</h3>
                            <p className="mt-2 text-3xl font-extrabold text-gray-900 tracking-tight sm:text-4xl">
                                Reclaim Your Time. Grow Your Store.
                            </p>
                             <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-500">
                                You have better things to do than spend hours in Photoshop. Our AI handles the tedious work so you can focus on selling.
                            </p>
                        </div>
                        <div className="mt-16 grid gap-10 md:grid-cols-3">
                            <div className="text-center">
                                <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-indigo-100 text-indigo-600">
                                    <SparklesIcon className="h-6 w-6"/>
                                </div>
                                <h4 className="mt-4 text-xl font-bold">Batch Processing</h4>
                                <p className="mt-2 text-gray-500">Apply edits to 50 images at once. Perfect for new product launches.</p>
                            </div>
                            <div className="text-center">
                                <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-indigo-100 text-indigo-600">
                                     <SparklesIcon className="h-6 w-6"/>
                                </div>
                                <h4 className="mt-4 text-xl font-bold">One-Click Templates</h4>
                                <p className="mt-2 text-gray-500">Get compliant photos for Amazon, Etsy, and Shopify in a single click.</p>
                            </div>
                            <div className="text-center">
                                <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-indigo-100 text-indigo-600">
                                     <SparklesIcon className="h-6 w-6"/>
                                </div>
                                <h4 className="mt-4 text-xl font-bold">Auto-Enhance</h4>
                                <p className="mt-2 text-gray-500">Our AI analyzes your photo and optimizes color, lighting, and sharpness for sales.</p>
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Pricing Section */}
                <div id="pricing" className="bg-white py-20 sm:py-24">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="text-center">
                            <h3 className="text-3xl font-extrabold text-gray-900 tracking-tight">Simple, Transparent Pricing</h3>
                            <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-500">
                                Choose the plan that's right for your business.
                            </p>
                        </div>
                        <div className="mt-16 grid gap-8 md:grid-cols-2 max-w-4xl mx-auto">
                            {/* Free Plan */}
                            <div className="border border-gray-200 rounded-2xl p-8 flex flex-col">
                                <h4 className="text-2xl font-bold text-gray-900">Free</h4>
                                <p className="mt-2 text-gray-500">For trying things out</p>
                                <div className="mt-6">
                                    <span className="text-5xl font-extrabold">$0</span>
                                    <span className="text-xl font-medium text-gray-500">/mo</span>
                                </div>
                                <ul className="mt-8 space-y-4">
                                    <li className="flex items-start"><CheckIcon className="w-6 h-6 text-green-500 mr-3 flex-shrink-0" /><span><span className="font-bold">5 images</span>/month</span></li>
                                    <li className="flex items-start"><CheckIcon className="w-6 h-6 text-green-500 mr-3 flex-shrink-0" /><span>Background removal only</span></li>
                                    <li className="flex items-start"><CheckIcon className="w-6 h-6 text-green-500 mr-3 flex-shrink-0" /><span>Watermark on output</span></li>
                                    <li className="flex items-start"><CheckIcon className="w-6 h-6 text-green-500 mr-3 flex-shrink-0" /><span>Max 2000x2000px resolution</span></li>
                                </ul>
                                <button onClick={navigateToEditor} className="mt-8 w-full bg-gray-100 text-gray-800 py-3 rounded-md font-semibold hover:bg-gray-200">Get Started</button>
                            </div>

                            {/* Premium Plan */}
                            <div className="border-2 border-indigo-600 rounded-2xl p-8 flex flex-col relative">
                                 <div className="absolute top-0 -translate-y-1/2 bg-indigo-600 text-white px-3 py-1 text-sm font-semibold rounded-full">MOST POPULAR</div>
                                <h4 className="text-2xl font-bold text-gray-900">Premium</h4>
                                <p className="mt-2 text-indigo-600">For growing businesses</p>
                                <div className="mt-6">
                                    <span className="text-5xl font-extrabold">$19.99</span>
                                    <span className="text-xl font-medium text-gray-500">/mo</span>
                                </div>
                                <ul className="mt-8 space-y-4">
                                    <li className="flex items-start"><CheckIcon className="w-6 h-6 text-green-500 mr-3 flex-shrink-0" /><span><span className="font-bold">200 images</span>/month</span></li>
                                    <li className="flex items-start"><CheckIcon className="w-6 h-6 text-green-500 mr-3 flex-shrink-0" /><span>All features unlocked</span></li>
                                    <li className="flex items-start"><CheckIcon className="w-6 h-6 text-green-500 mr-3 flex-shrink-0" /><span>No watermarks</span></li>
                                    <li className="flex items-start"><CheckIcon className="w-6 h-6 text-green-500 mr-3 flex-shrink-0" /><span>Batch processing (50 images)</span></li>
                                    <li className="flex items-start"><CheckIcon className="w-6 h-6 text-green-500 mr-3 flex-shrink-0" /><span>4000x4000px resolution</span></li>
                                </ul>
                                 <button className="mt-8 w-full bg-indigo-600 text-white py-3 rounded-md font-semibold hover:bg-indigo-700">Upgrade Now</button>
                            </div>
                        </div>
                    </div>
                </div>


                {/* FAQ Section */}
                <div className="bg-gray-50 py-20 sm:py-24">
                    <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
                        <div className="text-center">
                            <h3 className="text-3xl font-extrabold text-gray-900">Frequently Asked Questions</h3>
                        </div>
                        <div className="mt-12 space-y-8">
                            {faqs.map((faq, index) => (
                                <div key={index} className="bg-white p-6 rounded-lg shadow-sm">
                                    <h4 className="text-lg font-semibold text-gray-900">{faq.q}</h4>
                                    <p className="mt-2 text-gray-600">{faq.a}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

            </main>

            <footer className="bg-white border-t border-gray-200">
                <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8 text-center text-sm text-gray-500">
                    <p>&copy; {new Date().getFullYear()} ProductStudio AI. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};