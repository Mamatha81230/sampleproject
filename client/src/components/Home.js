import React, { useState, useEffect, useContext } from 'react';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import CreateIcon from '@mui/icons-material/Create';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { NavLink } from 'react-router-dom';
import { adddata, deldata } from './context/ContextProvider';
import { updatedata } from './context/ContextProvider';

const Home = () => {
    const [getuserdata, setUserdata] = useState([]);
    const { udata, setUdata } = useContext(adddata);
    const { updata, setUPdata } = useContext(updatedata);
    const { dltdata, setDLTdata } = useContext(deldata);

    const getdata = async () => {
        try {
            const res = await fetch("https://student2app.azurewebsites.net/getdata", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });

            const data = await res.json();
            console.log(data);

            if (res.status === 422 || !data) {
                console.log("error ");
            } else {
                setUserdata(data);
                console.log("get data");
            }
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        getdata();
    }, []);

    const deleteuser = async (id) => {
        try {
            const res2 = await fetch(`https://student2app.azurewebsites.net/deleteuser/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                }
            });

            const deletedata = await res2.json();
            console.log(deletedata);

            if (res2.status === 422 || !deletedata) {
                console.log("error");
            } else {
                console.log("user deleted");
                alert(" student deleted")
                setDLTdata(deletedata);
                setUserdata(prevData => prevData.filter(user => user._id !== id));
            }
        } catch (error) {
            console.error("Error deleting user:", error);
        }
    };
    
    useEffect(() => {
        getdata();
    }, []);

    return (
        <div
            className="container mt-5"
            style={{
                backgroundImage: 'url("https://c1.wallpaperflare.com/preview/968/730/441/building-cheyenne-photos-high-school.jpg")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                minHeight: '100vh',
            }}
        >
            <div className="row">
                <div className="col-md-8 mx-auto">
                    <div className="mb-4">
                        <h1>All Student Details</h1>
                        <NavLink to="/register" className="btn btn-primary">
                            Add Data
                        </NavLink>
                    </div>

                    <table className="table table-striped">
                        <thead className="table-dark">
                            <tr>
                                <th>ID</th>
                                <th>Student Name</th>
                                <th>Course</th>
                                <th>Email</th>
                                <th>Phone Number</th>
                                <th>CGPA</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {getuserdata.map((element, id) => (
                                <tr key={id}>
                                    <td>{id + 1}</td>
                                    <td>{element.sname}</td>
                                    <td>{element.course}</td>
                                    <td>{element.email}</td>
                                    <td>{element.phoneNo}</td>
                                    <td>{element.CGPA}</td>
                                    <td>
                                        <div className="d-flex justify-content-between">
                                            <NavLink to={`view/${element._id}`} className="btn btn-success">
                                                <RemoveRedEyeIcon />
                                            </NavLink>
                                            <NavLink to={`edit/${element._id}`} className="btn btn-primary">
                                                <CreateIcon />
                                            </NavLink>
                                            <button className="btn btn-danger" onClick={() => deleteuser(element._id)}>
                                                <DeleteOutlineIcon />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Home;
