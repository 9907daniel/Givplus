## 🙌 Givplus!
## ❓ What is Givplus?   
- **Givplus** is a web-based donation platform that utilizes economic theories in maximizing the value of your giving. 
- We devised our own economic model, which takes into account the Purchasing Power Parity (PPP) of each nations and changing exchange rates. Our goal is to make every penny worth its value because your dollar is always worth more somewhere.   
- **Givplus** is specially targeted towards: individuals who think that small money wouldn’t make much of a difference, those who are willing but require strong motivation and incentives to take real action, and charity organizations that would like to reach out to more people who are motivated to make a change.  
-  Give more, **Givplus**!


<div style="text-align: center;">
  <img src="https://i.ibb.co/pvQ70bt/Screenshot-2023-05-27-at-10-39-54.png" alt="Givplus" />
</div>

## 🙋‍♀️ Specifics!  
### Economic model
1. `Weighted Moving Averages` 

Strength of one currency against another changes all the time. To quantify how much the rate has changed, we need some standard to compare with: for example, we can compare today's rate to the rate one month ago. However, this will not accurately reflect the long-term trends of exchange rate, which is also meaningful to us. Therefore, we devised a metric called weighted moving averages for fair evaluation of how well your currency is doing. 

$$ WMA = \sum_{i}^{}w_i\cdot (SMA(i) - SMA(1))$$

* SMA means simple moving average, which means an average value over the past *i* days. 
* SMA(1) denotes today's rate. <br>
* *i* is from the list of chosen values, [5, 20, 60, 120, 200], to equally represent both short-term and long-term trend in exchange rates.<br>
* *w* is a weight given to each differential $SMA(i) - SMA(1)$. Currently, $w_i$ = [0.1333, 0.3333, 0.2, 0.2, 0.1334], where the sum of $w_i$ equals 1.

<br>

2. `Forex score`

Forex score indicates the percent difference between WMA and today's rate, with the unit of %. 

$$ forex \ score = \frac{WMA - SMA(1)}{WMA}\cdot 100$$
<br>

3. `PPP`

Purchasing Power Parity (PPP) is a commonly used economic indicator for price levels in each country. PPP is effectively the ratio of the price of a basket of goods at one location divided by the price of the basket of goods at a different location. PPP itself is never reported officialy by the government but via indirect way such as GDP per capita (PPP). Since GDP per capita and GDP per capita (PPP) are readily available online, we hereby indirectly calculate PPP as follows:

$$ PPP = \frac{GDP \ per \ capita}{GDP \ per \ capita \ (PPP)}$$
<br>

4. `Givplus score`

Givplus score is computed from `Forex score` and `PPP`, with an arbitrary weight multiplied to each parameter. Currently, our model is as follows:

$$ Givplus \ Score = \ w_p \cdot \frac{1}{PPP} + w_f\sqrt{forex \ score + min(forex \ score)} $$

$min(forex \ score)$ denotes the minimum Forex score in the list. This effectively adjusts the entire list of Forex scores such that the minimum value becomes 0.
Currently, $w_p$ = 0.3, $w_f$ = 0.7, such that $w_p + w_f = 1$. 

5. `Coffee index`

Coffee index obtained by a simple ratio between PPP at your country A and PPP at another country B.

$$ Coffee \ Index = \frac{PPP_A}{PPP_B}$$

<br>

