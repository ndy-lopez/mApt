class MapsController < ApplicationController

  def show
    @map = Map.find(params[:id])
    @pot_locs = @map.potential_locations
    @new_pot_loc = PotentialLocation.new

    # TODO: (Fred) Refactor this line, as there is a much cleaner way of doing things.
    @markers = @pot_locs.select { |pot_loc| pot_loc.latitude.present? && pot_loc.longitude.present? }.map do |pot_loc|
      {
        lat: pot_loc.latitude,
        lng: pot_loc.longitude,
        address: pot_loc.address
      }
    end
  end

  def my_maps
    @maps = current_user.maps
    @map = Map.new
    @address = @map.city
    @search_results = Unsplash::Photo.search("cats")
  end



  def compare

  end

  def create
    @map = Map.new(map_params)
    @map.user = current_user
    if @map.save
      redirect_to map_path(@map), notice: "Map was successfully created."
    else
      render :show, status: :unprocessable_entity
    end
  end

  def edit

  end

  def destroy

  end

  private

  def set_map
    @map = Map.find(params[:id])
  end

  def map_params
    params.require(:map).permit(:city, :latitude, :longitude, :google_place_id)
  end

  def pot_locs_params
    params.require(:potential_location).permit(:name, :adress)
  end

end
