from db_connection import Connection
from pprint import pprint

class DB_Factory:

    connection = Connection()

    def searchTeam(self, team_name):
        # String translation in SQL Query
        statement = 'select long_name from soccer02.team where long_name = \'' + team_name + '\''
        self.connection.cursor.execute(statement)
        res = self.connection.cursor.fetchall()
        pprint(res)
    
    def search_home_teams_matches(self, team_name):
         # String translation in SQL Query
        statement = 'select team.long_name, match.result from soccer02.team ' \
                    'inner join soccer02.match on team.team_id = match.team_hometeam_id ' \
                    'where long_name = \'' + team_name + '\''
        self.connection.cursor.execute(statement)
        res = self.connection.cursor.fetchall()
        pprint(res)

    def search_away_teams_matches(self, team_name):
        # String translation in SQL Query
        statement = 'select team.long_name, match.result from soccer02.team ' \
                    'inner join soccer02.match on team.team_id = match.team_awayteam_id ' \
                    'where long_name = \'' + team_name + '\''
        self.connection.cursor.execute(statement)
        res = self.connection.cursor.fetchall()
        pprint(res)

    def close(self):
        self.connection.close()

db = DB_Factory()
db.search_home_teams_matches('Tubize')
db.search_away_teams_matches('Tubize')
db.close()