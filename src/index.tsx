import { BrowserRouter as Router } from 'react-router-dom';
import ReactDOM from 'react-dom';
import App from './App';
import FirebaseContext from './context/firebase';
import { firebase, FieldValue } from './lib/firebase';
import './styles/app.css';

// Ideas:
// Create post
// View all comments

ReactDOM.render(
  <Router>
    <FirebaseContext.Provider value={{ firebase, FieldValue }}>
      <App />
    </FirebaseContext.Provider>
  </Router>,
  document.getElementById('root')
);
