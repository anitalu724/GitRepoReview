import { useEffect, useState } from 'react';
import { AiOutlineFork } from 'react-icons/ai';
import { FaRegStar } from 'react-icons/fa';
import { RiGitRepositoryLine } from 'react-icons/ri';
import { Link, useParams } from 'react-router-dom';
import '../css/RepoList.css';
import NavBar from './NavBar';
import NotFound from './NotFound';


const RepoList = () => {
  const { Octokit } = require('@octokit/rest');
  const octokit = new Octokit({
      // auth: process.env.TOKEN,
  });

  const {username} = useParams();

  const [pubRepoCount, setPubRepoCount] = useState(10);
  const [followerCount, setFollowerCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);

  const [route, setRoute] = useState('/users/'+username+"/repos");
  const [avatarURL, setAvatarURL] = useState();
  const [repos, setRepos] = useState([]);
  const [showIdx, setShowIdx] = useState(1);
  const [notFound, setNotFound] = useState(false);

  const reset = () => {
    setPubRepoCount();
    setFollowerCount();
    setFollowingCount();
    setAvatarURL();
    setRepos();
    setShowIdx(0);
  }

  

  const getUserData = async () => {
    let result;
    try {
      result = await octokit.request('GET /users/{username}', {
        username: username
      })
      // console.log(111,result);
      setPubRepoCount(result.data.public_repos);
      setFollowerCount(result.data.followers);
      setFollowingCount(result.data.following);
      setAvatarURL(result.data.avatar_url);
    } catch (error) {
      console.log(100,"Username not found");
      setNotFound(true);
      // reset();
    }
  }

  const getRepoData = async () => {
    let result;
    try {
      result = await octokit.request('GET /users/{username}/repos', {
        per_page:10,
        page:showIdx,
        username: username
      })
      var pageLimit = Math.ceil(pubRepoCount/10);
      if(showIdx <= pageLimit){
        const list = result.data.map((item) => (
          <div className = 'repo'>
            <div className='repoName'>
              <RiGitRepositoryLine/> <Link className = 'link' to={"/users/"+username+"/repos/"+item.name}>{item.name}</Link>
              <p>{item.description}</p>
            </div>
            <div className='infoBlock'>
              <div className = 'info'> <AiOutlineFork className = 'infoIcon'/> <p> {item.forks_count} </p> </div>
              <div className = 'info'> <FaRegStar     className = 'infoIcon'/> <p> {item.stargazers_count} </p></div>
            </div>
          </div>
        ));
        setRepos(repos.concat(list));
        setShowIdx(showIdx+1);
      }
      else{
        console.log(showIdx, pubRepoCount)
      }
    } catch (error) {
      console.log(110, "Username not found", error);
      setNotFound(true);
      reset();
    }
  }

  const _handleScroll = (e) => {
    const bottom = e.target.scrollHeight - e.target.scrollTop <= e.target.clientHeight;
    if (bottom){
      console.log("bottom")
      getRepoData();
      console.log('now',repos.length+10)
    }
  }

  useEffect(() => {
    getUserData();
    getRepoData();
  },[window.location.pathname]);


  return(
    <div className="RepoList" onScroll={_handleScroll} >
        {notFound ?
          <NotFound text="Username not found!"/>
        :
        <div className='Container'>
          <NavBar username={username} avatarURL={avatarURL} route={route} follower={followerCount} following={followingCount}/>
          <div className='wrapper'>
            <div className = 'content_container'>
              <div className='repoList'>{repos}</div>
            </div>
          </div>
        </div>
        }
    </div>
  );
}
export default RepoList;
