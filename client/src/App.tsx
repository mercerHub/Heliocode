
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import MainComponent from './pages/MainComponent';
import MergeAsts from './pages/MergeAsts';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />}>
            <Route path='' element={<MainComponent/>} />
            <Route path='/merge-asts' element={<MergeAsts/>} />
          </Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
