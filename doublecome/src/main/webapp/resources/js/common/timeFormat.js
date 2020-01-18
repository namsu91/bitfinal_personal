Date.prototype.ymd = function() {
    var yyyy = this.getFullYear().toString();
    var mm = (this.getMonth() + 1).toString();
    var dd = this.getDate().toString();
    return  yyyy + "-" + (mm[1] ? mm : "0" + mm[0]) + "-" + (dd[1] ? dd : "0" + dd[0]);
}

Date.prototype.hms = function() {
    var yyyy = this.getFullYear().toString();
    var MM = (this.getMonth() + 1).toString();
    var dd = this.getDate().toString();
    var hh = this.getHours().toString();
    var mm = this.getMinutes().toString();
    var ss = this.getSeconds().toString(); 
    return  yyyy + "-" + (MM[1] ? MM : "0" + MM[0]) + "-" + (dd[1] ? dd : "0" + dd[0]) + " " + (hh[1] ? hh : "0" + hh[0]) + ":" + (mm[1] ? mm : "0" + mm[0]) + ":" + (ss[1] ? ss : "0" + ss[0]);
   
}

Date.prototype.Mdhms = function() {
	var yyyy = this.getFullYear().toString();
	var MM = (this.getMonth() + 1).toString();
    var dd = this.getDate().toString();
    var hh = this.getHours().toString();
    var mm = this.getMinutes().toString();
    var ss = this.getSeconds().toString(); 
    return  (dd[1] ? dd : "0" + dd[0]) + " " + (hh[1] ? hh : "0" + hh[0]) + ":" + (mm[1] ? mm : "0" + mm[0]) + ":" + (ss[1] ? ss : "0" + ss[0]);
   
}


function format(time,type){
	let date = new Date(time)
	if(type == "ymd"){
		return date.ymd();
	} else if(type == "hms"){		
		return date.hms();
	}else if(type == "Mdhms"){		
		return date.Mdhms();
	}
}