import React from 'react';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { apiResponse: "", currentArtist: null, currentTrack: 1 };
  }

  callAPI() {
    fetch("http://localhost:9000/")
      .then(res => res.text())
      .then(res => this.setState({ apiResponse: res }));
  }

  componentWillMount() {
    this.callAPI();
  }
  showSongsByArtist = (artist) => {
    this.setState({ currentArtist: artist });
  };

  getTrackById = (id) => {
    console.log(id);
    return (
      <Track trackId={id} showArtist={true} showSongsByArtist={this.showSongsByArtist} />
    );
  }

  changeCurrentTrack = (event) => {
    console.log(event.target.value)
    this.setState({ currentTrack: parseInt(event.target.value) });
  }

  render() {
    return (
      <div className="App">
        {/* <header className="App-header">
          <p className="App-intro">{this.state.apiResponse}</p>

        </header> */}

        <ArtistPopUp artist={this.state.currentArtist} />
        <div class="input-group">
          <input type="text" className="form-control" placeholder="Enter ID" aria-label="trackId" onChange={this.changeCurrentTrack} />
        </div>

        <table className="table">
          <tr>
            <th>ID</th>
            <th>Artist</th>
            <th>Song</th>
          </tr>
          {this.getTrackById(this.state.currentTrack)}
        </table>

      </div>
    );
  }
}

class Track extends React.Component {

  constructor(props) {
    super(props);
    this.state = { apiResponse: { id: null, artist: null, title: null } };
  }

  callAPI() {
    fetch("http://localhost:9000/track/" + this.props.trackId)
      .then(res => res.text())
      .then(res => {
        let parsedJson = JSON.parse(res);
        if (parsedJson.err) {
          return;
        }
        this.setState({ apiResponse: parsedJson })
      });

  }

  componentDidUpdate(prevProps) {
    if (prevProps.trackId !== this.props.trackId)
      this.callAPI();

  }

  componentDidMount = () => this.callAPI();

  callShowSongsByArtist = () => {
    //call the api and get all songs by artist
    this.props.showSongsByArtist(this.state.apiResponse.artist);
  }

  render() {
    return (
      <tr>
        <td>{this.state.apiResponse.id}</td>
        {
          this.props.showArtist ?
            <td>
              <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#authorModal" onClick={this.callShowSongsByArtist}>
                {this.state.apiResponse.artist}
              </button>
            </td >
            : null
        }
        <td>{this.state.apiResponse.title}</td>
      </tr >
    );
  }


}


class ArtistPopUp extends React.Component {

  constructor(props) {
    super(props);
    this.state = { apiResponse: { id: null, artist: null, title: null } };
  }
  render() {
    return (


      <div className="modal fade" id="authorModal" tabindex="-1" role="dialog" aria-labelledby="authorModalLabel" aria-hidden="true">
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">{this.props.artist}</h5>
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">
              <Track showArtist={false} trackId={1} />
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>


    );
  }
  showSongsByArtist(artist) {

  };
}
export default App;
