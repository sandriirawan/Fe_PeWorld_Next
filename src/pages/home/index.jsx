import Footer from "@/components/footer/Footer";
import NavbarLogin from "@/components/navbarLogin/Navbar";
import { useRouter } from "next/router";
import styles from "@/styles/Home.module.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Pagination from "react-bootstrap/Pagination";

function Home() {
  const router = useRouter();
  const fallbackImage = "/Make Your Day.jpg";

  const handleProfileClick = (role,id) => {
    if (role === "pekerja") {
      router.push(`/profile/pekerja/${id}`);
    } else if (role === "perekrut") {
      router.push(`/profile/perusahaan/${id}`);
    } else {
      console.error("Invalid role:", role);
    }
  };

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const itemsPerPage = 5;
  const [data, setData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_REACT_APP_API_KEY}/users`);
        setData(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  const getProfileImage = (data) => {
    if (data.role === "perekrut") {
      return data.foto_perusahaan
        ? data.foto_perusahaan
        : fallbackImage;
    } else {
      return data.foto_pekerja ? data.foto_pekerja : fallbackImage;
    }
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    const lowerCaseQuery = searchQuery.toLowerCase();
    const filtered = data.filter((item) => {
      const lowerCaseName = item.name.toLowerCase();
      const lowerCaseCompanyName = item.nama_perusahaan?.toLowerCase();
      return (
        lowerCaseName.includes(lowerCaseQuery) ||
        (lowerCaseCompanyName && lowerCaseCompanyName.includes(lowerCaseQuery))
      );
    });
    setFilteredData(filtered);
    setActivePage(1);
  };

  const startIndex = (activePage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentData =
    searchQuery.length > 0
      ? filteredData.slice(startIndex, endIndex)
      : data.slice(startIndex, endIndex);
  const totalPages = Math.ceil(
    (searchQuery.length > 0 ? filteredData.length : data.length) / itemsPerPage
  );

  let paginationItems = [];
  for (let number = 1; number <= totalPages; number++) {
    paginationItems.push(
      <Pagination.Item key={number} onClick={() => setActivePage(number)}>
        {number}
      </Pagination.Item>
    );
  }

  return (
    <>
      <main style={{height:1830}}>
        <NavbarLogin />
        <div className={`${styles.fluid}`}>
          <div className="container">
            <div className={styles.titleJobs}>Top Jobs</div>
          </div>
        </div>
        <div className="container">
          <nav className={`navbar ${styles.navbar}`}>
            <form
              className={`form-inline inline border ${styles.inline}`}
              onSubmit={handleSearchSubmit}
            >
              <input
                className={`form-control control ${styles.control}`}
                type="search"
                placeholder="Search"
                aria-label="Search"
                value={searchQuery}
                onChange={handleSearchChange}
              />
              <div className={`dropdown ${styles.dropdown}`}>
                <button
                  className={`btn kategori my-2 my-sm-0 dropdown-toggle ${styles.kategori}`}
                  type="button"
                  id="dropdownMenuButton"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  sort
                </button>
                <div
                  className={`dropdown-menu ${styles.dropdownMenu}`}
                  aria-labelledby="dropdownMenuButton"
                >
                  <a className="dropdown-item" href="#">
                    Sortir berdasarkan nama
                  </a>
                  <a className="dropdown-item" href="#">
                    Sortir berdasarkan Skill
                  </a>
                  <a className="dropdown-item" href="#">
                    Sortir berdasarkan freelance
                  </a>
                  <a className="dropdown-item" href="#">
                    Sortir berdasarkan fulltime
                  </a>
                </div>
              </div>
              <button
                className={`btn btnSearch my-2 my-sm-0 ${styles.btnSearch}`}
                type="submit"
              >
                Search
              </button>
            </form>
          </nav>
        </div>
        <div className="container">
          <div className={`wrap ${styles.wrap}`}>
            {currentData.map((item) => (
              <div key={item.id}>
                <div className={`card ${styles.card}`}>
                  <div className={`card-content  ${styles.cardContent}`}>
                    <img
                      src={getProfileImage(item)}
                      className={`profile ${styles.profile}`}
                      alt="Profile"
                    />
                    <div className={`content ${styles.content}`}>
                      <div className={`card-body ${styles.cardBody}`}>
                        <h2 className={`card-title title ${styles.title}`}>
                        {item.role === "pekerja" ? item.name : item.nama_perusahaan}
                        </h2>
                        <h6 className={`card-job job ${styles.job}`}>
                          {item.job_desk} {item.nama_perusahaan}
                        </h6>
                        <h6>
                          {item.tempat_kerja} {item.jabatan}{" "}
                        </h6>
                        {item.kota_pekerja &&  (
                          <i className={`bi bi-geo-alt ${styles.geoAlt}`}>  
                            {item.kota_pekerja}, {item.provinsi_pekerja}
                          </i>
                        )}
                   
                          {item.kota_perusahaan &&  (
                          <i className={`bi bi-geo-alt ${styles.geoAlt}`}>
                            {item.kota_perusahaan}, {item.provinsi_perusahaan}
                          </i>
                        )}
                        <div className={`${styles["wrap-skill"]} `}>
                          {item.nama_skill ? (
                            item.nama_skill
                              .split(",")
                              .map((skill) => (
                                <button key={skill}>{skill.trim()}</button>
                              ))
                          ) : (
                            <p></p>
                          )}
                        </div>
                      </div>
                      <button
                        className={`btn btnProfile ${styles.btnProfile}`}
                        onClick={() => handleProfileClick(item.role,item.id)}
                      >
                        Lihat profile
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
            <div className="d-flex justify-content-center m-5 ">
              <Pagination>{paginationItems}</Pagination>
            </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

// export async function getStaticProps() {
//   let data = [];
//   try {
//     const response = await axios.get(`${process.env.NEXT_PUBLIC_REACT_APP_API_KEY}/users`);
//     data = response.data.data;
//   } catch (error) {
//     console.error("Error fetching data:", error);
//   }

//   return {
//     props: {
//       data,
//     },
//   };
// }

export default Home;
