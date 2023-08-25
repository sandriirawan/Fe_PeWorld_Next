import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "@/styles/Home.module.css";
import Link from "next/link";
import { useRouter } from "next/router";

function CardPerekrut() {
    const [data, setData] = useState([]);
    const router = useRouter();
    

    useEffect(() => {
      axios
        .get(`https://be-peworld.vercel.app/perekrut`)
        .then((response) => {
          setData(response.data.data); 
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }, []);
  
    const defaultProfileImagePath = "/Make Your Day.jpg";
    const getProfileImage = (item) => {
      return item.foto_pekerja ? item.foto_pekerja : defaultProfileImagePath;
    };

    const handleProfileClick = (id) => {
        router.push(`/profile/perusahaan/${id}`);
      };
  return (
    <>
    {data.map((item) => (
            <div key={item.id}>
                <div className={`card ${styles.card}`}>
                  <div
                    className={`card-content cardContent ${styles.cardContent}`}
                  >
                    <img
                    src={getProfileImage(item)}
                    className={`profile ${styles.profile}`}
                    alt="Profile"
                  />
                    <div className={`content ${styles.content}`}>
                      <div className={`card-body ${styles.cardBody}`}>
                        <h2 className={`card-title title ${styles.title}`}>
                          {item.nama_perusahaan}
                        </h2>
                        <h6 className={`card-job job ${styles.job}`}>
                          {item.bidang_perusahaan}
                        </h6>
                        <i className={`bi bi-geo-alt ${styles.geoAlt}`}>
                        {item.kota}, {item.provinsi}
                        </i>
                        <p className="card-text text">
                          {/* <button>{item.skill}</button> */}
                        </p>
                      </div>
                      <Link href={`/profile/${item.id}`}>
                    <button 
                      className={`btn btnProfile ${styles.btnProfile}`}
                      onClick={() => handleProfileClick(item.users_id)}
                    >
                      Lihat profile
                    </button>
                    </Link>
                    </div>
                  </div>
                </div>
              </div>
              ))}
      </>
  )
}

export default CardPerekrut