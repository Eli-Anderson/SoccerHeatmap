from db_factory import DB_Factory


db = DB_Factory()
print(db.search_home_teams_matches('Tubize'))
db.close()

