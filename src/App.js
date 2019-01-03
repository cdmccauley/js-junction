import React, { Component } from 'react';
import './App.css';

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

class App extends Component {

  constructor() {
    super();

    this.state = {
      user: null,
      uid: null,
      userDocs: null,
    };
  }

  componentDidMount() {
    // setup auth observer
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        firebaseDb.collection(`${user.uid}`).add({ seen: new Date()}).catch((err) => console.log(err));
        //firebaseDb.collection('users').add({ uid: user.uid }).then((docRef) => console.log('document written with id: ', docRef.id)).catch((err) => console.log(err));
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
      firebaseDb.collection('users').get().then((querySnapshot) => {
        this.setState((state, props) => { 
          return { 
            userDocs: querySnapshot.docs
          };
        }, () => console.log(this.state.userDocs));
      });
      ////////////////////////////////////////////////////////////////
    });
    // login user anonymously
    firebase.auth().signInAnonymously().catch((err) => console.log(err));
  }

  render() {
    return (
      <React.Fragment>
        <p>{ this.state.uid }</p>
      </React.Fragment>
    );
  }
}

export default App;
