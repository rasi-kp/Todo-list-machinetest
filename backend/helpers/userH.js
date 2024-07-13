const bcrypt = require("bcrypt");
const User = require("../modal/userSchema");


module.exports = {
  insert: async (data) => {
    try {
      const { name, email, password, age } = data
      const hashedpw = await bcrypt.hash(password, 10);
      await User.insertMany({
        name: name,
        email: email,
        password: hashedpw,
      });
    } catch (error) {
      throw error;
    }
  },
  findUser: async (Email) => {
    const user = await User.findOne({ email: Email });
    return user;
  },


  
  pushPlan: async (planName, tasks, deadline, Email) => {
    try {
      const user = await User.findOne({ email: Email })
      const tarray = tasks.split(',').map(task => ({ task: task.trim() }))
      console.log('dffff', tarray);
      if (user && planName && tarray && deadline) {
        user.plan.push({ planName, tasks: tarray, deadline })
      }
      const result = user.save()
      return result;
    } catch (error) {
      console.error(error);
    }
  },
  allplans: async (Email) => {
    const user = await User.findOne({ email: Email })
    if (user) {
      return user
    }
    else {
      throw new Error('user not found')
    }
  },
  deletePlan: async (email, proId) => {
    const user = await User.findOneAndUpdate(
      { email: email },
      { $pull: { plan: { _id: proId } } },
      { new: true }
    )
  }
}