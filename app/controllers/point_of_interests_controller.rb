class PointOfInterestsController < ApplicationController
  before_action :set_map, except: :destroy

  def index
    @point_of_interests = @map.point_of_interests
    @poi = PointOfInterest.new
  end

  def create
    @poi = PointOfInterest.new
    @poi = PointOfInterest.new(poi_params)
    @poi.map = Map.find(params[:map_id])
    if @poi.save

      redirect_to map_point_of_interests_path, notice: "POI was successfully added."
    else
      # set_pois
      raise
      render :index, status: :unprocessable_entity
    end
  end

  def destroy
    @poi = PointOfInterest.find(params[:id])
    @poi.destroy
    redirect_to point_of_interests_path, notice: "Point of Interest was successfully destroyed."
  end

  private

  def set_map
    @map = Map.find(params[:map_id])
  end

  def poi_params
    params.require(:point_of_interest).permit(:name, :address, :category)
  end


end
