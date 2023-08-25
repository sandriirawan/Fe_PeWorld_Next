import React, { useState } from "react";
import styles from "../editPekerja/editpekerja.module.css";
import axios from "axios";
import Cookies from "js-cookie";
import swal from "sweetalert";

function FormPortofolio() {
  const id = Cookies.get("id");
  const [formData, setFormData] = useState({
    users_id: id,
    nama_aplikasi: "",
    link_repo: "",
    tipe: "mobile",
    photo: null,
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };
  const [previewImage, setPreviewImage] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFormData((prevFormData) => ({
      ...prevFormData,
      photo: selectedFile,
    }));

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImage(reader.result);
    };
    if (selectedFile) {
      reader.readAsDataURL(selectedFile);
    } else {
      setPreviewImage(null);
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const formDataToSend = new FormData();
    formDataToSend.append("users_id", formData.users_id);
    formDataToSend.append("nama_aplikasi", formData.nama_aplikasi);
    formDataToSend.append("link_repo", formData.link_repo);
    formDataToSend.append("tipe", formData.tipe);
    formDataToSend.append("photo", formData.photo);

    axios
      .post(`https://be-peworld.vercel.app/portofolio`, formDataToSend)
      .then((response) => {
        console.log("Create portofolio Success", response.data);
        swal("Success", "Portofolio berhasil ditambahkan!", "success");
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      })
      .catch((error) => {
        const errorMessage =
          error.response?.data?.message || "Unknown error occurred";
        swal({
          title: "Portofolio gagal disimpan",
          text: errorMessage,
          icon: "error",
          button: "OK",
        });
      });
  };
  return (
    <div className="input-Portofolio">
      <div className={`card ${styles.cardPortofolio}`}>
        <div className={`${styles.titlePortofolio}`}>
          <h3>Portofolio Kerja</h3>
          <div className={` ${styles.garis}`}></div>
        </div>
        <form className="form-Portofolio m-5" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="text-secondary" htmlFor="nama aplikasi">
              Nama aplikasi
            </label>
            <input
              type="text"
              className="form-control"
              id="nama aplikasi"
              name="nama_aplikasi"
              placeholder="Masukan nama aplikasi"
              required=""
              value={formData.nama_aplikasi}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label className="text-secondary" htmlFor="Link repository">
              Link repository
            </label>
            <input
              type="text"
              className="form-control"
              id="Link repository"
              name="link_repo"
              placeholder="Masukkan Link repository"
              required=""
              value={formData.link_repo}
              onChange={handleChange}
            />
          </div>
          <div className="form-check-inline">
            <div className="radio-container mr-3 ">
              <input
                type="radio"
                id="aplikasiMobile"
                defaultValue="mobile"
                name="tipe"
                value="mobile"
                checked={formData.tipe === "mobile"}
                onChange={handleChange}
              />
              <label className="radio-label ml-1" htmlFor="aplikasiMobile">
                Aplikasi Mobile
              </label>
            </div>
            <div className="radio-container">
              <input
                type="radio"
                id="aplikasiWeb"
                defaultValue="web"
                name="tipe"
                value="web"
                checked={formData.tipe === "web"}
                onChange={handleChange}
              />
              <label className="radio-label ml-1" htmlFor="aplikasiWeb">
                Aplikasi Web
              </label>
            </div>
          </div>
          <div className="form-group">
            <label
              htmlFor="uploadGambar"
              className="upload-label text-secondary"
            >
              Upload Gambar
            </label>
            <div className={styles.uploadPhotoContainer}>
              <input
                type="file"
                id="uploadGambar"
                accept="image/*"
                onChange={handleFileChange}
                name="photo"
              />
              {previewImage && (
                <img
                  src={previewImage}
                  alt="Preview"
                  className="m-0 p-0"
                  style={{ width: "100%", height: ""}}
                />
              )}
              {!previewImage && (
                <div className={styles.iconDownload}>
                  <i className="bi bi-cloud-arrow-up-fill" />
                </div>
              )}
            </div>
          </div>
          <button type="submit" className={`btn ${styles.btnPortofolio}`}>
            Tambah Portofolio
          </button>
        </form>
      </div>
    </div>
  );
}

export default FormPortofolio;
