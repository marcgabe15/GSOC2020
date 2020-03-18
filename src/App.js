import React from 'react';
import DeckGL from '@deck.gl/react';
import {PathLayer} from '@deck.gl/layers';
import {LineLayer} from '@deck.gl/layers';
import {StaticMap} from 'react-map-gl';
import trackdata from './data.json'
import trackdata2 from './data2.json'
import trackdata3 from './data3.json'
import trackdata4 from './data4.json'
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

const data_1 = [{
  name: "path-layer",
  color: [101, 147, 245],
  path: trackdata.features.map((val => val.geometry.coordinates))
}
]
const data_2 = [{
  name: "path-layer1",
  color: [255,0,0],
  path: trackdata2.features.map((val => val.geometry.coordinates))
}]
const data_3 = [{
  name: "path-layer2",
  color: [0,255,0],
  path: trackdata3.features.map((val => val.geometry.coordinates))
}]
const data4 = [{
  name: "path-layer3",
  color: [0,255,0],
  path: trackdata4.features.map((val => val.geometry.coordinates))

}]
class App extends React.Component {
  state = {
    path: []
  }

  _renderLayers() {
    return [
      new PathLayer({
        id:'path-layer',
        data: data_1,
        getWidth: data => 10,
        getColor: data => data.color,
        widthMinPixels: 7
      }),
      new PathLayer({
        id:'path-layer2',
        data: data_2,
        getWidth: data => 10,
        getColor: data => data.color,
        widthMinPixels: 7
      }),
      new PathLayer({
        id:'path-layer3',
        data: data_3,
        getWidth: data => 10,
        getColor: data => data.color,
        widthMinPixels: 7
      }),
      new PathLayer({
        id:'path-layer3',
        data: data4,
        getWidth: data => 10,
        getColor: data => data.color,
        widthMinPixels: 7
      }),
    ]
  }
  componentDidMount(){
  }
  render() {
    return (
      <DeckGL
        initialViewState={initialViewState}
        controller={true}
        layers={this._renderLayers()}
      >
        <StaticMap 
        // mapStyle={`mapbox://styles/mapbox/streets-v11`}
        mapboxApiAccessToken={MAPBOX_ACCESS_TOKEN} />
      </DeckGL>
    );
  }
}

export default App;
