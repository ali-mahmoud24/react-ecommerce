import { Box, Typography, CircularProgress } from '@mui/material';
import { useCart } from '../hooks/useCart';
import { useState } from 'react';

export default function CartList() {
  const { cart, isLoading, deleteItem } = useCart();
  const [quantities, setQuantities] = useState<{ [key: string]: number }>({});

  if (isLoading)
    return (
      <Box textAlign="center" mt={4}>
        <CircularProgress />
      </Box>
    );

  if (!cart || cart.cartItems.length === 0)
    return (
      <Typography textAlign="center" mt={4}>
        Your cart is empty 🛒
      </Typography>
    );

  const handleQuantityChange = (id: string, value: number) => {
    if (value < 1) return; // prevent quantity < 1
    setQuantities((prev) => ({ ...prev, [id]: value }));
  };

  const handleDelete = (id: string) => {
    deleteItem(id);
  };

  // Compute total dynamically
  const totalPrice = cart.cartItems.reduce((sum, item) => {
    const qty = quantities[item.id] ?? item.quantity;
    return sum + item.price * qty;
  }, 0);

  return (
    <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th className="px-16 py-3">Image</th>
            <th className="px-6 py-3">Product</th>
            <th className="px-6 py-3">Qty</th>
            <th className="px-6 py-3">Price</th>
            <th className="px-6 py-3">Action</th>
          </tr>
        </thead>
        <tbody>
          {cart.cartItems.map((item) => (
            <tr
              key={item.id}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              <td className="p-4">
                <img
                  src={item.product.imageCoverUrl}
                  className="w-16 md:w-32 max-w-full max-h-full"
                  alt={item.product.title}
                />
              </td>
              <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                {item.product.title}
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center">
                  <button
                    type="button"
                    className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700"
                    onClick={() =>
                      handleQuantityChange(item.id, (quantities[item.id] ?? item.quantity) - 1)
                    }
                  >
                    <span className="sr-only">Decrease quantity</span>
                    <svg
                      className="w-3 h-3"
                      fill="none"
                      viewBox="0 0 18 2"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M1 1h16"
                      />
                    </svg>
                  </button>
                  <input
                    type="number"
                    value={quantities[item.id] ?? item.quantity}
                    onChange={(e) => handleQuantityChange(item.id, parseInt(e.target.value))}
                    className="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    min={1}
                  />
                  <button
                    type="button"
                    className="inline-flex items-center justify-center p-1 ms-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700"
                    onClick={() =>
                      handleQuantityChange(item.id, (quantities[item.id] ?? item.quantity) + 1)
                    }
                  >
                    <span className="sr-only">Increase quantity</span>
                    <svg
                      className="w-3 h-3"
                      fill="none"
                      viewBox="0 0 18 18"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 1v16M1 9h16"
                      />
                    </svg>
                  </button>
                </div>
              </td>
              <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                ${(item.price * (quantities[item.id] ?? item.quantity)).toFixed(2)}
              </td>
              <td className="px-6 py-4">
                <button
                  onClick={() => handleDelete(item.id)}
                  className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-1 focus:ring-red-200 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900 cursor-pointer"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          <tr>
            <td colSpan={3} className="text-right font-semibold">
              Total:
            </td>
            <td colSpan={2} className="font-semibold">
              ${totalPrice.toFixed(2)}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
