import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import CreateIcon from '@mui/icons-material/Create';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { NavLink } from 'react-router-dom';
import { fetchDataSuccess, deleteUserData } from '../Actions/homeactions';

// ... (import statements remain the same)

const Home = () => {
  const dispatch = useDispatch();
  const getuserdata = useSelector(state => state.home.userData);

  const getdata = async () => {
    try {
      const res = await fetch("http://localhost:5000/getdata", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();

      if (res.status === 422 || !data) {
        console.log("error ");
      } else {
        dispatch(fetchDataSuccess(data));
        console.log("get data");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const deleteuser = async (id) => {
    try {
      const res2 = await fetch(`http://localhost:5000/deleteuser/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const deletedata = await res2.json();

      if (res2.status === 422 || !deletedata) {
        console.log("error");
      } else {
        console.log("user deleted");
        alert(" student deleted");
        dispatch(deleteUserData(id));
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
        //backgroundImage: 'url("https://c1.wallpaperflare.com/preview/968/730/441/building-cheyenne-photos-high-school.jpg")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
      }}
    >
      <div className="row">
        <div className="col-md-10 mx-auto">
          <div className="mb-4">
            <h1>All Student Details</h1>
            <NavLink to="/register" className="btn btn-primary">
              Add Data
            </NavLink>
          </div>

          {getuserdata ? (
            <table className="table table-bordered table-striped">
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
                        <NavLink to={`view/${element._id}`} className="btn btn-success btn-sm">
                          View
                        </NavLink>
                        <NavLink to={`edit/${element._id}`} className="btn btn-primary btn-sm">
                          Edit
                        </NavLink>
                        <button className="btn btn-danger btn-sm" onClick={() => deleteuser(element._id)}>
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
