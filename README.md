<h2>Motiviation</h2>
Github is great , but what happens if you :
<ul>
<li>accidently deleted a repo</li>
<li>not able to login into github</li>
<li>sure only at 99.99% that github handles your repos correctly</li>
</ul>

<h2>Solution</h2>
build a node app that go over repos and clone on your disk
The result is a directory with all cloned repos and archive.zip

<h2>Installation</h2>
npm i

<h2>Invocation</h2>

1.
node server.js NathanKr OutDir 

above will go over all public repo of https://github.com/NathanKr and will clone them into the directory OutDir. 
archive.zip will be created on the same directory as the node application

2.
node server.js NathanKr  
above will go over all public repo of https://github.com/NathanKr and will clone them into the directory clonedRepos. 
archive.zip will be created on the same directory as the node application


<h2>Limitation</h2>
only public repos are cloned

