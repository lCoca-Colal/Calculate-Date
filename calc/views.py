from django.http import HttpResponse
from django.shortcuts import render
from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login
from .forms import UserRegistrationForm


def index(request):
    return render(request, 'calc/index.html')

# def log(request):
#     return render(request, 'calc/log.html')

def register(request):
    if request.method == 'POST':
        form = UserRegistrationForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('login')
    else:
        form = UserRegistrationForm()
    return render(request, 'calc/register.html', {'form': form})


def log(request):
    if request.method == 'POST':
        username = request.POST.get('username')
        password = request.POST.get('password')
        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            return redirect('index')  # Редирект на главную страницу после успешного входа
        else:
            error_message = 'Invalid username or password. Please try again.'
            return render(request, 'calc/log.html', {'error_message': error_message})
    
    return render(request, 'calc/log.html')

    
    
