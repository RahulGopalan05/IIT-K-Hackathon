import { useEffect } from "react";
import {
  Routes,
  Route,
  useNavigationType,
  useLocation,
} from "react-router-dom";
import Desktop from "./pages/Desktop";
import ChevronExpand from "./pages/ChevronExpand";
import ArrowRightCircle from "./pages/ArrowRightCircle";
import Sun from "./pages/Sun";
import ShieldCheck from "./pages/ShieldCheck";
import FAQPage from "./pages/FAQPage";
import REALFAQ from "./components/FAQPAGEREAL";
import UserGuide from './components/UserGuidesPage';
import UserGuidesPage from "./components/UserGuidesPage";
import Contact from "./components/Contact";
import ARComponent from "./components/AR";
import MapWithHotspots from "./components/MapWithHotspots";
import LiveChatPage from "./components/LiveChatPage";
import GetStarted from "./pages/GetStarted";
import ReviewPage from "./pages/ReviewPage1";
import MarketPage from './pages/MarketPage';
  // adjust the path if necessary



function App() {
  const action = useNavigationType();
  const location = useLocation();
  const pathname = location.pathname;

  useEffect(() => {
    if (action !== "POP") {
      window.scrollTo(0, 0);
    }
  }, [action, pathname]);

  useEffect(() => {
    let title = "";
    let metaDescription = "";

    switch (pathname) {
      case "/":
        title = "";
        metaDescription = "";
        break;
      case "/chevronexpand":
        title = "";
        metaDescription = "";
        break;
      case "/arrowrightcircle":
        title = "";
        metaDescription = "";
        break;
      case "/sun":
        title = "";
        metaDescription = "";
        break;
      case "/shieldcheck":
        title = "";
        metaDescription = "";
        break;
    }

    if (title) {
      document.title = title;
    }

    if (metaDescription) {
      const metaDescriptionTag = document.querySelector(
        'head > meta[name="description"]'
      );
      if (metaDescriptionTag) {
        metaDescriptionTag.content = metaDescription;
      }
    }
  }, [pathname]);

  return (
    <Routes>
      <Route path="/" element={<Desktop />} />
      <Route path="/chevronexpand" element={<ChevronExpand />} />
      <Route path="/arrowrightcircle" element={<ArrowRightCircle />} />
      <Route path="/sun" element={<Sun />} />
      <Route path="/shieldcheck" element={<ShieldCheck />} />
      <Route path="/faq" element={<REALFAQ />} />
      <Route path="/user-guide" element={<UserGuidesPage />} />
      <Route path="/contact-info" element={<Contact />} />
      <Route path="/ar" element={<ARComponent />} />
      <Route path="/map" element={<MapWithHotspots />} />
      <Route path="/live-chat" element={<LiveChatPage />} />
      <Route path="/get-started" element={<GetStarted />} />
      <Route path="/reviewpage" element={<ReviewPage />} />
      <Route path="/FAQPage" element={<FAQPage />} />
      
      <Route path="/market" element={<MarketPage />} />
       
    </Routes>
  );
}
export default App;