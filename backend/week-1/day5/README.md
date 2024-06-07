# Git good at Git! 
[
This is a great cheetsheet to look at!](https://education.github.com/git-cheat-sheet-education.pdf)
### Git Terms

- HEAD - The latest commit.
- Branch - The name of your current work-flow
  - Create a branch with ```git checkout -b new-branch-name```
  - Switch to a branch with ``` git checkout branch-you-want-to-switch-to```
  - Check what branch you are on with ``` git branch ```
  
- Merge - Add a specifc branch history to another branch
  - PR(Pull Request) - This is a request to merge to the main branch
  - Command: ``` git merge name-of-branch-you-want-to-merge-from```

- Pull - Get the latest changes from the remote(Not your PC but the online repo)
  - ```git pull```
 
- Stage - Add changes you made to a file
  - ``` git add file-you-changed ```
 
- Commit - Assign a message to your staged changes and snapshot all of them
  - ``` git commit -m "Put your message in the quotes" ```
 
- Push - Push your commited changes to the repo
  - ``` git push -u origin name-of-branch-you-are-on ```
  - You will need to set the upstream every time you switch to another branch
 
- Reset - Reset your local system files to match a specfic changeset:
  - ```git-reset --hard HEAD^```  - This command will reset all your files to the last pushed changeset

### Workflow

Best habits is to have a develop branch and you make a branch for each feature. These branches are sub branches of develop
[Extra reading if you're bored.](https://nvie.com/posts/a-successful-git-branching-model/)

#### Get started with this work flow like this:
  1) Create a develop branch: ```git checkout -b develop```
  2) For every new feature, make a branch that's a child of the develop branch:  ```git checkout -b newfeature-name develop```
  3) Once finished with the new feature, merge the changes back to develop and push the changes to develop
       - ```git checkout develop ```
       - ```git merge newfeature-name```
       - ``` git push origin develop```
  4) If your develop is ever stable enough to push to main then checkout to main, merge from develop, push to main, and pray you didn't break everything:
       - ```git checkout main ```
       - ```git merge develop```
       - ``` git push origin main```
