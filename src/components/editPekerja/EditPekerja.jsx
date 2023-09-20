// EditPekerja.js
import React, { useEffect, useState } from "react";
import styles from "./editpekerja.module.css";
import axios from "axios";
import Cookies from "js-cookie";
import FormPengalaman from "../formPengalaman/FormPengalaman";
import FormPortofolio from "../formPortofolio/FormPortofolio";
import { useRouter } from "next/router";
import swal from "sweetalert";
import Formskill from "../formSkill/Formskill";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function EditPekerja() {
  const [data, setData] = useState("");
  const [getPhoto, setPhoto] = useState();
  const [previewImage, setPreviewImage] = useState();
  const userId = Cookies.get("id");
  const router = useRouter();

  const handleBatal = () => {
    router.push(`/profile/${userId}`);
  };

  useEffect(() => {
    const getdata = async () => {
      if (userId) {
        await axios
          .get(
            `http://localhost:8000/pekerja/profile/${userId}`
          )
          .then((response) => {
            setData(response.data.data[0]);
            setPhoto(response.data.data[0].foto_pekerja);
            console.log(response.data)
          })
          .catch((error) => {
            console.error("Error fetching user data:", error);
          });
      }
    };
    getdata();
  }, []);

  const handleUpload = (event) => {
    const { type } = event.target;
    if (type === "file") {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result);
      };
      reader.readAsDataURL(file);
      setPhoto(event.target.files[0]);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("job_desk", data.job_desk);
    formData.append("provinsi", data.provinsi);
    formData.append("kota", data.kota);
    formData.append("tempat_kerja", data.tempat_kerja);
    formData.append("deskripsi_singkat", data.deskripsi_singkat);
    formData.append("email", data.email);
    formData.append("instagram", data.instagram);
    formData.append("github", data.github);
    formData.append("linkedin", data.linkedin);
    formData.append("foto_pekerja", getPhoto);
    toast.dismiss();
    await axios
      .put(
        `${process.env.NEXT_PUBLIC_REACT_APP_API_KEY}/${userId}`,
        formData
      )
      .then((response) => {
        toast.success("Data berhasil disimpan!");
        setTimeout(() => {
          router.push(`/profile/${userId}`);
        }, 3000);
      })
      .catch((error) => {
        const errorMessage =
          error.response?.data?.message || "Unknown error occurred";
        console.log(errorMessage);
        toast.error(`Data gagal disimpan: ${errorMessage}`);
      });
  };
  return (
    <>
      <ToastContainer />
      <div className={`${styles.sampul}`} />
      <div className="container">
        <div className="row">
          <div className="profile col-md-4">
            <div className={`card ${styles.wrap} `}>
              {data && (
                <>
                  <div className={`${styles.fotoProfile}`}>
                    {previewImage ? (
                      <img src={previewImage} alt="Preview" />
                    ) : data.foto_pekerja ? (
                      <img src={getPhoto} alt="image" />
                    ) : (
                      <img src="/Make Your Day.jpg" alt="Default Profile" />
                    )}
                  </div>
                  <div className={`${styles.edit}`}>
                    <label htmlFor="imageUpload">
                      <i className="bi bi-pencil-fill" />
                      Edit
                    </label>
                    <input
                      type="file"
                      id="imageUpload"
                      accept="image/*"
                      style={{ display: "none" }}
                      name="foto_pekerja"
                      onChange={handleUpload}
                    />
                  </div>
                </>
              )}
              {data && (
                <div className={`${styles.dataDiri}`}>
                  <h2 className="nama">{data.name}</h2>
                  <h6 className={`${styles.posisi}`}>{data.job_title}</h6>
                  <p className={`${styles.address}`}>
                    {data?.linkedin && (
                      <i className="bi bi-geo-alt">
                        {data.kota}, {data.provinsi}
                      </i>
                    )}
                  </p>
                  <p className={`${styles.pekerjaan}`}>{data.job_desk}</p>
                </div>
              )}
            </div>
            <div className={`${styles.buttonContainer}`}>
              <button
                className={`btn ${styles.buttonSimpan}`}
                onClick={handleSubmit}
              >
                Simpan
              </button>
              <button
                onClick={handleBatal}
                className={`btn ${styles.buttonBatal}`}
              >
                Batal
              </button>
            </div>
          </div>
          <div className="col-md-4">
            <div className="input-data">
              <div className={`card ${styles.cardData}`}>
                <div className={` ${styles.titleData}`}>
                  <h3>Data diri</h3>
                  <div className={` ${styles.garis}`}></div>
                </div>
                {data && (
                  <form className="form-data mt-4">
                    {/* Input Nama Lengkap */}
                    <div className="form-group ml-4 mr-4 ">
                      <label className="text-secondary" htmlFor="namaLengkap">
                        Nama Lengkap
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="namaLengkap"
                        name="name"
                        placeholder="Masukkan Nama Lengkap"
                        required=""
                        value={data.name}
                        onChange={handleChange}
                      />
                    </div>
                    {/* Input Job Desk */}
                    <div className="form-group ml-4 mr-4">
                      <label className="text-secondary" htmlFor="jobDesk">
                        Job Desk
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="jobDesk"
                        name="job_desk"
                        placeholder="Masukkan Job Desk"
                        required=""
                        value={data.job_desk}
                        onChange={handleChange}
                      />
                    </div>
                    {/* Input Domisili */}
                    <div className="form-group ml-4 mr-4">
                      <label className="text-secondary" htmlFor="domisili">
                        Provinsi
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="domisili"
                        name="provinsi"
                        placeholder="Masukkan Provinsi"
                        required=""
                        value={data.provinsi}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="form-group ml-4 mr-4">
                      <label className="text-secondary" htmlFor="Kota">
                        Kota
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="Kota"
                        name="kota"
                        placeholder="Masukkan Kota"
                        required=""
                        value={data.kota}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="form-group ml-4 mr-4">
                      <label className="text-secondary" htmlFor="tempatKerja">
                        Tempat Kerja
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="tempatKerja"
                        name="tempat_kerja"
                        placeholder="Masukkan Tempat Kerja"
                        required=""
                        value={data.tempat_kerja}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="form-group ml-4 mr-4">
                      <label
                        className="text-secondary"
                        htmlFor="deskripsiSingkat"
                      >
                        Deskripsi Singkat
                      </label>
                      <textarea
                        className="form-control"
                        id="deskripsiSingkat"
                        name="deskripsi_singkat"
                        rows={5}
                        placeholder="Masukkan Deskripsi Singkat"
                        value={data.deskripsi_singkat}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="form-group ml-4 mr-4">
                      <label className="text-secondary" htmlFor="email">
                        Email
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        placeholder="Alamat Email"
                        value={data.email}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="form-group ml-4 mr-4">
                      <label className="text-secondary" htmlFor="instagram">
                        Instagram:
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="instagram"
                        name="instagram"
                        placeholder="Instagram"
                        value={data.instagram}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="form-group ml-4 mr-4">
                      <label className="text-secondary" htmlFor="github">
                        GitHub
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="github"
                        name="github"
                        placeholder="GitHub"
                        value={data.github}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="form-group ml-4 mr-4">
                      <label
                        className="text-secondary"
                        htmlFor="linkedin-sosial-media"
                      >
                        LinkedIn
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="linkedin"
                        name="linkedin"
                        placeholder="LinkedIn"
                        value={data.linkedin}
                        onChange={handleChange}
                      />
                    </div>
                  </form>
                )}
              </div>
            </div>
            <Formskill />
            <FormPengalaman />
            <FormPortofolio />
          </div>
        </div>
      </div>
    </>
  );
}

export default EditPekerja;
