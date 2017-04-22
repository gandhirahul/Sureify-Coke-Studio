/**
 * AudioList Component - Renders the Audio List view of audio meta data
 */
var React = require('react');
var AppConstants = require('../constants/AppConstants');
var apiCall = require('../utils/apiCall');
var cookieHelpers = require('../utils/cookieHelpers');
var AudioBox = require('../components/stateful/AudioBox');
var Search = require('../components/stateful/Search');
var Loader = require('../components/stateless/Loader');

var AudioList = React.createClass({
  getInitialState: function() {
    return {
      results:[],
      filteredData: [],
      showLoader:true
    };
  },
  componentWillMount: function(){

    var obj = {
     api : AppConstants.API_CLIENT.AUDIO_REC_DATA,
     successCB: this.successCallback,
     failureCB: this.failureCallback,
    }
    
    apiCall.get(obj);

  },
  render: function() {
    
    return (
      <div className="audio-list container">
        <div className="row">
          <div className="col-xs-12">
            <h1 className="text-center mb20">Best Coke Studio Songs</h1>
            {
              this.state.showLoader ?
              <Loader />
              :
              <div>
                <Search placeholder="Enter your Song and hit search button" handleSearch={this.handleSearch} />
                <AudioBox results={this.state.filteredData} />
              </div>
            }
          </div>
        </div>
      </div>
    );

  },
  /**
   * Success Callback 
   * @Props
   * @param {Object} res - res of api call
   */
  successCallback:function(res){
    this.toggleLoader(false);
    this.setState({
      results: res,
      filteredData: res
    });
  },
  /**
   * Failure Callback 
   * @Props
   * @param {Object} res - failure res of api call
   */
  failureCallback:function(res){
    this.toggleLoader(false);
    alert(res);
  },
  /**
   * Toggles the loader depending on the value 
   * @Props
   * @param {bool} value - boolean value
   */
  toggleLoader:function(value){
    this.setState({showLoader:value})
  },
   /**
   * Handles the data to be rendered based on search query
   * @Props
   * @param {bool} value - boolean value
   */
  handleSearch:function(value){
    
    var searchText = value && value.toLowerCase().trim();
    var filteredData = this.state.results.filter(function(elm,index){
      
      var songTitle = elm.song && elm.song.toLowerCase();
      if(songTitle.indexOf(searchText) > -1){
        return elm;
      }

    });
    this.setState({filteredData:filteredData})
  },
});


module.exports = AudioList;

