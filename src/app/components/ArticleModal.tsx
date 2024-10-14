import React, { useEffect } from 'react';
import styles from './css/ArticleModal.module.css'; // Adjust path as necessary

interface ArticleModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: string | null;
  references: string[]; // Add references prop
}

const ArticleModal: React.FC<ArticleModalProps> = ({ isOpen, onClose, title, content, references }) => {
  if (!isOpen) return null;

  const handleOverlayClick = (e: { target: any; currentTarget: any }) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className={styles.modalOverlay} onClick={handleOverlayClick}>
      <div className={styles.modalContent}>
        <h2>{title}</h2>
        {content && <div dangerouslySetInnerHTML={{ __html: content }} />}
        {references.length > 0 && (
          <div className={styles.references}>
            <h3>References</h3>
            <ul>
              {references.map((reference, index) => (
              <li key={index} dangerouslySetInnerHTML={{ __html: reference }} /> 
              ))}
            </ul>
          </div>
        )}

        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default ArticleModal;
