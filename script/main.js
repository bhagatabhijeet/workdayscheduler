/**
 * main.js
 * @author Abhijeet Bhagat
 * @description main.js is the main logic script for WorkDayScheduler.
 */

//Create a moment object at the page load
let now = moment();

// ********* variables to store the currentSelected Year and Month
let currentSelectedYear; 
let currentSelectedMonth; 
//***************

//calendar show hide is driven using the calendarVisible global variable.
let calendarVisible = true;

//This object is used to parse the localStorage
let wordaySchedulerStorageObject;

// Action begins here :)
$(document).ready(function () {
    $(".wire").animate({ "height": "400px" }, 2000);
    $(".today").text("Today is : " + now.format("ddd, MMM Do YYYY"));
    currentSelectedMonth = now.month();
    currentSelectedYear = now.year();
    //set the First and Last day of Month
    setFirstLastDayOfMonth();

    //Display the calendar
    displayMonth(currentSelectedMonth);

    //Display the time slots
    displayTimeSlots();

    //set the selected day text on the screen
    $("#selectedDay").text(`${now.year()}-${parseInt(now.month()) + 1}-${now.date()}`);
});


/**
 * @description function to set the first and last day of selected month. This is a util function and is used internally.
 */
function setFirstLastDayOfMonth() {      
    currentSelectedMonth = now.month();
    currentSelectedYear = now.year();
}


// Go to Previous month
$("#prev").on("click", function () {

    $("#imgcal").attr("src", "https://unsplash.it/200/200");
    
    now = now.startOf('month').subtract(1, 'days');

    setFirstLastDayOfMonth();
    displayMonth(currentSelectedMonth);
    if ((currentSelectedMonth + "-" + currentSelectedYear) !== (moment().month() + "-" + moment().year())) {
        $("#backToTodaydiv").css("visibility", "visible");
    }
    else {
        $("#backToTodaydiv").css("visibility", "hidden");
    }

    displayTimeSlots();

});


// Go to next month
$("#next").on("click", function () {
    var img = "https://unsplash.it/200/200";
    $("#imgcal").attr("src", img);

    now = now.endOf('month').add(1, 'days');

    setFirstLastDayOfMonth();
    displayMonth(currentSelectedMonth);
    if ((currentSelectedMonth + "-" + currentSelectedYear) !== (moment().month() + "-" + moment().year())) {
        $("#backToTodaydiv").css("visibility", "visible");
    }
    else {
        $("#backToTodaydiv").css("visibility", "hidden");
    }

    displayTimeSlots();

});

// The calendar is toggled visible or hidden on click
$("#showHideBtn").on("click", function () {
    if (calendarVisible === false) {
        $("#prev").css("visibility", "visible");
        $("#next").css("visibility", "visible");
        $(".calcontainer").css("display", "flex");
        $("#showHideBtn").html('<i class="fa fa-chevron-circle-up" aria-hidden="true"></i>');
        $("#showHideText").text("Click to hide calendar : ");
        calendarVisible = true;
    }
    else {
        $("#prev").css("visibility", "hidden");
        $("#next").css("visibility", "hidden");
        $(".calcontainer").css("display", "none");
        $("#showHideBtn").html('<i class="fa fa-chevron-circle-down" aria-hidden="true"></i></button>');
        $("#showHideText").text("Click to show calendar : ");
        calendarVisible = false;
    }
});

/**
 * @description displayTimeSlots is most important function!!! **** NOTE  THIS****
 * the function performs many operations like adding the controls to the timeslots
 * adding the event handlers to the buttons and finally  calling fetch data from local storage
 */

