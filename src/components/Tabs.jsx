import React, { useState, useEffect  } from 'react';
import {
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane
} from 'mdb-react-ui-kit';
import Service from '../utils/Service';
import Body from './Body';

const Tabs = () => {
  const [justifyActive, setJustifyActive] = useState('My Competitions');
  const handleJustifyClick = (value: string) => {
    if (value === justifyActive) {
      return;
    }

    setJustifyActive(value);
  };
  

  const [token, setToken] = useState("");
  const [showToken, setShowToken] = useState(false);

  useEffect(() => {
    const fetchToken = async () => {
      try {
        let response = await Service.getToken();
        if (response && response.token) {
          setToken(response.token);
        } else {
          console.error('Invalid token response:', response);
        }
      } catch (error) {
        console.error('Error fetching token:', error);
      }
    };
  
    fetchToken();
  }, []);
  

  return (
    <div>
      <MDBTabs justify className='mb-3'>
        <MDBTabsItem>
          <MDBTabsLink onClick={() => handleJustifyClick('My Competitions')} active={justifyActive === 'My Competitions'}>
            My Competitions
          </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem>
          <MDBTabsLink onClick={() => handleJustifyClick('Personal data')} active={justifyActive === 'Personal data'}>
            Personal data
            <Body />
          </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem>
          <MDBTabsLink onClick={() => handleJustifyClick('Settings')} active={justifyActive === 'Settings'}>
            Settings
          </MDBTabsLink>
        </MDBTabsItem>
      </MDBTabs>

      <MDBTabsContent>
        <MDBTabsPane open={justifyActive === 'My Competitions'}>
          Tab 1 content</MDBTabsPane>
        <MDBTabsPane open={justifyActive === 'Personal data'}>Tab 2 content
        </MDBTabsPane>
        <MDBTabsPane open={justifyActive === 'Settings'}>
          <div>
              <label for="pass">Enter password: </label>
              <input
                  id="pass"
                  type={
                      showToken ? "text" : "password"
                  }
                  value={token}
                  onChange={(e) =>
                      setToken(e.target.value)
                  }
                  disabled
              />
              <br />
              <br />
              <label for="check">Show Password</label>
              <input
                  id="check"
                  type="checkbox"
                  value={showToken}
                  onChange={() =>
                      setShowToken((prev) => !prev)
                  }
              />
          </div>
        </MDBTabsPane>
      </MDBTabsContent>
    </div>
  )
}

export default Tabs
