from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.views import APIView
from django.shortcuts import render
from django.http import JsonResponse
from rest_framework import status
from .models import Company, Rabota
from .serializers import *
from rest_framework.authentication import TokenAuthentication, SessionAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.models import User
from rest_framework import viewsets
# Create your views here.


def index(request):
    return render(request, 'main/index.html')


def about(request):
    return render(request, 'main/about.html')


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class UserView(APIView):
    authentication_classes = [SessionAuthentication,
                              BasicAuthentication, TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, forman=None):
        content = {
            'user': str(request.user),
            'auth': str(request.auth),
        }
        return Response(content)


@api_view(['GET', 'POST'])
def company_list(request):
    if request.method == 'GET':
        company = Company.objects.all()
        serializer = CompanySerializer(company, many=True)
        authentication_classes = [TokenAuthentication, ]
        permission_classes = [IsAuthenticated, ]
        return JsonResponse({"data": serializer.data})

    elif request.method == 'POST':
        serializer = CompanySerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=status.HTTP_201_CREATED)
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
def company_detail(request, id):
    try:
        company = Company.objects.get(id=id)
    except Company.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = CompanySerializer(company)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = CompanySerializer(company, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        company.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


@api_view(['GET', 'POST'])
def rabota_list(request):
    if request.method == 'GET':
        rabota = Rabota.objects.all()
        serializer = RabotaSerializer(rabota, many=True)
        authentication_classes = [TokenAuthentication, ]
        permission_classes = [IsAuthenticated, ]
        return JsonResponse({"data": serializer.data})

    elif request.method == 'POST':
        serializer = RabotaSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse(serializer.data, status=status.HTTP_201_CREATED)
        return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
