const mongoose=require('mongoose');


const userSchema= new mongoose.Schema({
    email: {
        type: String,
        require: true,
        unique: true
    },
    password:{
        type: String,
        require: true,
    },
    name:{
        type: String,
        requred: true
    },
    // other fields
  habits: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Habit'
    }
  ]

},  {
    timestamps: true
})

const User = mongoose.model('User', userSchema);
module.exports = User;