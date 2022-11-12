import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./pages/Home";
import AOS from "aos";
import "aos/dist/aos.css";
import { Routes, Route, useNavigate } from "react-router-dom";
import Signup from "./components/Auth/Signup";
import Login from "./components/Auth/Login";
import Dashboard from "./components/Dashboard/Dashboard";
import { useState, useEffect, useRef } from "react";
import MainContext from "./components/Context/MainContext";
import Post from "./components/Dashboard/pages/Post";
import BrowseListings from "./pages/BrowseListings";
import ListingViewPage from "./pages/ListingViewPage";
import ListingContractPage from "./components/Dashboard/pages/sell/ListingContractPage";
import BuisnessForSalePage from "./components/Dashboard/pages/sell/BuisnessSalePage";
import PropertyForSalePage from "./components/Dashboard/pages/sell/PropertySalePage";
import PropertyManagerSalePage from "./components/Dashboard/pages/sell/PropertyManagerSalePage";
import BuyAListingContractPage from "./components/Dashboard/pages/wanted/BuyAContractPage";
import BuyABuisnessPage from "./components/Dashboard/pages/wanted/BuyABuisnessPage";
import PropertyManagerBuyPage from "./components/Dashboard/pages/wanted/PropertyManagerBuyPage";
import InvestmentNeedPage from "./components/Dashboard/pages/wanted/InvestmentNeedPage";
import NotFound404 from "./components/NotFound404/NotFound404";
import ScrollToTop from "./components/ScrollToTop";
import MyListingPage from "./components/Dashboard/pages/MyListingPage";
import BuyerRequestPage from "./components/Dashboard/pages/BuyerRequestPage";
import Terms from "./components/Terms/Terms";
import ApprovedRequestPage from "./components/Dashboard/pages/ApprovedRequestPage";
import Privacy from "./components/Privacy/Privacy";
import BuyerSellerMnda from "./components/BuyerSellerMnda/BuyerSellerMnda";
import BuyerSellerTerms from "./components/BuyerSellerTerms/BuyerSellerTerms";
import ProfilePage from "./components/Dashboard/pages/ProfilePage";
import Payment from "./components/Payment/Payment";
import SuccessPayment from "./components/SuccessPayment/SuccessPayment";
import ChatPage from "./components/Dashboard/pages/Chat";
import AdvisorPage from "./components/Dashboard/pages/AdvisorPage";
import AdvisorViewPage from "./components/Dashboard/pages/AdvisorViewPage";
import Sellers from "./pages/Sellers";
import ManageListingPage from "./components/Dashboard/Admin/pages/ManageListings";
import CreateAdvisorPage from "./components/Dashboard/Admin/pages/CreateAdvisor";
import BuyersPage from "./pages/Buyers";
import API from "./components/axios";

function App() {
  AOS.init();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [myOwnId, setMyOwnId] = useState("");
  const [isPaid, setIsPaid] = useState(null);
  const [isAdmin, setIsAdmin] = useState(null);
  const [expiryDate,setExpiryDate] = useState("");
  const [packageType, setPackageType] = useState("")
  const [myListings, setMyListings] = useState([]);
  const [buyerRequests, setBuyerRequests] = useState([]);
  const memberShipRef = useRef(null);
  const memberShipScrollHandle = () => {
    memberShipRef.current?.scrollIntoView({behavior: 'smooth'});
  };

  const Authenticate = async () => {
    try {
      const res = await fetch(`/auth`, {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await res.json();
      console.log(data);
      if (!data.success) {
        setIsAuthenticated(false);
      } else {
        setIsAuthenticated(true);
        setIsPaid(data.others.isPaid);
        setIsAdmin(data.others.isAdmin);
        setMyOwnId(data.others._id);
        setMyListings(data.others.myListings);
        setBuyerRequests(data.others.buyerRequests);
        if(data.others.subscription.length !== 0){
          setExpiryDate(data.others.subscription.slice(-1)[0].expiryDate);
          setPackageType(data.others.subscription.slice(-1)[0].packageType);
        }
       
      }
    } catch (error) {
      console.log(error);
      setIsAuthenticated(false);
    }
  };

  useEffect(() => {
    Authenticate();
  }, []);

  console.log(`${process.env.REACT_APP_URI}/auth`);

  return (
    <MainContext.Provider
      value={{ myOwnId, isPaid, isAdmin, myListings, buyerRequests,expiryDate,packageType, isAuthenticated, memberShipRef,memberShipScrollHandle}}
    >
      <div className="App">
          <ScrollToTop />
        <Routes>
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/dashboard" element={<Dashboard />} />
          <Route exact path="/listing/post" element={<Post />} />
          <Route exact path="/mylistings" element={<MyListingPage />} />
          <Route exact path="/buyerrequests" element={<BuyerRequestPage />} />
          <Route exact path="/approvedrequests" element={<ApprovedRequestPage />} />
          <Route exact path="/profile" element={<ProfilePage />} />
          <Route exact path="/payment" element={<Payment />} />
          <Route exact path="/success" element={<SuccessPayment />} />
          <Route exact path="/chat" element={<ChatPage />} />
          <Route exact path='/auth/admin/managelisting' element={<ManageListingPage />} />
          <Route exact path='/auth/admin/createadvisor' element={<CreateAdvisorPage />} />
          <Route exact path="/advisors" element={<AdvisorPage />} />
          <Route exact path="/advisor/:advisorId" element={<AdvisorViewPage />} />
          <Route
            exact
            path="/listings/view/:listingId"
            element={<ListingViewPage />}
          />
          <Route exact path="/listing/" element={<BrowseListings />} />
          <Route
            exact
            path="/listing/:paramsCategoryId"
            element={<BrowseListings />}
          />
           <Route
            exact
            path="/post/listing/buisnessForSale/:categoryId"
            element={<BuisnessForSalePage />}
          />
          <Route
            exact
            path="/post/listing/listingContractForSale/:categoryId"
            element={<ListingContractPage />}
          />
           <Route
            exact
            path="/post/listing/propertyForSale/:categoryId"
            element={<PropertyForSalePage />}
          />
           <Route
            exact
            path="/post/listing/propertyManagerServices/:categoryId"
            element={<PropertyManagerSalePage />}
          />
            <Route
            exact
            path="/post/listing/buyAListingContract/:categoryId"
            element={<BuyAListingContractPage />}
          />
           <Route
            exact
            path="/post/listing/buyABuisness/:categoryId"
            element={<BuyABuisnessPage />}
          />
           <Route
            exact
            path="/post/listing/manageMyProperty/:categoryId"
            element={<PropertyManagerBuyPage />}
          />
            <Route
            exact
            path="/post/listing/investmentNeeded/:categoryId"
            element={<InvestmentNeedPage />}
          />
          <Route exact path="/" element={<Home />} />
          <Route exact path="/sellers" element={<Sellers />} />
          <Route exact path="/buyers" element={<BuyersPage />} />
          <Route exact path='/terms' element={<Terms />} />
          <Route exact path='/privacy' element={<Privacy />} />
          <Route exact path='/buyersellermnda' element={<BuyerSellerMnda />} />
          <Route exact path='/buyersellerterms' element={<BuyerSellerTerms />} />
          <Route path="*" element={<NotFound404 />} />
        </Routes>
      </div>
    </MainContext.Provider>
  );
}

export default App;
