import { useState, useEffect } from 'react';

const Form = (props) => {
  const [fullname, setFullname] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [gender, setGender] = useState('');
  const [programStudy, setProgramStudy] = useState('');
  const [faculty, setFaculty] = useState('');
  // const [payload, setPayload] = useState({});

  const { addStudent } = props;

  const chooseFaculty = (prody) => {
    switch (prody) {
      case 'Ekonomi':
      case 'Manajemen':
      case 'Akuntansi':
        setFaculty('Fakultas Ekonomi');
        break;
      case 'Administrasi Publik':
      case 'Administrasi Bisnis':
      case 'Hubungan Internasional':
        setFaculty('fakultas Ilmu Sosial dan Politik');
        break;
      case 'Teknik Sipil':
      case 'Arsitektur':
        setFaculty('Fakultas Teknik');
        break;
      case 'Matematika':
      case 'Fisika':
      case 'Informatika':
        setFaculty('Fakultas Teknologi Informasi dan Sains');
        break;
      default:
        setFaculty('');
    }
  };

  useEffect(() => {
    chooseFaculty(programStudy);
  }, [programStudy]);

  const handleForm = async (e) => {
    console.log(fullname);

    e.preventDefault();

    chooseFaculty(programStudy);
    if (fullname.trim() && birthDate.trim() && gender.trim() && programStudy.trim() && faculty.trim()) {
      const newPayload = {
        fullname,
        birthDate,
        gender,
        faculty,
        programStudy,
      };
      console.log(newPayload);
      await addStudent(newPayload);
    } else {
      console.log('payload kosong');
    }
  };

  return (
    <form onSubmit={handleForm}>
      <label htmlFor='input-name'>Fullname</label>
      <input type='text' value={fullname} data-testid='name' id='input-name' onChange={(e) => setFullname(e.target.value)} />
      <label htmlFor='input-birthDate'>Birth Date</label>
      <input type='date' data-testid='date' id='input-birthDate' value={birthDate} onChange={(e) => setBirthDate(e.target.value)} />
      <label htmlFor='input-gender'>Gender</label>
      <input type='text' data-testid='gender' id='input-prody' value={gender} onChange={(e) => setGender(e.target.value)} />
      <label htmlFor='input-prody'>Program Study</label>
      <input type='text' data-testid='prody' id='input-prody' value={programStudy} onChange={(e) => setProgramStudy(e.target.value)} />
      <input type='submit' value='Add Student' data-testid='submit' />
    </form>
  );
};

export default Form;
