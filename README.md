## 🙌 Givplus!


## ❓ What is Givplus?   
- **Givplus** is **<u>____</u>** .   
-
- 
-  

## 🙋‍♀️ Specifics!   
1. Talk
2. About
3. Forex
4. etc
5. Here


## Link   

- [🚗 Givplus](https://givplus.duckdns.org/)   


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

cd .venv/script

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

npm start
```

## Server Maintanence
### Change to Frontend
1. git pull (on server)
2. npm install
3. npm run build
4. sudo service nginx restart

### Change to Backend
1. git pull (on server)
2. pip install -r requirements.txt
3. python manage.py makemigratoins
4. python manage.py migrate
5. python manage.py collecstatic
6. pkill gunicorn
7. gunicorn backend.wsgi:application --bind 0.0.0.0:8000 &
8. sudo service nginx restart



### Clearing Database for Specific Models using shell
0. start at django directory (where manage.py is located)
1. python3 manage.py shell
2. from _appname_.models import _modelname_
3. _modelname_.objects.filter().delete()


### Chom Task
1. grep CRON /var/log/syslog (check logs)
2. crontab -e







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
1. Migrate Compute Engine DB to Google Cloud
2. Dockerize Project
3. Github Actions (CI/CD)
4. Unit Test

### Function wise
1. 
2. 


## Contributors
Park Kyeung Min (Leader) - 

Cha Seung Jun -

Heo Bor Yun - 

Shin Jeong Hoo -



   

   



