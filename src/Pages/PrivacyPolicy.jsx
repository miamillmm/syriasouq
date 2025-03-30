import React from "react";
import Translate from "../utils/Translate";
import { useTranslation } from "react-i18next";

const PrivacyPolicy = () => {
  const { i18n } = useTranslation();
  const currentLanguage = i18n.language; // Gets current language

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-100 py-12 px-6 lg:px-28">
      <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-2xl p-10">
        {/* Header */}
        <h1 className="text-4xl font-extrabold text-center text-blue-700 mb-6">
          <Translate text={"Privacy Policy"} />
        </h1>
        <p className="text-gray-600 text-center mb-8 text-lg">
          <Translate
            text={
              "Your privacy is important to us. Please read our policy carefully."
            }
          />
        </p>

        {/* Content Sections */}
        <div className="space-y-10 text-gray-700">
          {/* Section 1: Introduction */}
          <section>
            <h2 className="text-2xl font-semibold text-blue-600 mb-4">
              <Translate text={"Introduction"} />
            </h2>
            <p>
              {currentLanguage === "ar"
                ? "خصوصيتك مهمة للغاية بالنسبة ل سيريا سوق. نحن ملتزمون بحماية بياناتك الشخصية وضمان الشفافية في كيفية جمعها واستخدامها"
                : "Your privacy is extremely important to SyriaSouq. We are committed to protecting your Personal Data and ensuring transparency about how we collect and use it."}
            </p>
          </section>

          {/* Section 2: Aggregated Data */}
          <section className="bg-gray-50 p-6 rounded-lg shadow-sm">
            <h2 className="text-2xl font-semibold text-blue-600 mb-4">
              <Translate text={`Aggregated Data`} />
            </h2>
            <p>
              <Translate
                text={`We collect, use, and share aggregated data, such as statistical or demographic data. While this data may be derived from your Personal Data, it does not reveal your identity.`}
              />
            </p>
          </section>

          {/* Section 3: Refusal to Provide Data */}
          <section>
            <h2 className="text-2xl font-semibold text-blue-600 mb-4">
              <Translate
                text={`What Happens If You Refuse to Provide Necessary Personal Data?`}
              />
            </h2>
            <p>
              <Translate
                text={`You do not have to provide any Personal Data. However, in cases where we need to process it to grant you access to our platform or comply with legal requirements, failure to provide it may limit your access.`}
              />
            </p>
          </section>

          {/* Section 4: Legal Basis */}
          <section className="bg-blue-50 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold text-blue-600 mb-4">
              <Translate
                text={`Legal Basis for Processing Your Personal Data`}
              />
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <span className="font-bold">
                  <Translate text={"Contractual Necessity:"} />
                </span>{" "}
                <Translate text={"To provide platform services."} />
              </li>
              <li>
                <span className="font-bold">
                  <Translate text={"Compliance with Law:"} />
                </span>{" "}
                <Translate text={"To meet legal obligations."} />
              </li>
              <li>
                <span className="font-bold">
                  <Translate text={"Consent:"} />
                </span>{" "}
                <Translate text={"For specific use cases (e.g., marketing)."} />
              </li>
            </ul>
          </section>

          {/* Section 5: Data Security */}
          <section>
            <h2 className="text-2xl font-semibold text-blue-600 mb-4">
              <Translate text={"How We Keep Your Personal Data Secure"} />
            </h2>
            <p>
              <Translate
                text={`We implement security measures to prevent unauthorized access, alteration, or loss of your data. Employees with access to your Personal Data are under confidentiality agreements.`}
              />
            </p>
          </section>

          {/* Section 6: Data Retention */}
          <section className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold text-blue-600 mb-4">
              <Translate text={"Data Retention"} />
            </h2>
            <p>
              <Translate
                text={`We retain your Personal Data only as long as necessary, unless required otherwise by law. Anonymized data may be stored indefinitely.`}
              />
            </p>
          </section>

          {/* Section 7: User Rights */}
          <section>
            <h2 className="text-2xl font-semibold text-blue-600 mb-4">
              <Translate text={`Your Rights Over Your Data`} />
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>
                <span className="font-bold">
                  <Translate text={"Access:"} />
                </span>{" "}
                <Translate text={"Request a copy of your data."} />
              </li>
              <li>
                <span className="font-bold">
                  <Translate text={"Correction:"} />
                </span>{" "}
                <Translate text={"Update incomplete or inaccurate data."} />
              </li>
              <li>
                <span className="font-bold">
                  <Translate text={"Deletion:"} />
                </span>{" "}
                <Translate text={"Request data removal."} />
              </li>
              <li>
                <span className="font-bold">
                  <Translate text={"Objection:"} />
                </span>{" "}
                <Translate text={"Restrict processing of your data."} />
              </li>
              <li>
                <span className="font-bold">
                  <Translate text={"Transfer:"} />
                </span>{" "}
                <Translate text={"Request data portability."} />
              </li>
            </ul>
          </section>

          {/* Section 8: Third-Party Links */}
          <section className="bg-red-50 p-6 rounded-lg shadow-sm">
            <h2 className="text-2xl font-semibold text-red-600 mb-4">
              <Translate text={"Third-Party Links"} />
            </h2>
            <p>
              <Translate
                text={`Our platform may include links to third-party websites. Clicking  on them may allow third parties to collect data. We are not responsible for their privacy practices.`}
              />
            </p>
          </section>

          {/* Section 9: Policy Updates */}
          <section>
            <h2 className="text-2xl font-semibold text-red-600 mb-4">
              <Translate text={`Changes to This Privacy Policy`} />
            </h2>
            <p>
              <Translate
                text={`We reserve the right to update this Privacy Policy at any time. Changes will be posted on this page, and we may notify you via email in certain cases.`}
              />
            </p>
          </section>

          {/* Contact Information */}
          <section className="text-center bg-gray-100 p-6 rounded-lg shadow-sm">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              {currentLanguage === "ar" ? "تواصل معنا" : "Contact Us"}
            </h2>
            <p className="text-gray-600">
              {currentLanguage === "ar"
                ? ":ألي مخاوف تتعلق بالخصوصية ، تواصل معنا على"
                : "For any privacy concerns, contact us at:"}
            </p>
            <p className="text-blue-700 font-semibold mt-2">
              <a href="mailto:syriasouq@outlook.com">syriasouq@outlook.com</a>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
