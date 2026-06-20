

// variables
var $win = $(window);
var clientWidth = $win.width();
var clientHeight = $win.height();

$(window).resize(function() {
    var newWidth = $win.width();
    var newHeight = $win.height();
    clientWidth = newWidth;
    clientHeight = newHeight;
});

(function($) {
	$.fn.typewriter = function(callback) {
		this.each(function() {
			var $ele = $(this), str = $ele.html(), progress = 0;
			$ele.html('');
			var timer = setInterval(function() {
				var current = str.substr(progress, 1);
				if (current == '<') {
					progress = str.indexOf('>', progress) + 1;
				} else {
					progress++;
				}
				$ele.html(str.substring(0, progress) + (progress & 1 ? '_' : ''));
				if (progress >= str.length) {
					clearInterval(timer);
					if (typeof callback === 'function') {
						callback();
					}
				}
			}, 45);
		});
		return this;
	};
})(jQuery);

function timeElapse(date){
	var current = Date();
	var seconds = (Date.parse(current) - Date.parse(date)) / 1000;
	// compute years, days, hours, minutes since `date`
	var start = new Date(date);
	var now = new Date();
	var years = now.getFullYear() - start.getFullYear();
	// adjust if current date is before the birthday this year
	var birthdayThisYear = new Date(now.getFullYear(), start.getMonth(), start.getDate());
	if (now < birthdayThisYear) years--;

	var days = Math.floor(seconds / (3600 * 24));
	seconds = seconds % (3600 * 24);
	var hours = Math.floor(seconds / 3600);
	if (hours < 10) {
		hours = "0" + hours;
	}
	seconds = seconds % 3600;
	var minutes = Math.floor(seconds / 60);
	if (minutes < 10) {
		minutes = "0" + minutes;
	}
	// show years in Years column
	$("#years").text(years);
	// show base days in the Days column
	$("#days").text(days);
	// show cumulative total hours (days -> hours) in Hours column
	var totalHours = days * 24 + parseInt(hours, 10);
	$("#hours").text(totalHours);
	// show cumulative total minutes (totalHours -> minutes) in Minutes column
	var totalMinutes = totalHours * 60 + parseInt(minutes, 10);
	$("#minutes").text(totalMinutes);

	//var text = "THE WORLD JUST GOT LUCKIER SINCE ";
	//$("#message-box").html(text);

}

function typeDigits($el, text, delay, cb){
	var str = (text === undefined || text === null) ? '' : String(text);
	$el.text('');
	var i = 0;
	if(str.length === 0){ if(cb) cb(); return; }
	var t = setInterval(function(){
		i++;
		$el.text(str.substr(0, i));
		if(i >= str.length){
			clearInterval(t);
			if(cb) cb();
		}
	}, delay || 60);
}
