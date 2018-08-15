module.exports = app => {
  const mongoose = app.mongoose;
  const Schema = mongoose.Schema;
  const conn = app.mongooseDB.get('blog')

  const CategorySchema = new Schema({
    categoryName: { type: String },
    // count: { type: Number },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  });

  return conn.model('Category', CategorySchema);
}
