import axiosClient
from "../lib/axiosClient";


// -----------------------------------
// GET AUDIT LOGS
// -----------------------------------
export const getAuditLogs =
  async () => {

    const response =
      await axiosClient.get(

        "/audit-logs/"
      );

    return response.data;
};