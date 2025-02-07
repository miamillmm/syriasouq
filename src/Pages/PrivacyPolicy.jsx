import React from "react";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-gray-100 py-12 px-6 lg:px-28">
      <div className="max-w-5xl mx-auto bg-white shadow-xl rounded-2xl p-10">
        
        {/* Header */}
        <h1 className="text-4xl font-extrabold text-center text-blue-700 mb-6">
          Privacy Policy
        </h1>
        <p className="text-gray-600 text-center mb-8 text-lg">
          Your privacy is important to us. Please read our policy carefully.
        </p>

        {/* Content Sections */}
        <div className="space-y-10 text-gray-700">

          {/* Section 1: Introduction */}
          <section>
            <h2 className="text-2xl font-semibold text-blue-600 mb-4">
              Introduction
            </h2>
            <p>
              Your privacy is extremely important to <span className="font-bold">SyriaSouq</span>. We are committed to protecting your Personal Data and ensuring transparency about how we collect and use it.
            </p>
          </section>

          {/* Section 2: Aggregated Data */}
          <section className="bg-gray-50 p-6 rounded-lg shadow-sm">
            <h2 className="text-2xl font-semibold text-blue-600 mb-4">
              Aggregated Data
            </h2>
            <p>
              We collect, use, and share aggregated data, such as statistical or demographic data. While this data may be derived from your Personal Data, it does not reveal your identity.
            </p>
          </section>

          {/* Section 3: Refusal to Provide Data */}
          <section>
            <h2 className="text-2xl font-semibold text-blue-600 mb-4">
              What Happens If You Refuse to Provide Necessary Personal Data?
            </h2>
            <p>
              You do not have to provide any Personal Data. However, in cases where we need to process it to grant you access to our platform or comply with legal requirements, failure to provide it may limit your access.
            </p>
          </section>

          {/* Section 4: Legal Basis */}
          <section className="bg-blue-50 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold text-blue-600 mb-4">
              Legal Basis for Processing Your Personal Data
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li><span className="font-bold">Contractual Necessity:</span> To provide platform services.</li>
              <li><span className="font-bold">Compliance with Law:</span> To meet legal obligations.</li>
              <li><span className="font-bold">Consent:</span> For specific use cases (e.g., marketing).</li>
            </ul>
          </section>

          {/* Section 5: Data Security */}
          <section>
            <h2 className="text-2xl font-semibold text-blue-600 mb-4">
              How We Keep Your Personal Data Secure
            </h2>
            <p>
              We implement security measures to prevent unauthorized access, alteration, or loss of your data. Employees with access to your Personal Data are under confidentiality agreements.
            </p>
          </section>

          {/* Section 6: Data Retention */}
          <section className="bg-gray-50 p-6 rounded-lg">
            <h2 className="text-2xl font-semibold text-blue-600 mb-4">
              Data Retention
            </h2>
            <p>
              We retain your Personal Data only as long as necessary, unless required otherwise by law. Anonymized data may be stored indefinitely.
            </p>
          </section>

          {/* Section 7: User Rights */}
          <section>
            <h2 className="text-2xl font-semibold text-blue-600 mb-4">
              Your Rights Over Your Data
            </h2>
            <ul className="list-disc pl-6 space-y-2">
              <li><span className="font-bold">Access:</span> Request a copy of your data.</li>
              <li><span className="font-bold">Correction:</span> Update incomplete or inaccurate data.</li>
              <li><span className="font-bold">Deletion:</span> Request data removal.</li>
              <li><span className="font-bold">Objection:</span> Restrict processing of your data.</li>
              <li><span className="font-bold">Transfer:</span> Request data portability.</li>
            </ul>
          </section>

          {/* Section 8: Third-Party Links */}
          <section className="bg-red-50 p-6 rounded-lg shadow-sm">
            <h2 className="text-2xl font-semibold text-red-600 mb-4">
              Third-Party Links
            </h2>
            <p>
              Our platform may include links to third-party websites. Clicking on them may allow third parties to collect data. We are not responsible for their privacy practices.
            </p>
          </section>

          {/* Section 9: Policy Updates */}
          <section>
            <h2 className="text-2xl font-semibold text-red-600 mb-4">
              Changes to This Privacy Policy
            </h2>
            <p>
              We reserve the right to update this Privacy Policy at any time. Changes will be posted on this page, and we may notify you via email in certain cases.
            </p>
          </section>

          {/* Contact Information */}
          <section className="text-center bg-gray-100 p-6 rounded-lg shadow-sm">
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              Contact Us
            </h2>
            <p className="text-gray-600">For any privacy concerns, contact us at:</p>
            <p className="text-blue-700 font-semibold mt-2">
              <a href="mailto:syriasouq.shop@outlook.com">syriasouq.shop@outlook.com</a>
            </p>
          </section>

        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
