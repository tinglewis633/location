import {
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
  IonButton,
  IonLoading,
  IonMenu,
  IonList,
  IonItem,
  IonMenuButton,
  IonLabel,
  IonModal,
} from "@ionic/react";
import "./Home.css";
import { authStore, placeStore, appStore } from "../stores/store";
import { getAuth } from "firebase/auth";
import React, { useEffect } from "react";
import axios from "axios";
import PlaceList from "../components/PlaceList";

import { addTestData2 } from "../firebaseConfig";
const Home: React.FC = () => {
  const places: any = placeStore.useState((s) => s.places);

  const loggedInUser = authStore.useState((s) => s.loggedInUser);
  const auth = getAuth();
  const logout = async () => {
    await auth.signOut();
    authStore.update((s: any) => {
      s.loggedInUser = null;
    });
    window.location.href = "/";
  };
  useEffect(() => {
    addTestData2().then((data) => {
      console.log("DATAAA", data);
      placeStore.update((s: any) => {
        s.places = data;
      });
      return;
    });
  }, []);

  const popUp = () => {
    console.log("HIIII");
  };

  // use geo api to add lat lng to places data and set it to a new state called GeoedPlaces

  //conditional rendering
  if (!places) {
    return <IonLoading isOpen={true}></IonLoading>;
  } else {
    return (
      <IonPage>
        <IonMenu side="start" content-id="main-content">
          <IonHeader>
            <IonToolbar>
              <IonTitle className="ion-padding">
                Welcome,{<br />} {loggedInUser} <br />
              </IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            <IonList>
              <IonItem href="/home">
                <IonLabel>Home</IonLabel>
              </IonItem>
              <IonItem>
                <IonLabel>Profile</IonLabel>
              </IonItem>
              <IonItem>
                <IonLabel>Settings</IonLabel>
              </IonItem>
              <IonItem>
                <IonButton onClick={logout}>logout</IonButton>
              </IonItem>
            </IonList>
          </IonContent>
        </IonMenu>

        <div className="ion-page" id="main-content">
          <IonHeader>
            <IonToolbar>
              <IonButton slot="start">
                <IonMenuButton></IonMenuButton>
              </IonButton>
              <IonButton href="/add-place" slot="end">
                Add Place
              </IonButton>
              <IonTitle>Home</IonTitle>
            </IonToolbar>
          </IonHeader>

          <IonContent>
            <div className="main">
              <PlaceList />
            </div>
          </IonContent>
        </div>
      </IonPage>
    );
  }
};

export default Home;
