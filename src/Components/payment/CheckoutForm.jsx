import { useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js";
import { useState } from "react";
import { X, CreditCard, Lock } from "lucide-react";

const CheckoutForm = ({ onPaymentSuccess, onClose, amount, currency = "USD" }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    setError(null);

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: window.location.href,
      },
      redirect: "if_required",
    });

    if (error) {
      setError(error.message);
      setLoading(false);
    } else if (paymentIntent && paymentIntent.status === "succeeded") {
      onPaymentSuccess();
      onClose();
    } else {
      setLoading(false);
    }
  };

  const formatAmount = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: currency,
    }).format(amount / 100);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg md:max-w-2xl w-full max-h-[95vh] overflow-auto">
        {/* Header */}
        <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-8 text-white">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 hover:bg-white hover:bg-opacity-20 rounded-full transition-all duration-200"
          >
            <X size={20} />
          </button>
          
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-3 bg-white bg-opacity-20 rounded-full">
              <CreditCard size={24} />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Secure Payment</h2>
              <p className="text-blue-100">Complete your purchase</p>
            </div>
          </div>
          
          {amount && (
            <div className="bg-white bg-opacity-10 rounded-lg p-4 backdrop-blur-sm">
              <div className="flex justify-between items-center">
                <span className="text-lg font-medium">Total Amount</span>
                <span className="text-2xl font-bold">{formatAmount(amount)}</span>
              </div>
            </div>
          )}
        </div>

        {/* Payment Form */}
        <div className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Security Badge */}
            <div className="flex items-center justify-center space-x-2 text-gray-600 text-sm mb-6">
              <Lock size={16} />
              <span>Secured by SSL encryption</span>
            </div>

            {/* Payment Element with card-only configuration */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Card Information
              </label>
              <div className="border border-gray-200 rounded-lg p-1 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-opacity-20 transition-all duration-200">
                <PaymentElement 
                  options={{
                    layout: 'tabs',
                    paymentMethodOrder: ['card'],
                    fields: {
                      billingDetails: 'never'
                    },
                    terms: {
                      card: 'never'
                    },
                    wallets: {
                      applePay: 'never',
                      googlePay: 'never'
                    }
                  }}
                />
              </div>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-r-lg">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-red-700">
                      <strong className="font-semibold">Payment Error:</strong> {error}
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={!stripe || loading}
              className={`w-full py-4 px-6 rounded-xl text-white font-semibold text-lg transition-all duration-200 transform ${
                loading
                  ? "bg-gray-400 cursor-not-allowed scale-95"
                  : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 hover:scale-105 shadow-lg hover:shadow-xl"
              }`}
            >
              {loading ? (
                <div className="flex justify-center items-center space-x-3">
                  <div className="relative">
                    <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  </div>
                  <span>Processing Payment...</span>
                </div>
              ) : (
                <div className="flex justify-center items-center space-x-2">
                  <Lock size={20} />
                  <span>Complete Payment</span>
                  {amount && <span>• {formatAmount(amount)}</span>}
                </div>
              )}
            </button>

            {/* Security Info */}
            <div className="text-center text-xs text-gray-500 space-y-1">
              <p>Your payment information is encrypted and secure</p>
              <div className="flex justify-center space-x-4 mt-2">
                <span className="px-2 py-1 bg-gray-100 rounded text-xs font-medium">256-bit SSL</span>
                <span className="px-2 py-1 bg-gray-100 rounded text-xs font-medium">PCI Compliant</span>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CheckoutForm;