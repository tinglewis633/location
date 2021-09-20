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
  IonIcon,
  IonLabel,
} from "@ionic/react";
import "./Home.css";
import { authStore, placeStore } from "../stores/store";
import { getAuth } from "firebase/auth";
import React, { useEffect } from "react";
import axios from "axios";
import PlaceList from "../components/PlaceList";

const Menu: React.FC = () => {
  // use geo api to add lat lng to places data and set it to a new state called GeoedPlaces

  //conditional rendering

  return (
    <IonPage>
      <IonMenu side="start" content-id="main-content">
        <IonHeader>
          <IonToolbar>
            <IonTitle>Menu</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent>
          <IonList>
            <IonItem>
              <IonIcon name="mail" slot="start"></IonIcon>
              <IonLabel>Inbox</IonLabel>
            </IonItem>
            <IonItem>
              <IonIcon name="paper-plane" slot="start"></IonIcon>
              <IonLabel>Outbox</IonLabel>
            </IonItem>
            <IonItem>
              <IonIcon name="heart" slot="start"></IonIcon>
              <IonLabel>Favorites</IonLabel>
            </IonItem>
            <IonItem>
              <IonIcon name="archive" slot="start"></IonIcon>
              <IonLabel>Archived</IonLabel>
            </IonItem>
            <IonItem>
              <IonIcon name="trash" slot="start"></IonIcon>
              <IonLabel>Trash</IonLabel>
            </IonItem>
            <IonItem>
              <IonIcon name="warning" slot="start"></IonIcon>
              <IonLabel>Spam</IonLabel>
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
            <IonTitle>Inbox</IonTitle>
          </IonToolbar>
        </IonHeader>
      </div>
    </IonPage>
  );
};

export default Menu;
