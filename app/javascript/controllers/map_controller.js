import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="map"
export default class extends Controller {
  static targets = ["content"]
  static values = {
    address: String,
    markers: Array
  }

  connect() {
    // console.log(this.markersValue)
    this.initMap()
  }

  async initMap() {
  // async function initMap() {

    const { Geocoder } = await google.maps.importLibrary("geocoding")
    const beachFlagImg = document.createElement("img")

    // Request needed libraries.
    const geo = new Geocoder
    geo.geocode({ address: this.addressValue }, result => this.setMap(result))
  }

  async setMap(result) {
    const { Map } = await google.maps.importLibrary("maps")

    // const { AdvancedMarkerElement } = await google.maps.importLibrary("marker")

    const position = result[0].geometry.location

    const map = new Map(this.contentTarget, {
      zoom: 12,
      center: position,
      mapId: "DEMO_MAP_ID",
    });

    this.markersValue.forEach((marker) => {
      console.log(marker)
      this.#addMarkerToMap(marker, map)
    })
    // START - Icon - In case the marker is an icon
    // beachFlagImg.src = "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png";
    // END - Icon
  }

  async #addMarkerToMap(marker, map) {
    const { PinElement, AdvancedMarkerElement } = await google.maps.importLibrary("marker")

    const mAptPin = new PinElement({
      borderColor: "blue",
      glyphColor: "black",
      background: "yellow",
      glyph: "pol",
      scale: 1.5,
    })

    console.log(map, marker)

    new AdvancedMarkerElement({
      map: map,
      position: marker,
      title: "Hello world",
      content: mAptPin.element, // the marker is a pin
      // content: beachFlagImg, // OR the marker is an icon
    });
  }
}
