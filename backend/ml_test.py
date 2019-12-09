from db_factory import DB_Factory
from team import Team

db = DB_Factory()

print(db.all_foulcommits())

db.close()