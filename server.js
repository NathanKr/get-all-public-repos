console.log('app is loading ...');
const chalk = require('chalk')
const axios = require('axios');
const shelljs = require('shelljs');
const reposChunk = 100;

let repos = [];

async function getPublicRepos () {
    const baseUrlApi = "https://api.github.com/users/nathankr";
    const url = `${baseUrlApi}/repos?per_page=${reposChunk}`;

    const res = await axios.get(url);
    repos = res.data;
    console.log(chalk.yellow(`number of public repos : ${repos.length} , chunk : ${reposChunk}`))
    for (let index = 0; index < repos.length; index++) {
        const repo = repos[index];
        console.log(repo.name)
    }
}

function cloneRepos(){
    repos.forEach(repo => {
        const baseUrl = "https://github.com/NathanKr";
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
    console.log(chalk.red('private repos are not yet handled - todo!!!'))
    await getPublicRepos();
    cloneRepos();
}

run();