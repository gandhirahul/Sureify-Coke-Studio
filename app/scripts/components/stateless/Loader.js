/**
 * Loader Component - Shows Loading gif
 */

var React = require('react');

var Loader = React.createClass({
  render: function() {
    
    return (
      	<div className="loader text-center">
			<img src="images/ajax-loader.gif" />
		</div>
    );

  }
});


module.exports = Loader;


