from db_factory import DB_Factory

db = DB_Factory()

#raw_list_training = db.foulcommits_training_data()
datax = db.foulcommits_data()
datay = db.foulcommits_data_card()



#print(str(raw_list_test[0]))

output = open('datax.txt', 'w')
for data in datax:
    output.writelines(str(data))
    output.write("\n")
output.close()

output2 = open('datay.txt', 'w')
for data in datay:
    output2.writelines(str(data))
    output2.write("\n")
output.close()




db.close