from db.db_factory import DB_Factory


db = DB_Factory()
db.search_home_teams_matches('Tubize')
db.search_away_teams_matches('Tubize')
db.close()

