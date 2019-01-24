import React, { Component } from 'react';
import './App.css';

import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';

// dev firebase import
import firebase from 'firebase';

// TODO: prod firebase import
// import firebase from 'firebase';
// import 'firebase/PACKAGE';

// firebase declarations
let firebaseAppConfig = {
  apiKey: 'AIzaSyDc-6kYnf2feWrzCRTQ6vDIfkC22qjdfUo',
  authDomain: 'js-junction.firebaseapp.com',
  databaseURL: 'https://js-junction.firebaseio.com',
  projectId: 'js-junction',
  storageBucket: 'js-junction.appspot.com',
  messagingSenderId: '646306703866',
};
let firebaseDbConfig = {
  timestampsInSnapshots: true,
}
let firebaseDb;

// firebase init
firebase.initializeApp(firebaseAppConfig);
firebaseDb = firebase.firestore();
firebaseDb.settings(firebaseDbConfig);

const Home = () => {
  return (
    <React.Fragment>
      <p>Home</p>
      <Link to='/host'>Host</Link>
      <Link to='/client'>Join</Link>
    </React.Fragment>
  );
}

const Host = () => {
  return (
  <React.Fragment>
    <p>Host</p>
  </React.Fragment>
  );
}

const Client = () => {
  return (
    <React.Fragment>
      <p>Join</p>
    </React.Fragment>
  )
}

class App extends Component {

  constructor() {
    super();

    this.state = {
      user: null,
      uid: null,
      userDocs: null,
    };
  }

  componentWillMount() {
    
  }

  componentDidMount() {
    // setup auth observer
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        firebaseDb.collection(user.uid).doc('profile').set({ lastAuth: new Date()}).catch((err) => console.log(err));
        this.setState((state, props) => {
          return {
            user: user,
            uid: user.uid,
          };
        });
      } else {
        // ??
      };
      console.log('this.state.user:\n', this.state.user);
      /////////////////////////////////////////////////////////////////
      // firebaseDb.collection(`${ user.uid }`).get().then((querySnapshot) => {
      //   this.setState((state, props) => { 
      //     return { 
      //       userDocs: querySnapshot
      //     };
      //   }, () => console.log(this.state.userDocs));
      // });
      ////////////////////////////////////////////////////////////////
    });
    // preset auth persistence to local
    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL).catch((err) => console.log(err));
    // login user anonymously
    firebase.auth().signInAnonymously().catch((err) => console.log(err));
  }

  render() {
    return (
      <React.Fragment>
        <p>js-junction</p>
        <BrowserRouter>
          <Switch>
            <Route exact path='/' component={ Home } />
            <Route path='/host' component={ Host } />
            <Route path='/client' component={ Client } />
          </Switch>
        </BrowserRouter>
      </React.Fragment>
    );
  }
}

export default App;
