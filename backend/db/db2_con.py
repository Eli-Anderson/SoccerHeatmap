import cx_Oracle

dsn_tns = cx_Oracle.makedsn('sportanalysisdb.inform.hs-hannover.de', '1521', service_name='orcl') #if needed, place an 'r' before any parameter in order to address any special character such as '\'.
conn = cx_Oracle.connect(user=r'SOCCER02', password='howdy', dsn=dsn_tns) #if needed, place an 'r' before any parameter in order to address any special character such as '\'. For example, if your user name contains '\', you'll need to place 'r' before the user name: user=r'User Name'

c = conn.cursor()
c.execute('select * from database.table') # use triple quotes if you want to spread your query across multiple lines
for row in c:
    print (row[0], '-', row[1]) # this only shows the first two columns. To add an additional column you'll need to add , '-', row[2], etc.
conn.close()