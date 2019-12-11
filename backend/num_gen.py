import numpy as np

f2 = open('./backend/randnum_80.txt', 'w')
f3 = open('./backend/randnum_20.txt', 'w')


for i in range(80000):
    f2.write(str(np.random.choice(np.arange(0,4), p=[0.7, 0.2, 0.05, 0.05])) + '\n')

for i in range(20000):
    f3.write(str(np.random.choice(np.arange(0,4), p=[0.7, 0.2, 0.05, 0.05])) + '\n')
