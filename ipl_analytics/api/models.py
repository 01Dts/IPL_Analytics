from django.db import models


class Match(models.Model):
    match_id = models.IntegerField(primary_key=True)
    season = models.IntegerField()
    city = models.CharField(max_length=100, null=True, blank=True)
    date = models.DateField()
    team1 = models.CharField(max_length=100)
    team2 = models.CharField(max_length=100)
    toss_winner = models.CharField(max_length=100)
    toss_decision = models.CharField(max_length=20)
    result = models.CharField(max_length=20)
    dl_applied = models.IntegerField(default=0)
    winner = models.CharField(max_length=100, null=True, blank=True)
    win_by_runs = models.IntegerField(default=0)
    win_by_wickets = models.IntegerField(default=0)
    player_of_match = models.CharField(max_length=100, null=True, blank=True)
    venue = models.CharField(max_length=200)
    umpire1 = models.CharField(max_length=100, null=True, blank=True)
    umpire2 = models.CharField(max_length=100, null=True, blank=True)
    umpire3 = models.CharField(max_length=100, null=True, blank=True)

    class Meta:
        db_table = 'matches'


class Delivery(models.Model):
    match = models.ForeignKey(Match, on_delete=models.CASCADE, db_column='match_id')
    inning = models.IntegerField()
    batting_team = models.CharField(max_length=100)
    bowling_team = models.CharField(max_length=100)
    over = models.IntegerField()
    ball = models.IntegerField()
    batsman = models.CharField(max_length=100)
    non_striker = models.CharField(max_length=100)
    bowler = models.CharField(max_length=100)
    is_super_over = models.IntegerField(default=0)
    wide_runs = models.IntegerField(default=0)
    bye_runs = models.IntegerField(default=0)
    legbye_runs = models.IntegerField(default=0)
    noball_runs = models.IntegerField(default=0)
    penalty_runs = models.IntegerField(default=0)
    batsman_runs = models.IntegerField(default=0)
    extra_runs = models.IntegerField(default=0)
    total_runs = models.IntegerField(default=0)
    player_dismissed = models.CharField(max_length=100, null=True, blank=True)
    dismissal_kind = models.CharField(max_length=50, null=True, blank=True)
    fielder = models.CharField(max_length=100, null=True, blank=True)

    class Meta:
        db_table = 'deliveries'
