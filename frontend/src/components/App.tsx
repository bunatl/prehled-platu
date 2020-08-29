import React from 'react';

// import module
import PageHeader from './PageHeader'
import MainContent from './MainContent'
import Footer from './Footer'

// styles
import '../styles/styles.scss'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div>
      <PageHeader />
      <MainContent />
      <Footer />
    </div>
  );
}

export default App;
