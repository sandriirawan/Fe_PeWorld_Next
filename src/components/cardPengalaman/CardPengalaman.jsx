import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "../pekerja/profilePekerja.module.css";
import Cookies from "js-cookie";
import Pagination from "react-bootstrap/Pagination";
import ModalUpdatePengalaman from "../modalUpdatePengalaman/ModalUpdatePengalaman";
import Swal from "sweetalert";
import Button from "react-bootstrap/Button";


function CardPengalaman() {
  const [pengalamanData, setPengalamanData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(2);

  const id = Cookies.get("id");

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_REACT_APP_API_KEY}/pengalaman/${id}`)
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
const currentPengalamanData = pengalamanData ? pengalamanData.slice(indexOfFirstItem, indexOfLastItem) : []

  const handleDelete = (id) => {
    Swal({
      title: "Apakah Anda yakin?",
      text: "Data akan dihapus permanen!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        axios
          .delete(`${process.env.NEXT_PUBLIC_REACT_APP_API_KEY}/pengalaman/${id}`)
          .then((response) => {
            console.log(response)
            Swal("Berhasil!", "Data telah dihapus.", "success");
            window.location.reload();
          })
          .catch((error) => {
            console.error("Error deleting data:", error);
          });
      }
    });
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const pageNumbers = [];
  if (pengalamanData) {
    for (let number = 1; number <= Math.ceil(pengalamanData.length / itemsPerPage); number++) {
      pageNumbers.push(number);
    }
  }

  return (
    <>
      {currentPengalamanData.map((item) => (
        <div key={item.id} className={`${styles["card-pengalaman"]}`}>
          <div className={`${styles["card-content-pengalaman"]}`}>
            <img
              src="/perusahaan.png"
              className={`${styles.profile}`}
              alt="Image"
            />
            <div className={`${styles["content-pengalaman"]}`}>
              <div className={`${styles["card-body-penagalaman"]}`}>
                <h2 className={`${styles["card-title-pengalaman"]}`}>
                  {item.posisi}
                </h2>
                <h6 className={`${styles["card-job"]}`}>
                  {item.nama_perusahaan}
                </h6>
                <h6 className={`${styles.year}`}>
                  {new Date(item.tahun_masuk).toLocaleString("id-ID", {
                    month: "long",
                    year: "numeric",
                  })}
                  {" - "}
                  {new Date(item.tahun_keluar).toLocaleString("id-ID", {
                    month: "long",
                    year: "numeric",
                  })}{" "}
                  {calculateMonthDifference(
                    item.tahun_masuk,
                    item.tahun_keluar
                  )}{" "}
                </h6>
                <p className={`${styles["card-text"]}`}>{item.deskripsi}</p>
              </div>
            </div>
            <div className="d-flex mt-2">
            <Button className="btn btn-danger mr-2">
              <i
                className={`bi bi-trash `}
                onClick={() => handleDelete(item.id)}
              ></i>
            </Button>
            <ModalUpdatePengalaman id={item.id}  />
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
    </>
  );
}

export default CardPengalaman;
