import pandas
import json
df = pandas.read_csv('PDP.csv',header=0,sep=';',parse_dates=['Date'])
df_nat = pandas.DataFrame({'Date':df['Date'],'WNI':df['WNI'],'WNA':df['WNA']})
df_gender = pandas.DataFrame({'Date':df['Date'],'Pria':df['LAKI - LAKI'],'Wanita':df['PEREMPUAN']})
df_total = pandas.DataFrame({'Date':df['Date'],'Total':df['TOTAL']})
df_usia = pandas.DataFrame({'Date':df['Date'],'Kategori-1':df['K-1'],'Kategori-2':df['K-2'],'Kategori-3':df['K-3'],'Kategori-4':df['K-4'],'Kategori-5':df['K-5'],'Kategori-6':df['K-6'],'Kategori-7':df['K-7'],'Kategori-8':df['K-8'],'Kategori-9':df['K-9']})
df_condition = pandas.DataFrame({'Date':df['Date'],'Selesai':df['SELESAI'],'Pengawasan':df['PENGAWASAN']})

with open('data_nat_pdp.json', 'w') as f:
  json.dump(json.loads(df_nat.to_json(orient='records')), f)

with open('data_gender_pdp.json', 'w') as f:
  json.dump(json.loads(df_gender.to_json(orient='records')), f)

with open('data_total_pdp.json', 'w') as f:
  json.dump(json.loads(df_total.to_json(orient='records')), f)

with open('data_usia_pdp.json', 'w') as f:
  json.dump(json.loads(df_usia.to_json(orient='records')), f)

with open('data_condition_pdp.json', 'w') as f:
  json.dump(json.loads(df_condition.to_json(orient='records')), f)