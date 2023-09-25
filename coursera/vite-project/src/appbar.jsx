import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { userEmailState } from "./store/selectors/selectors";
import { userState } from "./store/atoms/admin";

function Appbar() {
        
    const navigate = useNavigate();
    const useremail = useRecoilValue(userEmailState);
    const setuser = useRecoilState(userState)[1];

    if (useremail) {
        return <div style={{
            display: "flex",
            justifyContent: "space-between",
            padding: 4
        }}>
            <div>
                <Typography variant={"h6"}>
                    <Link to="/admin/addcourse" style={{ textDecoration: "none", color: "inherit" }}>
                        Coursera
                    </Link>
                </Typography>
            </div>

            <div style={{ display: "flex" }}>

                <div
                    style={{
                        paddingTop: 2,
                        paddingRight: 4,
                        fontSize: "24px"
                    }}>
                    <Link to="/admin/course" style={{ textDecoration: "none", color: "inherit" }}>
                        {useremail}
                    </Link>

                </div>

                <div style={{
                    marginLeft: 6,
                    marginRight: 6
                }}>
                    <Button
                        variant={"outlined"}
                        onClick={() => {
                            navigate("/admin/addcourse")
                        }}
                    >add course</Button>
                </div>

                <div style={{
                    marginLeft: 6,
                    marginRight: 6
                }}>
                    <Button
                        variant={"outlined"}
                        onClick={() => {
                            navigate("/admin/course")
                        }}
                    >Your Courses</Button>
                </div>

                <div style={{ marginLeft: 6 }}>
                    <Link to="/"> 
                    <Button
                        variant={"contained"}
                        onClick={() => {
                            localStorage.setItem("token", null);
                            setuser({
                                useremail: null
                            })
                        }}
                    >log out</Button>
                    </Link>
                   
                </div>
            </div>
        </div>
    }

    return <div style={{
        display: "flex",
        justifyContent: "space-between",
        padding: 4
    }}>
        <div>
            <Typography variant={"h6"}>
                <Link to="/admin/addcourse" style={{ textDecoration: "none", color: "inherit" }}>
                    Coursera
                </Link>
            </Typography>
        </div>

        <div style={{ display: "flex" }}>

        <div style={{ marginRight: 10 }}>
                <Button
                    variant={"outlined"}
                    onClick={() => {
                        navigate("/admin/signin")
                    }}
                >Signin</Button>
            </div>

            <div style={{ marginRight: 10 }}>
                <Button
                    variant={"contained"}
                    onClick={() => {
                        navigate("/admin/signup")
                    }}
                >Signup</Button>
            </div>

        </div>
    </div>
}


export default Appbar;