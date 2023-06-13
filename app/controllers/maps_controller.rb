class MapsController < ApplicationController

  def show
    @map = Map.find(params[:id])
    @pot_locs = @map.potential_locations
    @pois = @map.point_of_interests
    @new_pot_loc = PotentialLocation.new

    # TODO: (Fred) Refactor this line, as there is a much cleaner way of doing things.
    @markers = @pot_locs.select { |pot_loc| pot_loc.latitude.present? && pot_loc.longitude.present? }.map do |pot_loc|
      {
        lat: pot_loc.latitude,
        lng: pot_loc.longitude,
        place_id: pot_loc.google_place_id,
        name: pot_loc.name,
        type: "Potential location"
      }
    end

    @point_of_interests_ids = @map.point_of_interests.map(&:google_place_id)

    @pois.each do |poi|
      @markers.push({ place_id: poi.google_place_id, lat: poi.latitude, lng: poi.longitude, name: poi.name, type: "point of interest" })
    end
  end

  def my_maps
    @maps = current_user.maps
    @map = Map.new
    @address = @map.city
  end

  def compare
    @route1 = {
      name: 'Tom',
      walk: 8.to_i,
      bike: 4.to_i,
      pt: 20.to_i,
      drive: 2.to_i
    }
    @route2 = {
      name: 'Mcdonalds',
      walk: 8.to_i,
      bike: 4.to_i,
      pt: 20.to_i,
      drive: 2.to_i
    }

    @routes_array

  end

  def create
    @map = Map.new(map_params)
    @map.user = current_user

    if @map.save
      redirect_to map_path(@map), notice: "Map was successfully created."
    else
      @maps = current_user.maps
      flash[:alert] = "Please select a location"
      redirect_to action: :my_maps
    end
  end

  def destroy
    @map = Map.find(params[:id])
    @map.destroy
    redirect_to my_maps_path, notice: "Potential Location was successfully removed."
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
