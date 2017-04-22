/**
 * App Component - Adds App header to the application
 */

var React = require('react');
var AppHeader = require('./stateful/AppHeader');

var App = React.createClass({

  render: function() {

    return (
      <div className="app">
        <AppHeader history={this.props.history}/>
      </div>
    );

  }
});


module.exports = App;

