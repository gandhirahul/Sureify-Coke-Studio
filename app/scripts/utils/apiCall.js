/**
  * @desc Requests a network call via ajax
  * @param object obj- ajax call paramters
  * @return object - success or failure
*/
var $ = require('jquery')

var apiCall = {
	get:function(obj){

		$.ajax({
            url: obj.api,
            type: "GET",
       		contentType: 'application/json; charset=UTF-8',
            success: function(res) {
                obj.successCB(res);
            },
            error: function(res) {
            	var responseText = res.responseText ? JSON.parse(res.responseText) : {};
            	var error_msg = responseText.detail || 'Some error occured';

                obj.failureCB(error_msg);
            },
        })
	}
};
module.exports = apiCall;
