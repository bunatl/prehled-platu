import React from 'react';

import SearchSection from './SearchSection'
import SalaryEntry from './SalaryEntry'

const MainContent: React.FC = () => {
    return (
        <main>
            <SearchSection />
            <SalaryEntry />
        </main>
    );
}

export default MainContent;
