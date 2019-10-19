import React, { useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import './App.css';

import Header from './components/header/header.component';
import SignedInUser from './components/signed-in-user/signed-in-user.component';

import AdminPage from './pages/admin-page/admin-page.component';
import HomePage from './pages/homepage/homepage.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import ContactPage from './pages/contact/contact.component';
import CheckoutPage from './pages/checkout/checkout.component';
import PageNotFound from './pages/page-not-found/page-not-found.component';
import ReduxFlowPage from './pages/redux-flow/redux-flow.component';

import { selectUserCurrentUser } from './redux/user/user.selectors';
import { checkUserSession } from './redux/user/user.actions';

import { ReactComponent as LogoWinter } from './assets/images/winter-resized.svg';


const App = ({ currentUser, checkUserSession }) => {
  useEffect(() => {
    checkUserSession();
  }, [checkUserSession]);
  
  return (
    <div>
      <Header />
      {
        currentUser ? <SignedInUser /> : null
      }
      <Switch>
        <Route exact path='/' component={ HomePage } />
        <Route path='/shop' component={ ShopPage }  />
        <Route exact path='/home' render={ () => <Redirect to='/' /> } />
        <Route exact path='/admin' component={ AdminPage } />
        <Route exact path='/redux' component={ ReduxFlowPage } />
        <Route exact path='/checkout' component={ CheckoutPage } />
        <Route exact path='/contact' component={ ContactPage } />
        <Route exact path='/signin' 
          render={ () => currentUser ? (<Redirect to='/' />) : (<SignInAndSignUpPage />) } 
        />
        <Route path='/external' 
          component={() => window.location = 'https://external.com/path'}
        />     
        <Route component={PageNotFound} />    
      </Switch>
      <div className='winter-beautiful'>
        <LogoWinter />
        <a href='https://css-tricks.com/using-svg/' target='_blank' rel='noopener noreferrer'>
          Winter is beautiful. <br />
          Regular anchor tags work great.
        </a>
      </div>
    </div>
  );
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectUserCurrentUser
});

const mapDispatchToProps = dispatch => ({
  checkUserSession: () => dispatch(checkUserSession())
})

export default connect(mapStateToProps, mapDispatchToProps)(App);
