import { Route, Routes } from 'react-router-dom';
import './App.css';
import PostForm from './Components/PostForm';
import PostList from './Components/PostList';

function App() {
  return (
    <Routes>
      <Route path='/' element={<PostList />} />
      <Route path='/create-post' element={<PostForm />} />
      <Route path='/update-post/:id' element={<PostForm />} />
    </Routes>
  );
}

export default App;
