import { useRouter } from 'next/router';
import React from 'react';

function Navbar() {
  const router = useRouter()

  return (
    <>
    <div className="container-fluid">
      <div className="container">
      <nav className="navbar navbar-expand-lg navbar-light">
        <a className="navbar-brand" href="#">
          <img src="/icon.png" alt="" />
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <button type="button" onClick={() => router.push('/auth/login')} className="btn btn-masuk">Masuk</button>
            </li>
            <li className="nav-item">
              <button type="button" className="btn btn-daftar" onClick={() => router.push('/auth/register')}>Daftar</button>
            </li>
          </ul>
        </div>
      </nav>
    </div>
    </div>
    <style>
        {`
            .container-fluid{
                background-color: white;
            }
            .navbar {
                padding: 20px 0;
              }
              .btn-masuk {
                margin-right: 10px;
                color: #5e50a1;
                border: 1px solid #5e50a1;
              }
        
              .btn-masuk:hover {
                color: #5e50a1;
              }
        
              .btn-daftar {
                color: white;
                background-color: #5e50a1;
              }
        
              .btn-daftar:hover {
                color: white;
              }
        
              @media (max-width: 768px) {
                /* navbar */
                .btn-masuk {
                  margin-top: 25px;
                  padding: 5px 50px;
                }
        
                .btn-daftar {
                  margin-top: 20px;
                  padding: 5px 50px;
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
              }
        `}
    </style>

    </>
  );
}

export default Navbar;
