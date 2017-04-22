/**
 * AudioActions Component
 * @Props
 * @param {object} Audio object - Contains the details of the audio
 */

var React = require('react');
var cookieHelpers = require('../../utils/cookieHelpers');

var AudioActions = React.createClass({
  getDefaultProps: function() {
    return {
      elm: {}
    };
  },
  getInitialState: function() {

    return {
      liked: false
    };
  },
  render: function() {
    var elm = this.props && this.props.elm;
    if(!elm){
      return null;
    }

    return (
      <div className="row">
        <div className="col-xs-6">
          <span onClick={this.likeAudio.bind(null,elm)}>
          {
            this.props.alreadyLiked || this.state.liked
            ?
            "Liked"
            :
            "Like"
          }
          </span>
        </div>
        <div className="col-xs-6 text-right">
          <a href={elm.url} onClick={this.trackDownload.bind(null,elm)} download="bestcokestudio.mp3">Download</a>
        </div>
      </div>
    );

  },
  likeAudio: function (elm){
    this.setState({liked:true});
    if(this.props.alreadyLiked){
      return false;
    }
    cookieHelpers.updateCookie('liked_audio',elm);
  },
  trackDownload:function(elm){
    cookieHelpers.updateCookie('downloaded_audio',elm);
  }

});


module.exports = AudioActions;

