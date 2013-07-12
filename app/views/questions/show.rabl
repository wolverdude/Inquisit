object @question
attributes *Question.column_names
child :answers_with_vote_tally => :answers do
  extends "answers/show"
end
child :topics do
  extends "topics/show_attrs"
end
