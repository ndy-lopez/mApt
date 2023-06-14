import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="compare"
export default class extends Controller {

  static values = {
    potentialLocations: Array,
    pointOfInterests: Array,
    mapId: Number
  }

  static targets = ['card']

  connect() {
    this.#matrix();
    console.log(this.cardTargets[0].id)
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
      let key = this.potentialLocationsValue[i].id
      durations[key] = potentialLocationDurations
    }

console.log(durations)
    for (const [cardId, distances] of Object.entries(durations)) {
      const score = this.#calculateScore(distances, 600, 300)
      this.#updateResultCard(cardId, score)
    }


    });
    // const driving = response
    // console.log(driving)
  }

  #updateResultCard(cardId, score) {
    const card = this.cardTargets.find(cardTarget => cardTarget.id === cardId)
    card.querySelector('.score').innerHTML = score
  }

    #calculateScore(array, targetTime, dropoutPoint) {

      const maxScore = 10

      const average = array.reduce((sum, num) => sum + num, 0) / array.length

      if (average <= targetTime) return maxScore

      const overhead = maxScore - ((average - targetTime) / dropoutPoint)

      return parseFloat(Math.max(0.1, overhead).toFixed(1))


    }
  // array = array of times in seconds
  // targetTime = seconds until no longer a 10 score
  // droupoutPoint = seconds until a score loses one full point



}
