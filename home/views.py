from django.views.generic import TemplateView


class HomeView(TemplateView):
    template_name = 'home/index.html'


class First(TemplateView):
    template_name = 'home/first.html'


class Second(TemplateView):
    template_name = 'home/second.html'


class Third(TemplateView):
    template_name = 'home/third.html'
