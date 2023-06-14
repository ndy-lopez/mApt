class PotentialLocation < ApplicationRecord
  belongs_to :map
  delegate :user, to: :map
  validates :address, presence: true
end
