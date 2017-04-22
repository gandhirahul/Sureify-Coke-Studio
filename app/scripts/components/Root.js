/**
 * Root Component - Renders the children
 */

var React = require('react');
var Header = require('./stateless/Header');

var Root = React.createClass({
  render: function() {
    return  <div>
    			<Header/>
    			{this.props.children}
			</div>

  }
});

module.exports = Root;
