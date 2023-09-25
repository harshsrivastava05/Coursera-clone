import { useEffect, useState } from "react";
import { Card, Grid } from "@mui/material";
import { useParams } from "react-router-dom";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { courseState } from "./store/atoms/admin";
import { coursedescription, coursedetails, courseimage, courseprice, coursepublished, coursetitle } from "./store/selectors/selectors";


function CourseId() {
    let { courseId } = useParams();

    const setcourse = useSetRecoilState(courseState);

    const [course, setCourse] = useState({
        title: "",
        description: "",
        price: 0,
        imageLink: "",
        published: false
    });

    const [title, settitle] = useState("");
    const [description, setdescription] = useState("");
    const [price, setprice] = useState("");
    const [imageLink, setimagelink] = useState("");
    const [published, setPublished] = useState(false);
    const navigate = useNavigate();

    const init = async () => {
        const res = await axios.get(`http://localhost:3000/admin/course/${courseId}`, {
            headers: {
                "content-type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        })
        const data = res.data;
        console.log(data.Course);
        setCourse(data.Course);
        settitle(data.Course.title);
        setdescription(data.Course.description);
        setprice(data.Course.price);
        setimagelink(data.Course.imageLink);
        setPublished(data.Course.published);
        setcourse({
            course: data.Course
        });
    }

    useEffect(() => {
        init();
    }, [courseId])


    return <>
        <GrayTopper />
        <Grid container>
            <Grid item lg={8} md={12} sm={12}>
                <UpdateCard title={title} imageLink={imageLink} description={description} price={price} published={published}
                    settitle={settitle} setimagelink={setimagelink} setdescription={setdescription} setprice={setprice} setPublished={setPublished} />
            </Grid>
            <Grid item lg={4} md={12} sm={12}>
                <CourseCard />
            </Grid>
        </Grid>
    </>
}

function GrayTopper() {
    const title = useRecoilValue(coursetitle);
    return <div style={{ height: 250, background: "#212121", top: 0, width: "100vw", zIndex: 0, marginBottom: -250 }}>
        <div style={{ height: 250, display: "flex", justifyContent: "center", flexDirection: "column" }}>
            <div>
                <Typography style={{ color: "white", fontWeight: 600 }} variant="h3" textAlign={"center"}>
                    {title}
                </Typography>
            </div>
        </div>
    </div>
}

function UpdateCard({ title, imageLink, description, price, published, settitle, setimagelink, setdescription, setprice, setPublished }) {
    const [courseDetails, setCourse] = useRecoilState(courseState);
    let { courseId } = useParams();
    const navigate = useNavigate();


    return <div style={{ display: "flex", justifyContent: "center" }}>
        <Card varint={"outlined"} style={{ maxWidth: 600, marginTop: 200 }}>
            <div style={{ padding: 20 }}>
                <Typography style={{ marginBottom: 10 }}>Update course details</Typography>
                <TextField
                    value={title}
                    style={{ marginBottom: 10 }}
                    onChange={(e) => {
                        settitle(e.target.value)
                    }}
                    fullWidth={true}
                    label="Title"
                    variant="outlined"
                />

                <TextField
                    value={description}
                    style={{ marginBottom: 10 }}
                    onChange={(e) => {
                        setdescription(e.target.value)
                    }}
                    fullWidth={true}
                    label="Description"
                    variant="outlined"
                />

                <TextField
                    value={imageLink}
                    style={{ marginBottom: 10 }}
                    onChange={(e) => {
                        setimagelink(e.target.value)
                    }}
                    fullWidth={true}
                    label="Image link"
                    variant="outlined"
                />
                <TextField
                    value={price}
                    style={{ marginBottom: 10 }}
                    onChange={(e) => {
                        setprice(e.target.value)
                    }}
                    fullWidth={true}
                    label="Price"
                    variant="outlined"
                />
                <div
                    style={{
                        marginTop: 13
                    }}>
                    <FormControlLabel control={
                        <Checkbox
                            checked={coursedetails.published}
                            onChange={(e) => {
                                setPublished(e.target.checked);
                            }}
                        />}
                        label="publish the course" />
                </div>

                <br />
                <div style={{
                    display: "flex",
                    justifyContent: "space-around"
                }}>
                    <Button
                        size='large'
                        onClick={async () => {
                            const res = await axios.put(`http://localhost:3000/admin/course/${courseId}`, {
                                title: title,
                                description: description,
                                price: price,
                                imageLink: imageLink,
                                published: published
                            }, {
                                headers: {
                                    "content-type": "application/json",
                                    "Authorization": "Bearer " + localStorage.getItem("token")
                                }
                            });
                            const data = res.data;

                            let updatedCourse = {
                                title: title,
                                description: description,
                                price: price,
                                imageLink: imageLink,
                                published: published
                            };
                            setCourse({ course: updatedCourse });
                            alert("course updated succesfuly!!", data);
                        }}
                        variant="contained">
                        Update course
                    </Button>
                    <Button
                        variant={"contained"}
                        onClick={() => {
                            // window.location = "/admin/course"
                            navigate("/admin/course");
                        }}
                    >Go back</Button>
                </div>
            </div>
        </Card>
    </div>
}

function CourseCard() {
    const title = useRecoilValue(coursetitle);
    const imageLink = useRecoilValue(courseimage);
    const description = useRecoilValue(coursedescription);
    const price = useRecoilValue(courseprice);

    return <div style={{ display: "flex", marginTop: 50, justifyContent: "center", width: "100%" }}>
        <Card style={{
            margin: 10,
            width: 350,
            minHeight: 200,
            borderRadius: 20,
            marginRight: 50,
            paddingBottom: 15,
            zIndex: 2
        }}>
            <img src={imageLink} style={{ width: 350 }} ></img>
            <div style={{ marginLeft: 10 }}>
                <Typography variant="h5">{title}</Typography>
                <Typography variant="subtitle1">
                    {description}
                </Typography>
                <Typography variant="subtitle2" style={{ color: "gray" }}>
                    Price
                </Typography>
                <Typography variant="subtitle1">
                    <b>Rs {price} </b>
                </Typography>
            </div>
        </Card>
    </div>
}

export default CourseId;