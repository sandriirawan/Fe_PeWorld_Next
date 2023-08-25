import EditPekerja from '@/components/editPekerja/EditPekerja'
import EditPerekrut from '@/components/editPerekrut/EditPerekrut'
import Footer from '@/components/footer/Footer'
import NavbarLogin from '@/components/navbarLogin/Navbar'
import React from 'react'
import { useRouter } from 'next/router';
import Cookies from 'js-cookie';

function Edit() {
  const [userRole, setUserRole] = React.useState('');
  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      const role = Cookies.get('role') 
      setUserRole(role);
    }
  }, []);

  const router = useRouter();
  const { id } = router.query;

  const userId = Cookies.get('id') || null;
  return (
    <>
      <NavbarLogin />
      {userRole === 'pekerja' ? (
        <EditPekerja  userId={userId || id} />
      ) : (
        <EditPerekrut />
      )}
      <Footer />
    </>
  )
}

export default Edit
