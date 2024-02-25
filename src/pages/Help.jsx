import React, { useEffect, useState } from 'react';
import Service from '../utils/Service';
import { useTranslation } from "react-i18next";
import { MDBAccordion, MDBAccordionItem } from 'mdb-react-ui-kit';

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

  return (
    <div>
      <h2>
        Game roles
      </h2>
      <MDBAccordion initialActive={1}>
        {gameRoles.map((role, index) => (
          <MDBAccordionItem key={index} collapseId={index + 1} headerTitle={getTitleByLanguage(role)}>
            <div dangerouslySetInnerHTML={{ __html: getDescriptionByLanguage(role) }} />
          </MDBAccordionItem>
        ))}
      </MDBAccordion>
      <h2>
        Goals
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
