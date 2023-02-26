# GDSC-Solutions

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
2. API : localhost:8000/api/
3. Client localhost:3000