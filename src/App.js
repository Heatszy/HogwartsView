import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarDay } from '@fortawesome/free-solid-svg-icons';
import './App.css';

const App = () => {
  const [people, setPeople] = useState([]);

  useEffect(() => {
    fetch('index.json')
      .then(response => response.json())
      .then(data => setPeople(data))
      .catch(error => console.error(error));
  }, []);

  const teachers = people.filter(person => person.isTeacher);
  const students = people.filter(person => !person.isTeacher);

  function calculateSchoolYear(arrivalDate, currentDate) {
    const arrival = new Date(arrivalDate);
    const current = new Date(currentDate);
    const yearsDifference = current.getFullYear() - arrival.getFullYear();
    
    /* Considering Hogwarts starts on September 1st, we need to check if the current date
     is before or after September 1st of the current year to determine the school year.*/
    const isBeforeStartOfSchoolYear = current.getMonth() < 9;
      
    
    const schoolYear = isBeforeStartOfSchoolYear ? yearsDifference : yearsDifference + 1;
  
    const yearNames = ['First', 'Second', 'Third', 'Fourth', 'Fifth', 'Sixth', 'Seventh'];
    console.log(schoolYear >= 1 && schoolYear <= 7 ? yearNames[schoolYear - 1] + ' year' : 'graduated')
    return schoolYear >= 1 && schoolYear <= 7 ? yearNames[schoolYear - 1] + ' year' : 'graduated';
  }
  

  return (
    <div className="body">
    <header className="hogwarts-style">Hogwarts</header>
    <div className="content">

      <div className='teachersection'>
        <h2 className='teacherstitle'> Teachers</h2>
        <div className='teachers'>
            {teachers.map((person, index) => (
                
                <div className="card">
                <div className="card-content">
                  <div className="name">{person.firstName} {person.lastName}</div>
                  <div className="description">{person.description}</div>
                  
                </div>
                {person.assignment && <div className={`tag ${person.assignment.toLowerCase()}`}>{person.assignment}</div>}
                <div className="icon-calendar">
                    <FontAwesomeIcon icon={faCalendarDay} />
                    <span className="date">{person.arrivalDate}</span>
                </div>
              </div>
              
              ))}
        </div>
      </div>

      <div className='studentsection'>
        <h2 className='studentstitle'> Students</h2>
        <div className='students'>
            {students.map((person, index) => (
                
                <div className="card">
                <div className="card-content">
                  <div className="name">{person.firstName} {person.lastName}</div>
                  <div className="description">{person.description.split('\n').map((line, index) => (
                  <div key={index}>
                    {line}
                    {index < person.description.split('\n').length - 1 ? <br /> : null}
                  </div>
                ))}
                  </div>
                </div>
                {person.house && <div className={`tag ${person.house.toLowerCase()}`}>{person.house}</div>}
                <div className="icon-calendar">
                    <FontAwesomeIcon icon={faCalendarDay} />
                    <span className="date">{calculateSchoolYear(person.arrivalDate, '1991/11/12')}</span>
                </div>
              </div>
              
              ))}
        </div>
      </div>
    </div>
    
  </div>
  
  );
}

export default App;
