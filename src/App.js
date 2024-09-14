//import logo from './logo.svg';
import './App.css';
import React, { Component } from 'react';
import NavBar from './components/NavBar';
import News from './components/News';
import { HashRouter, Route, Routes } from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'
/// class base component (type rcc then enter )
export default class App extends Component {
  state={
    progress:0
  }
  setProgress = (progress) => {
   this.setState({progress:progress})
  }
  render() {
    return (
      <div>
      <HashRouter>
         <NavBar/>
         <LoadingBar
         height={3}
        color='#f11946'
        progress={this.state.progress}
       // onLoaderFinished={() => setProgress(0)}
      />
         <Routes>
        
        
            <Route exact path="/" element={<News  setProgress={this.setProgress}pageSize={30} regions='US' key="general" categories='general'/>}></Route>
            <Route exact path="/business" element={<News  setProgress={this.setProgress}pageSize={30} regions='US' key="business" categories='business'/>}></Route>
            <Route exact path="/science" element={<News  setProgress={this.setProgress}pageSize={30} regions='US'  key="science"categories='science'/>}></Route>
            <Route exact path="/entertainment" element={<News  setProgress={this.setProgress}pageSize={30} regions='US'  key="entertainment" categories='entertainment'/>}></Route>
            <Route exact path="/world" element={<News  setProgress={this.setProgress}pageSize={30} regions='US'  key="world" categories='world'/>}></Route>
            <Route exact path="/sports" element={<News  setProgress={this.setProgress}pageSize={30} regions='US'  key="sports"  categories='sports'/>}></Route>
            <Route exact path="/finance" element={<News  setProgress={this.setProgress}pageSize={30} regions='US'  key="finance" categories='finance'/>}></Route>
            <Route exact path="/politics" element={<News  setProgress={this.setProgress}pageSize={30} regions='US'  key="politics" categories='politics'/>}></Route>
            <Route exact path="/health" element={<News  setProgress={this.setProgress}pageSize={30} regions='US'  key="health" categories='health'/>}></Route>
            <Route exact path="/food" element={<News  setProgress={this.setProgress}pageSize={30} regions='US'  key="food" categories='food'/>}></Route>
            <Route exact path="/game" element={<News  setProgress={this.setProgress}pageSize={30} regions='US'  key="game" categories='game'/>}></Route>
            
            
         
            
      </Routes>
        
       </HashRouter>
      </div>
    )
  }
}


