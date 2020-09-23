import React, { useContext } from 'react';

import NewSalaryEntry from './NewSalaryEntry'

import ModalContext from './ModalContext';

const PageHeader: React.FC = () => {
    const { setModal } = useContext(ModalContext);

    return (
        <header>
            <nav>
                <div>Logo</div>
                <div>
                    <div>Domu</div>
                    <div>Link</div>
                    <div onClick={() => setModal(true)}>Přidej záznam</div>
                </div>
                <NewSalaryEntry />
            </nav>
            <h1>Přehled platů</h1>
        </header>
    );
}

export default PageHeader;
