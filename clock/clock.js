function startTime() {
    var today = new Date();
	var Y = today.getFullYear();
	var M = today.getMonth()+1;
	var D = today.getDate();
	
    var h = today.getHours();
    var m = today.getMinutes();
    var s = today.getSeconds();


    m = checkTime(m);
    s = checkTime(s);

    document.getElementById('clock').innerHTML = h+":"+m+":"+s;
    setTimeout(function(){startTime()},200);
}

function checkTime(i) {
    if (i<10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
}
