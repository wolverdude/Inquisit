object @user
attributes :name, :bio, :id
child :questions do
  extends "questions/show_attrs"
end
child :answers do
  extends "answers/show_attrs"
end
