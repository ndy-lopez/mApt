import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="compare"
export default class extends Controller {

  static values = {
    potentialLocations: Array,
    pointOfInterests: Array
  }

  connect() {
    this.#matrix();
    console.log(this.potentialLocationsValue)
    console.log(this.pointOfInterestsValue)
  }

  async #matrix() {
    // initialize services
  // console.log("test")
  const { Map } = await google.maps.importLibrary("maps") // had to add this constructor
  // const geocoder = new google.maps.Geocoder();
  const service = new google.maps.DistanceMatrixService();
  // build request
  const request = {
    origins: this.potentialLocationsValue,
    destinations: this.pointOfInterestsValue,
    travelMode: google.maps.TravelMode.DRIVING,
    unitSystem: google.maps.UnitSystem.METRIC,
    avoidHighways: false,
    avoidTolls: false,
  };

  // get distance matrix response
  const response = service.getDistanceMatrix(request)
  .then((response) => {
    // console.log(response.rows[0])
    const driving = response.rows
    console.log(driving)
    // JSON.stringify(
    //   response,
    //   null,
    //   2
    // )
    });
    // const driving = response
    // console.log(driving)
  }

}
