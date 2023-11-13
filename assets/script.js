// check if script.js is connected
console.log("peanut");

var startHour = "08:00";
var endHour = "17:00";


var currentDay = $("#currentDay");
// Display the current day at the top of the calender when a user opens the planner.
var today = dayjs();
$("#currentDay").text(today.format("dddd, MMMM D[th]"));
// Present timeblocks for standard business hours when the user scrolls down. (9am to 5pm)


function generateTimeblocks(startTime, endTime, interval) {
    // Convert start and end time to Day.js objects
    var start = dayjs(startTime, 'HH:mm');
    var end = dayjs(endTime, 'HH:mm');
    
    // Calculate the number of intervals between start and end
    var numIntervals = Math.floor(end.diff(start, 'minute') / interval);
    
    // Generate timeblocks
    for (let i = 0; i <= numIntervals; i++) {
      var currentTime = start.add(i * interval, 'minute');
      var timeblockHTML = $("<div>").text(currentTime.format('HH:mm'));
    
    //   var timeblockHTML = `<div class="timeblock">${currentTime.format('HH:mm')}</div>`;
      $("timeblockHTML").appendTo("#time-block");
    }
    // Log a message to indicate that the function has been called
    console.log("Timeblocks generated successfully");
}
// Call the function with your desired start time, end time, and interval
generateTimeblocks(startHour, endHour, 60);

// Color-code each timeblock based on past, present, and future when the timeblock is viewed.

// Allow a user to enter an event when they click a timeblock

// Save the event in local storage when the save button is clicked in that timeblock.

// Persist events between refreshes of a page