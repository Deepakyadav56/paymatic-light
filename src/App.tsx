
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SplashScreen from "./pages/SplashScreen";
import Onboarding from "./pages/Onboarding";
import Login from "./pages/Login";
import VerifyOTP from "./pages/VerifyOTP";
import Home from "./pages/Home";
import SendMoney from "./pages/SendMoney";
import RequestMoney from "./pages/RequestMoney";
import QRScan from "./pages/QRScan";
import QRManual from "./pages/QRManual";
import FundsOverview from "./pages/FundsOverview";
import FundDetails from "./pages/FundDetails";
import InvestmentAmount from "./pages/InvestmentAmount";
import PaymentMethod from "./pages/PaymentMethod";
import SIPSetup from "./pages/SIPSetup";
import TransactionHistory from "./pages/TransactionHistory";
import TransactionDetails from "./pages/TransactionDetails";
import PaymentSuccess from "./pages/PaymentSuccess";
import InvestmentSuccess from "./pages/InvestmentSuccess";
import Profile from "./pages/Profile";
import EditProfile from "./pages/EditProfile";
import LinkedAccounts from "./pages/LinkedAccounts";
import AddAccount from "./pages/AddAccount";
import SecuritySettings from "./pages/SecuritySettings";
import NotificationSettings from "./pages/NotificationSettings";
import QuickAccess from "./pages/QuickAccess";
import HelpSupport from "./pages/HelpSupport";
import NotFound from "./pages/NotFound";
import Signup from "./pages/Signup";
import MutualFundsPage from "./pages/MutualFunds";
import FundDetailsPage from "./pages/FundDetailsPage";
import InvestmentAmtPage from "./pages/InvestmentAmt";
import PaymentPage from "./pages/Payment";
import ConfirmationPage from "./pages/Confirmation";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<SplashScreen />} />
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />

          <Route path="/mutual-funds" element={<MutualFundsPage />} />
          <Route path="/fund-details/:id" element={<FundDetailsPage />} />
          <Route path="/invest/:id" element={<InvestmentAmtPage />} />
          <Route path="/payment/:id" element={<PaymentPage />} />
          <Route path="/confirmation/:id" element={<ConfirmationPage />} />
          

          <Route path="/verify-otp" element={<VerifyOTP />} />
          <Route path="/home" element={<Home />} />
          <Route path="/send" element={<SendMoney />} />
          <Route path="/request" element={<RequestMoney />} />
          <Route path="/scan" element={<QRScan />} />
          <Route path="/qr-manual" element={<QRManual />} />
          <Route path="/funds" element={<FundsOverview />} />
          <Route path="/fund/:id" element={<FundDetails />} />
          <Route path="/fund-invest/:id" element={<InvestmentAmount />} />
          <Route path="/payment-method/:id" element={<PaymentMethod />} />
          <Route path="/sip-setup/:id" element={<SIPSetup />} />
          <Route path="/transactions" element={<TransactionHistory />} />
          <Route path="/transaction/:id" element={<TransactionDetails />} />
          <Route path="/payment-success" element={<PaymentSuccess />} />
          <Route path="/investment-success" element={<InvestmentSuccess />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/edit-profile" element={<EditProfile />} />
          <Route path="/linked-accounts" element={<LinkedAccounts />} />
          <Route path="/add-account" element={<AddAccount />} />
          <Route path="/security-settings" element={<SecuritySettings />} />
          <Route path="/notifications-settings" element={<NotificationSettings />} />
          <Route path="/quick-access" element={<QuickAccess />} />
          <Route path="/help" element={<HelpSupport />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
