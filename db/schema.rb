# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[8.0].define(version: 2024_11_14_143805) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "pg_catalog.plpgsql"

  create_table "active_storage_attachments", force: :cascade do |t|
    t.string "name", null: false
    t.string "record_type", null: false
    t.bigint "record_id", null: false
    t.bigint "blob_id", null: false
    t.datetime "created_at", null: false
    t.index ["blob_id"], name: "index_active_storage_attachments_on_blob_id"
    t.index ["record_type", "record_id", "name", "blob_id"], name: "index_active_storage_attachments_uniqueness", unique: true
  end

  create_table "active_storage_blobs", force: :cascade do |t|
    t.string "key", null: false
    t.string "filename", null: false
    t.string "content_type"
    t.text "metadata"
    t.string "service_name", null: false
    t.bigint "byte_size", null: false
    t.string "checksum"
    t.datetime "created_at", null: false
    t.index ["key"], name: "index_active_storage_blobs_on_key", unique: true
  end

  create_table "active_storage_variant_records", force: :cascade do |t|
    t.bigint "blob_id", null: false
    t.string "variation_digest", null: false
    t.index ["blob_id", "variation_digest"], name: "index_active_storage_variant_records_uniqueness", unique: true
  end

  create_table "batches", force: :cascade do |t|
    t.string "name"
    t.string "organization"
    t.date "start_date"
    t.date "end_date"
    t.bigint "creator_id", null: false
    t.text "description"
    t.string "slug"
    t.datetime "discarded_at", precision: nil
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["creator_id"], name: "index_batches_on_creator_id"
    t.index ["slug"], name: "index_batches_on_slug", unique: true
  end

  create_table "batches_skills", force: :cascade do |t|
    t.bigint "batches_id"
    t.bigint "skills_id"
    t.index ["batches_id"], name: "index_batches_skills_on_batches_id"
    t.index ["skills_id"], name: "index_batches_skills_on_skills_id"
  end

  create_table "career_details", force: :cascade do |t|
    t.string "company"
    t.string "designation"
    t.integer "start_year"
    t.integer "end_year"
    t.text "job_description"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "user_id", null: false
    t.boolean "is_current"
    t.index ["user_id"], name: "index_career_details_on_user_id"
  end

  create_table "companies", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "caption"
    t.text "overview"
    t.string "url"
    t.string "location"
    t.integer "people"
    t.string "company_type"
  end

  create_table "competency_levels", force: :cascade do |t|
    t.string "competency"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "education_details", force: :cascade do |t|
    t.string "university"
    t.string "degree"
    t.string "department"
    t.integer "start_year"
    t.integer "end_year"
    t.float "cgpa"
    t.float "double_precision"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "user_id", null: false
    t.index ["user_id"], name: "index_education_details_on_user_id"
  end

  create_table "project_details", force: :cascade do |t|
    t.bigint "user_id", null: false
    t.string "title"
    t.text "description"
    t.string "url"
    t.integer "duration"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["user_id"], name: "index_project_details_on_user_id"
  end

  create_table "project_details_skills", force: :cascade do |t|
    t.bigint "project_details_id"
    t.bigint "skills_id"
    t.index ["project_details_id"], name: "index_project_details_skills_on_project_details_id"
    t.index ["skills_id"], name: "index_project_details_skills_on_skills_id"
  end

  create_table "reviews", force: :cascade do |t|
    t.bigint "skills_id", null: false
    t.bigint "users_id", null: false
    t.integer "marks"
    t.text "comments"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.datetime "discarded_at", null: false
    t.bigint "competency_levels_id"
    t.index ["competency_levels_id"], name: "index_reviews_on_competency_levels_id"
    t.index ["skills_id"], name: "index_reviews_on_skills_id"
    t.index ["users_id"], name: "index_reviews_on_users_id"
  end

  create_table "skills", force: :cascade do |t|
    t.string "name"
    t.integer "parent_id"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["parent_id"], name: "index_skills_on_parent_id"
  end

  create_table "skills_users", id: false, force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "skill_id", null: false
    t.index ["skill_id"], name: "index_skills_users_on_skill_id"
    t.index ["user_id"], name: "index_skills_users_on_user_id"
  end

  create_table "specialized_user_skills", id: false, force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "skill_id", null: false
    t.index ["skill_id"], name: "index_specialized_user_skills_on_skill_id"
    t.index ["user_id"], name: "index_specialized_user_skills_on_user_id"
  end

  create_table "universities", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "user_roles", force: :cascade do |t|
    t.string "role"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "user_roles_users", id: false, force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "user_role_id", null: false
    t.index ["user_id"], name: "index_user_roles_users_on_user_id"
    t.index ["user_role_id"], name: "index_user_roles_users_on_user_role_id"
  end

  create_table "users", force: :cascade do |t|
    t.string "first_name"
    t.string "last_name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.bigint "user_role_id"
    t.string "location"
    t.string "username"
    t.string "profile_picture"
    t.datetime "discarded_at"
    t.string "jti", null: false
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["jti"], name: "index_users_on_jti", unique: true
    t.index ["reset_password_token"], name: "index_users_on_reset_password_token", unique: true
  end

  create_table "users_batches", id: false, force: :cascade do |t|
    t.bigint "user_id", null: false
    t.bigint "batch_id", null: false
    t.boolean "is_mentor", default: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["batch_id"], name: "index_users_batches_on_batch_id"
    t.index ["user_id"], name: "index_users_batches_on_user_id"
  end

  add_foreign_key "active_storage_attachments", "active_storage_blobs", column: "blob_id"
  add_foreign_key "active_storage_variant_records", "active_storage_blobs", column: "blob_id"
  add_foreign_key "batches", "users", column: "creator_id"
  add_foreign_key "batches_skills", "batches", column: "batches_id"
  add_foreign_key "batches_skills", "skills", column: "skills_id"
  add_foreign_key "career_details", "users"
  add_foreign_key "education_details", "users"
  add_foreign_key "project_details", "users"
  add_foreign_key "project_details_skills", "project_details", column: "project_details_id"
  add_foreign_key "project_details_skills", "skills", column: "skills_id"
  add_foreign_key "reviews", "competency_levels", column: "competency_levels_id"
  add_foreign_key "reviews", "skills", column: "skills_id"
  add_foreign_key "reviews", "users", column: "users_id"
  add_foreign_key "skills_users", "skills"
  add_foreign_key "skills_users", "users"
  add_foreign_key "specialized_user_skills", "skills"
  add_foreign_key "specialized_user_skills", "users"
  add_foreign_key "user_roles_users", "user_roles"
  add_foreign_key "user_roles_users", "users"
  add_foreign_key "users_batches", "batches"
  add_foreign_key "users_batches", "users"
end
