// import React, { useEffect, useState } from 'react';
// import { auth, db } from './firebase';
// import { signOut, onAuthStateChanged } from 'firebase/auth';
// import { useNavigate } from 'react-router-dom';
// import { uid } from 'uid';
// import { set, ref, onValue, remove } from 'firebase/database';
// import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
// import AddIcon from '@mui/icons-material/Add';
// import './todolist.css';
// import Sidebar from './sidebar';

// function TodoList() {
//   const [text, setText] = useState('');
//   const [deadline, setDeadline] = useState('');
//   const [list, setList] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     auth.onAuthStateChanged((user) => {
//       if (user) {
//         onValue(ref(db, `/${auth.currentUser.uid}`), (snapshot) => {
//           setList([]); // Clear previous tasks
//           const data = snapshot.val();
//           if (data !== null) {
//             // Add tasks to the list if they contain valid text and deadline
//             Object.values(data).forEach((task) => {
//               if (task.text && task.deadline) {
//                 setList((oldArr) => [...oldArr, task]);
//               }
//             });
//           }
//         });
//       } else {
//         navigate('/');
//       }
//     });
//   }, [navigate]);

//   const addtofirebase = () => {
//     if (text && deadline) { // Ensure text and deadline are not empty
//       const uiduid = uid();
//       set(ref(db, `/${auth.currentUser.uid}/${uiduid}`), {
//         text: text,
//         deadline: deadline,
//         uiduid: uiduid,
//         completed: false,
//       }).then(() => {
//         // Clear input fields after adding
//         setText('');
//         setDeadline('');
//       }).catch((err) => {
//         console.error("Error adding task:", err);
//       });
//     }
//   };

//   const deletetext = (uid) => {
//     remove(ref(db, `/${auth.currentUser.uid}/${uid}`));
//   };

//   const signout = () => {
//     signOut(auth).then(() => {
//       navigate('/');
//     }).catch((err) => alert("error"));
//   };

//   return (
//     <div className='todolist-container'>
//       <Sidebar />
//       <div className='todolist'>
//         <div className='inputtext'>
//           <input
//             type='text'
//             placeholder='Enter your task'
//             onChange={(e) => setText(e.target.value)}
//             value={text}
//           />
//           <input
//             type='date'
//             placeholder='Deadline'
//             onChange={(e) => setDeadline(e.target.value)}
//             value={deadline}
//           />
//           <button onClick={addtofirebase}><AddIcon fontSize='large' /></button>
//         </div>
//         <div className='list'>
//           {list.length === 0 ? (
//             <p>No tasks added yet</p>
//           ) : (
//             list.map((task) => (
//               <div className='text' key={task.uiduid}>
//                 <h1 className='listtext'>{task.text}</h1>
//                 <p>Deadline: {task.deadline}</p>
//                 <button onClick={() => deletetext(task.uiduid)}>
//                   <DeleteForeverIcon />
//                 </button>
//               </div>
//             ))
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default TodoList;
import React, { useEffect, useState } from 'react';
import { auth, db } from './firebase';
import { signOut, onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { uid } from 'uid';
import { set, ref, onValue, remove } from 'firebase/database';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import AddIcon from '@mui/icons-material/Add';
import './todolist.css';
import Sidebar from './sidebar';

function TodoList() {
  const [text, setText] = useState('');
  const [deadline, setDeadline] = useState('');
  const [list, setList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const tasksRef = ref(db, `/${user.uid}`);
        onValue(tasksRef, (snapshot) => {
          const data = snapshot.val();
          if (data) {
            const tasks = Object.values(data).filter((task) => task.text && task.deadline);
            setList(tasks);
          } else {
            setList([]);
          }
        });
      } else {
        navigate('/');
      }
    });

    return () => unsubscribe(); // Cleanup on unmount
  }, [navigate]);

  const addtofirebase = () => {
    if (text && deadline) {
      const uiduid = uid();
      const taskRef = ref(db, `/${auth.currentUser.uid}/${uiduid}`);
      set(taskRef, {
        text: text,
        deadline: deadline,
        uiduid: uiduid,
        completed: false,
      })
        .then(() => {
          setText(''); // Clear input after successful addition
          setDeadline('');
        })
        .catch((err) => {
          console.error('Error adding task:', err);
        });
    }
  };

  const deletetext = (taskId) => {
    const taskRef = ref(db, `/${auth.currentUser.uid}/${taskId}`);
    remove(taskRef).catch((err) => {
      console.error('Error deleting task:', err);
    });
  };

  const signout = () => {
    signOut(auth)
      .then(() => {
        navigate('/');
      })
      .catch((err) => alert('Error signing out:', err));
  };

  return (
    <div className='todolist-container'>
      <Sidebar />
      <div className='todolist'>
        <div className='inputtext'>
          <input
            type='text'
            placeholder='Enter your task'
            onChange={(e) => setText(e.target.value)}
            value={text}
          />
          <input
            type='date'
            placeholder='Deadline'
            onChange={(e) => setDeadline(e.target.value)}
            value={deadline}
          />
          <button onClick={addtofirebase}>
            <AddIcon fontSize='large' />
          </button>
        </div>
        <div className='list'>
          {list.length === 0 ? (
            <p>No tasks added yet</p>
          ) : (
            list.map((task) => (
              <div className='text' key={task.uiduid}>
                <h1 className='listtext'>{task.text}</h1>
                <p>Deadline: {task.deadline}</p>
                <button onClick={() => deletetext(task.uiduid)}>
                  <DeleteForeverIcon />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default TodoList;
