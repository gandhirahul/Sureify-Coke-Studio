/**
 * Activity Component  - Renders user activity history
 */
var React = require('react');
var cookieHelpers = require('../utils/cookieHelpers');
var AudioBox = require('../components/stateful/AudioBox');

var Activity = React.createClass({
  getInitialState: function() {
    return {
      liked_audio: [],
      downloaded_audio: []
    };
  },
  componentWillMount: function(){
    var liked_audio = cookieHelpers.getCookie('liked_audio');
    var downloaded_audio = cookieHelpers.getCookie('downloaded_audio');

    liked_audio = liked_audio ? liked_audio : [];
    downloaded_audio = downloaded_audio ? downloaded_audio : []    

    this.setState({
      liked_audio: liked_audio,
      downloaded_audio: downloaded_audio
    });

  },
  render: function() {
    
    return (
      <div className="audio-list container">
        <div className="row">
          <div className="col-xs-12">
            <h1 className="text-center mb20">Activity History</h1>

            <h3 className="text-left mb10 m-lr-15">Liked History</h3>
            <div className="clearfix">
            {
              this.state.liked_audio.length
              ?
              <AudioBox results={this.state.liked_audio} alreadyLiked={true}/>
              :
              <div className="mb10 m-lr-15">You haven't liked any audio.</div>
            }
            </div>

            <div className="clearfix">
            <h3 className="text-left mb10 m-lr-15">Download History</h3>
            {
              this.state.downloaded_audio.length 
              ?
              <AudioBox results={this.state.downloaded_audio} />
              :
              <div className="mb10 m-lr-15">You haven't download any audio.</div>
            }
            </div>

          </div>
        </div>
      </div>
    );

  }

});


module.exports = Activity;

