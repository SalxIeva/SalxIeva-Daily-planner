// check if script.js is connected
console.log("peanut");

$(document).ready(function () {
    // Display the current day at the top of the calendar when a user opens the planner.
    var currentDay = $("#currentDay");
    var today = dayjs();
    $("#currentDay").text(today.format("dddd, MMMM D[th]"));
  
    // Present time blocks for standard business hours when the user scrolls down.
    // start and end hours
    var startHour = 8;
    var endHour = 17;
  
    // Function to generate time blocks added including startTime, endTime and time Interval to generate time blocks every 1 hour
    function generateTimeblocks(startTime, endTime, interval) {
      // var timeblockContainer created to represent #timeblocks
      var timeblockContainer = $("#timeblocks");
  
      // Loop through the time intervals and generate time blocks
      for (let i = startTime; i <= endTime; i++) {
        // currentTime added for tracking planner times using dayjs
        var currentTime = dayjs().hour(i).minute(0).second(0);
        // <div> with class row added using bootstrap grid
        var timeblockHTML = $("<div>").addClass("row");
  
        // NEW DIV element with its inputs LAYOUT IS TAKEN FROM FREECODECAMP.ORG  
        // COL system added using bootstarp examples  

        // Time blocks added to the row
        $("<div>")
          .addClass("col-md-1 hour time-block")
          .text(currentTime.format("HH:mm"))
          .appendTo(timeblockHTML);
  
        // Allow a user to enter an event when they click a time block
        // user-input column created to the same row
        var userInputEl = $("<div>")
          .addClass("col-md-10 user-input editable")
          .attr("contenteditable", "true") // to make a text editable
          .text("")
          .appendTo(timeblockHTML);
  
        // submit-btn column added to the same row
        var submitBtnEl = $("<div>")
          .addClass(
            "col-md-1 submit-btn btn btn-primary saveBtn d-flex align-items-center justify-content-center"
          )
          .click(function () {
            userInput(userInputEl);
            lockIcon.toggleClass("locked"); // WRITTEN BY EXAMPLE CODE FROM CODEPEN.IO
          }); // click event to the Save button
        var lockIcon = $("<i>").addClass("fas fa-lock");
  
        submitBtnEl.append(lockIcon);
  
        submitBtnEl.appendTo(timeblockHTML);
        // Append the row to the timeblocks container
        timeblockContainer.append(timeblockHTML);
  
        // Stored data retrieved from localStorage and populate user-input field
        var storedKey = i; 
        var storedVal = localStorage.getItem(storedKey);
  
        if (storedVal !== null) {
          userInputEl.text(JSON.parse(storedKey));
        }
        console.log(storedVal);
      }
      // checking to indicate that the function has been called
      console.log("Time blocks generated successfully");
    }
  
    // Call the function initially
    generateTimeblocks(startHour, endHour, 1);
    // Color-code each time block based on past, present, and future when the time block is viewed.
    var currentHour = dayjs().hour();
    // function to go through each hour and check whether it's past, present, or future time
    $(".user-input").each(function () {
      // the hour to color block is taken from previously set div element with text(time)
      var timeblockHour = parseInt($(this).prev().text().split(":")[0]);
      // if statement created to check if the hour is past/present/future
      if (timeblockHour > currentHour) {
        $(this).addClass("past");
      } else if (timeblockHour === currentHour) {
        $(this).addClass("present");
      } else {
        $(this).addClass("future");
      }
    });
  
    // Save the event in localStorage when the save button is clicked in that time block.
    $("#timeblocks").on("click", ".saveBtn", function () {
      var userInputEl = $(this).closest(".row").find(".user-input");
      userInput(userInputEl);
    });
  
    function userInput(userInputEl) {
      var userInputVal = userInputEl.text().trim();
      // the text content of the closest row hour element within the time block
      var timeblockHour = userInputEl.closest(".row").find(".hour").text().trim();
      // created localStorageKey
      var localStorageKey = timeblockHour;
      // Saved user input in localStorage
      localStorage.setItem(localStorageKey, JSON.stringify(userInputVal));
    }
  });