function displayTimeSlots() {
    let timeLabelArr = ["9:AM", "10:AM", "11:AM", "12:PM", "1:PM", "2:PM", "3:PM", "4:PM", "5:PM"];
    let timeslotArr = ["9:AM", "10:AM", "11:AM", "12:PM", "13:PM", "14:PM", "15:PM", "16:PM", "17:PM"];
    let intputItemsIdArray = [];

    $(".timeSlotsContainer").empty();
    timeslotArr.forEach(function (tSlot, index) {
        let ValLabelArray = timeLabelArr[index].split(":");
        let ValueArray = tSlot.split(":");

        // This is the full length div. It houses one label, one span for the input text  and one span for the lock unlock button
        let $timeslotDiv = $("<div>");
        $timeslotDiv.addClass("timeSlotDiv");

        //the day time label
        let $timeSlotLabel = $("<label>");
        $timeSlotLabel.addClass("timeSlotLabel");

        //Add label text  eample 9AM, 10AM where AM is superscripted text
        $timeSlotLabel.html(ValLabelArray[0] + "<sup><u>" + ValLabelArray[1] + "</u></sup>");

        //span 1 for housing the input text and checkbox
        let $timeSlotItemText = $("<span>");
        $timeSlotItemText.attr("id", "InputSpan" + ValueArray[0] + ValueArray[1]);
        $timeSlotItemText.addClass("timeSlotItemText");

        //Logic to color
        // NOTE: - The t1 and t2 moment objects are like clones.
        let t1 = moment(now.year() + "-" + (now.month() + 1) + "-" + now.date() + " " + ValueArray[0] + ":00 " + ValueArray[1], "YYYY-MM-DD hh:mm A");
        let t2 = moment(now.year() + "-" + (now.month() + 1) + "-" + now.date() + " " + ValueArray[0] + ":00 " + ValueArray[1], "YYYY-MM-DD hh:mm A");
        t2.add(1, 'h');


        //check if the current time is between timeslot start and end time.
        if (moment().isBetween(t1, t2)) {
            $timeSlotItemText.css("background-color", "#e2b37b");
        }
        else 
        {
            //color the items based on if the current moment is before or after the timeslot times.
            if (moment().isAfter(t2)) {                
                $timeSlotItemText.css("background-color", "#b4b4b4");
            }
            else {
                $timeSlotItemText.css("background-color", "#98FB98");
            }
        }


        //span 2 for housing the lock/unlock button
        let $timeSlotItemBtns = $("<span>");
        $timeSlotItemBtns.attr("id", "ButtonSpan" + ValueArray[0] + ValueArray[1]);
        $timeSlotItemBtns.addClass("timeSlotItemBtnsSpan");

        //Add input to TimeSlotItemText i.e span1
        $inputItem = $("<input type='text'>");
        $inputItem.addClass("inputItemText");
        //Give id and data-id to the input text
        $inputItem.attr("id", "Input-" + now.year() + "-" + now.month() + "-" + now.date() + "-" + ValueArray[0] + ValueArray[1]);
        $inputItem.attr("data-id", now.year() + "-" + now.month() + "-" + now.date() + " " + ValueArray[0]);
        $inputItem.attr("readonly", "true");

        //*** Event when input text changes
        $inputItem.on("input", inputItemChanged);
        intputItemsIdArray.push(now.year() + "-" + now.month() + "-" + now.date() + "-" + ValueArray[0] + ValueArray[1]);

        //Add checkbox to TimeSlotItemText
        $inputItemCheck = $("<input type='checkbox'>");
        $inputItemCheck.addClass("inputItemCheck");

        //Give id and data-id to the checkbox
        $inputItemCheck.attr("id", "Check-" + now.year() + "-" + now.month() + "-" + now.date() + "-" + ValueArray[0] + ValueArray[1]);
        $inputItemCheck.attr("data-id", now.year() + "-" + now.month() + "-" + now.date() + " " + ValueArray[0]);

        //*** Event when checbox is clicked
        $inputItemCheck.on("click", checkboxClicked);

        $unlockAndSaveBtn = $("<button>");
        $unlockAndSaveBtn.addClass("unlockAndSaveBtn");

        //Give id and data-id to the unlock button
        $unlockAndSaveBtn.attr("id", "UnlockBtn-" + now.year() + "-" + now.month() + "-" + now.date() + "-" + ValueArray[0] + ValueArray[1]);
        $unlockAndSaveBtn.attr("data-id", now.year() + "-" + now.month() + "-" + now.date() + " " + ValueArray[0]);

        //******** PLEASE NOTE THE USE OF CUSTOM ATTRIBUTE NAMED btnSTATE */
        //Give special attribute named 'btnState to the button. btnState will be in locked,unlocked and Save states        
        $unlockAndSaveBtn.attr("btnState", "locked");

        $unlockAndSaveBtn.html('<i class="fa fa-lock" aria-hidden="true"></i>');

        /**
         * unlockButtonClicked event is where the states of the button are handled
         */
        $unlockAndSaveBtn.on("click", unlockButtonClicked);

        // following code is to just append the controls to the right parent
        $timeSlotItemText.append($inputItem);
        $timeSlotItemText.append($inputItemCheck);

        $timeSlotItemBtns.append($unlockAndSaveBtn);

        $timeslotDiv.append($timeSlotLabel);
        $timeslotDiv.append($timeSlotItemText);
        $timeslotDiv.append($timeSlotItemBtns);

        $(".timeSlotsContainer").append($timeslotDiv);
    });
    // call to get the data from the localStorage
    fetchAndShowItemText(intputItemsIdArray);
}

/**
 * 
 * @param {array} intputItemsIdArray 
 * @description Function to fetch the item data from localStorage and show it to the user.
 */
