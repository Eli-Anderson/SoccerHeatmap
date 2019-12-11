import numpy as np
from keras.models import Sequential
from keras.layers import Dense
from keras.utils import np_utils

from keras.datasets import mnist

#XTrain = open('','r')
#yTrain = open('','r')
#XTest = open('','r')
#yTest = open('','r')

(XTrain, yTrain), (XTest, yTest) = mnist.load_data()

XTrain = XTrain.reshape(60000, 784)
XTest = XTest.reshape(10000, 784)
XTrain = XTrain/255
XTest = XTest/255

lines_of_input = 784
output_vector = 10

#no Scaling due to the big differenze between low and high values
YTrain = np_utils.to_categorical(yTrain, output_vector)
YTest = np_utils.to_categorical(yTest, output_vector)

magic = Sequential()
magic.add(Dense(80, input_dim=lines_of_input, activation='relu'))
magic.add(Dense(40,activation='relu'))
magic.add(Dense(10, activation='sigmoid'))
magic.compile(loss='mean_squared_error', optimizer='adam', metrics=['accuracy'])
magic.fit(XTrain, YTrain, epochs=15, verbose=True)

yP = magic.predict(XTest)
error = np.flatnonzero(np.argmax(yP, axis=1)-yTest)

print('Correct: %.2f%% '%(100-error.shape[0]/100))
