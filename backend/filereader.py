import numpy as np
# Read in the file
with open('./test_raw.txt', 'r') as file :
  filedata = file.read()

# Replace the target string
filedata = filedata.replace('(', '')
filedata = filedata.replace(')', '')
filedata = filedata.replace('None', '0')
filedata = filedata.replace('y', '1')
filedata = filedata.replace('y2', '2')
filedata = filedata.replace('r', '3')


# Write the file out again
with open('./backend/test_formattet_feature.txt', 'w') as file:
  file.write(filedata)


print(len(open('./backend/test_formattet_feature.txt', 'r').readlines()))
print("test_done")


# Read in the file
with open('./training_raw.txt', 'r') as file :
  filedata = file.read()

# Replace the target string
filedata = filedata.replace('(', '')
filedata = filedata.replace(')', '')
filedata = filedata.replace('None', '0')
filedata = filedata.replace('y', '1')
filedata = filedata.replace('y2', '2')
filedata = filedata.replace('r', '3')

# Write the file out again
with open('./backend/training_formattet.txt', 'w') as file:
  file.write(filedata)

print(len(open('./backend/training_formattet.txt', 'r').readlines()))
print("training_done")
