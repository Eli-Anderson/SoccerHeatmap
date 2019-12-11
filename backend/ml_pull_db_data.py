from db_factory import DB_Factory

db = DB_Factory()

#raw_list_training = db.foulcommits_training_data()
raw_list_test = db.foulcommits_testing_data()
raw_list_training = db.foulcommits_training_data()

#print(str(raw_list_test[0]))

output_test = open('test_raw.txt', 'w')
for data in raw_list_test:
    output_test.writelines(str(data))
    output_test.write("\n")

output_test.close()
print("done_test")

output_training = open('training_raw.txt', 'w')
for data in raw_list_training:
    output_training.writelines(str(data))
    output_training.write("\n")

output_training.close()
print("done_training")

db.close