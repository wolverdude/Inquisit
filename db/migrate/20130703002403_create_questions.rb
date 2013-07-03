class CreateQuestions < ActiveRecord::Migration
  def change
    create_table :questions do |t|
      t.string :title, :null => false
      t.text :description
      t.references :asker
      # t.boolean :anonymous, :default => false

      t.timestamps
    end
    add_index :questions, :asker_id
  end
end
