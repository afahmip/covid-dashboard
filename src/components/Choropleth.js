import React from 'react';
import { scaleLinear } from "d3-scale";
import ReactTooltip from "react-tooltip";
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import { toTitleCase } from '../helper';
import '../styles/choropleth.scss';
import positiveData from '../data/data_kecamatan_positif.json';
import topoMap from '../topojson/bandung.json';

const status = {
  POSITIVE: 0,
  PDP: 1,
  ODP: 2,
};

export class Choropleth extends React.Component {
  state = {
    data: null,
    maxPercentage: 0,
    showTooltip: false,
    activeData: null,
    activeOption: status.POSITIVE,
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
        name: toTitleCase(d.Kecamatan),
        amount: d.Positif,
        bedrest: d.Dirawat,
        cured: d.Sembuh,
        dead: d.Meninggal,
        percentage,
      };
    });
    console.log(data);
    this.setState({data, maxPercentage});
  }

  setActiveData = name => {
    this.setState({
      showTooltip: true,
      activeData: this.state.data[name]
    });
  }

  renderToooltip = () => {
    const {activeData} = this.state;
    return (
      <ReactTooltip>
        {this.state.showTooltip ? (
          <div className="tooltip">
            <h1>{activeData.name}</h1>
            <p>Positif: {activeData.amount}</p>
            <p>Dirawat: {activeData.bedrest}</p>
            <p>Sembuh: {activeData.cured}</p>
            <p>Meninggal: {activeData.dead}</p>
          </div>
        ) : null}
      </ReactTooltip>
    );
  }

  renderMap = () => {
    const maxWidth = window.innerWidth;
    const colorScale = scaleLinear()
      .domain([0, this.state.maxPercentage])
      .range(["#ffa899", "#ff2700"]);

    return (
      <>
        {this.renderToooltip()}
        <ComposableMap
          data-tip=""
          width={maxWidth / 2.5}
          projection="geoMercator"
          projectionConfig={{
            scale: 170000,
            center: [107.63, -6.93]
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
                    onMouseEnter={() => this.setActiveData(geoName)}
                    onMouseLeave={() => {
                      this.setState({showTooltip: false, activeData: null});
                    }}
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
      </>
    )
  }

  chooseOption = option => {
    this.setState({activeOption: option});
  }

  componentDidMount = () => {
    this.initData();
  }

  render() {
    const {activeOption} = this.state;
    return (
      <>
        <div className="choropleth-wrapper">
          <div className="choropleth">
            {this.state.data ? this.renderMap() : null}
          </div>
          <div className="choropleth-toolbar">
            <h1>Pilih salah satu data<br/>di bawah ini:</h1>
            <button
              onClick={() => this.chooseOption(status.POSITIVE)}
              className={`
                choropleth-option positive
                ${activeOption === status.POSITIVE ? 'active' : ''}
              `}>
              <div />Positif
            </button>
            <button
              onClick={() => this.chooseOption(status.PDP)}
              className={`
                choropleth-option pdp
                ${activeOption === status.PDP ? 'active' : ''}
              `}>
              <div />PDP
            </button>
            <button
              onClick={() => this.chooseOption(status.ODP)}
              className={`
                choropleth-option odp
                ${activeOption === status.ODP ? 'active' : ''}
              `}>
              <div />ODP
            </button>
          </div>
        </div>
        <p className="caption">
          Peta choropleth persebaran COVID-19 di Kota Bandung.<br/>
          Hover pada region untuk melihat detail tiap kecamatan.
        </p>
      </>
    );
  }
}
