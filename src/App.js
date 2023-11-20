import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import UserLists from './components/user-component/UserLists';
import UserDetails from './components/user-component/UserDetails';

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<UserLists />} />
        <Route path="/user/details" element={<UserDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
