import styles from "../../../components/pekerja/profilePekerja.module.css";
import Link from "next/link";
import { useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import NavbarLogin from "@/components/navbarLogin/Navbar";
import Pagination from "react-bootstrap/Pagination";

function PekerjaProfile() {
  const [userData, setUserData] = useState(null);
  const router = useRouter();
  const { id } = router.query;
  const fallbackImage = "/Make Your Day.jpg";
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get(`https://be-peworld.vercel.app/pekerja/profile/${id}`)
      .then((response) => {
        try {
          setUserData(response.data.data[0]);
        } catch (error) {
          console.error("Error accessing user data:", error);
        }
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, []);

  const [pengalamanData, setPengalamanData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  useEffect(() => {
    axios
      .get(`https://be-peworld.vercel.app/pengalaman/${id}`)
      .then((response) => {
        setPengalamanData(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const calculateMonthDifference = (startDate, endDate) => {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const yearDiff = end.getFullYear() - start.getFullYear();
    const monthDiff = end.getMonth() - start.getMonth();

    if (yearDiff >= 1) {
      return `${yearDiff} tahun`;
    } else {
      return `${monthDiff} bulan`;
    }
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentPengalamanData = pengalamanData
    ? pengalamanData.slice(indexOfFirstItem, indexOfLastItem)
    : [];

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const pageNumbers = [];
  if (pengalamanData) {
    for (
      let number = 1;
      number <= Math.ceil(pengalamanData.length / itemsPerPage);
      number++
    ) {
      pageNumbers.push(number);
    }
  }

  useEffect(() => {
    axios
      .get(`https://be-peworld.vercel.app/portofolio/${id}`)
      .then((response) => {
        setData(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  return (
    <>
      <style>
        {`
      .button-link {
        margin-top: 50px;
      }
      .button-link button {
        color: #9b9b9b;
      }
      
      .tab-content {
        padding: 20px;
      }
      
      .nav-pills .nav-link.active {
        background-color: transparent;
        color: black;
        border-bottom: 4px solid #5e50a1;
      }
      `}
      </style>
      <main>
        <NavbarLogin />
        <div className={`${styles.container} container`}>
          <div className={`${styles["foto-sampul"]}`}></div>
          <div className={`${styles["wrap-profile"]}`}>
            <div className={`card ${styles["card-container"]}`}>
              <div className={`${styles["foto-profile"]}`}>
                {userData?.foto_pekerja ? (
                  <img src={userData?.foto_pekerja} alt="Foto Profil" />
                ) : (
                  <img src={fallbackImage} alt="Default Profile" />
                )}
              </div>
              <div className={`${styles["data-diri"]}`}>
                <h2 className={`${styles.nama}`}>{userData?.name}</h2>
                <h6 className={`${styles.posisi}`}>{userData?.job_desk}</h6>
                <p className={`${styles.address}`}>
                  <i className="bi bi-geo-alt">
                    {userData?.provinsi}, {userData?.kota}
                  </i>
                </p>
                <p className={`${styles["status-pekerjaan"]}`}>Freelancer</p>
                <p className={`${styles.deskripsi} col-md-7`}>
                  {userData?.deskripsi_singkat}
                </p>
                <div className={`${styles["wrap-button"]}`}>
                  <Link href={"/hire"}>
                    <button className={`${styles["btn"]} ${styles.buttonHire}`}>
                      Hire
                    </button>
                  </Link>
                </div>
                <h2 className={`${styles.skill}`}>Skill</h2>
                <div className={`${styles["wrap-skill"]} `}>
                  {userData?.nama_skill ? (
                    userData?.nama_skill
                      .split(",")
                      .map((skill) => (
                        <button key={skill}>{skill.trim()}</button>
                      ))
                  ) : (
                    <p></p>
                  )}
                </div>
                <div className={`${styles["sosial-media"]}`}>
                  {userData?.email && (
                    <i className={`${styles.bi} bi bi-envelope`}>
                      <Link href={userData.email}>{userData.email}</Link>
                    </i>
                  )}
                  {userData?.instagram && (
                    <i className={`${styles.bi} bi bi-instagram`}>
                      <Link href={userData.instagram}>
                        {userData.instagram}
                      </Link>
                    </i>
                  )}
                  {userData?.github && (
                    <i className={`${styles.bi} bi bi-github`}>
                      <Link href={userData.github}>{userData.github}</Link>
                    </i>
                  )}
                  {userData?.linkedin && (
                    <i className={`${styles.bi} bi bi-linkedin`}>
                      <Link href={userData.linkedin}>{userData.linkedin}</Link>
                    </i>
                  )}
                </div>
                <div className="button-link">
                  <ul
                    className="nav nav-pills mb-3"
                    id="pills-tab"
                    role="tablist"
                  >
                    <li className="nav-item" role="presentation">
                      <button
                        className={`nav-link active`}
                        id="pills-home-tab"
                        data-toggle="pill"
                        data-target="#pills-home"
                        type="button"
                        role="tab"
                        aria-controls="pills-home"
                        aria-selected="true"
                      >
                        Portofolio
                      </button>
                    </li>
                    <li className="nav-item" role="presentation">
                      <button
                        className={`nav-link`}
                        id="pills-profile-tab"
                        data-toggle="pill"
                        data-target="#pills-profile"
                        type="button"
                        role="tab"
                        aria-controls="pills-profile"
                        aria-selected="false"
                      >
                        Pengalaman kerja
                      </button>
                    </li>
                  </ul>
                </div>
                {/* Isi konten sesuai dengan tab yang aktif */}
                <div className={`tab-content pt-3 ml-0 pr-3`}>
                  <div
                    className={`tab-pane fade show active`}
                    id="pills-home"
                    role="tabpanel"
                    aria-labelledby="pills-home-tab"
                  >
                    <div className={`${styles.cardContainer}`}>
                      {data &&
                        data.map((item) => (
                          <div className={`card ${styles.card}`} key={item.id}>
                            <Link href={item.link_repo}>
                              <img
                                src={item.photo}
                                className={`${styles.photo}`}
                                alt="Gambar 1"
                              />
                            </Link>
                            <h5 className="card-title">{item.nama_aplikasi}</h5>
                          </div>
                        ))}
                    </div>
                  </div>
                  <div
                    className={`tab-pane fade`}
                    id="pills-profile"
                    role="tabpanel"
                    aria-labelledby="pills-profile-tab"
                  >
                    {currentPengalamanData.map((item) => (
                      <div
                        key={item.id}
                        className={`${styles["card-pengalaman"]}`}
                      >
                        <div className={`${styles["card-content-pengalaman"]}`}>
                          <img
                            src="/perusahaan.png"
                            className={`${styles.profile}`}
                            alt="Image"
                          />
                          <div className={`${styles["content-pengalaman"]}`}>
                            <div
                              className={`${styles["card-body-penagalaman"]}`}
                            >
                              <h2
                                className={`${styles["card-title-pengalaman"]}`}
                              >
                                {item.posisi}
                              </h2>
                              <h6 className={`${styles["card-job"]}`}>
                                {item.nama_perusahaan}
                              </h6>
                              <h6 className={`${styles.year}`}>
                                {new Date(item.tahun_masuk).toLocaleString(
                                  "id-ID",
                                  {
                                    month: "long",
                                    year: "numeric",
                                  }
                                )}
                                {" - "}
                                {new Date(item.tahun_keluar).toLocaleString(
                                  "id-ID",
                                  {
                                    month: "long",
                                    year: "numeric",
                                  }
                                )}{" "}
                                {calculateMonthDifference(
                                  item.tahun_masuk,
                                  item.tahun_keluar
                                )}{" "}
                              </h6>
                              <p className={`mr-3 ${styles["card-text"]}`}>
                                {item.deskripsi}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}

                    <div className="d-flex justify-content-center mt-5">
                      <Pagination>
                        {pageNumbers.map((number) => (
                          <Pagination.Item
                            key={number}
                            onClick={() => handlePageChange(number)}
                          >
                            {number}
                          </Pagination.Item>
                        ))}
                      </Pagination>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

export default PekerjaProfile;
