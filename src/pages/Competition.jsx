import React, { useEffect, useState } from 'react';
import Service from '../utils/Service';
import { useTranslation } from 'react-i18next';
import Select from 'react-select';
import Timer from '../components/Timer';
import Body from '../components/Body';
import useAuthContext from '../context/AuthContext';
import { toast } from 'react-toastify';

const Competition = () => {
  const [gameRoles, setGameRoles] = useState([]);
  const [goals, setGoals] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [users, setUsers] = useState([]);
  const [selectedGoal, setSelectedGoal] = useState(0);
  const [mapImage, setMapImage] = useState(null);
  const [title, setTitle] = useState('');
  const [t, i18n] = useTranslation('global');
  const [startTime, setStartTime] = useState('');
  const { user } = useAuthContext();
  const [currentCompetition, setCurrentCompetition] = useState(null);
  const [teamBlocks, setTeamBlocks] = useState([{ teamMembers: [], teamTitle: '' }]);
  const [matchResult, setMatchResult] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const roles = await Service.getGameRoles();
        const objectives = await Service.getGoals();
        const fetchedUsers = await Service.getUsers();

        const currentMatch = await Service.getCurrentMatch();
        setCurrentCompetition(currentMatch);
        if (currentMatch.game_start) {
          setStartTime(new Date(currentMatch.game_start));
        }
        console.log(currentMatch)

        const transformedUsers = fetchedUsers.map((user) => ({
          value: user.id,
          label: user.email,
        }));

        setUsers(transformedUsers);
        setGameRoles(roles);
        setGoals(objectives);

        setSelectedGoal(objectives[0].id);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
    //setStartTime(new Date(startTime));  ///////////////

  }, []);

  const handleDeleteTeam = (index) => {
    const deletedTeam = teamBlocks[index];
    const updatedTeamBlocks = [...teamBlocks];
    
    updatedTeamBlocks.splice(index, 1);
    
    const deletedUserIds = deletedTeam.teamMembers.map(member => member.userId);
    const updatedSelectedUsers = selectedUsers.filter(userId => !deletedUserIds.includes(userId));
    
    setTeamBlocks(updatedTeamBlocks);
    setSelectedUsers(updatedSelectedUsers);
  };  

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
    console.log(event.target.value, selectedGoal)
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
    const removedUserId = updatedTeamBlocks[index].teamMembers[memberIndex].userId;

    updatedTeamBlocks[index].teamMembers.splice(memberIndex, 1);
    setTeamBlocks(updatedTeamBlocks);

    setSelectedUsers(selectedUsers.filter(userId => userId !== removedUserId));
  };

  const handleAddTeam = () => {
    if (teamBlocks.length < 5) {
      setTeamBlocks([...teamBlocks, { teamMembers: [], teamTitle: '' }]);
    }
  };

  const handleMatchResultChange = (e) => {
    setMatchResult(e.target.value);
  };

  const createMatch = async () => {
    const currentDateTime = new Date().toISOString().slice(0, 19).replace('T', ' ');

    const matchData = {
      title: title,
      image: mapImage,
      selectedGoal: selectedGoal,
      teamBlocks: teamBlocks,
      game_start: currentDateTime
    };

    const response = await Service.createMatch(matchData);
    if (response.data.errors)
    {
      const errors = response.data.errors;

      const currentLanguage = i18n.language; 

      for (const field in errors) {
        if (errors.hasOwnProperty(field)) {
          const errorMessages = errors[field];
          for (const errorMessage in errorMessages) {
            toast.error(errorMessages[errorMessage][currentLanguage]);
          }
        }
      }
    } else {
      toast(response.data.message);

      setTimeout(() => {
        window.location.reload();
      }, 3500);
    }
  };

  const stopMatch = async () => {
    try {
      if (!matchResult) {
        toast.warning('Please input the match result.');
        return;
      }
      
      const currentTime = new Date().toISOString().slice(0, 19).replace('T', ' ');
  
      const response = await Service.stopMatch(currentCompetition.id, currentTime, matchResult);

      toast(response.message);

      setTimeout(() => {
        window.location.reload();
      }, 3500);

      console.log(response); 
    } catch (error) {
      console.error('Error stopping match:', error);
    }
  };
  
  return (
    <div className="container competition-form">
      {!currentCompetition ? (
      <div className='competition-form-container'>
        <h1>Match creation</h1>
        <div className='competition-fields'>
          <label className='form-item'>
            Title:
            <input className='form-control' type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
          </label>
          <label className='form-item'>
            Goal:
            <select className='form-control' value={selectedGoal} onChange={handleGoalChange}>
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
          <label className='form-item'>
            Map:
            <input className='form-control-file' type="file" accept="image/*" onChange={handleMapImageChange} />
          </label>
        </div>
        
        {teamBlocks.map((team, index) => (
          <div className='team-form-block' key={index}>
            <label className='form-item'>
              Team Title:
              <input
                className='form-control'
                type="text"
                value={team.teamTitle}
                onChange={(e) => handleTeamTitleChange(index, e.target.value)}
              />
            </label>

            <div className='form-team-item'>
              Team Members:
              {team.teamMembers.map((member, memberIndex) => (
                <div className='form-team-member-item' key={memberIndex}>
                  <label className='form-item'>
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

                  <label className='form-item'>
                    Game Role:
                    <select
                      className='form-control'
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
                  <button className='btn btn-danger form-btn' onClick={() => handleRemoveTeamMember(index, memberIndex)}>
                    Remove Team Member
                  </button>
                </div>
              ))}
            </div>
            <div className='form-team-block-btns'>
              <button className='btn btn-primary form-btn' onClick={() => handleAddTeamMember(index)}>Add Team Member</button>
              <button className='btn btn-danger form-btn' onClick={() => handleDeleteTeam(index)}>Delete Team</button>
            </div>
          </div>
        ))}
        <button className='btn btn-primary form-btn' onClick={handleAddTeam}>Add Team</button>
        <button className='btn btn-success form-btn' onClick={createMatch}>Create match</button>
      </div>
      ) : (
      <div className='current-match'>
        <h2 style={{"textAlign": "center"}}>
          Match info
        </h2>
        <div className='current-match-info'>
          <div className='current-match-info-item'>
            <div className='current-match-info-item-title'>
              Title:
            </div>
            <div className='current-match-info-item-value'>
              {currentCompetition.title}
            </div>
          </div>
          <div className='current-match-info-item'>
            <div className='current-match-info-item-title'>
              Goal:
            </div>
            <div className='current-match-info-item-value'>
              {i18n.language === 'en' ? currentCompetition.goal.title.en : currentCompetition.goal.title.uk}
            </div>
          </div>
          <div className='current-match-info-item'>
            <div className='current-match-info-item-title'>
              Match started at:
            </div>
            <div className='current-match-info-item-value'>
              {currentCompetition.game_start}
            </div>
          </div>
          <div style={{"flexDirection": "column", "alignItems": "center"}} className='current-match-info-item'>
            <div className='current-match-info-item-title'>
              Map:
            </div>
            <div className='current-match-info-item-value'>
              <img className='current-match-info-item-image' src={Service.getBaseURL() + '/storage/' + currentCompetition.map} alt="" />
            </div>
          </div>
        </div>
        <h2 style={{"marginTop": "30px", "textAlign": "center"}}>
          Teams
        </h2>
        <div className='current-match-teams'>
          {currentCompetition.teams.map((team, index) => (
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

        <Timer startTime={startTime} />
        <div style={{"padding": "20px 0"}}>
          <label className='form-item'>
            Result:
            <input className='form-control' type="text" value={matchResult} onChange={handleMatchResultChange} />
          </label>
        </div>
        {
          user.id == currentCompetition.host_id && (
            <button style={{"margin": "0 auto"}} className='btn btn-warning form-btn' onClick={stopMatch}>Stop match</button>
          )
        }
        <Body />
      </div>
      )}
    </div>
    
  );
};

export default Competition;
