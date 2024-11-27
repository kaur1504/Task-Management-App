import React, { useEffect, useState } from 'react';
import { auth, db } from './firebase';
import { useNavigate } from 'react-router-dom';
import { onValue, ref } from 'firebase/database';
import Sidebar from './sidebar';
import './completetask.css';

function CompletedTasks() {
  const [list, setList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        onValue(ref(db, `/${auth.currentUser.uid}`), (snapshot) => {
          setList([]);
          const data = snapshot.val();
          if (data !== null) {
            Object.values(data).forEach((task) => {
              if (task.completed) {
                const taskDeadline = new Date(task.deadline);
                const currentDate = new Date();
                if (taskDeadline >= currentDate) {
                  setList((oldArr) => [...oldArr, task]);
                }
              }
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
          <h2>Completed Tasks</h2>
          <div className="tasks-list">
            {list.map((task) => (
              <div key={task.uiduid} className="task">
                <h3>{task.text}</h3>
                <p>Completed on: {task.completedDate}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CompletedTasks;
