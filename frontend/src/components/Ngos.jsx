import { useEffect, useState } from "react";
import axios from "axios";

const Ngos = () => {
  const [ngos, setNgos] = useState([]);
  const [selectedNgo, setSelectedNgo] = useState(null);
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [donateCustom, setDonateCustom] = useState(false);
  const [customDonation, setCustomDonation] = useState({
    title: "",
    desc: "",
    category: "",
    quantity: "",
  });

  // Fetch all NGOs
  useEffect(() => {
    const fetchNgos = async () => {
      try {
        const response = await axios.post("http://localhost:8000/v1/ngo/getallngos");
        setNgos(response.data.data);
      } catch (error) {
        console.error("Error fetching NGOs:", error);
      }
    };

    fetchNgos();
  }, []);

  // Fetch donation requests for a selected NGO
  const fetchDonations = async (ngoId) => {
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/api/donations/getDonation", {
        keyword: ngoId, // Searching by NGO ID
      });
      setDonations(response.data.data);
    } catch (error) {
      console.error("Error fetching donations:", error);
      setDonations([]);
    }
    setLoading(false);
  };

  // Open modal and fetch NGO details & donations
  const openModal = (ngo) => {
    setSelectedNgo(ngo);
    fetchDonations(ngo._id);
    setModalOpen(true);
  };

  // Handle Custom Donation Submission
  const handleCustomDonation = async () => {
    if (!customDonation.title || !customDonation.category || !customDonation.quantity) {
      return alert("Please fill in all required fields!");
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/donations/applyToDonation",
        {
          donationreqId: null, // No specific request, donating custom item
          ngoId: selectedNgo._id,
          title: customDonation.title,
          desc: customDonation.desc,
          category: customDonation.category,
          quantity: customDonation.quantity,
        },
        { withCredentials: true }
      );

      alert("Donation submitted successfully!");
      setCustomDonation({ title: "", desc: "", category: "", quantity: "" });
      setDonateCustom(false);
    } catch (error) {
      console.error("Error submitting donation:", error);
      alert("Failed to submit donation.");
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen py-10 px-5">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">Registered NGOs</h1>

        {/* NGOs List */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {ngos.map((ngo) => (
            <div
              key={ngo._id}
              className="p-6 bg-white shadow-lg rounded-lg hover:shadow-xl cursor-pointer transition"
              onClick={() => openModal(ngo)}
            >
              <h2 className="text-2xl font-semibold text-blue-600">{ngo.username}</h2>
              <p className="text-gray-600">{ngo.location}</p>
              <p className="text-gray-500 mt-2">{ngo.bio.slice(0, 80)}...</p>
              <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg">
                View Details
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Modal (Popup for NGO Details) */}
      {modalOpen && selectedNgo && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 max-w-3xl w-full rounded-lg relative">
            <button className="absolute top-4 right-4 text-gray-600 text-xl" onClick={() => setModalOpen(false)}>✖</button>
            
            {/* NGO Details */}
            <h2 className="text-3xl font-bold text-blue-600">{selectedNgo.username}</h2>
            <p className="text-gray-500">{selectedNgo.email}</p>
            <p className="text-gray-700 mt-2">{selectedNgo.bio}</p>
            <p className="text-gray-700 font-semibold mt-2">Location: {selectedNgo.location}</p>

            {/* Donation Requests */}
            <h3 className="text-2xl font-bold mt-6">Donation Requests</h3>
            {loading ? (
              <p className="text-gray-500">Loading donations...</p>
            ) : donations.length > 0 ? (
              <ul className="mt-4 space-y-4">
                {donations.map((donation) => (
                  <li key={donation._id} className="p-4 bg-gray-100 rounded-lg">
                    <h4 className="text-lg font-semibold">{donation.title}</h4>
                    <p className="text-gray-600">{donation.desc}</p>
                    <button className="mt-2 bg-green-500 text-white px-4 py-2 rounded-lg">
                      Apply for Donation
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500">No donation requests found.</p>
            )}

            {/* Donate What You Want Button */}
            <button
              className="mt-6 bg-orange-500 text-white px-4 py-2 rounded-lg w-full"
              onClick={() => setDonateCustom(true)}
            >
              Donate What You Want
            </button>

            {/* Custom Donation Form */}
            {donateCustom && (
              <div className="mt-4 p-4 bg-gray-100 rounded-lg">
                <h3 className="text-xl font-bold">Enter Your Donation</h3>
                <input
                  type="text"
                  placeholder="Title (e.g., Clothes, Food, Books)"
                  className="w-full p-2 mt-2 border border-gray-300 rounded-lg"
                  value={customDonation.title}
                  onChange={(e) => setCustomDonation({ ...customDonation, title: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Description (optional)"
                  className="w-full p-2 mt-2 border border-gray-300 rounded-lg"
                  value={customDonation.desc}
                  onChange={(e) => setCustomDonation({ ...customDonation, desc: e.target.value })}
                />
                <input
                  type="text"
                  placeholder="Category (e.g., Clothes, Food)"
                  className="w-full p-2 mt-2 border border-gray-300 rounded-lg"
                  value={customDonation.category}
                  onChange={(e) => setCustomDonation({ ...customDonation, category: e.target.value })}
                />
                <input
                  type="number"
                  placeholder="Quantity"
                  className="w-full p-2 mt-2 border border-gray-300 rounded-lg"
                  value={customDonation.quantity}
                  onChange={(e) => setCustomDonation({ ...customDonation, quantity: e.target.value })}
                />
                <button
                  className="mt-3 bg-blue-600 text-white px-4 py-2 rounded-lg w-full"
                  onClick={handleCustomDonation}
                >
                  Submit Donation
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Ngos;
