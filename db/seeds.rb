# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)
puts "Cleaning database..."
PotentialLocation.destroy_all
PointOfInterest.destroy_all
Map.destroy_all
User.destroy_all

user1 = User.create!(username: 'Smith', email: 'john@gmail.com', password: 'password')
user2 = User.create!(username: 'Tim', email: 'tim@gmail.com', password: 'password')

map1 = Map.create!(name: 'University', city: 'Montreal', latitude: 45.5018869, longitude: -73.56739189999999, google_place_id: "ChIJDbdkHFQayUwR7-8fITgxTmU", user: user1)

PointOfInterest.create!(name: 'Concordia Downtown', category: 'Education', address: '1455 Boul. de Maisonneuve Ouest, Montréal, QC', latitude: 45.4971086, longitude: -73.5809226, google_place_id: "abcd" , map_id: map1.id)
PointOfInterest.create!(name: 'Tom', category: 'Friends/Family', address: '2070 Rue Clark, Montréal, QC', latitude: 45.5111026, longitude: -73.5686359, google_place_id: "abcd" , map_id: map1.id)
PointOfInterest.create!(name: 'Jean-Claude', category: 'Friends/Family', address: '4383 Rue Léa Roback, Montréal, QC', latitude: 45.4727414, longitude: -73.5839631, google_place_id: "abcd" , map_id: map1.id)
PointOfInterest.create!(name: 'Grandma', category: 'Friends/Family', address: '3801 Bd Édouard-Montpetit, Montréal, QC', latitude: 45.4961421, longitude: -73.6256706, google_place_id: "abcd" , map_id: map1.id)
PointOfInterest.create!(name: 'Pub St-Paul', category: 'Work', address: '124 Rue Saint-Paul E, Montréal, QC', latitude: 45.5069444, longitude: -73.5525, google_place_id: "abcd" , map_id: map1.id)
PointOfInterest.create!(name: 'Rock Climbing Allez Up', category: 'Leisure', address: '4137 Bd LaSalle, Verdun, QC', latitude: 45.4623795, longitude: -73.5636086, google_place_id: "abcd" , map_id: map1.id)

PotentialLocation.create!(name: 'Plateau', address: '3801 Av. Coloniale, Montréal, QC', latitude: 45.5163582, longitude: -73.5753602, google_place_id: "abcd" , map_id: map1.id)
PotentialLocation.create!(name: 'Downtown', address: '2061 Rue Stanley, Montréal, QC', latitude: 45.5008266, longitude: -73.5764843, google_place_id: "abcd" , map_id: map1.id)
PotentialLocation.create!(name: 'Westmount', address: '12 Pl. Park, Westmount, QC', latitude: 45.48018, longitude: -73.5979451, google_place_id: "abcd" , map_id: map1.id)

puts "Generating Users, maps, POIs and POLs..."
