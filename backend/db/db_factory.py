from DB_Connection import Connection
from pprint import pprint

class DB_Factory:

    connection = Connection()

    def searchTeam(self, team_name):
        #String translation in SQL Query
        statement = 'select long_name from soccer02.team where long_name = \'' + team_name + '\''
        self.connection.cursor.execute(statement)
        res = self.connection.cursor.fetchall()
        pprint(res)

    def close(self):
        self.connection.close()