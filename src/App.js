import React from 'react';
import Fade from 'react-reveal/Fade';
import './styles/App.scss';
import '../node_modules/react-vis/dist/style.css';
import { Choropleth } from './components/Choropleth';
import ConditionGraph from './components/ConditionGraph'
import LineChartCumulative from './components/LineChartCumulative';
import { GraphIncrement } from './components/GraphIncrement'
import { AgeSlider } from './components/AgeSlider';

export default class App extends React.Component {
  render() {
    return (
      <div className="App">
        <Fade>
          <p className="main-subtitle">Visualisasi Data</p>
          <h1 className="main-title">
            Bandung dan COVID-19:<br/>
            Sudah Sejauh Apa?
          </h1>
          <p className="author">
            Oleh&nbsp;
            <a href="https://github.com/ahmadfahmip">Ahmad Fahmi</a>,&nbsp;
            <a href="https://www.linkedin.com/in/luthfi-hadiana/">Luhtfi Ahmad</a>, &&nbsp;
            <a href="https://www.linkedin.com/in/m-ilyas-mustafa/">Ilyas Mustafa</a>
            &nbsp; | Minggu, 10 Mei 2020
          </p>
          <p className="data-source">Sumber data: Dinas Kesehatan Kota Bandung</p>
        </Fade>
        <Fade delay={300}>
          <p className="center-text paragraph">
            Sudah 2 bulan lebih sejak pemerintah mengumumkan kasus pertama COVID-19 pada tanggal 2 Maret 2020. Himbauan hidup sehat digaungkan, termasuk pula perintah untuk menjaga jarak (<i>physical distancing</i>) dan PSBB. Sejauh manakah perkembangan kasus hingga saat ini, khususnya di Kota Bandung?
          </p>
        </Fade>
        <Choropleth />
        <Fade bottom cascade>
          <div className="left-text">
            <h2 className="section">COVID Dalam Angka</h2>
            <p className="paragraph">
              Hingga saat ini, persebaran kasus COVID-19 di Kota Bandung terus meningkat dan belum terlihat indikasi akan segera turun.
            </p>
          </div>
          <LineChartCumulative />
        </Fade>
        <AgeSlider />
        <Fade bottom cascade>
          <div className="versus">
            <div className="versus-text">
              <h3>19.9%</h3>
              <p>Tingkat kematian</p>
            </div>
            <p className="versus-vs">VS</p>
            <div className="versus-text">
              <h3>10.9%</h3>
              <p>Tingkat kesembuhan</p>
            </div>
          </div>
          <div className="center-text">
            <p className="paragraph">Tingkat kesembuhan mulai meningkat secara signifikan pada minggu ke-3 April, bertepatan pada awal dimulainya PSBB Bandung Raya.</p>
          </div>
        </Fade>
        <ConditionGraph/>
        <div className="center-text">
          <Fade bottom cascade delay={750}>
            <h2 className="section">Seberapa Efektif PSBB?</h2>
            <p className="paragraph">Sejak diberlakukannya PSBB pertama kali di DKI Jakarta, berbagai daerah termasuk Kota Bandung ikut memberlakukannya. Pembatasan pergerakan masyarakat tentunya memberikan dampak bagi pertambahan kasus harian.</p>
          </Fade>
        </div>
        <Fade duration={3000}>
          <GraphIncrement/>
        </Fade>
        <div className="left-text">
          <Fade bottom cascade>
            <h2 className="section">Daftar Pustaka</h2>
            <p className="paragraph">
              [1]&nbsp;WHO (2020).&nbsp;
              <a href="http://www.euro.who.int/en/health-topics/health-emergencies/coronavirus-covid-19/statements/statement-older-people-are-at-highest-risk-from-covid-19,-but-all-must-act-to-prevent-community-spread"><i>Statement – Older people are at highest risk from COVID-19, but all must act to prevent community spread</i></a>
            </p>
            <p className="paragraph">
              [2]&nbsp;Satu Data Indonesia (2019).&nbsp;
              <a href="https://data.go.id/dataset/batas-administrasi-kecamatan-dan-kelurahan-kota-bandung"><i>Batas Administrasi Kecamatan dan Kelurahan Kota Bandung</i></a>
            </p>
          </Fade>
        </div>
      </div>
    );
  }
}
