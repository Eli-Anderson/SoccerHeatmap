import json
from db_factory import DB_Factory
from flask import Flask
from flask_cors import CORS
from flask_caching import Cache
db = DB_Factory()
app = Flask(__name__)
CORS(app)
cache = Cache(app, config={'CACHE_TYPE': 'simple'})

'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''
This is the API for the communication between the back-end and the front-end.
Here are all the functions defined which are to be used.

############################----METHODS-----################################
#        IMPORTANT COMMENT: All returns will be JSON-strings.              #
#                           "x" means "done".                              #
############################################################################
'''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''''

""" Returns all types of events.
:returns: Result as JSON.
"""
@app.route("/lists/allEventTypes")
@cache.cached(timeout=500, key_prefix='all_comments')
def allEventTypes():
    dummy = db.list_all_events()
    result = json.dumps(dummy)
    return result 

""" Returns all teams.
:returns: Result as JSON.
"""
@app.route("/lists/allTeams")
@cache.cached(timeout=500, key_prefix='all_comments')
def allTeams():
    dummy = db.list_all_teams()
    result = json.dumps(dummy)
    return result

""" Returns all matches of the team and results
:param team_name: The name of the team as a string.
:returns: Result as JSON.
"""
@app.route("/search/teamsMatches/<team_name>")
@cache.cached(timeout=500, key_prefix='all_comments')
def teamMatches(team_name):
    dummy = db.search_home_teams_matches(team_name)
    result = json.dumps(dummy)
    return result

""" Returns all players.
:returns: Result as JSON.
"""
@app.route("/lists/allPlayers")
@cache.cached(timeout=500, key_prefix='all_comments')
def allPlayers():
    dummy = db.list_all_players()
    result = json.dumps(dummy)
    return result

""" Returns all matches.
:returns: Result as JSON.
"""
@app.route("/lists/allMatches")
@cache.cached(timeout=500, key_prefix='all_comments')
def allMatches():
    dummy = db.list_all_matches()
    result = json.dumps(dummy)
    return result 

""" Returns players, events and the result of the match.
:param home_team: Name of the home team.
:param away_team: Name of the away team.
:param date: Date of the match.
:returns: Result as JSON.
"""
@app.route("/search/Match/<home_team>/<away_team>/<date>")
@cache.cached(timeout=500, key_prefix='all_comments')
def match(home_team, away_team, date):
    dummy = db.match_details(home_team, away_team, date)
    result = json.dumps(dummy)
    return result

################################################# Heatmap

""" Heat-map for all attempts on goal of a player from all data
:param player_name: Name of the player.
:returns: Result as JSON.
"""
@app.route("/fouls/<player_name>")
@cache.cached(timeout=500, key_prefix='all_comments')
def player_heatmap_fouls(player_name):
    dummy = db.player_heatmap_fouls(player_name)
    result = json.dumps(dummy)
    return result

"""
Running service.
"""
app.run(port=3001, debug = True, threaded=True)
db.close()