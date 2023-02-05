import axios from 'axios'
import { useState, useEffect } from 'react';
import { Link, redirect } from 'react-router-dom';
import { toast } from 'react-toastify';
import Topbar from '../../Topbar';

export default function Users() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = () => {
    try {
      axios.get(`http://localhost:3001/api/users`).then((res) => {
        setUsers(res.data);
      });
    } catch (err) {
      console.log(`Getting customer error: \n ${err.message}`);
    }
  };

  const deleteUser = async (userId) => {
    try {
      const confirmDelete = window.confirm('Are you sure?');

      if (confirmDelete) {
        const res = await axios.delete(`http://localhost:3001/api/user/${userId}`);

        getUsers();

        toast.success('user deleted successfully', {
          position: toast.POSITION.TOP_CENTER,
        });
      }
    } catch (err) {
      console.log(`Delete error: \n ${err.message}`);
    }
  };

  return (
    <div className="Users">
      <Topbar />
      <Link to='/add-user/' className='btn btn-primary float-right'>
        New User
      </Link>
      <table className="table table-striped">
        <thead className="thead-dark">
          <tr>
            <th scope="col">ID</th>
            <th scope="col">ID Number</th>
            <th scope="col">Name</th>
            <th scope="col">Surname</th>
            <th scope="col">Address</th>
            <th scope="col">Date of birth</th>
            <th scope="col">Nationality</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>
          {users && users.map((user) => (
            <tr>
              <th scope="row">{user.id}</th>
              <td> {user.id_number}</td>
              <td> {user.name}</td>
              <td> {user.surname}</td>
              <td> {user.address}</td>
              <td> {user.date_of_birth}</td>
              <td> {user.nationality}</td>
              <td>
                <Link to={`/edit-user/${user.id}`}
                  className='btn btn-primary'>
                  Update
                </Link>
                <button className='btn btn-danger' onClick={()=>deleteUser(user.id)} >Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}