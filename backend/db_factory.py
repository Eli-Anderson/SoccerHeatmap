from db_connection import Connection
from pprint import pprint

class DB_Factory:
    
    # This is a classvariable meaning all instances access to the same connection
    connection = Connection()

    # Returns all teams as a stringlist by converting the query-tupel-results in a list of strings
    def list_all_teams(self):
        statement = 'select distinct long_name from soccer02.team'
        self.connection.cursor.execute(statement)
        res_tupel = self.connection.cursor.fetchall()
        res_string_list = [str(i[0]) for i in res_tupel]
        pprint(res_tupel)
        pprint(res_string_list)
        pprint(self.connection.cursor.description)
        return res_string_list

    def search_team(self, team_name):
        # String translation in SQL Query
        statement = 'select long_name, short_name from soccer02.team where long_name = \'' + team_name + '\''
        self.connection.cursor.execute(statement)
        res_tupel = self.connection.cursor.fetchall()
        print("#### Type: ", type(res_tupel))
        print("#### Result: ", res_tupel)
        print("#### 1. Element: ", res_tupel[0][0])
        
        
        return res_tupel
    
    def search_home_teams_matches(self, team_name):
         # String translation in SQL Query
        statement = 'select team.long_name, match.result from soccer02.team ' \
                    'inner join soccer02.match on team.team_id = match.team_hometeam_id ' \
                    'where long_name = \'' + team_name + '\''
        self.connection.cursor.execute(statement)
        res = self.connection.cursor.fetchall()
        pprint(res)
        return res

    def search_away_teams_matches(self, team_name):
        # String translation in SQL Query
        statement = 'select team.long_name, match.result from soccer02.team ' \
                    'inner join soccer02.match on team.team_id = match.team_awayteam_id ' \
                    'where long_name = \'' + team_name + '\''
        self.connection.cursor.execute(statement)
        res = self.connection.cursor.fetchall()
        pprint(res)
        return res

    def close(self):
        self.connection.close()