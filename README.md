# GDSC-Solutions


### Techstacks used
- Django
- React.js
- Numpy
- Google Cloud Platform
- Docker (tbd)


### Installation
1. Create Virtual Environment (May differ depending on OS)
```
pip install virtualenv
# if virtualenv not installed

virtualenv .venv
cd .venv
cd script
activate
```

2. Backend
```
pip install -r requirements.txt
cd backend
python3 manage.py makemigrations
python3 manage.py migrate
python3 manage.py runserver
```

3. Create file .env inside backend
```
EMAIL_USER = 'Email_here'
EMAIL_PASS = '123456'
EMAIL_FROM = 'Email_here'
```

4. Frontend
```
cd frontend
npm install
npm start
```

### Run
1. Server : localhost:8000/
2. Client localhost:3000


### Endpoints
1. API : localhost:8000/api/
2. Forex Scores : localhost:8000/api/scores/
3. Forex Scores Upload: localhost:8000/api/scores/upload/
4. Country (GET / POST): localhost:8000/api/countries/
5. Country Delete (in development): localhost:8000/api/countries/delete/


====
# GCP Server
## Everytime there is change to frontend
1. git pull (on server)
2. git install
3. git run build
4. sudo service nginx restart
