let theInput =  document.querySelector('.get-repos input'),
    getBtn = document.querySelector('.get-btn'),
    reposData = document.querySelector('.show-data');

getBtn.onclick = () => {
    getRepos();
    theInput.value = '';
};

async function getRepos() {
    if(theInput.value == "") {
        reposData.innerHTML = "<span>Please provide the Github username.</span>"
    } else {
        let userName = theInput.value.split(" ").join("");
            res = await fetch(`https://api.github.com/users/${userName}/repos`),
            repos = await res.json();
            console.log(repos);
        reposData.innerHTML = "";
        repos.forEach(repo => {
            let mainDiv = document.createElement('div'),
                starsSpan = document.createElement('span'),
                repoLink = document.createElement('a'),
                starsCount = document.createTextNode(`Stars ${repo.stargazers_count}`),
                repoName = document.createTextNode(repo.name);
            mainDiv.className = 'repo-box';
            starsSpan.appendChild(starsCount);
            repoLink.href = `https://github.com/${userName}/${repo.name}`;
            repoLink.target = '_blank';
            repoLink.innerHTML = 'Visit';
            mainDiv.appendChild(repoName);
            mainDiv.appendChild(repoLink);
            mainDiv.appendChild(starsSpan);
            reposData.appendChild(mainDiv);
        });
    }
};