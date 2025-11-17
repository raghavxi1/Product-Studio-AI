import React, { useState } from 'react';
import { HomePage } from './HomePage';
import { EditorPage } from './EditorPage';

export default function App() {
    const [page, setPage] = useState<'home' | 'editor'>('home');

    const navigateToEditor = () => setPage('editor');
    const navigateToHome = () => setPage('home');

    if (page === 'editor') {
        return <EditorPage navigateToHome={navigateToHome} />;
    }

    return <HomePage navigateToEditor={navigateToEditor} />;
}
