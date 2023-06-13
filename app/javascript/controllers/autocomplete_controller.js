import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="autocomplete"
export default class extends Controller {
  static targets = [
    "searchField",
    "latitude",
    "longitude",
    "googlePlaceId"
  ]

  static values = {
    filter: String
  }

  connect() {
    this.#initAutocomplete();
  }

  async #initAutocomplete() {
    const { Place } = await google.maps.importLibrary("places");

    const autocomplete = new google.maps.places.Autocomplete( this.searchFieldTarget, {
      fields: ['geometry', 'name', 'place_id']
    });
    this.#setAutocompleteFilters(autocomplete)

    google.maps.event.addListener(autocomplete, 'place_changed', () => {
      var near_place = autocomplete.getPlace();
      this.#setCoordinates(near_place)
    });
  };

  async #setCoordinates(result) {
    this.googlePlaceIdTarget.value = result.place_id;
    this.latitudeTarget.value = result.geometry.location.lat();
    this.longitudeTarget.value = result.geometry.location.lng();
  }

  async #setAutocompleteFilters(autocomplete) {
    if (this.hasFilterValue && this.filterValue === 'city') {
      autocomplete.setTypes(['(cities)'])
    } else {
      autocomplete.setTypes(['geocode'])
    }
  }
}
