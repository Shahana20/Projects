puts "Seeding users..."

User.create!(
  first_name: "First",
  last_name: "User",
  email: "admin1@example.com",
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

technical = Skill.create(name: "Technical")
non_technical = Skill.create(name: "Non-Technical")
angular= Skill.create(name: "Angular", parent: technical)
css = Skill.create(name: "Css", parent: technical)
html = Skill.create(name: "Html", parent: technical)
js = Skill.create(name: "Js", parent: technical)
rails = Skill.create(name: "Rails", parent: technical)
react = Skill.create(name: "React", parent: technical)
ruby = Skill.create(name: "Ruby", parent: technical)
vue = Skill.create(name: "Vue", parent: technical)
communication = Skill.create(name: "Communication", parent: non_technical)
discipline = Skill.create(name: "Discipline", parent: non_technical)
punctuality = Skill.create(name: "Punctuality", parent: non_technical)

puts "Seeding completed!"
