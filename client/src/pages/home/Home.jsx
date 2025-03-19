// eslint-disable-next-line no-unused-vars
import React from 'react';
import TopBar from '../../components/basic/TopBar';
// import NavBar from './NavBar';
// import { BrowserRouter as Link} from 'react-router-dom';

const Home = () => {
    return (
        <div>
            <TopBar />
            {/* <NavBar /> */}
            <div style={styles.content}>
                <h1>Welcome to ANU Student Connect</h1>
                <p>
                    This is a platform for students to connect with each other.
                </p>
            </div>
        </div>
    );
};

const styles = {
    navbar: {
        display: 'flex',
        justifyContent: 'flex-end',
        padding: '10px',
        background: '#f0f0f0',
    },
    link: {
        margin: '0 10px',
        textDecoration: 'none',
        color: 'black',
    },
    content: {
        padding: '20px',
    },
};

export default Home;