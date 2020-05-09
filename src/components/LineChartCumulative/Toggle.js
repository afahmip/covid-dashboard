import React from 'react'

export default function Toggle(props) {
  const toggleType = [
    {
      text: 'All',
      value: 'total'
    },
    {
      text: 'Perempuan',
      value: 'wanita',
      header: 'Jenis Kelamin'
    },
    {
      text: 'Pria',
      value: 'pria'
    },
    {
      text: 'WNA',
      value: 'wna',
      header: 'Kewarganegaraan'
    },
    {
      text: 'WNI',
      value: 'wni'
    }
  ]
  return (
    <div className="lc-cumulative__toggle">
      {toggleType.map((e, i)=>(
        <>
          {e.header ? <h5>{e.header}</h5>: ''}
          <label className={props.used === e.value ? 'active': ''}>
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
