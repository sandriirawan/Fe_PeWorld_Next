import styles from "./editPerekrut.module.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Cookies from 'js-cookie';
import { useRouter } from "next/router";


function EditPerekrut() {
  const [data, setData] = useState();
  const [getPhoto, setPhoto] = useState()
  const [previewImage, setPreviewImage] = useState();
  const userId = Cookies.get('id')
  const router = useRouter();

  const handleBatal = () => {
    router.push(`/profile/${userId}`);
  };

  useEffect(() => {
    const getdata = async () => {
      if (userId) {
        await axios
          .get(`https://be-peworld.vercel.app/perekrut/profile/${userId}`)
          .then((response) => {
            setData(response.data.data[0]);
            setPhoto(response.data.data[0].foto_perusahaan)
          })
          .catch((error) => {
            console.error("Error fetching user data:", error);
          });
      }
    }
    getdata()
  }, []);



  const handleUpload = (event) => {
    const { type } = event.target;
    if (type === "file") {
      const file = event.target.files[0]
      const reader = new FileReader()
      reader.onloadend = () => {
          setPreviewImage(reader.result)
      }
      reader.readAsDataURL(file)
      setPhoto(event.target.files[0])
    } 
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("nama_perusahaan", data.nama_perusahaan);
    formData.append("bidang_perusahaan", data.bidang_perusahaan);
    formData.append("provinsi", data.provinsi);
    formData.append("kota", data.kota);
    formData.append("info_perusahaan", data.info_perusahaan);
    formData.append("email_perusahaan", data.email_perusahaan);
    formData.append("phone_perusahaan", data.phone_perusahaan);
    formData.append("jabatan", data.jabatan);
    formData.append("linkedin", data.linkedin);
    formData.append("foto_perusahaan", getPhoto);

    axios
      .put(`https://be-peworld.vercel.app/perekrut/profile/edit/${userId}`, formData)
      .then((response) => {
        // swal("Data berhasil disimpan!")
        router.push(`/profile/${userId}`); 
      })
      .catch((error) => {
        const errorMessage =
        error.response?.data?.message || "Unknown error occurred";
      swal({
        title: "Data gagal disimpan",
        text: errorMessage,
        icon: "error",
        button: "OK",
      });
      });
  };
  return (
    <>
        <div className={styles.sampul} />
        <div className="container">
          <div className="row">
            <div className={`profile ${styles["col-md-4"]}`}>
              <div className={`card ${styles.profileCard}`}>
              {data && (
                  <>
                    <div className={`${styles.fotoProfile}`}>
                    {previewImage ? ( 
                        <img src={previewImage} alt="Preview" />
                      ) : data.foto_perusahaan ? (
                        <img src={getPhoto} alt="image" />
                      ) : (
                        <img
                          src="/Make Your Day.jpg"
                          alt="Default Profile"
                        />
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
                        name="foto_perusahaan"
                        onChange={handleUpload}
                      />
                    </div>
                  </>
                )}
                    {data && (
                <div className={styles.dataDiri}>
                  <h2 className={styles.nama}>{data.nama_perusahaan}</h2>
                  <h6 className={styles.posisi}>{data.jabatan}</h6>
                  {data?.provinsi && (
                <i className="bi bi-geo-alt">
                  {data?.provinsi}, {data?.kota}
                </i>
                  )}
                </div>
                   )}
              </div>
              <div className={styles.buttonContainer}>
                <button className={`${styles.btn} ${styles.buttonSimpan}`}
                onClick={handleSubmit}
                >
                  Simpan
                </button>
                <button className={`${styles.btn} ${styles.buttonBatal}`} onClick={handleBatal}>
                  Batal
                </button>
              </div>
            </div>
            {/* Card kedua (card kanan) */}
            <div className="col-md-4">
              <div className={styles.inputdata}>
                <div className={`card ${styles.wrapCard}`}>
                  <div className={styles.titleData}>
                    <h3>Data diri</h3>
                    <div className={styles.garis} />
                  </div>
                  {data && (
                  <form className="form-data m-5">
                    <div className="form-group">
                      <label
                        className="text-secondary"
                        htmlFor="Nama Perusahaan"
                      >
                        Nama Perusahaan
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="Nama Perusahaan"
                        name="nama_perusahaan"
                        placeholder="Masukkan Nama Perusahaan"
                        required=""
                        value={data.nama_perusahaan}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="form-group mt-5-data">
                      <label className="text-secondary" htmlFor="jabatan">
                        jabatan
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="jabatan"
                        name="jabatan"
                        placeholder="Masukan jabatan perusahaan"
                        required=""
                        value={data.jabatan}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="form-group mt-5-data">
                      <label className="text-secondary" htmlFor="Bidang">
                        Bidang
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="Bidang"
                        name="bidang_perusahaan"
                        placeholder="Masukan bidang perusahaan"
                        required=""
                        value={data.bidang_perusahaan}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="form-group mt-5-data">
                      <label className="text-secondary" htmlFor="provinsi">
                        provinsi
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="provinsi"
                        name="provinsi"
                        placeholder="Masukkan provinsi"
                        required=""
                        value={data.provinsi}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="form-group mt-5-data">
                      <label className="text-secondary" htmlFor="kota">
                        kota
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="kota"
                        name="kota"
                        placeholder="Masukkan kota"
                        required=""
                        value={data.kota}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="form-group mt-5-data">
                      <label
                        className="text-secondary"
                        htmlFor="deskripsiSingkat"
                      >
                        Deskripsi Singkat
                      </label>
                      <textarea
                        className="form-control"
                        id="deskripsiSingkat"
                        name="info_perusahaan"
                        rows={5}
                        placeholder="Masukkan Deskripsi Singkat"
                        value={data.info_perusahaan}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="form-group mt-5-data">
                      <label className="text-secondary" htmlFor="email">
                        Email
                      </label>
                      <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email_perusahaan"
                        placeholder="Alamat Email"
                        value={data.email_perusahaan}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="form-group mt-5-data">
                      <label className="text-secondary" htmlFor="instagram">
                        Nomor Telepon:
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        id="phone_perusahaan"
                        name="phone_perusahaan"
                        placeholder="Nomor Telepon"
                        value={data.phone_perusahaan}
                        onChange={handleChange}
                      />
                    </div>
                    <div className="form-group mt-5-data">
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
            </div>
          </div>
        </div>
    </>
  );
}

export default EditPerekrut;


