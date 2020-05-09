import React,{useState} from 'react'
import {
  XYPlot, 
  XAxis, 
  YAxis, 
  LineSeries,
  Hint
} from 'react-vis';

import '../styles/GraphicIncrement.css';
import total_raw_positif from '../data/data_total_positif.json'
import total_raw_odp from '../data/data_total_odp.json'
import total_raw_pdp from '../data/data_total_pdp.json'

const series = (raw_data) => {
  const arr = []
  raw_data.forEach((data,index) => {
    if (index > 0) arr.push({x: new Date(data.Date), y: data.Total - raw_data[index-1].Total})
  })
  return arr
}
const months  = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Ags','Sept','Oct','Nov','December'];
const all_data = {
  'Positif':series(total_raw_positif),
  'ODP':series(total_raw_odp),
  'PDP':series(total_raw_pdp),
}
export const GraphIncrement = () => {
  const PSBB_DATE = new Date('22 April 2020 07:00:00')
  const [mode_psbb, setModePSBB] = useState(false)
  const [after_psbb, setAfterPSBB] = useState(true)
  const [showed_data,setShowedData] = useState({group:'Positif',data:series(total_raw_positif)})
  const [currentValue,setCurrValue] = useState(null)
  const handlerShowedData = (val) =>{
    setShowedData({group:val,data:all_data[val]})
  }
  const handlerPSBB = (val) => {
    if((after_psbb === val)&&mode_psbb) setModePSBB(false)
    else setModePSBB(true)
    setAfterPSBB(val)
  }
  return (
    <section className="grafik-increment">
      <h1 className="grafik-increment__title">Grafik Kenaikan Warga Covid 19 ({showed_data.group}) {mode_psbb&&`${after_psbb?'Sesudah':'Sebelum'} PSBB`}</h1>
      <XYPlot 
        xType="time"
        width={900} 
        height={300}
        onMouseLeave={() => setCurrValue(null)}
        >
        <XAxis 
          // hideTicks
          tickFormat={t=> 
          <tspan>
            <tspan x="0">{`${t.getDate()}`}</tspan>
            <tspan x="0" dy="1em">{`${months[t.getMonth()]}`}</tspan>
          </tspan>}/>
        <YAxis/>
        <LineSeries 
        animation={'woobly'} 
        data={
          mode_psbb?
          showed_data.data.filter(data=>after_psbb?data.x.getTime() > PSBB_DATE.getTime():data.x.getTime() <= PSBB_DATE.getTime())
          :showed_data.data} 
        onNearestXY= {value => setCurrValue({...value})}
        color="#F16464"
        />
        {currentValue&&
          <Hint value={currentValue}/>
        }
      </XYPlot>
      {/* TODO: GANTI NAMA SEMANTIC MODE PSBB */}
      <div className="grafik-increment__tool-container">
        <div className="grafik-increment__button-group">
          <button 
            className={!after_psbb&&mode_psbb&&'selected'} 
            onClick={()=> handlerPSBB(false)}>Sebelum</button>
          <button
            className={after_psbb&&mode_psbb&&'selected'} 
            onClick={()=> handlerPSBB(true)}>Sesudah</button>
        </div>
        <div className="grafik-increment__button-group">
          <button className={showed_data.group==='ODP'&&'selected'} onClick={()=> handlerShowedData('ODP')}>ODP</button>
          <button className={showed_data.group==='PDP'&&'selected'} onClick={()=> handlerShowedData('PDP')}>PDP</button>
          <button className={showed_data.group==='Positif'&&'selected'} onClick={()=> handlerShowedData('Positif')}>Positif</button>
        </div>
      </div>
    </section>
  )
}
