import mongoose from "mongoose";
// import bcrypt from "bcryptjs";

// Member Schema
const MemberSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true, // Nếu bạn muốn tên người dùng là duy nhất
      trim: true, // Loại bỏ khoảng trắng thừa ở hai đầu
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// MemberSchema.pre("save", async function (next) {
//   if (!this.isModified("password")) {
//     return next();
//   }
//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password, salt);
// });

// MemberSchema.methods.matchPasswords = async function (enteredPassword) {
//   return await bcrypt.compare(enteredPassword, this.password);
// };

const Member = mongoose.model("Member", MemberSchema);

export default Member;
