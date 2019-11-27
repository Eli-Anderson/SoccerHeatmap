from db_connection import Connection
from pprint import pprint

class DB_Factory:

    # Returns all teams as a string-list by converting the query-tupel-results in a list of strings
    def list_all_teams(self):
        con = Connection()
        # String translation in SQL Query
        statement = 'select distinct * from soccer02.team'
        con.cur.execute(statement)
        res_tupel = con.cur.fetchall()
        res_string_list = [str(i[0]) for i in res_tupel]
        con.close()
        return res_tupel

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
        statement = 'select distinct event_type from soccer02.matchevent where event_type is not null'
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
        #pprint(res)
        con.close()
        return res

    def search_home_teams_matches(self, team_name):
        search_string = '' + team_name
        con = Connection()
        statement = 'select team.long_name, match.result from soccer02.team ' \
                    'inner join soccer02.match on team.team_id = match.team_hometeam_id ' \
                    'where upper(long_name) =\'' + search_string.upper() + '\'' \
		    'and team.long_name is not null and match.result is not null and team_id is not null ' \
		    'and team_hometeam_id is not null'
        con.cur.execute(statement)
        res = con.cur.fetchall()
        #pprint(res)
        con.close()
        return res

    def search_away_teams_matches(self, team_name):
        search_string = '' + team_name
        con = Connection()
        statement = 'select team.long_name, match.result from soccer02.team ' \
                    'inner join soccer02.match on team.team_id = match.team_hometeam_id ' \
                    'where upper(long_name) =\'' + search_string.upper() + '\'' \
		    'and team.long_name is not null and match.result is not null and team_id is not null ' \
		    'and team_hometeam_id is not null'
        con.cur.execute(statement)
        res = con.cur.fetchall()
        #pprint(res)
        con.close()
        return res
    
    # Heat-map for all attempts on goal of a player from all data
    def player_heatmap_fouls(self, player_name):
        con = Connection()
        search_string = '' + player_name
        statement = 'select pos_x, pos_y ' \
                    'from soccer02.player ' \
                    'join soccer02.matchevent on soccer02.player.player_id = soccer02.matchevent.player_player_id ' \
                    'where upper(soccer02.player.name) like \'%' + search_string.upper() + '%\'and event_type like \'foulcommit\' ' \
		    'and pos_x is not null and pos_y is not null and player.name is not null and player_id is not null ' \
		    'and player_player_id is not null'
        #print(statement)
        con.cur.execute(statement)
        res = con.cur.fetchall()
        #pprint(res)
        return res

    # corner
    def player_heatmap_corner(self, player_name):
        search_string = '' + player_name
        con = Connection()
        statement = 'select pos_x, pos_y ' \
                    'from soccer02.player ' \
                    'join soccer02.matchevent on soccer02.player.player_id = soccer02.matchevent.player_player_id ' \
                    'where upper(soccer02.player.name) like \'%' + search_string.upper() + '%\'and event_type like \'corner\' ' \
                    'and pos_x is not null and pos_y is not null and player.name is not null and player_id is not null ' \
                    'and player_player_id is not null'
        #print(statement)
        con.cur.execute(statement)
        res = con.cur.fetchall()
        #pprint(res)
        return res

    # goals
    def player_heatmap_goal(self, player_name):
        search_string = '' + player_name
        con = Connection()
        statement = 'select pos_x, pos_y ' \
                    'from soccer02.player ' \
                    'join soccer02.matchevent on soccer02.player.player_id = soccer02.matchevent.player_player_id ' \
                    'where upper(soccer02.player.name) like \'%' + search_string.upper() + '%\'and event_type like \'goal\' ' \
                    'and pos_x is not null and pos_y is not null and player.name is not null and player_id is not null ' \
                    'and player_player_id is not null'
        #print(statement)
        con.cur.execute(statement)
        res = con.cur.fetchall()
        #pprint(res)
        return res

    # shoton
    def player_heatmap_shoton(self, player_name):
        search_string = '' + player_name
        con = Connection()
        statement = 'select pos_x, pos_y ' \
                    'from soccer02.player ' \
                    'join soccer02.matchevent on soccer02.player.player_id = soccer02.matchevent.player_player_id ' \
                    'where upper(soccer02.player.name) like \'%' + search_string.upper() + '%\'and event_type like \'shoton\' ' \
                    'and pos_x is not null and pos_y is not null and player.name is not null and player_id is not null ' \
                    'and player_player_id is not null'
        #print(statement)
        con.cur.execute(statement)
        res = con.cur.fetchall()
        #pprint(res)
        return res

    # shot off
    def player_heatmap_shotoff(self, player_name):
        search_string = '' + player_name
        con = Connection()
        statement = 'select pos_x, pos_y ' \
                    'from soccer02.player ' \
                    'join soccer02.matchevent on soccer02.player.player_id = soccer02.matchevent.player_player_id ' \
                    'where upper(soccer02.player.name) like \'%' + search_string.upper() + '%\'and event_type like \'shotoff\' ' \
                    'and pos_x is not null and pos_y is not null and player.name is not null and player_id is not null ' \
                    'and player_player_id is not null'
        #print(statement)
        con.cur.execute(statement)
        res = con.cur.fetchall()
        #pprint(res)
        return res

    def search_matches_by_team_id(self, team_id):
        search_string = '\'' + team_id + '\''
        con = Connection()
        statement = 'select match_id, team_hometeam_id, team_awayteam_id, home_team_goal, away_team_goal, "date" from soccer02.match ' \
            'where team_hometeam_id = '+ team_id +' or team_awayteam_id = ' + team_id + ' ' \
		    'and team_hometeam_id is not null and team_awayteam_id is not null and home_team_goal is not null ' \
		    'and away_team_goal is not null'
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