/**
 * RatingSection Component
 * @Props
 * @param {string} placeholder - Placeholder for input element
 * @param {callback} handleSearch - Fires the search event
 */
var Search = React.createClass({

  getInitialState: function() {

    return {
      value:''      
    };
  },
 
  render: function() {
    return (
      <div className='search-box'>
        <div className='input-wrapper'>
          <input type="text" value={this.state.value} placeholder={this.props.placeholder} onChange={this._handleChange} />    
        </div>
        <div className='button-wrapper'>
          <button className="search-button custom-button" onClick={this.props.handleSearch.bind(null,this.state.value)}>Search</button>
        </div>
      </div>
    )
  },
  _handleChange:function(e){
    this.setState({value:e.target.value});
  }
});
module.exports = Search;