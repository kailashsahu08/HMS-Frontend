import React, { useState, useMemo } from "react";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../../../Components/payment/CheckoutForm";
import Modal from "../../../Components/common/modal/modal";
import { toast } from "react-toastify";

const Appointment = ({ doctor, baseUrl, stripePromise }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [patientName, setPatientName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [description, setDescription] = useState("");
  const [appointmentType, setAppointmentType] = useState("in-person");
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [clientSecret, setClientSecret] = useState("");

  const getDayName = (date) => {
    const days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    return days[date.getDay()];
  };

  const isDoctorAvailable = (date) => {
    if (!doctor?.availability_schedule) return false;
    const dayName = getDayName(date);
    const daySchedule = doctor.availability_schedule.find(schedule => schedule.day_name === dayName);
    return daySchedule?.isAvailable === true;
  };

  const getAvailableTimeSlots = (date) => {
    if (!doctor?.availability_schedule) return [];
    const dayName = getDayName(date);
    const daySchedule = doctor.availability_schedule.find(schedule => schedule.day_name === dayName);
    if (!daySchedule || daySchedule.isAvailable !== true) return [];
  
    const intervals = daySchedule.time_intervals.map(interval => 
      `${interval.start_time.slice(0,5)} - ${interval.end_time.slice(0,5)}`
    );
  
    return intervals;
  };

  const generateCalendar = (year, month) => {
    const firstDay = new Date(year, month, 1);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate()-firstDay.getDay());
    const today = new Date(); today.setHours(0,0,0,0);
    let days = [];
    for(let i=0; i<42; i++){
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      days.push({
        date,
        isCurrentMonth: date.getMonth() === month,
        isPast: date < today,
        isAvailable: isDoctorAvailable(date)
      });
    }
    return days;
  };

  const calendarDays = useMemo(() => generateCalendar(currentDate.getFullYear(), currentDate.getMonth()), [currentDate, doctor]);

  const handleDateSelect = (dateObj) => {
    if(dateObj.isCurrentMonth && !dateObj.isPast){
      const y = dateObj.date.getFullYear();
      const m = String(dateObj.date.getMonth()+1).padStart(2,"0");
      const d = String(dateObj.date.getDate()).padStart(2,"0");
      setSelectedDate(`${y}-${m}-${d}`);
      setSelectedTime("");
    }
  };

  const selectedDateObj = selectedDate ? new Date(selectedDate) : null;
  const availableTimeSlots = selectedDateObj ? getAvailableTimeSlots(selectedDateObj) : [];

  const resetFormData= () =>{
    setAppointmentType("in-person");
    setDescription("");
    setPatientName("");
    setPhoneNumber("");
    setSelectedDate("");
    setSelectedTime("");
  }

  const handleBookClick = async () => {
    if (!selectedDate) { alert("Please select a date"); return; }
    if (!selectedTime) { alert("Please select a time slot"); return; }
    if (!patientName || !phoneNumber) { alert("Please fill in all required fields"); return; }
    if (!appointmentType) { alert("Please select appointment type"); return; }

    // Arrange form data
    const appointmentData = {
        doctor_id: doctor.id,
        department_id: doctor.department_id,
        appointment_date: selectedDate,
        appointment_time: selectedTime,
        patient_name: patientName,
        phone_number: phoneNumber,
        description: description,
        appointment_type: appointmentType,
        status: "pending"
    };
    try {
        // Step 1: Create appointment
        const appointmentRes = await fetch(`${baseUrl}/api/appointments`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(appointmentData),
        });
    
        if (!appointmentRes.ok) {
          const errorData = await appointmentRes.json();
          throw new Error(errorData.message || "Failed to create appointment");
        }
    
        const appointment = await appointmentRes.json();
        if (appointment) {
            resetFormData();
            toast.success("Appointment created successfully!");
          }
      
    
        // Step 2: Create payment intent
        // const res = await fetch(`${baseUrl}/api/create-payment-intent`, {
        //   method: "POST",
        //   headers: { "Content-Type": "application/json" },
        //   body: JSON.stringify({ amount: doctor.consultation_fee }),
        // });
    
        // const data = await res.json();
        // setClientSecret(data.clientSecret);
        // setShowPaymentModal(true);
      } catch (error) {
        toast.error("Something went wrong while booking appointment.");
      }
  };

  const handleSubmit = () => {
    if (!selectedDate) { alert("Please select a date"); return; }
    if (!selectedTime) { alert("Please select a time slot"); return; }
    if (!patientName || !phoneNumber){ alert("Please fill in all required fields"); return; }

    const data = { selectedDate, selectedTime, patientName, phoneNumber, description };
    console.log(data);
  };

  return (
    <div className="bg-white rounded-3xl p-6 shadow-xl sticky top-8">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Book Appointment</h2>
        <p className="text-gray-600">Choose your preferred date and time</p>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-bold text-gray-700 mb-3">Select Date</label>
        <div className="bg-gray-50 p-4 rounded-xl border border-gray-200">
          <div className="flex justify-between items-center mb-4">
            <button type="button" className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
              onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1))}>◀</button>
            <h3 className="font-bold text-lg">{currentDate.toLocaleDateString("en-US",{month:"long",year:"numeric"})}</h3>
            <button type="button" className="p-2 hover:bg-gray-200 rounded-lg transition-colors"
              onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1))}>▶</button>
          </div>

          <div className="grid grid-cols-7 gap-1 mb-2 text-xs font-semibold text-gray-500">
            {["Sun","Mon","Tue","Wed","Thu","Fri","Sat"].map(day => (<div key={day} className="text-center py-2">{day}</div>))}
          </div>

          <div className="grid grid-cols-7 gap-2">
            {calendarDays.map((d, i) => {
              const dateStr = `${d.date.getFullYear()}-${String(d.date.getMonth()+1).padStart(2,"0")}-${String(d.date.getDate()).padStart(2,"0")}`;
              return (
                <div key={i} onClick={() => handleDateSelect(d)} className={`aspect-square flex items-center justify-center rounded-xl text-sm font-bold cursor-pointer transition-all duration-200 ${
                  !d.isCurrentMonth ? "text-gray-300 cursor-not-allowed"
                  : d.isPast ? "bg-gray-100 text-gray-400 cursor-not-allowed line-through"
                  : !d.isAvailable ? "bg-red-100 text-red-600 cursor-not-allowed border border-red-300 hover:bg-red-150"
                  : "bg-gradient-to-b from-green-50 to-green-100 border border-green-300 shadow-sm hover:shadow-md"
                } ${selectedDate === dateStr ? "bg-gradient-to-b from-green-600 to-green-700 text-white shadow-lg transform scale-110 border-green-500" : ""}`}>
                  {d.date.getDate()}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-700 mb-3">Available Time Slots</label>
        {selectedDate ? (
          availableTimeSlots.length > 0 ? (
            <div className="grid grid-cols-1 rounded-lg gap-2 overflow-hidden">
              {availableTimeSlots.map((time, idx) => (
                <button key={idx} type="button" onClick={() => setSelectedTime(time)} className={`p-3 text-sm text-center border-2 rounded-lg cursor-pointer transition-all font-medium ${
                  selectedTime === time ? "bg-green-600 text-white border-green-600 shadow-lg scale-105" : "border-gray-300 hover:border-green-500 hover:bg-blue-50 hover:scale-102"
                }`}>{time}</button>
              ))}
            </div>
          ) : (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-center">
              <div className="text-red-500 text-3xl mb-2">🚫</div>
              <p className="text-red-700 font-semibold">Doctor not available on {getDayName(selectedDateObj)}</p>
              <p className="text-red-600 text-sm mt-1">Please select another date</p>
            </div>
          )
        ) : (
          <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-center">
            <div className="text-green-500 text-3xl mb-2">📅</div>
            <p className="text-black font-medium">Please select a date first</p>
          </div>
        )}
      </div>

      <div className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Patient Name *</label>
          <input type="text" required value={patientName} onChange={e => setPatientName(e.target.value)} className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors" placeholder="Enter patient name" />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number *</label>
          <input type="tel" required value={phoneNumber} onChange={e => setPhoneNumber(e.target.value)} className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-colors" placeholder="Enter phone number" />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-2">Brief Description</label>
          <textarea rows="3" value={description} onChange={e => setDescription(e.target.value)} className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 resize-none transition-colors" placeholder="Describe your symptoms (optional)" />
        </div>
        <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Appointment Type *</label>
            <div className="grid grid-cols-2 gap-3">
                <button
                type="button"
                onClick={() => setAppointmentType("in-person")}
                className={`p-3 text-sm text-center border-2 rounded-lg font-medium transition-all ${
                    appointmentType === "in-person"
                    ? "bg-green-600 text-white border-green-600 shadow-lg"
                    : "border-gray-300 hover:border-green-500 hover:bg-green-50"
                }`}
                >
                In-Person
                </button>
                <button
                type="button"
                onClick={() => setAppointmentType("virtual")}
                className={`p-3 text-sm text-center border-2 rounded-lg font-medium transition-all ${
                    appointmentType === "virtual"
                    ? "bg-green-600 text-white border-green-600 shadow-lg"
                    : "border-gray-300 hover:border-green-500 hover:bg-green-50"
                }`}
                >
                Virtual
                </button>
            </div>
        </div>
      </div>

      <button type="button" onClick={handleBookClick} className="w-full py-4 px-6 rounded-xl text-white font-bold text-lg bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 transition-all transform hover:scale-105 shadow-lg">
        Book Appointment - ₹{parseFloat(doctor.consultation_fee).toFixed(0)}
      </button>

      <p className="text-xs text-gray-500 text-center mt-3">You will receive a confirmation call within 2 hours</p>

      {showPaymentModal && (
        <Modal title={"Payment Modal"} onClose={() => setShowPaymentModal(false)}>
          <Elements stripe={stripePromise} options={{ clientSecret }}>
            <CheckoutForm onPaymentSuccess={handleSubmit} onClose={() => setShowPaymentModal(false)} />
          </Elements>
        </Modal>
      )}
    </div>
  );
};

export default Appointment;
