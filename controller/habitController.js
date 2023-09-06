const Habit = require('../models/habit');
const User = require('../models/user');

// Date to string function
function getTodayDate() {
  let currentDate = new Date();
  let day = currentDate.getDate();
  let month = currentDate.getMonth() + 1;
  let year = currentDate.getFullYear();
  let today = day + "/" + month + "/" + year;
  return today;
}

module.exports.createHabit = async (req, res) => {
  req.flash('success', 'A new Habit created successfully!');
  
  try {
    let habit;
    let user;

    try {
      // Find logged in user
      user = await User.findById(req.user._id).populate('habits'); // Populate the 'habits' field
      // If habit exists, find it
      habit = await Habit.findOne({ content: req.body.habit, userRef: req.user._id });
    } catch (err) {
      console.log(err, "error");
    }

    // If habit exists, or create it
    if (habit) {
      console.log("Already Exists");
    } else {
      const newHabit = new Habit({
        content: req.body.habit,
        userRef: req.user._id,
        dates: [{ date: getTodayDate(), complete: "none" }]
      });

      // Save the new habit
      await newHabit.save();

      // Add the new habit to the user's habits array
      user.habits.push(newHabit);
      await user.save();
    }

    // Redirect home
    return res.redirect('/');
  } catch (err) {
    console.log(err);
  }
};


// Dashboard Add/Remove Habit to/from Favorites
module.exports.favoriteHabit = async (req, res) => {
  req.flash('success', 'Yeah favorite habit');
  let id = req.query.id;
  let userId = req.user._id;
  try {
    let habit = await Habit.findOne({
      _id: id,
      userRef: userId
    });
    habit.favorite = !habit.favorite;
    await habit.save();
    return res.redirect('back');
  } catch (err) {
    console.log('Error adding to favorites:', err);
    return res.status(500).send('Internal Server Error');
  }
};

// Deleting a habit
module.exports.destroyHabit = async (req, res) => {
  req.flash('success', "Deleting Habit Successfully !");
  let id = req.query.id;
  let userId = req.user._id;
  try {
    await Habit.deleteMany({
      _id: id,
      userRef: userId
    });
    return res.redirect('back');
  } catch (err) {
    console.log('Error in deleting records:', err);
    return res.status(500).send('Internal Server Error');
  }
};

// Update status of habit completion
module.exports.statusUpdate = async (req, res) => {
  req.flash('success', 'Update habit successfully !');
  var d = req.query.date;
  var id = req.query.id;

  try {
    let habit = await Habit.findById(id);
    let dates = habit.dates;
    let found = false;

    dates.find((item, index) => {
      if (item.date === d) {
        if (item.complete === 'yes') {
          item.complete = 'no';
        } else if (item.complete === 'no') {
          item.complete = 'none';
        } else if (item.complete === 'none') {
          item.complete = 'yes';
        }
        found = true;
      }
    });

    if (!found) {
      dates.push({ date: d, complete: 'yes' });
    }

    habit.dates = dates;
    await habit.save();
    res.redirect('back');
  } catch (err) {
    console.log('Error updating status:', err);
    return res.status(500).send('Internal Server Error');
  }
};
