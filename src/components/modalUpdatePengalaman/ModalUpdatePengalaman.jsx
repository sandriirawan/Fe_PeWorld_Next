import React, { useEffect, useState } from "react";
import styles from "../editPekerja/editpekerja.module.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { registerLocale } from "react-datepicker";
import id from "date-fns/locale/id";
import axios from "axios";
import Cookies from "js-cookie";
import swal from "sweetalert";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
registerLocale("id", id);

function ModalUpdatePengalaman({id}) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [data, setData] = useState(null);
  const userId = Cookies.get('id');

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_REACT_APP_API_KEY}/pengalaman/${userId}`);
        setData(response.data.data[0]);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    getData();
  }, [userId]);

  const [formData, setFormData] = useState({
    posisi: "",
    nama_perusahaan: "",
    tahun_masuk: "",
    tahun_keluar: "",
    deskripsi: "",
  });

  useEffect(() => {
    if (data) {
      setFormData({
        posisi: data.posisi,
        nama_perusahaan: data.nama_perusahaan,
        tahun_masuk: data.tahun_masuk ? new Date(data.tahun_masuk) : null,
        tahun_keluar: data.tahun_keluar ? new Date(data.tahun_keluar) : null,
        deskripsi: data.deskripsi,
      });
    }
  }, [data]);

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
      tahun_masuk: startDate ? startDate.toISOString() : null,
      tahun_keluar: endDate ? endDate.toISOString() : null,
    };
    try {
      const response = await axios.put(`${process.env.NEXT_PUBLIC_REACT_APP_API_KEY}/pengalaman/${id}`, dataToSend);
      console.log(response.data);
      swal("Success", "Pengalaman kerja berhasil ditambahkan!", "success").then(() => {
        window.location.reload();
      });
    } catch (error) {
      console.error("Error posting data:", error);
      swal("Error", "Terjadi kesalahan saat menambahkan pengalaman kerja!", error).then(() => {
        window.location.reload();
      });
    }
  };

  return (
    <> 
      <Button className="btn btn-warning mr-3" onClick={handleShow}>
      <i class="bi bi-pencil"></i>
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Update Product</Modal.Title>
        </Modal.Header>
        {data && (
        <form onSubmit={handleSubmit}>
          <Modal.Body>
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
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <button type="submit" className="btn btn-warning">
            <i class="bi bi-pencil"></i>
            </button>
          </Modal.Footer>
        </form>
            )}
      </Modal>
    </>
  );
}

export default ModalUpdatePengalaman;
