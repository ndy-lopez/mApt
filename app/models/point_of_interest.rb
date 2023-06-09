class PointOfInterest < ApplicationRecord
  belongs_to :map
  delegate :user, to: :map
  CATEGORIES = ["People", "Food", "School", "Work"]
  #validates :content, presence: true
  validates :category, inclusion: { in: CATEGORIES }
end