Detailed Python codes can be found [here](https://github.com/9907daniel/Givplus/blob/main/forex_score_calculation/forex.ipynb).

## Link   

- [🚗 Givplus](https://givplus.duckdns.org/)   
- [▶️ Demo video](https://www.youtube.com/watch?v=gSqkXHkcUj8)
- [📈 Historical currency rates tables](https://www.xe.com/currencytables/)


## Table of Content
1. [Techinal Stacks](#techstacks)
2. [🛠 Installation](#installation)
    - [Virtual Environment](#virtual-environment)   
    - [Backend](#backend)   
    - [Frontend](#frontend)   
3. [Server Maintanence](#server-maintanence)
4. [Endpoints](#endpoints )
5. [File Structure](#file-structures)
6. [Future Plans](#future-plans)
7. [Contributors](#contributors)

   
## Techstacks
- **Backend**  : Django
- **Frontend** : React.js
- **Database** : Postgresql
- **Deployment** : Google Cloud Platform (Compute Engine), Nginx


## Installation
### 1) Virtual Environment

- #### OS
```
pip install virtualenv

virutalenv .venv

. .venv/bin/activate
```

- #### Windows
```
pip install virtualenv

virtualenv .venv

cd .venv/Scripts

activate
```

### 2) Backend

```
pip install -r requirements.txt

cd backend

nano .env

##################################################
EMAIL_USER = _email_
EMAIL_PASS = _password_
EMAIL_FROM = _email_

SECRET_KEY = _secretkey_

DATABASE_NAME = _db_
DATABASE_USER = _dbusername_
DATABASE_PASSWORD = _password_
DATABASE_HOST = localhost
 DATABASE_PORT = 5432

##################################################
```
```
python manage.py makemigrations

python manage.py migrate

python manage.py runserver
```

### 3) Frontend
```
cd ..

cd frontend

npm install

nano .env.local

##################################################
REACT_APP_GOOGLE_MAPS_API_KEY= _yourkeyhere_

REACT_APP_API_BASE_URL=http://localhost:8000/api/user/
##################################################

npm start
```



## Server Maintanence
### Change to Frontend
```
git pull (on server)

npm install

npm run build

sudo service nginx restart
```

### Change to Backend
```
git pull (on server)

pip install -r requirements.txt

python manage.py makemigratoins

python manage.py migrate

python manage.py collecstatic

pkill gunicorn

gunicorn backend.wsgi:application --bind 0.0.0.0:8000 &

sudo service nginx restart
```


### Clearing Database for Specific Models using shell
```
start at django directory (where manage.py is located)

python3 manage.py shell

from _appname_.models import _modelname_

_modelname_.objects.filter().delete()
```

### Crontab
```
grep CRON /var/log/syslog (check logs)

crontab -e
```


## Endpoints
### API endpoints
- API : localhost:8000/api/
- Forex Scores : localhost:8000/api/scores/
- Forex Scores Upload: localhost:8000/api/scores/upload/
- Country (GET / POST): localhost:8000/api/countries/
- Country Detail - localhost:8000/api/countries/<int:pk>/
- Projects (GET / POST) - 


## File Structures
```
Givplus/
├── backend/
│   ├── manage.py
│   ├── api/
│   ├── files/
│   ├── static/
│   ├── account/
│   ├── backend/
│   │   ├── settings.py
│   ├── .env
├── frontend/
│   ├── public/
│   │   ├── index.html
│   │   └── ...
│   ├── src/
│   │   ├── App.js
│   │   ├── index.js
│   │   ├── src/
│   │   │   ├── app/
│   │   │   ├── components/
│   │   │   ├── pages/
│   │   │   ├── services/
│   │   │   ├── features/
│   │   │   ├── images/
│   │   │   ├── App.js
│   │   │   ├── index.js
│   │   ├── pages/
│   ├── package.json
│   ├── package-lock.json
│   └── .env.local
├── Forex score calculation/
│   ├── currency_code.csv
│   ├── forex.ipynb
│   └── README.md
├── .gitignore
├── README.md
└── requirements.txt

```


 
## Future Plans

### Techincal wise
1. Unit Test

### Function wise
1. Adoption of TensorFLow for personalized recommendation of projects and categorizing scraped data
2. Implementation of blockchain in keeping transaction records and issuing receipts (can be further used for government tax credits)
3. Improvement of current economic models


## Contributors
Park Kyung Min (Leader) - GDSC Waseda

Cha Seung Jun (Project manager) - Nanyang Technological University (participating as a member of GDSC Waseda)

Shin Jeong Hoo (Backend developer & Technical Lead)- GDSC Waseda

Heo Bor Yun (Frontend developer) - GDSC Waseda




   

   



