import total_odp from '../../data/data_total_odp.json';
import total_pdp from '../../data/data_total_pdp.json';
import total_positif from '../../data/data_total_positif.json';
import gender_odp from '../../data/data_gender_odp.json';
import gender_pdp from '../../data/data_gender_pdp.json';
import gender_positif from '../../data/data_gender_positif.json';
import nat_odp from '../../data/data_nat_odp.json';
import nat_pdp from '../../data/data_nat_pdp.json';
import nat_positif from '../../data/data_nat_positif.json';
import usia_odp from '../../data/data_usia_odp.json';
import usia_pdp from '../../data/data_usia_pdp.json';
import usia_positif from '../../data/data_usia_positif.json';

const ODPARRAY = [total_odp, gender_odp, nat_odp, usia_odp]
const PDPARRAY = [total_pdp, gender_pdp, nat_pdp, usia_pdp]
const POSITIFARRAY = [total_positif, gender_positif, nat_positif, usia_positif]
export function getData(type) {
  let data = type === 'pdp' ? PDPARRAY :
            type === 'odp' ? ODPARRAY : POSITIFARRAY;
  return {
    total: data[0].map(e=>({
      x: new Date(e.Date),
      y: e.Total
    })),
    pria: data[1].map(e=>({
      x: new Date(e.Date),
      y: e.Pria
    })),
    wanita: data[1].map(e=>({
      x: new Date(e.Date),
      y: e.Wanita
    })),
    wni: data[2].map(e=>({
      x: new Date(e.Date),
      y: e.WNI
    })),
    wna: data[2].map(e=>({
      x: new Date(e.Date),
      y: e.WNA
    }))
  }
}

export const months  = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Ags','Sept','Oct','Nov','December'];
