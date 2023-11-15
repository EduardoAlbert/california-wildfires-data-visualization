import pandas as pd

data = pd.read_csv('../data/california_fire_incidents.csv')

df = pd.DataFrame(data['AcresBurned'])
df['Started'] = pd.to_datetime(data['Started'])
df['Extinguished'] = pd.to_datetime(data['Extinguished'])

df = df.dropna()

df['TimeToExtinguish'] = abs((df['Started'] - df['Extinguished']).dt.total_seconds()/60)

df[['AcresBurned', 'TimeToExtinguish']].to_csv('../data/acres_burned_time_to_extinguish.csv', index=False)
