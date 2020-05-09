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
const process_pdp = () =>{
  const series_percent_pengawasan = []
  const series_percent_selesai = []
  const series_selesai = []
  const series_pengawasan = []
  condition_raw_pdp.forEach((data,index)=>{
    const total = data.Pengawasan + data.Selesai
    series_pengawasan.push({x:new Date(data.Date),y: data.Pengawasan})
    series_selesai.push({x:new Date(data.Date),y: data.Selesai})
    series_percent_selesai.push({x:new Date(data.Date),y: (data.Selesai/total)*100})
    series_percent_pengawasan.push({x:new Date(data.Date),y: (data.Pengawasan/total)*100})
  })
  return {series_pengawasan,series_percent_selesai,series_selesai,series_percent_pengawasan}
}
const process_positif = () =>{
  const series_percent_sembuh = []
  const series_percent_meninggal = []
  const series_percent_rawat=[]
  const series_meninggal = []
  const series_sembuh = []
  const series_rawat = []
  
  condition_raw_positif.forEach((data,index)=>{
    const total = data.Meninggal + data.Sembuh + data.Rawat
    series_sembuh.push({x:new Date(data.Date),y: data.Sembuh})
    series_meninggal.push({x:new Date(data.Date),y: data.Meninggal})
    series_rawat.push({x:new Date(data.Date),y: data.Rawat})
    series_percent_meninggal.push({x:new Date(data.Date),y: (data.Meninggal/total)*100})
    series_percent_sembuh.push({x:new Date(data.Date),y: (data.Sembuh/total)*100})
    series_percent_rawat.push({x:new Date(data.Date),y: (data.Rawat/total)*100})
  })
  return {series_sembuh,series_percent_meninggal,series_meninggal,series_percent_sembuh,series_percent_rawat,series_rawat}
}
const allData = {
  pdp: process_pdp(),
  odp: process_odp(),
  positif: process_positif()
}
const ConditionGraph = () => {
  const [percentShow, setPercentShow] = useState(false)
  const [currentValue,setCurrValue] = useState(null)
  const [choosenData, setChoosenData] =  useState(allData.odp)
  const [nameGroup, setnameGroup] = useState('odp')
  const handlerChoosenData = (val) => {
    setChoosenData(allData[val])
    setnameGroup(val)
  }
  return (
    <div className="condition-graph">
      <h1>Grafik Condition</h1>
      <XYPlot 
        width={900} height={300} 
        stackBy={'y'} xType={'time'}
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
        <YAxis 
          tickFormat={v=>(percentShow?`${v}%`:(v>=1000?(`${v/1000}k`):v))}
        />
        {(nameGroup==='odp'||nameGroup==='pdp')&&<AreaSeries
          animation={'woobly'}
          className="area-elevated-series-1"
          color="#29a97e"
          onNearestXY= {value => setCurrValue({...value})}
          data={percentShow?choosenData.series_percent_selesai:choosenData.series_selesai}
        />}
        {nameGroup==='odp'&&<AreaSeries
          animation={'woobly'}
          className="area-elevated-series-2"
          color="#dfd060"
          data={percentShow?choosenData.series_percent_pemantauan:choosenData.series_pemantauan}
        />}
         {nameGroup==='pdp'&&<AreaSeries
          animation={'woobly'}
          className="area-elevated-series-2"
          color="#dfd060"
          data={percentShow?choosenData.series_percent_pengawasan:choosenData.series_pengawasan}
        />}
        {nameGroup==='positif'&&<AreaSeries
          animation={'woobly'}
          className="area-elevated-series-2"
          color="#F16464"
          data={percentShow?choosenData.series_percent_meninggal:choosenData.series_meninggal}
        />}
        {nameGroup==='positif'&&<AreaSeries
          animation={'woobly'}
          className="area-elevated-series-2"
          color="#29a97e"
          data={percentShow?choosenData.series_percent_sembuh:choosenData.series_sembuh}
        />}
        {nameGroup==='positif'&&<AreaSeries
          animation={'woobly'}
          className="area-elevated-series-2"
          color="#dfd060"
          data={percentShow?choosenData.series_percent_rawat:choosenData.series_rawat}
        />}
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
          <button className={nameGroup==='odp'&&'selected'} onClick={()=> handlerChoosenData('odp')}>ODP</button>
          <button className={nameGroup==='pdp'&&'selected'} onClick={()=> handlerChoosenData('pdp')}>PDP</button>
          <button className={nameGroup==='positif'&&'selected'} onClick={()=> handlerChoosenData('positif')}>Positif</button>
        </div>
      </div>
    </div>
  );
};

export default ConditionGraph;
