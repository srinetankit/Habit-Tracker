console.log('Static file is loaded');

let weeksContainer = document.querySelectorAll(".weekly__container");

function showWeeklyData() {
    for( letsingleClass of weeksContainer){
        letsingleClass.style.display = "flex";
    }
}

function showDailyData() {
    for (letsingleClass of weeksContainer) {
        letsingleClass.style.display = "none";
    }
}


function showFlash() {
    var flashMsg = document.getElementById('flash-msg');
    flashMsg.style.display = 'block';
    setTimeout(function () {
        flashMsg.style.opacity = '0';
    }, 3000); // Hide after 3 seconds
}

function hideFlash() {
    var flashMsg = document.getElementById('flash-msg');
    flashMsg.style.opacity = '0';
}

// Show the flash message when the page loads
showFlash();
