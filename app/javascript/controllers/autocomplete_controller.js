import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="autocomplete"
export default class extends Controller {
  static targets = [
    "searchField",
    "latitude",
    "longitude",
    "googlePlaceId"
  ]

  connect() {
    this.#initAutocomplete();
  }

  async #initAutocomplete() {
    const { Place } = await google.maps.importLibrary("places");

    const autocomplete = new google.maps.places.Autocomplete( this.searchFieldTarget, {
      types: ['geocode'],
      fields: ['geometry', 'name', 'place_id']
    });

    google.maps.event.addListener(autocomplete, 'place_changed', () => {
        var near_place = autocomplete.getPlace();
        this.#setCoordinates(near_place)
      });

  };

  async #setCoordinates(result) {
    console.log(this.googlePlaceIdTarget)
    this.googlePlaceIdTarget.value = result.place_id;
    this.latitudeTarget.value = result.geometry.location.lat();
    this.longitudeTarget.value = result.geometry.location.lng();
  }


}
