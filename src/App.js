
import './App.css';
import axios from 'axios';
import GhostContentAPI from '@tryghost/content-api'
import { useState } from 'react';
import './style.css';
import Dashboard from './Dashboard';
import PostsPage from './PostsPage';
import LinksPage from './LinksPage';
import {BrowserRouter, Route} from 'react-router-dom';

function App() {
  
  return (
    <BrowserRouter>
    <Route path="/" exact component={Dashboard}/>
    <Route path="/PostsPage" component={PostsPage}/>
    <Route path="/LinksPage" component={LinksPage}/>
    </BrowserRouter>
  )
}

export default App;
