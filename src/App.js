import React from 'react';
import { Route } from 'react-router-dom';

import Header from './components/header/entry-point';
import Footer from './components/footer/entry-point';

import Index from './components/index/entry-point';
import CaseOpening from './components/case-opening/entry-point';
import Double from './components/double/entry-point';
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
                <Route path="/case/:casename?" render={ () => <CaseOpening/> }/>
                <Route path="/double" render={ () => <Double/> } />
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
