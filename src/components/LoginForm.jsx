import PropTypes from 'prop-types'

const LoginForm = ({ handleLogin,handleUsernameChange,handlePasswordChange,username,password }) => {
  return (
    <form onSubmit={handleLogin}>
      <div>
          username
        <input data-testid='username' value={username} onChange={handleUsernameChange}/>
      </div>
      <div>
          password
        <input type='password' data-testid='password' value={password} name='Password' onChange={handlePasswordChange} />
      </div>
      <button type='submit'>login</button>
    </form>
  )
}

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}

export default LoginForm