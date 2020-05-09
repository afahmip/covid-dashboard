import React from 'react';
import {
  XYPlot,
  XAxis,
  YAxis,
  VerticalGridLines,
  HorizontalGridLines,
  LineSeries,
  Hint,
  DiscreteColorLegend
} from 'react-vis';
import {getData, months} from './utils';
import './index.scss';
import Toggle from './Toggle';
const ITEMS = [
  'ODP',
  'PDP',
  'Positif',
];

const COLORS = [
  '#e5f50f',
  '#f5a80f',
  '#f50f0f'
];

export default class LineChartCumulative extends React.Component {
  state = {
    data: {
      odp: [],
      pdp: [],
      positif: []
    },
    used: 'total',
    strokeWidth: 2,
    value: false,
    colorType: {
      odp: '#e5f50f',
      pdp: '#f5a80f',
      positif: '#f50f0f'
    }
  };

  initData= () => {
    const odpTemp = getData('odp')
    const pdpTemp = getData('pdp')
    const positifTemp = getData('positif')
    this.setState({
      data: {
        odp: odpTemp,
        pdp: pdpTemp,
        positif: positifTemp,
      }
    })
  }
  onChangeToggle = (e) => {
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
    let odpLineSeriesProps = {...lineSeriesProps, color: colorType['odp'], data: data.odp[used]} 
    let pdpLineSeriesProps = {...lineSeriesProps, color: colorType['pdp'], data: data.pdp[used]} 
    let positifLineSeriesProps = {...lineSeriesProps, color: colorType['positif'], data: data.positif[used]} 
  
    return (
      <>
        <h3 className="grafik-increment__title">Grafik Penyebaran Covid 19</h3>
        <div className="lc-cumulative">
          <div className="lc-cumulative__content">
            <XYPlot
              onMouseLeave={() => this.setState({value: false})}
              width={600}
              height={300}
              className="lc-cumulative__figure"
            >
              <VerticalGridLines />
              <HorizontalGridLines />
              <XAxis 
                style={{text: {fontSize: 8}}} 
                tickFormat={t=> 
                <tspan>
                  <tspan x="0">{`${new Date(t).getDate()}`}</tspan>
                  <tspan x="0" dy="1em">{`${months[new Date(t).getMonth()]}`}</tspan>
                </tspan>}/>
              <YAxis style={{text: {fontSize: 8}}}/>
              <LineSeries {...odpLineSeriesProps} />
              <LineSeries {...pdpLineSeriesProps} />       
              <LineSeries {...positifLineSeriesProps} />
              {value && <Hint value={value} />}
              
            </XYPlot>
            <DiscreteColorLegend
              colors={COLORS}
              orientation="horizontal"
              width={300}
              items={ITEMS}
              strokeWidth='2'
            />
          </div>
          <Toggle onChange={this.onChangeToggle} used={this.state.used}/>
        </div>
      </>
    );
  }
}