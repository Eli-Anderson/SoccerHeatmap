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
        search_string = '' + team_name
        statement = 'select long_name, short_name from soccer02.team where upper(long_name) like \'%' + search_string.upper() + '%\' ' \
		    'and long_name is not null and short_name is not null;'
        self.connection.cursor.execute(statement)
        res_tupel = self.connection.cursor.fetchall()
        print("#### Type: ", type(res_tupel))
        print("#### Result: ", res_tupel)
        print("#### 1. Element of the tuple: ", res_tupel[0][0])
        return res_tupel

    # Returns all matchevents as a string-list
    def list_all_events(self):
        statement = 'select distinct event_type, sub_type from soccer02.matchevent and event_type is not null and sub_type is not null;'
        self.connection.cursor.execute(statement)
        res_tupel = self.connection.cursor.fetchall()
        res_string_list = [str(i[0]) for i in res_tupel]
        return res_string_list
    
    def list_all_players(self):
        statement = 'select name from soccer02.player where name is not null;'
        self.connection.cursor.execute(statement)
        res = self.connection.cursor.fetchall()
        #pprint(res)
        return res

    def list_event_by_name(self, event_type):
        search_string = '' + event_type
        statement = 'select distinct * from soccer02.matchevent ' \
                    'where upper(event_type) like \'%' + search_string.upper() + '%\' ' \
		    'and pos_x is not null and pos_y is not null;'
        self.connection.cursor.execute(statement)
        res = self.connection.cursor.fetchall()
        pprint(res)
        return res

    def specific_event(self, event_id):
        statement = 'select pos_x, pos_y, event_type, elapsed, "comment" from soccer02.matchevent ' \
                    'where matchevent_id = ' + event_id + \
		            'and pos_x is not null and pos_y is not null and event_type is not null ' \
                    'and elapsed is not null and "comment" is not null;'
        pprint(statement)
        self.connection.cursor.execute(statement)
        res = self.connection.cursor.fetchall()
        pprint(res)
        return res


    # Returns all matches as a string-list
    def list_all_matches(self):
        statement = 'select distinct "date", result, home_team_goal, away_team_goal from soccer02.match ' \
		    'where "date" is not null and result is not null and home_team_goal is not null ' \
		    'and away_team_goal is not null;'
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
                    'where upper(long_name) like \'%' + home_team_name + '%\' ' \
		    'and player.name is not null and match.result is not null and team.team_id is not null ' \
		    'and match.team_awayteam_id is not null;'
        self.connection.cursor.execute(statement)
        res = self.connection.cursor.fetchall()
        pprint(res)
        return res

    def search_home_teams_matches(self, team_name):
        search_string = '' + team_name
        statement = 'select team.long_name, match.result from soccer02.team ' \
                    'inner join soccer02.match on team.team_id = match.team_hometeam_id ' \
                    'where upper(long_name) like \'%' + search_string.upper() + '%\' ' \
		    'and team.long_name is not null and match.result is not null and team_id is not null ' \
		    'and team_hometeam_id is not null;'
        self.connection.cursor.execute(statement)
        res = self.connection.cursor.fetchall()
        pprint(res)
        return res

    def search_away_teams_matches(self, team_name):
        search_string = '' + team_name
        statement = 'select team.long_name, match.result from soccer02.team ' \
                    'inner join soccer02.match on team.team_id = match.team_awayteam_id ' \
                    'where upper(long_name) like \'%' + search_string.upper() + '%\' ' \
		    'and long_name is not null and result is not null and team_id is not null ' \
		    'and team_awayteam_id is not null;'
        self.connection.cursor.execute(statement)
        res = self.connection.cursor.fetchall()
        pprint(res)
        return res
    
    # Heat-map for all attempts on goal of a player from all data
    def player_heatmap_fouls(self, player_name):
        search_string = '' + player_name
        statement = 'select pos_x, pos_y ' \
                    'from soccer02.player ' \
                    'join soccer02.matchevent on soccer02.player.player_id = soccer02.matchevent.player_player_id ' \
                    'where upper(soccer02.player.name) like \'%' + search_string.upper() + '%\'and event_type like \'foulcommit\' ' \
		            'and pos_x is not null and pos_y is not null and player.name is not null and player_id is not null ' \
		            'and player_player_id is not null'
        self.connection.cursor.execute(statement)
        res = self.connection.cursor.fetchall()
        pprint(res)
        return res

    def close(self):
        self.connection.close()

    # For the machine-learning-module. 
    def all_foulcommits(self):
        statement = 'select elapsed, elapsed_plus, pos_x, pos_y, ' \
                    'event_type, sub_type, team_team_id, ' \
                    'player_player_id, match_match_id, card_type, venue, ' \
                    'player_playerfouled, matchevent_id, ' \
                    'matchevent_ext_id from matchevent ' \
                    'where event_type like \'foulcommit\' ' \
                    'and team_team_id is not null ' \
                    'and player_player_id is not null ' \
                    'and pos_x is not null ' \
                    'and pos_y is not null ' \
                    'and elapsed is not null ' \
                    'and matchevent_id <=2260000' \
                    'order by matchevent_id desc'
        self.connection.cursor.execute(statement)
        res = self.connection.cursor.fetchall()
        return res