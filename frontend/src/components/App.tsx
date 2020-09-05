import React, { useState } from 'react';

// import module
import PageHeader from './PageHeader'
import MainContent from './MainContent'
import Footer from './Footer'

// styles
import '../styles/styles.scss'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [ update, setUpdate ] = useState<boolean>(false);
  return (
    <div>
      <PageHeader updateEntries={() => setUpdate(!update)} />
      <MainContent fetchDatabase={update} />
      <Footer />
    </div>
  );
}

export default App;
