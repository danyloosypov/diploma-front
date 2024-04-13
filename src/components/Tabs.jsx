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
import { Link } from 'react-router-dom';
import { useLoadingContext } from '../context/LoadingContext';

const Tabs = () => {
  const [justifyActive, setJustifyActive] = useState('My Competitions');
  const [t, i18n] = useTranslation("global");
  const { token, user } = useAuthContext();
  const [showToken, setShowToken] = useState(false);
  const [avgGameTime, setAvgGameTime] = useState(null);
  const [userCompetitionsCount, setUserCompetitionsCount] = useState(null);
  const [competitions, setCompetitions] = useState(false);
  const { startLoading, stopLoading } = useLoadingContext();

  const handleJustifyClick = (value: string) => {
    if (value === justifyActive) {
      return;
    }

    setJustifyActive(value);
  };

  useEffect(() => {
    const fetchData = async () => {
      startLoading();
      const competitions = await Service.getCompetitions();
      setCompetitions(competitions['competitions']);
      setAvgGameTime(competitions['avgGameTime']);
      setUserCompetitionsCount(competitions['userCompetitionsCount']);
      stopLoading();
    };

    fetchData();
  }, []);

  return (
    <div className='container tabs-container'>
      <MDBTabs justify className='mb-3'>
        <MDBTabsItem>
          <MDBTabsLink onClick={() => handleJustifyClick('My Competitions')} active={justifyActive === 'My Competitions'}>
           {t('account.myCompetitions')}
          </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem>
          <MDBTabsLink onClick={() => handleJustifyClick('Personal data')} active={justifyActive === 'Personal data'}>
            {t('account.personalData')}
          </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem>
          <MDBTabsLink onClick={() => handleJustifyClick('Settings')} active={justifyActive === 'Settings'}>
            {t('account.settings')}
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
                    {t('competition.matchInfo')}
                  </h2>
                  <div className='current-match-info'>
                    <div className='current-match-info-item'>
                      <div className='current-match-info-item-title'>
                        {t('competition.matchTitle')}
                      </div>
                      <div className='current-match-info-item-value'>
                        {competition.title}
                      </div>
                    </div>
                    <div className='current-match-info-item'>
                      <div className='current-match-info-item-title'>
                        {t('competition.matchGoal')}
                      </div>
                      <div className='current-match-info-item-value'>
                        {i18n.language === 'en' ? competition.goal.title.en : competition.goal.title.uk}
                      </div>
                    </div>
                    <div className='current-match-info-item'>
                      <div className='current-match-info-item-title'>
                        {t('account.matchDuration')}
                      </div>
                      <div className='current-match-info-item-value'>
                        {competition.game_start} - {competition.game_end}                      
                      </div>
                    </div>
                    <div className='current-match-info-item'>
                      <div className='current-match-info-item-title'>
                        {t('competition.result')}
                      </div>
                      <div className='current-match-info-item-value'>
                        {competition.result}                    
                      </div>
                    </div>
                    <div style={{"flexDirection": "column", "alignItems": "center"}} className='current-match-info-item'>
                      <div className='current-match-info-item-title'>
                        {t('competition.map')}
                      </div>
                      <div className='current-match-info-item-value'>
                        <img className='current-match-info-item-image' src={Service.getBaseURL() + '/storage/' + competition.map} alt="" />
                      </div>
                    </div>
                  </div>
                  <Body hits={competition.sensorHits} />
                  <h2 style={{"marginTop": "30px", "textAlign": "center"}}>
                    {t('competition.teams')}
                  </h2>
                  <div className='current-match-teams'>
                    {competition.teams.map((team, index) => (
                      <div className='current-match-team' key={index}>
                        <div className='current-match-info-item'>
                          <h3 className='current-match-info-item-title'>
                          {t('competition.team')} {index + 1}:
                          </h3>
                          <div className='current-match-info-item-value'>
                            {team.teamTitle}
                          </div>
                        </div>
                        <h3>{t('competition.teamMembers')}</h3>
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
          <div className="personal-widgets-container">
            <div className="personal-data-widget">
              <div className="personal-data-widget-title">
                {t('account.avgMatchTime')}
              </div>
              <div className="personal-data-widget-value">
                {avgGameTime}
              </div>
            </div>
            <div className="personal-data-widget">
              <div className="personal-data-widget-title">
                {t('account.competitionsCount')}
              </div>
              <div className="personal-data-widget-value">
                {userCompetitionsCount}
              </div>
            </div>
          </div>
          
          <div className='current-match-info-item'>
            <div className='current-match-info-item-title'>
              {t('signUp.namePlaceholder')}:
            </div>
            <div className='current-match-info-item-value'>
              {user.name}
            </div>
          </div>
          <div className='current-match-info-item'>
            <div className='current-match-info-item-title'>
            {t('signUp.emailPlaceholder')}:
            </div>
            <div className='current-match-info-item-value'>
              {user.email}
            </div>
          </div>
        </MDBTabsPane>
        <MDBTabsPane open={justifyActive === 'Settings'}>
          <div className='settings-container'>
              <input
                  className='settings-token'
                  id="pass"
                  type={
                      showToken ? "text" : "password"
                  }
                  value={token}
                  disabled
              />
              <div className="show-token">
                <label htmlFor="check">{t('account.showToken')}</label>
                <input
                    id="check"
                    type="checkbox"
                    value={showToken}
                    onChange={() =>
                        setShowToken((prev) => !prev)
                    }
                />
              </div>
              
          </div>
        </MDBTabsPane>
      </MDBTabsContent>
    </div>
  )
}

export default Tabs
