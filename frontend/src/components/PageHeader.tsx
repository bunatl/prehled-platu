import React, { useState } from 'react';

import NewSalaryEntry from './NewSalaryEntry'

interface IPageHeader {
    updateEntries: () => void
}

const PageHeader: React.FC<IPageHeader> = ({ updateEntries }) => {
    const [ modal, setModal ] = useState<boolean>(false);

    return (
        <header>
            <nav>
                <div>Logo</div>
                <div>
                    <div>Domu</div>
                    <div>Link</div>
                    <div onClick={() => setModal(true)}>Přidej záznam</div>
                </div>
                <NewSalaryEntry navBool={modal} entryInserted={() => updateEntries()} closeModal={() => setModal(false)} />
            </nav>
            <h1>Přehled platů</h1>
        </header>
    );
}

export default PageHeader;
