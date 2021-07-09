from rest_framework import serializers
from .models import *
from django.contrib.auth.models import User


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'password', 'is_staff', 'is_superuser']
        extra_kwargs = {'password': {'write_only': True, 'required': True}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user


class CompanySerializer(serializers.Serializer):
    id = serializers.ReadOnlyField()
    name = serializers.CharField(max_length=120)
    opisanie = serializers.CharField(max_length=120)
    pochta = serializers.CharField(max_length=120)
    telephon = serializers.CharField(max_length=120)
    fio = serializers.CharField(max_length=120)
    login = serializers.CharField(max_length=120)
    password = serializers.CharField(max_length=120)
    # id_role = serializers.CharField(max_length=120)

    class Meta:
        model = Company
        fields = ('id', 'name', 'opisanie', 'pochta',
                  'telephon', 'fio', 'login', 'password')

    def create(self, validated_data):
        return Company.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.name)
        instance.opisanie = validated_data.get('opisanie', instance.opisanie)
        instance.pochta = validated_data.get('pochta', instance.pochta)
        instance.telephon = validated_data.get('telephon', instance.telephon)
        instance.fio = validated_data.get('fio', instance.fio)
        instance.login = validated_data.get('login', instance.login)
        instance.password = validated_data.get('password', instance.password)
        # instance.id_role = validated_data.get('id_role', instance.id_role)
        instance.save()
        return instance


class RabotaSerializer(serializers.Serializer):
    id = serializers.ReadOnlyField()
    name = serializers.CharField(max_length=120)
    opisanie = serializers.CharField(max_length=120)
    trebovanie = serializers.CharField(max_length=120)
    uslovia = serializers.CharField(max_length=120)
    obyazannosti = serializers.CharField(max_length=120)

    class Meta:
        model = Rabota
        fields = ('id', 'name', 'opisanie', 'trebovanie',
                  'uslovia', 'obyazannosti')

    def create(self, validated_data):
        return Rabota.objects.create(**validated_data)

    def update(self, instance, validated_data):
        instance.name = validated_data.get('name', instance.name)
        instance.opisanie = validated_data.get(
            'opisanie', instance.opisanie)
        instance.trebovanie = validated_data.get(
            'trebovanie', instance.trebovanie)
        instance.uslovia = validated_data.get('uslovia', instance.uslovia)
        instance.obyazannosti = validated_data.get(
            'obyazannosti', instance.obyazannosti)
        instance.save()
        return instance
