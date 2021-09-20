import { Redirect, Route } from "react-router-dom";
import {
  IonApp,
  IonRouterOutlet,
  IonPage,
  IonLoading,
  IonContent,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Place from "./pages/Place";
import Menu from "./pages/Menu";
import Register from "./pages/Register";
import AddPlaceForm from "./pages/AddPlaceForm";
import { useEffect } from "react";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";

/* Global State */
import { authStore, appStore } from "./stores/store";

/* Firebase Auth */
import { onAuthStateChanged, getAuth } from "firebase/auth";

const App: React.FC = () => {
  const loggedInUser = authStore.useState((s) => s.loggedInUser);
  const loading = appStore.useState((s: any) => s.loading);
  const auth = getAuth();

  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log("loggedinUser", user.email);
      authStore.update((s: any) => {
        s.loggedInUser = user.email;
      });
      appStore.update((s: any) => {
        s.loading = false;
      });
    } else {
      appStore.update((s: any) => {
        s.loading = false;
      });
      console.log("no logged in User");
    }
  });

  if (loading) {
    return (
      <IonApp>
        <IonPage>
          <IonContent>
            <IonLoading isOpen={loading} />
          </IonContent>
        </IonPage>
      </IonApp>
    );
  }
  if (loggedInUser) {
    return (
      <IonApp>
        <IonReactRouter>
          <IonRouterOutlet>
            <Route path="/home" component={Home} exact />
            <Redirect from="/" to="/home" exact />
            <Redirect from="/register" to="/home" exact />
            <Route path="/places/:id" component={Place} exact />
            <Route path="/add-place" component={AddPlaceForm} exact />
            <Route path="/menu" component={Menu} exact />
            <Route render={() => <Redirect to="/home" />} />
          </IonRouterOutlet>
        </IonReactRouter>
      </IonApp>
    );
  } else {
    return (
      <IonApp>
        <IonReactRouter>
          <IonRouterOutlet>
            <Redirect from="/home" to="/" exact />
            <Redirect from="/places/:id" to="/" exact />

            <Route path="/" component={Login} exact />
            <Route path="/register" component={Register} exact />
            <Route render={() => <Redirect to="/" />} />
          </IonRouterOutlet>
        </IonReactRouter>
      </IonApp>
    );
  }
};

export default App;
