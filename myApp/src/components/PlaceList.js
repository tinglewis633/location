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
} from "@ionic/react";
import { placeStore } from "../stores/store";
function PlaceList() {
  const places = placeStore.useState((s) => s.places);
  const search = placeStore.useState((s) => s.search);

  const searchPlace = (e) => {
    placeStore.update((s) => {
      s.search = e.target.value;
    });
  };
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
                <IonCard>
                  <IonCardHeader>
                    <IonCardTitle>{place.name}</IonCardTitle>
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
