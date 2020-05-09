import React from 'react';
import ReactSlider from 'react-slider';
import { dateToDMY } from '../helper';
import '../styles/AgeSlider.scss';
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
    const total = baby + young + adult + old;
    const value =
      Array(baby).fill('👶🏼').join('') +
      Array(young).fill('👦🏻').join('') +
      Array(adult).fill('🧑🏻').join('') +
      Array(old).fill('👴🏼').join('');

    let className;
    if (total <= 250) className = 'tiny';
    if (total <= 160) className = 'small';
    if (total <= 120) className = 'medium';
    if (total <= 90) className = 'large';
    if (total <= 70) className = 'giant';
    return <p className={className}>{value}</p>;
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
      <div className="age-slider-section">
        <div className="age-slider-text">
          <h2>Mayoritas kasus positif merupakan</h2>
          <h1>Lansia</h1>
          <p className="paragraph">Hal ini selaras dengan pernyataan WHO bahwa kaum lansia memiliki risiko lebih tinggi untuk terpapar COVID-19<sup>[1]</sup>. Sebaliknya, balita dan anak-anak memiliki risiko terpapar paling rendah diantara semua kelompok usia.</p>
        </div>
        {dates ? (
          <div className="age-slider-wrapper">
            <h2>Tanggal kasus: {dateToDMY(curDate)}</h2>
            {this.renderAge()}
            <ReactSlider
              min={0}
              max={positiveData.length - 1}
              className="age-slider"
              onChange={idx => this.setDate(idx)}
            />
          </div>
        ) : null}
      </div>
    );
  }
}