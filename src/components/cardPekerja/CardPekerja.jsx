import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "@/styles/Home.module.css";
import { useRouter } from "next/router";
import Pagination from "react-bootstrap/Pagination";

function CardPekerja() {
  const [data, setData] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const itemsPerPage = 5;
  const router = useRouter();

  useEffect(() => {
    axios
      .get(`https://be-peworld.vercel.app/pekerja`)
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
    router.push(`/profile/pekerja/${id}`);
  };

  const startIndex = (activePage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData = data.slice(startIndex, endIndex);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  let paginationItems = [];
  for (let number = 1; number <= totalPages; number++) {
    paginationItems.push(
      <Pagination.Item key={number} onClick={() => setActivePage(number)}>
        {number}
      </Pagination.Item>
    );
  }

  return (
    <>
      {currentData.map((item) => (
        <div key={item.id}>
          <div className={`card ${styles.card}`}>
            <div className={`card-content cardContent ${styles.cardContent}`}>
              <img
                src={getProfileImage(item)}
                className={`profile ${styles.profile}`}
                alt="Profile"
              />
              <div className={`content ${styles.content}`}>
                <div className={`card-body ${styles.cardBody}`}>
                  <h2 className={`card-title title ${styles.title}`}>
                    {item.name}
                  </h2>
                  <h6 className={`card-job job ${styles.job}`}>
                    {item.job_desk}
                  </h6>
                  <i className={`bi bi-geo-alt ${styles.geoAlt}`}>
                    {item.location}
                  </i>
           
                </div>
                <button
                  className={`btn btnProfile ${styles.btnProfile}`}
                  onClick={() => handleProfileClick(item.users_id)}
                >
                  Lihat profile
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
      <div className="d-flex justify-content-center m-5 ">
        <Pagination>{paginationItems}</Pagination>
      </div>
    </>
  );
}

export default CardPekerja;
