reviews = [
  "This is great",
  "This is bad",
  "do not reccomed",
  "horrible",
  "great!!!!",
]
Product.destroy_all
100.times do
  p = Product.create(
    name: Faker::Commerce.product_name,
    description: Faker::Lorem.sentence,
    price: Faker::Commerce.price.to_f,
    department: Faker::Commerce.department,
  )
  3.times do |i|
    p.reviews.create(username: "user-#{i}", description: reviews.sample)
  end
end

puts "#{Product.all.size} Products Seeded"
puts "#{Review.all.size} Reviews Seeded"
