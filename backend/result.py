output_test = open('./backend/test_label.txt', 'w')
for i in range(1,24952):
    output_test.writelines('0')
    output_test.write("\n")

output_test.close()
print("done_test")

output_train = open('./backend/training_label.txt', 'w')
for i in range(1,81160):
    output_train.writelines('0')
    output_train.write("\n")

output_train.close()
print("done_train")