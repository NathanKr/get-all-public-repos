console.log('app is loading ...');
const chalk = require('chalk')
const axios = require('axios');
const shelljs = require('shelljs');
const fs = require('fs');
const path = require('path');
const { zip } = require('zip-a-folder');

function getTimeStamp(){
const date = new Date();
return `${date.getDate()}_${date.getMonth()+1}_${date.getFullYear()}`;
}

const userName = process.argv[2];
const outputDir = process.argv[3] ? process.argv[3] : "clonedRepos";
const archiveZipFileName = `archive_${userName}_${getTimeStamp()}.zip`;

if(!userName){
    console.error(chalk.red('Error : user name must be defined'));
    return;
}

let repos = [];

function createOutputDirIfNotExist(){
    if (!fs.existsSync(outputDir)){
        fs.mkdirSync(outputDir);
    }
}

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
        console.log(`${index+1} : ${repo.name}`)
    }
}

async function  cloneRepos(){
    repos.forEach(repo => {
        const baseUrl = `https://github.com/${userName}`;
        const repoUrl = `${baseUrl}/${repo.name}`;
        const res = shelljs.exec(`git -C ${outputDir} clone ${repoUrl} `)
        if(res.code == 0 ){
            console.log(chalk.green(`success clone of ${repo.name}`));
        }
        else{
            console.error(chalk.red(`failure clone of ${repo.name}`));
        }
 });
 await zip(outputDir, archiveZipFileName);
}

async function run(){
    console.log('public repos')
    await getPublicRepos();
    createOutputDirIfNotExist();
    cloneRepos();
    await zip(outputDir, archiveZipFileName);
}

run();