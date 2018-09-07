from django.contrib import admin

# Register your models here.
from pokegutkowo.models import Team, Settings, TopPlayers

admin.site.register(Team)
admin.site.register(Settings)
admin.site.register(TopPlayers)
