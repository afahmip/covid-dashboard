export function toTitleCase(str) {
  return str.replace(
    /\w\S*/g,
    function(txt) {
      return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
    }
  );
}

export const months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];

export function dateToDMY(time) {
  let date = new Date(time);
  let day = date.getDate();
  let month = date.getMonth();
  let year = date.getFullYear();
  return `${day} ${months[month]} ${year}`;
}