class Map < ApplicationRecord
  has_many :point_of_interests
  has_many :potential_locations
  has_many :amenities
  belongs_to :user

  def google_info
    {
      coordinates: {
        lat: latitude,
        lng: longitude
      },
      google_place_id:
    }
  end
end
