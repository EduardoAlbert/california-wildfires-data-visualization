import pandas as pd

data = pd.read_csv('../data/california_fire_incidents.csv')

df = pd.DataFrame(data['AcresBurned'])
df['Injuries'] = data['Injuries']
df = df.dropna()

df.to_csv('../data/acres_burned_injuries.csv', index=False)
