import numpy as np

f = open('./backend/randnum.txt', 'w')

for i in range(100000):
    f.write(str(np.random.choice(np.arange(0,4), p=[0.7, 0.2, 0.05, 0.05])) + '\n')
