class PointOfInterest < ApplicationRecord
  belongs_to :map
  delegate :user, to: :map
end
