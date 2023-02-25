from django.shortcuts import render

# Create your views here.

def home(request):
    return render(request, 'index.html')

def Nations(request):
    return render(request, 'nations.html')

def Donate(request):
    return render(request, 'donate.html')

def Contact(request):
    return render(request, 'contact.html')


