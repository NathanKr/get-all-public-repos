console.log('app is loading ...');
const chalk = require('chalk')
const axios = require('axios');
const shelljs = require('shelljs');
const userName = "NathanKr";

let repos = [];

async function getPublicReposNum(){
    const baseUrlApi = `https://api.github.com/users/${userName}`
    const res = await axios.get(baseUrlApi);
    return res.data.public_repos;
}

async function getPublicRepos () {
    const numRepos = await getPublicReposNum();
    const baseUrlApi = `https://api.github.com/users/${userName}`;
    const url = `${baseUrlApi}/repos?per_page=${numRepos}`;

    const res = await axios.get(url);
    repos = res.data;
    console.log(chalk.yellow(`number of public repos : ${repos.length}`))
    for (let index = 0; index < repos.length; index++) {
        const repo = repos[index];
        console.log(`${index+1} : repo.name`)
    }
}

function cloneRepos(){
    repos.forEach(repo => {
        const baseUrl = `https://github.com/${userName}`;
        const repoUrl = `${baseUrl}/${repo.name}`;
        const res = shelljs.exec(`git clone ${repoUrl}`)
        if(res.code == 0 ){
            console.log(chalk.green(`success clone of ${repo.name}`));
        }
        else{
            console.error(chalk.red(`failure clone of ${repo.name}`));
        }
 });
}

async function run(){
    console.log('public repos')
    await getPublicRepos();
    cloneRepos();
}

run();