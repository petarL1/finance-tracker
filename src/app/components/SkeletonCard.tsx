import React from 'react';
import ContentLoader from 'react-content-loader';

const SkeletonCard : React.FC = () => (
  <ContentLoader
    speed={2}
    width={290}
    height={140}
    viewBox="0 0 300 140"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
  >
    <rect x="10" y="10" rx="5" ry="5" width="220" height="20" />
    <rect x="10" y="40" rx="5" ry="5" width="250" height="15" />
    <rect x="10" y="65" rx="5" ry="5" width="250" height="15" />
  </ContentLoader>
);

export default SkeletonCard;
