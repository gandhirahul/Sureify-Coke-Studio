/**
 * Index Component - Bootstraps the application and manages routing
 */
var React = window.React = require('react');
var ReactDOM = require("react-dom");
var mountNode = document.getElementById("app");

var Router = require('react-router').Router;
var Route = require('react-router').Route;
var IndexRoute = require('react-router').IndexRoute;
var IndexLink = require('react-router').IndexLink;

var createBrowserHistory = require('history').createBrowserHistory;
var history = createBrowserHistory();

var Root = require("./components/Root");
var AudioList = require("./pages/AudioList");
var Activity = require("./pages/Activity");

var Index = React.createClass({

	  render: function() {

		return	<Router history={history}>
				  <Root>
				    <Route exact path="/" component={AudioList} />
				    <Route path="/activity" component={Activity} />
				  </Root>
				</Router>
	  }
});
ReactDOM.render(<Index />, mountNode);
