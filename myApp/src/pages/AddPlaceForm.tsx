import {
  IonButton,
  IonCard,
  IonCardHeader,
  IonContent,
  IonHeader,
  IonInput,
  IonItem,
  IonLabel,
  IonPage,
  IonText,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import "./Home.css";
import { addPlaceFormStore, placeStore } from "../stores/store";
import { getAuth } from "firebase/auth";
import React, { useEffect } from "react";
import PlaceList from "../components/PlaceList";
import "../theme/AddPlaceForm.css";
import { addPlaceData } from "../firebaseConfig";

const AddPlaceForm: React.FC = () => {
  const formDoc = addPlaceFormStore.useState((s) => s.formDoc);

  const updateFormDoc = (value: any, field: any) => {
    addPlaceFormStore.update((s: any) => {
      s.formDoc = { ...s.formDoc, [field]: value };
    });
  };

  function submitForm() {
    addPlaceData(formDoc);
  }
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Please add place info</IonTitle>
        </IonToolbar>
      </IonHeader>
      <br />
      <IonContent className="form">
        <IonText className="ion-padding">Name:</IonText>
        <br />
        <br />
        <IonItem>
          <IonInput
            onIonChange={(e: any) => updateFormDoc(e.target.value, "name")}
            className="form"
            placeholder="Enter place name"
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
          ></IonInput>
        </IonItem>
        <br />
        <IonText className="ion-padding">Website URL:</IonText>
        <br /> <br />
        <IonItem>
          <IonInput
            className="form"
            placeholder="Enter place Website URL"
            onIonChange={(e: any) =>
              updateFormDoc(e.target.value, "websiteURL")
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
            onIonChange={(e: any) => updateFormDoc(e.target.value, "logoURL")}
          ></IonInput>
        </IonItem>
        <br />
        <IonText className="ion-padding">Monday hours:</IonText>
        <br /> <br />
        <IonItem>
          <IonInput
            onIonChange={(e: any) =>
              updateFormDoc(e.target.value, "mondayHours")
            }
            className="form"
            placeholder="Enter place hours"
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
};

export default AddPlaceForm;