function fetchAndShowItemText(intputItemsIdArray) {
    let objPointer = 0;
    if (localStorage.getItem("wordaySchedulerStorageObject") === null) {
        wordaySchedulerStorageObject = {
            items: []
        };
        
        localStorage.setItem("wordaySchedulerStorageObject", JSON.stringify(wordaySchedulerStorageObject));
        return;
    }
    else {
        wordaySchedulerStorageObject = JSON.parse(localStorage.getItem("wordaySchedulerStorageObject"));


        for (objPointer; objPointer < intputItemsIdArray.length; objPointer++) {
            let Items = wordaySchedulerStorageObject.items.filter(e => e.id === intputItemsIdArray[objPointer]);
            if (Items.length !== 0) {
                let item = Items[0];
                $("#Input-" + item.id).val(item.text);

                if (item.isComplete) {
                    $("#Input-" + item.id).css("text-decoration", "line-through");
                    $("#Check-" + item.id).prop("checked",true);
                }
                else {
                    $("#Input-" + item.id).css("text-decoration", "none");
                    $("#Check-" + item.id).prop("checked",false);
                }
            }
        }
    }

}

/**
 * 
 * @param {number} selectedMonth 
 * @description display month function displays the calendar
 */
function displayMonth(selectedMonth) {
    const MonthsArr = ['January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'];
    function setMonthAndYearLabel() {
        $("#monthName").text(MonthsArr[selectedMonth]);
        $("#yearName").text(currentSelectedYear);
    }
    setMonthAndYearLabel();
    //*** remove old btns
    $(".daybtn").remove();

    let numDays = now.daysInMonth();
    if (moment([now.year(), now.month(), 1]).day() !== 0) {
        for (let i = 0; i < moment([now.year(), now.month(), 1]).day(); i++) {
            $btn = $("<button>");
            $btn.text("--");
            $btn.addClass("daybtn");
            $btn.attr("disabled", "true");
            $("#day" + i).append($btn);
        }
    }
    for (let n = 1; n <= numDays; n++) {
        $btn = $("<button>");
        $btn.text(n);
        $btn.addClass("daybtn");
        $btn.attr("id", "calday" + n.toString());
        $btn.attr("data-id", now.year() + "-" + now.month() + "-" + n);
        $("#day" + moment([now.year(), now.month(), n]).day()).append($btn);
    }

    $today = $("button[data-id='" + moment().year() + "-" + moment().month() + "-" + moment().date() + "']");
    $today.css("background-color", "black");
    $today.css("border", "1px #e2b37b solid");
    return setMonthAndYearLabel;
}


// Go back to Today on click
$("#backToToday").on("click", function () {
    now = moment();
    setFirstLastDayOfMonth();
    let dispMonthAndYear = displayMonth(currentSelectedMonth);
    dispMonthAndYear();    
    displayTimeSlots();    
    $("#selectedDay").text(`${now.year()}-${parseInt(now.month()) + 1}-${now.date()}`);
});

// When a user selects a specific date on calendar 
$(".calcontainer").on("click", "button", function () {
    let btnDataArr = $(this).data("id").split("-");

    $("#selectedDay").text(`${btnDataArr[0]}-${parseInt(btnDataArr[1]) + 1}-${btnDataArr[2]}`);
    now = moment(`${btnDataArr[0]}-${parseInt(btnDataArr[1]) + 1}-${btnDataArr[2]}`, "YYYY-MM-DD hh:mm A");
    setFirstLastDayOfMonth();
    displayTimeSlots();
    displayHTMLMessage(`<i class="fa fa-dot-circle-o" aria-hidden="true"></i> Selected ${btnDataArr[0]}-${parseInt(btnDataArr[1]) + 1}-${btnDataArr[2]}</span>`, "green");
});


// Mark the item isComplete true when the user clicks on checkbox
function checkboxClicked() {
    let targetId = $(this).attr("id");
    if (localStorage.getItem("wordaySchedulerStorageObject") === null) {
        wordaySchedulerStorageObject = {
            items: []
        };

        localStorage.setItem("wordaySchedulerStorageObject", JSON.stringify(wordaySchedulerStorageObject));
        $("#" + targetId).prop("checked", false);
        return;
    }

    //Get and Parse object from LocalStorage
    wordaySchedulerStorageObject = JSON.parse(localStorage.getItem("wordaySchedulerStorageObject"));
    let index = wordaySchedulerStorageObject.items.findIndex(e => e.id === targetId.replace("Check-", ""));
    if (index !== -1) {
        wordaySchedulerStorageObject.items[index].isComplete=$(this).prop("checked");
    }
    else {
        $(this).prop("checked", false);
    }
    localStorage.setItem("wordaySchedulerStorageObject", JSON.stringify(wordaySchedulerStorageObject));
    
    if ($(this).prop("checked")) {
        $("#" + targetId.replace("Check-", "Input-")).css("text-decoration", "line-through");
    }
    else {
        $("#" + targetId.replace("Check-", "Input-")).css("text-decoration", "none");
    }
}


