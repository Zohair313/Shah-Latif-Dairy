// Formatting and WhatsApp generation utilities for Shah Latif Dairy Hyderabad

export const formatPKR = (amount) => {
  if (amount === undefined || amount === null || isNaN(amount)) return "Rs. 0";
  return `Rs. ${Number(amount).toLocaleString("en-PK")}`;
};

/**
 * Generates an authentic, clean WhatsApp order text with line items, quantities,
 * customer information, address in Hyderabad, and total calculation.
 */
export const generateWhatsAppOrderUrl = ({
  cartItems = [],
  customer = {},
  orderType = "Delivery",
  deliveryFee = 100,
  subtotal = 0,
  grandTotal = 0,
  specialNotes = ""
}) => {
  const phoneNumber = "923463822668";

  let message = `🥛 *NEW ORDER - SHAH LATIF DAIRY HYDERABAD*\n`;
  message += `━━━━━━━━━━━━━━━━━━━━━\n`;
  message += `📍 *Branch:* Latifabad Unit 7, Main Road\n`;
  message += `🕒 *Date:* ${new Date().toLocaleDateString("en-PK", { day: "numeric", month: "short", year: "numeric", hour: "2-digit", minute: "2-digit" })}\n`;
  message += `━━━━━━━━━━━━━━━━━━━━━\n\n`;

  message += `🛒 *ORDER ITEMS:*\n`;
  cartItems.forEach((item, index) => {
    message += `${index + 1}. *${item.name}*\n`;
    message += `   • Portion: ${item.portionLabel || "Standard"}\n`;
    message += `   • Quantity: ${item.quantity} x ${formatPKR(item.unitPrice)} = *${formatPKR(item.lineTotal)}*\n`;
  });

  message += `\n💰 *BILLING SUMMARY:*\n`;
  message += `• Subtotal: ${formatPKR(subtotal)}\n`;
  if (orderType === "Delivery") {
    message += `• Hyderabad Delivery: ${deliveryFee === 0 ? "FREE (Order over Rs. 1,500)" : formatPKR(deliveryFee)}\n`;
  } else {
    message += `• Order Type: Store Pickup (Latifabad Unit 7 Counter)\n`;
  }
  message += `• *Grand Total: ${formatPKR(grandTotal)}*\n\n`;

  message += `👤 *CUSTOMER DETAILS:*\n`;
  message += `• Name: ${customer.name || "Customer"}\n`;
  message += `• Contact Phone: ${customer.phone || "Not provided"}\n`;

  if (orderType === "Delivery") {
    message += `• Hyderabad Area: ${customer.area || "Latifabad"}\n`;
    message += `• Delivery Address: ${customer.address || "Please contact for exact location pin"}\n`;
  } else {
    message += `• Pickup: Self Collection at Main Latifabad Branch\n`;
  }

  if (specialNotes) {
    message += `• Special Instructions: ${specialNotes}\n`;
  }

  message += `\n━━━━━━━━━━━━━━━━━━━━━\n`;
  message += `_Please confirm my order and let me know estimated delivery time. Shukriya!_`;

  const encoded = encodeURIComponent(message);
  return `https://wa.me/${phoneNumber}?text=${encoded}`;
};

/**
 * Single-product quick WhatsApp message for direct 1-click ordering from product card
 */
export const generateSingleProductWhatsAppUrl = (product, portion) => {
  const phoneNumber = "923463822668";
  const price = portion?.priceOverride || (product.basePrice * (portion?.multiplier || 1));
  const portionLabel = portion?.label || `1 ${product.unit}`;

  let message = `Salam Shah Latif Dairy,\n\n`;
  message += `I would like to order:\n`;
  message += `🥛 *${product.name}* (${product.nameUrdu})\n`;
  message += `• Portion: *${portionLabel}*\n`;
  message += `• Price: *${formatPKR(price)}*\n\n`;
  message += `📍 I am located in Hyderabad. Please share delivery time and confirm availability.\nShukriya!`;

  return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
};

