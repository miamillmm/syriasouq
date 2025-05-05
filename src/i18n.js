import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        welcome: "Welcome to my website",
        post: "User post",
        report: {
          title: "Report Listing",
          reasonLabel: "Reason for Report",
          reasonPlaceholder: "Select a reason",
          reasons: {
            inappropriate: "Inappropriate Content",
            spam: "Spam or Misleading",
            fraud: "Suspected Fraud",
            other: "Other"
          },
          descriptionLabel: "Description",
          descriptionPlaceholder: "Please provide details about the issue",
          contactLabel: "Contact Email",
          contactPlaceholder: "Your email for follow-up",
          phoneLabel: "Phone Number",
          phonePlaceholder: "Your phone number",
          fillRequiredFields: "Please fill in all required fields (reason, description, email, and phone)",
          submitError: "Error submitting report. Please try again.",
          cancel: "Cancel",
          submit: "Submit Report"
        },
        "Request OTP": "Request OTP",
        "Send OTP": "Send OTP",
        "Cancel": "Cancel",
        "Reset Password": "Reset Password",
        "OTP": "OTP",
        "New Password": "New Password",
        "Submit": "Submit"
      },
    },
    ar: {
      translation: {
        welcome: "مرحبًا بك في موقعي",
        post: "منشور المستخدم",
        report: {
          title: "الإبلاغ عن الإعلان",
          reasonLabel: "سبب الإبلاغ",
          reasonPlaceholder: "اختر سببًا",
          reasons: {
            inappropriate: "محتوى غير لائق",
            spam: "سبام أو مضلل",
            fraud: "اشتباه في الاحتيال",
            other: "أخرى"
          },
          descriptionLabel: "الوصف",
          descriptionPlaceholder: "يرجى تقديم تفاصيل حول المشكلة",
          contactLabel: "البريد الإلكتروني للتواصل",
          contactPlaceholder: "بريدك الإلكتروني للمتابعة",
          phoneLabel: "رقم الهاتف",
          phonePlaceholder: "رقم هاتفك",
          fillRequiredFields: "يرجى ملء جميع الحقول المطلوبة (السبب، الوصف، البريد الإلكتروني، ورقم الهاتف)",
          submitError: "خطأ في إرسال التقرير. يرجى المحاولة مرة أخرى.",
          cancel: "إلغاء",
          submit: "إرسال التقرير"
        },
        "Request OTP": "طلب رمز OTP",
        "Send OTP": "إرسال رمز OTP",
        "Cancel": "إلغاء",
        "Reset Password": "إعادة تعيين كلمة المرور",
        "OTP": "رمز OTP",
        "New Password": "كلمة المرور الجديدة",
        "Submit": "إرسال"
      },
    },
  },
  lng: "ar",
  fallbackLng: "ar",
  interpolation: { escapeValue: false },
});

export default i18n;