import React, {useState} from 'react'
import {
  XYPlot, 
  XAxis, 
  YAxis, 
  VerticalBarSeries,
  VerticalGridLines,
  HorizontalGridLines
} from 'react-vis';

import data_condition_raw from  './data/data_condition_pdp.json'


export const ConditionGraph = () => {
  const selesai_series = [];
  const pengawasan_series = [];
  const start_date = new Date('April 5 2020').getTime()
  const end_date = new Date('May 3 2020').getTime()
  data_condition_raw.map((data,index)=>{
    selesai_series.push({x:data.Date + (index * (24*3600*1000)),y:data.Selesai})
    pengawasan_series.push({x:data.Date + (index * (24*3600*1000)),y:data.Pengawasan})
  })
  return (
    <div>
      <XYPlot 
        xType="time"
        width={900} 
        height={300} 
        stackBy="y">
        <HorizontalGridLines />
        <XAxis />
        <YAxis />
        <VerticalBarSeries data={selesai_series} />
        <VerticalBarSeries data={pengawasan_series} />
      </XYPlot>
    </div>
  )
}
