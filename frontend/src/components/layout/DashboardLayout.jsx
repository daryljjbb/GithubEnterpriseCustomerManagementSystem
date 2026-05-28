import Sidebar from "./Sidebar";

import Topbar from "./Topbar";


export default function DashboardLayout({

  children
}) {

  return (

    <div className="
      flex
      bg-gray-100
      min-h-screen
    ">

      {/* SIDEBAR */}
      <Sidebar />


      {/* MAIN CONTENT */}
      <div className="
        flex-1
        flex
        flex-col
      ">

        {/* TOPBAR */}
        <Topbar />


        {/* PAGE CONTENT */}
        <main className="
          p-8
        ">

          {children}

        </main>

      </div>

    </div>
  );
}