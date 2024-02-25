import React, { useEffect, useState } from 'react';
import Service from '../utils/Service';
import { useTranslation } from 'react-i18next';
import Select from 'react-select';

const Competition = () => {
  const [gameRoles, setGameRoles] = useState([]);
  const [goals, setGoals] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedGoal, setSelectedGoal] = useState();
  const [mapImage, setMapImage] = useState(null);
  const [title, setTitle] = useState('');
  const [t, i18n] = useTranslation('global');

  const [teamBlocks, setTeamBlocks] = useState([{ teamMembers: [], teamTitle: '' }]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const roles = await Service.getGameRoles();
        const objectives = await Service.getGoals();
        const fetchedUsers = await Service.getUsers();

        const transformedUsers = fetchedUsers.map((user) => ({
          value: user.id,
          label: user.email,
        }));

        setUsers(transformedUsers);
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

  const handleGoalChange = (event) => {
    setSelectedGoal(event.target.value);
  };

  const handleMapImageChange = (event) => {
    const file = event.target.files[0];
    setMapImage(file);
  };

  const handleTeamTitleChange = (index, value) => {
    const updatedTeamBlocks = [...teamBlocks];
    updatedTeamBlocks[index].teamTitle = value;
    setTeamBlocks(updatedTeamBlocks);
  };

  const handleTeamMemberChange = (index, memberIndex, field, value) => {
    const updatedTeamBlocks = [...teamBlocks];

    const userAlreadySelected = teamBlocks.some((team, i) => {
      if (i !== index) {
        return team.teamMembers.some((m) => m.userId === value);
      }
      return false;
    });

    const teamRoleOneAlreadySelected = updatedTeamBlocks[index].teamMembers.some(
      (m) => m.gameRoleId === 1 && m.userId !== value
    );

    if (!userAlreadySelected && !(field === 'gameRoleId' && value === 1 && teamRoleOneAlreadySelected)) {
      updatedTeamBlocks[index].teamMembers[memberIndex][field] = value;
      setTeamBlocks(updatedTeamBlocks);

      if (field === 'userId') {
        setSelectedUsers([...selectedUsers, value]);
      }
    } else {
      console.log('Cannot select this user or gameRole.id = 1 is already selected in the team.');
    }
  };


  const handleAddTeamMember = (index) => {
    const updatedTeamBlocks = [...teamBlocks];
    if (updatedTeamBlocks[index].teamMembers.length < 9) {
      updatedTeamBlocks[index].teamMembers.push({ userId: '', gameRoleId: '' });
      setTeamBlocks(updatedTeamBlocks);
    }
  };

  const handleRemoveTeamMember = (index, memberIndex) => {
    const updatedTeamBlocks = [...teamBlocks];
    updatedTeamBlocks[index].teamMembers.splice(memberIndex, 1);
    setTeamBlocks(updatedTeamBlocks);
  };

  const handleAddTeam = () => {
    if (teamBlocks.length < 5) {
      setTeamBlocks([...teamBlocks, { teamMembers: [], teamTitle: '' }]);
    }
  };

  const createMatch = async () => {
    const matchData = {
      title: title,
      image: mapImage,
      selectedGoal: selectedGoal,
      teamBlocks: teamBlocks,
    };

    const response = await Service.createMatch(matchData);
    console.log(response);
  };
  
  

  return (
    <div className="container">
      <label>
        Title:
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
      </label>
      <label>
        Goal:
        <select value={selectedGoal} onChange={handleGoalChange}>
          <option value="" disabled>
            Select a goal
          </option>
          {goals.map((goal) => (
            <option key={goal.id} value={goal.id}>
              {getTitleByLanguage(goal)}
            </option>
          ))}
        </select>
      </label>
      <label>
        Map:
        <input type="file" accept="image/*" onChange={handleMapImageChange} />
      </label>

      {teamBlocks.map((team, index) => (
        <div key={index}>
          <label>
            Team Title:
            <input
              type="text"
              value={team.teamTitle}
              onChange={(e) => handleTeamTitleChange(index, e.target.value)}
            />
          </label>

          <div>
            <label>
              Team Members:
              {team.teamMembers.map((member, memberIndex) => (
                <div key={memberIndex}>
                  <label>
                    User:
                    <Select
                      className="basic-single"
                      classNamePrefix="select"
                      isSearchable={true}
                      name="user"
                      options={users.filter(user => !selectedUsers.includes(user.value))}
                      onChange={(selectedOption) => handleTeamMemberChange(index, memberIndex, 'userId', selectedOption.value)}
                      />
                  </label>

                  <label>
                    Game Role:
                    <select
                      value={member.gameRoleId}
                      onChange={(e) => handleTeamMemberChange(index, memberIndex, 'gameRoleId', e.target.value)}
                    >
                      <option value="" disabled>
                        Select a Game Role
                      </option>
                      {gameRoles.map((gameRole) => (
                        <option key={gameRole.id} value={gameRole.id}>
                          {getTitleByLanguage(gameRole)}
                        </option>
                      ))}
                    </select>
                  </label>
                  <button onClick={() => handleRemoveTeamMember(index, memberIndex)}>
                    Remove Team Member
                  </button>
                </div>
              ))}
            </label>
            <button onClick={() => handleAddTeamMember(index)}>Add Team Member</button>
          </div>
        </div>
      ))}
      <button onClick={handleAddTeam}>Add Team</button>
      <button onClick={createMatch}>Create match</button>
    </div>
  );
};

export default Competition;
