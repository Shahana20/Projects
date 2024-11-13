puts "Seeding users..."

User.create!(
  first_name: "Admin",
  last_name: "User",
  email: "admin@example.com",
  password: "password",
  password_confirmation: "password"
)

User.create!(
  first_name: "John",
  last_name: "Doe",
  email: "john@example.com",
  password: "password",
  password_confirmation: "password"
)

User.create!(
  first_name: "Jane",
  last_name: "Smith",
  email: "jane@example.com",
  password: "password",
  password_confirmation: "password"
)

puts "Seeding completed!"
