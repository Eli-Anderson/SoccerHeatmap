from db_connection import Connector
from pprint import pprint

def searchTeam(team_name):
    connection =  Connector()
    statement = 'select long_name from soccer02.team where long_name = \'' + team_name + '\''
    connection.cursor.execute(statement)
    res = connection.cursor.fetchall()
    pprint(res)

team_name = 'Feirense'
searchTeam(team_name)