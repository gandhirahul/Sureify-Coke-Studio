/**
 * Header Component - Renders the headers for the app
 */
var React = require('react');
var Link = require('react-router-dom').Link;
var Header = React.createClass({
  
  render: function() {

    return (
      <div className="header">
        <nav className="navbar navbar-default navbar-fixed-top">
    		  <div className="container">
    		    <div className="navbar-header">
              <Link to="/" className="navbar-brand">
                <span>Sureify — Coke Studio</span>
              </Link>
    		    </div>
            <div className="nav pull-right">
              <Link to="/activity" className="activity-btn">
                <span>Activity History</span>
              </Link>
            </div>
     		  </div>
	      </nav>
      </div>
    );

  }

});


module.exports = Header;

