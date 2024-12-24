import React, { useEffect, useState } from 'react';
import axios from '../api/axios.js';

const User = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('/user');
        setData(response.data);
      } catch (err) {
        console.log(err)
        setError(err.response === 401 ? '권한이 없습니다.' : 'API 호출 실패');
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>User Page</h1>
      {error ? (
        <p style={{ color: 'red' }}>Error: {error}</p>
      ) : data ? (
        <pre>{JSON.stringify(data, null, 2)}</pre>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default User;
