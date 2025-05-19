import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import { Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-bl from-teal-950 via-cyan-950 to-teal-950 text-gray-100">
      <div className="mx-auto min-h-screen max-w-screen-xl shadow-xl shadow-amber-100/20">
        <main className="flex min-h-screen flex-col px-4 sm:px-8">
          <Header />
          <div className="flex-1 py-8">
            <Outlet />
          </div>
          <Footer />
        </main>
      </div>
    </div>
  );
}