import { Store } from "pullstate";

export const authStore = new Store({
  username: "",
  password: "",
  loggedInUser: "",
});

export const placeStore = new Store({
  places: [],
  search: "",
  geoedPlaces: [],
});

export const appStore = new Store({
  loading: true,
  formId: "",
});

export const addPlaceFormStore = new Store({
  formDoc: {
    name: "",
    address: "",
    website_url: "",
    logo_url: "",
    hours: "",
  },
});
