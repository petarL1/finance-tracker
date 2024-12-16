import React, { useState, useEffect } from 'react';  
import styles from './css/ProfileDropdown.module.css';  
import { useAuth } from '../../../../context/AuthContext';  
import { useRouter } from 'next/navigation';  
import { jwtDecode } from 'jwt-decode';  
import Image from 'next/image';  

interface UserSession {  
  userId: string;  
  email: string;  
}  

const ProfileDropdown: React.FC = () => {  
  const { logout } = useAuth();  
  const router = useRouter();  
  const [isDropdownOpen, setDropdownOpen] = useState(false);  
  const [user, setUser] = useState<UserSession | null>(null);  

  useEffect(() => {  
    const token = localStorage.getItem('token');  
    if (token) {  
      try {  
        const decodedToken = jwtDecode<UserSession>(token);  
        setUser(decodedToken);  
      } catch (error) {  
        console.error('Token decoding failed:', error);  
        setUser(null);  
      }  
    } else {  
      setUser(null);  
    }  
  }, []);  

  const toggleDropdown = () => {  
    setDropdownOpen(!isDropdownOpen);  
  };  

  const handleLogout = () => {  
    logout();  
    setUser(null);  
    router.push('/pages/login');  
  };  

  return (  
    <div className={styles.mainContainer}>  
      <button className={styles.buttonContainer} onClick={toggleDropdown}>  
        <Image  
          src="/avatar-transparent.png"  
          alt="User Avatar"  
          width={60}  
          height={60}  
          className={styles.avatar}  
        />  
      </button>  

      {isDropdownOpen && (  
        <div className={styles.dropdownMenu}>  
          <button className={styles.dropdownItem}>ENG/MKD - work in progress</button>
          <button className={styles.dropdownItem}>Dark Mode - work in progress</button>
          <button onClick={handleLogout} className={styles.dropdownItem}>Logout</button>  
        </div>  
      )}  
    </div>  
  );  
};  

export default ProfileDropdown;  
