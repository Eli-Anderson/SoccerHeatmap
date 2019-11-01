import json
from db_factory import DB_Factory
from flask import Flask
db = DB_Factory()
app = Flask(__name__)

# This is the API for the communication between the back-end and the front-end
# Here are all the functions defined which are to be used.

""" method
:param root:
:returns:
"""
############----METHODS-----################################################
#        IMPORTANT COMMENT: All returns will be JSON-strings.              #
#                           "x" means "done".                              #
############################################################################
# ... for all ...
# - Searching functionality for the "all"-methods.
#
# ... for the events...
# x- Returns all types of events.
@app.route("lists/allEventTypes")
def allEventTypes():
    dummy = db.list_all_events()
    result = json.dumps(dummy)
    return result 
#
# x- Gets a string. Returns a concrete event as an event-object (JSON-String) 
#   containing at least the following information: 
#   position, event type, elapsed time and (maybe) comment.
#
# ...for the teams...
# x- Returns all teams.
@app.route("lists/allTeams")
def allTeams():
    dummy = db.list_all_teams()
    result = json.dumps(dummy)
    return result
# x- Gets a team name as a string. Returns all matches of the team and results
@app.route("search/teamsMatches")
def teamMatches(team_name):
    dummy = db.search_home_teams_matches(team_name)
    result = json.dumps(dummy)
    return result
# - 
#
# ...for the players...
# x- Returns all players.
@app.route("/lists/allPlayers")
def allPlayers():
    dummy = db.list_all_players()
    result = json.dumps(dummy)
    return result

#
# ...for the matches...
# x- Returns all matches.
@app.route("lists/allMatches")
def allMatches():
    dummy = db.list_all_matches()
    result = json.dumps(dummy)
    return result 
# x- Gets a the name of the home team and the away team and the date of the 
#   played match as a string. Returns players, events and the result of 
#   the match.
@app.route("search/Match")
def match(home_team, away_team, date):
    dummy = db.match_details(home_team, away_team, date)
    result = json.dumps(dummy)
    return result
#
#################################################################################
app.run(port=3001, debug = True)
db.close()