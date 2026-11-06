import React from 'react';
import { 
  Printer, 
  MessageSquare, 
  CheckCircle2, 
  X
} from 'lucide-react';
import { formatPKR } from '../../utils/formatters';

export default function PosReceiptModal({ receiptData, onClose, onShowToast }) {
  if (!receiptData) return null;

  const {
    orderNumber,
    timestamp,
    cashierName = "Counter #1 (Latifabad)",
    orderType = "Walk-in Counter",
    paymentMethod = "Cash",
    items = [],
    subtotal = 0,
    packagingFee = 0,
    discount = 0,
    grandTotal = 0,
    amountTendered = 0,
    changeDue = 0,
    customerName,
    customerPhone
  } = receiptData;

  const handlePrint = () => {
    window.print();
    if (onShowToast) {
      onShowToast({
        type: 'success',
        title: 'Thermal Print Command Sent',
        message: `Order #${orderNumber} printed on 80mm receipt printer.`
      });
    }
  };

  const handleSendWhatsAppReceipt = () => {
    let msg = `🧾 *RECEIPT: SHAH LATIF DAIRY HYDERABAD*\n`;
    msg += `Receipt #${orderNumber}\n`;
    msg += `Date: ${timestamp}\n`;
    msg += `Branch: Main Road, Latifabad Unit 7\n`;
    msg += `━━━━━━━━━━━━━━━━━━━━━\n`;
    items.forEach((it, idx) => {
      msg += `${idx + 1}. ${it.name} (${it.portionLabel}) x${it.quantity} = ${formatPKR(it.unitPrice * it.quantity)}\n`;
    });
    msg += `━━━━━━━━━━━━━━━━━━━━━\n`;
    msg += `*TOTAL: ${formatPKR(grandTotal)}*\n`;
    msg += `Payment Method: ${paymentMethod}\n`;
    if (amountTendered > grandTotal) {
      msg += `Cash Received: ${formatPKR(amountTendered)} | Change: ${formatPKR(changeDue)}\n`;
    }
    msg += `\nThank you for choosing authentic Sindhi Dairy!`;

    const cleanPhone = (customerPhone || "").replace(/[^0-9]/g, '');
    const targetUrl = cleanPhone 
      ? `https://wa.me/${cleanPhone.startsWith('92') ? cleanPhone : '92' + cleanPhone.replace(/^0/, '')}?text=${encodeURIComponent(msg)}`
      : `https://wa.me/?text=${encodeURIComponent(msg)}`;

    window.open(targetUrl, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-xs flex items-center justify-center p-2.5 sm:p-4">
      <div className="bg-white rounded-3xl max-w-md w-full shadow-2xl border border-stone-200 overflow-hidden animate-in zoom-in-95 duration-200 max-h-[92vh] flex flex-col">
        
        {/* Top Control Bar (Screen only) */}
        <div className="no-print bg-[#2C221E] text-white p-3 sm:p-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2 min-w-0">
            <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400 shrink-0" />
            <div className="min-w-0">
              <h3 className="font-bold text-xs sm:text-sm truncate">Order Completed Successfully!</h3>
              <p className="text-[10px] sm:text-[11px] text-stone-300">Order #{orderNumber}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-stone-300 hover:text-white p-1 rounded-lg shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* The 80mm Thermal Receipt Canvas */}
        <div id="printable-receipt" className="p-4 sm:p-6 bg-white text-black font-mono text-xs space-y-3 sm:space-y-4 overflow-y-auto flex-1">
          
          {/* Header */}
          <div className="text-center space-y-1">
            <p className="text-xs sm:text-sm font-urdu">بِسْمِ اللَّهِ الرَّحْمَٰنِ الرَّحِيمِ</p>
            <h2 className="font-extrabold text-sm sm:text-base uppercase tracking-tight">
              SHAH LATIF DAIRY
            </h2>
            <p className="text-[10px] sm:text-[11px] font-sans font-bold">HYDERABAD • SINDH</p>
            <p className="text-[9px] sm:text-[10px]">Main Road, Latifabad Unit 7, Hyderabad</p>
            <p className="text-[9px] sm:text-[10px]">Tel / WhatsApp: +92 346 3822668</p>
            <p className="text-[8px] sm:text-[9px] text-stone-600">Pure Buffalo Milk • Lachha Rabri • Bilona Ghee</p>
          </div>

          <div className="border-t border-dashed border-black/60 my-2"></div>

          {/* Metadata */}
          <div className="text-[10px] sm:text-[11px] space-y-0.5">
            <div className="flex justify-between">
              <span>Receipt #:</span>
              <strong className="font-bold">{orderNumber}</strong>
            </div>
            <div className="flex justify-between">
              <span>Date & Time:</span>
              <span>{timestamp}</span>
            </div>
            <div className="flex justify-between">
              <span>Cashier / Terminal:</span>
              <span>{cashierName}</span>
            </div>
            <div className="flex justify-between">
              <span>Order Type:</span>
              <span className="font-bold">{orderType}</span>
            </div>
            {customerName && (
              <div className="flex justify-between">
                <span>Customer:</span>
                <span>{customerName} {customerPhone ? `(${customerPhone})` : ''}</span>
              </div>
            )}
          </div>

          <div className="border-t border-dashed border-black/60 my-2"></div>

          {/* Itemized Table */}
          <div className="space-y-1 sm:space-y-1.5">
            <div className="grid grid-cols-12 text-[9px] sm:text-[10px] font-bold uppercase pb-1 border-b border-black">
              <span className="col-span-6">Item / Portion</span>
              <span className="col-span-2 text-center">Qty</span>
              <span className="col-span-2 text-right">Rate</span>
              <span className="col-span-2 text-right">Total</span>
            </div>

            {items.map((it, idx) => (
              <div key={idx} className="grid grid-cols-12 text-[10px] sm:text-[11px] py-0.5">
                <div className="col-span-6 leading-tight pr-1">
                  <div className="font-bold truncate">{it.name}</div>
                  <div className="text-[8px] sm:text-[9px] text-stone-600">{it.portionLabel}</div>
                </div>
                <div className="col-span-2 text-center">{it.quantity}</div>
                <div className="col-span-2 text-right">{it.unitPrice}</div>
                <div className="col-span-2 text-right font-bold">{it.unitPrice * it.quantity}</div>
              </div>
            ))}
          </div>

          <div className="border-t border-dashed border-black/60 my-2"></div>

          {/* Summary Breakdown */}
          <div className="space-y-0.5 sm:space-y-1 text-[10px] sm:text-[11px]">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>{formatPKR(subtotal)}</span>
            </div>
            {packagingFee > 0 && (
              <div className="flex justify-between">
                <span>Packaging / Matka:</span>
                <span>+{formatPKR(packagingFee)}</span>
              </div>
            )}
            {discount > 0 && (
              <div className="flex justify-between text-stone-600">
                <span>Special Discount:</span>
                <span>-{formatPKR(discount)}</span>
              </div>
            )}
            <div className="flex justify-between text-xs sm:text-sm font-black border-t border-black pt-1 mt-1">
              <span>GRAND TOTAL:</span>
              <span>{formatPKR(grandTotal)}</span>
            </div>
          </div>

          <div className="border-t border-dashed border-black/60 my-2"></div>

          {/* Payment & Change Tendered */}
          <div className="space-y-0.5 text-[10px] sm:text-[11px]">
            <div className="flex justify-between">
              <span>Payment Mode:</span>
              <strong className="uppercase">{paymentMethod}</strong>
            </div>
            {amountTendered > 0 && (
              <>
                <div className="flex justify-between">
                  <span>Cash Tendered:</span>
                  <span>{formatPKR(amountTendered)}</span>
                </div>
                <div className="flex justify-between font-bold text-[11px] sm:text-xs">
                  <span>Change Returned:</span>
                  <span>{formatPKR(changeDue)}</span>
                </div>
              </>
            )}
          </div>

          <div className="border-t border-dashed border-black/60 my-2"></div>

          {/* Barcode & Footer Note */}
          <div className="text-center space-y-1 pt-1">
            <div className="h-7 sm:h-8 bg-stone-100 flex items-center justify-center font-mono tracking-widest text-[10px] sm:text-xs border border-dashed border-stone-400">
              ||| |||| | ||||| ||| || |||||| |
            </div>
            <p className="text-[9px] sm:text-[10px] font-bold">
              Thank You for Trusting Pure Quality!
            </p>
            <p className="text-[8px] sm:text-[9px] text-stone-500">
              Keep milk and rabri refrigerated below 4°C.
            </p>
          </div>

        </div>

        {/* Bottom Actions Bar (Screen only) */}
        <div className="no-print p-3 sm:p-4 bg-stone-50 border-t border-stone-200 space-y-2 shrink-0">
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={handlePrint}
              className="py-2.5 px-3 rounded-xl bg-[#2C221E] hover:bg-stone-900 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-xs"
            >
              <Printer className="w-3.5 h-3.5 text-amber-400" />
              <span>Print Slip</span>
            </button>

            <button
              onClick={handleSendWhatsAppReceipt}
              className="py-2.5 px-3 rounded-xl bg-[#059669] hover:bg-[#047857] text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-xs"
            >
              <MessageSquare className="w-3.5 h-3.5 fill-white/20" />
              <span>WhatsApp Slip</span>
            </button>
          </div>

          <button
            onClick={onClose}
            className="w-full py-1.5 sm:py-2 rounded-xl text-stone-600 hover:text-stone-900 text-xs font-semibold hover:bg-stone-200/50 transition-colors"
          >
            Done / Next Customer
          </button>
        </div>

      </div>
    </div>
  );
}
