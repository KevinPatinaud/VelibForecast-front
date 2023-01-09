import axios, { Axios, AxiosResponse } from "axios";
import HTTPService from "./Http.service";

jest.mock("axios");

describe("HTTPservice", () => {
  describe("When get function is called", () => {
    it("should call axios", async () => {
      axios.get = jest.fn().mockReturnValue({
        data: { AxiosResponse: "AxiosResponse" },
      } as AxiosResponse<any, any>);

      const response = await HTTPService.get("www.URL_TEST.com");

      expect(axios.get).toHaveBeenCalledWith("www.URL_TEST.com");
      expect(response).toEqual({ data: { AxiosResponse: "AxiosResponse" } });
    });
  });

  describe("When post function is called", () => {
    it("should call axios", async () => {
      axios.post = jest.fn().mockReturnValue({
        data: { AxiosResponse: "AxiosResponse" },
      } as AxiosResponse<any, any>);

      const response = await HTTPService.post("www.URL_TEST.com", {
        postParam: "postParam",
      });

      expect(axios.post).toHaveBeenCalled();
      expect(response).toEqual({ data: { AxiosResponse: "AxiosResponse" } });
    });
  });
});
