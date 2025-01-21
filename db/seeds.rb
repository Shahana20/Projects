

puts "Seeding users..."

technical = Skill.create(name: "Technical")
non_technical = Skill.create(name: "Non-Technical")
angular= Skill.create(name: "Angular", parent: technical)
css = Skill.create(name: "Css", parent: technical)
html = Skill.create(name: "Html", parent: technical)
js = Skill.create(name: "Javascript", parent: technical)
rails = Skill.create(name: "Rails", parent: technical)
react = Skill.create(name: "React", parent: technical)
ruby = Skill.create(name: "Ruby", parent: technical)
vue = Skill.create(name: "Vue", parent: technical)
communication = Skill.create(name: "Communication", parent: non_technical)
discipline = Skill.create(name: "Discipline", parent: non_technical)
punctuality = Skill.create(name: "Punctuality", parent: non_technical)
java = Skill.create(name: "Java", parent: technical)
python = Skill.create(name: "Python", parent: technical)
sql = Skill.create(name: "SQL", parent: technical)
dotnet = Skill.create(name: "Dotnet", parent: technical)
nextjs = Skill.create(name: "NextJS", parent: technical)


20.times do
  first_name = Faker::Name.first_name
  last_name = Faker::Name.last_name
  email = Faker::Internet.email(name: "#{first_name} #{last_name}")
  location = Faker::Address.city
  username = Faker::Internet.username(specifier: "#{first_name} #{last_name}")
  password = '123456'
  jti = SecureRandom.uuid

  User.create!(
    first_name: first_name,
    last_name: last_name,
    email: email,
    password: password,
    password_confirmation: password,
    user_role_id: [1, 2, 3].sample, 
    location: location,
    username: username,
    profile_picture: Faker::Avatar.image,
    discarded_at: nil,
    jti: jti,
    user_skill_id: Array.new(rand(1..5)) { rand(3..18) },
    user_specialized_skill_id: [rand(3..18), rand(3..18)] 
  )
end




puts "Seeding completed!"
