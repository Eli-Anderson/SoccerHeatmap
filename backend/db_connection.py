import cx_Oracle
import os, sys

# this class is responsible for the connection to the database.
# please change only the credentials in the file named "db_config.conf"!
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
        self.con = cx_Oracle.connect(username, password, "myservice", threaded=True)
        
    

    def close(self):
        # close cursor and connection
        
        self.con.close()