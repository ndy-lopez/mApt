class PointOfInterestsController < ApplicationController
  before_action :set_map, except: :destroy

  def index
    @point_of_interests = @map.point_of_interests
    @poi = PointOfInterest.new
  end

  def create
    @poi = PointOfInterest.new(poi_params)
    @map = Map.find(params[:map_id])
    @poi.map = @map
    if @poi.save
      redirect_to map_point_of_interests_path, notice: "Point of Interest was successfully added."
    else
      @point_of_interests = @map.point_of_interests
      render :index, status: :unprocessable_entity
    end
  end

  def destroy
    @poi = PointOfInterest.find(params[:id])
    @poi.destroy
    redirect_to map_point_of_interests_path(@poi.map), notice: "Point of Interest was successfully removed."
  end

  private

  def set_map
    @map = Map.find(params[:map_id])
  end

  def poi_params
    params.require(:point_of_interest).permit(:name, :address, :category)
  end


end
