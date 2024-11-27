// import React, { useEffect, useState } from 'react';
// import { auth, db } from './firebase';
// import { useNavigate } from 'react-router-dom';
// import { onValue, ref } from 'firebase/database';
// import { PieChart } from 'react-minimal-pie-chart'; 
// import Sidebar from './sidebar'; 
// import './progress.css';

// function Progress() { 
//   const [totalTasks, setTotalTasks] = useState(0);
//   const [completedTasks, setCompletedTasks] = useState(0);
//   const [expiredTasks, setExpiredTasks] = useState(0);
//   const navigate = useNavigate();

//   useEffect(() => {
//     auth.onAuthStateChanged((user) => {
//       if (user) {
//         // Listen for tasks from the main tasks path
//         onValue(ref(db, `/${auth.currentUser.uid}`), (snapshot) => {
//           const data = snapshot.val();
//           let completed = 0;
//           let total = 0;
//           let expired = 0;

//           if (data !== null) {
//             Object.values(data).forEach((task) => {
//               const taskDeadline = new Date(task.deadline);
//               const currentDate = new Date();

//               total++; // Count all tasks

//               // Check if the task is expired (deadline passed)
//               if (task.completed && taskDeadline >= currentDate) {
//                 completed++; // Count completed tasks if they are not expired
//               } else if (task.deadline && taskDeadline < currentDate && !task.completed) {
//                 expired++; // Count tasks as expired if they are past deadline and not completed
//               }
//             });
//           }

//           // Update the main task stats
//           setTotalTasks(total);
//           setCompletedTasks(completed);
//           setExpiredTasks(expired);
//         });

//       } else {
//         navigate('/');
//       }
//     });
//   }, [navigate]);

//   // Calculate the progress percentage
//   const progressPercentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

//   return (
//     <div className="toColor">
//       <div className="main-container">
//         <Sidebar />
//         <div className="content">
//           <h2>Progress</h2>
//           <div className="task-progress">
//             <p>Total Tasks: {totalTasks}</p>
//             <p>Completed Tasks: {completedTasks}</p>
//             <p>Expired Tasks: {expiredTasks}</p> {/* Display expired tasks */}
//             <p>Progress: {progressPercentage}%</p>
//           </div>

//           {/* Render the pie chart only if there are tasks */}
//           {totalTasks > 0 ? (
//             <div className="pie-chart-container">
//               <PieChart
//                 data={[
//                   { title: 'Completed', value: completedTasks, color: '#4CAF50' },   // Green for completed tasks
//                   { title: 'Remaining', value: totalTasks - completedTasks - expiredTasks, color: '#FF9C73' },  // Orange for remaining tasks
//                   { title: 'Expired', value: expiredTasks, color: '#FF6347' }, // Red for expired tasks
//                 ]}
//                 animate
//                 animationDuration={500}
//                 label={({ dataEntry }) => `${dataEntry.title}: ${dataEntry.value}`}
//                 labelStyle={{
//                   fontSize: '6px',
//                   fontFamily: 'sans-serif',
//                   fontWeight: 'bold',
//                   fill: '#fff',
//                 }}
//                 width={250}
//                 height={250}
//               />
//             </div>
//           ) : (
//             <p>No tasks available</p>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default Progress;
import React, { useEffect, useState } from 'react';
import { auth, db } from './firebase';
import { useNavigate } from 'react-router-dom';
import { onValue, ref } from 'firebase/database';
import { PieChart } from 'react-minimal-pie-chart'; 
import Sidebar from './sidebar'; 
import './progress.css';

function Progress() { 
  const [totalTasks, setTotalTasks] = useState(0);
  const [completedTasks, setCompletedTasks] = useState(0);
  const [remainingTasks, setRemainingTasks] = useState(0); // New state for remaining tasks
  const navigate = useNavigate();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        // Listen for tasks from the main tasks path
        onValue(ref(db, `/${auth.currentUser.uid}`), (snapshot) => {
          const data = snapshot.val();
          let completed = 0;
          let total = 0;
          let remaining = 0;

          if (data !== null) {
            Object.values(data).forEach((task) => {
              const taskDeadline = new Date(task.deadline);
              const currentDate = new Date();

              // Only count tasks that have either deadline or completed status
              if (task.deadline || task.completed !== undefined) {
                total++; // Count valid tasks

                // Check if the task is completed
                if (task.completed) {
                  completed++; // Count completed tasks
                } else {
                  remaining++; // Count remaining tasks
                }
              }
            });
          }

          // Update the main task stats
          setTotalTasks(total);
          setCompletedTasks(completed);
          setRemainingTasks(remaining);
        });
      } else {
        navigate('/');
      }
    });
  }, [navigate]);

  // Calculate the progress percentage
  const progressPercentage = totalTasks > 0 ? (completedTasks / totalTasks) * 100 : 0;

  return (
    <div className="toColor">
      <div className="main-container">
        <Sidebar />
        <div className="content">
          <h2>Progress</h2>
          <div className="task-progress">
            <p>Total Tasks: {totalTasks}</p>
            <p>Completed Tasks: {completedTasks}</p>
            <p>Remaining Tasks: {remainingTasks}</p> {/* Display remaining tasks */}
            <p>Progress: {progressPercentage.toFixed(2)}%</p> {/* Progress in percentage */}
          </div>

          {/* Render the pie chart only if there are tasks */}
          {totalTasks > 0 ? (
            <div className="pie-chart-container">
              <PieChart
                data={[
                  { title: 'Completed', value: completedTasks, color: '#4CAF50' },   // Green for completed tasks
                  { title: 'Remaining', value: remainingTasks, color: '#FF9C73' },    // Orange for remaining tasks
                ]}
                animate
                animationDuration={500}
                label={({ dataEntry }) => `${dataEntry.title}: ${dataEntry.value}`}
                labelStyle={{
                  fontSize: '6px',
                  fontFamily: 'sans-serif',
                  fontWeight: 'bold',
                  fill: '#fff',
                }}
                width={250}
                height={250}
              />
            </div>
          ) : (
            <p>No tasks available</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Progress;
