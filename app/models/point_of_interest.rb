class PointOfInterest < ApplicationRecord
  belongs_to :map
  delegate :user, to: :map

  CATEGORIES = ["Friends/Family", "Education", "Work", "Leisure"]
  AMENITIES = ["Groceries", "Gym", "Pharmacy", "Metro", "Restaurants"]
  validates :category, inclusion: { in: CATEGORIES }
  validates :name, presence: true
  validates :address, presence: true
end
