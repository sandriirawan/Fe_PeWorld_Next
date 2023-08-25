import styles from "../../../components/perekrut/perekrut.module.css";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import NavbarLogin from "@/components/navbarLogin/Navbar";

function ProfilePerekrut({ userData }) {
  const fallbackImage = "/Make Your Day.jpg";

  return (
    <>
      <NavbarLogin />
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
                <i className="bi bi-geo-alt">
                  {userData?.provinsi}, {userData?.kota}
                </i>
              </p>
              <p className={styles.deskripsi}>{userData?.info_perusahaan}</p>
              <div className={styles.wrapButton}></div>
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

export default ProfilePerekrut;

export async function getServerSideProps(context) {
  const { id } = context.query;

  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_REACT_APP_API_KEY}/perekrut/profile/${id}`);
    const userData = response.data.data[0];
    return {
      props: {
        userData,
      },
    };
  } catch (error) {
    console.error("Error fetching user data:", error);
    return {
      props: {
        userData: null,
      },
    };
  }
}
