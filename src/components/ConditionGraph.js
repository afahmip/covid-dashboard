import React,{useState} from 'react';
import Fade from 'react-reveal/Fade';
import {
  XYPlot,
  XAxis,
  YAxis,
  AreaSeries,
  Hint,
  VerticalGridLines,
  HorizontalGridLines,
  DiscreteColorLegend,
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
  odp: [
    'selesai',
    'pemantauan'
  ],
  positif: [
    'sembuh',
    'meninggal',
    'dirawat',
  ]
}
const COLORS = {
  pdp: [
    '#56cc1f',
    '#046bd1'
  ],
  odp:[
    '#56cc1f',
    '#046bd1'
  ],
  positif:[
    '#56cc1f',
    '#ff2f00',
    '#ffbb00',
  ]
}
const ConditionGraph = () => {
  const [percentShow, setPercentShow] = useState(false)
  const [currentValue,setCurrValue] = useState(null)
  const [choosenData, setChoosenData] =  useState(allData.positif)
  const [nameGroup, setnameGroup] = useState('positif')
  const handlerChoosenData = (val) => {
    setChoosenData(allData[val])
    setnameGroup(val)
  }
  const dataHint = (name_param,index)=>{
    if (name_param==='odp') {
      if (!percentShow) return {
        pemantauan:condition_raw_odp[index.index].Pemantauan,
        selesai:condition_raw_odp[index.index].Selesai
      }
      const total = condition_raw_odp[index.index].Pemantauan + condition_raw_odp[index.index].Selesai
      return {
        pemantauan:((condition_raw_odp[index.index].Pemantauan/total)*100).toFixed(1),
        selesai:((condition_raw_odp[index.index].Selesai/total)*100).toFixed(1)
      }
    }
    else if(name_param==='pdp'){
      if(!percentShow) return {
        pengawasan:condition_raw_pdp[index.index].Pengawasan,
        selesai:condition_raw_pdp[index.index].Selesai
      }
      const total = condition_raw_pdp[index.index].Pengawasan+ condition_raw_pdp[index.index].Selesai
      return {
        pengawasan:((condition_raw_pdp[index.index].Pengawasan/total)*100).toFixed(1),
        selesai:((condition_raw_pdp[index.index].Selesai/total)*100).toFixed(1)
      }
    }
    else {
      if(!percentShow)return {
        sembuh:condition_raw_positif[index.index].Sembuh,
        meninggal:condition_raw_positif[index.index].Meninggal,
        rawat:condition_raw_positif[index.index].Rawat,
      }
      const total = condition_raw_positif[index.index].Rawat+ condition_raw_positif[index.index].Meninggal+condition_raw_positif[index.index].Sembuh
      return {
        sembuh:((condition_raw_positif[index.index].Sembuh/total)*100).toFixed(1),
        meninggal:((condition_raw_positif[index.index].Meninggal/total)*100).toFixed(1),
        rawat:((condition_raw_positif[index.index].Rawat/total)*100).toFixed(1),
      }
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
    <Fade delay={500}>
      <div className="condition-graph">
        <XYPlot
          width={625} height={300}
          stackBy="y"
          xType={'time'}
          yDomain={percentShow?[0,100]:''}
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
          {areaSeries('odp', COLORS.odp[0],choosenData.series_percent_selesai,choosenData.series_selesai)}
          {areaSeries('odp', COLORS.odp[1],choosenData.series_percent_pemantauan,choosenData.series_pemantauan)}
          {areaSeries('pdp', COLORS.pdp[0],choosenData.series_percent_selesai,choosenData.series_selesai)}
          {areaSeries('pdp', COLORS.pdp[1],choosenData.series_percent_pengawasan,choosenData.series_pengawasan)}
          {areaSeries('positif', COLORS.positif[0],choosenData.series_percent_sembuh,choosenData.series_sembuh)}
          {areaSeries('positif', COLORS.positif[1],choosenData.series_percent_meninggal,choosenData.series_meninggal)}
          {areaSeries('positif', COLORS.positif[2],choosenData.series_percent_rawat,choosenData.series_rawat)}
          {currentValue&&
            <Hint value={currentValue} align={{horizontal: Hint.ALIGN.AUTO, vertical: Hint.ALIGN.TOP_EDGE}}/>
          }
        </XYPlot>
        <DiscreteColorLegend
          colors={COLORS[nameGroup]}
          orientation="horizontal"
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
    </Fade>
  );
};

export default ConditionGraph;
