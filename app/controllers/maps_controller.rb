class MapsController < ApplicationController

  def show
    @map = Map.find(params[:id])
    @pot_locs = @map.potential_locations
    @pois = @map.point_of_interests
    @new_pot_loc = PotentialLocation.new

    @markers = @pot_locs.select { |pot_loc| pot_loc.latitude.present? && pot_loc.longitude.present? }.map do |pot_loc|
      {
        lat: pot_loc.latitude,
        lng: pot_loc.longitude,
        place_id: pot_loc.google_place_id,
        name: pot_loc.name,
        type: "Potential location",
        info_window_html: render_to_string(partial: "info_window", locals: { marker: pot_loc })
      }
    end

    @pois.each do |poi|
      @markers.push({
        place_id: poi.google_place_id,
        lat: poi.latitude,
        lng: poi.longitude,
        name: poi.name,
        type: "point of interest",
        info_window_html: render_to_string(partial: "info_window", locals: { marker: poi })
      })
    end

    @point_of_interests_ids = @map.point_of_interests.map(&:google_place_id)
  end

  def my_maps
    @maps = current_user.maps
    @map = Map.new # Initialize a new Map object
    @address = @map.city
  end


  def compare

    @map = Map.first
    @pot_locs = @map.potential_locations
    @pois = @map.point_of_interests
    @potentialLocations = @pot_locs.select { |pot_loc| pot_loc.latitude.present? && pot_loc.longitude.present? }.map do |pot_loc|
      {
        lat: pot_loc.latitude,
        lng: pot_loc.longitude,
        place_id: pot_loc.google_place_id,
        name: pot_loc.name
      }
    end
    @pointOfInterests = @pois.select { |poi| poi.latitude.present? && poi.longitude.present? }.map do |poi|
      {
        lat: poi.latitude,
        lng: poi.longitude,
        place_id: poi.google_place_id,
        name: poi.name
      }
    end
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
