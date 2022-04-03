import React from 'react';
import { Container, Navbar } from 'react-bootstrap';
import { IoPeople } from 'react-icons/io5';
import '../css/NavBar.css';


const NavBar = ({username, avatarURL, route, follower, following}) => {
    return(
        <Navbar className='Navbar'>
          <Container className='NavContainer'>
            <Navbar.Brand href={route}>
              <img variant="top" src={avatarURL}/>
            </Navbar.Brand>
            <div className = 'userInfo'>
              <h3>{username}</h3>
              <div> <IoPeople/> <span>{follower}</span> followers · <span>{following}</span> following</div>
            </div>
          </Container>
        </Navbar>
    );
}

export default NavBar;