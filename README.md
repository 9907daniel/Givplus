# GDSC-Solutions


### Techstacks used
- Django
- React.js
- Numpy
- Google Cloud Platform
- Docker (tbd)


### Installation
1. Create Virtual Environment
```
virtualenv .venv
source .venv/bin.activate
```

2. Backend
```
cd backend
pip / pip3 install -r requirements.txt
python3 manage.py makemigrations
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
