import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="map"
export default class extends Controller {
  static targets = ["content"]

  connect() {
    this.initMap()
  }

  async initMap() {
  // async function initMap() {

    const beachFlagImg = document.createElement("img");

    // START - Icon - In case the marker is an icon
    beachFlagImg.src = "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png";
    // END - Icon

    // START - PinElement - In case the marker is a pin
    const {PinElement} = await google.maps.importLibrary("marker")
    const mAptPin = new PinElement({
      borderColor: "blue",
      glyphColor: "black",
      background: "pink",
      glyph: "xyz",
      scale: 1.5,
    });
    // END - PinElement

    const set_map = (result) => {
      const position = result[0].geometry.location

      const map = new Map(this.contentTarget, {
        zoom: 15,
        center: position,
        mapId: "DEMO_MAP_ID",
      });

      // The marker
      const marker = new AdvancedMarkerElement({
        map: map,
        position: position,
        title: result[0].formatted_address,
        content: mAptPin.element, // the marker is a pin
        // content: beachFlagImg, // OR the marker is an icon
      });
    }

    // Request needed libraries.
    const { Map } = await google.maps.importLibrary("maps");
    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
    const { Geocoder } = await google.maps.importLibrary("geocoding")
    const geo = new Geocoder
    geo.geocode({ address: "montreal" }, set_map)
  }

}
