import React from 'react';
import ap from'./App.module.css';
import { HashRouter, Route } from 'react-router-dom';
import { connect, Provider } from 'react-redux';
import { startDispatch } from './redux/app-reducer';
import preloader from './img/preloader.gif'
import store from './redux/redux-store';
import TicketsContainer from './Component/Tickets/TicketsContainer';

class App extends React.Component {

  componentDidMount() {
    this.props.startDispatch();
  }
 
  render() {
    if (!this.props.initialize) {
      return <div> <img src={preloader} className={ap.preloader} /> </div>
    } 
    return (

             <Route path='' render={() => {
          return <React.Suspense fallback={<div>Загрузка...</div>}>
                <TicketsContainer />
          </React.Suspense>
        }} />
    );
  }
}

const mapStateToProps = (state) => ({
  initialize: state.app.initialize
})

const AppContainer = connect(mapStateToProps, {startDispatch})(App);

let Avia = (props) => {
  return <HashRouter basename={process.env.PUBLIC_URL} >
    <React.StrictMode>
      <Provider store={store}>
        <AppContainer />
      </Provider>
    </React.StrictMode>
  </HashRouter>
}

export default Avia;