import cx_Oracle
import os, sys
from pprint import pprint

class Connector:
    def __init__(self):
        # configuration file path.
        config_file = open(os.path.join(sys.path[0], "db_config.conf"), 'r')

<<<<<<< HEAD
        # read username and password
        username = config_file.readline()
        password = config_file.readline()
        username = username.replace('\n', '').replace('\r', '')
        password = password.replace('\n', '').replace('\r', '')

        # connection to the database "myservice" is in the "TNSNAME.ORA"-file in the driver directory
        self.con = cx_Oracle.connect(username, password, "myservice")
        self.cursor = self.con.cursor()
=======
con = cx_Oracle.connect(username, password, "myservice")
cursor = con.cursor()
>>>>>>> 8f22d9ba33d4d1382317c4e1a37995c9037d66ea

    def close(self):
        self.cursor.close()
        self.con.close()