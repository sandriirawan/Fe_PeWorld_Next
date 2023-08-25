import React, { useState } from "react";
import styles from "../editPekerja/editpekerja.module.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale } from "react-datepicker";
import id from "date-fns/locale/id";
import axios from "axios";
import Cookies from "js-cookie";
import CardPengalaman from "../cardPengalaman/CardPengalaman";
import swal from "sweetalert";

registerLocale("id", id);

function FormPengalaman() {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const [formData, setFormData] = useState({
    posisi: "",
    nama_perusahaan: "",
    tahun_masuk: "",
    tahun_keluar: "",
    deskripsi: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dataToSend = {
      ...formData,
      users_id: Cookies.get("id"),
      tahun_masuk: startDate ? startDate.toISOString() : null,
      tahun_keluar: endDate ? endDate.toISOString() : null,
    };
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_REACT_APP_API_KEY}/pengalaman`,
        dataToSend
      );
      console.log(response.data);
      swal("Success", "Pengalaman kerja berhasil ditambahkan!", "success")
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Unknown error occurred";
      swal({
        title: "Data gagal disimpan",
        text: errorMessage,
        icon: "error",
        button: "OK",
      });
    }
  };

  return (
    <>
      <div className="input-pengalaman">
        <div className={`card ${styles.cardPengalaman}`}>
          <div className={` ${styles.titlePengalaman}`}>
            <h3>Pengalaman Kerja</h3>
            <div className={` ${styles.garis}`}></div>
          </div>
          <form className="form-pengalaman m-5" onSubmit={handleSubmit}>
            {/* Input Posisi */}
            <div className="form-group">
              <label className="text-secondary" htmlFor="posisi">
                Posisi
              </label>
              <input
                type="text"
                className="form-control"
                id="posisi"
                name="posisi"
                placeholder="Masukkan Posisi"
                required=""
                value={formData.posisi}
                onChange={handleChange}
              />
            </div>
            {/* Input Nama Perusahaan */}
            <div className="form-group">
              <label className="text-secondary" htmlFor="namaPerusahaan">
                Nama Perusahaan
              </label>
              <input
                type="text"
                className="form-control"
                id="namaPerusahaan"
                name="nama_perusahaan"
                placeholder="Masukkan Nama Perusahaan"
                required=""
                value={formData.nama_perusahaan}
                onChange={handleChange}
              />
            </div>
            {/* Input Tahun Masuk dan Tahun Keluar */}
            <div className="form-inline mt-4 mb-3">
              <div className="form-group mr-5">
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)} 
                  placeholderText="Tahun Masuk"
                  dateFormat="dd MMMM yyyy"
                  locale="id"
                  showYearDropdown
                  required
                />
              </div>
              <div className="form-group">
                <DatePicker
                  selected={endDate}
                  onChange={(date) => setEndDate(date)} 
                  placeholderText="Tahun Keluar"
                  dateFormat="dd MMMM yyyy"
                  locale="id"
                  showYearDropdown
                  required
                />
              </div>
            </div>
            {/* Input Deskripsi Singkat */}
            <div className="form-group">
              <label className="text-secondary" htmlFor="deskripsiSingkat">
                Deskripsi Singkat
              </label>
              <textarea
                className="form-control"
                id="deskripsiSingkat"
                name="deskripsi"
                rows={5}
                placeholder="Masukkan Deskripsi Singkat"
                required=""
                defaultValue={""}
                value={formData.deskripsi}
                onChange={handleChange}
              />
            </div>
            {/* Tombol Submit */}
            <button type="submit" className={`btn ${styles.btnPengalaman}`}>
              Tambah pengalaman kerja
            </button>
          </form>
          <div className={`${styles.wrapCard}`}>
            <CardPengalaman />
          </div>
        </div>
      </div>
    </>
  );
}

export default FormPengalaman;
