import { useEffect, useState } from "react";
import axios from "axios";

const Ngos = () => {
  const [ngos, setNgos] = useState([]);
  const [selectedNgo, setSelectedNgo] = useState(null);
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [donateCustom, setDonateCustom] = useState(false);
  const [selectedDonation, setSelectedDonation] = useState(null);

  const [customDonation, setCustomDonation] = useState({
    title: "",
    desc: "",
    category: "",
    quantity: "",
  });

  const [donationForm, setDonationForm] = useState({
    quantity: "",
    category: "",
    title: "",
    desc: "",
  });

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

  const fetchDonations = async (ngoId) => {
    setLoading(true);
    try {
      const response = await axios.post("http://localhost:8000/v1/donationreq/getdonationpostbyngo", {
        ngoid: ngoId,
      });
      setDonations(response.data.data);
    } catch (error) {
      console.error("Error fetching donations:", error);
      setDonations([]);
    }
    setLoading(false);
  };

  const openModal = (ngo) => {
    setSelectedNgo(ngo);
    fetchDonations(ngo._id);
    setModalOpen(true);
  };

  const handleCustomDonation = async (e) => {
    e.preventDefault();
    if (!customDonation.title || !customDonation.category || !customDonation.quantity) {
      return alert("Please fill in all required fields!");
    }

    try {
      await axios.post(
        "http://localhost:8000/v1/donationreqdocument/applytodonation",
        {
          donationreqId: null,
          ngoId: selectedNgo._id,
          title: customDonation.title,
          desc: customDonation.desc,
          category: customDonation.category,
          quantity: customDonation.quantity,
        },
        { withCredentials: true }
      );

      alert("Custom donation submitted successfully!");
      setCustomDonation({ title: "", desc: "", category: "", quantity: "" });
      setDonateCustom(false);
      fetchDonations(selectedNgo._id); // Refresh donation requests
    } catch (error) {
      console.error("Error submitting custom donation:", error.response?.data || error.message);
      alert("Failed to submit donation.");
    }
  };

  const handleDonateToRequest = async (e) => {
    e.preventDefault();
    if (!donationForm.quantity || !donationForm.category) {
      return alert("Please fill in all required fields!");
    }

    try {
      await axios.post(
        "http://localhost:8000/v1/donationreqdocument/applytodonation",
        {
          donationreqId: selectedDonation._id,
          ngoId: selectedNgo._id,
          title: donationForm.title,
          desc: donationForm.desc,
          category: donationForm.category,
          quantity: donationForm.quantity,
        },
        { withCredentials: true }
      );

      alert("Donation applied successfully!");
      setDonationForm({ quantity: "", category: "", title: "", desc: "" });
      setSelectedDonation(null);
    } catch (error) {
      console.error("Error applying for donation:", error.response?.data || error.message);
      alert("Failed to apply for donation.");
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen py-10 px-5">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-10">Registered NGOs</h1>

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

      {modalOpen && selectedNgo && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-8 max-w-3xl w-full rounded-lg relative">
            <button className="absolute top-4 right-4 text-gray-600 text-xl" onClick={() => setModalOpen(false)}>✖</button>

            <h2 className="text-3xl font-bold text-blue-600">{selectedNgo.username}</h2>
            <p className="text-gray-500">{selectedNgo.email}</p>
            <p className="text-gray-700 mt-2">{selectedNgo.bio}</p>
            <p className="text-gray-700 font-semibold mt-2">Location: {selectedNgo.location}</p>

            <div className="flex gap-4 mt-6">
              <button className={`px-4 py-2 rounded-lg ${!donateCustom ? 'bg-blue-600 text-white' : 'bg-gray-300'}`} onClick={() => setDonateCustom(false)}>
                Donate to Request
              </button>
              <button className={`px-4 py-2 rounded-lg ${donateCustom ? 'bg-blue-600 text-white' : 'bg-gray-300'}`} onClick={() => setDonateCustom(true)}>
                General Donation
              </button>
            </div>

            {donateCustom ? (
              <form className="mt-6" onSubmit={handleCustomDonation}>
                <h3 className="text-2xl font-bold">General Donation</h3>
                <input type="text" placeholder="Title" className="w-full p-2 mt-2 border rounded-lg" value={customDonation.title} onChange={(e) => setCustomDonation({ ...customDonation, title: e.target.value })} required />
                <input type="text" placeholder="Category" className="w-full p-2 mt-2 border rounded-lg" value={customDonation.category} onChange={(e) => setCustomDonation({ ...customDonation, category: e.target.value })} required />
                <input type="number" placeholder="Quantity" className="w-full p-2 mt-2 border rounded-lg" value={customDonation.quantity} onChange={(e) => setCustomDonation({ ...customDonation, quantity: e.target.value })} required />
                <button type="submit" className="mt-3 bg-blue-600 text-white px-4 py-2 rounded-lg w-full">Submit General Donation</button>
              </form>
            ) : (
              <div className="mt-6">
                <h3 className="text-2xl font-bold">Donation Requests</h3>
                {donations.map((donation) => (
                  <div key={donation._id} className="p-4 bg-gray-100 rounded-lg mt-2">
                    <h4 className="text-lg font-semibold">{donation.title}</h4>
                    <p className="text-gray-600">{donation.desc}</p>
                    
                    <form className="mt-6" onSubmit={handleCustomDonation}>
                <h3 className="text-2xl font-bold">General Donation</h3>
                <input type="text" placeholder="Title" className="w-full p-2 mt-2 border rounded-lg" value={customDonation.title} onChange={(e) => setCustomDonation({ ...customDonation, title: e.target.value })} required />
                <input type="text" placeholder="Category" className="w-full p-2 mt-2 border rounded-lg" value={customDonation.category} onChange={(e) => setCustomDonation({ ...customDonation, category: e.target.value })} required />
                <input type="number" placeholder="Quantity" className="w-full p-2 mt-2 border rounded-lg" value={customDonation.quantity} onChange={(e) => setCustomDonation({ ...customDonation, quantity: e.target.value })} required />
                <button className="mt-2 bg-green-500 text-white px-4 py-2 rounded-lg" onClick={() => setSelectedDonation(donation)}>Donate</button>
              </form>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Ngos;
