import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import axios from 'axios';


function Addcourse() {
    const [title, settitle] = useState("");
    const [description, setdescription] = useState("");
    const [price, setprice] = useState("");
    const [imageLink, setimagelink] = useState("");
    const [published, setPublished] = useState(false);

    return (
        <div>

            <div style={{
                paddingTop: 150,
                marginBottom: 4,
                display: "flex",
                justifyContent: "center"
            }}>
                <Typography variant='h5'>Create a new course</Typography>
            </div>

            <div
                style={{
                    display: "flex",
                    justifyContent: "center"
                }}
            >
                <Card
                    variant='outlined'
                    style={{
                        width: 400,
                        padding: "22px",
                        borderRadius: "7px",
                    }}
                >

                    <TextField
                        fullWidth
                        onChange={(e) => {
                            settitle(e.target.value)
                        }}
                        label="title"
                        variant="outlined" />

                    <br /><br />

                    <TextField
                        fullWidth
                        onChange={(e) => {
                            setdescription(e.target.value)
                        }}
                        label="Description"
                        variant="outlined" />

                    <br /><br />

                    <TextField
                        fullWidth
                        onChange={(e) => {
                            setprice(e.target.value)
                        }}
                        label="Enter the price"
                        variant="outlined" />

                    <br /><br />

                    <TextField
                        fullWidth
                        onChange={(e) => {
                            setimagelink(e.target.value)
                        }}
                        label="Course image link"
                        variant="outlined" />



                    <div
                        style={{
                            marginTop: 13
                        }}>
                        <FormControlLabel control={
                            <Checkbox
                                checked={published}
                                onChange={(e) => {
                                    setPublished(e.target.checked);
                                }}
                            />}
                            label="publish the course" />
                    </div>

                    <br />

                    <Button
                        size='large'
                        onClick={async () => {
                            const res = await axios.post("http://localhost:3000/admin/addcourse", {
                                title: title,
                                description: description,
                                price: price,
                                imageLink: imageLink,
                                published: published
                            },{
                                headers: {
                                    "content-type": "application/json",
                                    "Authorization": "Bearer " + localStorage.getItem("token")
                                }
                            })
                            const data = res.data;
                            console.log(data)
                            alert("course added succesfuly!!")

                        }}
                        variant="contained">
                        Add course
                    </Button>
                    <br /><br />
                    <div
                        style={{ color: published ? 'initial' : 'red' }}>
                        {published ? '*Published' : '*Not Published'}
                    </div>

                </Card>
            </div>

        </div>

    )

}

export default Addcourse;