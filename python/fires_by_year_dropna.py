import pandas as pd

data = pd.read_csv('../data/california_fire_incidents.csv')

df = pd.DataFrame(data['AcresBurned'])
df['Injuries'] = data['Injuries']
df['MajorIncident'] = data['MajorIncident']
df['Started'] = pd.to_datetime(data['Started'])
df['Extinguished'] = pd.to_datetime(data['Extinguished'])

df = df.dropna()

df = pd.DataFrame(df['Started'])
df['year'] = df['Started'].dt.year

df[['year']].to_csv('../data/fires_by_year.csv', index=False)
