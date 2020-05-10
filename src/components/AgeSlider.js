import React from 'react';
import Fade from 'react-reveal/Fade';
import ReactSlider from 'react-slider';
import { dateToDMY } from '../helper';
import '../styles/AgeSlider.scss';
import positiveData from '../data/data_usia_positif.json';
import babyPic from '../assets/baby.png';
import youngPic from '../assets/young.png';
import adultPic from '../assets/adult.png';
import oldPic from '../assets/old.png';

export class AgeSlider extends React.Component {
  constructor(props) {
    super(props);
    this.slider = React.createRef();
  }

  state = {
    dates: null,
    curDate: null,
    scrollVal: 0,
  };

  renderAge = () => {
    const {curDate, dates} = this.state;
    const date = dates[curDate];
    const baby = date['Kategori-1'];
    const young = date['Kategori-2'] + date['Kategori-3'];
    const adult = date['Kategori-4'] + date['Kategori-5'];
    const old = date['Kategori-6'] + date['Kategori-7'] + date['Kategori-8'] + date['Kategori-9'];
    const total = baby + young + adult + old;

    let className;
    if (total <= 250) className = 'tiny';
    if (total <= 160) className = 'small';
    if (total <= 120) className = 'medium';
    if (total <= 90) className = 'large';
    if (total <= 70) className = 'giant';

    let output = [];
    for (let i = 0; i < baby; i++) output.push(<img src={babyPic} alt="" />);
    for (let i = 0; i < young; i++) output.push(<img src={youngPic} alt="" />);
    for (let i = 0; i < adult; i++) output.push(<img src={adultPic} alt="" />);
    for (let i = 0; i < old; i++) output.push(<img src={oldPic} alt="" />);
    return <div className={`pics ${className}`}>{output}</div>;
  }

  setDate = idx => {
    this.setState({
      curDate: positiveData[idx].Date,
      scrollVal: idx,
    });
  }

  initDates = async () => {
    let dates = {};
    positiveData.forEach(pos => {
      dates[pos.Date] = {...pos};
    });
    await this.setState({
      dates,
      curDate: positiveData[0].Date,
    });
  }

  animate = () => {
    let timeLimit = (positiveData.length + 1) * 35;
    let interval = setInterval(() => {
      let {scrollVal} = this.state;
      scrollVal += 1;
      if (scrollVal < positiveData.length) {
        this.setState({scrollVal});
        this.setDate(scrollVal);
      }
    }, 25);

    setTimeout(() => {
      clearInterval(interval);
    }, timeLimit);

    window.removeEventListener('scroll', this.initListener);
  }

  initListener = () => {
    let target = this.slider.current;
    if (target.offsetTop - (window.scrollY + target.offsetHeight) < 300) {
      this.animate();
    }
  }

  initAnimate = () => {
    window.addEventListener('scroll', this.initListener);
  }

  componentDidMount = async () => {
    await this.initDates();
    await this.initAnimate();
  }

  render() {
    const {dates, curDate} = this.state;
    return (
      <div className="age-slider-section" ref={this.slider}>
        <Fade bottom cascade>
          <div className="age-slider-text">
            <h2>Mayoritas kasus positif merupakan</h2>
            <h1>Lansia</h1>
            <p className="paragraph">Hal ini selaras dengan pernyataan WHO bahwa kaum lansia memiliki risiko lebih tinggi untuk terpapar COVID-19<sup>[1]</sup>. Sebaliknya, balita dan anak-anak memiliki risiko terpapar paling rendah diantara semua kelompok usia.</p>
          </div>
        </Fade>
        {dates ? (
          <Fade>
            <div className="age-slider-wrapper">
              <h2>Tanggal kasus: {dateToDMY(curDate)}</h2>
              {this.renderAge()}
              <ReactSlider
                min={0}
                max={positiveData.length - 1}
                value={this.state.scrollVal}
                className="age-slider"
                onChange={idx => this.setDate(idx)}
              />
            </div>
          </Fade>
        ) : null}
      </div>
    );
  }
}