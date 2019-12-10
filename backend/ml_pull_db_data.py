from db_factory import DB_Factory

db = DB_Factory()

#raw_list_training = db.foulcommits_training_data()
raw_list_test = db.foulcommits_testing_data()

print(str(raw_list_test[0]))

for data in raw_list_test:
    for item in data:

        ['0' if item is None else item for item in data]


#output_test = open('test_raw.txt', 'w')
#for data in raw_list_test:
#    output_test.writelines(str(data))
#    output_test.write("\n")

#output_test.close()