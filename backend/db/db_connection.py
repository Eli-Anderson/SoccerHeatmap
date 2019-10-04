import cx_Oracle
import os, sys
from pprint import pprint

config_file = open(os.path.join(sys.path[0], "db_config.conf"), 'r')
username = config_file.readline()
password = config_file.readline()


con = cx_Oracle.connect(username, password, "myservice")
cursor = con.cursor()

cursor.execute('select user from dual') # use triple quotes if you want to spread your query across multiple lines

pprint(cursor.fetchall())

#for row in cursor:
#    print (row[0], '-', row[1]) # this only shows the first two columns. To add an additional column you'll need to add , '-', row[2], etc.

cursor.close()
con.close()