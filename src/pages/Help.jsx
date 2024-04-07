import React, { useEffect, useState } from 'react';
import Service from '../utils/Service';
import { useTranslation } from "react-i18next";
import { MDBAccordion, MDBAccordionItem } from 'mdb-react-ui-kit';
import SquadLeadScene from '../components/SquadLeadScene';
import RiflemanScene from '../components/RiflemanScene';
import ScoutScene from '../components/ScoutScene';
import SniperScene from '../components/SniperScene';

const Help = () => {
  const [gameRoles, setGameRoles] = useState([]);
  const [goals, setGoals] = useState([]);
  const [t, i18n] = useTranslation("global");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const roles = await Service.getGameRoles();
        const objectives = await Service.getGoals();

        setGameRoles(roles);
        setGoals(objectives);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const getTitleByLanguage = (role) => {
    if (i18n.language === 'en') {
      return role.title.en;
    } else if (i18n.language === 'uk') {
      return role.title.uk || role.title.en; 
    }
    return role.title.en; 
  };

  const getDescriptionByLanguage = (role) => {
    if (i18n.language === 'en') {
      return role.description.en;
    } else if (i18n.language === 'uk') {
      return role.description.uk || role.description.en; 
    }
    return role.description.en; 
  };

  const renderSceneComponent = (role) => {
    const modelName = role?.['3d_model'] || ''; // Accessing the 3d_model property
    if (modelName.includes('SquadLead')) {
      return <SquadLeadScene />;
    } else if (modelName.includes('Scout')) {
      return <ScoutScene />;
    } else if (modelName.includes('Sniper')) {
      return <SniperScene />;
    } else if (modelName.includes('Scout')) {
      return <ScoutScene />;
    } else {
      return <RiflemanScene />;
    }
  };

  return (
    <div className='container' style={{"margin-top": "40px", "margin-bottom": "40px"}}>
      <h2>
        {t('phrazes.gameRoles')}
      </h2>
      <MDBAccordion initialActive={1}>
        {gameRoles.map((role, index) => (
          <MDBAccordionItem key={index} collapseId={index + 1} headerTitle={getTitleByLanguage(role)}>
            <div className='accordion-item-content'>
              <div dangerouslySetInnerHTML={{ __html: getDescriptionByLanguage(role) }} />
              {renderSceneComponent(role)}
            </div>
          </MDBAccordionItem>
        ))}
      </MDBAccordion>
      <h2 style={{"margin-top": "40px"}}>
        {t('phrazes.goals')}
      </h2>
      <MDBAccordion initialActive={1}>
        {goals.map((role, index) => (
          <MDBAccordionItem key={index} collapseId={index + 1} headerTitle={getTitleByLanguage(role)}>
            <div dangerouslySetInnerHTML={{ __html: getDescriptionByLanguage(role) }} />
          </MDBAccordionItem>
        ))}
      </MDBAccordion>
      
    </div>
  );
};

export default Help;
