import { useState, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthForm from './AuthForm';

interface Props {
  initialValue: string;
}

//TODO: convert to conbuttonText + check fetch request + refactor eventhandlers to ensure security + update footerNavigate + pass setLoggedIn as prop
const Signup = ({ initialValue }: Props) => {
  const [username, setUsername] = useState(initialValue);
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
    console.log(username);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
    console.log(password);
  };

  const handleSubmit = (e: ChangeEvent<HTMLInputElement>) => {
    console.log(' handleSubmit for signup invoked!');
    // e.preventDefault();

    // handle insecured input
    if (username.length < 3) {
      alert('Username length must be at least 3!');
      return;
    }
    if (password.length < 6) {
      alert('Password length must be at least 6!');
      return;
    }

    const body = {
      username,
      password,
    };

    fetch('/user/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'Application/JSON',
      },
      body: JSON.stringify({
        username,
        password,
      }),
    })
      .then((res) => {
        if (res.status === 201) {
          // setLoggedIn(true);
          navigate('/dashboard');
        } else {
          alert('Registration unsuccessful. Please retry.');
        }
      })
      .catch((err) => console.log('Sign up ERROR: ', err));
  };

  return (
    <AuthForm
      text={'Sign Up'}
      footerMessage={'Already have an account? Log in here.'}
      handleSubmit={handleSubmit}
      handleUsernameChange={handleUsernameChange}
      handlePasswordChange={handlePasswordChange}
      footerNavigate={'/login'} // route to be set up
      value={username}
    />
  );
};

export default Signup;
