import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { NotificationProvider } from "./contexts/NotificationContext";
import { CartProvider } from "./contexts/CartContext";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import Music from "./pages/Music";
import Artists from "./pages/Artists";
import Marketplace from "./pages/Marketplace";
import Collab from "./pages/Collab";
import Profile from "./pages/Profile";
import Messages from "./pages/Messages";
import Live from "./pages/Live";
import About from "./pages/About";
import HowItWorks from "./pages/HowItWorks";
import Contact from "./pages/Contact";
import FAQ from "./pages/FAQ";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import Verification from "./pages/Verification";
import Blog from "./pages/Blog";
import Events from "./pages/Events";
import VerificationForm from "./pages/VerificationForm";
import Checkout from "./pages/Checkout";
import Orders from "./pages/Orders";
import PlatformInvestment from "./pages/PlatformInvestment";
import AdminDashboard from "./pages/AdminDashboard";
import AdminArtistVerification from "./pages/AdminArtistVerification";
import AdminInvestmentReview from "./pages/AdminInvestmentReview";
import SignIn from "./pages/SignIn";
import Register from "./pages/Register";

function Router() {
  return (
    <Switch>
      <Route path={"/signin"} component={SignIn} />
      <Route path={"/register"} component={Register} />
      <Route path={"/"} component={Home} />
      <Route path={"/music"} component={Music} />
      <Route path={"/artists"} component={Artists} />
      <Route path={"/marketplace"} component={Marketplace} />
      <Route path={"/collab"} component={Collab} />
      <Route path={"/profile"} component={Profile} />
      <Route path={"/messages"} component={Messages} />
      <Route path={"/live"} component={Live} />
      <Route path={"/about"} component={About} />
      <Route path={"/how-it-works"} component={HowItWorks} />
      <Route path={"/contact"} component={Contact} />
      <Route path={"/faq"} component={FAQ} />
      <Route path={"/terms"} component={Terms} />
      <Route path={"/privacy"} component={Privacy} />
      <Route path={"/verification"} component={Verification} />
      <Route path={"/blog"} component={Blog} />
      <Route path={"/events"} component={Events} />
      <Route path={"/verify"} component={VerificationForm} />
      <Route path={"/product/:id"} component={ProductDetail} />
      <Route path={"/cart"} component={Cart} />
      <Route path={"/checkout"} component={Checkout} />
      <Route path={"/orders"} component={Orders} />
      <Route path={"/platform-investment"} component={PlatformInvestment} />
      <Route path={"/admin"} component={AdminDashboard} />
      <Route path={"/admin/artists"} component={AdminArtistVerification} />
      <Route path={"/admin/investments"} component={AdminInvestmentReview} />
      <Route path={"/404"} component={NotFound} />
      {/* Final fallback route */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="light"
      // switchable
      >
        <NotificationProvider>
          <CartProvider>
            <TooltipProvider>
              <Toaster />
              <Router />
            </TooltipProvider>
          </CartProvider>
        </NotificationProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
