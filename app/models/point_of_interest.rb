class PointOfInterest < ApplicationRecord
  belongs_to :map
  delegate :user, to: :map


  # validates :content, presence: true

  CATEGORIES = ["Friends/Family", "Education", "Work"]
  AMENITIES = ["Groceries", "Gym", "Pharmacy", "Metro", "Restaurants"]
  validates :category, inclusion: { in: CATEGORIES }


end
