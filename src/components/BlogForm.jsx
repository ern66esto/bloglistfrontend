import CreateBlogForm from './CreateBlogForm';
import Togglable from './Togglable';
const BlogForm = (props) =>
{
    const {blogs, handleLogout, addBlog, title, handleTitleChange, author, handleAuthorChange, url, handleUrlChange} = props;
        return (
            <div>
                <div>
                    {
                        blogs.length > 0 &&  
                            <div>{blogs[0].user.name} logged in. <button onClick={() => handleLogout(blogs[0].user) }>logout</button>  </div>
                    }
                </div>
                <br/>
                <div>
                    <Togglable buttonLabel='create new blog'>
                      <CreateBlogForm addBlog={addBlog} title={title} handleTitleChange={handleTitleChange} author={author} handleAuthorChange={handleAuthorChange} url={url} handleUrlChange={handleUrlChange}/>
                    </Togglable>
                </div>
                <ul>
                    {blogs.map(b => 
                        (
                            <li key={b.id}>{b.title}</li>
                        )
                    )}
                </ul>
            </div>
        );
};

export default BlogForm;