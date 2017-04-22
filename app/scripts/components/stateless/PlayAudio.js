/**
 * PlayAudio Component
 * @Props
 * @param {string} url - URL of the audio
 */

var React = require('react');

var PlayAudio = React.createClass({
  getDefaultProps: function() {
    return {
      url: ''
    };
  },
  render: function() {

    return (
      <div className="play-audio">
        <audio controls>
          <source src={this.props.url} type="audio/ogg" />
          <source src={this.props.url} type="audio/mpeg" />
          Your browser does not support the audio element.
        </audio>
      </div>
    );

  }
});


module.exports = PlayAudio;

