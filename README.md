# GitRepoReview

## Deployment
[http://wp.ee.ntu.edu.tw:9724/users/anitalu724/repos](http://wp.ee.ntu.edu.tw:9724/users/anitalu724/repos)

* To a repository list
[http://wp.ee.ntu.edu.tw:9724/users/{username}/repos](http://wp.ee.ntu.edu.tw:9724/users/{username}/repos)

* To a single repository
[http://wp.ee.ntu.edu.tw:9724/users/{username}/repos/{repo}](http://wp.ee.ntu.edu.tw:9724/users/{username}/repos/{repo})


## Local
```
git clone https://github.com/anitalu724/GitRepoReview.git
yarn
yarn start
```

## Structures
```
src
├── App.css
├── App.js
├── components
│   ├── NavBar.js
│   ├── NotFound.js
│   ├── OneRepo.js
│   └── RepoList.js
├── css
│   ├── App.css
│   ├── NavBar.css
│   ├── OneRepo.css
│   └── RepoList.css
├── index.css
└── index.js
```

* Implement repository list: `src/components/RepoList.js`
    * `getUserData`: get all user data from [GET /users/{username}](https://docs.github.com/en/rest/reference/repos#list-repositories-for-a-user)
    * `getRepoData`: get all repo data for a specific user from [GET /users/{username}/repos](https://docs.github.com/en/rest/reference/repos#get-a-repository)
    * `_handleScroll`: handle the issue of only access 10 repos per time

* Implement single repository: `src/components/OneRepo.js`
    * `getContents`: get all data for a single repo from [GET /repos/{owner}/{repo}](https://docs.github.com/en/rest/reference/users#get-a-user)

> **NavBar**: `src/components/NavBar.js`, used to display all userdata in the header of `RepoList`

> **NotFound Page**: `src/components/NotFound.js`, used to handle the exception such as URL error or username not found.   





