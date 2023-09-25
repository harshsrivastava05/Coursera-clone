import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import axios from 'axios';
import { useRecoilState, useRecoilValue } from 'recoil';
import { userState } from './store/atoms/admin';
import { Link } from "react-router-dom";
import {useNavigate} from "react-router-dom";

function Signup() {
    const [username, setusername] = useState("")
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const [confirmpassword, setconfirmpassword] = useState("")
    const navigate = useNavigate();
     const [user, setuser] = useRecoilState(userState);

    return (
        <div>
            <div style={{
                paddingTop: 150,
                marginBottom: 4,
                display: "flex",
                justifyContent: "center"
            }}>
                <Typography variant='h5'>welcome to coursera! Sign up below</Typography>
            </div>

            <div style={{
                display: "flex",
                justifyContent: "center"
            }}>

                <Card variant="outlined" style={{
                    width: 400,
                    padding: "22px",
                    borderRadius: "7px",
                }}>

                    <TextField
                        fullWidth
                        onChange={(e) => {
                            setusername(e.target.value)
                        }}
                        label="username"
                        variant="outlined" />

                    <br /><br />

                    <TextField
                        fullWidth
                        onChange={(e) => {
                            setemail(e.target.value)
                        }}
                        label="email"
                        variant="outlined" />

                    <br /><br />

                    <TextField
                        fullWidth={true}
                        onChange={(e) => {
                            setpassword(e.target.value)
                        }}
                        label="password"
                        variant="outlined"
                        type="password" />

                    <br /><br />

                    <TextField
                        fullWidth
                        onChange={(e) => {
                            setconfirmpassword(e.target.value)
                        }}
                        label="confirm password"
                        variant="outlined"
                        type="password" />

                    <br /><br />

                    <Button
                        size='large'
                        onClick={async () => {

                            const res =await axios.post("http://localhost:3000/admin/signup", {
                                username: username,
                                email: email,
                                password: password,
                                confirmpassword: confirmpassword
                            });
                            const data = res.data;
                            localStorage.setItem("token", data.token);
                           
                            setuser({
                                useremail:username
                            })
                            navigate("/admin/course")

                        }}
                        variant="contained">sign up</Button>                   

                </Card>

            </div>
        </div>
    )
}

export default Signup;