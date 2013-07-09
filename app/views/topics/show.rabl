object @topic
attributes *Topic.column_names
child :questions do
  extends "questions/index"
end
