import React from 'react';
import moment from 'moment';
import {
  XYPlot,
  XAxis,
  YAxis,
  VerticalGridLines,
  HorizontalGridLines,
  LineMarkSeriesCanvas,
  LineMarkSeries,
  LineSeriesCanvas,
  LineSeries,
  Crosshair,
  Hint
} from 'react-vis';
import odp from '../../data/data_total_odp.json';
import pdp from '../../data/data_total_pdp.json';
import positif from '../../data/data_total_positif.json';
import './index.scss';
import Toggle from './Toggle';

export default class LineChartCumulative extends React.Component {
  state = {
    data: {
      odp: [],
      pdp: [],
      positif: []
    },
    used: 'all',
    strokeWidth: 1,
    showMarks: true,
    value: false,
    show: {
      odp: true,
      pdp: true,
      positif: true
    },
    colorType: {
      odp: '#e5f50f',
      pdp: '#f5a80f',
      positif: '#f50f0f'
    }
  };

  initData= () => {
    const odpTemp = odp.map(e=>({
      x: new Date(e.Date),
      y: e.Total
    }))
    const pdpTemp = pdp.map(e=>({
      x: new Date(e.Date),
      y: e.Total
    }))
    const positifTemp = positif.map(e=>({
      x: new Date(e.Date),
      y: e.Total
    }))
    this.setState({
      data: {
        odp: odpTemp,
        pdp: pdpTemp,
        positif: positifTemp,
      }
    })
  }
  onChangeToggle = (e) => {
    e.preventDefault();
    console.log(e.target.value)
    this.setState({used: e.target.value})
  }
  
  componentDidMount() {
    this.initData()
  }

  render() {
    const {
      colorType,
      data,
      used,
      strokeWidth,
      showMarks,
      value
    } = this.state;
    const lineSeriesProps = {
      animation: true,
      className: 'mark-series-example',
      sizeRange: [5, 15],
      opacityType: 'literal',
      strokeWidth,
      xType: 'time',
      onNearestX: d => this.setState({value: d})
    };
    let odpLineSeriesProps = {...lineSeriesProps, color: colorType['odp'], data: data['odp']} 
    let pdpLineSeriesProps = {...lineSeriesProps, color: colorType['pdp'], data: data['pdp']} 
    let positifLineSeriesProps = {...lineSeriesProps, color: colorType['positif'], data: data['positif']} 

    const SVGComponent = showMarks ? LineMarkSeries : LineSeries;
  
    return (
      <div className="lc-cumulative">
        <div className="lc-cumulative__content">
          <div className="lc-cumulative__tab">
            <button
              className={this.state.show.odp ? 'active': ''}
              onClick={() => {
                return this.setState({show: {
                ...this.state.show,
                odp: !this.state.show.odp
              }})}}
            >ODP</button>
            <button
              className={this.state.show.pdp ? 'active': ''}
              onClick={() => {
                return this.setState({show: {
                ...this.state.show,
                pdp: !this.state.show.pdp
              }})}}
            >PDP</button>
            <button
              className={this.state.show.positif ? 'active': ''}
              onClick={() => {
                return this.setState({show: {
                ...this.state.show,
                positif: !this.state.show.positif
              }})}}
            >Positif</button>
          </div>
          <XYPlot
            onMouseLeave={() => this.setState({value: false})}
            width={600}
            height={300}
            className="lc-cumulative__figure"
          >
            <VerticalGridLines />
            <HorizontalGridLines />
            <XAxis style={{text: {fontSize: 8}}} tickFormat={(v)=>moment(v).format('l')}/>
            <YAxis style={{text: {fontSize: 8}}}/>
            <SVGComponent {...odpLineSeriesProps} />
            <SVGComponent {...pdpLineSeriesProps} />       
            <SVGComponent {...positifLineSeriesProps} />
            {value && <Hint value={value} />}
          </XYPlot>
        </div>
        <Toggle onChange={this.onChangeToggle} used={this.state.used}/>
      </div>
    );
  }
}