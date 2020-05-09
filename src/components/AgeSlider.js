import React from 'react';
import ReactSlider from 'react-slider';
import { dateToDMY } from '../helper';
import positiveData from '../data/data_usia_positif.json';

export class AgeSlider extends React.Component {
  state = {
    dates: null,
    curDate: null,
  };

  renderAge = () => {
    const {curDate, dates} = this.state;
    const date = dates[curDate];
    const baby = date['Kategori-1'];
    const young = date['Kategori-2'] + date['Kategori-3'];
    const adult = date['Kategori-4'] + date['Kategori-5'];
    const old = date['Kategori-6'] + date['Kategori-7'] + date['Kategori-8'] + date['Kategori-9'];
    const value =
      Array(baby).fill('👶🏼').join('') +
      Array(young).fill('👦🏻').join('') +
      Array(adult).fill('🧑🏻').join('') +
      Array(old).fill('👴🏼').join('');
    return <p>{value}</p>;
  }

  initDates = () => {
    let dates = {};
    positiveData.forEach(pos => {
      dates[pos.Date] = {...pos};
    });
    this.setState({
      dates,
      curDate: positiveData[0].Date,
    });
  }

  setDate = idx => {
    this.setState({curDate: positiveData[idx].Date});
  }

  componentDidMount = () => {
    this.initDates();
  }

  render() {
    const {dates, curDate} = this.state;
    return (
      <div>
        {dates ? (
          <div className="age-slider">
            <h2>{dateToDMY(curDate)}</h2>
            {this.renderAge()}
            <ReactSlider
              min={0}
              max={positiveData.length - 1}
              className="horizontal-slider"
              thumbClassName="example-thumb"
              trackClassName="example-track"
              onChange={idx => this.setDate(idx)}
              renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
            />
          </div>
        ) : null}
      </div>
    );
  }
}