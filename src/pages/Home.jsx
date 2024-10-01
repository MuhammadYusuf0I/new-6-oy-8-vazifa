import React, { useState, useEffect } from "react";
import Card from "../components/Card";
import { SyncLoader } from "react-spinners";
import NewCard from "../components/NewCard";
function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [phones, setPhones] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    fetch("https://auth-rg69.onrender.com/api/products/all")
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Failed to fetch phones");
      })
      .then((data) => {
        setPhones(data || []);
      })
      .catch((err) => {
        console.error("Error fetching phones:", err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  return (
    <>
      <NewCard
        addProduct={(newProduct) => setPhones([...phones, newProduct])}
      />

      <div className="base-container border rounded-xl mt-10 bg-stone-200">
        <h2 className="base-container font-bold text-3xl justify-center flex mt-4">
          Phones
        </h2>
        <div className="base-container mt-12 flex justify-between flex-wrap gap-8">
          {isLoading && <SyncLoader color="red" size={20} />}
          {!isLoading && phones.length === 0 && <p>No phones available.</p>}
          {!isLoading &&
            phones.length > 0 &&
            phones.map((el, index) => {
              return <Card key={index} phone={el} />;
            })}
        </div>
      </div>
    </>
  );
}

export default Home;
