import cx_Oracle
from pprint import pprint

con = cx_Oracle.connect("","","heatmap")
cursor = con.cursor()

cursor.execute('select user from dual') # use triple quotes if you want to spread your query across multiple lines
pprint(cursor.fetchall())


#for row in cursor:
#    print (row[0], '-', row[1]) # this only shows the first two columns. To add an additional column you'll need to add , '-', row[2], etc.

cursor.close()
con.close()