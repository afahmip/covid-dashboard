import React from 'react';
import { scaleLinear } from "d3-scale";
import { ComposableMap, ZoomableGroup, Geographies, Geography } from 'react-simple-maps';
import { geoPatterson } from 'd3-geo-projection';
import topo from '../topojson/bandung.json';

const colorScale = scaleLinear()
  .domain([0.29, 0.68])
  .range(["#ffedea", "#ff5233"]);

export class Choropleth extends React.Component {
  state = {
    data: {}
  };

  render() {
    return (
      <>
        <p>test</p>
        <div className="choropleth">
          <ComposableMap
            projectionConfig={{
              scale: 120000,
              center: [107.65, -6.95]
            }}>
            <Geographies geography={topo}>
              {({ geographies }) =>
                geographies.map(geo => {
                  const colorKey = Math.random() * (0.68 - 0.29) + 0.29;
                  const baseColor = scaleLinear().domain()
                  return (
                    <Geography
                      key={geo.rsmKey}
                      geography={geo}
                      fill={colorScale(colorKey)}
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
        </div>
      </>
    );
  }
}
