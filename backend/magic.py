import numpy as np
from keras.models import Sequential
from keras.layers import Dense
from keras.utils import np_utils

XTrain = open('','r')
yTrain = open('','r')
XTest = open('','r')
yTest = open('','r')

lines_of_input = 1000

#no Scaling due to the big differenze between low and high values
YTrain = np_utils.to_categorical(yTrain, 4)
YTest = np_utils.to_categorical(yTest, 4)

magic = Sequential()
magic.add(Dense(80, input_dim=lines_of_input), activ
='relu')
magic.add(Dense(40, activation='relu'))
magic.add(Dense(10, activation='sigmoid'))
magic.compile(loss='mean_squared_error', optimizer='adam', metrics=['accuracy'])
magic.fit(XTrain, YTrain, epochs=15, verbose=True)

yP = magic.predict(XTest)
error = np.flatnonzero(np.argmax(yP, axis=1)-yTest)

print('Correct: %.2f%% '%(100-error.shape[0]/100))



