class PointOfInterestsController < ApplicationController

  def index
    if params[:query].present?
      @pois = @pois.where(map_id: params[:query].to_i)
    else
      @map = current_user.maps.first
      @pois = current_user.point_of_interests.where(map: @map)
    end

    # @maps = []

  end

  def new

  end

  def create

  end

end
