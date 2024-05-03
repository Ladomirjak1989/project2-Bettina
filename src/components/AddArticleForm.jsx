import { useState, useEffect } from 'react';
import './components.css'
const AddArticleForm = ({ initialData, onUpdateArticle, onCancelEdit }) => {
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [date, setDate] = useState('');
  const [article, setArticle] = useState('');
  const [URL, setURL] = useState('');

  // If initialData is provided, populate the form fields
  useEffect(() => {
    if (initialData) {
      setTitle(initialData.title);
      setAuthor(initialData.author);
      setDate(initialData.date);
      setArticle(initialData.article);
      setURL(initialData.image.src);
    }
  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedArticle = {
      title,
      author,
      date,
      article,
      image: {
        src: URL,
        alt: 'Default Image',
      },
    };
    onUpdateArticle(updatedArticle); // Call the update function
  };

  const handleCancel = () => {
    onCancelEdit();
  };

  return (
    <div className="form-container">
      <h1>{initialData ? 'Edit Article' : 'Add Article'}</h1>
      <form onSubmit={handleSubmit}>
        <label>Title:</label>
        <input type="text" className="form-input" value={title} onChange={(e) => setTitle(e.target.value)} required />
        <label>Author:</label>
        <input type="text" className="form-input" value={author} onChange={(e) => setAuthor(e.target.value)} required />
        <label>Date:</label>
        <input type="text" className="form-input" value={date} onChange={(e) => setDate(e.target.value)} required />
        <label>Image URL:</label>
        <input type="text" className="form-input" value={URL} onChange={(e) => setURL(e.target.value)} required />
        <label>Article:</label>
        <textarea className="form-textarea" value={article} onChange={(e) => setArticle(e.target.value)} required></textarea>
        <button type="submit" className="form-btn form-btn-submit">{initialData ? 'Update' : 'Submit'}</button>
        {initialData && <button type="button" className="form-btn form-btn-cancel" onClick={handleCancel}>Cancel</button>}
      </form>
    </div>
  );
};

export default AddArticleForm;
