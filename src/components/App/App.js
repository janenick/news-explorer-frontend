import React from 'react';
import {
  Route, Switch, useLocation,
} from 'react-router-dom';

import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';

import './App.css';
import allNews from '../../utils/allNews';

function App() {
  const [loggedIn, setLoggedIn] = React.useState(false);
  //const { pathname } = useLocation();
const pathname = '/saved-news';
// const pathname = '/';

  return (
     <>
    <div className='page'>
      <Header
        loggedIn={loggedIn}
        linkPath={'#'}
        pathname={pathname}
      />
      <Switch>
        <Route exact path='/'>
          <Main
            pathname={pathname}
            allNews={allNews}
          />
        </Route>
        </Switch>
      <Footer />
      </div>
       </>
  );
}

export default App;
