class CreateVotes < ActiveRecord::Migration
  def change
    create_table :votes do |t|
      t.references :user, :null => false
      t.references :answer, :null => false
      t.integer :count, :limit => 1

      t.timestamps
    end
    add_index :votes, :user_id
    add_index :votes, :answer_id
  end
end
