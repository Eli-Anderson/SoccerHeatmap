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
# x- Gets a string. Returns all events of a given event type.
# x- Gets a string. Returns a concrete event as an event-object (JSON-String) 
#   containing at least the following information: 
#   position, event type, elapsed time and (maybe) comment.
#
# ...for the teams...
# x- Returns all teams.
# x- Gets a team name as a string. Returns all names of the team and the 
#   players of the team.
# - 
#
# ...for the players...
# x- Returns all players.
# x- Gets a player name as a string. Returns the given player with the current 
#   team he is playing in.
#
# ...for the matches...
# x- Returns all matches.
# x- Gets a the name of the home team and the away team and the date of the 
#   played match as a string. Returns players, events and the result of 
#   the match.
#
#################################################################################