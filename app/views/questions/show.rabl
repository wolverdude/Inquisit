object @question
attributes *Question.column_names
child :answers do
  extends "answers/show"
end
