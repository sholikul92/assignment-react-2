import { useEffect, useState } from 'react';
import Form from './components/Form';
import Table from './components/Table';

const App = () => {
  const [students, setStudents] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const url = 'http://localhost:3001/student';

  const getStudent = () => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setStudents(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  };

  useEffect(() => {
    getStudent();
    setLoading(true);
  }, []);

  const deleteStudent = (id) => {
    fetch(`${url}/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(() => {
      getStudent();
    });
  };

  const addStudent = (payload) => {
    if (!payload) {
      console.log('payload tidak boleh kosong');
    } else {
      fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
      }).then(() => {
        getStudent();
      });
    }
  };

  if (error) return 'Error!';

  return (
    <>
      <Form addStudent={addStudent} />
      {loading ? <p>Loading ...</p> : <Table students={students} deleteStudent={deleteStudent} />}
    </>
  );
};

export default App;
