import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { CheckCircleIcon } from "@heroicons/react/24/solid";
import { useCart } from "@/features/user/cart/hooks/useCart";

const PaymentSuccess: React.FC = () => {
  const navigate = useNavigate();
  const { clearAllItems } = useCart();

  useEffect(() => {
    clearAllItems({ suppressToast: true });
  }, [clearAllItems])

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.35 }}
        className="w-full max-w-md bg-white dark:bg-neutral-900 shadow-xl rounded-2xl p-6 text-center"
      >
        <CheckCircleIcon className="w-20 h-20 text-green-500 mx-auto mb-4" />

        <h1 className="text-2xl text-black font-bold mb-2">Payment Successful</h1>

        <p className="text-gray-600 dark:text-gray-300 mb-6">
          Your order is now being processed. Thank you for your purchase!
        </p>

        <button
          onClick={() => navigate("/")}
          className="w-full py-3 mb-3 rounded-lg font-semibold cursor-pointer
                    bg-black text-white dark:bg-white dark:text-black
                    hover:opacity-90 transition"
        >
          Back to Home
        </button>
      </motion.div>
    </div>
  );
};

export default PaymentSuccess;
