module.exports = (mongoose) => {
  const User = mongoose.model(
    "user",
    mongoose.Schema(
      {
        fname: String,
        lname: String,
        number: Number,
        email: {
          type:String,
          required:true,
          lowercase:true,
          unique:[true,{message:"Email already exists in database"}]
        },
        password: {
          type:String,
          required:true
        },
        country: String,
        access: String,
      }
    )
  );
  return User;
};
