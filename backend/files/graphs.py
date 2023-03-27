import requests

url = 'https://givplus.duckdns.org/api/graphs/'
file_path = 'graphs/LBPKRW.png'
payload = {'country': 'Lebanon', 'file_index': 'krw'}

with open(file_path, 'rb') as f:
    r = requests.post(url, data=payload, files={'graph': f})
    
print(r.status_code)
print(r.text)

