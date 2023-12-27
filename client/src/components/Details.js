import React, { useEffect, useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import { Button } from '@mui/material';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import DeleteIcon from '@mui/icons-material/Delete';
import { NavLink, useNavigate, useParams } from 'react-router-dom';

const Details = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [getuserdata, setUserdata] = useState([]);

    const getdata = async () => {
        try {
            const res = await fetch(`/getuser/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const data = await res.json();
            console.log(data);

            if (res.status === 422 || !data) {
                console.log('error ');
            } else {
                setUserdata(data);
                console.log('get data');
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const deleteuser = async (id) => {
        try {
            const res2 = await fetch(`/deleteuser/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const deletedata = await res2.json();
            console.log(deletedata);

            if (res2.status === 422 || !deletedata) {
                console.log('error');
            } else {
                console.log('user deleted');
                alert('student deleted');

                setUserdata((prevData) => prevData.filter((user) => user._id !== id));

                // Navigate back to the home page after successful deletion
                navigate('/');
            }
        } catch (error) {
            console.error('Error deleting user:', error);
        }
    };

    useEffect(() => {
        getdata();
    }, []);
    return (
        <div
            className="container mt-3"
            style={{
                backgroundImage: 'url("https://img.freepik.com/free-photo/education-day-arrangement-table-with-copy-space_23-2148721266.jpg")',
                backgroundSize: 'cover',
                backgroundColor: '',
                backgroundPosition: 'center',
                height: '50vh',
                width: '500px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontFamily: 'Your Custom Font, sans-serif', // Replace with your custom font
            }}
        >
            <div className="card shadow" style={{ maxWidth: '400px', backgroundColor: 'transparent' }}>
                <div className="card-body">
                    <h1 className="card-title mb-4 text-center" style={{ fontSize: '2rem', fontWeight: 'bold', color: 'white' }}>Student Details</h1>
                    <div className="mb-3">
                        <h3 style={{ fontSize: '1.2rem', color: 'white' }}>Sname: <span>{getuserdata.sname}</span></h3>
                        <h3 style={{ fontSize: '1.2rem', color: 'white' }}>Course: <span>{getuserdata.course}</span></h3>
                        <h3 style={{ fontSize: '1.2rem', color: 'white' }}>Email: <span>{getuserdata.email}</span></h3>
                        <h3 style={{ fontSize: '1.2rem', color: 'white' }}>CGPA: <span>{getuserdata.CGPA}</span></h3>
                        <h3 style={{ fontSize: '1.2rem', color: 'white' }}>PhoneNo: <span>{getuserdata.phoneNo}</span></h3>
                    </div>
                    <div className="d-flex justify-content-between">
                        <NavLink to={`/edit/${getuserdata._id}`}>
                            <Button className="btn btn-primary" startIcon={<EditIcon />} style={{ backgroundColor: 'transparent', color: 'white', ':hover': { backgroundColor: 'green', color: 'white' } }}>
                                Edit
                            </Button>
                        </NavLink>
                        <Button className="btn btn-danger" startIcon={<DeleteIcon />} onClick={() => deleteuser(getuserdata._id)} style={{ backgroundColor: 'transparent', color: 'white', ':hover': { backgroundColor: 'red', color: 'white' } }}>
                            Delete
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
    
    
};

export default Details;
