// check if script.js is connected
console.log("peanut");

$(document).ready(function() {

var startHour = "8am";
var endHour = "5pm";
// Display the current day at the top of the calender when a user opens the planner.
var currentDay = $("#currentDay");
var today = dayjs();
$("#currentDay").text(today.format("dddd, MMMM D[th]"));
// var currentTime = ();
function timeNow() {
    var currentTime = dayjs().format("HH:mm A");
console.log(currentTime);
}
timeNow();



//     // Loop through the time intervals and generate time blocks
//     for (let i = 0; i <= end.diff(start, 'minute') / interval; i++) {
//       var currentTime = start.add(i * interval, 'minute');
//       // Append the row to the timeblocks container
//       timeblockContainer.append(row);
//     }
  
//     // check to indicate that the function has been called
//     console.log("Timeblocks generated successfully");
//   }
  
//   // Call the function with start time, end time, and interval
//   generateTimeblocks("08:00", "17:00", 60);
  
// Call the function with your desired start time, end time, and interval

// Color-code each timeblock based on past, present, and future when the timeblock is viewed.

// Allow a user to enter an event when they click a timeblock

// Save the event in local storage when the save button is clicked in that timeblock.

// Persist events between refreshes of a page
});