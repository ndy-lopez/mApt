class AddGooglePlaceIdToPotentialLocations < ActiveRecord::Migration[7.0]
  def change
    add_column :potential_locations, :google_place_id, :string
  end
end
