import React from 'react';
/* import {
  Route, Switch, useLocation,
} from 'react-router-dom';
*/

import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';

/* import '../../vendor/normalize.css';
import '../../vendor/fonts/fonts.css';
import './App.css';
*/

function App() {
  const [loggedIn, setLoggedIn] = React.useState(false);

  return (
    <div className="page">
      <Header
        loggedIn={loggedIn}
        linkPath={'#'}
      />
      <Main />
      <Footer />
    </div>
  );
}

export default App;
