from django.contrib import admin
from .models import Role, Polzovateli, Vid, Company, Category, Course, Rabota, Meropriyatia, Zapis, News
from django import forms

from django.urls import reverse
from django.utils.http import urlencode
from django.utils.html import format_html

from import_export import resources
from import_export.admin import ImportExportModelAdmin
# Register your models here.


class RoleResource(resources.ModelResource):

    class Meta:
        model = Role
        skip_unchanged = True
        report_skipped = False


@admin.register(Role)
class RoleAdmin(ImportExportModelAdmin):
    list_display = ("id", "name")
    list_filter = ("name", )
    search_fields = ("name__startswith", )
    resource_class = RoleResource

# class PolzForm(forms.ModelForm):

#     class Meta:
#         model = Polzovateli
#         exclude = ['fio']


class PolzResource(resources.ModelResource):

    class Meta:
        model = Polzovateli
        skip_unchanged = True
        report_skipped = False
        fields = ('id', 'fio', 'pochta', 'id_role')


@admin.register(Polzovateli)
class PolzAdmin(ImportExportModelAdmin):
    list_display = ("id", "fio", "pochta", "login", "password", "id_role")
    list_filter = ("id_role", )
    search_fields = ("fio__startswith", )
    resource_class = PolzResource
    # form = PolzForm


class CategoryResource(resources.ModelResource):

    class Meta:
        model = Category
        skip_unchanged = True
        report_skipped = False


@admin.register(Category)
class CategoryAdmin(ImportExportModelAdmin):
    list_display = ("id", "name")
    list_filter = ("name", )
    search_fields = ("name__startswith", )
    resource_class = CategoryResource


class VidResource(resources.ModelResource):

    class Meta:
        model = Vid
        skip_unchanged = True
        report_skipped = False


@admin.register(Vid)
class VidAdmin(ImportExportModelAdmin):
    list_display = ("id", "name")
    list_filter = ("name", )
    search_fields = ("name__startswith", )
    resource_class = VidResource


class RabotaResource(resources.ModelResource):

    class Meta:
        model = Rabota
        skip_unchanged = True
        report_skipped = False


@admin.register(Rabota)
class RabotaAdmin(ImportExportModelAdmin):
    list_display = ("id", "name", "opisanie", "trebovanie", "uslovia",
                    "obyazannosti", "id_category", "id_vida", "id_company")
    list_filter = ("name", "trebovanie", "uslovia",
                   "obyazannosti", "id_category", "id_vida", "id_company")
    search_fields = ("name__startswith", )
    resource_class = RabotaResource


class CompanyResource(resources.ModelResource):

    class Meta:
        model = Company
        skip_unchanged = True
        report_skipped = False


# @admin.register(Company)
# class CompanyAdmin(ImportExportModelAdmin):
#     list_display = ("id", "name", "opisanie", "pochta", "telephon",
#                     "fio", "login", "password")
#     list_filter = ("name", )
#     # search_fields = ("name__startswith", )
#     resource_class = CompanyResource
#     fields = ('id', 'name', 'opisanie', 'fio', 'pochta', 'telephon')


class MeropResource(resources.ModelResource):

    class Meta:
        model = Meropriyatia
        skip_unchanged = True
        report_skipped = False


@admin.register(Company)
class CompanyAdmin(ImportExportModelAdmin, admin.ModelAdmin):
    list_display = ("id", "name", "opisanie", "pochta", "telephon",
                    "fio", "login", "password")
    list_filter = ("name", )
    search_fields = ("name__startswith", )
    resource_class = CompanyResource
    fields = ("name", "opisanie", "pochta", "telephon",
              "fio", "login", "password")
    pass


@admin.register(Meropriyatia)
class MeropAdmin(ImportExportModelAdmin):
    list_display = ("id", "name", "date", "id_company")
    list_filter = ("name", "date", "id_company")
    search_fields = ("name__startswith", )
    # fields = ("name", "id_company")
    date_hierarchy = ("date")
    resource_class = MeropResource


# def make_published(modeladmin, request, queryset):
#     queryset.update(opisanie='мест больше нет')


# make_published.short_description = "Пометить курсы, где закончились места"
class CourseResource(resources.ModelResource):

    class Meta:
        model = Course
        skip_unchanged = True
        report_skipped = False


@admin.register(Course)
class CourseAdmin(ImportExportModelAdmin):
    list_display = ("id", "name", "opisanie", "dlitelnost",
                    "id_category", "id_company", )
    list_filter = ("name", "dlitelnost",
                   "id_category", "id_company")
    search_fields = ("name__startswith", )
    resource_class = CourseResource
    # actions = (make_published)
    # def view_students_link(self, obj):
    #     count = obj.id.count()
    #     url = (
    #         reverse("admin:main_zapis_changelist")
    #         + "?"
    #         + urlencode({"id": f"{obj.id}"})
    #     )
    #     return format_html('<a href="{}">{} Students</a>', url, count)
    # view_students_link.short_description = "Студенты"


def make_published(modeladmin, request, queryset):
    queryset.update(status='p')


make_published.short_description = "Изменить статус на Опубликовано"


class NewsResource(resources.ModelResource):

    class Meta:
        model = News
        skip_unchanged = True
        report_skipped = False


@admin.register(News)
class NewsAdmin(ImportExportModelAdmin):
    list_display = ("id", "name", "opisanie", "date",
                    "id_category", "id_company", "status")
    list_filter = ("date", "id_category", "id_company", "status")
    search_fields = ("name__startswith", )
    date_hierarchy = ("date")
    resource_class = NewsResource
    actions = [make_published]


class ZapisResource(resources.ModelResource):

    class Meta:
        model = Zapis
        skip_unchanged = True
        report_skipped = False


@admin.register(Zapis)
class ZapisAdmin(ImportExportModelAdmin):
    list_display = ("id", "id_polzovatel", "id_course")
    list_filter = ("id_course", )
    resource_class = ZapisResource
