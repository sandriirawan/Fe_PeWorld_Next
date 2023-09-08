import styles from "./profilePekerja.module.css";
import Link from "next/link";
import Cookies from "js-cookie";
import CardPengalaman from "../cardPengalaman/CardPengalaman";
import CardPortofolio from "../cardPortofolio/CardPortofolio";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {getDetailPekerja}  from "../../config/Redux/Action/pekerja";

function Pekerja() {
  const userId = Cookies.get("id");
  const fallbackImage = "/Make Your Day.jpg";
  const dispatch = useDispatch();
  const data = useSelector((state) => state.pekerja.pekerjaDetail[0]);

  useEffect(() => {
    dispatch(getDetailPekerja());
  }, [dispatch]);

  const skillsArray = data?.nama_skill
    ? data.nama_skill.split(",")
    : [];

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
        <div className={`${styles.container} container`}>
          <div className={`${styles["foto-sampul"]}`}>
            <Link
              href={`/profile/edit/${userId}`}
              className={`btn  ${styles.edit}`}
            >
              <i className="bi bi-pencil-square"></i> Edit Profile
            </Link>
          </div>
          <div className={`${styles["wrap-profile"]}`}>
            <div className={`card ${styles["card-container"]}`}>
              <div className={`${styles["foto-profile"]}`}>
                {data?.foto_pekerja ? (
                  <img src={data?.foto_pekerja} alt="Foto Profil" />
                ) : (
                  <img src={fallbackImage} alt="Default Profile" />
                )}
              </div>
              <div className={`${styles["data-diri"]}`}>
                <h2 className={`${styles.nama}`}>{data?.name}</h2>
                <h6 className={`${styles.posisi}`}>{data?.job_desk}</h6>
                <p className={`${styles.address}`}>
                  {data?.provinsi && data?.kota && (
                    <i className="bi bi-geo-alt">
                      {data.provinsi}, {data.kota}
                    </i>
                  )}
                </p>
                <p className={`${styles["status-pekerjaan"]}`}>
                  {data?.tempat_kerja}
                </p>
                <p className={`${styles.deskripsi} col-md-7`}>
                  {data?.deskripsi_singkat}
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
                  {skillsArray.length > 0
                    ? skillsArray.map((skill, index) => (
                        <button key={index}>{skill.trim()}</button>
                      ))
                    : 'Belum ada skill yang dapat ditampilkan'}
                </div>
                <div className={`${styles["sosial-media"]}`}>
                  {data?.email && (
                    <i className={`${styles.bi} bi bi-envelope`}>
                      <a href={`mailto:${data.email}`} target="_blank">{data.email}</a>
                    </i>
                  )}
                  {data?.instagram && (
                    <i className={`${styles.bi} bi bi-instagram`}>
                      <Link href={data.instagram} target="_blank">
                        {data.instagram}
                      </Link>
                    </i>
                  )}
                  {data?.github && (
                    <i className={`${styles.bi} bi bi-github`}>
                      <Link href={data.github} target="_blank">{data.github}</Link>
                    </i>
                  )}
                  {data?.linkedin && (
                    <i className={`${styles.bi} bi bi-linkedin`}>
                      <Link href={data.linkedin} target="_blank">{data.linkedin}</Link>
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
                <div className={`tab-content pt-3 ml-0 pr-3 pl-0`}>
                  <div
                    className={`tab-pane fade show active`}
                    id="pills-home"
                    role="tabpanel"
                    aria-labelledby="pills-home-tab"
                  >
                    <CardPortofolio />
                  </div>
                  <div
                    className={`tab-pane fade`}
                    id="pills-profile"
                    role="tabpanel"
                    aria-labelledby="pills-profile-tab"
                  >
                    <CardPengalaman />
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

export default Pekerja;
