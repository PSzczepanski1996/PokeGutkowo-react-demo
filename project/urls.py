"""PokeGutkowo URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path

from pokegutkowo.views import PlayersView, PostView, SettingsView
from project import settings

urlpatterns = [
    path('players_api/', PlayersView.as_view(), name='players_api'),
    path('post_api/', PostView.as_view(), name='post_api'),
    path('settings_api/', SettingsView.as_view(), name='settings_api'),
    path('admin/', admin.site.urls),
]

# Media/static
urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)