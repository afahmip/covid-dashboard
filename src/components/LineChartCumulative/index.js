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

function getRandomData() {
  return new Array(10).fill(0).map((row, i) => ({
    x: i,
    y: Math.random() * 20,
    color: Math.random() * 10
  }));
}

const randomData = getRandomData();

const colorRanges = {
  typeA: ['#59E4EC', '#0D676C'],
  typeB: ['#EFC1E3', '#B52F93']
};

const nextType = {
  typeA: 'typeB',
  typeB: 'typeA'
};

const nextModeContent = {
  canvas: 'SWITCH TO SVG',
  svg: 'SWITCH TO CANVAS'
};

const drawModes = ['canvas', 'svg'];

export default class LineChartCumulative extends React.Component {
  state = {
    drawMode: 1,
    data: {
      odp: [],
      pdp: [],
      positif: []
    },
    used: 'odp',
    strokeWidth: 1,
    showMarks: true,
    value: false,
    hideComponent: false,
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
  
  componentDidMount() {
    this.initData()
  }

  render() {
    const {
      colorType,
      drawMode,
      data,
      used,
      hideComponent,
      strokeWidth,
      showMarks,
      value
    } = this.state;
    const lineSeriesProps = {
      animation: true,
      className: 'mark-series-example',
      sizeRange: [5, 15],
      color: colorType[used],
      opacityType: 'literal',
      strokeWidth,
      data: data[used],
      yType: 'time',
      onNearestX: d => this.setState({value: d})
    };
    const SVGComponent = showMarks ? LineMarkSeries : LineSeries;
    const CanvasComponent = showMarks ? LineMarkSeriesCanvas : LineSeriesCanvas;

    const mode = drawModes[drawMode];
    return (
      <div className="canvas-wrapper">
        <div className="canvas-example-controls">
          <button
            onClick={() => this.setState({used: this.state.used === 'odp' ? 'pdp': 'odp'})}
          >Change Data</button>
          {/* <div> {`Mode: ${mode}`} </div>
          <button
            onClick={() => this.setState({drawMode: (drawMode + 1) % 2})}
            buttonContent={nextModeContent[mode]}
          />
          <button
            onClick={() => this.setState({showMarks: !showMarks})}
            buttonContent={showMarks ? 'HIDE MARKS' : 'SHOW MARKS'}
          />
          <button
            onClick={() => this.setState({colorType: nextType[colorType]})}
            buttonContent={`TOGGLE COLOR to ${nextType[colorType]}`}
          />
          <button
            onClick={() =>
              this.setState({strokeWidth: strokeWidth === 1 ? 2 : 1})
            }
            buttonContent={'TOGGLE STROKEWIDTH'}
          />
          <button
            onClick={() => this.setState({hideComponent: !hideComponent})}
            buttonContent={hideComponent ? 'SHOW' : 'HIDE'}
          /> */}
        </div>
        <XYPlot
          onMouseLeave={() => this.setState({value: false})}
          width={600}
          height={300}
        >
          <VerticalGridLines />
          <HorizontalGridLines />
          <XAxis tickFormat={(v)=>moment(v).format('l')}/>
          <YAxis />
          {mode === 'canvas' && <CanvasComponent {...lineSeriesProps} />}
          {mode === 'svg' && <SVGComponent {...lineSeriesProps} />}
          {value && <Hint value={value} />}
        </XYPlot>
      </div>
    );
  }
}