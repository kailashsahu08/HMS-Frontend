import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useJsApiLoader } from "@react-google-maps/api";
import { loadStripe } from "@stripe/stripe-js";
import DoctorDetail from "../../../Components/doctor/view/DoctorDetail";
import Appointment from "../../../Components/doctor/view/Appointment";

const ViewAppointment = () => {
  const { id } = useParams();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const baseUrl = import.meta.env.PUBLIC_BACKEND_URL || "http://localhost:8000";

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        setLoading(true);
        const res = await fetch(`${baseUrl}/api/doctors/${id}`);
        const data = await res.json();
        if (data.status && data.data) {
          setDoctor(data?.data);
        } else {
          setError("Doctor not found");
        }
      } catch (error) {
        setError("Failed to fetch doctor data");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchDoctor();
  }, [id]);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });

  const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

  if (loading) return <div>Loading doctor information...</div>;
  if (error || !doctor) return <div>{error || "Doctor not found."}</div>;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6 lg:p-10">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <DoctorDetail doctor={doctor} isLoaded={isLoaded} />
        </div>
        <div className="col-span-1">
          <Appointment doctor={doctor} baseUrl={baseUrl} stripePromise={stripePromise} />
        </div>
      </div>
    </div>
  );
};

export default ViewAppointment;
