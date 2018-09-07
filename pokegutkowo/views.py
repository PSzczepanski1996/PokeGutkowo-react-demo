# Create your views here.
from django.views.generic import TemplateView


class MainView(TemplateView):
    template_name = "index.html"
