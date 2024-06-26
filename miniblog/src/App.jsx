import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import './App.css'

//pages
import Home from './pages/Home/Home';
import About from './pages/About/About';
import Navbar from './components/navbar/Navbar';
import Footer from './components/footer/Footer';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';


function App() {

  return (
    <>
      <BrowserRouter>
        <Navbar />
        <div className="container">
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/about' element={<About />} />
            <Route path='/login' element={<Login />} />
            <Route path='/register' element={<Register />} />
          </Routes>
        </div>
        <Footer />
      </BrowserRouter>
    </>
  );
};

export default App;
