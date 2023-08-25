import React from 'react'

function Footer() {
  return (
   <>
    <footer>
      <div className="container">
        <img src="/assets/img/Group 978 1.png" alt="" />
        <p className="text">
          Lorem ipsum dolor sit amet, consectetur <br />adipiscing elit. In
          euismod ipsum et dui <br />rhoncus auctor.
        </p>
        <hr className="line" />
        <div className="text-footer">
          <p>2020 Pewworld. All right reserved</p>
          <p className="telepon">Telepon</p>
          <p>Email</p>
        </div>
      </div>
    </footer>

    <style>
        {`
              footer {
                height: 40vh;
                background-color: #5e50a1;
              }
        
              footer img {
                width: 178px;
                padding-top: 40px;
              }
              footer .line {
                border: 1px solid white;
              }
        
              footer .text {
                padding: 10px 0;
                color: white;
              }
        
              footer .text-footer {
                display: flex;
                justify-content: space-between;
                align-items: center;
              }
        
              footer .text-footer p {
                padding-top: 10px;
                color: white;
                margin: 0;
              }
        
              footer .telepon {
                padding-left: 600px;
              }
        
        
              @media (max-width: 768px) {
                #section4 {
                  display: none;
                }
                footer .telepon {
                  padding-left: 0;
                  order: 1;
                }
              }
        `}
    </style>
   </>
  )
}

export default Footer