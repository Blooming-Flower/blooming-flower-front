import { useMediaQuery } from "@mui/material";

/**
 * <PRE>
 * 1. Name : LogErr
 * 2. Comment   : 에러 로그
 * 3. Author    : JSH
 * <PRE>
 */
export const LogErr = (error: any, message: string, targetName: string) => {
  console.log(`${message} error>> ${error} ... <${message}>`);
};

/**
 * <PRE>
 * 1. Name : LogInfo
 * 2. Comment   : 로그정보
 * 3. Author    : JSH
 * <PRE>
 */
export const LogInfo = (message: string) => {
  console.log(`Info >>> ${message}`);
};

/**
 * <PRE>
 * 1. Name : pad
 * 2. Comment   : 월, 일이 한자리인경우 앞에 0채워주기
 * 3. Author    : JSH
 * <PRE>
 */
export const pad = (num: string | number) => {
  return num.toString().length < 2 ? "0" + num : num;
};

/**
 * <PRE>
 * 1. Name : dateTerm
 * 2. Comment   : 당일을 YYYY-MM-DD hh24:ms:ss변환
 * 3. Author    : JSH
 * <PRE>
 */
export const makeFormatToday = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1);
  const day = pad(date.getDate());
  const hh = pad(date.getHours());
  const ms = pad(date.getMinutes());
  const ss = pad(date.getSeconds());

  return {
    year: year,
    month: month,
    day: day,
    full: year + "-" + pad(month) + "-" + day + " " + hh + ":" + ms + ":" + ss,
  };
};

/**
 * <PRE>
 * 1. Name : numNoCommas
 * 2. Comment   : 문자열(숫자) 콤마(,) 삭제
 * 3. Author    : JSH
 * <PRE>
 */
export const numNoCommas = (val: string) => {
  let value: string;

  val = val.replace(/[^0-9]/g, ""); // 입력값이 숫자가 아니면 공백
  value = val.replace(/,/g, ""); // ,값 공백처리

  return parseInt(value);
};

/**
 * <PRE>
 * 1. Name : numCommas
 * 2. Comment   : 문자열(숫자) 천단위로 (,) 찍기
 * 3. Author    : JSH
 * <PRE>
 */
export const numCommas = (val: number) => {
  const value = String(val).replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return value;
};

export const getViewSize = () => {
  const mobile = 600; //sm (small) : 600px ~ 960px
  const tablet = 960; //md (medium): 960px ~ 1280px
  const desktop = 1280; //lg (large) : 1280px ~ 1920px

  const isPc = useMediaQuery(`(min-width: ${desktop}px)`);
  const isTablet = useMediaQuery(
    `(min-width: ${tablet}px) and (max-width: ${desktop - 1}px)`
  );
  const isMobile = useMediaQuery(`(max-width: ${tablet - 1}px)`);

  let size;

  if (isPc) {
    size = "lg";
  } else if (isTablet) {
    size = "md";
  } else if (isMobile) {
    size = "sm";
  }

  return size;
};

/**
 * <PRE>
 * 1. Name : isNone
 * 2. Comment   : string 공백확인
 * 3. Author    : JSH
 * <PRE>
 */
export const isNone = (value: string | number) => {
  let temp = typeof value == "string" ? value : String(value);
  temp = temp.replace(/ /g, "");

  return temp == "" ? true : false;
};

/**
 * <PRE>
 * 1. Name : addId
 * 2. Comment   : Mui 그리드를 위한 id 생성기
 * 3. Author    : JSH
 * <PRE>
 */
export const addId = (res: any, yearData: string | undefined) => {
  for (let i = 0; i < res.data.content.length; i++) {
    res.data.content[i].id = i;
    res.data.content[i].year = yearData;
  }
  return res.data.content;
};

export const rowId = (res: any) => {
  for (let i = 0; i < res.data.length; i++) {
    res.data[i].id = i;
  }
  return res.data;
};
