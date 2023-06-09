class PointOfInterest < ApplicationRecord
  belongs_to :map
  delegate :user, to: :map
  CATEGORIES = ["People", "Food", "School", "Work"]
  validates :category, inclusion: { in: CATEGORIES }
end
