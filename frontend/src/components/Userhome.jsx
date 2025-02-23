import { useEffect, useState } from "react";

const Userhome = () => {
  const [stats, setStats] = useState({
    totalNGOs: 50,
    totalDonations: 500,
    activeUsers: 1000,
  });

  return (
    <div className="bg-gray-100">
      {/* Hero Section */}
      <section className="relative bg-blue-600 text-white py-20 px-5 text-center">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold mb-4">HelpHub – A Platform for Helping the Underprivileged</h1>
          <p className="text-lg">
            Connecting NGOs and kind-hearted donors to make a difference in the lives of those in need.
          </p>
        </div>
      </section>

      {/* Why This Project? */}
      <section className="py-16 px-5">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Why This Project?</h2>
          <p className="text-lg text-gray-600">
            Millions of people lack basic necessities like food, clothing, and shelter. Many NGOs work tirelessly to help them but face difficulties in reaching the right donors. This platform bridges the gap between donors and NGOs, making donations seamless and transparent.
          </p>
        </div>
      </section>

      {/* Who Benefits? */}
      <section className="bg-white py-16 px-5">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Who Benefits?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 shadow-lg rounded-lg bg-blue-50">
              <h3 className="text-xl font-semibold mb-2">Underprivileged People</h3>
              <p className="text-gray-600">They receive essential donations like food, clothes, and shelter.</p>
            </div>
            <div className="p-6 shadow-lg rounded-lg bg-blue-50">
              <h3 className="text-xl font-semibold mb-2">NGOs & Organizations</h3>
              <p className="text-gray-600">They get connected with potential donors and receive necessary support.</p>
            </div>
            <div className="p-6 shadow-lg rounded-lg bg-blue-50">
              <h3 className="text-xl font-semibold mb-2">Donors & Volunteers</h3>
              <p className="text-gray-600">They can contribute and make a difference in society with ease.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Features */}
      <section className="py-16 px-5">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Key Features</h2>
          <ul className="text-lg text-gray-600 space-y-4">
            <li>✅ View and support registered NGOs</li>
            <li>✅ Donate directly or respond to NGO requests</li>
            <li>✅ Secure and transparent transactions</li>
            <li>✅ Track donation history</li>
            <li>✅ Connect with NGOs and volunteers</li>
          </ul>
        </div>
      </section>

      {/* Statistics */}
      <section className="bg-blue-600 text-white py-16 px-5">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">Platform Impact</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-blue-500 rounded-lg">
              <h3 className="text-xl font-semibold">Total NGOs</h3>
              <p className="text-2xl font-bold">{stats.totalNGOs}+</p>
            </div>
            <div className="p-6 bg-blue-500 rounded-lg">
              <h3 className="text-xl font-semibold">Total Donations</h3>
              <p className="text-2xl font-bold">{stats.totalDonations}+</p>
            </div>
            <div className="p-6 bg-blue-500 rounded-lg">
              <h3 className="text-xl font-semibold">Active Users</h3>
              <p className="text-2xl font-bold">{stats.activeUsers}+</p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-5 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Join Us & Make a Difference!</h2>
        <button className="bg-blue-600 text-white px-6 py-3 rounded-lg text-lg font-semibold hover:bg-blue-700 transition">
          Get Started
        </button>
      </section>
    </div>
  );
};

export default Userhome;
