// import logo from './logo.svg';
import './App.css';
import { useState, useEffect } from "react";
import cookies from "js-cookies";
import IconButton from '@material-ui/core/IconButton';
import Tooltip from "@material-ui/core/Tooltip";
import CookieIcon from '@mui/icons-material/Cookie';
import DeleteIcon from '@mui/icons-material/Delete';
import InfoIcon from '@mui/icons-material/Info';


function GithubUser({name, avatar, repo}) {
  return (
    <div>

      <a href={repo} target={`_blank`}>
      <img src={avatar} alt={name} style={{"max-height": "5em","border-radius":"50%"}} />
      </a>
    </div>
  )
}

function App() {
  const [cookieCount, setCookieCount] = useState(Number(cookies.getItem('CookieCount')));

  const secure = window.location.protocol === 'https';

  const [data, setData] = useState(null);
  useEffect(() => {
    fetch(`https://api.github.com/users/itsscb`)
    .then((response) => response.json())
    .then(setData)
    .catch(()=>{});
  },[]);

  return (
    <div className="App">
      <header className="App-Header">
        {data != null &&
        <GithubUser name={data.login} avatar={data.avatar_url} repo={data.html_url}/>
        }
      </header>
      <body className='App-Body'>
        <h1>Thank's for your visit</h1>
        <p>As a good host I'd like to offer you some Cookies. Take as many as you like.</p>
        <p className="note">The Cookies are saved in your Browser Cache and are completely useless, except for keeping track of the amount of Cookies you take.</p>
        <Tooltip title="Take a Cookie">
          <IconButton onClick={(event) => {
            let count = Number(cookies.getItem('CookieCount')) + 1;
            setCookieCount(count);
            cookies.setItem("CookieCount", count, undefined, "/", undefined, secure);
          }}>
            <CookieIcon /> Take a Cookie
          </IconButton>
        </Tooltip>
        {cookieCount !== 0 && <p>You already took {cookieCount} Cookie{cookieCount > 1 && 's'}</p>}
        {cookieCount !== 0 && <Tooltip title="Remove Cookies">
          <IconButton onClick={() => {
            let count = 0;
            setCookieCount(count);
            cookies.removeItem('CookieCount');
          }
          }>
            <DeleteIcon /> Remove Cookie{cookieCount > 1 && 's'}
          </IconButton>
        </Tooltip>}
        <p></p>
        <Tooltip title="You are connected to this App via DynamicDNS through a Firewall, passing a NGINX Proxy Server straight into a Docker-Container running on a Debian-Server.">
          <InfoIcon style={{ color: "orange" }} />
        </Tooltip>

      </body>
    </div>
    // <div className="App">
    //   <header className="App-header">
    //     <img src={logo} className="App-logo" alt="logo" />
    //     <p>
    //       Edit <code>src/App.js</code> and save to reload.
    //     </p>
    //     <a
    //       className="App-link"
    //       href="https://reactjs.org"
    //       target="_blank"
    //       rel="noopener noreferrer"
    //     >
    //       Learn React
    //     </a>
    //   </header>
    // </div>
  );
}

export default App;
