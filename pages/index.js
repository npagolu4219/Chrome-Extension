import React, { useState, useEffect } from 'react';
import Head from 'next/head'
import Header from '@components/Header'
import Footer from '@components/Footer'

export default function Home() {
  const [highlightedElements, setHighlightedElements] = useState([]);

  useEffect(() => {
    chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
      if (request.action === 'highlightElement') {
        setHighlightedElements((prevElements) => [...prevElements, request.element]);
      }
    });
  }, []);

  const handleDelete = (index) => {
    setHighlightedElements((prevElements) => [
      ...prevElements.slice(0, index),
      ...prevElements.slice(index + 1),
    ]);
  };

  return (
    <div className="container">
      <ul>
        <li>
          Home
        </li>
        <li>
          Contact Us
        </li>
        <li>
          About Us
        </li>
      </ul>

      <main>
        <p className="description">
          Get started by editing <code>pages/index.js</code>
        </p>
      </main>
    </div>
  )
}
