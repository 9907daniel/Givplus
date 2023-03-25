import pandas as pd
import requests
from datetime import *
import numpy as np

from warnings import simplefilter
simplefilter(action="ignore", category=pd.errors.PerformanceWarning)


today = datetime.today() - timedelta(days=2) # since it takes some time to update actual currency data for today

def currency_val(currency, date):
    response = requests.get("https://www.xe.com/currencytables/?from={}&date={}#table-section".format(currency, date.strftime('%Y-%m-%d')))
    return pd.read_html(response.text)[0]

currency_list = currency_val("JPY", today)["Currency"][:166]

def update_rate(currency, currency_list): 
    from concurrent.futures import ThreadPoolExecutor
    
    currency_list = list(currency_list)
    rate_df = pd.DataFrame()
    
    def iter_url(url):
        response = requests.get(url)
        return pd.read_html(response.text)[0]
    
    for i in range(0, len(currency_list)):
        response_url = []
        response_url.append("https://www.xe.com/currencytables/?from={}&date={}#table-section".format(currency, today.strftime('%Y-%m-%d')))
        
    with ThreadPoolExecutor(max_workers=200) as pool:
        response_list = list(pool.map(iter_url, response_url))
    
    df = response_list[0]
    rate_list = []
    
    for k in range(0, len(currency_list)):
        rate_list.append(df.loc[df["Currency"] == list(currency_list)[k]]["%s per unit" %currency].values)
    
    rate_df = pd.DataFrame(rate_list).astype(float).transpose()
    rate_df.columns = currency_list
    
    rate_df.index = [today.strftime('%Y-%m-%d')]
    
    return rate_df

def moving_average(df, days):
    return df.rolling(days).mean()

JPY_data = pd.read_csv("JPY.csv")
JPY_data.set_index(JPY_data.columns[0], inplace = True)

JPY_data = pd.concat([JPY_data, update_rate("JPY", currency_list)])
JPY_data.to_csv("JPY.csv")

data = JPY_data
weighted_ma = pd.DataFrame([])


ma_list = [5, 20, 60, 120, 200] 
weight_list = [0.1333, 0.3333, 0.2, 0.2, 0.1334]


for i in range(0, len(currency_list)-1):
    currency_ma = []
    for j in range(0,len(ma_list)):
        currency_ma.append(moving_average(data.iloc[0:,i+1], ma_list[j]).tail(1).values)
    weighted_ma[data.iloc[0:,i+1].name] = pd.DataFrame(currency_ma)
    
weighted_ma = weighted_ma.apply(lambda x: (np.asarray(x) * np.asarray(weight_list)).sum())

forex_score = ((weighted_ma - data.drop(data.columns[0], axis = 1).iloc[-1]) / weighted_ma * 100).sort_values(ascending = False)
forex_score = pd.DataFrame(forex_score).reset_index().dropna()
forex_score.columns = ["Currency abbreviation", "Forex score"]

currency_code = pd.read_csv("currency_code.csv")

currency_code = currency_code.merge(forex_score, how = "inner")

currency_code["PPP"] =  currency_code["GDP per capita"] / currency_code["GDP per capita PPP"]
currency_code["Final score"] = (1/currency_code["PPP"])*0.3+ (np.sqrt(currency_code["Forex score"] + abs(min(currency_code["Forex score"]))))*0.7

final_score = currency_code.sort_values(by = ["Final score"], ascending = False)

final_score.to_csv("../backend/files/jpy.csv")












