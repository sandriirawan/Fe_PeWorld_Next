import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "../pekerja/profilePekerja.module.css";
import Cookies from "js-cookie";
import Link from "next/link";
import Pagination from "react-bootstrap/Pagination";
import Swal from "sweetalert";

function CardPortofolio() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8); 
  const id = Cookies.get("id");

  useEffect(() => {
    axios
      .get(`${process.env.NEXT_PUBLIC_REACT_APP_API_KEY}/portofolio/${id}`)
      .then((response) => {
        setData(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data ? data.slice(indexOfFirstItem, indexOfLastItem) : []


  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const pageNumbers = [];
  if (data) {
    for (let number = 1; number <= Math.ceil(data.length / itemsPerPage); number++) {
      pageNumbers.push(number);
    }
  }

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
          .delete(`${process.env.NEXT_PUBLIC_REACT_APP_API_KEY}/portofolio/${id}`)
          .then((response) => {
            Swal("Berhasil!", "Data telah dihapus.", "success");
            window.location.reload();
          })
          .catch((error) => {
            console.error("Error deleting data:", error);
          });
      }
    });
  };

  return (
    <>
      <div className={`${styles.cardContainer}`}>
        {currentItems.map((item) => (
          <div className={`card ${styles.card}`} key={item.id}>
            <Link href={item.link_repo}>
              <img
                src={item.photo}
                className={`${styles.photo}`}
                alt="Gambar 1"
              />
            </Link>
            <h5 className="card-title">{item.nama_aplikasi}</h5>
            <i
              className={`bi bi-trash ${styles.closeIcon}`}
              onClick={() => handleDelete(item.id)}
            ></i>
          </div>
        ))}
      </div>
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

export default CardPortofolio;
