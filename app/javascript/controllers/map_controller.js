import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="map"
export default class extends Controller {
  static targets = ["content"]
  static values = {
    cityInfo: Object,
    markers: Array
  }

  connect() {
    this.#initMap()
  }

  // INFO: this was the old initial function for the map, should no longer be needed but keeping in case
  async initMapOld() {
  // async function initMap() {

    // const { Geocoder } = await google.maps.importLibrary("geocoding")

    const {PinElement} = await google.maps.importLibrary("marker")

    const beachFlagImg = document.createElement("img");

    // START - Icon - In case the marker is an icon
    // beachFlagImg.src = "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png";
    // END - Icon

    // START - PinElement - In case the marker is a pin
    const mAptPin = new PinElement({
      borderColor: "blue",
      glyphColor: "black",
      background: "pink",
      glyph: "xyz",
      scale: 1.5,
    });
    // END - PinElement
    // Request needed libraries.
    // const geo = new Geocoder
    // geo.geocode({ address: this.addressValue }, result => this.setMap(result))
    this.setMap(this.cityInfoValue.coordinates)
  }

  // async setMap(result) {


  async #initMap() {
    const { Map } = await google.maps.importLibrary("maps")

    // const { AdvancedMarkerElement } = await google.maps.importLibrary("marker")

    // const position = coordinates[0].geometry.location

    const map = new Map(this.contentTarget, {
      zoom: 12,
      center: this.cityInfoValue.coordinates,
      mapId: "DEMO_MAP_ID",
    });

    this.markersValue.forEach((marker) => {
      this.#addMarkerToMap(marker, map)
    })
    // START - Icon - In case the marker is an icon
    // beachFlagImg.src = "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png";
    // END - Icon
  }
    // async #addMarkerToMap(marker, map) {
  async #addMarkerToMap(marker, map) {
      const { PinElement, AdvancedMarkerElement } = await google.maps.importLibrary("marker")

      const mAptPin = new PinElement({
        borderColor: "blue",
        glyphColor: "black",
        background: "yellow",
        glyph: "pol",
        // glyph: marker.type,
        scale: 1.5,
      })

      new AdvancedMarkerElement({
        map: map,
        position: marker,
        title: `${marker.type} : ${marker.name} `,
        content: mAptPin.element, // the marker is a pin
        // content: beachFlagImg, // OR the marker is an icon
      });
  };
};
