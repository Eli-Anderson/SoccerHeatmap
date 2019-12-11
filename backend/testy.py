import numpy as np
from keras.models import Sequential
from keras.layers import Dense
from keras.utils import np_utils

from keras.datasets import mnist

(yt, yt),(xte, yte) = mnist.load_data()

print(yt, yt, xte, yte)
