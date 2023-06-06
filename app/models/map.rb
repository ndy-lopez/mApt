class Map < ApplicationRecord
  has_many :point_of_interests
  has_many :potential_locations
  has_many :amenities
  belongs_to :user
end
