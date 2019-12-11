# first neural network with keras tutorial
from numpy import loadtxt
from keras.models import Sequential
from keras.layers import Dense
from db_factory import DB_Factory
from team import Team

db = DB_Factory()

print(db.all_foulcommits())

db.close()