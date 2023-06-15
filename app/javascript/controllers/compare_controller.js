import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="compare"
export default class extends Controller {

  static values = {
    potentialLocations: Array,
    pointOfInterests: Array,
    mapId: Number
  }

  static targets = ['card', 'initial']

  connect() {
    this.#matrix('walking')
  }

  getScores(event) {
    this.#matrix(event.currentTarget.dataset.travelMode)
  }

  async #matrix(travelMode) {
    // initialize services

    const { Map } = await google.maps.importLibrary("maps") // had to add this constructor
    const service = new google.maps.DistanceMatrixService();

    const travelModeSettings = {
      walking: {
        travelMode: google.maps.TravelMode.WALKING,
        targetTime: 600,
        dropoutPoint: 300
      },
      cycling: {
        travelMode: google.maps.TravelMode.BICYCLING,
        targetTime: 600,
        dropoutPoint: 300
      },
      bus: {
        travelMode: google.maps.TravelMode.TRANSIT,
        targetTime: 600,
        dropoutPoint: 300
      },
      driving: {
        travelMode: google.maps.TravelMode.DRIVING,
        targetTime: 600,
        dropoutPoint: 300
      },
    }
    // build request
    const settings = travelModeSettings[travelMode]

    const request = {
      origins: this.potentialLocationsValue,
      destinations: this.pointOfInterestsValue,
      travelMode: settings.travelMode,
      unitSystem: google.maps.UnitSystem.METRIC,
      avoidHighways: false,
      avoidTolls: false,
    };


    // get distance matrix response
    service.getDistanceMatrix(request)
    .then((response) => {
      var origins = response.originAddresses;

      const durations = {};

      for (var i = 0; i < origins.length; i++) {

        const potentialLocationDurations = []
        const pointOfInterestsData = {}
        var results = response.rows[i].elements
        for (var j = 0; j < results.length; j++) {
          const duration = results[j].duration.value
          potentialLocationDurations.push(duration)
          const potentialLocationKey = this.pointOfInterestsValue[j].id
          pointOfInterestsData[potentialLocationKey] = results[j]
        }
        const potentialLocationsKey = this.potentialLocationsValue[i].id
        durations[potentialLocationsKey] = {
          distances: potentialLocationDurations,
          pointOfInterestsData: pointOfInterestsData

        }
      }

      for (const [cardId, values] of Object.entries(durations)) {
        const score = this.#calculateScore(values.distances, settings.targetTime, settings.dropoutPoint)
        this.#updateResultCard(cardId, score, values.pointOfInterestsData)
      }
    });
  }

  #updateResultCard(cardId, score, pointOfInterestsData) {
    const card = this.cardTargets.find(cardTarget => cardTarget.dataset.cardId === cardId)
    card.querySelector('.score').innerHTML = score

    for (const [pointOfInterestId, values] of Object.entries(pointOfInterestsData)) {
      const pointOfInterest = card.querySelector(`[data-poi-id="${pointOfInterestId}"]`)
      pointOfInterest.querySelector('.time').innerHTML = values.duration.text
      pointOfInterest.querySelector('.distance').innerHTML = values.distance.text
    }
  }

  // array = array of times in seconds
  // targetTime = seconds until no longer a 10 score
  // droupoutPoint = seconds until a score loses one full point
  #calculateScore(array, targetTime, dropoutPoint) {

    const maxScore = 10

    const average = array.reduce((sum, num) => sum + num, 0) / array.length

    if (average <= targetTime) return maxScore

    const overhead = maxScore - ((average - targetTime) / dropoutPoint)

    return parseFloat(Math.max(0.1, overhead).toFixed(1))


  }




}
