import React from 'react';
import './styles/App.css';
import '../node_modules/react-vis/dist/style.css';
import { Choropleth } from './components/Choropleth';
import LineChartCumulative from './components/LineChartCumulative';
import { GraphIncrement } from './components/GraphIncrement'

function App() {
  return (
    <div className="App">
      <p className="main-subtitle">Visualisasi Data</p>
      <h1 className="main-title">
        Bandung dan Corona:<br/>
        Seberapa Siapkah Kita?
      </h1>
      <p className="author">
        Oleh&nbsp;
        <a href="https://github.com/ahmadfahmip">Ahmad Fahmi</a>,&nbsp;
        <a href="https://github.com/ahmadfahmip">Luhtfi Ahmad</a>, &&nbsp;
        <a href="https://github.com/ahmadfahmip">Ilyas Mustafa</a>
      </p>
      <p className="center-text paragraph">
        Sudah 2 bulan lebih sejak pemerintah mengumumkan kasus pertama COVID-19 pada tanggal 2 Maret 2020. Himbauan hidup sehat digaungkan, termasuk pula perintah untuk menjaga jarak (<i>physical distancing</i>) dan PSBB. Sejauh manakah perkembangan kasus hingga saat ini, khususnya di kota kita tercinta, Kota Bandung?
      </p>
      <Choropleth />
      <p className="center-text paragraph">
        Hingga saat ini, persebaran kasus COVID 19 terus berkembangan dan belum terlihat indikasi segera turun.
      </p>
      <LineChartCumulative />
      <div className="left-text">
        <h2 className="section">COVID Dalam Angka</h2>
        <p className="paragraph">
          Sudah 2 bulan lebih sejak pemerintah mengumumkan kasus pertama COVID-19 pada tanggal 2 Maret 2020. Himbauan hidup sehat digaungkan, termasuk pula perintah untuk menjaga jarak (<i>physical distancing</i>) dan PSBB. Sejauh manakah perkembangan kasus hingga saat ini, khususnya di kota kita tercinta, Kota Bandung?
        </p>
      </div>
      <GraphIncrement/>
    </div>
  );
}

export default App;
