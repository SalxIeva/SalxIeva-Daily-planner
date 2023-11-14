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

    var currentHour = dayjs().hour();
    // calling generateTimeblocks function
    generateTimeblocks(startHour, endHour, 1);
    // function to display user input from local storage on the page created
    function displayUserVal(userInputEl, localStorageKey) {
        var storedVal = localStorage.getItem(localStorageKey);
        
        if (storedVal !== null) {
            userInputEl.val(storedVal);
        }
         console.log(storedVal);
      }
    
  
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
        var userInputEl = $("<input>")
          .addClass("col-md-10 user-input")
          .attr("type", "text")
          .val("")
          .prop("disabled", i < currentHour)
          .appendTo(timeblockHTML);

        // submit-btn column added to the same row
        var submitBtnEl = $("<div>")
          .addClass(
            "col-md-1 submit-btn btn btn-primary saveBtn d-flex align-items-center justify-content-center"
          )
          // click event to the Save button
          .click(function () {
              userInput(userInputEl);
            //   lockIcon.toggleClass("locked"); // WRITTEN BY EXAMPLE CODE FROM CODEPEN.IO
            }); 

          // lock icon from fontawesome.com
        var lockIcon = $("<i>").addClass("fas fa-lock");
  
        submitBtnEl.append(lockIcon);
        submitBtnEl.appendTo(timeblockHTML);

        // appending the row to the timeblocks container in HTML
        timeblockContainer.append(timeblockHTML);
  
        var localStorageKey = "timeblock" + i;
        displayUserVal(userInputEl, localStorageKey);
      }
      // checking to indicate that the function has been called
      console.log("Time blocks generated");
    }
  
    // Color-code each time block based on past, present, and future when the time block is viewed.
    // var currentHour = dayjs().hour();
    // generateTimeblocks(startHour, endHour, 1)
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
      var userInputVal = userInputEl.val().trim();
      // the text content of the closest row hour element within the time block
      var timeblockHour = userInputEl.closest(".row").find(".hour").text().trim();
      // created localStorageKey
      var localStorageKey = timeblockHour;
      // Saved user input in localStorage
      localStorage.setItem(localStorageKey, userInputVal);
    }
  });