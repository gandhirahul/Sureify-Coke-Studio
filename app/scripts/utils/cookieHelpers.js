/**
  * @desc Helps working with cookie
*/
var $ = require('jquery')

var cookieHelpers = {
	addCookie: function(key,value){
        if(value){
            document.cookie = key +'=' + JSON.stringify(value);    
        }
    },
    getCookie: function(cookie_name){

	    var cookie_array = document.cookie.split(';');

	    for(var i=0;i < cookie_array.length;i++) {
	      var c = cookie_array[i];
	      
	      while (c.charAt(0)==' '){
	         c = c.substring(1,c.length);
	      }

	      if (c.indexOf(cookie_name) == 0){
	       return JSON.parse(c.substring(cookie_name.length+1,c.length));
	      }

	    }
    	return null;
	},
	removeCookie:function(cookie_name){
		document.cookie = cookie_name+ '=;expires=Thu, 01 Jan 1970 00:00:01 GMT';
	},
	updateCookie:function(key,value){
	  	
	  	var saved_elm = this.getCookie(key);
	    saved_elm = saved_elm ? saved_elm : [];
	    var already_exists = false;

	    for(var i =0; i < saved_elm.length; i++){
	      if(saved_elm[i].url === value.url){
	        //silently fails
	        already_exists = true;
	        return false;
	      }
	    }
	    if(already_exists){
	    	return false;
	    }
	    saved_elm.push(value);

	    this.addCookie(key,saved_elm);
	}

};
module.exports = cookieHelpers;
