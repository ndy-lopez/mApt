import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="map"
export default class extends Controller {
  static targets = ["content"]
  static values = {
    cityInfo: Object,
    markers: Array,
    poiIds: Array,
    poisLat: Array,
    poisLon: Array
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
        mAptPin.background = "white";
      } else {
        mAptPin.background = "pink";
      }

      new AdvancedMarkerElement({
        map: map,
        position: marker,
        title: `${marker.type} : ${marker.name} `,
        content: mAptPin.element, // the marker is a pin
        // content: beachFlagImg, // OR the marker is an icon
      });


      const contentString = '<div id="content">' +
      '<div id="siteNotice">' +
      "</div>" +
      '<h1 id="firstHeading" class="firstHeading">Uluru</h1>' +
      '<div id="bodyContent">' +
      "<p><b>Uluru</b>, also referred to as <b>Ayers Rock</b>, is a large " +
      "sandstone rock formation in the southern part of the " +
      "Northern Territory, central Australia. It lies 335&#160;km (208&#160;mi) " +
      "south west of the nearest large town, Alice Springs; 450&#160;km " +
      "(280&#160;mi) by road. Kata Tjuta and Uluru are the two major " +
      "features of the Uluru - Kata Tjuta National Park. Uluru is " +
      "sacred to the Pitjantjatjara and Yankunytjatjara, the " +
      "Aboriginal people of the area. It has many springs, waterholes, " +
      "rock caves and ancient paintings. Uluru is listed as a World " +
      "Heritage Site.</p>" +
      '<p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">' +
      "https://en.wikipedia.org/w/index.php?title=Uluru</a> " +
      "(last visited June 22, 2009).</p>" +
      "</div>" +
      "</div>";

      const infowindow = new google.maps.InfoWindow({
        content: contentString,
        ariaLabel: "Something",
      });

      marker.addListener("click", () => {
        infowindow.open({
          anchor: marker,
          map,
        });
      });
    };



  async matrix() {
    // const { DistanceMatrixService } = await google.maps.importLibrary("DistanceMatrix")
    // console.log(this.poiIdsValue);
    var origin1 = new google.maps.LatLng(45.5018869, -73.6075075);
    var destinationA = new google.maps.LatLng(45.5243198, -73.5950124);

    const service = new google.maps.DistanceMatrixService();
    // console.log(service)
    service.getDistanceMatrix(
      {
        origins: [origin1],
        destinations: [destinationA],
        travelMode: 'WALKING',
        // 'WALKING', 'BIKING', 'PUBLIC TRANSIT',
        // transitOptions: TransitOptions,
        // drivingOptions: DrivingOptions,
        unitSystem: google.maps.UnitSystem.METRIC,
        // avoidHighways: Boolean,
        // avoidTolls: Boolean,
      }, this.callback);


    }
    async callback(response, status) {
      console.log(response);
    }

};
