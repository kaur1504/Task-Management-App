import './App.css';

import { BrowserRouter as Router, Route, Switch, Routes } from 'react-router-dom';
import Loginpage from './Loginpage';
import TodoList from './Todolist';
import HomePage from './Pages/home';
import PendingTasks from './PendingTasks';
import CompletedTasks from './CompletedTasks';
import Progress from './Progress';
import FailedTasks from './FailedTasks';
function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
      <Route path='/' element={<Loginpage></Loginpage>}></Route>
      <Route path='/todolist' element={<TodoList></TodoList>}></Route>
      <Route path='/home' element={<HomePage></HomePage>}></Route>
      <Route path="/pending" element={<PendingTasks />} />
        <Route path="/completed" element={<CompletedTasks />} />
        <Route path="/progress" element={<Progress />} />
        <Route path="/failed-tasks" element={<FailedTasks />} />

      </Routes>
    </div>
    </Router>
  );
}

export default App;
