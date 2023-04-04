module.exports = mongoose => {
    const Cart = mongoose.model(
      "Cart",
      mongoose.Schema(
        {
          length: Number,
          userId: String,
          show:Boolean,
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
    return Cart
  };