import React from 'react';

import Params from './Params'

const SearchSection: React.FC = () => {
    return (
        <div id="searchSection">
            <input
                id="mainSearchBar"
                placeholder="Hledání"
            ></input>
            <Params />
        </div>
    );
}

export default SearchSection;