import numpy as np
from keras.models import Sequential
from keras.layers import Dense
from keras.utils import np_utils


XTrain = open('./backend/arr_training_formatted.npy','r')
yTrain = open('./backend/arr_training_label.npy','r')
XTest = open('./backend/arr_test_formatted.npy','r')
yTest = open('./backend/arr_test_label.npy','r')

XTrain = np.array(XTrain)
yTrain = np.array(yTrain)
XTest = np.array(XTest)
yTest = np.array(yTest)

np.reshape(XTrain, (81159, 11))
np.reshape(yTrain, (24951, 11))


#no Scaling due to the big differenze between low and high values
#XTrain = XTrain/MAX_VALUE
#XTest = XTest/MAX_VALUE

lines_of_input = 11
output_vector = 4


YTrain = np_utils.to_categorical(yTrain, output_vector)
YTest = np_utils.to_categorical(yTest, output_vector)

magic = Sequential()
magic.add(Dense(8, input_dim=lines_of_input, activation='relu'))
magic.add(Dense(4,activation='relu'))
magic.add(Dense(5, activation='sigmoid'))
magic.compile(loss='mean_squared_error', optimizer='adam', metrics=['accuracy'])
magic.fit(XTrain, YTrain, epochs=10, verbose=True)

yP = magic.predict(XTest)
error = np.flatnonzero(np.argmax(yP, axis=1)-yTest)

print('Correct: %.2f%% '%(100-error.shape[0]/100))
