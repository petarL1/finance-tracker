import React, { useState, useEffect } from 'react';
import ArticleModal from './ArticleModal';
import styles from './css/Educational.module.css'; 
import { Article } from '../../models/Article';
import SkeletonCard from './SkeletonCard';

const Educational: React.FC = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState<{ title: string; content: string | null; references: string[] }>({
    title: '',
    content: null,
    references: [],
  });
  const [posts, setPosts] = useState<Article[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchArticles = async () => {
      try{
      const response = await fetch('/api/articles'); 
      const data = await response.json();
      setPosts(data);
      } finally {
        setIsLoading(false);
      }
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
      {isLoading? Array(5).fill(0).map((_,index)=> <SkeletonCard key={index}/>) :
        posts.map((post, index) => (
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
