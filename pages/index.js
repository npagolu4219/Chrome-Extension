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
      <Head>
      <ul>
        {highlightedElements.map((element, index) => (
          <li key={index}>
            {element}
            <span onClick={() => handleDelete(index)}>&times;</span>
          </li>
        ))}
      </ul>
      </Head>

      <main>
        <Header title="Welcome to my app!" />
        <p className="description">
          Get started by editing <code>pages/index.js</code>
        </p>
      </main>

      <Footer />
    </div>
  )
}
