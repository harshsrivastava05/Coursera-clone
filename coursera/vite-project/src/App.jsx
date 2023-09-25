import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import React from 'react';
import { Navigate } from "react-router-dom";
import Appbar from "./appbar.jsx";
import Signin from "./signin.jsx";
import Addcourse from "./addcourse.jsx";
import Signup from "./signup.jsx";
import Courses from './course.jsx';
import CourseId from './CourseId.jsx';
import Deletecourse from './deletecourse.jsx';
import { useEffect, useState } from "react";
import axios from "axios";
import { RecoilRoot,useSetRecoilState } from 'recoil';
import { userState } from './store/atoms/admin.js';

function App() {

  return (

    <RecoilRoot>
      <div style={{
        width: "100vw",
        height: "100vh",
        backgroundColor: "#eeeeee"
      }}
      >
        <Router>
          <Appbar />
          <Inituser />
          <Routes>
            <Route path="/admin/signup" element={<Signup />} />
            <Route path="*" element={< Navigate to="/" />} />
            <Route path="/admin/signup" element={<Signup />} />
            <Route path="/" element={<Signin />} />
            <Route path="/admin/addcourse" element={<Addcourse />} />
            <Route path="/admin/course" element={<Courses />} />
            <Route path="/admin/course/:courseId" element={<CourseId />} />
            <Route path="/admin/delete-course/:courseId" element={<Deletecourse />} />
          </Routes>
        </Router>
      </div>
    </RecoilRoot>

  );
}

function Inituser() {

  const setuser = useSetRecoilState(userState);

  const init = async () => {
    try {
      const response = await axios.get("http://localhost:3000/admin/me", {
        headers: {
          "Authorization": "Bearer " + localStorage.getItem("token")
        }
      })

      if (response.data.username) {
        setuser({
          useremail: response.data.username
        })
      } else {
        setuser({
          useremail: null
        })
      }

    } catch (error) {
      setuser({
        useremail: null
      })
    }
  }

  useEffect(() => {
    init();
  }, []);

  return <></>
};

export default App;