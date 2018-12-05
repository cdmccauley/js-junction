import React, { Component } from 'react';
import './App.css';

// dev firebase import
import firebase from 'firebase';

// TODO: prod firebase import
// import firebase from 'firebase';
// import 'firebase/PACKAGE';

// firebase config declaration
let firebaseConfig = {
  apiKey: 'AIzaSyDc-6kYnf2feWrzCRTQ6vDIfkC22qjdfUo',
  authDomain: 'js-junction.firebaseapp.com',
  databaseURL: 'https://js-junction.firebaseio.com',
  projectId: 'js-junction',
  storageBucket: 'js-junction.appspot.com',
  messagingSenderId: '646306703866',
};

// firebase init
firebase.initializeApp(firebaseConfig);

// TODO: read more on https://firebase.google.com/docs/auth/web/email-link-auth for gotchas
class App extends Component {

  constructor() {
    super();

    this.state = {
      
    };

    this.txtInput = React.createRef();

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    // check if url is a login request
    if (firebase.auth().isSignInWithEmailLink(window.location.href)) {
      // get stored email if present
      let email = window.localStorage.getItem('emailForSignIn');
      if (!email) {
        // prompt for email if storage returned falsy
        email = window.prompt('Please provide your email for confirmation.');
      }
      // send login request to firebase
      firebase.auth().signInWithEmailLink(email, window.location.href).then((result) => {
        // remove email from storage
        window.localStorage.removeItem('emailForSignIn');
        // log user
        console.log(result.user);
      })
      .catch((err) => { console.log(err) });
    }
  }

  /*
  email link format:
  http://localhost:3000/
  ?apiKey=AIzaSyDc-6kYnf2feWrzCRTQ6vDIfkC22qjdfUo
  &oobCode=qBMj0p_pH1jXuNOUUa5NGzZDbjCZKwS2WYA2mPC4wlcAAAFne2jQUQ
  &mode=signIn
  &lang=en
  */
  handleSubmit(e) {
    // prevent reload
    e.preventDefault();
    // log ref val
    console.log(this.txtInput.current.value);
    // declarations for firebase.auth
    let actionCodeSettings = {
      url: 'http://localhost:3000',
      handleCodeInApp: true,
    }
    let email = 'cdmccauley@gmail.com';
    // send email with link
    firebase.auth().sendSignInLinkToEmail(email, actionCodeSettings)
    .then(() => { window.localStorage.setItem('emailForSignIn', email) })
    .catch((err) => { console.log(err.code) });
  }

  render() {
    return (
      <React.Fragment>
        <form onSubmit={ this.handleSubmit }>
          <input type='text' ref={ this.txtInput }></input>
          <input type='submit' value='login' />
        </form>
      </React.Fragment>
    );
  }
}

export default App;
