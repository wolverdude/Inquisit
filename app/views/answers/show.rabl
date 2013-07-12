object @answer
attributes *Answer.column_names, :vote_tally, :current_user_vote
child :user do
  extends "users/show"
end
