import React, { useEffect, useCallback } from 'react';
import styles from './css/ArticleModal.module.css'; 

interface ArticleModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  content: string | null;
  references: string[]; 
}

const ArticleModal: React.FC<ArticleModalProps> = ({ isOpen, onClose, title, content, references }) => {
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen) return null;

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
