class PointOfInterestsController < ApplicationController

  def index
    set_pois
    @poi = PointOfInterest.new

  end

  def create
    @poi = PointOfInterest.new(poi_params)
    @poi.map = Map.first
    if @poi.save
      redirect_to point_of_interests_path, notice: "Point of Interest was successfully added."
    else
      # set_pois
      render :index, status: :unprocessable_entity
    end
  end

  def update

  end

  def destroy
    @poi = PointOfInterest.find(params[:id])
    @poi.destroy
    redirect_to point_of_interests_path, notice: "Point of Interest was successfully destroyed."
  end

  private

  def set_pois
    if params[:query].present?
      @poi = @pois.where(map_id: params[:query].to_i)
    else
      @map = current_user.maps.first
      @pois = current_user.point_of_interests.where(map: @map)
    end
    # @map = current_user.maps.first
    # @pois = current_user.point_of_interests.where(map: @map)
  end

  def set_poi
    @poi = PointOfInterest.find(params[:id])
  end

  def poi_params
    params.require(:point_of_interest).permit(:name, :address, :category)
  end


end
