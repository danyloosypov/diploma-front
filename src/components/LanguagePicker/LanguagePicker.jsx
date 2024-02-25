import React, { useState } from "react";
import { Dropdown, ButtonGroup, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.css";
import ukflag from "./img/uk.png";
import uaflag from "./img/ua.png";
import i18next from "i18next";
import { useTranslation } from "react-i18next";

export default function LanguagePicker() {
  const options = [
    {
      value: "en",
      label: (
        <img src={ukflag} width="20" alt="" />
      )
    }, 
    {
      value: "uk",
      label: (
        <img src={uaflag} width="20" alt="" />
      )
    } 
  ];
  const [t, i18n] = useTranslation("global");

  const [langLabel, setLangLabel] = useState(options[0].label);
  function handlclick(n) {
    setLangLabel(options[n].label);
    
    i18n.changeLanguage(options[n].value)
  }

  return (
      <Dropdown as={ButtonGroup}>
        <Dropdown.Toggle
          className=" bg-transparent btn-outline-secondary border-0 "
          id="lng-dropdown"
        >
          {langLabel}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item onClick={() => handlclick(0)}>
          <img src={ukflag} width="20" alt="" /> {options[0].value}
          </Dropdown.Item>
          <Dropdown.Item onClick={() => handlclick(1)}>
          <img src={uaflag} width="20" alt="" /> {options[1].value}
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
  );
}
