import numpy as np

# XTrain = open('./backend/training_formattet.txt','r')
# yTrain = open('./backend/training_label.txt','r')
# XTest = open('./backend/test_formattet_feature.txt','r')
# yTest = open('./backend/test_label.txt','r')

# XTrain = np.array(XTrain)
# yTrain = np.array(yTrain)
# XTest = np.array(XTest)
# yTest = np.array(yTest)

# np.reshape(XTrain, (81159, 11))
# np.reshape(yTrain, (24951, 11))

xTrain = np.genfromtxt(fname = "./backend/training_formattet.txt", dtype='str')
print("############ xTrain ############")
print(xTrain)
print("############ xTrain END ############")

yTrain = np.genfromtxt(fname = "./backend/training_label.txt", dtype='str')
print("############ yTrain ############")
print(yTrain)
print("############ yTrain END ############")

xTest = np.genfromtxt(fname = "./backend/test_formattet_feature.txt", dtype='str')
print("############ xTest ############")
print(xTest)
print("############ xTest END ############")

yTest = np.genfromtxt(fname = "./backend/test_label.txt", dtype='str')
print("############ yTest ############")
print(yTest)
print("############ yTest END ############")


### Writing arrays in files

np.save('./backend/arr_test_formatted', xTest)
np.save('./backend/arr_label', yTest)
np.save('./backend/arr_training_formatted', xTrain)
np.save('./backend/arr_training_label', yTrain)