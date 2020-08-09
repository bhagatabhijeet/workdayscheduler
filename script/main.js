let now = moment();
let currentSelectedYear; //gives a number
let currentSelectedMonth; //gives a number

let calendarVisible = false;

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
    $("#selectedDay").text(`${now.year()}-${parseInt(now.month())+1}-${now.date()}`);

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
    let timeslotArr = ["9:AM", "10:AM", "11:AM", "12:PM", "1:PM", "2:PM", "3:PM", "4:PM", "5:PM"]
    $(".timeSlotsContainer").empty();
    timeslotArr.forEach(function (tSlot) {
        let $timeslotDiv = $("<div>");
        $timeslotDiv.addClass("timeSlotDiv");

        let $timeSlotLabel = $("<label>");
        $timeSlotLabel.addClass("timeSlotLabel");

        let $timeSlotItemText = $("<span>");
        $timeSlotItemText.addClass("timeSlotItemText");
        let $timeSlotItemBtns = $("<span>");
        //Add label
        $timeSlotLabel.html(tSlot.split(":")[0] + "<sup><u>" + tSlot.split(":")[1] + "</u></sup>");
        //Add input to TimeSlotItemText
        $inputItem = $("<input type='text'>");
        $inputItem.addClass("inputItemText");
        $inputItem.attr("readonly","true");

        $timeSlotItemText.append($inputItem);

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
        $btn.attr("id",  "calday"+ n.toString());
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
    let dispMonthAndYear =  displayMonth(currentSelectedMonth);
    dispMonthAndYear();
    // displayMonth();
    displayTimeSlots();
    // showHideBackToTodayDiv();
    $("#selectedDay").text(`${now.year()}-${parseInt(now.month())+1}-${now.date()}`);
});


$(".calcontainer").on("click","button",function(){
    let btnDataArr=$(this).data("id").split("-");
    
    $("#selectedDay").text(`${btnDataArr[0]}-${parseInt(btnDataArr[1])+1}-${btnDataArr[2]}`);
    // console.log($(this));
    // alert(event.target.id);
});
