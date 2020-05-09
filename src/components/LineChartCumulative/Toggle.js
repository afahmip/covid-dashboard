import React from 'react'

export default function Toggle(props) {
  const toggleType = [
    {
      text: 'All',
      value: 'all'
    },
    {
      text: 'Perempuan',
      value: 'w',
      header: 'Jenis Kelamin'
    },
    {
      text: 'Laki-laki',
      value: 'm'
    },
    {
      text: 'WNA',
      value: 'm',
      header: 'Kewarganegaraan'
    },
    {
      text: 'WNI',
      value: 'm'
    }
  ]
  return (
    <div className="lc-cumulative__toggle">
      {toggleType.map(e=>(
        <>
          {e.header ? <h5>{e.header}</h5>: ''}
          <label>
            <input 
              type='radio'
              value={e.value}
              checked={props.used === e.value}
              name='data'
              onChange={props.onChange}
            />
            {e.text}
          </label>
        </>
      ))}
    </div>
  )
}
