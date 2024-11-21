import React from 'react';
//import Navbar from './components/NavBar';
import './App.css';
import Home from './components/home';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Terms from './components/terms';
import Login from './components/Login';
import DashBoard from './components/dashBoard'
import UserGuide from './components/user-guide';
import AccountSettings from './components/account-settings';
import ForgotPassword from './components/password/reset';
import QuickStatement from './components/quick-statement';
import SignUp from './components/auth-check';
import Contact from './components/contact';
import Bonding from './components/bonding-form';
import Eligibility from './components/eligibility';
import BondingMessage from './components/message';
import Axio from './components/Axio';
import MyBonding from './components/my-bonding';


function App() {
  return (
    <>
      <Router>
       
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path="/my-bonding" element={<MyBonding/>} />
          <Route path='/account-settings' element={<AccountSettings/>} />
          <Route path='/user-guide' element={<UserGuide/>} />
          <Route path='/dashBoard' element={<DashBoard />} />
          <Route path='/password/reset' element={<ForgotPassword />} />
          <Route path='/terms' element={<Terms/>} />
          <Route path='/Login' element={<Login />} />
          <Route path='/quick-statement' element={<QuickStatement />} />
          <Route path='/auth-check' element={<SignUp />} />
          <Route path='/bonding-form' element={<Bonding/>} />
          <Route path='/contact' element={<Contact/>} />
          <Route path='/eligibility' element={<Eligibility/>}/>
          <Route path='/message' element={<BondingMessage/>}/>
          <Route path='/Axio' element={<Axio/>}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;