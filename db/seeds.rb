puts "Seeding reviews for users 30 to 49..."

user_ids = (30..49).to_a
reviewer_ids = User.where(user_role_id: 2).pluck(:id)

user_ids.each do |user_id|
  rand(1..5).times do
    
    reviewer_id = reviewer_ids.sample
    while reviewer_id == user_id
      reviewer_id = reviewer_ids.sample
    end

 
    user_skill_ids = User.find(user_id).user_skill_id


    skill_id = user_skill_ids.sample
    skill_name = Skill.find(skill_id).name

    
    competency_level_id = CompetencyLevel.pluck(:id).sample

  
    comment = case skill_name.downcase
              when "ruby" then "Excellent proficiency in Ruby, creating efficient and maintainable code."
              when "javascript" then "Strong experience in JavaScript, particularly with frameworks like React and Node."
              when "python" then "Solid Python skills, capable of developing complex data science and machine learning applications."
              when "java" then "Proficient in Java, with expertise in building enterprise-level applications."
              when "react" then "Great expertise in React, capable of developing modern, responsive web applications."
              else "Skilled in #{skill_name}, able to adapt quickly to new technologies and methodologies."
              end

    Review.create!(
      users_id: user_id,
      reviewer_id: reviewer_id,
      skills_id: skill_id,
      competency_levels_id: competency_level_id,
      marks: rand(61..100),
      comments: comment,
      created_at: Faker::Time.backward(days: 30),
      updated_at: Faker::Time.backward(days: 10)
    )
  end
end

puts "Seeding reviews completed!"
