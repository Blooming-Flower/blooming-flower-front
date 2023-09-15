import { $GET, $POST } from "@utils/request";

//지문 중복 검증
export const checkPassage = (
  passageType: string,
  passageYear: string,
  passageName: string,
  passageUnit: string,
  passageNumber: string
) => {
  $GET(
    "/api/v1/passage/check/exist/passage?passageType=" +
      passageType +
      "&passageYear=" +
      passageYear +
      "&passageName=" +
      passageName +
      "&passageUnit=" +
      passageUnit +
      "&passageNumber=" +
      passageNumber,
    (res: any) => {
      return res;
    }
  );
};

//지문저장
export const savePassage = (
  passageType: string,
  passageYear: string,
  passageName: string,
  passageUnit: string,
  passageNum: string,
  passageContent: string
) => {
  $POST(
    "api/v1/passage/save",
    {
      passageType: passageType,
      passageYear: passageYear,
      passageName: passageName,
      passageUnit: passageUnit,
      passageNumber: passageNum,
      passageContent: passageContent,
    },
    (res: any) => {
      return res;
    }
  );
};
