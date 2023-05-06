from django.shortcuts import render
from django.http import JsonResponse
from agora_token_builder import RtcTokenBuilder

import random
import time

# Create your views here.


def getToken(request):
    appId = 'fd34bf65498f46b49872aed149eb3d49'
    appCertificate = '90709fcf53be4988ae33f9f4696fd6d3'
    channelName = request.GET.get('channel')
    uid = random.randint(1, 230)
    expirationTimeInSeconds = 366 * 24
    currentTimeStamp = time.time()
    privilegeExpiredTs = currentTimeStamp + expirationTimeInSeconds
    role = 1
    token = RtcTokenBuilder.buildTokenWithUid(
        appId, appCertificate, channelName, uid, role, privilegeExpiredTs)
    return JsonResponse({'token': token, 'uid': uid}, safe=False)


def lobby(request):
    return render(request, 'base/lobby.html')


def room(request):
    return render(request, 'base/room.html')
