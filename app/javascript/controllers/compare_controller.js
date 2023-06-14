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
    // console.log(this.pointOfInterestsValue)
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
    // console.log(response)
    var origins = response.originAddresses;

    const durations = {};


    for (var i = 0; i < origins.length; i++) {
      console.log();
      let potentialLocationDurations = []
      var results = response.rows[i].elements;
      for (var j = 0; j < results.length; j++) {
        // console.log(results[j].duration.value);
        var duration = results[j].duration.value;
        potentialLocationDurations.push(duration);
        // console.log(keys);
        // values.push(a[i][key]);
      }
      let key = this.potentialLocationsValue[i].name
      durations[key] = potentialLocationDurations
    }
    console.log(durations)
    // const driving = response.rows
    // var results = response.rows[i].elements;
    // console.log(driving)
    // console.log((duration.value));
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
