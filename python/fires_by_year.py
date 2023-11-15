import pandas as pd

data = pd.read_csv('../data/California_Fire_Incidents.csv')

df = pd.DataFrame()
df['Started'] = pd.to_datetime(data['Started'])
df['year'] = df['Started'].dt.year

df[['year']].to_csv('../data/fires_by_year.csv', index=False)
