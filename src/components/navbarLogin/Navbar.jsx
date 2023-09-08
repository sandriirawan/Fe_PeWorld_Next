import { useRouter } from "next/router";
import { useEffect } from "react";
import Link from "next/link";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { getDetailPekerja } from "../../config/Redux/Action/pekerja";
import { getDetailPerekrut } from "../../config/Redux/Action/perekrut";

function NavbarLogin() {
  const router = useRouter();

  const dispatch = useDispatch();
 const pekerjaData = useSelector((state) => state.pekerja.pekerjaDetail[0]);
  const perekrutData = useSelector((state) => state.perekrut.perekrutDetail[0]);
  useEffect(() => {
    dispatch(getDetailPekerja());
    dispatch(getDetailPerekrut());
  }, [dispatch]);

  
  const role = Cookies.get("role");
  const userId = Cookies.get("id");
  const handleLogout = () => {
    Cookies.remove("role");
    Cookies.remove("token");
    Cookies.remove("id");
    router.push("/auth/login");
  };

  return (
    <>
      <div className="container-fluid">
        <div className="container">
          <nav className="navbar navbar-expand-lg navbar-light">
            <Link href={"/"}>
              <img src="/icon.png" alt="" />
            </Link>
            <Link href="/home">
              <span
                className="home"
                style={{ color: "black", textDecoration: "none" }}
              >
                Home
              </span>
            </Link>
            <button
              className="navbar-toggler"
              type="button"
              data-toggle="collapse"
              data-target="#navbarNav"
              aria-controls="navbarNav"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <i className="bi bi-bell" />
                </li>
                <li className="nav-item">
                  <Link href={"/chat"}>
                    <i className="bi bi-envelope" />
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href={`/profile/${userId}`}>
                  {role === "pekerja" && pekerjaData?.foto_pekerja ? (
                <img
                  className="img"
                  src={pekerjaData.foto_pekerja}
                  alt="Foto Profil"
                />
              ) : role === "perekrut" && perekrutData?.foto_perusahaan ? (
                <img
                  className="img"
                  src={perekrutData.foto_perusahaan}
                  alt="Foto Profil"
                />
              ) : (
                <i className="bi bi-person-circle" />
              )}
                  </Link>
                </li>
              </ul>
              <button className="btn btn-logout" onClick={handleLogout}>
                Logout
              </button>
            </div>
          </nav>
        </div>
      </div>
      <style>
        {`
  .container-fluid {
    background-color: white;
    box-shadow: 0px 10px 20px 0px #84848440;
  }

  .navbar {
    padding: 20px 0;
    background-color: white;
  }

  .navbar-nav {
    display: flex;
    align-items: center;
  }

  .bi-bell {
    font-size: 24px;
    padding-right: 34px;
    color: #9b9b9b;
  }

  .bi-envelope {
    font-size: 24px;
    padding-right: 34px;
    color: #9b9b9b;
  }

  .bi-person-circle {
    font-size: 32px;
    color: #9b9b9b;
    border-radius: 50%;
 
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .img {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    object-fit: cover;
  }
  .home {
    margin-left: 120px;
    font-size: 18px;
    font-weight: 600;
    line-height: 28px;
    color: black; 
    text-decoration: none; 
  }



  .btn-logout {
    position: relative;
    color: white;
    background-color: #5e50a1;
    margin-left: 34px;
  }
  .btn-logout:hover {
    color: white;
  }
  @media (max-width: 768px) {
    /* navbar */
    .navbar-nav {
      flex-direction: column-reverse;
    }

    .bi-person-circle {
      font-size: 50px;
      margin-bottom: 10px;
    }

    .bi-bell {
      font-size: 24px;
      padding-right: 0;
      color: #9b9b9b;
    }

    .bi-envelope {
      font-size: 24px;
      padding-right: 0;
      color: #9b9b9b;
    }

    .btn-logout {
      margin-left: 40px;
      margin-top: 10px;
    }

    .navbar-collapse {
      position: fixed;
      top: 0;
      left: -300px;
      width: 200px;
      height: 100%;
      background-color: #f8f9fa;
      padding: 20px;
      transition: left 0.3s;
      z-index: 100;
    }

    .navbar-collapse.show {
      left: 0;
    }

    .home {
      margin-left: 60px;
    }
    .img {
      width: 52px;
      height: 52px;
      border-radius: 50%;
    }
  }
    `}
      </style>
    </>
  );
}

export default NavbarLogin;
