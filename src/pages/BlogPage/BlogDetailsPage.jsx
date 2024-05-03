import { useEffect, useState } from 'react';
import '../../pages/BlogPage/BlogsPage.css';
import AddArticleForm from '../../components/AddArticleForm';
import { useNavigate, Navigate } from 'react-router-dom';
import { Link } from 'react-router-dom';



const BlogDetailsPage = ({user}) => {
  const [articles, setArticles] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetch('https://project2-backend.adaptable.app/articles')
      .then(response => response.json())
      .then(data => {
        setArticles(data);
        
      })
      .catch(error => {
        console.error('Error fetching articles:', error);
      });
  }, []);
  if(!user){
    return <Navigate to='/login'/>;
   }

  const handleAddArticle = (newArticle) => {
    fetch('https://project2-backend.adaptable.app/articles', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newArticle),
    })
      .then(response => response.json())
      .then(data => {
        setArticles(prevArticles => [...prevArticles, data]);
        console.log(prevArticles => [...prevArticles, data]);
        setShowForm(false);
      }).then(() => {
        navigate('/blogs');

      })
      .catch(error => {
        console.error('Error adding article:', error);
      });
  };

  const handleCancel = () => {
    setShowForm(false);
  };

  const renderArticleContent = (content, maxLength) => {
    if (content.length <= maxLength) {
      return content;
    }
    return (
      <>
        {content.slice(0, maxLength)}
      </>
    );
  };


  return (
    <div className="blog-details-page">
      <div className='bg-container'>
        <h2 className='title-blog'>
          Discover the secret to optimal health!
        </h2>
        <button className="add-article-btn" onClick={() => setShowForm(true)}>
          Add Article
        </button>
        {showForm && <AddArticleForm onAddArticle={handleAddArticle} onCancel={handleCancel} />}
        {!showForm && (
          <div className="articles-container">
            {articles.map((article, index) => (
              <div key={index} className="article-card">

                <img src={article.image.src} alt={article.image.alt} />
                <h2>{article.title}</h2>
                <p className="author">By {article.author}</p>
                <p className="date">{article.date}</p>
                <p>{renderArticleContent(article.article, 150)}</p>

                <div className="show-more-link">
                  <Link to={`/blogs/${article.id}`} >
                    Show More
                  </Link>

                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BlogDetailsPage;
