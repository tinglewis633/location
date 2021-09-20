import React from "react";
import "../theme/PlaceList.css";
import Map from "../components/Map";
import {
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonRouterLink,
  IonInput,
  IonGrid,
  IonRow,
  IonCol,
  IonSearchbar,
  IonIcon,
  IonButton,
  IonModal,
  IonContent,
} from "@ionic/react";
import { createSharp, trashSharp } from "ionicons/icons";
import { placeStore, appStore } from "../stores/store";
import { deletePlaceData } from "../firebaseConfig";
function PlaceList() {
  const places = placeStore.useState((s) => s.places);
  const search = placeStore.useState((s) => s.search);
  const formId = appStore.useState((s) => s.formId);
  const searchPlace = (e) => {
    placeStore.update((s) => {
      s.search = e.target.value;
    });
  };
  const Delete = async (id) => {
    await deletePlaceData(id);
    appStore.update((s) => {
      s.formId = "";
    });
  };
  console.log("FORMID", formId);

  if (formId.length > 0) {
    const { name } = places.filter((place) => place.id === formId)[0];

    return (
      <div>
        <IonSearchbar
          className="searchbar"
          className="ion-padding"
          type="text"
          placeholder="Search place name or address"
          onIonChange={searchPlace}
        ></IonSearchbar>
        <Map></Map>
        <IonGrid>
          <IonRow>
            <IonCol className="confirm-component">
              <IonCard>
                <IonCardHeader>
                  <IonCardTitle>
                    Are you sure you want to delete this place
                    <br />"{name}"
                  </IonCardTitle>
                </IonCardHeader>

                <IonCardContent>
                  <IonButton onClick={() => Delete(formId)}>Delete</IonButton>
                  <IonButton
                    onClick={() => {
                      appStore.update((s) => {
                        s.formId = "";
                      });
                    }}
                  >
                    Cancel
                  </IonButton>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>
      </div>
    );
  }
  return (
    <div>
      <IonSearchbar
        className="searchbar"
        className="ion-padding"
        type="text"
        placeholder="Search place name or address"
        onIonChange={searchPlace}
      ></IonSearchbar>
      <Map></Map>
      <IonGrid>
        <IonRow>
          {places
            .filter(
              (place) =>
                place.name.toLowerCase().includes(search.toLowerCase()) ||
                place.address.toLowerCase().includes(search.toLowerCase())
            )
            .map((place) => (
              <IonCol
                key={place.id}
                size="12"
                size-xs="12"
                size-sm="6"
                size-md="4"
                size-lg="3"
              >
                <IonCard key={place.id}>
                  <IonCardHeader>
                    <IonCardTitle>
                      {place.name}{" "}
                      <IonRouterLink
                        className="edit-btn"
                        href={`/edit/place/` + place.id}
                      >
                        <IonIcon href="/home" icon={createSharp}></IonIcon>
                      </IonRouterLink>
                      <IonRouterLink className="delete-btn">
                        <IonIcon
                          onClick={() =>
                            appStore.update((s) => {
                              s.formId = place.id;
                            })
                          }
                          icon={trashSharp}
                        ></IonIcon>
                      </IonRouterLink>
                    </IonCardTitle>
                  </IonCardHeader>

                  <IonCardContent>
                    Address: {<br />}
                    {place.address}
                  </IonCardContent>
                  <IonCardContent>
                    Website: {<br />}
                    {place.website_url}
                  </IonCardContent>
                  <IonCardContent>
                    Detail: {<br />}
                    <IonRouterLink href={`places/` + place.id}>
                      {place.name}
                    </IonRouterLink>
                  </IonCardContent>
                </IonCard>
              </IonCol>
            ))}
        </IonRow>
      </IonGrid>
    </div>
  );
}

export default PlaceList;
