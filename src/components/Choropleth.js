import React from 'react';
import { scaleLinear } from "d3-scale";
import ReactTooltip from "react-tooltip";
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import { toTitleCase } from '../helper';
import '../styles/choropleth.scss';
import positiveData from '../data/data_kecamatan_positif.json';
import pdpData from '../data/data_kecamatan_pdp.json';
import odpData from '../data/data_kecamatan_odp.json';
import topoMap from '../topojson/bandung.json';

const status = {
  POSITIVE: 0,
  PDP: 1,
  ODP: 2,
};

const colors = {
  POSITIVE: {
    start: '#ffcbc2',
    end: '#ff2700',
    hover: '#bd1c00',
  },
  PDP: {
    start: '#ffe2c2',
    end: '#FF8802',
    hover: '#c96b00',
  },
  ODP: {
    start: '#bddeff',
    end: '#046bd1',
    hover: '#0053a6',
  },
}

export class Choropleth extends React.Component {
  state = {
    data: null,
    color: null,
    maxAmount: 0,
    showTooltip: false,
    activeData: null,
    activeOption: status.POSITIVE,
  };

  initColor = () => {
    let color;
    const {activeOption} = this.state;
    if (activeOption === status.POSITIVE) color = colors.POSITIVE;
    if (activeOption === status.PDP) color = colors.PDP;
    if (activeOption === status.ODP) color = colors.ODP;
    this.setState({color});
  }

  initData = option => {
    let data = {}, baseData;
    let maxAmount = 0;

    if (option === status.POSITIVE) baseData = positiveData;
    if (option === status.PDP) baseData = pdpData;
    if (option === status.ODP) baseData = odpData;

    baseData.forEach(d => {
      let amount = 0;
      let numbers = {...d};
      let name = d.Kecamatan.split(' ').join('');

      if (option === status.POSITIVE) {
        amount = d.Positif;
        delete numbers.Positif;
      }
      if (option === status.PDP) amount = d.Dirawat + d.Selesai;
      if (option === status.ODP) amount = d.Dipantau + d.Selesai;
      if (amount > maxAmount) maxAmount = amount;

      delete numbers.Kecamatan;
      data[name] = {
        name: toTitleCase(d.Kecamatan),
        amount,
        numbers,
      };
    });
    this.setState({data, maxAmount});
    this.initColor();
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
            {Object.keys(activeData.numbers).map((key, i) => (
              <p key={i}>{key}:&nbsp;{activeData.numbers[key]}</p>
            ))}
          </div>
        ) : null}
      </ReactTooltip>
    );
  }

  renderMap = () => {
    const {color} = this.state;
    const colorScale = scaleLinear()
      .domain([0, this.state.maxAmount])
      .range([color.start, color.end]);

    return (
      <>
        {this.renderToooltip()}
        <ComposableMap
          data-tip=""
          height={520}
          projection="geoMercator"
          projectionConfig={{
            scale: 220000,
            center: [107.643, -6.902]
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
                    fill={colorScale(geoData.amount)}
                    strokeWidth={0.3}
                    stroke={'#fff'}
                    onMouseEnter={() => this.setActiveData(geoName)}
                    onMouseLeave={() => {
                      this.setState({showTooltip: false, activeData: null});
                    }}
                    style={{
                      hover: {
                        fill: color.hover
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
    this.setState({activeOption: option}, () => {
      this.initData(option);
    });
  }

  componentDidMount = () => {
    this.initData(this.state.activeOption);
  }

  render() {
    const {activeOption, color} = this.state;
    let gradientStyle;

    if (color) {
      gradientStyle = {
        backgroundImage: `linear-gradient(0deg, ${color.start}, ${color.end})`
      }
    }

    return (
      <>
        <div className="choropleth-wrapper">
          <div className="choropleth">
            {this.state.data ? this.renderMap() : null}
          </div>
          <div className="choropleth-toolbar">
            <div className="choropleth-toggles">
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
            <div className="choropleth-gradient">
              <div className="gradient" style={gradientStyle} />
              <div className="values">
                <p>{this.state.maxAmount}</p>
                <p>{Math.floor(this.state.maxAmount / 2)}</p>
                <p>0</p>
              </div>
            </div>
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
