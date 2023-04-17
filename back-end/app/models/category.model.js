module.exports = mongoose => {
    const Category = mongoose.model(
      "category",
      mongoose.Schema(
        {
          categoryName:String,
          categoryImage:String
        }
      )
    )
  
    return Category
  };