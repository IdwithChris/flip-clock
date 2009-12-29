
FlipClock = function(conf) {
	this.defaultConf = {
		remainingTime: null,
		currentDate: null,
		draw: {
			days: false,
			hours: true,
			minutes: true,
			seconds: true
		}
	};
	
	
};
FlipClock.prototype = {
	
	currentDate: null,
	remainingTime: null,
	
	drawClock: function(conf) {
		if (conf.currentDate != null && this.currentDate != null) {
			this.currentDate = Date.parse(conf.currentDate);
		}
		
		if (conf.remainingTime) {
			this.remainingTime = Date.setTime(this.currentDate + Date.getTime(conf.remainingTime));
		}
	}
	
};