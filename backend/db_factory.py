from db_connection import Connection
from pprint import pprint

class DB_Factory:

    # Returns all teams as a string-list by converting the query-tupel-results in a list of strings
    def list_all_teams(self):
        con = Connection()
        # String translation in SQL Query
        statement = 'select distinct * from soccer02.team'
        con.cur.execute(statement)
        res = con.cur.fetchall()
        con.close()
        return res

    def list_teams_with_events(self):
        con = Connection()
        # String translation in SQL Query
        statement = 'select distinct * from soccer02.team ' \
                    'where team_id in ' \
                    '(select team_team_id from soccer02.matchevent where pos_x is not null and pos_y is not null group by team_team_id)'
        con.cur.execute(statement)
        res = con.cur.fetchall()
        con.close()
        return res


    def search_team(self, team_name):
        search_string = '' + team_name
        con = Connection()
        statement = 'select long_name, short_name from soccer02.team where upper(long_name) like \'%' + search_string.upper() + '%\' ' \
		    'and long_name is not null and short_name is not null'
        con.cur.execute(statement)
        res_tupel = con.cur.fetchall()
        print("#### Type: ", type(res_tupel))
        print("#### Result: ", res_tupel)
        print("#### 1. Element of the tuple: ", res_tupel[0][0])
        con.close()
        return res_tupel

    # Returns all matchevents as a string-list
    def list_all_events(self):
        con = Connection()
        statement = 'select distinct event_type from soccer02.matchevent where event_type is not null and pos_x is not null and pos_y is not null'
        con.cur.execute(statement)
        res_tupel = con.cur.fetchall()
        res_string_list = [str(i[0]) for i in res_tupel]
        con.close()
        return res_string_list

    def list_all_players(self):
        con = Connection()
        statement = 'select name from soccer02.player where name is not null and rownum <= 500'
        con.cur.execute(statement)
        res = con.cur.fetchall()
        con.close()
        return res

    def list_event_by_name(self, event_type):
        search_string = '' + event_type
        con = Connection()
        statement = 'select distinct * from soccer02.matchevent ' \
                    'where upper(event_type) like \'%' + search_string.upper() + '%\' ' \
		    'and pos_x is not null and pos_y is not null'
        con.cur.execute(statement)
        res = con.cur.fetchall()
        return res

    def specific_event(self, event_id):
        con = Connection()
        statement = 'select pos_x, pos_y, event_type, elapsed, "comment" from soccer02.matchevent ' \
                    'where matchevent_id = ' + event_id + ' ' \
                    'and pos_x is not null and pos_y is not null and event_type is not null ' \
                    'and elapsed is not null and "comment" is not null'
        con.cur.execute(statement)
        res = con.cur.fetchall()
        return res


    # Returns all matches as a string-list
    def list_all_matches(self):
        con = Connection()
        statement = 'select distinct "date", result, home_team_goal, away_team_goal from soccer02.match ' \
		    'where "date" is not null and result is not null and home_team_goal is not null ' \
		    'and away_team_goal is not null'
        con.cur.execute(statement)
        res_tupel = con.cur.fetchall()
        res_string_list = [str(i[0]) for i in res_tupel]
        con.close()
        return res_string_list

    # TODO date-format needs to be like '20081220 00:00:00.000'
    # SELECT TO_DATE('2012-06-05', 'YYYY-MM-DD') FROM dual
    def match_details(self, home_team_name, away_team_name, date):
        con = Connection()
        statement = 'select player.name, match.result from soccer02.player, soccer02.match ' \
                    'inner join soccer02.match on team.team_id = match.team_awayteam_id ' \
                    'where upper(long_name) like \'%' + home_team_name + '%\' and date = \'' + date + '\' ' \
		    'and player.name is not null and match.result is not null and team.team_id is not null ' \
		    'and match.team_awayteam_id is not null'
        con.cur.execute(statement)
        res = con.cur.fetchall()
        con.close()
        return res

    def search_team(self, team_name):
        search_string = '' + team_name
        con = Connection()
        statement = 'select long_name, short_name from soccer02.team where upper(long_name) like \'%' + search_string.upper() + '%\' ' \
                    'and long_name is not null and short_name is not null'
        con.cur.execute(statement)
        res_tupel = con.cur.fetchall()
        print("#### Type: ", type(res_tupel))
        print("#### Result: ", res_tupel)
        print("#### 1. Element of the tuple: ", res_tupel[0][0])
        con.close()
        return res_tupel

    def get_players_with_event(self, event_type):
        event_type_str = '\''+ event_type + '\''
        con = Connection()
        statement = 'select name, player_id from soccer02.player where name is not null and player_id in (select player_player_id from soccer02.matchevent where player_player_id = player_id and pos_x is not null and pos_y is not null and event_type = '+ event_type_str +')'
        con.cur.execute(statement)
        res_tupel = con.cur.fetchall()
        con.close()
        return res_tupel

    def search_player_with_event(self, player_name, event_type):
        search_string = '' + player_name
        event_type_str = '\''+ event_type + '\''
        con = Connection()
        statement = 'select name, player_id from soccer02.player where upper(name) like \'%' + search_string.upper() + '%\' ' \
		    'and name is not null and player_id in (select player_player_id from soccer02.matchevent where player_player_id = player_id and pos_x is not null and pos_y is not null and event_type = '+ event_type_str +') and rownum <= 30'
        con.cur.execute(statement)
        res_tupel = con.cur.fetchall()
        con.close()
        return res_tupel

    def search_matches_by_team_id(self, team_id, event_type):
        str_event_type = '\'' + event_type + '\''
        con = Connection()
        statement = 'select match_id, team_hometeam_id, team_awayteam_id, home_team_goal, away_team_goal, "date" from soccer02.match ' \
            'where (team_hometeam_id = '+ team_id +' or team_awayteam_id = ' + team_id + ') ' \
		    'and team_hometeam_id is not null and team_awayteam_id is not null and home_team_goal is not null ' \
		    'and away_team_goal is not null ' \
            'and match_id in (select match_match_id from soccer02.matchevent where match_match_id = match_id and event_type = '+ str_event_type +' and pos_x is not null and pos_y is not null)'

        con.cur.execute(statement)
        res = con.cur.fetchall()
        con.close()
        return res

    # Get heatmap data for a match based on given match_id and event_type
    def match_heatmap(self, match_id, event_type):
        con = Connection()
        statement = 'select pos_x, pos_y ' \
                    'from soccer02.matchevent ' \
                    'where match_match_id = ' + match_id + '' \
                    'and event_type = \'' + event_type + '\'' \
                    'and pos_x is not null and pos_y is not null'
        con.cur.execute(statement)
        res = con.cur.fetchall()
        return res

    # Get heatmap data for a match based on given player_name and event_type
    def player_heatmap(self, player_name, event_type):
        con = Connection()
        statement = 'select pos_x, pos_y ' \
                    'from soccer02.player ' \
                    'join soccer02.matchevent on soccer02.player.player_id = soccer02.matchevent.player_player_id ' \
                    'where upper(soccer02.player.name) = \'' + player_name.upper() + '\' and event_type = \'' + event_type + '\' ' \
                    'and pos_x is not null and pos_y is not null and player.name is not null and player_id is not null ' \
                    'and player_player_id is not null'
        con.cur.execute(statement)
        res = con.cur.fetchall()
        return res

    # Get heatmap data for a match based on given team_id and event_type
    def team_heatmap(self, team_id, event_type):
        con = Connection()
        statement = 'select pos_x, pos_y ' \
                    'from soccer02.matchevent ' \
                    'where team_team_id = ' + team_id + '' \
                    'and event_type = \'' + event_type + '\'' \
                    'and pos_x is not null and pos_y is not null'
        con.cur.execute(statement)
        res = con.cur.fetchall()
        return res