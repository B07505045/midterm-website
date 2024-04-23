import React from 'react'
import "./Styles/w3.css"
import photo from './assets/photo.jpg'

export default function About() {
  return (
    <>
      <div className="w3-row">
        <div className="w3-half w3-blue-grey w3-container" style={{height:"100vh"}}>
          <div className="w3-padding-64 w3-center">
            <h1>About Me</h1>
            <img src={photo} className="w3-margin w3-circle" alt="Person" style={{width:"40%"}}/>
            <div className="w3-left-align w3-padding-large">
              <p>王靖婷</p>
              <p>台大電機工程學研究所 資訊安全碩士班</p>
              <p>email: r12921a13@ntu.edu.tw</p>
            </div>
          </div>
        </div>
        <div className="w3-half w3-black w3-container w3-center" style={{height:"100vh"}}>
          <div className="w3-padding-64">
            <h1>Intro</h1>
          </div>
          <div className="w3-padding-64">
            <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" className="w3-button w3-black w3-block w3-hover-blue-grey w3-padding-16">Dance</a>
            <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" className="w3-button w3-black w3-block w3-hover-teal w3-padding-16">Piano</a>
            <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" className="w3-button w3-black w3-block w3-hover-dark-grey w3-padding-16">Movie</a>
            <a href="https://www.youtube.com/watch?v=dQw4w9WgXcQ" className="w3-button w3-black w3-block w3-hover-brown w3-padding-16">Comic</a>
          </div>
        </div>
        
      </div>
    </>
  )
}
