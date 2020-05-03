import pandas
import json
df = pandas.read_csv('KECAMATAN_CSV.csv',header=0,sep=';')

df_odp = pandas.DataFrame({'Kecamatan':df['KECAMATAN'],'Dipantau':df['MSH DIPANTAU-ODP'],'Selesai':df['SELESAI-ODP']})
df_pdp = pandas.DataFrame({'Kecamatan':df['KECAMATAN'],'Dirawat':df['MSH DIRAWAT-PDP'],'Selesai':df['SELESAI-PDP']})
df_positif = pandas.DataFrame({'Kecamatan':df['KECAMATAN'],'Dirawat':df['MSH DIRAWAT-POSITIF'],'Sembuh':df['SEMBUH'],'Meninggal':df['MENINGGAL'],'Positif':df['TOTAL POSITIF']})
print(df_odp)
print(df_pdp)
print(df_positif)

with open('data_kecamatan_odp.json', 'w') as f:
  json.dump(json.loads(df_odp.to_json(orient='records')), f)

with open('data_kecamatan_pdp.json', 'w') as f:
  json.dump(json.loads(df_pdp.to_json(orient='records')), f)

with open('data_kecamatan_positif.json', 'w') as f:
  json.dump(json.loads(df_positif.to_json(orient='records')), f)