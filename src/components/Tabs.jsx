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
import useAuthContext from '../context/AuthContext';
import { useTranslation } from "react-i18next";
import { MDBAccordion, MDBAccordionItem } from 'mdb-react-ui-kit';
import SquadLeadScene from './SquadLeadScene';
import RiflemanScene from './RiflemanScene';
import ScoutScene from './ScoutScene';
import SniperScene from './SniperScene';

const Tabs = () => {
  const [justifyActive, setJustifyActive] = useState('My Competitions');
  const [t, i18n] = useTranslation("global");
  const { token } = useAuthContext();
  const [showToken, setShowToken] = useState(false);
  const [competitions, setCompetitions] = useState(false);

  const handleJustifyClick = (value: string) => {
    if (value === justifyActive) {
      return;
    }

    setJustifyActive(value);
  };

  useEffect(() => {
    const fetchData = async () => {
      const competitions = await Service.getCompetitions();
      setCompetitions(competitions);
      console.log(competitions)
    };

    fetchData();
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
          <MDBAccordion initialActive={1}>
            {competitions && competitions.map((competition, index) => (
              <MDBAccordionItem key={index} collapseId={index + 1} headerTitle={competition.title + " " + competition.game_start}>
                <div className='accordion-competition-content'>
                  <h2 style={{"textAlign": "center"}}>
                    Match info
                  </h2>
                  <div className='current-match-info'>
                    <div className='current-match-info-item'>
                      <div className='current-match-info-item-title'>
                        Title:
                      </div>
                      <div className='current-match-info-item-value'>
                        {competition.title}
                      </div>
                    </div>
                    <div className='current-match-info-item'>
                      <div className='current-match-info-item-title'>
                        Goal:
                      </div>
                      <div className='current-match-info-item-value'>
                        {i18n.language === 'en' ? competition.goal.title.en : competition.goal.title.uk}
                      </div>
                    </div>
                    <div className='current-match-info-item'>
                      <div className='current-match-info-item-title'>
                        The duration of the game:
                      </div>
                      <div className='current-match-info-item-value'>
                        {competition.game_start} - {competition.game_end}                      
                      </div>
                    </div>
                    <div className='current-match-info-item'>
                      <div className='current-match-info-item-title'>
                        Result:
                      </div>
                      <div className='current-match-info-item-value'>
                        {competition.result}                    
                      </div>
                    </div>
                    <div style={{"flexDirection": "column", "alignItems": "center"}} className='current-match-info-item'>
                      <div className='current-match-info-item-title'>
                        Map:
                      </div>
                      <div className='current-match-info-item-value'>
                        <img className='current-match-info-item-image' src={Service.getBaseURL() + '/storage/' + competition.map} alt="" />
                      </div>
                    </div>
                  </div>
                  <Body hits={competition.sensorHits} />
                  <h2 style={{"marginTop": "30px", "textAlign": "center"}}>
                    Teams
                  </h2>
                  <div className='current-match-teams'>
                    {competition.teams.map((team, index) => (
                      <div className='current-match-team' key={index}>
                        <div className='current-match-info-item'>
                          <h3 className='current-match-info-item-title'>
                            Team {index + 1}:
                          </h3>
                          <div className='current-match-info-item-value'>
                            {team.teamTitle}
                          </div>
                        </div>
                        <h3>Team members</h3>
                        {team.team_members.map((member, memberIndex) => (
                          <div className='current-match-info-item' key={memberIndex}>
                            <div className='current-match-info-item-title'>
                              {member.user.name}:
                            </div>
                            <div className='current-match-info-item-value'>
                              {i18n.language === 'en' ? member.game_role.title.en : member.game_role.title.uk}
                            </div>
                          </div>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </MDBAccordionItem>
            ))}
        </MDBAccordion>
        </MDBTabsPane>
        <MDBTabsPane open={justifyActive === 'Personal data'}>
          
        </MDBTabsPane>
        <MDBTabsPane open={justifyActive === 'Settings'}>
          <div>
              <label htmlFor="pass">Enter password: </label>
              <input
                  id="pass"
                  type={
                      showToken ? "text" : "password"
                  }
                  value={token}
                  disabled
              />
              <br />
              <br />
              <label htmlFor="check">Show Password</label>
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
