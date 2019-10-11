import cx_Oracle
import os, sys
from pprint import pprint

class Connection:
  
    def __init__(self):
        # configuration file path.
        config_file = open(os.path.join(sys.path[0], "db_config.conf"), 'r')

        # read username and password
        username = config_file.readline()
        password = config_file.readline()
        username = username.replace('\n', '').replace('\r', '')
        password = password.replace('\n', '').replace('\r', '')

        # connection to the database "myservice" is in the "TNSNAME.ORA"-file in the driver directory
        self.con = cx_Oracle.connect(username, password, "myservice")
        self.cursor = self.con.cursor()
    

    def close(self):
        # close cursor and connection
        self.cursor.close()
        self.con.close()