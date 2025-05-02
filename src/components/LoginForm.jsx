const LoginForm = ({handleLogin,handleUsernameChange,handlePasswordChange,username,password}) => {
    return (
        <form onSubmit={handleLogin}>
        <div>
          username
            <input value={username} onChange={handleUsernameChange}/>
        </div>
        <div>
          password
            <input type='text' value={password} name='Password' onChange={handlePasswordChange} />
        </div>
        <button type='submit'>login</button>
      </form>
    );
};

export default LoginForm;