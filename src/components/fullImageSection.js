import React from "react";
import heroImg from "../images/mansion-5.jpeg";

export default function FullImageSection() {
  return (
    <main className="mx-auto pt-50 lg:pt-0">
      <section className="h-screen relative overflow-y-hidden">
        <div className="-mt-24">
        <img src={heroImg} className="w-full" alt="House over a river" />
        <div className="absolute top-40 w-full text-3xl">
          <div className="inline-block bg-gray-50 p-4 shadow-2xl">Welcome to Tenure <br/> The fastest way to buy and sell homes</div>
        </div>
        </div>
      </section>
    </main>
  );
}
