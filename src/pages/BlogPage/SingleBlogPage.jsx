import { useEffect, useState } from 'react';
import { useParams, useNavigate, } from 'react-router-dom';
import '../../pages/BlogPage/BlogsPage.css';
import AddArticleForm from '../../components/AddArticleForm'; // Import the form component
import { IoIosCheckmarkCircle } from "react-icons/io";

const SingleBlogPage = () => {
  const [isPopUpOpen, setPopUpOpen] = useState(false)
  const { blogId } = useParams();
  const [message, setMessage] = useState(null)
  const [blogPost, setBlogPost] = useState(null);
  const [isEditing, setIsEditing] = useState(false); // State to track editing mode
  const navigate = useNavigate()

  useEffect(() => {
    fetch(`https://project2-backend.adaptable.app/articles/${blogId}`)
      .then(response => response.json())
      .then(data => {
        setBlogPost(data);
      })
      .catch(error => {
        console.error('Error fetching blog post:', error);
      });
  }, [blogId]);

  useEffect(() => {
    if (isPopUpOpen) {
      setTimeout(() => {
        setPopUpOpen(false)
        navigate(`/blogs`)
      }, 7000)
    }
  }, [isPopUpOpen])

  const handleUpdateArticle = (updatedArticle) => {
    // Logic to update the article on the server
    // After successful update, set the updated blog post data and exit editing mode
    fetch(`https://project2-backend.adaptable.app/articles/${blogId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedArticle),
    })
      .then(response => response.json())
      .then(data => {
        setBlogPost(data);
        setIsEditing(false);
      })
      .catch(error => {
        console.error('Error updating blog post:', error);
      });
    setIsEditing(false); // Temporarily setting editing mode to false
  };

  const handleCancelEdit = () => {
    setIsEditing(false); // Cancel editing mode
  };

  const handleDelete = (e) => {
    e.preventDefault()
    fetch(`https://project2-backend.adaptable.app/articles/${blogId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },

    })
      .then(response => response.json())
      .then(data => {
        setMessage({ message: 'succesful delete' })
        setPopUpOpen(true)
      })
      .catch(error => {
        console.error('Error updating blog post:', error);
      });
  }
  if (!blogPost) {
    return <div>Loading...</div>;
  }

  return (
    <div className="single-blog-page">
      <div>
        <button className="back-button" onClick={() => { navigate(`/blogs`) }}>Go back</button>
      </div>
      <div className='single-container'>

        {isEditing ? (
          <AddArticleForm
            initialData={blogPost} // Pass the initial data to the form component
            onUpdateArticle={handleUpdateArticle} // Pass the update function to the form component
            onCancelEdit={handleCancelEdit} // Pass the cancel edit function to the form component
          />
        ) : (
          <>
            <div className='blog-container'>
              <img src={blogPost.image.src} alt={blogPost.image.alt} className="blog-image" />
              <div>
                <h2 className="blog-title">{blogPost.title}</h2>
                <p className="blog-meta">By {blogPost.author}</p>
                <p className="blog-meta">{blogPost.date}</p>
                <p className="blog-content">{blogPost.article}</p>
                <div className='single-blog-delete'>
                  <button className="update-button" onClick={() => setIsEditing(true)}>Edit</button>
                  <button className='btn-delete' onClick={handleDelete}>Delete</button>
                  <div>
                  {isPopUpOpen && <div className='delete-message'>
                    <IoIosCheckmarkCircle />{message.message}</div>}
                    </div>
                </div>
              </div>
            </div>

          </>

        )}

      </div>
    </div>
  );
};

export default SingleBlogPage;
