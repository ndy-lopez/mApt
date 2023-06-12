class AddCoordinatesToMap < ActiveRecord::Migration[7.0]
  def change
    add_column :maps, :latitude, :float
    add_column :maps, :longitude, :float
    add_column :maps, :google_place_id, :string
  end
end
