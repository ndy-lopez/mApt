class PointOfInterest < ApplicationRecord
  belongs_to :map
  delegate :user, to: :map


  # validates :content, presence: true

  CATEGORIES = ["Friend/Family", "Restaurants", "Education", "Work"]
  validates :category, inclusion: { in: CATEGORIES }

end
