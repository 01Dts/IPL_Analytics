from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.db.models import Count, Sum, Q, F, FloatField
from django.db.models.functions import Cast
from .models import Match, Delivery


@api_view(['GET'])
def matches_per_year(request):
    data = Match.objects.values('season').annotate(
        matches=Count('match_id')
    ).order_by('season')
    return Response(list(data))


@api_view(['GET'])
def matches_won_per_team(request):
    data = Match.objects.filter(winner__isnull=False).values(
        'season', 'winner'
    ).annotate(
        wins=Count('match_id')
    ).order_by('season', 'winner')
    return Response(list(data))


@api_view(['GET'])
def extra_runs_per_team(request, year):
    deliveries = Delivery.objects.filter(
        match__season=year
    ).values('bowling_team').annotate(
        extra_runs=Sum('extra_runs')
    ).order_by('-extra_runs')
    return Response(list(deliveries))


@api_view(['GET'])
def top_economical_bowlers(request, year):
    bowler_stats = Delivery.objects.filter(
        match__season=year
    ).values('bowler').annotate(
        total_runs=Sum('total_runs'),
        balls=Count('ball')
    ).annotate(
        economy=Cast(F('total_runs') * 6.0, FloatField()) / Cast(F('balls'), FloatField())
    ).filter(balls__gte=36).order_by('economy')[:10]

    return Response(list(bowler_stats))


@api_view(['GET'])
def matches_played_vs_won(request, year):
    # Matches played
    played = Match.objects.filter(
        Q(team1__isnull=False) | Q(team2__isnull=False),
        season=year
    ).values('team1', 'team2')

    teams_played = {}
    for match in played:
        teams_played[match['team1']] = teams_played.get(match['team1'], 0) + 1
        teams_played[match['team2']] = teams_played.get(match['team2'], 0) + 1

    # Matches won
    won = Match.objects.filter(
        season=year,
        winner__isnull=False
    ).values('winner').annotate(wins=Count('match_id'))

    teams_won = {item['winner']: item['wins'] for item in won}

    result = []
    for team in teams_played:
        result.append({
            'team': team,
            'played': teams_played[team],
            'won': teams_won.get(team, 0)
        })

    return Response(result)


@api_view(['GET'])
def available_years(request):
    years = Match.objects.values_list('season', flat=True).distinct().order_by('season')
    return Response(list(years))