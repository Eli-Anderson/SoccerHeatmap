from db_connection import Connection
from pprint import pprint

class DB_Factory:
    
    # This is a classvariable meaning all instances access to the same connection
    connection = Connection()

    # Returns all teams as a string-list by converting the query-tupel-results in a list of strings
    def list_all_teams(self):
        # String translation in SQL Query
        statement = 'select distinct long_name from soccer02.team'
        self.connection.cursor.execute(statement)
        res_tupel = self.connection.cursor.fetchall()
        res_string_list = [str(i[0]) for i in res_tupel]
        # pprint(self.connection.cursor.description)
        return res_string_list
    
    def search_team(self, team_name):
        statement = 'select long_name, short_name from soccer02.team where long_name = \'' + team_name + '\''
        self.connection.cursor.execute(statement)
        res_tupel = self.connection.cursor.fetchall()
        print("#### Type: ", type(res_tupel))
        print("#### Result: ", res_tupel)
        print("#### 1. Element of the tuple: ", res_tupel[0][0])
        return res_tupel

    # Returns all matchevents as a string-list
    def list_all_events(self):
        statement = 'select distinct event_type, sub_type from soccer02.matchevent'
        self.connection.cursor.execute(statement)
        res_tupel = self.connection.cursor.fetchall()
        res_string_list = [str(i[0]) for i in res_tupel]
        return res_string_list
    
    def list_all_players(self):
        statement = 'select name from soccer02.player'
        self.connection.cursor.execute(statement)
        res = self.connection.cursor.fetchall()
        #pprint(res)
        return res

    def list_event_by_name(self, event_type):
        statement = 'select * from soccer02.matchevent ' \
                    'where event_type = \'' + event_type + '\''
        self.connection.cursor.execute(statement)
        res = self.connection.cursor.fetchall()
        pprint(res)
        return res

    def specific_event(self, event_id):
        statement = 'select pos_x, pos_y, event_type, elapsed, "comment" from soccer02.matchevent ' \
                    'where matchevent_id = ' + event_id
        pprint(statement)
        self.connection.cursor.execute(statement)
        res = self.connection.cursor.fetchall()
        pprint(res)
        return res


    # Returns all matches as a string-list
    def list_all_matches(self):
        statement = 'select distinct "date", result, home_team_goal, away_team_goal from soccer02.match'
        self.connection.cursor.execute(statement)
        res_tupel = self.connection.cursor.fetchall()
        res_string_list = [str(i[0]) for i in res_tupel]
        pprint(res_tupel)
        pprint(res_string_list)
        pprint(self.connection.cursor.description)
        return res_string_list
    # TODO
    def match_details(self, home_team_name, away_team_name, date):
        statement = 'select player.name, match.result from soccer02.player, soccer02.match ' \
                    'inner join soccer02.match on team.team_id = match.team_awayteam_id ' \
                    'where long_name = \'' + home_team_name + '\''
        self.connection.cursor.execute(statement)
        res = self.connection.cursor.fetchall()
        pprint(res)
        return res

    def search_home_teams_matches(self, team_name):
        statement = 'select team.long_name, match.result from soccer02.team ' \
                    'inner join soccer02.match on team.team_id = match.team_hometeam_id ' \
                    'where long_name = \'' + team_name + '\''
        self.connection.cursor.execute(statement)
        res = self.connection.cursor.fetchall()
        pprint(res)
        return res

    def search_away_teams_matches(self, team_name):
        statement = 'select team.long_name, match.result from soccer02.team ' \
                    'inner join soccer02.match on team.team_id = match.team_awayteam_id ' \
                    'where long_name = \'' + team_name + '\''
        self.connection.cursor.execute(statement)
        res = self.connection.cursor.fetchall()
        pprint(res)
        return res
    
    # Heat-map for all attempts on goal of a player from all data
    def player_heatmap_goals(self, player_name):
        statement = 'select * ' \
                    'from soccer02.player ' \
                    'join soccer02.matchevent on soccer02.player.player_id = soccer02.matchevent.player_player_id ' \
                    'where soccer02.player.name like \'' + player_name + '\' and event_type like \'goal\''
        self.connection.cursor.execute(statement)
        res = self.connection.cursor.fetchall()
        pprint(res)
        return res

    def close(self):
        self.connection.close()