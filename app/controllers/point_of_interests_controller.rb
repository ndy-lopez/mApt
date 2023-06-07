class PointOfInterestsController < ApplicationController

  def index
    if params[:query].present?
      @pois = @pois.where(map_id: params[:query].to_i)
    else
      @map = current_user.maps.first
      @pois = current_user.point_of_interests.where(map: @map)
    end

    @poi = PointOfInterest.new

  end

  def new

  end

  def create
    @poi = PointOfInterest.new(poi_params)
    if @map.save
      render notice: "POI was successfully added."
    else
      render :new, status: :unprocessable_entity
    end
  end

  private

  def set_poi
    @poi = PointOfInterest.find(params[:id])
  end

  def poi_params
    params.require(:point_of_interest).permit(:name, :address, :category)
  end
end
