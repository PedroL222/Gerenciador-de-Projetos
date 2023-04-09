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
import Project from './components/pages/Project';

function App() {
  return (
    <Router>
      <NavBar />
      <Container customClass = "min_height">
      <Routes>
        <Route exact path='/' element={<Home />} />
        <Route path='/Projects' element={<Projects />} />
        <Route path='/Company' element={<Company />} />
        <Route path='/Contact' element={<Contact />} />
        <Route path='/Newproject' element={<NewProject />} />
        <Route path="/Project/:id" element={<Project />} />
      </Routes>
      </Container>
      <Footer />
    </Router>
    
  );
}

export default App;
