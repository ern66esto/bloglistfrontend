import { useState, useEffect } from 'react';
import Blog from './components/Blog';
import blogService from './services/blogs';
import loginService from './services/login';
import Notification from './components/Notification';
import LoginForm from './components/LoginForm';
import BlogForm from './components/BlogForm';
//import Togglable from './components/Togglable';


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');
  const [message, setMessage] = useState('');
  const [loginVisible, setLoginVisible] = useState(false);

  useEffect(() => {
    // blogService.getAll().then(blogs =>
    //   setBlogs( blogs )
    // )  
  }, [])
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
      const fetchData = async () => {
        try {
          const blogs = await blogService.getAll();
          setBlogs(blogs);
          setUsername('');
          setPassword('');
        } catch (error) {
          window.localStorage.removeItem('loggedBlogappUser');
          setBlogs([]);
          setUser(null);
          setUsername('');
          setPassword('');                    
        }
      };
      fetchData();
    }
  }, []);

  // useEffect(() => {
  //   const handleBeforeUnload = (event) => {
  //     localStorage.clear();
  //     event.preventDefault();
  //     event.returnValue = '';
  //   };
  //   window.addEventListener('beforeunload', handleBeforeUnload);
  //   return () => {window.removeEventListener('beforeunload', handleBeforeUnload);};
  // }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({username, password});
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user));
      blogService.setToken(user.token);
      const blogs = await blogService.getAll();
      setBlogs(blogs);
      setUser(user);
      setUsername('');
      setPassword('');
    } catch (error) {
      sendMessage(`Wrong credentials ${error.message}`, "failed");
      console.log('Error log in: ', error);
    }
    
  };

  const handleLogout = (user) => {
    window.localStorage.removeItem('loggedBlogappUser');
    setBlogs([]);
    setUser(null);
    setUsername('');
    setPassword('');
  };

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const addBlog = async (event) => {
    event.preventDefault();
    if (title.trim().length > 0 && author.trim().length > 0 && url.trim().length > 0) {
      const newBlog = {title, author, url};
      try {
        const response = await blogService.create(newBlog);
        sendMessage(`a new blog ${title} ! by ${author} added`, 'success');
        setBlogs(blogs.concat(response));
      } catch (error) {
        sendMessage(error.message, "failed");
        console.log('Error creating a blog: ', error);
      }
      
    }
    setTitle('');
    setAuthor('');
    setUrl('');
  };

  const handleTitleChange = (event) => {
    setTitle(event.target.value);
  };

  const handleAuthorChange = (event) => {
    setAuthor(event.target.value);
  };

  const handleUrlChange = (event) => {
    setUrl(event.target.value);
  }

  const sendMessage = (...parameters) => {
    const [message, styleClass] = parameters;
    const sendMessage = {message: message, styleClassName: styleClass};
    setMessage(sendMessage);
    setTimeout(() => {setMessage({message: '', styleClassName:''})},3000);
  }

  const loginForm = () => {
    const hideWhenVisible = { display: loginVisible ? 'none' : ''};
    const showWhenVisible = { display: loginVisible ? '' : 'none'};

    return (
      <div>
        <div style={hideWhenVisible}>
          <button onClick={() => setLoginVisible(true)} >login</button>
        </div>
        <div style={showWhenVisible} >
          <LoginForm
            username={username}
            password={password}
            handleUsernameChange={({target}) => setUsername(target.value) }
            handlePasswordChange={({target}) => setPassword(target.value)}
            handleLogin={handleLogin}    
          />
          <button onClick={() => setLoginVisible(false)}>cancel</button>
        </div>
      </div>
    );
  };

  const BlogFormProps = {blogs, handleLogout, addBlog, title, handleTitleChange, author, handleAuthorChange, url, handleUrlChange};

  return (
    <div>
      <h2>blogs</h2>
      <Notification messageText={message}/>
      {!user && loginForm()}
      {user && 
          <BlogForm {...BlogFormProps}/> 
      }
    </div>
  )
}

export default App