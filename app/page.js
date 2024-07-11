'use client'

import Image from "next/image";
import styles from "./page.module.css";
import { useEffect, useState } from "react";
import { app } from '../firebase/firebase'
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, updateProfile } from 'firebase/auth'
const auth = getAuth(app);

export default function Home() {
  const [loginDetails, setLoginDetails] = useState({
    email: "",
    password: '',
  })
  const [registerDetails, setRegisterDetails] = useState({
    fullName: '',
    email: "",
    password: '',
  })


  const signUpSwipeClickHandler = () => {
    const userForms = document.getElementById('user_options-forms')

    userForms.classList.remove('bounceRight')
    userForms.classList.add('bounceLeft')
  }
  const loginSwipeClickHandler = () => {
    const userForms = document.getElementById('user_options-forms')

    userForms.classList.remove('bounceLeft')
    userForms.classList.add('bounceRight')
  }

  const onLoginSubmit = (e) => {
    e.preventDefault()

    const email = loginDetails.email;
    const password = loginDetails.password;

    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      setLoginDetails({ email:"",password:''})

      console.log(user)
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;

      console.log(errorCode,errorMessage)
    });
   
  }

  const onRegisterSubmit = (e) => {
    e.preventDefault()
    console.log(registerDetails)
    const email = registerDetails.email;
    const password = registerDetails.password;
    const fullName = registerDetails.fullName;

    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed up 
      const user = userCredential.user;
      updateProfile(auth.currentUser, {
        displayName: fullName,
      }).then((user) => {

        setRegisterDetails({fullName:"", email:"",password:''})
      }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
  
        console.log(errorCode, errorMessage)
      });
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;

      console.log(errorCode, errorMessage)
      // ..
    });
  }


  return (
    <>
      <section className="user">
        <div className="user_options-container">
          <div className="user_options-text">
            <div className="user_options-unregistered">
              <h2 className="user_unregistered-title">Don't have an account?</h2>
              <p className="user_unregistered-text">Banjo tote bag bicycle rights, High Life sartorial cray craft beer whatever street art fap.</p>
              <button className="user_unregistered-signup" onClick={signUpSwipeClickHandler} id="signup-button">Sign up</button>
            </div>

            <div className="user_options-registered">
              <h2 className="user_registered-title">Have an account?</h2>
              <p className="user_registered-text">Banjo tote bag bicycle rights, High Life sartorial cray craft beer whatever street art fap.</p>
              <button className="user_registered-login" onClick={loginSwipeClickHandler} id="login-button">Login</button>
            </div>
          </div>

          <div className="user_options-forms" id="user_options-forms">
            <div className="user_forms-login">
              <h2 className="forms_title">Login</h2>
              <form className="forms_form" onSubmit={onLoginSubmit}>
                <fieldset className="forms_fieldset">
                  <div className="forms_field">
                    <input type="email" onChange={(e) => setLoginDetails({ ...loginDetails, email: e.target.value })} value={loginDetails.email} placeholder="Email" className="forms_field-input" required autofocus />
                  </div>
                  <div className="forms_field">
                    <input type="password" onChange={(e) => setLoginDetails({ ...loginDetails, password: e.target.value })} value={loginDetails.password} placeholder="Password" className="forms_field-input" required />
                  </div>
                </fieldset>
                <div className="forms_buttons">
                  <button type="button" className="forms_buttons-forgot">Forgot password?</button>
                  <input type="submit" value="Log In" className="forms_buttons-action" />
                </div>
              </form>
            </div>
            <div className="user_forms-signup">
              <h2 className="forms_title">Sign Up</h2>
              <form className="forms_form" onSubmit={onRegisterSubmit}>
                <fieldset className="forms_fieldset">
                  <div className="forms_field">
                    <input onChange={(e) => setRegisterDetails({ ...registerDetails, fullName: e.target.value })} value={registerDetails.fullName} type="text" placeholder="Full Name" className="forms_field-input" required />
                  </div>
                  <div className="forms_field">
                    <input onChange={(e) => setRegisterDetails({ ...registerDetails, email: e.target.value })} value={registerDetails.email} type="email" placeholder="Email" className="forms_field-input" required />
                  </div>
                  <div className="forms_field">
                    <input onChange={(e) => setRegisterDetails({ ...registerDetails, password: e.target.value })} value={registerDetails.password} type="password" placeholder="Password" className="forms_field-input" required />
                  </div>
                </fieldset>
                <div className="forms_buttons">
                  <input type="submit" value="Sign up" className="forms_buttons-action" />
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>


  );
}
