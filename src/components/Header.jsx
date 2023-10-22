import React from "react";


export default function Header() {
  return (
    <div className="navbar navbar-right">
        <div className="container d-flex justify-content-center">
            <a href="#" className="navbar-brand text-dark">
                <h3>
                    <i className="bi bi-star-half fs-2 text-danger"></i> React Review App
                </h3>
            </a>
        </div>
    </div>
  );
}