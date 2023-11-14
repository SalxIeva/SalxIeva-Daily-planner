// check if script.js is connected
console.log("peanut");

$(document).ready(function() {
// Display the current day at the top of the calender when a user opens the planner.
var currentDay = $("#currentDay");
var today = dayjs();
$("#currentDay").text(today.format("dddd, MMMM D[th]"));

// Present timeblocks for standard business hours when the user scrolls down.
    // start and end hours
    var startHour = 8;
    var endHour = 17;
  
    // Function to generate time blocks added including startTime, endTime and time Interval to generate timeblocks every 1 hour
    function generateTimeblocks(startTime, endTime, interval) {
        // var timeblockContainer created to represent #timeblocks
      var timeblockContainer = $("#timeblocks");
  
      // Loop through the time intervals and generate time blocks
      for (let i = startTime; i <= endTime; i++) {
        // currentTime added for tracking planner times using dayjs
        var currentTime = dayjs().hour(i).minute(0).second(0);
        // <div> with class row added using bootstrap grid
        var timeblockHTML = $("<div>").addClass("row");
  
        // Time blocks added to the row
        $("<div>")
          .addClass("col-md-1 hour time-block")
          .text(currentTime.format('HH:mm'))
          .appendTo(timeblockHTML);
  
        // user-input column created to the same row
        $("<div>").addClass("col-md-10 user-input").appendTo(timeblockHTML);
  
        // submit-btn column added to the same row
        $("<div>").addClass("col-md-1 submit-btn").appendTo(timeblockHTML);
  
        // Append the row to the timeblocks container
        timeblockContainer.append(timeblockHTML);
      }
  
      // checking to indicate that the function has been called
      console.log("Timeblocks generated successfully");
    }
  
    // Call the function initially
    generateTimeblocks(startHour, endHour, 1);
// Color-code each timeblock based on past, present, and future when the timeblock is viewed.

// Allow a user to enter an event when they click a timeblock

// Save the event in local storage when the save button is clicked in that timeblock.

// Persist events between refreshes of a page
});