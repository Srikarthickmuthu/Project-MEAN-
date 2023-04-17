module.exports = mongoose => {
  const Product = mongoose.model(
    "product",
    mongoose.Schema(
      {
        length: Number,
        userId: String,
        show:Boolean,
        category:String,
        productName: String,
        productType: String,
        productPrice: Number,
        productImage: String,
        deliveryStatus: String,
        quantity:Number,
        total:Number,
      }
    )
  )

  return Product
};