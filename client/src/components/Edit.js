import React, { useContext, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { updatedata } from './context/ContextProvider';

const Edit = () => {
  const { id } = useParams();
  const { updata, setUPdata } = useContext(updatedata);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    sname: '',
    course: '',
    email: '',
    phoneNo: '',
    CGPA: '',
  });

  const setdata = (e) => {
    const { name, value } = e.target;
    setFormData((preval) => ({
      ...preval,
      [name]: value,
    }));
  };

  const getdata = async () => {
    try {
      const res = await fetch(`https://student2app.azurewebsites.net/getuser/${id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await res.json();
      console.log(data);

      if (res.status === 422 || !data) {
        console.log('error');
      } else {
        setFormData(data);
        console.log('get data');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    getdata();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { sname, course, email, phoneNo, CGPA } = formData;

    const res = await fetch(`/updateuser/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        sname,
        course,
        email,
        phoneNo,
        CGPA,
      }),
    });

    const data = await res.json();
    console.log(data);
    if (res.status === 422 || !data) {
      alert('Fill in the data');
    } else {
      alert('Updated successfully');
      navigate('/');
      setUPdata(data);
    }
  };

  return (
    <div
      className="container mt-5 d-flex justify-content-center align-items-center"
      style={{
        backgroundImage: 'url("https://wallpapers.com/images/hd/hd-school-chalkboard-pusmapkdfdbpwzeb.jpg")', // Add your background image URL here
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
      }}
    >
      <form
        className="p-4 border rounded shadow"
        style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)',
        padding: '20px',
        borderRadius: '8px',
        width: '400px', }} // Adjust background color opacity
        onSubmit={handleSubmit}
      >
        <div className="mb-3">
          <label htmlFor="sname" className="form-label">
            Student Name
          </label>
          <input
            type="text"
            name="sname"
            value={formData.sname}
            onChange={setdata}
            className="form-control"
            id="sname"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="course" className="form-label">
            Course
          </label>
          <input
            type="text"
            name="course"
            value={formData.course}
            onChange={setdata}
            className="form-control"
            id="course"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={setdata}
            className="form-control"
            id="email"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="phoneNo" className="form-label">
            Phone Number
          </label>
          <input
            type="text"
            name="phoneNo"
            value={formData.phoneNo}
            onChange={setdata}
            className="form-control"
            id="phoneNo"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="CGPA" className="form-label">
            CGPA
          </label>
          <input
            type="text"
            name="CGPA"
            value={formData.CGPA}
            onChange={setdata}
            className="form-control"
            id="CGPA"
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Edit;
