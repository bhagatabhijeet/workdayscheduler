let now = moment();
let currentSelectedYear; //gives a number
let currentSelectedMonth; //gives a number

let calendarVisible = false;
let unlockedButtonId;

// let firstDayOfSelectedMonth; //moment object
// let lastDayOfSelectedMonth; //moment object

// currentYear = today.year();
// currentMonth = today.month();

$(document).ready(function () {
    // $("#imgcal").attr("src","https://unsplash.it/300/200");
    $(".wire").animate({ "height": "400px" }, 2000);
    // $("#imgcal").attr("src","https://unsplash.it/300/200");
    $(".today").text("Today is : " + now.format("ddd, MMM Do YYYY"));
    currentSelectedMonth = now.month();
    currentSelectedYear = now.year();
    setFirstLastDayOfMonth();
    displayMonth(currentSelectedMonth);
    displayTimeSlots();
    $("#selectedDay").text(`${now.year()}-${parseInt(now.month()) + 1}-${now.date()}`);

    // $("#prev").on("click",function(){
    //     $("#imgcal").attr("src","https://unsplash.it/200/200");
    //  });

    //  $("#next").on("click",function(){
    //      $("#imgcal").attr("src","https://unsplash.it/200/200");
    //   });

    // $(".week").text(today.startOf('week'));
    // displayMonth();
    // alert(currentYear);
    // displayYear();
    // alert(moment().format("MMMM"));



});

function setFirstLastDayOfMonth() {
    // firstDayOfSelectedMonth = now.startOf('month');  
    // lastDayOfSelectedMonth = now.endOf('month');  
    currentSelectedMonth = now.month();
    currentSelectedYear = now.year();
}

