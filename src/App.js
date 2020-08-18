import React from 'react';
import { Route } from 'react-router-dom';

import Header from './components/header/entry-point';
import Footer from './components/footer/entry-point';

import Index from './components/index/entry-point';
import Bets from './components/bets/entry-point';
import Deposit from './components/deposit/entry-point';
import ProvablyFair from './components/provably-fair/entry-point';
import Support from './components/support/entry-point';
import ModalWindow from './components/modal-window/entry-point';
import Notification from './components/notification/entry-point';

const App = (props) => {
    return (
        <div id="wrapper">
            <Header user_data=''/>

            <div id="main">
                <Route exact path="/" render={ () => <Index/> } />
                <Route exact path="/modal/:name?" render={ () => <Index/> } />
                <Route path="/bets/:status?" render={ () => <Bets/> }/>
                <Route path="/deposit" render={ () => <Deposit/> }/>
                <Route path="/provably-fair" render={ () => <ProvablyFair/> }/>
                <Route path="/support" render={ () => <Support/> }/>
            </div>

            <ModalWindow/>
            <Notification/>
            <Footer/>
        </div>
    );
}

export default App;