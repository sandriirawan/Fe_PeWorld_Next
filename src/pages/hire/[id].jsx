import React, { useEffect, useState } from "react";
import Footer from "@/components/footer/Footer";
import NavbarLogin from "@/components/navbarLogin/Navbar";
import styles from "@/styles/hire.module.css";
import { useRouter } from "next/router";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";

function Hire() {
  const router = useRouter();
  const { id } = router.query;
  const perekrutId = Cookies.get("id");
  const [userData, setUserData] = useState("");
  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_REACT_APP_API_KEY}/pekerja/profile/${id}`)
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

  const [perekrut, setPerekrut] = useState("");
  useEffect(() => {
    axios
      .get(
        `${process.env.NEXT_PUBLIC_REACT_APP_API_KEY}/perekrut/profile/${perekrutId}`
      )
      .then((response) => {
        try {
          setPerekrut(response.data.data[0]);
        } catch (error) {
          console.error("Error accessing user data:", error);
        }
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, []);

  console.log("ini data email", userData?.email);
  console.log("ini data name", userData?.name);
  console.log("ini data nama perusahaan", perekrut?.nama_perusahaan);
  const [data, setData] = useState({
    title: "",
    desciption: "",
    pekerja_id: id,
    perekrut_id: perekrutId,
  });

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmitHire = async (e) => {
    e.preventDefault();
    try {
      const requestData = {
        title: data.title,
        desciption: data.desciption,
        pekerja_id: id,
        perekrut_id: perekrutId,
        pekerja_name: userData?.name,
        pekerja_email: userData?.email,
        perekrut_compname: perekrut?.nama_perusahaan,
      };
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_REACT_APP_API_KEY}/hire`,
        requestData
      );
      toast.success("Hire request submitted successfully!");
      setData({
        title: "",
        desciption: "",
        pekerja_id: id,
        perekrut_id: perekrutId,
        pekerja_name: userData?.name,
        pekerja_email: userData?.email,
        perekrut_compname: perekrut?.nama_perusahaan,
      });
    } catch (err) {
      console.error("Error submitting hire request:", err);
      toast.error("Error submitting hire request. Please try again later.");
    }
  };
  return (
    <>
      <ToastContainer />
      <NavbarLogin />
      <div className="container">
        <div className="row mt-5">
          <div className={`col-md-4 mb-4 card ${styles.customCard}`}>
            <div className="card-body">
              <div className={`profile ${styles.profile}`}>
                {userData?.foto_pekerja ? (
                  <img src={userData?.foto_pekerja} alt="Foto Profil" />
                ) : (
                  <img src="/Make Your Day.jpg" alt="Foto Profil" />
                )}
              </div>
              <div className={`dataDiri ${styles.dataDiri}`}>
                <h2 className="nama">{userData?.name}</h2>
                <h6 className="posisi">{userData?.job_desk}</h6>
                <p className="address">
                  {userData?.linkedin && (
                    <i className="bi bi-geo-alt">
                      {userData.kota}, {userData.provinsi}
                    </i>
                  )}
                </p>
                <p className={`deskripsi ${styles.deskripsi}`}>
                  {userData?.deskripsi_singkat}
                </p>
                <div className={`wrapSkill ${styles.wrapSkill}`}>
                  <h2 className="skill">Skill</h2>
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
              </div>
            </div>
          </div>
          <div className={`col-md-6 mb-4 ${styles.cardHire}`}>
            <div className={` ${styles.cardHire}`}>
              <div className={`title ${styles.title}`}>
                <h1>Hubungi {userData?.name}</h1>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. In
                  euismod ipsum et dui rhoncus auctor.
                </p>
              </div>
              <form className="form-hire m-5">
                <div className="form-group">
                  <label htmlFor="Posisi">Posisi</label>
                  <input
                    type="text"
                    className={`form-control ${styles.formControl}`}
                    id="Posisi"
                    placeholder="Posisi"
                    name="title"
                    value={data.title}
                    onChange={handleChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="deskripsi">Deskripsi</label>
                  <textarea
                    className={`form-control ${styles.formControl}`}
                    id="deskripsi"
                    rows={4}
                    placeholder="Masukkan deskripsi pesan"
                    name="desciption"
                    value={data.desciption}
                    onChange={handleChange}
                  />
                </div>
                <button
                  type="submit"
                  className={`btn ${styles.btnHire}`}
                  onClick={handleSubmitHire}
                >
                  Hire
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Hire;
