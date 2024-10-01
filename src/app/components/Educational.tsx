import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import styles from './css/Educational.module.css';

const Educational: React.FC = () => {
  const [posts, setPosts] = useState([
    { title: 'Budgeting 101', summary: 'Learn the basics of budgeting and financial planning.', link: '/blog/budgeting-101' },
    { title: 'Saving for Retirement', summary: 'Tips on how to start saving for retirement early.', link: '/blog/saving-for-retirement' },
    { title: 'Investing Basics', summary: 'An introduction to investing and building wealth.', link: '/blog/investing-basics' },
    { title: 'Debt Management Strategies', summary: 'How to effectively manage and pay off debt.', link: '/blog/debt-management' },
    { title: 'Understanding Credit Scores', summary: 'Everything you need to know about credit scores.', link: '/blog/credit-scores' },
    { title: 'Tax Planning Tips', summary: 'How to minimize your tax liabilities.', link: '/blog/tax-planning' },
  ]);

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
