import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const HomepagePrinterComponent = () => {
  let [letters, setLetters] = useState([]);
  const content = "Sttudying with\nModern and Efficiency";
  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < content.length) {
        setLetters((prevLetter) => [...prevLetter, content[index]]);
        index++;
      }
    }, 100);
    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="home-hero_title">
      <h1 className="title">
        {letters.map((letter, index) => {
          return letter === "\n" ? (
            <br key={`br${index}`} />
          ) : (
            <span key={`letter${index}`}>{letter}</span>
          );
        })}
      </h1>
      <Link to="/plan">Book a Seat</Link>
    </div>
  );
};

export default HomepagePrinterComponent;
