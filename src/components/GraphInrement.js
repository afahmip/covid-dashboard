import React,{useState} from 'react'
import {
  XYPlot, 
  XAxis, 
  YAxis, 
  LineSeries,
  Hint
} from 'react-vis';
import total_raw_positif from '../data/data_total_positif.json'
import total_raw_odp from '../data/data_total_odp.json'
import total_raw_pdp from '../data/data_total_pdp.json'

const series = (raw_data) => {
  const arr = []
  raw_data.map((data,index) => {
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
  return (
    <div>
      <h1>Grafik Kenaikan Pasien Covid 19 ({showed_data.group})</h1>
      {mode_psbb&&<h2>{after_psbb?'Sesudah':'Sebelum'} PSBB</h2>}
      <button onClick={()=> setModePSBB(!mode_psbb)}>Toggle psbb</button>
      <button onClick={()=> handlerShowedData('ODP')}>ODP</button>
      <button onClick={()=> handlerShowedData('PDP')}>PDP</button>
      <button onClick={()=> handlerShowedData('Positif')}>Positif</button>
      {mode_psbb&&<button onClick={()=> setAfterPSBB(!after_psbb)}>Toggle After or Before</button>}
      <XYPlot 
        xType="time"
        width={900} 
        height={300}
        stackBy="y">
        <XAxis 
          hideTicks
          tickFormat={t=> 
          <tspan>
            <tspan x="0">{`${t.getDate()}`}</tspan>
            <tspan x="0" dy="1em">{`${months[t.getMonth()]}`}</tspan>
          </tspan>}/>
        <YAxis />
        <LineSeries 
        animation={'woobly'} 
        data={
          mode_psbb?
          showed_data.data.filter(data=>after_psbb?data.x.getTime() > PSBB_DATE.getTime():data.x.getTime() <= PSBB_DATE.getTime())
          :showed_data.data} 
        onNearestXY= {value => setCurrValue({...value})}
        />
        {currentValue ? <Hint value={currentValue} /> : null}
      </XYPlot>
    </div>
  )
}
