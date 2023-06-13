$(function() {
    var currentDate = new Date();
    var formattedCurrentDate = ("0" + currentDate.getDate()).slice(-2) + "-" + ("0" + (currentDate.getMonth() + 1)).slice(-2) + "-" + currentDate.getFullYear();
  
    $("#datepicker_1").val(formattedCurrentDate);
    $("#datepicker_1").datepicker({

    });
  });
  

$(function() {   
    $("#calculateButton").click(calculateDate); 

    function calculateDate() {
        var selectedDate = $("#datepicker_1").datepicker("getDate");
        var count = parseInt($("#countInput").val());
        var period = $("#periodSelect").val();
        var action = $("#actionSelect").val();

        var calculatedDate;

        if (action === "before") {
            calculatedDate = new Date(selectedDate.getTime());
            if (period === "days") {
                calculatedDate.setDate(calculatedDate.getDate() - count);
            } else if (period === "weeks") {
                calculatedDate.setDate(calculatedDate.getDate() - count * 7);
            } else if (period === "months") {
                calculatedDate.setMonth(calculatedDate.getMonth() - count);
            } else if (period === "years") {
                calculatedDate.setFullYear(calculatedDate.getFullYear() - count);
            }
        } else if (action === "after") {
            calculatedDate = new Date(selectedDate.getTime());
            if (period === "days") {
                calculatedDate.setDate(calculatedDate.getDate() + count);
            } else if (period === "weeks") {
                calculatedDate.setDate(calculatedDate.getDate() + count * 7);
            } else if (period === "months") {
                calculatedDate.setMonth(calculatedDate.getMonth() + count);
            } else if (period === "years") {
                calculatedDate.setFullYear(calculatedDate.getFullYear() + count);
            }
        }

        var selectedDateFormat = selectedDate.toLocaleDateString("en-US", { day: 'numeric', month: 'long', year: 'numeric' });
        var calculatedDateFormat = calculatedDate.toLocaleDateString("en-US", { day: 'numeric', month: 'long', year: 'numeric' });
        var durationDescriptionElement = document.getElementById("getDurationDescription");

        durationDescriptionElement.textContent = getDurationDescription(selectedDate, calculatedDate);

        $("#selectedDate").text(selectedDateFormat);
        $("#calculatedDate").text(calculatedDateFormat);
        $("#resultDays").text(count);
        $("#resultWeeks").text(calculateWeeks(count, period));
        $("#resultMonths").text(calculateMonths(count, period));
        $("#resultYears").text(calculateYears(count, period));
        
    }

    function calculateWeeks(count, period) {
        if (period === "days") {
            return Math.floor(count / 7);
        } else if (period === "weeks") {
            return count;
        } else if (period === "months") {
            return count * 4;
        } else if (period === "years") {
            return count * 52;
        }
    }

    function calculateMonths(count, period) {
        if (period === "days") {
            return Math.floor(count / 30);
        } else if (period === "weeks") {
            return Math.floor(count / 4);
        } else if (period === "months") {
            return count;
        } else if (period === "years") {
            return count * 12;
        }
    }

    function calculateYears(count, period) {
        if (period === "days") {
            return Math.floor(count / 365);
        } else if (period === "weeks") {
            return Math.floor(count / 52);
        } else if (period === "months") {
            return Math.floor(count / 12);
        } else if (period === "years") {
            return count;
        }
    }
    function getDurationDescription(startDate, endDate) {
        var diffInMilliseconds = Math.abs(endDate - startDate);
        var millisecondsPerDay = 24 * 60 * 60 * 1000;
      
        var years = Math.floor(diffInMilliseconds / (millisecondsPerDay * 365.25));
        var months = Math.floor(diffInMilliseconds / (millisecondsPerDay * 30.4375));
        var weeks = Math.floor(diffInMilliseconds / (millisecondsPerDay * 7));
        var days = Math.floor(diffInMilliseconds / millisecondsPerDay);
      
        var description = "";

        if (years > 0) {
            description += years + " год(а/лет) или ";
        }
    
        if (months > 0) {
            description += months + " месяц(а/ев) или ";
        }
    
        if (weeks > 0) {
            description += weeks + " неделя(и/ь) или ";
        }
    
        if (days > 0) {
            description += days + " день(дней)";
        }
    
        description = description.replace(/или\s*$/, "");
    
        return description;
    }
});