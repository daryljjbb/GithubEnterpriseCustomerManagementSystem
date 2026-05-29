import {
  useEffect,
  useState
} from "react";

import DashboardLayout
from "../components/layout/DashboardLayout";

import {
  getAuditLogs
} from "../services/auditService";


export default function AuditLogsPage() {

  const [logs, setLogs] =
    useState([]);

  const [loading, setLoading] =
    useState(true);


  // -----------------------------------
  // FETCH LOGS
  // -----------------------------------
  useEffect(() => {

    fetchLogs();

  }, []);


  const fetchLogs = async () => {

    try {

      const data =
        await getAuditLogs();

      setLogs(data);

    } catch (error) {

      console.error(
        "Failed to load logs:",
        error
      );

    } finally {

      setLoading(false);
    }
  };


  return (

    <DashboardLayout>

      <div className="
        p-6
      ">

        <h1 className="
          text-3xl
          font-bold
          mb-6
        ">
          Audit Logs
        </h1>


        <div className="
          bg-white
          rounded-2xl
          shadow-md
          overflow-hidden
        ">

          {loading ? (

            <div className="
              p-6
            ">

              Loading logs...

            </div>

          ) : (

            <table className="
              w-full
            ">

              <thead className="
                bg-gray-100
              ">

                <tr>

                  <th className="
                    p-4
                    text-left
                  ">
                    Event
                  </th>

                  <th className="
                    p-4
                    text-left
                  ">
                    User
                  </th>

                  <th className="
                    p-4
                    text-left
                  ">
                    IP Address
                  </th>

                  <th className="
                    p-4
                    text-left
                  ">
                    Date
                  </th>

                </tr>

              </thead>


              <tbody>

                {logs.map((log) => (

                  <tr

                    key={log.id}

                    className="
                      border-t
                    "
                  >

                    <td className="p-4">
                      {log.event}
                    </td>

                    <td className="p-4">
                      {log.username}
                    </td>

                    <td className="p-4">
                      {log.ip_address}
                    </td>

                    <td className="p-4">

                      {new Date(
                        log.created_at
                      ).toLocaleString()}

                    </td>

                  </tr>
                ))}

              </tbody>

            </table>

          )}

        </div>

      </div>

    </DashboardLayout>
  );
}