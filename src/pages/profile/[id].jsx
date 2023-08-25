import Footer from '@/components/footer/Footer'
import NavbarLogin from '@/components/navbarLogin/Navbar'
import Pekerja from '@/components/pekerja/pekerja'
import Perekrut from '@/components/perekrut/Perekrut'
import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';

function Profile() {
  const [userRole, setUserRole] = useState('');
  
  useEffect(() => {
    const role = Cookies.get('role') || 'defaultRole'; 
    setUserRole(role);
  }, []);

  return (
    <>
       {userRole && ( 
        <>
          <NavbarLogin />
          {userRole === 'pekerja' ? (
            <Pekerja />
          ) : userRole === 'perekrut' ? (
            <Perekrut />
          ) : (
            null
          )}
          <Footer />
        </>
      )}
    </>
  )
}

export default Profile;
