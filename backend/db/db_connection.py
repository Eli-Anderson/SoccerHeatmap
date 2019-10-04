import cx_Oracle
from pprint import pprint

test = open("test.txt","r")
print(test)

con = cx_Oracle.connect("424-ML6-U1", "DBS2_2018", "myservice")
cursor = con.cursor()

cursor.execute('select user from dual') # use triple quotes if you want to spread your query across multiple lines

pprint(cursor.fetchall())

#for row in cursor:
#    print (row[0], '-', row[1]) # this only shows the first two columns. To add an additional column you'll need to add , '-', row[2], etc.

cursor.close()
con.close()