import React, { useEffect, useState } from "react";

function Header() {
  return (
    <header style={styles.header}>
      <nav style={styles.nav}>
        <span style={styles.link}>Home</span>
        <span style={styles.link}>About</span>
        <span style={styles.link}>Support</span>
      </nav>
    </header>
  );
}

const styles = {
    header: {
      backgroundColor: "#f8f8f8",
      padding: "10px",
      borderBottom: "1px solid #ddd",
    },
    nav: {
      display: "flex",
      justifyContent: "space-around",
    },
    link: {
      textDecoration: "none",
      color: "black",
    },
  };
  
  export default Header;