//function / event handler when the unlock button is clicked.
// this function takes several action based on its attribute called btnState.
function unlockButtonClicked() {
    $(this).blur();
    let targetId = $(this).attr("id");
    let targetDataId = $(this).data().id;
    let ValueArray = targetDataId.split("-");
    let stringTargetId = ValueArray[0] + "-" + (parseInt(ValueArray[1]) + 1) + "-" + ValueArray[2];
    
    let inputId = targetId.replace("UnlockBtn", "Input");

    let m1 = moment(stringTargetId, "YYYY-MM-DD hh:mm");
    let m2 = m1.clone();
    m2.add(1, 'h');
    if ($(this).attr("btnState") === "unlocked") {
        $("#" + inputId).attr("readonly", true);
        $(this).html('<i class="fa fa-lock" aria-hidden="true"></i>')
        $(this).attr("btnState", "locked");
        return;
    }

    // if currently the button is locked
    if ($(this).attr("btnState") === "locked") {
        if (moment().isAfter(m2)) {

            displayHTMLMessage('<span><i class="fa fa-ban" aria-hidden="true"></i> Cannot edit event in the past.You can only mark the event complete</span>', "red", 100, 4000);
            return;
        }


        $(this).html('<i class="fa fa-unlock" aria-hidden="true"></i>');
        $("#" + inputId).attr("readonly", false);
        $("#" + inputId).focus();
        $(this).attr("btnState", "unlocked");
    }

    // if currently the button is in save state
    if ($(this).attr("btnState") === "save") {
        displayHTMLMessage('<span><i class="fa fa-spinner" aria-hidden="true"></i>Saving...</span>', "blue");
        
        // ******* save to local storage here ********
        let storageItem = {
            id: targetId.replace("UnlockBtn-", ""),
            text: $("#" + inputId).val(),
            isComplete: $("#" + targetId.replace("UnlockBtn", "Check")).prop("checked"),
        };
        if (localStorage.getItem("wordaySchedulerStorageObject") === null) {
            wordaySchedulerStorageObject = {
                items: []
            };
            wordaySchedulerStorageObject.items.push(storageItem);
            localStorage.setItem("wordaySchedulerStorageObject", JSON.stringify(wordaySchedulerStorageObject));
        }
        else {
            wordaySchedulerStorageObject = JSON.parse(localStorage.getItem("wordaySchedulerStorageObject"));
            let index = wordaySchedulerStorageObject.items.findIndex(e => e.id === storageItem.id);
            if (index !== -1) {
                wordaySchedulerStorageObject.items[index] = storageItem;
            }
            else {
                wordaySchedulerStorageObject.items.push(storageItem);
            }
            localStorage.setItem("wordaySchedulerStorageObject", JSON.stringify(wordaySchedulerStorageObject));
        }
        
        $(this).attr("btnState", "locked");
        $(this).html('<i class="fa fa-lock" aria-hidden="true"></i>')
        $("#" + inputId).attr("readonly", true);
    }
}


// Event handler when the text in the input changes
function inputItemChanged() {    
    let targetId, btnTarget;
    targetId = $(this).attr("id");
    btnTarget = targetId.replace("Input", "UnlockBtn");
    if ($(this).val().trim() !== "") {
        $("#" + btnTarget).html('<i class="fa fa-floppy-o" aria-hidden="true"></i>');
        $("#" + btnTarget).attr("btnState", "save");
    }
    else {
        $("#" + btnTarget).html('<i class="fa fa-unlock" aria-hidden="true"></i>');
        $("#" + btnTarget).attr("btnState", "unlocked");
    }
}


// Utility function to display text message on the screen
function displayMessage(msg, color, fadeInTime, fadeOutTime) {
    if (color === undefined) {
        color = "red";
    }
    if (fadeInTime === undefined) {
        fadeInTime = 100;
    }
    if (fadeOutTime === undefined) {
        fadeOutTime = 2000;
    }
    $("#message").css("background-color", color)
    $("#message").fadeIn(fadeInTime);
    $("#message").text(msg);
    $("#message").fadeOut(fadeOutTime).delay(200);    
}

// Utility function to display HTML message on the screen
function displayHTMLMessage(msg, color, fadeInTime, fadeOutTime) {
    if (color === undefined) {
        color = "red";
    }
    if (fadeInTime === undefined) {
        fadeInTime = 100;
    }
    if (fadeOutTime === undefined) {
        fadeOutTime = 2000;
    }
    $("#message").css("background-color", color)
    $("#message").fadeIn(fadeInTime);
    $("#message").html(msg);
    $("#message").fadeOut(fadeOutTime).delay(200);    
}
