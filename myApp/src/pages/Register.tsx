import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonInput,
  IonButton,
  IonText,
  IonRouterLink,
} from "@ionic/react";
import { Link } from "react-router-dom";
import "./Home.css";
import { authStore } from "../stores/store";
import { toast } from "../toast";
import { registerUser, loginGoogle, loginFacebook } from "../firebaseConfig";

import Home from "./Home";
const Register: React.FC = () => {
  const username = authStore.useState((s) => s.username);
  const password = authStore.useState((s) => s.password);
  const loggedInUser = authStore.useState((s) => s.loggedInUser);

  function usernameInput(e: any) {
    authStore.update((s) => {
      s.username = e.target.value;
    });
  }
  function passwordInput(e: any) {
    authStore.update((s) => {
      s.password = e.target.value;
    });
  }
  async function register() {
    if (username.trim() == "" || password.trim() == "") {
      return toast("Username and password are required");
    }
    try {
      await registerUser(username, password);
    } catch (error: any) {
      toast(error.message, 4000);
    }
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Please Register Here</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonInput
          placeholder="Enter username"
          onIonChange={usernameInput}
        ></IonInput>
        <IonInput
          type="password"
          placeholder="Enter password"
          onIonChange={passwordInput}
        ></IonInput>
        <IonButton onClick={register}>Register</IonButton>
        <br /> <br />
        <IonText>Already have an account?</IonText>{" "}
        <IonRouterLink href="/">Login</IonRouterLink>
        <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br />
        <IonButton onClick={loginGoogle}>Login with Google</IonButton>
        <br />
        <IonButton onClick={loginFacebook}>Login with Facebook</IonButton>
      </IonContent>
    </IonPage>
  );
};

export default Register;
