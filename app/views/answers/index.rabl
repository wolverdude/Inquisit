collection @answers
attributes *Answer.column_names
child :user do
  extends "users/show"
end
