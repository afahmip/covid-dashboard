import React,{useState} from 'react';
import {
  XYPlot, 
  XAxis, 
  YAxis, 
  AreaSeries,
  Hint,
  VerticalGridLines,
  HorizontalGridLines,
  DiscreteColorLegend
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
const ITEMS = {
  pdp: [
    'selesai',
    'pengawasan'
  ],
  odp:[
    'selesai',
    'pemantauan'
  ],
  positif:[
    'sembuh',
    'dirawat',
    'meninggal'
  ]
}
const COLORS = {
  pdp: [
    '#29a97e',
    '#f5a80f'
  ],
  odp:[
    '#29a97e',
    '#f5a80f'
  ],
  positif:[
    '#29a97e',
    '#f5a80f',
    '#F16464'
  ]
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
  const dataHint = (name_param,index)=>{
    console.log(index.index)
    if (name_param==='odp') return {
      pemantauan:condition_raw_odp[index.index].Pemantauan,
      selesai:condition_raw_odp[index.index].Selesai
    } 
    else if(name_param==='pdp') return {
      pengawasan:condition_raw_pdp[index.index].Pengawasan,
      selesai:condition_raw_odp[index.index].Selesai
    }
    else return {
      sembuh:condition_raw_positif[index.index].Sembuh,
      meninggal:condition_raw_positif[index.index].Meninggal,
      rawat:condition_raw_positif[index.index].Rawat,
    }
  }
  const areaSeries = (name_param,color,data_percent,data_kum) =>{
    return (
      nameGroup===name_param && 
      <AreaSeries
      animation={'woobly'}
      color={color}
      data={percentShow?data_percent:data_kum}
      onNearestXY={(v,i)=> {
        setCurrValue({
        ...v,
        ...dataHint(name_param,i)
      })}}
      />)
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
          style={{text: {fontSize: 8}}}
        />
        {areaSeries('odp','#29a97e',choosenData.series_percent_selesai,choosenData.series_selesai)}
        {areaSeries('odp','#f5a80f',choosenData.series_percent_pemantauan,choosenData.series_pemantauan)}
        {areaSeries('pdp','#29a97e',choosenData.series_percent_selesai,choosenData.series_selesai)}
        {areaSeries('pdp','#f5a80f',choosenData.series_percent_pengawasan,choosenData.series_pengawasan)}
        {areaSeries('positif','#F16464',choosenData.series_percent_meninggal,choosenData.series_meninggal)}
        {areaSeries('positif','#29a97e',choosenData.series_percent_sembuh,choosenData.series_sembuh)}
        {areaSeries('positif','#f5a80f',choosenData.series_percent_rawat,choosenData.series_rawat)}
        {currentValue&&
          <Hint value={currentValue} align={{horizontal: Hint.ALIGN.AUTO, vertical: Hint.ALIGN.TOP_EDGE}}/>
        }
      </XYPlot>
      <DiscreteColorLegend
        colors={COLORS[nameGroup]}
        orientation="horizontal"
        width={300}
        items={ITEMS[nameGroup]}
        strokeWidth='10'
      />
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
