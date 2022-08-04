from django.http import JsonResponse
from django.contrib.auth import login
from django.contrib.auth.models import User
from game.models.player.player import Player



def register(request):
    data = request.GET
    username = data.get("username", "").strip()
    password = data.get("password", "").strip()
    password_confirm = data.get("password_confirm", "").strip()
    if not username or not password:
        return JsonResponse({
                'result': "invalid username or password"
            })
    if password != password_confirm:
        return JsonResponse({
                'result': "passwords don't match"
            })
    if User.objects.filter(username=username).exists():
        return JsonResponse({
                'result': "username already exists"
            })
    user = User(username=username)
    user.set_password(password)
    user.save()
    Player.objects.create(user=user, photo="https://i1.sndcdn.com/artworks-000054750804-1wotc8-t500x500.jpg")
    login(request, user)
    return JsonResponse({
            'result': "success"
        })

