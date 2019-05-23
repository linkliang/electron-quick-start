import sys
import os

branch = sys.argv[1]

git_pull_command = 'git pull branch'
os.system(git_pull_command)

with open('package.json', 'r') as file:
    data = file.read().replace('{{branch_name}}', branch)
with open('package.json', 'w') as file:
    file.write(data)
    file.close()

build_command = 'npm run publish'
os.system(build_command)