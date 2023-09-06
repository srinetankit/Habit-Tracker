const User = require('../models/user');
const Habit = require('../models/habit');

// Get today's date
const getTodayDate = () => {
    const today = new Date();
    const yyyy = today.getFullYear();
    let mm = today.getMonth() + 1;
    let dd = today.getDate();

    if (dd < 10) dd = '0' + dd;
    if (mm < 10) mm = '0' + mm;

    const formattedToday = dd + '/' + mm + '/' + yyyy;
    return formattedToday;
}

// Get next seven dates of the week
function getOneWeekDate() {
    let arr = [];
    for (let i = 0; i < 7; i++) {
        const d = new Date();
        d.setDate(d.getDate() + i);
        let mm = d.getMonth() + 1;
        if (mm < 10) mm = '0' + mm;
        let dd = d.getDate();
        if (dd < 10) dd = '0' + dd;
        const yyyy = d.getFullYear();
        arr.push(dd + '/' + mm + '/' + yyyy)
    }
    return arr;
}

// Home Controller
module.exports.home = async (req, res) => {
    try {
        if (req.user) {
            let habits = await Habit.find({ userRef: req.user._id }); // Find habits associated with the user

            return res.render("home", {
                title: "Habit Tracker App",
                habits: habits,
                weeklyDate: await getOneWeekDate()
            });

        } else {
            
            return res.redirect('/users/sign-in'); // Redirect to the sign-in page
        }
    } catch (err) {
        console.log(err, " error");
        // Handle errors appropriately
    }
}
