class PotentialLocation < ApplicationRecord
  belongs_to :map
  delegate :user, to: :map
end
