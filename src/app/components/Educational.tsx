import React from 'react';
import Link from 'next/link';
import styles from './css/Educational.module.css';

const posts = [
  { title: 'Budgeting 101', summary: 'Learn the basics of budgeting and financial planning.', link: '/blog/budgeting-101' },
  { title: 'Saving for Retirement', summary: 'Tips on how to start saving for retirement early.', link: '/blog/saving-for-retirement' },
  { title: 'Investing Basics', summary: 'An introduction to investing and building wealth.', link: '/blog/investing-basics' },
];

const Educational: React.FC = () => {
  return (
    <section className={styles.blog}>
      <h2>Financial Tips & Insights</h2>
      <div className={styles.posts}>
        {posts.map((post, index) => (
          <div key={index} className={styles.post}>
            <h3>{post.title}</h3>
            <p>{post.summary}</p>
            <Link href={post.link}>Read More</Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Educational;
