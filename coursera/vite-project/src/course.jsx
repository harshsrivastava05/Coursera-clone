import { Card, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import Button from "@mui/material/Button";
import axios from 'axios';
import {useNavigate} from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { courseState } from "./store/atoms/admin";
import { courseimage } from "./store/selectors/selectors";


function Courses() {

    const [courses, setcourses] = useState([]);
    const setcourse = useRecoilState(courseState)[1];

    const init= async ()=>{
        const res = await axios.get("http://localhost:3000/admin/course", {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        })
            console.log(res.data.allcourses);
            setcourses(res.data.allcourses);
            setcourse({
                course:res.data.allcourses
            })
        
    }

    useEffect(() => {   
      init();
    }, []);

    return (<div>

        <Typography variant="h5" style={{
            textDecoration: 'underline',
            margin: 8,
            textAlign: "center"

        }}>
            Your present courses
        </Typography>
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
            {courses.map((course) => (
                <Course key={course._id} course={course} />
            ))}
        </div>
    </div>
    );
}

function Course(props) {

    const navigate = useNavigate();

    return (
        <Card
            style={{
                display: "flex",
                flexDirection: "column",
                width: 300,
                margin: 10,
                padding: 5,
                minHeight: 200,
                overflow: "hidden"
            }}>
            <div >
                <CardMedia
                    sx={{ height: 150 }}
                    image={props.course.imageLink}
                />
            </div>

            <CardContent style={{ textAlign: "center" }}>

                <Typography gutterBottom variant="h5" component="div">
                    {props.course.title}
                </Typography>

                <Typography variant="body2" color="text.secondary">
                    {props.course.description}
                </Typography>
                <br />
                <Typography gutterBottom variant="h7" component="div">
                   MRP : {props.course.price}Rs
                </Typography>
            </CardContent>
            <CardActions style={{
                justifyContent:"space-evenly"
            }}>
                <Button
                    onClick={() => {
                        navigate(`/admin/course/${props.course._id}`);
                    }}
                    variant={"contained"} size="medium">Update</Button>
                    <Button
                    onClick={() => {
                        navigate(`/admin/delete-course/${props.course._id}`);
                    }}
                    variant={"contained"} size="medium">delete</Button>
            </CardActions>
        </Card>
    );
}


export default Courses;