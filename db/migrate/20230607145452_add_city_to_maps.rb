class AddCityToMaps < ActiveRecord::Migration[7.0]
  def change
    add_column :maps, :city, :string
  end
end
