class CreateQuestionsTopics < ActiveRecord::Migration
  def change
    create_table :questions_topics, :id => false do |t|
      t.references :question, :null => false
      t.references :topic, :null => false
    end

    add_index :questions_topics, :question_id
    add_index :questions_topics, :topic_id
  end
end
