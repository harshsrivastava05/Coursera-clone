import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Button from '@mui/material/Button';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';


import axios from 'axios';

function Deletecourse() {
    let { courseId } = useParams();
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await axios.get(`http://localhost:3000/admin/delete-course/${courseId}`, {
                    headers: {
                        "Authorization": "Bearer " + localStorage.getItem("token")
                    }
                });
                console.log(res.data.allcourses);
                setCourses(res.data.allcourses);
            } catch (error) {
                console.error(error);
            }
        }
        fetchData();
    }, [courseId]);

    return (
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
            <Course key={courseId} course={courses} courseId={courseId} />
        </div>
    );

}

function Course({ course, courseId }) {
    const handleDelete = async () => {
        try {
            const res = await axios.delete(`http://localhost:3000/admin/delete-course/${courseId}`, {
                headers: {
                    "Authorization": "Bearer " + localStorage.getItem("token")
                }
            });
            const data = res.data;
            alert("Course deleted successfully!!");
        } catch (error) {
            console.error(error);
        }
    };

    return (<>

        <div style={{
            marginTop:"10px",
            height: "50vh",
            width: "100vw",
            borderRadius:"30px",
            background: "linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(121,9,111,1) 35%, rgba(6,188,224,1) 100%)"
        }}>


            <Card
                style={{
                    display: "flex",
                    flexDirection: "column",
                    marginLeft:"38%",
                    width: 350,
                    alignSelf: "center",
                    marginTop: 130,
                    padding: 5,
                    minHeight: 300,
                    overflow: "hidden",
                    borderRadius: "12px"
                }}>
                <CardMedia
                    sx={{ height: 140 }}
                    image={course.imageLink}
                    title={course.title}
                />


                <CardContent style={{ textAlign: "center" }}>
                    <Typography gutterBottom variant="h5" component="div">
                        {course.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {course.description}
                    </Typography>
                    <br />
                    <Typography gutterBottom variant="h7" component="div">
                   MRP : {course.price}Rs
                </Typography>
                </CardContent>
                <CardActions style={{
                    justifyContent: "space-evenly"
                }}>

                    <Button
                        onClick={handleDelete}
                        variant={"contained"} size="medium">
                        Delete
                    </Button>
                </CardActions>
            </Card>
        </div>
    </>
    );
}

export default Deletecourse;
