import React from 'react';
import Fade from 'react-reveal/Fade';
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
  '#056CD1',
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
    value: false
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
      onNearestXY: (d, i) => {
        const value = {
          ...d,
          date: d.x,
          odp: data.odp[used][i.index].y,
          pdp: data.pdp[used][i.index].y,
          positif: data.positif[used][i.index].y,
        }
        this.setState({value: value})
      }
    };
    let odpLineSeriesProps = {...lineSeriesProps, color: COLORS[0], data: data.odp[used]}
    let pdpLineSeriesProps = {...lineSeriesProps, color: COLORS[1], data: data.pdp[used]}
    let positifLineSeriesProps = {...lineSeriesProps, color: COLORS[2], data: data.positif[used]}

    return (
      <Fade bottom cascade>
        <div className="lc-cumulative">
          <div className="lc-cumulative__content">
            <XYPlot
              onMouseLeave={() => this.setState({value: false})}
              width={780}
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
              {value && <Hint value={value} align={{horizontal: Hint.ALIGN.AUTO, vertical: Hint.ALIGN.TOP_EDGE}}/>}
              {/* {value &&
              <Crosshair values={[value]} />} */}
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
      </Fade>
    );
  }
}