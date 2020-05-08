import React from 'react';
import { scaleLinear } from "d3-scale";
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import positiveData from '../data/data_kecamatan_positif.json';
import topoMap from '../topojson/bandung.json';

export class Choropleth extends React.Component {
  state = {
    data: null,
    maxPercentage: 0,
  };

  initData = () => {
    let data = {};
    let total = 0;
    let maxPercentage = 0;

    positiveData.forEach(d => {total += d.Positif});
    positiveData.forEach(d => {
      let name = d.Kecamatan.split(' ').join('');
      let percentage = d.Positif / total;

      if (percentage > maxPercentage) {
        maxPercentage = percentage;
      }
      data[name] = {
        amount: d.Positif,
        percentage,
      };
    });
    console.log(data);
    this.setState({data, maxPercentage});
  }

  renderMap = () => {
    const colorScale = scaleLinear()
      .domain([0, this.state.maxPercentage])
      .range(["#ffa899", "#ff2700"]);

    return (
      <ComposableMap
        projectionConfig={{
          scale: 120000,
          center: [107.65, -6.95]
        }}>
        <Geographies geography={topoMap}>
          {({ geographies }) =>
            geographies.map(geo => {
              let geoName = geo.properties.KECAMATAN.split(' ').join('');
              let geoData = this.state.data[geoName];
              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={colorScale(geoData.percentage)}
                  strokeWidth={0.25}
                  stroke={'#fff'}
                  style={{
                    hover: {
                      fill: '#F53'
                    }
                  }}
                />
              )
            })
          }
        </Geographies>
      </ComposableMap>
    )
  }

  componentDidMount = () => {
    this.initData();
  }

  render() {
    return (
      <>
        <div className="choropleth">
          {this.state.data ? this.renderMap() : null}
        </div>
      </>
    );
  }
}
