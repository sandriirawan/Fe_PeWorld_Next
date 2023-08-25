import React, { useEffect, useState } from "react";
import styles from "./perekrut.module.css";
import Link from "next/link";
import axios from "axios";
import Cookies from "js-cookie";

function Perekrut() {
  const [userData, setUserData] = useState(null);
  const userId = Cookies.get('id')
  const fallbackImage = "/Make Your Day.jpg";

  useEffect(() => {
    if (userId) {
    axios
    .get(`${process.env.NEXT_PUBLIC_REACT_APP_API_KEY}/perekrut/profile/${userId}`)
    .then((response) => {
      try {
        console.log(response.data)
        setUserData(response.data.data[0]);
      } catch (error) {
        console.error("Error accessing user data:", error);
      }
    })
    .catch((error) => {
      console.error("Error fetching user data:", error);
    });
  }
  }, []);

  return (
    <>
      <div className="container">
        <div className={styles.sampul} />
        <div className={styles.wrapProfile}>
          <div className={`card ${styles.card}`}>
            <div className={styles.profile}>
              {userData?.foto_perusahaan ? (
                <img src={userData?.foto_perusahaan} alt="Foto Profil" />
              ) : (
                <img src={fallbackImage} alt="Default Profile" />
              )}
            </div>
            <div className={styles.dataDiri}>
              <h2 className={styles["nama-perusahaan"]}>
                {userData?.nama_perusahaan}
              </h2>
              <h6 className={styles.posisi}>{userData?.jabatan}</h6>
              <h6 className={styles.bidang}>{userData?.bidang_perusahaan}</h6>
              <p className={styles.address}>
              {userData?.provinsi && (
                <i className="bi bi-geo-alt">
                  {userData?.provinsi}, {userData?.kota}
                </i>
                  )}
              </p>
           
              <p className={styles.deskripsi}>{userData?.info_perusahaan}</p>

              <div className={styles.wrapButton}>
                {userId && (
                  <Link
                    href={`/profile/edit/${userId}`}
                    className={`btn ${styles.edit}`}
                  >
                    <button className={`${styles.btn} ${styles.buttonHire}`}>
                      Edit profile
                    </button>
                  </Link>
                )}
              </div>
              <div className={styles.sosialMedia}>
              {userData?.email_perusahaan && (
                <i className={`bi bi-envelope ${styles.bi}`}>
                  <Link href="">{userData?.email_perusahaan}</Link>
                </i>
                  )}
                {userData?.phone_perusahaan && (
                <i className={`bi bi-telephone ${styles.bi}`}>
                  <Link href="">{userData?.phone_perusahaan}</Link>
                </i>
                  )}
                {userData?.linkedin && (
                    <i className={`${styles.bi} bi bi-linkedin`}>
                      <Link href={userData.linkedin}>{userData.linkedin}</Link>
                    </i>
                  )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Perekrut;