from db_factory import DB_Factory
from team import Team

db = DB_Factory()

#print(db.list_all_teams())

print(db.list_all_players())

# print(db.search_team("Aberdeen"))

#aber = Team(db.search_team("Aberdeen"))
#print(aber)



"""
teams = db.list_all_teams()
print(teams)
print(type(teams))
print(type(teams[0]))
team = teams[0]
print(team)
print(type(team))
str(team)
print(team)
print(type(team))

team = db.search_team(str(teams[1]))
print(teams[0])
"""


"""
liste = ['Bayern münchen', 'peter hans', '7']
print(liste)
print(type(liste))
print(liste[0])
print(type(liste[0]))

liste2 = ('Bayern münchen', 'peter hans', '7')
print(liste2)
print(type(liste2))
print(liste2[0])
print(type(liste2[0]))
"""

#db.close()

