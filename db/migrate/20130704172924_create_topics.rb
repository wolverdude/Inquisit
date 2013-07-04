class CreateTopics < ActiveRecord::Migration
  def change
    create_table :topics do |t|
      t.string :title, :null => false
      t.string :description

      t.timestamps
    end
  end
end
