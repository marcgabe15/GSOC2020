import React from 'react';
import DeckGL from '@deck.gl/react';
import {PathLayer} from '@deck.gl/layers';
import {StaticMap} from 'react-map-gl';
import axios from 'axios'
const access = require('./constants')

// Set your mapbox access token here
const MAPBOX_ACCESS_TOKEN = access.token
// Initial viewport settings
const initialViewState = {
  longitude: 7,
  latitude: 51,
  zoom: 7,
  pitch: 0,
  bearing: 0
};

class App extends React.Component {
  state = {
    paths: []
  }
  componentDidMount(){
    axios.get('https://envirocar.org/api/stable/tracks?limit=1000')
      .then(res => {
        res.data.tracks.forEach(element => {
          var uri = 'https://envirocar.org/api/stable/tracks/' + element.id
          axios.get(uri)
            .then(result => {
              var path = [{
                name: element.id,
                color: [0,255,0],
                path: result.data.features.map((val => val.geometry.coordinates))
              }]
              this.setState(prevstate => ({
                paths: [...prevstate.paths, path]
              }))
            })
        });
      })
      
  }

  _renderLayers() {
    var pathlayers = []
    this.state.paths.forEach(element => {
      pathlayers.push(
        new PathLayer({
          id: element.name,
          data: element,
          getWidth: data => 10,
          getColor: data => data.color,
          widthMinPixels: 7
        })
      )
    })
    return pathlayers
  }
  render() {
    return (
      <DeckGL
        initialViewState={initialViewState}
        controller={true}
        layers={this._renderLayers()}
      >
        <StaticMap 
        mapStyle={`mapbox://styles/mapbox/streets-v11`}
        mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN} />
      </DeckGL>
    );
  }
}

export default App;
