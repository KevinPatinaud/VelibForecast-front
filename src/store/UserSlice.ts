import { createSlice } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { getServerURL } from "../helper/Utils";
import { Account as UserModel } from "../model/Account";
import HTTPService from "../services/Http/Http.service";
import { RootState } from "./Store";

const initialUser = {
  isConnected: false,
} as UserModel;

export const userSlice = createSlice({
  name: "user",
  initialState: initialUser,

  reducers: {
    connectMailUser: (userState: UserModel, action) => {
      connectMailAccount(action.payload.account, action.payload.captchaToken);
      userState.isConnected = true;
    },
    disconnect: (userState: UserModel, action) => {
      HTTPService.setAuthToken();
      userState.isConnected = false;
    },
  },
});

const connectMailAccount = async (account: UserModel, captchaToken: String) => {
  const result = await HTTPService.put(getServerURL() + ":8083/MailUser", {
    email: account.email,
    password: account.password,
    captchaToken: captchaToken,
  });

  return interpretConection(result);
};

const connectFacebookAccount = async (accessToken: String) => {
  const result = await HTTPService.put(getServerURL() + ":8083/FacebookUser", {
    accessToken: accessToken,
  });

  return interpretConection(result);
};

const createMailAccount = async (account: UserModel, captchaToken: String) => {
  const result = await HTTPService.post(getServerURL() + ":8083/MailUser", {
    email: account.email,
    password: account.password,
    captchaToken: captchaToken,
  });

  return interpretConection(result);
};

const createFacebookAccount = async (accessToken: String) => {
  const result = await HTTPService.post(getServerURL() + ":8083/FacebookUser", {
    accessToken: accessToken,
  });

  return interpretConection(result);
};

const interpretConection = async (result: AxiosResponse<any, any>) => {
  if (result === undefined || result.status === undefined) return null;

  if (result.status === 200) {
    HTTPService.setAuthToken(result?.data.JWT);
    return result?.data;
  } else return result.status;
};

export const { connectMailUser, disconnect } = userSlice.actions;
export const selectUser = (state: RootState) => state.user;
export default userSlice.reducer;
