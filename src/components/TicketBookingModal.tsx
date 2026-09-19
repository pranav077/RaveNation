import React, { useState } from 'react';
import { X, Ticket, ShieldCheck, CheckCircle2, CreditCard, ArrowRight, AlertTriangle, QrCode, Download, Sparkles } from 'lucide-react';
import { RaveEvent, Booking } from '../types';
import { useRave } from '../context/RaveContext';
import { useAuth } from '../context/AuthContext';

interface TicketBookingModalProps {
  event: RaveEvent;
  onClose: () => void;
  onViewTickets: () => void;
}

export const TicketBookingModal: React.FC<TicketBookingModalProps> = ({
  event,
  onClose,
  onViewTickets
}) => {
  const { createBooking } = useRave();
  const { user } = useAuth();

  const [step, setStep] = useState<'select' | 'attendee' | 'payment' | 'confirmed'>('select');
  
  // Selected tier quantities: { tierId: quantity }
  const [quantities, setQuantities] = useState<Record<string, number>>(() => {
    const initial: Record<string, number> = {};
    const firstAvailable = event.ticketTiers.find((t) => t.available > 0);
    if (firstAvailable) {
      initial[firstAvailable.id] = 1;
    }
    return initial;
  });

  // Attendee info
  const [fullName, setFullName] = useState(user?.name || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState('+48 501 234 567');
  const [ageConfirmed, setAgeConfirmed] = useState(true);
  const [agreedAwareness, setAgreedAwareness] = useState(true);

  // Payment state
  const [isProcessing, setIsProcessing] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState<Booking | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<'blik' | 'card'>('blik');
  const [blikCode, setBlikCode] = useState('739 104');
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 9102');
  const [cardExpiry, setCardExpiry] = useState('11/28');
  const [cardCvc, setCardCvc] = useState('831');

  // Calculate totals
  const selectedItems = event.ticketTiers
    .filter((tier) => (quantities[tier.id] || 0) > 0)
    .map((tier) => ({
      tierId: tier.id,
      tierName: tier.name,
      quantity: quantities[tier.id],
      price: tier.price
    }));

  const totalTickets = selectedItems.reduce((s, i) => s + i.quantity, 0);
  const subtotal = selectedItems.reduce((s, i) => s + i.price * i.quantity, 0);
  const serviceFee = totalTickets > 0 ? Math.round(subtotal * 0.05) : 0;
  const grandTotal = subtotal + serviceFee;

  const handleQuantityChange = (tierId: string, delta: number, maxAvailable: number) => {
    setQuantities((prev) => {
      const curr = prev[tierId] || 0;
      const next = Math.max(0, Math.min(maxAvailable, curr + delta));
      return { ...prev, [tierId]: next };
    });
  };

  const handleProceedToAttendee = () => {
    if (totalTickets === 0) return;
    setStep('attendee');
  };

  const handleProceedToPayment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !email) return;
    setStep('payment');
  };

  const handleConfirmBooking = async () => {
    setIsProcessing(true);
    try {
      // Simulate network / Stripe charge delay
      await new Promise((res) => setTimeout(res, 1200));

      const booking = await createBooking(
        event.id,
        { fullName, email, phone },
        selectedItems
      );

      setConfirmedBooking(booking);
      setStep('confirmed');
    } catch (err) {
      console.error(err);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div 
        className="w-full max-w-xl bg-[#11131c] border border-white/15 rounded-2xl shadow-2xl overflow-hidden text-left relative flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-white/10 flex items-center justify-between bg-gradient-to-r from-[#12141d] to-[#171a26]">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-[#c8ff00] text-black font-bold flex items-center justify-center">
              <Ticket className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-display font-bold text-base text-white truncate max-w-[280px] sm:max-w-md">
                {event.title}
              </h3>
              <p className="text-xs text-neutral-400">
                {event.date} • {event.venueName}, {event.cityName}
              </p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 text-neutral-400 hover:text-white rounded-lg hover:bg-white/5 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Steps Breadcrumb */}
        {step !== 'confirmed' && (
          <div className="grid grid-cols-3 border-b border-white/10 text-center text-xs font-mono py-2 bg-white/2">
            <span className={step === 'select' ? 'text-[#c8ff00] font-bold' : 'text-neutral-500'}>
              1. Select Tickets
            </span>
            <span className={step === 'attendee' ? 'text-[#c8ff00] font-bold' : 'text-neutral-500'}>
              2. Attendee Info
            </span>
            <span className={step === 'payment' ? 'text-[#c8ff00] font-bold' : 'text-neutral-500'}>
              3. Payment
            </span>
          </div>
        )}

        {/* Modal Content */}
        <div className="p-6 overflow-y-auto space-y-5 flex-1">
          {/* STEP 1: SELECT TICKETS */}
          {step === 'select' && (
            <div className="space-y-4">
              <div className="space-y-3">
                {event.ticketTiers.map((tier) => {
                  const isSoldOut = tier.available === 0;
                  const qty = quantities[tier.id] || 0;

                  return (
                    <div
                      key={tier.id}
                      className={`p-4 rounded-xl border transition ${
                        qty > 0
                          ? 'border-[#c8ff00] bg-[#c8ff00]/5'
                          : isSoldOut
                          ? 'border-white/5 bg-white/2 opacity-50'
                          : 'border-white/10 bg-white/5 hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center space-x-2">
                            <h4 className="text-sm font-bold text-white">{tier.name}</h4>
                            {tier.status === 'selling_fast' && !isSoldOut && (
                              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-300">
                                Only {tier.available} left
                              </span>
                            )}
                            {isSoldOut && (
                              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-red-500/20 text-red-400">
                                Sold Out
                              </span>
                            )}
                          </div>
                          <p className="text-xs text-neutral-400 mt-1">{tier.description}</p>
                          <div className="mt-2 text-sm font-mono font-bold text-[#c8ff00]">
                            {tier.price} PLN
                            {tier.originalPrice && (
                              <span className="text-xs text-neutral-500 line-through ml-2 font-normal">
                                {tier.originalPrice} PLN
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Quantity Counter */}
                        {!isSoldOut ? (
                          <div className="flex items-center space-x-2 bg-black/40 border border-white/10 rounded-lg p-1">
                            <button
                              type="button"
                              onClick={() => handleQuantityChange(tier.id, -1, tier.available)}
                              className="w-7 h-7 rounded flex items-center justify-center text-neutral-300 hover:text-white hover:bg-white/10 transition font-bold"
                            >
                              -
                            </button>
                            <span className="w-6 text-center font-mono font-bold text-white text-sm">
                              {qty}
                            </span>
                            <button
                              type="button"
                              onClick={() => handleQuantityChange(tier.id, 1, tier.available)}
                              className="w-7 h-7 rounded flex items-center justify-center text-neutral-300 hover:text-white hover:bg-white/10 transition font-bold"
                            >
                              +
                            </button>
                          </div>
                        ) : (
                          <span className="text-xs font-mono text-neutral-500">Unavailable</span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Summary Bar */}
              <div className="p-4 bg-white/5 rounded-xl border border-white/10 space-y-2 text-xs">
                <div className="flex justify-between text-neutral-400">
                  <span>Selected Tickets ({totalTickets}):</span>
                  <span className="font-mono text-white">{subtotal} PLN</span>
                </div>
                <div className="flex justify-between text-neutral-400">
                  <span>Booking & Service Fee (5%):</span>
                  <span className="font-mono text-white">{serviceFee} PLN</span>
                </div>
                <div className="pt-2 border-t border-white/10 flex justify-between text-sm font-bold text-white">
                  <span>Total Due:</span>
                  <span className="font-mono text-[#c8ff00] text-base">{grandTotal} PLN</span>
                </div>
              </div>

              <button
                type="button"
                disabled={totalTickets === 0}
                onClick={handleProceedToAttendee}
                className="w-full py-3 rounded-xl bg-[#c8ff00] hover:bg-[#b8ea00] text-black font-display font-bold text-xs uppercase tracking-wider transition shadow-[0_0_20px_rgba(200,255,0,0.3)] disabled:opacity-50 flex items-center justify-center space-x-2"
              >
                <span>Continue to Attendee Details</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

          {/* STEP 2: ATTENDEE INFO */}
          {step === 'attendee' && (
            <form onSubmit={handleProceedToPayment} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">
                  Primary Attendee Full Name (as on ID)
                </label>
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="e.g. Jan Kowalski"
                  className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-[#c8ff00]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">
                  Email for Digital Ticket & QR Code Delivery
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@underground.pl"
                  className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-[#c8ff00]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-neutral-300 mb-1">
                  Mobile Phone (SMS updates & entry alerts)
                </label>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+48 501 234 567"
                  className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-xl text-white text-sm focus:outline-none focus:border-[#c8ff00]"
                />
              </div>

              {/* Age Restriction & Safe Space Agreement */}
              <div className="p-3.5 bg-white/5 rounded-xl border border-white/10 space-y-2.5">
                <div className="flex items-start space-x-2">
                  <input
                    type="checkbox"
                    id="ageConf"
                    checked={ageConfirmed}
                    onChange={(e) => setAgeConfirmed(e.target.checked)}
                    className="mt-1 accent-[#c8ff00]"
                    required
                  />
                  <label htmlFor="ageConf" className="text-xs text-neutral-300">
                    I confirm that all attendees are at least {event.ageRestriction} and will present official government photo ID at the venue door.
                  </label>
                </div>
                <div className="flex items-start space-x-2">
                  <input
                    type="checkbox"
                    id="safeSpace"
                    checked={agreedAwareness}
                    onChange={(e) => setAgreedAwareness(e.target.checked)}
                    className="mt-1 accent-[#c8ff00]"
                    required
                  />
                  <label htmlFor="safeSpace" className="text-xs text-neutral-300">
                    I acknowledge {event.venueName}'s Safe Rave Policy (zero harassment, strict consent, camera sticker rules).
                  </label>
                </div>
              </div>

              <div className="flex items-center space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => setStep('select')}
                  className="w-1/3 py-2.5 rounded-xl border border-white/15 hover:bg-white/5 text-neutral-300 text-xs font-semibold"
                >
                  Back
                </button>
                <button
                  type="submit"
                  disabled={!ageConfirmed || !agreedAwareness}
                  className="w-2/3 py-2.5 rounded-xl bg-[#c8ff00] hover:bg-[#b8ea00] text-black font-display font-bold text-xs uppercase tracking-wider transition shadow-[0_0_15px_rgba(200,255,0,0.3)] disabled:opacity-50"
                >
                  Proceed to Payment
                </button>
              </div>
            </form>
          )}

          {/* STEP 3: PAYMENT INTEGRATION */}
          {step === 'payment' && (
            <div className="space-y-4">
              <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                <div className="text-xs text-neutral-400 mb-1">Order Summary:</div>
                <p className="text-sm font-bold text-white">{event.title}</p>
                <div className="mt-2 text-xs text-neutral-300 space-y-1 font-mono">
                  {selectedItems.map((i) => (
                    <div key={i.tierId} className="flex justify-between">
                      <span>{i.tierName} x{i.quantity}</span>
                      <span>{i.price * i.quantity} PLN</span>
                    </div>
                  ))}
                  <div className="flex justify-between pt-1 border-t border-white/10 text-white font-bold">
                    <span>Total Charged:</span>
                    <span className="text-[#c8ff00] text-sm">{grandTotal} PLN</span>
                  </div>
                </div>
              </div>

              {/* Payment Method Selector */}
              <div className="space-y-3">
                <label className="block text-xs font-semibold text-neutral-300">
                  Select Payment Method
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('blik')}
                    className={`p-3 rounded-xl border text-left transition ${
                      paymentMethod === 'blik'
                        ? 'border-[#c8ff00] bg-[#c8ff00]/10 text-white'
                        : 'border-white/10 bg-white/5 text-neutral-400 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <span className="px-1.5 py-0.5 rounded bg-black border border-[#c8ff00] text-[#c8ff00] font-black text-[10px] font-mono tracking-wider">
                        BLIK
                      </span>
                      <span className="font-bold text-xs">BLIK Code</span>
                    </div>
                    <p className="text-[10px] text-neutral-400 mt-1">
                      Instant mobile authorization via Polish banking app
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('card')}
                    className={`p-3 rounded-xl border text-left transition ${
                      paymentMethod === 'card'
                        ? 'border-[#00f0ff] bg-[#00f0ff]/10 text-white'
                        : 'border-white/10 bg-white/5 text-neutral-400 hover:text-white'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <CreditCard className="w-4 h-4 text-[#00f0ff]" />
                      <span className="font-bold text-xs">Payment Card</span>
                    </div>
                    <p className="text-[10px] text-neutral-400 mt-1">
                      Visa / Mastercard / Apple Pay (Stripe 256-bit TLS)
                    </p>
                  </button>
                </div>
              </div>

              {paymentMethod === 'blik' && (
                <div className="p-4 bg-black/40 rounded-xl border border-white/10 space-y-3">
                  <div className="flex items-center justify-between text-[11px] text-neutral-400">
                    <span className="font-mono text-neutral-300">Enter 6-digit BLIK Code:</span>
                    <span className="text-[#c8ff00] font-mono text-[10px]">Mobile Banking App</span>
                  </div>
                  <div className="relative">
                    <input
                      type="text"
                      maxLength={7}
                      value={blikCode}
                      onChange={(e) => setBlikCode(e.target.value)}
                      placeholder="e.g. 739 104"
                      className="w-full px-4 py-2.5 bg-white/5 border border-white/20 rounded-xl text-center font-mono font-black text-xl tracking-[0.3em] text-[#c8ff00] focus:outline-none focus:border-[#c8ff00]"
                    />
                  </div>
                  <p className="text-[10px] text-neutral-400 leading-tight">
                    Confirm transaction notification in your Polish banking app (mBank, PKO BP, Santander, ING, Millennium, or Revolut).
                  </p>
                </div>
              )}

              {paymentMethod === 'card' && (
                <div className="p-4 bg-black/40 rounded-xl border border-white/10 space-y-3">
                  <div className="text-[11px] text-neutral-400 flex items-center space-x-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                    <span>256-bit TLS Encrypted Polish Payment Pipeline</span>
                  </div>
                  <div className="space-y-2 text-xs">
                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                      placeholder="Card Number"
                      className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-xs font-mono focus:outline-none focus:border-[#00f0ff]"
                    />
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        value={cardExpiry}
                        onChange={(e) => setCardExpiry(e.target.value)}
                        placeholder="MM/YY"
                        className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-xs font-mono focus:outline-none focus:border-[#00f0ff]"
                      />
                      <input
                        type="password"
                        value={cardCvc}
                        onChange={(e) => setCardCvc(e.target.value)}
                        placeholder="CVC"
                        maxLength={4}
                        className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white text-xs font-mono focus:outline-none focus:border-[#00f0ff]"
                      />
                    </div>
                  </div>
                </div>
              )}

              <div className="flex items-center space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => setStep('attendee')}
                  className="w-1/3 py-2.5 rounded-xl border border-white/15 hover:bg-white/5 text-neutral-300 text-xs font-semibold"
                >
                  Back
                </button>
                <button
                  type="button"
                  disabled={isProcessing}
                  onClick={handleConfirmBooking}
                  className="w-2/3 py-2.5 rounded-xl bg-[#c8ff00] hover:bg-[#b8ea00] text-black font-display font-bold text-xs uppercase tracking-wider transition shadow-[0_0_20px_rgba(200,255,0,0.3)] disabled:opacity-50 flex items-center justify-center space-x-2"
                >
                  {isProcessing ? (
                    <>
                      <div className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                      <span>Issuing Digital Ticket...</span>
                    </>
                  ) : (
                    <span>Pay & Confirm ({grandTotal} PLN)</span>
                  )}
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: ORDER CONFIRMED & DIGITAL QR PASS */}
          {step === 'confirmed' && confirmedBooking && (
            <div className="space-y-5 text-center">
              <div className="inline-flex p-3 rounded-full bg-[#c8ff00]/20 text-[#c8ff00] mb-1">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <div>
                <h4 className="font-display font-bold text-xl text-white">Booking Confirmed!</h4>
                <p className="text-xs text-neutral-400 mt-0.5">
                  Your digital rave entry ticket is issued and verified.
                </p>
              </div>

              {/* Digital Pass Ticket Box */}
              <div className="bg-[#0b0c13] border-2 border-[#c8ff00]/40 rounded-2xl p-5 relative overflow-hidden shadow-[0_0_30px_rgba(200,255,0,0.15)] text-left">
                <div className="flex justify-between items-start border-b border-white/10 pb-3">
                  <div>
                    <span className="text-[10px] font-mono uppercase tracking-widest text-[#c8ff00]">
                      Official Rave Nation Pass
                    </span>
                    <h5 className="font-display font-bold text-base text-white">{event.title}</h5>
                    <p className="text-xs text-neutral-400">
                      {event.date} • Doors: {event.startTime}
                    </p>
                  </div>
                  <div className="text-right">
                    <span className="text-[10px] font-mono text-neutral-400">Order Ref:</span>
                    <p className="font-mono text-xs font-bold text-[#c8ff00]">
                      {confirmedBooking.orderRef}
                    </p>
                  </div>
                </div>

                <div className="py-4 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="space-y-1.5 text-xs text-neutral-300">
                    <p><span className="text-neutral-500">Attendee:</span> {confirmedBooking.attendee.fullName}</p>
                    <p><span className="text-neutral-500">Venue:</span> {event.venueName}, {event.cityName}</p>
                    <p><span className="text-neutral-500">Tickets:</span> {confirmedBooking.items.map((i) => `${i.tierName} (${i.quantity})`).join(', ')}</p>
                    <p><span className="text-neutral-500">Total Paid:</span> {confirmedBooking.totalAmount} PLN</p>
                    <span className="inline-block mt-1 px-2 py-0.5 text-[10px] font-mono rounded bg-emerald-500/20 text-emerald-400 uppercase">
                      Status: Active / Ready for Scan
                    </span>
                  </div>

                  {/* QR Code Graphic */}
                  <div className="p-3 bg-white rounded-xl flex flex-col items-center justify-center shadow-lg">
                    {/* SVG representation of scannable QR Code */}
                    <svg viewBox="0 0 100 100" className="w-24 h-24">
                      <rect width="100" height="100" fill="white" />
                      {/* Corner 1 */}
                      <rect x="5" y="5" width="28" height="28" fill="black" />
                      <rect x="9" y="9" width="20" height="20" fill="white" />
                      <rect x="13" y="13" width="12" height="12" fill="black" />
                      {/* Corner 2 */}
                      <rect x="67" y="5" width="28" height="28" fill="black" />
                      <rect x="71" y="9" width="20" height="20" fill="white" />
                      <rect x="75" y="13" width="12" height="12" fill="black" />
                      {/* Corner 3 */}
                      <rect x="5" y="67" width="28" height="28" fill="black" />
                      <rect x="9" y="71" width="20" height="20" fill="white" />
                      <rect x="13" y="75" width="12" height="12" fill="black" />
                      {/* Matrix dots */}
                      <rect x="38" y="10" width="8" height="8" fill="black" />
                      <rect x="50" y="10" width="8" height="8" fill="black" />
                      <rect x="38" y="24" width="8" height="8" fill="black" />
                      <rect x="42" y="38" width="16" height="8" fill="black" />
                      <rect x="10" y="42" width="8" height="16" fill="black" />
                      <rect x="24" y="48" width="8" height="8" fill="black" />
                      <rect x="38" y="50" width="8" height="16" fill="black" />
                      <rect x="50" y="66" width="16" height="8" fill="black" />
                      <rect x="70" y="42" width="8" height="8" fill="black" />
                      <rect x="80" y="50" width="8" height="16" fill="black" />
                      <rect x="66" y="80" width="16" height="8" fill="black" />
                      <rect x="45" y="80" width="8" height="10" fill="black" />
                    </svg>
                    <span className="text-[9px] font-mono text-black font-bold mt-1">DOOR SCAN</span>
                  </div>
                </div>

                <div className="border-t border-white/10 pt-2 flex items-center justify-between text-[11px] text-neutral-400">
                  <span>Show this QR code at {event.venueName} entrance.</span>
                  <span className="font-mono text-[#c8ff00] font-bold">18+ ID REQUIRED</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onViewTickets();
                  }}
                  className="w-full sm:w-1/2 py-2.5 rounded-xl bg-[#c8ff00] hover:bg-[#b8ea00] text-black font-display font-bold text-xs uppercase tracking-wider transition"
                >
                  View in My Tickets
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full sm:w-1/2 py-2.5 rounded-xl border border-white/20 hover:bg-white/5 text-neutral-300 text-xs font-semibold transition"
                >
                  Done
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