$("#prev").on("click", function () {
    // let imgTimer= setInterval(function(){
    //     $("#imgcal").attr("src","https://unsplash.it/200/200");
    //     clearInterval(imgTimer);
    // },1000);
    $("#imgcal").attr("src", "https://unsplash.it/200/200");
    // firstDayOfSelectedMonth = now.startOf('month');
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

$("#next").on("click", function () {
    // let imgTimer= setInterval(function(){
    //     $("#imgcal").attr("src","https://unsplash.it/200/200");
    //     clearInterval(imgTimer);
    // },1000);
    var img = "https://unsplash.it/200/200"
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

$("#showHideBtn").on("click", function () {
    if (calendarVisible === false) {
        $("#prev").css("visibility", "visible");
        $("#next").css("visibility", "visible");
        $(".calcontainer").css("display", "flex");
        $("#showHideBtn").html('<i class="fa fa-chevron-circle-up" aria-hidden="true"></i>');
        $("#showHideText").text("Hide Calendar : ");
        calendarVisible = true;
    }
    else {
        $("#prev").css("visibility", "hidden");
        $("#next").css("visibility", "hidden");
        $(".calcontainer").css("display", "none");
        $("#showHideBtn").html('<i class="fa fa-chevron-circle-down" aria-hidden="true"></i></button>');
        $("#showHideText").text("Show Calendar : ");
        calendarVisible = false;
    }
});

function displayTimeSlots() {
    let timeLabelArr = ["9:AM", "10:AM", "11:AM", "12:PM", "1:PM", "2:PM", "3:PM", "4:PM", "5:PM"];
    let timeslotArr = ["9:AM", "10:AM", "11:AM", "12:PM", "13:PM", "14:PM", "15:PM", "16:PM", "17:PM"];

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
        let t1 = moment(now.year() + "-" + (now.month() + 1) + "-" + now.date() + " " + ValueArray[0] + ":00 " + ValueArray[1], "YYYY-MM-DD hh:mm A");
        let t2 = moment(now.year() + "-" + (now.month() + 1) + "-" + now.date() + " " + ValueArray[0] + ":00 " + ValueArray[1], "YYYY-MM-DD hh:mm A");
        t2.add(1,'h');
        
        // let t2 = moment(now.year() + "-" + (now.month() + 1) + "-" + now.date() + " " + (parseInt(ValueArray[0]) + 1) + ":00 " + ValueArray[1], "YYYY-MM-DD hh:mm A");
        //t2=t1.add(1,'hours');
        console.log("t1",t1);
        console.log("t2",t2);
        if (moment().isBetween(t1, t2)) {
            $timeSlotItemText.css("background-color", "#e2b37b");
        }
        else {
            if(moment().isAfter(t2)){
            // if (moment().isAfter(moment(now.year() + "-" + (now.month() + 1) + "-" + now.date() + " " + (parseInt(ValueArray[0]) + 1) + ":00 " + ValueArray[1], "YYYY-MM-DD hh:mm A"))) {
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
        //Add checkbox to TimeSlotItemText
        $inputItemCheck = $("<input type='checkbox'>");
        $inputItemCheck.addClass("inputItemCheck");

        //Give id and data-id to the checkbox
        $inputItemCheck.attr("id", "Check-" + now.year() + "-" + now.month() + "-" + now.date() + "-" + ValueArray[0] + ValueArray[1]);
        $inputItemCheck.attr("data-id", now.year() + "-" + now.month() + "-" + now.date() + " " + ValueArray[0]);

        $inputItemCheck.on("click", checkboxClicked);

        $unlockAndSaveBtn = $("<button>");
        $unlockAndSaveBtn.addClass("unlockAndSaveBtn");

        //Give id and data-id to the unlock button
        $unlockAndSaveBtn.attr("id", "UnlockBtn-" + now.year() + "-" + now.month() + "-" + now.date() + "-" + ValueArray[0] + ValueArray[1]);
        $unlockAndSaveBtn.attr("data-id", now.year() + "-" + now.month() + "-" + now.date() + " " + ValueArray[0]);

        $unlockAndSaveBtn.html('<i class="fa fa-lock" aria-hidden="true"></i>')
        $unlockAndSaveBtn.on("click", unlockButtonClicked);

        $timeSlotItemText.append($inputItem);
        $timeSlotItemText.append($inputItemCheck);

        $timeSlotItemBtns.append($unlockAndSaveBtn);

        $timeslotDiv.append($timeSlotLabel);
        $timeslotDiv.append($timeSlotItemText);
        $timeslotDiv.append($timeSlotItemBtns);

        $(".timeSlotsContainer").append($timeslotDiv);

    });
}

function displayMonth(selectedMonth) {
    const MonthsArr = ['January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'];
    function setMonthAndYearLabel() {
        $("#monthName").text(MonthsArr[selectedMonth]);
        $("#yearName").text(currentSelectedYear);
    }
    setMonthAndYearLabel();
    //remove old btns
    $(".daybtn").remove();

    let numDays = now.daysInMonth();
    if (moment([now.year(), now.month(), 1]).day() !== 0) {
        for (let i = 0; i < moment([now.year(), now.month(), 1]).day(); i++) {
            $btn = $("<button>");
            $btn.text("--");
            $btn.addClass("daybtn");
            $btn.attr("disabled", "true");
            // $btn.css("width", "35px");
            // $btn.css("height", "35px");
            $("#day" + i).append($btn);
        }
    }
    for (let n = 1; n <= numDays; n++) {
        $btn = $("<button>");
        $btn.text(n);
        $btn.addClass("daybtn");
        // $btn.css("width", "35px");
        // $btn.css("height", "35px");   
        $btn.attr("id", "calday" + n.toString());
        $btn.attr("data-id", now.year() + "-" + now.month() + "-" + n);
        $("#day" + moment([now.year(), now.month(), n]).day()).append($btn);
    }
    // today=moment().format("YYYY-MM-dd");
    $today = $("button[data-id='" + moment().year() + "-" + moment().month() + "-" + moment().date() + "']");
    $today.css("background-color", "black");
    $today.css("border", "1px #e2b37b solid");
    return setMonthAndYearLabel;
}

// function showHideBackToTodayDiv(){
//     if ((currentSelectedMonth + "-" + currentSelectedYear) !== (moment().month() + "-" + moment().year())) {
//         $("#backToTodaydiv").css("visibility", "visible");
//     }
//     else {
//         $("#backToTodaydiv").css("visibility", "hidden");
//     }
// }

$("#backToToday").on("click", function () {
    now = moment();
    setFirstLastDayOfMonth();
    let dispMonthAndYear = displayMonth(currentSelectedMonth);
    dispMonthAndYear();
    // displayMonth();
    displayTimeSlots();
    // showHideBackToTodayDiv();
    $("#selectedDay").text(`${now.year()}-${parseInt(now.month()) + 1}-${now.date()}`);
});


$(".calcontainer").on("click", "button", function () {
    let btnDataArr = $(this).data("id").split("-");

    $("#selectedDay").text(`${btnDataArr[0]}-${parseInt(btnDataArr[1]) + 1}-${btnDataArr[2]}`);
    now = moment(`${btnDataArr[0]}-${parseInt(btnDataArr[1]) + 1}-${btnDataArr[2]}`);
    setFirstLastDayOfMonth();
    displayTimeSlots();
    displayHTMLMessage(`<span><i class="fa fa-check" aria-hidden="true"></i> Selected ${btnDataArr[0]}-${parseInt(btnDataArr[1]) + 1}-${btnDataArr[2]}</span>`,"green");
    

    // $("#message").css("background-color","green")
    // $("#message").fadeIn(100);

    // $("#message").text("Selected.");

    // $("#message").fadeOut(4000);
    
});



// $(".inputItemCheck").on("click",function(){
//     alert("checkbox clicked");
// });

function checkboxClicked() {
    alert("checkbox clicked");
    // $(this).prev().css("text-decoration","line-through");

}

function unlockButtonClicked() {
    $(this).blur();
    let targetId = $(this).attr("id");
    let targetDataId = $(this).data().id;
    let ValueArray = targetDataId.split("-");
    let stringTargetId = ValueArray[0] + "-" + (parseInt(ValueArray[1]) + 1) + "-" + ValueArray[2];
    let stringTargetHourAfterId = ValueArray[0] + "-" + (parseInt(ValueArray[1]) + 1) + "-" + ValueArray[2].split(" ")[0] + " " + (parseInt(ValueArray[2].split(" ")[1]) + 1);


    console.log(stringTargetId);
    console.log(ValueArray[2]);
    console.log(stringTargetHourAfterId);
    let m1 = moment(stringTargetId, "YYYY-MM-DD hh:mm");
    let m2 = m1.clone();
    m2.add(1,'h');
    if(moment().isAfter(m2)){
    // if (moment().isAfter(moment(stringTargetHourAfterId, "YYYY-MM-DD hh:mm"))) {
        // if(moment(stringTargetId,"YYYY-MM-DD hh:mm").isBefore(moment())){
        // alert("event in past cannot be edited");
        // $("#message").fadeIn(100);
        // $("#message").text("Cannot edit event in the past.You can only mark the event complete.");

        // $("#message").fadeOut(4000);
        displayMessage("Cannot edit event in the past.You can only mark the event complete.","red",100,4000);
        return;
    }
    unlockedButtonId =$(this).attr("id");
    
    let inputId = targetId.replace("UnlockBtn", "Input");
    $(this).html('<i class="fa fa-unlock" aria-hidden="true"></i>');
    $("#" + inputId).attr("readonly", false);
    $("#" + inputId).focus();
    // alert("#"+ inputId);


    // $("#Input-2020-7-9-9AM").attr("readonly",false);
    // alert($(this).data().id);
    // alert("unlock clicked");
}

function displayMessage(msg,color,fadeInTime,fadeOutTime){
    if(color === undefined){
        color="red";
    }
    if(fadeInTime === undefined){
        fadeInTime=100;
    }
    if(fadeOutTime === undefined){
        fadeOutTime=2000;
    }
    $("#message").css("background-color",color)
    $("#message").fadeIn(fadeInTime);
    $("#message").text(msg);
    $("#message").fadeOut(fadeOutTime).delay(200);
    //reset back to red color
    // $("#message").delay(fadeOutTime).css("background-color","red");
}

function displayHTMLMessage(msg,color,fadeInTime,fadeOutTime){
    if(color === undefined){
        color="red";
    }
    if(fadeInTime === undefined){
        fadeInTime=100;
    }
    if(fadeOutTime === undefined){
        fadeOutTime=2000;
    }
    $("#message").css("background-color",color)
    $("#message").fadeIn(fadeInTime);
    $("#message").html(msg);
    $("#message").fadeOut(fadeOutTime).delay(200);
    //reset back to red color and empty
    // $("#message").empty();
    // $("#message").css("background-color","red");
}
