# Read in the file
with open('./backend/test.txt', 'r') as file :
  filedata = file.read()

# Replace the target string
filedata = filedata.replace('@', 'blaba')

# Write the file out again
with open('./backend/test.txt', 'w') as file:
  file.write(filedata)