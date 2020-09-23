import React, { useState, useMemo } from 'react';

// import module
import PageHeader from './PageHeader'
import MainContent from './MainContent'
import Footer from './Footer'

// styles
import '../styles/styles.scss'
import 'bootstrap/dist/css/bootstrap.min.css';

// import context
import ModalContext from './ModalContext';


function App() {
  const [ modal, setModal ] = useState<boolean>(false);
  const providerValue = useMemo(() => ({ modal, setModal }), [ modal, setModal ]);

  return (
    <div>
      <ModalContext.Provider value={providerValue}>
        <PageHeader />
        <MainContent />
      </ModalContext.Provider>
      <Footer />
    </div>
  );
}

export default App;
