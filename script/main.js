let now = moment();
let currentSelectedYear; //gives a number
let currentSelectedMonth; //gives a number

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

function setFirstLastDayOfMonth(){
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
    now =now.startOf('month').subtract(1,'days');
    
    setFirstLastDayOfMonth();
    displayMonth(currentSelectedMonth);
    if((currentSelectedMonth + "-" + currentSelectedYear) !== (moment().month()+"-"+moment().year())){
        $("#backToTodaydiv").css("display","block");
    }
    else{
        $("#backToTodaydiv").css("display","none");
    }

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
    if((currentSelectedMonth + "-" + currentSelectedYear) !== (moment().month()+"-"+moment().year())){
        $("#backToTodaydiv").css("display","block");
    }
    else{
        $("#backToTodaydiv").css("display","none");
    }

});

$("#showHideBtn").on("click",function(){
   if($("#prev").css("visibility") ==="visible"){
    $("#prev").css("visibility","hidden") ;
   }
   else{
    $("#prev").css("visibility","visible");
   }
   if($("#next").css("visibility") ==="visible"){
    $("#next").css("visibility","hidden") ;
   }
   else{
    $("#next").css("visibility","visible");
   }
   
   if($(".calcontainer").css("display") ==="flex"){
    $(".calcontainer").css("display","none") ;
   }
   else{
    $(".calcontainer").css("display","flex");
   }

   if($("#backToTodaydiv").css("visibility") ==="visible"){
    $("#backToTodaydiv").css("visibility","hidden") ;
   }
   else{
    $("#backToTodaydiv").css("visibility","visible");
   }


   
});

// $("#next").on("click",function(){
//     $("#imgcal").attr("src","https://unsplash.it/200/200");
//  });


function displayMonth(selectedMonth) {
    const MonthsArr = ['January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'];

    $("#monthName").text(MonthsArr[selectedMonth]);
    $("#yearName").text(currentSelectedYear);

    //remove old btns
    $(".daybtn").remove();

    let numDays = now.daysInMonth();
    if(moment([now.year(),now.month(),1]).day() !==0){
        for(let i=0 ;i< moment([now.year(),now.month(),1]).day();i++){
            $btn=$("<button>");
            $btn.text("--");
            $btn.addClass("daybtn");
            $btn.attr("disabled","true");
            $btn.css("width","35px") ;       
            $btn.css("height","35px") ;
            $("#day" + i).append($btn);
        }
    }
    for(let n = 1;n <= numDays;n++){
        $btn=$("<button>");
        $btn.text(n);
        $btn.addClass("daybtn");
        $btn.css("width","35px") ;       
        $btn.css("height","35px") ;
        $btn.attr("data-id",now.year()+"-"+ now.month()+"-"+n)
        $("#day" + moment([now.year(),now.month(),n]).day()).append($btn);                
    }
    // today=moment().format("YYYY-MM-dd");
    $today=$("button[data-id='"+ moment().year()+"-"+ moment().month() + "-" + moment().date() +"']");
    $today.css("background-color","white") ;
    $today.css("border","1px #e2b37b solid") ;

}



function displayYear() {
    const MonthsArr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    // MonthsArr.forEach(function(mon){
    let ySpan = $('<span>');
    let yr = parseInt(moment().year());
    // alert(moment().month());
    ySpan.text(yr);
    ySpan.css("width", "60px");
    // ySpan.css("margin-right","5px");
    ySpan.addClass("monthbtn");
    ySpan.insertAfter("#prevYearBtn");

    // $(".monthcontainer").inser("#prevMonthBtn").append(mBtn);
    // });

}