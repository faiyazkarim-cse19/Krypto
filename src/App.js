import React, { useState } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import { Layout, Typography, Space } from 'antd';
import { Register } from './components/Register/Register.jsx';
import { Login } from './components/Login/Login.jsx';

import { Exchanges, Homepage, News, Cryptocurrencies, CryptoDetails, Navbar } from './components';
import './App.css';

const App = () => { 

  const [currentForm, setCurrentForm] = useState('login');
  const [ logstate, setLogstate ] = useState('no');

  const toggleForm = (formName) => {
    setCurrentForm(formName);
  }

  const toggleLogstate = (state) => {
    setLogstate(state);
  }

return (
  <div>
  { logstate == 'yes' ?
  <div className="app">
    <div className="navbar">
      <Navbar />
    </div>
    <div className="main">
      <Layout>
        <div className="routes">
          <Switch>
            <Route exact path="/">
              <Homepage />
            </Route>
            <Route exact path="/exchanges">
              <Exchanges />
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
            Cryptoverse Inc.
          </Link> <br />
          All Rights Reserved.
        </Typography.Title>
        <Space>
          <Link to="/">Home</Link>
          <Link to="/exchanges">Exchanges</Link>
          <Link to="/news">News</Link>
        </Space>
      </div>
    </div>
  </div>
        : (
          currentForm == 'login' ? 
          <Login onFormSwitch={toggleForm} onRouteChange={toggleLogstate}/> :
          <Register onFormSwitch={toggleForm} onRouteChange={toggleLogstate}/>
        )
      }
</div>
);
}

export default App;
