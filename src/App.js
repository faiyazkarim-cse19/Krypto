import React, { useState } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import { Layout, Typography, Space } from 'antd';
import { Register } from './components/Register/Register.jsx';
import { Login } from './components/Login/Login.jsx';
import profile from './images/profile.jpg';


import { Exchanges, Homepage, News, Cryptocurrencies, CryptoDetails, Navbar } from './components';
import './App.css';
import { BankFilled } from '@ant-design/icons';

const App = () => { 

  const [currentForm, setCurrentForm] = useState('login');
  const [logstate, setLogstate] = useState('yes');
  const [buttontext, setbtext] = useState('Login');
  const [username, setName] = useState('');
  const [email, setemail] = useState('');


  const changeBtext = (bname) => {
    setbtext(bname);
  }

  const toggleForm = (formName) => {
    setCurrentForm(formName);
  }

  const toggleLogstate = (state) => {
    setLogstate(state);
  }

return (
  <div>
  
  { (logstate === 'yes')?
  <div className="app">
    <div className="navbar">
      <Navbar onButtonName={buttontext} />
    </div>
    <div className="main">
      <Layout>
      {(buttontext == 'Logout') ?  
      <div className='ProfileIcon'>
        <img src={profile} alt="Profile" width="50" height="50"/>
        <h1>{username}</h1>
      </div> : console.log(2)
      }
      <button className='LLBtn' type='submit' onClick={()=>{ if(buttontext === 'Login') 
      {toggleLogstate('no'); 
      toggleForm('login');
      buttontext = changeBtext('Logout');
      }  
      else
      {
      buttontext = changeBtext('Login');
      toggleLogstate('yes');
      }}}>{buttontext}</button>
        <div className="routes">
          <Switch>
            <Route exact path="/">
              <Homepage />
            </Route>
            <Route exact path="/exchanges">
              <Exchanges email={email}/>
            </Route>
            <Route exact path="/cryptocurrencies">
              <Cryptocurrencies />
            </Route>
            <Route exact path="/crypto/:coinId">
              <CryptoDetails />
            </Route>
            <Route exact path="/news">
              <News />
            </Route>
          </Switch>
        </div>
      </Layout>
      <div className="footer">
        <Typography.Title level={5} style={{ color: 'white', textAlign: 'center' }}>Copyright © 2021
          <Link to="/">
            Krypto.
          </Link> <br />
          All Rights Reserved.
        </Typography.Title>
        <Space>
          <Link to="/">Home</Link>
          {(buttontext === 'Logout') ?
          <Link to="/exchanges">Exchanges</Link>
          : console.log(1)
          }
          <Link to="/news">News</Link>
        </Space>
      </div>
    </div>
  </div>
        : (
          currentForm === 'login' ? 
          <Login onFormSwitch={toggleForm} onRouteChange={toggleLogstate} onNameSet={setName} onemail={setemail}/> :
          <Register onFormSwitch={toggleForm} onRouteChange={toggleLogstate}/>
          )
      }
</div>
);
}

export default App;
