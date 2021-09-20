import {
  IonBackButton,
  IonButton,
  IonContent,
  IonHeader,
  IonLoading,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import axios from "axios";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import "../theme/Place.css";
import { addTestData2 } from "../firebaseConfig";
import { placeStore } from "../stores/store";

const Place: React.FC = () => {
  const places = placeStore.useState((s) => s.places);
  useEffect(() => {
    addTestData2().then((data) => {
      console.log("DATAAA", data);
      placeStore.update((s: any) => {
        s.places = data;
      });
      return;
    });
  }, []);
  //require the id coming from the URL
  const params: any = useParams();
  const id = params.id;

  if (places.length === 0) {
    return <IonLoading isOpen={true} />;
  }
  const { hours, name, website_url, address, logo_url } = places.filter(
    (place: any) => place.id === id
  )[0];

  const hoursArr = [];
  //reformat the hours data

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButton key={id} color="black" slot="start">
            <IonBackButton defaultHref="/home"></IonBackButton>
          </IonButton>
          <IonTitle>Place Info</IonTitle>
        </IonToolbar>
      </IonHeader>
      {/* <IonLoading message="please wait" duration={1000} isOpen={busy} /> */}
      <IonContent>
        <div className="header">
          <div className="place">
            <img
              src={logo_url}
              onError={(e: any) => {
                e.target.onerror = null;
                e.target.src = "/images/noimage.png";
              }}
              alt="resource not found"
            />
            <ul>
              <li>Busniess Name: {name} </li>
              <li>Address: {address} </li>
              <li>Website: {website_url} </li>
              <li>Hours: {hours}</li>
            </ul>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Place;
