import React, { useState, useEffect } from 'react';
import ArticleModal from './ArticleModal';
import styles from './css/Educational.module.css'; 
import { Article } from '../../models/Article';

const Educational: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<{ title: string; content: string | null; references: string[] }>({
    title: '',
    content: null,
    references: [],
  });
  const [posts, setPosts] = useState<Article[]>([]);
  useEffect(() => {
    const fetchArticles = async () => {
      const response = await fetch('/api/articles'); 
      const data = await response.json();
      setPosts(data);
    };

    fetchArticles();
  }, []);

  const openModal = (slug: string, title: string) => {
    const post = posts.find(p => p.slug === slug);
    if (post) {
      setSelectedPost({ title, content: post.content, references: post.references });
      setModalOpen(true);
    }
  };
  const closeModal = () => {
    setModalOpen(false);
    setSelectedPost({ title: '', content: null, references: [] });
  };

  return (
    <section className={styles.blog}>
      <h2>Financial Tips & Insights</h2>
      <div className={styles.posts}>
        {posts.map((post, index) => (
          <div key={index} className={styles.post}>
            <h3>{post.title}</h3>
            <button onClick={() => openModal(post.slug, post.title)}>Read More</button>
          </div>
        ))}
      </div>
      <ArticleModal
        isOpen={modalOpen}
        onClose={closeModal}
        title={selectedPost.title}
        content={selectedPost.content}
        references={selectedPost.references} 
      />
    </section>
  );
};
export default Educational;
