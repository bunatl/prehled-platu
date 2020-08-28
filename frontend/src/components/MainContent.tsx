import React from 'react';

import Params from './Params'
import SalaryEntry from './SalaryEntry'

const MainContent: React.FC = () => {
    return (
        <main>
            <input
                id="mainSearchBar"
                placeholder="Hledání"
            ></input>
            <Params />

            <SalaryEntry />
        </main>
    );
}

export default MainContent;
