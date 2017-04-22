/**
 * AudioBox Component
 * @Props
 * @param {object[]} data - state object of audio card
 */

var React = require('react');

var PlayAudio = require('../stateless/PlayAudio');
var AudioActions = require('../stateful/AudioActions');

var AudioBox = React.createClass({
 
  getDefaultProps: function() {
    return {
      results: []
    };
  },

  render: function() {
    var props = this.props,
        results = props.results;
    
    if(!results || !results.length){
      return null;
    }

    return (
      <div className="audio-section row">
      {
        results.map(function(elm,index){
              
          return <div className="audio-box col-xs-12 col-sm-4 mb10"  key={index}>
                  <div className="br-1 pd-15 h-300">
                    <div className="row">
                      <div className="col-xs-12">
                        <div className="mb5">
                          <strong>{elm.song}</strong>
                        </div>
                        <div className="row">
                          <div className="col-xs-12">
                            <img className="cover-img" src={elm.cover_image} />
                          </div>
                          <div className="col-xs-12">
                            <div><strong>Artists: </strong>{elm.artists}</div>
                            <PlayAudio url={elm.url} />
                          </div>
                        </div>
                        <AudioActions elm={elm} alreadyLiked={props.alreadyLiked}/>
                      </div>
                    </div>
                  </div>
                </div>
          })
      }
      </div>
    );
  }
  
});

module.exports = AudioBox;
