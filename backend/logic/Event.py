from abc import ABC, abstractclassmethod
#abstract class
class Event(ABC):

    def getPosition(self):
        #Reminder
        raise NotImplementedError("in abgeleiteter Klasse definieren")
