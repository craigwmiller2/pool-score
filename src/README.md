1. Run: npm install
- install all necessary packages

2. Run: gulp
- runs gulp and compiles initial sass into css

Git Instructions
1. $ git init

# Adds the files in the local repository and stages them for commit. To unstage a file, use 'git reset HEAD YOUR-FILE'.
2. $ git add .

# Commits the tracked changes and prepares them to be pushed to a remote repository. To remove this commit and modify the file, use 'git reset --soft HEAD~1' and commit and add the file again.
3. $ git commit -m "First commit"

# Sets the new remote
4. $ git remote add origin REMOTE_URL

# Verifies the new remote URL
5. $ git remote -v

# Pushes the changes in your local repository up to the remote repository you specified as the origin
6. $ git push -u origin master

Git Notes

#stages all changes
git add -A

#stages new files and modifications, without deletions
git add .

#stages modifications and deletions, without new files
git add -u

#add and remove individual files
git add FILENAME
git rm FILENAME

#create a branch
git branch BRANCHNAME

#see all branches
git branch

#change to branch
git checkout BRANCHNAME
