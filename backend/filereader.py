import numpy as np
# Read in the file
with open('./datax.txt', 'r') as file :
  filedata = file.read()

# Replace the target string
filedata = filedata.replace('(', '')
filedata = filedata.replace(')', '')
filedata = filedata.replace('None', '0')
filedata = filedata.replace('y', '1')
filedata = filedata.replace('y2', '2')
filedata = filedata.replace('r', '3')


# Write the file out again
with open('./backend/datax_f.txt', 'w') as file:
  file.write(filedata)



print("test_done")


# Read in the file
with open('./datay.txt', 'r') as file :
  filedata = file.read()

# Replace the target string
filedata = filedata.replace('(', '')
filedata = filedata.replace(')', '')
filedata = filedata.replace('None', '0')
filedata = filedata.replace('y', '1')
filedata = filedata.replace('y2', '2')
filedata = filedata.replace('r', '3')
filedata = filedata.replace(',', '')
filedata = filedata.replace('\'', '')

# Write the file out again
with open('./backend/datay_f.txt', 'w') as file:
  file.write(filedata)

print("training_done")
