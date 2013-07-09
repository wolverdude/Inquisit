object @question
attributes *Question.column_names
child :answers do
  extends "answers/show"
end
child :topics do
  extends "topics/show_attrs"
end
