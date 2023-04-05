import logo from './logo.svg';
import './App.css';

import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';
import Company from './components/pages/Company.js';
import Contact from './components/pages/Contact.js';
import NewProject from './components/pages/NewProject.js';
import Home from './components/pages/Home.js';
import Container from './components/layout/Container';
import NavBar from './components/layout/NavBar';
import Footer from './components/layout/Footer';
import Projects from './components/pages/Projects';

function App() {
  return (
    <Router>
      <NavBar />
      <Container customClass = "min_height">
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route exact path='/Projects' element={<Projects />} />
        <Route exact path='/Company' element={<Company />} />
        <Route exact path='/Contact' element={<Contact />} />
        <Route exact path='/Newproject' element={<NewProject />} />
      </Routes>
      </Container>
      <Footer />
    </Router>
    
  );
}

export default App;
