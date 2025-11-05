from django.urls import path
from . import views

urlpatterns = [
    path('matches-per-year/', views.matches_per_year),
    path('matches-won-per-team/', views.matches_won_per_team),
    path('extra-runs/<int:year>/', views.extra_runs_per_team),
    path('top-bowlers/<int:year>/', views.top_economical_bowlers),
    path('matches-stats/<int:year>/', views.matches_played_vs_won),
    path('available-years/', views.available_years),
]