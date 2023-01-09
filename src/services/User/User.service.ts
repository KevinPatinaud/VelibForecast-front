import { getServerURL } from "../../helper/Utils";
import HTTPService from "../Http/Http.service";

const isUserExist = async (id: String) => {
  return (
    await HTTPService.get(getServerURL() + ":8083/MailUser/exist?mail=" + id)
  )?.data;
};

const UserService = {
  isUserExist,
};

export default UserService;
