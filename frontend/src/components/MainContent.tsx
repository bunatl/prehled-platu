import React from 'react';

import Params from './Params'

const MainContent: React.FC = () => {
    return (
        <main>
            <input
                id="mainSearchBar"
                placeholder="Hledání"
            ></input>
            <Params />
        </main>
    );
}

export default MainContent;
