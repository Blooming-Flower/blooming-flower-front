import axios, { AxiosInstance, AxiosRequestHeaders } from "axios";
import { URL } from "@common/const";
import { LogErr, LogInfo } from "./functions";

const _url: string = URL.SERVER_URL;

const _customAxios: AxiosInstance = axios.create({
  baseURL: _url,
  // withCredentials: true,
  headers: { Accept: "*/*" },
});

/**
 * <PRE>
 * 1. Name : interceptors.request
 * 2. Comment   : 요청 인터셉터 (요청 전에 가로채서 axios 설정을 적용함)
 * 3. Author    : JSH
 * <PRE>
 */
_customAxios.interceptors.request.use(
  (config) => {
    let headers: AxiosRequestHeaders;

    headers = { ["content-type"]: "application/json; charset=UTF-8" };

    //파일다운로드일경우
    if (config.url?.indexOf("download") !== -1) {
      config.responseType = "blob";
    }

    config.headers = headers;
    console.log("interceptors.request  >>>>>>>>>>>>>>    " + config);

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * <PRE>
 * 1. Name : interceptors.response
 * 2. Comment   : 응답 인터셉터 (응답 직전에 호출)
 * 3. Author    : JSH
 * <PRE>
 */
_customAxios.interceptors.response.use(
  (res) => {
    LogInfo("interceptors.response  >>>>>>>>>>>>>>    " + res);

    if (res.headers.hasOwnProperty("err")) {
      // window.location.href = '/teri'
    }
    return res;
  },
  ({ config, request, response, ...err }) => {
    const errMsg = "Error Message";
    return Promise.reject({
      config,
      message: errMsg,
      response,
      ...err,
    });
  }
);

/**
 * <PRE>
 * 1. Name : callError
 * 2. Comment   : 에러표시로그
 * 3. Author    : JSH
 * <PRE>
 */
const callError = (error: any) => {
  LogErr(error, "Axios Error", "callError");
  throw new Error(error);
};

/**
 * <PRE>
 * 1. Name : $GET
 * 2. Comment   : AXIOS GET 방식요청
 * 3. Author    : JSH
 * <PRE>
 */
export const $GET = (url: string, success: Callback) => {
  if (_customAxios !== undefined) {
    _customAxios
      .get(url)
      .then((response) => {
        success(response);
      })
      .catch((error) => {
        callError(error);
      });
  } else {
    alert("AXIOS 인스턴스가 생성되지않음(GET)");
  }
};

/**
 * <PRE>
 * 1. Name : $POST
 * 2. Comment   : AXIOS POST 방식요청
 * 3. Author    : JSH
 * <PRE>
 */
export const $POST = (url: string, params: {}, success: Callback) => {
  if (_customAxios !== undefined) {
    _customAxios
      .post(url, params, { maxRedirects: 0 })
      .then((response) => {
        success(response);
      })
      .catch((error) => {
        callError(error);
      });
  } else {
    alert("AXIOS 인스턴스가 생성되지않음(POST)");
  }
};

/**
 * <PRE>
 * 1. Name : $PUT
 * 2. Comment   : AXIOS PUT 방식요청
 * 3. Author    : JSH
 * <PRE>
 */
export const $PUT = (url:string, params:{}, success:Callback) => {
    if (_customAxios !== undefined) {
        _customAxios
            .put(url, params, { maxRedirects: 0 })
            .then((response) => {
                success(response);
            })
            .catch((error) => {
                callError(error);
            });
    } else {
        alert("AXIOS 인스턴스가 생성되지않음(PUT)");
    }
}



/**
 * <PRE>
 * 1. Name : $DELETE
 * 2. Comment   : AXIOS DELETE 방식요청
 * 3. Author    : JSH
 * <PRE>
 */
export const $DELETE = (url: string, success: Callback) => {
  if (_customAxios !== undefined) {
    _customAxios
      .delete(url)
      .then((response) => {
        success(response);
      })
      .catch((error) => {
        callError(error);
      });
  } else {
    alert("AXIOS 인스턴스가 생성되지않음(DELETE)");
  }
};

/**
 * <PRE>
 * 1. Name : $DELETEPARAM
 * 2. Comment   : AXIOS DELETEPARAM 방식요청
 * 3. Author    : JSH
 * <PRE>
 */
export const $DELETEPARAM = (url: string, params:{}, success: Callback) => {
    if (_customAxios !== undefined) {
        _customAxios
            .delete(url, params)
            .then((response) => {
                success(response);
            })
            .catch((error) => {
                callError(error);
            });
    } else {
        alert("AXIOS 인스턴스가 생성되지않음(DELETE)");
    }
};

/**
 * <PRE>
 * 1. Name : $FileDownLoad
 * 2. Comment   : 파일다운로드
 * 3. Author    : JSH
 * <PRE>
 */
export const $FileDownLoad = (url: string, fileName: string, type: string) => {
  if (_customAxios !== undefined) {
    _customAxios
      .get(url)
      .then((response) => {
        const blob = new Blob([response.data]);
        const fileObjectUrl = window.URL.createObjectURL(blob);
        const link = document.createElement("a");

        link.href = fileObjectUrl;
        link.style.display = "none";
        link.download = fileName + "." + type;

        document.body.appendChild(link);
        link.click();
        link.remove();
      })
      .catch((error) => {
        callError(error);
      });
  } else {
    alert("파일다운로드 실패");
  }
};
