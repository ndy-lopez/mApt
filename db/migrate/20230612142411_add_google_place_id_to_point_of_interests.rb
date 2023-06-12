class AddGooglePlaceIdToPointOfInterests < ActiveRecord::Migration[7.0]
  def change
    add_column :point_of_interests, :google_place_id, :string
  end
end
