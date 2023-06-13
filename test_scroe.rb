targeted_walk_distance = 600


POI1 = [664, 600, 345, 890]

POI2 = [564, 700, 945, 890]
walking = []
biking= []

poi_array = [[664, 2000, 345, 890], [564, 700, 945, 890]]
walk_array =
p poi_array
poi_array.each do |times|
  walking << times[0]
  biking << times[1]
end
p walking
p biking
walk_avg = walking.sum / walking.size
biking_avg = biking.sum / biking.size

if walk_avg < 480
  w_rating = 5
elsif walk_avg > 480 && walk_avg < 900
  w_rating = 4
elsif walk_avg > 900 && walk_avg < 1320
  w_rating = 3
elsif walk_avg > 1320 && walk_avg < 1800
  w_rating = 2
elsif walk_avg > 1800
  w_rating = 1
end

if biking_avg < 480
  b_rating = 5
elsif biking_avg > 480 && biking_avg < 900
  b_rating = 4
elsif biking_avg > 900 && biking_avg < 1200
  b_rating = 3
elsif biking_avg > 1200 && biking_avg < 1800
  b_rating = 2
elsif biking_avg > 1800
  b_rating = 1
end

p w_rating
p b_rating
