import { uncapilizeString } from "./string";
// language.key="fa"
export const ln = message => {
  if (!message || typeof message != "string") return message;
  if (language && language.messages) {
    if (!language.messages[message]) {
      return (
        (language.messages[message.toLowerCase()] &&
          language.messages[message.toLowerCase()][language.key]) ||
        message
      );
    }
    return language.messages[message][language.key];
  }
};
export const dir = dir => {
  return (language && language[dir] && language[dir][language.key]) || dir;
};
export const swip = (str1, str2) => {
  if (language.key == "fa") {
    return ln(str1) + " " + ln(str2);
  } else {
    return ln(str2) + " " + ln(str1);
  }
};
export const language = {
  key:
    (localStorage &&
      localStorage.getItem("language") &&
      localStorage.getItem("language").toLowerCase()) ||
    "fa",
  locale: { fa: "fa-IR", en: "en-US" },
  direction: { fa: "rtl", en: "ltr" },
  align: { fa: "right", en: "left" },
  reverseAlign: { fa: "left", en: "right" },
  margin: { fa: "marginRight", en: "marginLeft" },
  name: { fa: "farsi", en: "english" },
  messages: {
    // general
    shopp: { fa: "شاپ", en: "shopp" },
    ezpay: { fa: "ایزی پی ", en: "ezpay" },
    rial: { fa: "ریال", en: "rial" },
    toman: { fa: "تومان", en: "toman" },
    rialZero: { fa: "هزار ریال", en: "rial" },
    reports: { fa: "گزارشات", en: "reports" },
    loading: { fa: "بارگذاری", en: "Loading" },
    loginMsg: { fa: "لطفا شماره تلفن همراه خود را وارد نمایید ", en: "Login" },
    loginPhone: { fa: "شماره تلفن همراه ", en: "Phone number" },
    loginSendSms: { fa: "ارسال پیام", en: "Phone number" },
    sendCode: { fa: "ارسال کد", en: "" },
    sendCodeMSG: {
      fa: "کد فعال سازی به شماره 09127607694 ارسال گردید",
      en: "Phone number"
    },
    editPhone: { fa: "ویرایش شماره", en: "Phone number" },
    confirmCode: { fa: "تایید کد دریافتی", en: "Phone number" },
    resendCode: { fa: "ارسال مجدد کد", en: "Phone number" }
  }
};
