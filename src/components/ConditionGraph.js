import React,{useState} from 'react';
import {
  XYPlot, 
  XAxis, 
  YAxis, 
  AreaSeries,
  Crosshair,
  VerticalGridLines,
  HorizontalGridLines
} from 'react-vis';
import '../styles/ConditionGraph.css';
import condition_raw_positif from '../data/data_condition_positif.json'
import condition_raw_odp from '../data/data_condition_odp.json'
import condition_raw_pdp from '../data/data_condition_pdp.json'

const months  = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Ags','Sept','Oct','Nov','December'];

const process_odp = () => {
  const series_percent_pemantauan = []
  const series_percent_selesai = []
  const series_selesai = []
  const series_pemantauan = []
  condition_raw_odp.forEach((data,index)=>{
    const total = data.Pemantauan + data.Selesai
    series_pemantauan.push({x:new Date(data.Date),y: data.Pemantauan})
    series_selesai.push({x:new Date(data.Date),y: data.Selesai})
    series_percent_selesai.push({x:new Date(data.Date),y: (data.Selesai/total)*100})
    series_percent_pemantauan.push({x:new Date(data.Date),y: (data.Pemantauan/total)*100})
  })
  return {series_pemantauan,series_percent_selesai,series_selesai,series_percent_pemantauan}
}

const ConditionGraph = () => {
  const [odp_data,setODPData] = useState(process_odp())
  const [percentShow, setPercentShow] = useState(false)
  const [currentValue,setCurrValue] = useState(null)
  const start_date = condition_raw_pdp[0].Date
  return (
    <div className="condition-graph">
      <h1>Grafik Condition</h1>
      <XYPlot 
        width={900} height={300} 
        stackBy={percentShow?'y':''} xType={'time'}
        onMouseLeave={() => setCurrValue(null)}
        >
        <VerticalGridLines />
        <HorizontalGridLines />
        <XAxis
          tickFormat = {v=>    
          <tspan>
            <tspan x="0">{`${v.getDate()}`}</tspan>
            <tspan x="0" dy="1em">{`${months[v.getMonth()]}`}</tspan>
          </tspan>}
        />
        <YAxis />
        <AreaSeries
          animation={'woobly'}
          className="area-elevated-series-1"
          color="#79c7e3"
          onNearestXY= {value => setCurrValue({...value})}
          data={percentShow?odp_data.series_percent_selesai:odp_data.series_selesai}
        />
        <AreaSeries
          animation={'woobly'}
          className="area-elevated-series-2"
          color="#12939a"
          data={percentShow?odp_data.series_percent_pemantauan:odp_data.series_pemantauan}
        />
        {currentValue&&
          <Crosshair value={currentValue}/>
        }
      </XYPlot>
      <div className="grafik-increment__tool-container">
        <div className="grafik-increment__button-group">
          <button
          className={percentShow&&'selected'}
          onClick={()=> setPercentShow(true)}
          >Persentase</button>
          <button
          className={!percentShow&&'selected'}
          onClick={()=> setPercentShow(false)}
          >Jumlah</button>
        </div>
        <div className="grafik-increment__button-group">
          <button>ODP</button>
          <button>PDP</button>
          <button>Positif</button>
        </div>
      </div>
    </div>
  );
};

export default ConditionGraph;
