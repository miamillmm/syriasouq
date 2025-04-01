import React from "react";
import Translate from "../utils/Translate";
import { useTranslation } from "react-i18next";

const TermsPage = () => {
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language; // Gets current language

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 py-12 px-6 lg:px-28">
      <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-2xl p-10">
        {/* Header */}
        <h1 className="text-4xl font-extrabold text-center text-blue-700 mb-6">
          <Translate text={"Terms and Conditions"} />
        </h1>
        <p className="text-gray-600 text-center mb-8 text-lg">
          <Translate
            text={
              "Please read these terms carefully before using our platform."
            }
          />
        </p>

        {/* Content Sections */}
        <div className="space-y-10 text-gray-700">
          {/* Section 1 */}
          <section className="bg-gray-50 p-6 rounded-lg shadow-sm">
            <h2 className="text-2xl font-semibold text-blue-600 mb-4">
              <Translate text={"Introduction"} />
            </h2>
            <p>
              {currentLanguage === "ar"
                ? `موقع سيريا سوق هو منصة لإعلانات السيارات فقط، ولا يتحمل مسؤولية أي معاملات أو نتائج ناتجة عن شراء أو بيع السيارات. ننصح المشترين بالتواصل المباشر مع البائع قبل أي عملية شراء`
                : `SyriaSouq.com acts solely as a platform for vehicle advertisements and does not assume responsibility for any transactions or outcomes arising from the buying or selling of vehicles. We advise buyers to conduct direct communication with the seller, prior to any purchase.`}
            </p>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="text-2xl font-semibold text-blue-600 mb-4">
              <Translate text={"Your Acceptance of These Terms"} />
            </h2>
            <p>
              {currentLanguage === "ar"
                ? `بدخولك إلى المنصة واستخدامك لها، فإنك توافق على شروط الاستخدام هذه، والتي تُشكل اتفاقية ملزمة قانونًا بينك وبين سيريا سوق. في حال عدم موافقتك، يجب عليك التوقف عن استخدام المنصة فورًا`
                : `By accessing and using the Platform, you agree to these Terms of Use, which form a legally binding agreement between you and SyriaSouq. If you do not agree, you must stop using the Platform immediately.`}
            </p>
          </section>

          {/* Section 3 */}
          <section className="bg-blue-50 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold text-blue-600 mb-4">
              <Translate text={`Changes to the Platform`} />
            </h2>
            <p>
              {currentLanguage === "ar"
                ? `قد يقوم موقع سيريا سوق بتعديل المنصة ومحتواها في أي وقت دون إشعار لتعكس التغييرات في الميزات أو اللوائح القانونية أو التكنولوجيا أو ممارسات السوق.`
                : `SyriaSouq may modify the Platform and its Content at any time without notice to reflect changes in features, legal regulations, technology, or market practices.`}
            </p>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className="text-2xl font-semibold text-blue-600 mb-4">
              <Translate text={`SyriaSouq’s Responsibility for Listings`} />
            </h2>
            <p>
              {currentLanguage === "ar"
                ? `لا يراقب موقع سيريا سوريا قوائم المستخدمين أو يُشرف عليها بشكل مباشر. أي عمليات شراء أو معاملات على المنصة تتم بين المستخدمين فقط، دون أي تدخل من سوق سوريا`
                : `SyriaSouq does not monitor or moderate user listings. Any purchases or transactions on the Platform are solely between users, without SyriaSouq’s involvement.`}
            </p>
          </section>

          {/* Section 5 */}
          <section className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold text-blue-600 mb-4">
              {currentLanguage === "ar"
                ? `تحميل الاعلان على الموقع`
                : "Uploading Content to the Platform"}
            </h2>
            <p>
              {currentLanguage === "ar"
                ? `أي محتوى تُحمّله يُعتبر غير سري. أنت تمنح سوريا سوق ومستخدميها ترخيصًا لاستخدام وتوزيع وعرض محتواك لتحسين تجربة استخدام المنصة.`
                : "Any content you upload is considered non-confidential. You grant SyriaSouq and its users a license to use, distribute, and display your content to enhance the platform experience."}
            </p>
          </section>

          {/* Section 6 */}
          <section>
            <h2 className="text-2xl font-semibold text-blue-600 mb-4">
              <Translate text={`Breach of These Terms`} />
            </h2>
            <p>
              {currentLanguage === "ar"
                ? "في حال انتهاكك لهذه الشروط، تحتفظ سوريا سوق بالحق في تعليق حسابك أو تقييد الوصول إليه أو اتخاذ الإجراءات القانونية اللازمة."
                : "If you violate these Terms, SyriaSouq reserves the right to suspend your account, restrict access, or take legal action as necessary."}
            </p>
          </section>

          {/* Section 7 */}
          <section className="bg-red-50 p-6 rounded-lg shadow-sm">
            <h2 className="text-2xl font-semibold text-red-600 mb-4">
              {currentLanguage === "ar"
                ? `مسؤولية سيريا سوق تجاهك`
                : `SyriaSouq’s Liability to You`}
            </h2>
            <p>
              {currentLanguage === "ar"
                ? `ت المنصة ومحتواها "كما هي" دون أي ضمانات. سوريا سوق غير مسؤولة عن أي خسائر تجارية أو فقدان بيانات أو .أضرار غير مباشرة ناجمة عن استخدامك للمنصة`
                : `The Platform and its Content are provided "as is" without
              warranties. SyriaSouq is not liable for business losses, data
              loss, or indirect damages resulting from your use of the Platform.`}
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;
