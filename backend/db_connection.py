import mysql.connector as mc

connection = mc.connect (host="sportanalysisdb.inform.hs-hannover.de:1521/orcl", user="SOCCER02", passwd="howdy", db="SOCCER02")
cursor = connection.cursor()
cursor.execute ("SELECT VERSION()")
row = cursor.fetchone()
print("server version:", row[0])
cursor.close()
connection.close()
print("ENDE")