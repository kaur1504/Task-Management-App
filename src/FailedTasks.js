import React, { useEffect, useState } from 'react';
import { auth, db } from './firebase';
import { useNavigate } from 'react-router-dom';
import { onValue, ref } from 'firebase/database';
import Sidebar from './sidebar'; 
import './App.css';

function FailedTasks() {
  const [failedList, setFailedList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        onValue(ref(db, `/${auth.currentUser.uid}/failedTasks`), (snapshot) => {
          setFailedList([]);
          const data = snapshot.val();
          if (data !== null) {
            Object.values(data).forEach((task) => {
              setFailedList((oldArr) => [...oldArr, task]);
            });
          }
        });
      } else {
        navigate('/');
      }
    });
  }, []);

  return (
    <div className='toColor'>
      <div className="main-container">
        <Sidebar />
        <div className="content">
          <h2>Failed Tasks</h2>
          <div className="tasks-list">
            {failedList.map((task) => (
              <div key={task.uiduid} className="task">
                <h3>{task.text}</h3>
                <p>Deadline: {task.deadline}</p>
                <p>Status: Expired</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FailedTasks;
