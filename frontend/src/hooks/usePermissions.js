import { permissions } from "../permissions/permissionMap";

import {
  useAuthContext
} from "../context/AuthContext";


export default function usePermissions() {

  const { user } = useAuthContext();


  const can = (permission) => {

    if (!user) return false;

    return permissions[user.role]?.includes(
      permission
    );
  };


  return {
    can,
  };
}