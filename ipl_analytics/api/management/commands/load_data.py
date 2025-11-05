# api/management/commands/load_data.py
from django.core.management.base import BaseCommand
import pandas as pd
from datetime import datetime
from api.models import Match, Delivery


class Command(BaseCommand):
    help = 'Load IPL data from CSV files'

    def handle(self, *args, **kwargs):
        # Load matches
        matches_df = pd.read_csv('api/management/commands/matches.csv')
        matches_df['date'] = pd.to_datetime(matches_df['date'])

        for _, row in matches_df.iterrows():
            Match.objects.update_or_create(
                match_id=row['id'],
                defaults={
                    'season': row['season'],
                    'city': row['city'] if pd.notna(row['city']) else None,
                    'date': row['date'],
                    'team1': row['team1'],
                    'team2': row['team2'],
                    'toss_winner': row['toss_winner'],
                    'toss_decision': row['toss_decision'],
                    'result': row['result'],
                    'dl_applied': row['dl_applied'],
                    'winner': row['winner'] if pd.notna(row['winner']) else None,
                    'win_by_runs': row['win_by_runs'],
                    'win_by_wickets': row['win_by_wickets'],
                    'player_of_match': row['player_of_match'] if pd.notna(row['player_of_match']) else None,
                    'venue': row['venue'],
                    'umpire1': row['umpire1'] if pd.notna(row['umpire1']) else None,
                    'umpire2': row['umpire2'] if pd.notna(row['umpire2']) else None,
                    'umpire3': row['umpire3'] if pd.notna(row['umpire3']) else None,
                }
            )

        self.stdout.write(self.style.SUCCESS('Matches loaded successfully'))

        # Load deliveries
        deliveries_df = pd.read_csv('api/management/commands/deliveries.csv')

        batch_size = 1000
        deliveries_to_create = []

        for _, row in deliveries_df.iterrows():
            deliveries_to_create.append(
                Delivery(
                    match_id=row['match_id'],
                    inning=row['inning'],
                    batting_team=row['batting_team'],
                    bowling_team=row['bowling_team'],
                    over=row['over'],
                    ball=row['ball'],
                    batsman=row['batsman'],
                    non_striker=row['non_striker'],
                    bowler=row['bowler'],
                    is_super_over=row['is_super_over'],
                    wide_runs=row['wide_runs'],
                    bye_runs=row['bye_runs'],
                    legbye_runs=row['legbye_runs'],
                    noball_runs=row['noball_runs'],
                    penalty_runs=row['penalty_runs'],
                    batsman_runs=row['batsman_runs'],
                    extra_runs=row['extra_runs'],
                    total_runs=row['total_runs'],
                    player_dismissed=row['player_dismissed'] if pd.notna(row['player_dismissed']) else None,
                    dismissal_kind=row['dismissal_kind'] if pd.notna(row['dismissal_kind']) else None,
                    fielder=row['fielder'] if pd.notna(row['fielder']) else None,
                )
            )

            if len(deliveries_to_create) >= batch_size:
                Delivery.objects.bulk_create(deliveries_to_create)
                deliveries_to_create = []
                self.stdout.write(self.style.SUCCESS(f'Batch inserted'))

        if deliveries_to_create:
            Delivery.objects.bulk_create(deliveries_to_create)

        self.stdout.write(self.style.SUCCESS('Deliveries loaded successfully'))
