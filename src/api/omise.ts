import { GlobalConfigs } from "@/configs/global";
import { GlobalConstants } from "@/constants/global";
import axios from "axios";

const Axios = axios.create({
  baseURL: GlobalConstants.OMISE_BASE_URL,
});

export const createCharge = async (data: any) => {
  return Axios.post("/charges", data, {
    auth: {
      username: GlobalConfigs.omise_secret_key,
      password: "",
    },
  })
    .then((res) => res.data)
    .catch((err) => {
      if (err.response) {
        throw new Error(err.response.data.message);
      }
    });
};
