import { isObject } from ".";
import { ROUTERS } from "../constants/routers";

function pathPerRole(data) {
  if (isObject(data)) {
    switch (data.role) {
      case "admin":
        return ROUTERS.ADMIN;
      default:
        return ROUTERS.HOME;
    }
  }
}

export default pathPerRole;
