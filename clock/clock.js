function startTime() {
    var today = new Date();
    var yyyy = today.getFullYear();
    var mm = today.getMonth()+1;
    var dd = today.getDate();
	
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();

    mm = checkTime(mm);
    dd = checkTime(dd);
    m = checkTime(m);
    s = checkTime(s);

    document.getElementById('clock').innerHTML =yyyy+":"+mm+":"+dd+" "+h+":"+m+":"+s;
    setTimeout(function(){startTime()},200);
}

function checkTime(i) {
    if (i<10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
}
