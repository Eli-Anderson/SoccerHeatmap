import cx_Oracle

con = cx_Oracle.connect('SOCCER02/howdy@sportanalysisdb.inform.hs-hannover.de:1521/orcl')
cursor = con.cursor()

cursor.execute('select * from soccer02.country') # use triple quotes if you want to spread your query across multiple lines

#for row in cursor:
#    print (row[0], '-', row[1]) # this only shows the first two columns. To add an additional column you'll need to add , '-', row[2], etc.

cursor.close()
con.close()