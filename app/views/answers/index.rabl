collection @answers
attributes *Answer.column_names, :vote_tally
node(:current_user_vote) { |answer| current_user.get_vote_count(answer) }
child :user do
  extends "users/show"
end
