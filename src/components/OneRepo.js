import React, { useEffect, useState } from 'react';
import { AiOutlineFork } from 'react-icons/ai';
import { FaRegStar } from 'react-icons/fa';
import { RiGitRepositoryLine } from 'react-icons/ri';
import { useParams } from 'react-router-dom';
import '../css/OneRepo.css';
import NotFound from './NotFound';

const { Octokit } = require('@octokit/rest');
const octokit = new Octokit({
    // auth: process.env.TOKEN,
});


const OneRepo = () => {
    const { username, repo } = useParams();
    const owner = username
    const theURL = '/repos/{owner}/{repo}/';

    const [fullName, setFullName] = useState();
    const [description, setDescription] = useState();
    const [starCount, setStarCount] = useState();
    const [forkCount, setForkCount] = useState();
    const [language, setLanguage] = useState();
    const [link, setLink] = useState();
    const [notFound, setNotFound] = useState(false);

    const getContents = async () => {
        let data;
        try {
            data = await octokit.request('GET /repos/{owner}/{repo}', {
                owner: owner,
                repo: repo
            })
            setFullName(data.data.full_name);
            setDescription(data.data.description);
            setStarCount(data.data.stargazers_count);
            setForkCount(data.data.forks_count);
            setLanguage(data.data.language);
            setLink(data.data.svn_url);
            console.log(333,data.data)

        } catch (error){
            console.log("web not found");
            setNotFound(true);
        }
    }

    useEffect(() => {
        getContents();
      },[window.location.pathname]);

    return(
        <div className='oneRepo'>
            {notFound ?
            <NotFound text="Repo not found!"/>
            :
            <div className='container'>
                <div className='repo_full_name'>
                    <RiGitRepositoryLine/><a target='_blank' className = 'link' href={link}>{fullName}</a><div>Public</div>
                </div>
                <div className='content'>
                    <div className='description'>
                        <h4>About</h4>
                        <p>{description}</p>
                    </div>
                    <div className= 'infoList'>
                        <div className = 'info1'> <FaRegStar className = 'infoIcon1'/> <p>  {starCount} stars</p> </div>
                        <div className = 'info1'> <AiOutlineFork className = 'infoIcon1'/> <p>  {forkCount} forks</p> </div>
                    </div>
                </div>
            </div>
            }
        </div>
    );
}
export default OneRepo;
