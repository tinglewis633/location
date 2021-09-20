import {
  IonButton,
  IonCard,
  IonCardHeader,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonLoading,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
  IonBackButton,
} from "@ionic/react";
import "./Home.css";

import { addPlaceFormStore, placeStore } from "../stores/store";
import { getAuth } from "firebase/auth";
import React, { useEffect } from "react";
import PlaceList from "../components/PlaceList";
import "../theme/AddPlaceForm.css";
import { useParams } from "react-router-dom";
import { editPlaceData } from "../firebaseConfig";
import { addTestData2 } from "../firebaseConfig";
const AddPlaceForm: React.FC = () => {
  const formDoc = addPlaceFormStore.useState((s) => s.formDoc);
  const places: any = placeStore.useState((s) => s.places);
  const updateFormDoc = (value: any, field: any) => {
    addPlaceFormStore.update((s: any) => {
      s.formDoc = { ...s.formDoc, [field]: value };
    });
  };

  //require the id coming from the URL
  const params: any = useParams();
  const id = params.id;
  useEffect(() => {
    addTestData2().then((data) => {
      console.log("DATAAAAAAA", data);
      placeStore.update((s: any) => {
        s.places = data;
      });

      addPlaceFormStore.update((s: any) => {
        const { hours, name, website_url, address, logo_url } = data.filter(
          (place: any) => place.id === id
        )[0];
        s.formDoc = { hours, name, website_url, address, logo_url };
      });
      return;
    });
  }, []);
  console.log("PLACESSS", places);

  function submitForm() {
    editPlaceData(formDoc, id);
  }
  if (places.length === 0) {
    return <IonLoading isOpen={true}></IonLoading>;
  } else {
    console.log("FORMDOC", formDoc);
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButton color="black" slot="start">
              <IonBackButton defaultHref="/home"></IonBackButton>
            </IonButton>
            <IonTitle>Please edit place info</IonTitle>
          </IonToolbar>
        </IonHeader>
        <br />
        <IonContent className="form">
          <IonText className="ion-padding">Name: </IonText>
          <br />
          <br />
          <IonItem>
            <IonInput
              onIonChange={(e: any) => updateFormDoc(e.target.value, "name")}
              className="form"
              placeholder="Enter place name"
              value={formDoc.name}
            ></IonInput>
          </IonItem>
          <br />
          <IonText className="ion-padding">Address:</IonText>
          <br /> <br />
          <IonItem>
            <IonInput
              className="form"
              placeholder="Enter place address"
              onIonChange={(e: any) => updateFormDoc(e.target.value, "address")}
              value={formDoc.address}
            ></IonInput>
          </IonItem>
          <br />
          <IonText className="ion-padding">Website URL:</IonText>
          <br /> <br />
          <IonItem>
            <IonInput
              className="form"
              placeholder="Enter place Website URL"
              value={formDoc.website_url}
              onIonChange={(e: any) =>
                updateFormDoc(e.target.value, "website_url")
              }
            ></IonInput>
          </IonItem>
          <br />
          <IonText className="ion-padding">Logo URL:</IonText>
          <br /> <br />
          <IonItem>
            <IonInput
              className="form"
              placeholder="Enter place Logo URL"
              value={formDoc.logo_url}
              onIonChange={(e: any) =>
                updateFormDoc(e.target.value, "logo_url")
              }
            ></IonInput>
          </IonItem>
          <br />
          <IonText className="ion-padding">Monday hours:</IonText>
          <br /> <br />
          <IonItem>
            <IonInput
              onIonChange={(e: any) => updateFormDoc(e.target.value, "hours")}
              className="form"
              placeholder="Enter place hours"
              value={formDoc.hours}
            ></IonInput>
          </IonItem>
          <br />
          <br />
          <br />
          <br />
          <IonButton onClick={submitForm}>Submit</IonButton>
        </IonContent>
      </IonPage>
    );
  }
};

export default AddPlaceForm;
