module.exports = (mongoose) => {
  const User = mongoose.model(
    "user",
    mongoose.Schema(
      {
        fname: String,
        lname: String,
        number: Number,
        email: String,
        password: String,
        country: String,
        access: String,
      },
      { timestamps: true }
    )
  );

  return User;
};
