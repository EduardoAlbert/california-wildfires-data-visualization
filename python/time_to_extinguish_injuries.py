import pandas as pd

data = pd.read_csv('../data/California_Fire_Incidents.csv')

df = pd.DataFrame(data['Injuries'])
df['Started'] = pd.to_datetime(data['Started'])
df['Extinguished'] = pd.to_datetime(data['Extinguished'])

df = df.dropna()

df['TimeToExtinguish'] = abs((df['Started'] - df['Extinguished']).dt.total_seconds()/60)

df[['TimeToExtinguish', 'Injuries']].to_csv('../data/time_to_extinguish_injuries.csv', index=False)
