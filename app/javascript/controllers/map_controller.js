import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="map"
export default class extends Controller {
  static targets = ["content"]
  static values = {
    cityInfo: Object,
    markers: Array,
    poiIds: Array
  }

  connect() {
    this.#initMap()
  }

  // INFO: this was the old initial function for the map, should no longer be needed but keeping in case
  async initMapOld() {
  // async function initMap() {

    // const { Geocoder } = await google.maps.importLibrary("geocoding")

    const {PinElement} = await google.maps.importLibrary("marker")

    // const beachFlagImg = document.createElement("img");

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
    this.matrix()
    // START - Icon - In case the marker is an icon
    // beachFlagImg.src = "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png";
    // END - Icon
    var service = new google.maps.places.PlacesService(map);
  }
    // async #addMarkerToMap(marker, map) {
  async #addMarkerToMap(marker, map) {

      const { PinElement, AdvancedMarkerElement } = await google.maps.importLibrary("marker")

      const mAptPin = new PinElement({
        borderColor: "grey",
        glyphColor: "grey",
        background: "blue",
        // glyph: "xyz",
        scale: 1,
      })

      if (marker.type === "Potential location") {
        mAptPin.background = "yellow";
      } else if (marker.type === "Point of interest") {
        mAptPin.background = "pink";
      } else {
        mAptPin.background = "white";
      }

      new AdvancedMarkerElement({
        map: map,
        position: marker,
        title: `${marker.type} : ${marker.name} `,
        content: mAptPin.element, // the marker is a pin
        // content: beachFlagImg, // OR the marker is an icon
      });

  };

  async matrix() {
    // const { DistanceMatrixService } = await google.maps.importLibrary("DistanceMatrix")
    console.log(this.poiIdsValue);
    var origin1 = new google.maps.LatLng(45.4805964, -73.6075075);
    var origin2 = 'Greenwich, England';
    var destinationA = 'Stockholm, Sweden';
    var destinationB = new google.maps.LatLng(50.087692, 14.421150);

    const service = new google.maps.DistanceMatrixService();
    // console.log(service)
    service.getDistanceMatrix(
      {
        origins: [origin1, origin2],
        destinations: [destinationA, destinationB],
        travelMode: 'DRIVING',
        // transitOptions: TransitOptions,
        // drivingOptions: DrivingOptions,
        unitSystem: google.maps.UnitSystem.METRIC,
        // avoidHighways: Boolean,
        // avoidTolls: Boolean,
      }, this.callback);


    }
    async callback(response, status) {
      // console.log(response);
    }

};
