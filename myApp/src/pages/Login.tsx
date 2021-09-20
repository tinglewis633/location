import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonInput,
  IonButton,
  IonLoading,
  IonRouterLink,
  IonText,
} from "@ionic/react";
import { Link } from "react-router-dom";
import "./Home.css";
import { authStore } from "../stores/store";
import { loginUser, loginGoogle, loginFacebook } from "../firebaseConfig";
import { toast } from "../toast";
import Home from "./Home";
const Login: React.FC = () => {
  const username = authStore.useState((s) => s.username);
  const password = authStore.useState((s) => s.password);
  const loggedInUser = authStore.useState((s) => s.loggedInUser);

  function usernameInput(e: any) {
    authStore.update((s) => {
      s.username = e.target.value;
    });
  }

  async function login() {
    //question for andrew about pullstate

    const res = await loginUser(username, password);

    if (res === null) {
      toast("error logging with your credentials");
    } else {
      toast("Youu have logged in!");
    }
  }

  function passwordInput(e: any) {
    authStore.update((s) => {
      s.password = e.target.value;
    });
  }
  if (loggedInUser) {
    return <Home />;
  } else {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonTitle>Please Login Here</IonTitle>
          </IonToolbar>
        </IonHeader>
        {/* <IonLoading message="please wait" duration={1000} isOpen={busy} /> */}
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
          <IonButton onClick={login}>Login</IonButton>
          <br /> <br />
          <IonText>New?, Register Here</IonText>{" "}
          <IonRouterLink href="/register">Register</IonRouterLink>
          <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br />
          <IonButton onClick={loginGoogle}>Login with Google</IonButton>
          <br />
          <IonButton onClick={loginFacebook}>Login with Facebook</IonButton>
        </IonContent>
      </IonPage>
    );
  }
};

export default Login;
