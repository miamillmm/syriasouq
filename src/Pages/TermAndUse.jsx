import React from "react";
import Translate from "../utils/Translate";

const TermsPage = () => {
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
              <Translate
                text={`SyriaSouq.com acts solely as a platform for vehicle advertisements and does not assume responsibility for any transactions or outcomes arising from the buying or selling of vehicles. We advise buyers to conduct direct communication with the seller, prior to any purchase.`}
              />
            </p>
          </section>

          {/* Section 2 */}
          <section>
            <h2 className="text-2xl font-semibold text-blue-600 mb-4">
              <Translate text={"Your Acceptance of These Terms"} />
            </h2>
            <p>
              <Translate
                text={`By accessing and using the Platform, you agree to these Terms of Use, which form a legally binding agreement between you and SyriaSouq. If you do not agree, you must stop using the Platform immediately.`}
              />
            </p>
          </section>

          {/* Section 3 */}
          <section className="bg-blue-50 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold text-blue-600 mb-4">
              <Translate text={`Changes to the Platform`} />
            </h2>
            <p>
              <Translate
                text={`SyriaSouq may modify the Platform and its Content at any time without notice to reflect changes in features, legal regulations, technology, or market practices.`}
              />
            </p>
          </section>

          {/* Section 4 */}
          <section>
            <h2 className="text-2xl font-semibold text-blue-600 mb-4">
              <Translate text={`SyriaSouq’s Responsibility for Listings`} />
            </h2>
            <p>
              <Translate
                text={`SyriaSouq does not monitor or moderate user listings. Any purchases or transactions on the Platform are solely between users, without SyriaSouq’s involvement.`}
              />
            </p>
          </section>

          {/* Section 5 */}
          <section className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold text-blue-600 mb-4">
              <Translate text={`Uploading Content to the Platform`} />
            </h2>
            <p>
              <Translate
                text={`Any content you upload is considered non-confidential. You grant SyriaSouq and its users a license to use, distribute, and display your content to enhance the platform experience.`}
              />
            </p>
          </section>

          {/* Section 6 */}
          <section>
            <h2 className="text-2xl font-semibold text-blue-600 mb-4">
              <Translate text={`Breach of These Terms`} />
            </h2>
            <p>
              <Translate
                text={`If you violate these Terms, SyriaSouq reserves the right to suspend your account, restrict access, or take legal action as necessary.`}
              />
            </p>
          </section>

          {/* Section 7 */}
          <section className="bg-red-50 p-6 rounded-lg shadow-sm">
            <h2 className="text-2xl font-semibold text-red-600 mb-4">
              <Translate text={`SyriaSouq’s Liability to You`} />
            </h2>
            <p>
              <Translate
                text={`The Platform and its Content are provided "as is" without
              warranties. SyriaSouq is not liable for business losses, data
              loss, or indirect damages resulting from your use of the Platform.`}
              />
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;
