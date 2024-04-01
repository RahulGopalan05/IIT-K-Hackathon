import SecurityPrivacy from "../components/SecurityPrivacy";
import Home from "../components/Home";
import NewsInsights from "../components/NewsInsights";
import Support from "../components/Support";
import AboutUs from "../components/AboutUs";
import List from "../components/List";
import VirtualTours from "../components/VirtualTours";
import Spotlightarrow from "../components/Spotlightarrow";
import CONTACT1 from "../components/CONTACT1";
import Contact from "../components/Contact";
import POPULAR from "../components/POPULAR";
import INVESTMENTHOTSPOTS from "../components/INVESTMENTHOTSPOTS";
import AFFORDABLE from "../components/AFFORDABLE";
import GREATLIFESTYLE from "../components/GREATLIFESTYLE";
import ReadAllReviews from "../components/ReadAllReviews";
import FAQ from "../components/FAQ";
import FAQPage from './FAQPage';
import REALFAQ from "../components/FAQPAGEREAL";
import Livechatsupport from "../components/Livechatsupport";
import LiveChatPage from "../components/LiveChatPage";
import ContacTINFO from "../components/ContacTINFO";
import Updates from "../components/Updates";
import Comforum from "../components/Comforum";
import Userguides from "../components/Userguides";
import SUBMITFEEDBACK from "../components/SUBMITFEEDBACK";
import axios from 'axios';
import "./Desktop.css";
import ARComponent from "../components/AR";
import MarketPage from './MarketPage';
import Clicktoexplore from '../components/Clicktoexplore'; // Import this if it's not already imported
import React, { useRef, useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Link , Routes} from 'react-router-dom';
import * as handTrack from 'handtrackjs'; // replace 'handtrackjs' with the actual package name
import ModalVideo from 'react-modal-video';



function Desktop() {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const trackButtonRef = useRef(null);
  const updateNoteRef = useRef(null);
  const [showVideo, setShowVideo] = useState(false);
  const [isOpen, setOpen] = useState(false);
  const [news, setNews] = useState([]);

  const [isVideo, setIsVideo] = useState(false);
  const [model, setModel] = useState(null);

  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      .modal-video-movie-wrap {
        width: 1664px !important;
        height: 962px !important;
      }
      .modal-video-movie-wrap iframe {
        width: 100% !important;
        height: 100% !important;
      }
    `;
    document.head.appendChild(style);

    // Clean up on unmount
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  
  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get('http://localhost:3001/news'); // replace with your actual backend route
        setNews(response.data.articles);
        console.log(response.data.articles);
      } catch (error) {
        console.error(error);
      }
    };

    fetchNews();
  }, []);

  const modelParams = {
    flipHorizontal: true, // flip e.g for video
    maxNumBoxes: 20, // maximum number of boxes to detect
    iouThreshold: 0.5, // ioU threshold for non-max suppression
    scoreThreshold: 0.6, // confidence threshold for predictions.
  };

  // Load the model.
  useEffect(() => {
  handTrack.load(modelParams).then((lmodel) => {
    // detect objects in the image.
    setModel(lmodel);
    console.log(lmodel);
    if (updateNoteRef.current) {
      updateNoteRef.current.innerText = "Loaded model";
    }
    startVideo(); // Start the video immediately after the model is loaded
  });
}, []);
  // Add event listener to the track button.
  useEffect(() => {
    if (model && trackButtonRef.current) {
      trackButtonRef.current.disabled = false;
      trackButtonRef.current.addEventListener("click", toggleVideo);
    }
  }, [model]);

  function startVideo() {
    handTrack.startVideo(videoRef.current).then(function (status) {
      console.log("video started", status);
      if (status) {
        if (updateNoteRef.current) {
          updateNoteRef.current.innerText = "Video started. Now tracking";
        }
        setIsVideo(true);
        runDetection();
      } else {
        if (updateNoteRef.current) {
          updateNoteRef.current.innerText = "Please enable video";
        }
      }
    });
  }

  function toggleVideo() {
    if (!isVideo) {
      if (updateNoteRef.current) {
        updateNoteRef.current.innerText = "Starting video";
      }
      startVideo();
    } else {
      if (updateNoteRef.current) {
        updateNoteRef.current.innerText = "Stopping video";
      }
      handTrack.stopVideo(videoRef.current);
      setIsVideo(false);
      if (updateNoteRef.current) {
        updateNoteRef.current.innerText = "Video stopped";
      }
    }
    if (isVideo) {
      runDetection(); // Add this line
    }
  }
  const [isScrolling, setIsScrolling] = useState(true);

function runDetection() {
  if (model) {
    model.detect(videoRef.current).then((predictions) => {
      console.log("Predictions: ", predictions);

      predictions.forEach((prediction) => {
        if (isScrolling) {
          if (prediction.label === 'open' || prediction.label === 'point') {
            window.scrollBy(0, -50); // Scroll up by 50 pixels (adjust as needed)
          } else if (prediction.label === 'closed') {
            window.scrollBy(0, 50); // Scroll down by 50 pixels (adjust as needed)
          }
        }
        if (prediction.label === 'pinch') {
          setIsScrolling(false); // Stop scrolling when 'pinch' is detected
        } else {
          setIsScrolling(true); // Resume scrolling for other gestures
        }
      });

      if (canvasRef.current) {
        model.renderPredictions(predictions, canvasRef.current, canvasRef.current.getContext("2d"), videoRef.current);
      }
      if (isVideo) {
        requestAnimationFrame(runDetection);
      }
    });
  }
}
  
function truncateDescription(description, url) {
  const words = description.split(' ');
  if (words.length > 6) {
    return words.slice(0, 6).join(' ') + '... ' +
      `<a href="${url}" target="_blank">Read more</a>`;
  } else {
    return description;
  }
}


  




  return (
  
    
    <div className="desktop-1">
    
      <p id="updatenote" ref={updateNoteRef}></p>
      <div className="desktop-1-child" />
      <section className="frame">
      <video id="myvideo" ref={videoRef} width="200" height="100"></video>
      <canvas id="canvas" ref={canvasRef}></canvas>
      <button id="trackbutton" ref={trackButtonRef}>Track</button>
        <div className="frame1">
          
          <div className="frame2">
            <div className="discover-your-dream-container">
              <p className="discover-your-dream-home-wher">
                <span>
                  <span>
                    Discover Your Dream Home: Where Every Brick Holds a Story
                  </span>
                </span>
              </p>
              <p className="blank-line">
                <span>
                  <span>&nbsp;</span>
                </span>
              </p>
              <p className="explore-our-curated-listings-f">
                <span>
                  <span>{`Explore our curated listings for your next home sweet home. `}</span>
                </span>
              </p>
              <p className="discover-the-perfect-space-to">
                <span>
                  <span>{`Discover the perfect space to write your story. `}</span>
                </span>
              </p>
              <p className="start-your-journey-now">
                <span>
                  <span>Start your journey now.</span>
                </span>
              </p>
            </div>
            
          </div>
          <header className="frame3">
            <SecurityPrivacy />
            <Home />
            <NewsInsights />
            <Support />
            <AboutUs />
            <List />
            <h3 className="re-dev-estate">RE-DEV. Estate</h3>
            <button className="virtual-tours-container">
              <VirtualTours />
            </button>
            <div className="frame-child" />
            <Link to="/get-started">
              <button className="get-started">Get Started</button>
            </Link>
            <img className="frame-item" alt="" />
          </header>
          <div className="frame4">
            <div className="frame5">
              <div className="frame-inner" />
              <input className="rectangle-input" type="text" />
              <div className="location">Location</div>
              <input className="frame-child1" type="text" />
              <input className="frame-child2" type="text" />
              <img className="geoalt-icon" alt="" src="/geoalt.svg" />
              <img className="house-icon" alt="" src="/house@2x.png" />
              <img className="cash-icon" alt="" src="/cash.svg" />
              <div className="search-property">Search Property</div>
              <div className="div">$100000-$5000000</div>
              <button className="search">Search</button>
            </div>
          </div>
        </div>
      </section>
      <div className="frame6">
        <div className="frame7">
          <div className="rectangle-div" />
          <img src='/apart.jpeg' className="rectangle-image" />
          <img src='/ambuja.jpeg' className="top-left-image" />
          <div className="ambuja-constructions-view-container">
            <p className="ambuja">Ambuja</p>
            <p className="constructions">constructions</p>
            <p className="blank-line1">&nbsp;</p>
            <p className="view-projects">View Projects</p>
          </div>
          <img className="line-icon" alt="" />
          <Spotlightarrow />
          <div className="joe-complex-by-container">
            <p className="joe-complex-by">Joe complex by...........</p>
            <p className="yeshwantpur-bengaluru">Yeshwantpur, Bengaluru</p>
          </div>
          <div className="k-400k-container">
            <p className="k-400k">$150k - $400k</p>
            <p className="bhk-apartments">3-6BHK Apartments</p>
          </div>
          <CONTACT1 />
          {/* <Contact /> */}
        </div>
      </div>
      <div className="frame8">
        <div className="frame9">
          <div className="frame-child3" />
          <img src='/ambuja.jpeg' className="imagex" />
          
          <div className="frame-child4" />
          <img src='/ambuja.jpeg' className="imagey" />
          
          <div className="frame-child5" />
          <img src='/ambuja.jpeg' className="imagez" />
          <div className="year-estd-projects-container">
            <p className="p">1986 70</p>
            <p className="year-estd">Year estd. Projects</p>
          </div>
          <div className="year-estd-projects-container1">
            <p className="p1">1986 70</p>
            <p className="year-estd1">Year estd. Projects</p>
          </div>
          <div className="frame-child6" />
          <img className="rectangle-icon" alt="" src="/rectangle-13.svg" />
          <div className="frame-child7" />
          <div className="sattva-group">Sattva Group</div>
          <div className="ram-properties">Ram Properties</div>
          <div className="future">Future</div>
          <div className="year-estd-projects-container2">
            <p className="p2">1986 70</p>
            <p className="year-estd2">Year estd. Projects</p>
          </div>
          <div className="explore-one-of">
            Explore one of the industry's leading developers committed to
            excellence in real estate. With a legacy dating back to 1986, our
            featured builders uphold the highest standards of quality throughout
            every phase of construction, setting new benchmarks for
            craftsmanship and reliability.
          </div>
          <div className="join-a-developer">
            Join a developer dedicated to sustainable practices and innovative
            engineering solutions. Our featured builders prioritize green
            initiatives and employ advanced engineering techniques to ensure
            that every project reflects our commitment to environmental
            responsibility and forward-thinking design.
          </div>
          <div className="experience-a-portfolio">
            Experience a portfolio of exceptional spaces crafted to elevate
            modern living. Our featured builders are dedicated to delivering
            high-quality environments that exceed expectations, empowering
            individuals and communities to thrive.
          </div>
          {/* <button className="read-more" data-url="https://timesofindia.indiatimes.com/">READ MORE</button>

          <button className="read-more1" data-url="https://timesofindia.indiatimes.com/">READ MORE</button>
          <button className="read-more2" data-url="https://timesofindia.indiatimes.com/">READ MORE</button> */}
        </div>
      </div>
      {/* <div className="frame10">
        <div className="frame11">
          <div className="top-localities">{`Top Localities `}</div>
          <div className="frame-child8" />
          <button className="rectangle-button" />
          <button className="frame-child9" />
          <button className="frame-child10" />
          <button className="frame-child11" />
          <POPULAR />
          <INVESTMENTHOTSPOTS />
          <AFFORDABLE />
          <GREATLIFESTYLE />
          <div className="frame-child12" />
          <div className="rw-nagar-150sqft-container">
            <ol className="rw-nagar-150sqft">
              <li>rw nagar..... $150/sq.ft</li>
            </ol>
          </div>
          <div className="rw-nagar-150sqft-container1">
            <ol className="rw-nagar-150sqft1">
              <li>rw nagar..... $150/sq.ft</li>
            </ol>
          </div>
          <div className="rw-nagar-150sqft-container2">
            <ol className="rw-nagar-150sqft2">
              <li>rw nagar..... $150/sq.ft</li>
            </ol>
          </div>
          <img className="caretupfill-icon" alt="" src="/caretupfill@2x.png" />
          <div className="frame-child13" />
          <img className="caretupfill-icon1" alt="" src="/caretupfill1.svg" />
          <div className="rw-nagar-150sqft-container3">
            <ol className="rw-nagar-150sqft3">
              <li>rw nagar..... $150/sq.ft</li>
            </ol>
          </div>
          <div className="with-infa-scroll-and">
            With Infa-scroll and geo-tagging
          </div>
        </div>
      </div>
      <div className="frame12">
        <div className="frame13">
          <div className="line-div" />
          <div className="about-us">About Us</div>
        </div>
      </div> */}
      
      <div className="frame14">
        <img className="frame-icon" alt="" src="/frame1.svg" />
        <div className="frame15">
          <div className="high-quality-step-container">
            <p className="high-quality">High Quality</p>
            <p className="step-into-a">
              Step into a world of unparalleled craftsmanship and attention to
              detail. Our real estate website showcases properties of the
              highest quality, where every aspect is thoughtfully curated to
              exceed the most discerning standards. From exquisite finishes to
              impeccable design, each listing reflects our commitment to
              delivering excellence in every home
            </p>
          </div>
          <div className="best-price-discover-exceptiona-container">
            <p className="best-price">Best Price</p>
            
            <p className="discover-exceptional-value">
              Discover exceptional value without compromise. Our real estate
              website offers the best prices on luxury properties, ensuring that
              your dream home is within reach. With transparent pricing and
              competitive rates, we empower you to make informed decisions and
              find the perfect property that aligns with your budget and
              aspirations
            </p>
          </div>
          {/* <button className="read-more3">READ MORE</button>
          <button className="read-more4">READ MORE</button> */}
        </div>
      </div>
      <div className="frame16">
        <div className="frame17">
          <div className="luxuary-indulge-in-the-container">
            <p className="luxuary">Luxury</p>
            <p className="indulge-in-the">
              Indulge in the epitome of refined living. Our real estate website
              features an exclusive collection of luxurious properties that
              redefine sophistication and elegance. From breathtaking estates to
              opulent penthouses, each listing exemplifies the height of luxury
              living. Immerse yourself in unmatched comfort and prestige as you
              explore our curated selection of upscale residences
            </p>
          </div>
          <div className="extra-security-your-container">
            <p className="extra-security">Extra Security</p>
            <p className="your-safety-and">
              Your safety and peace of mind are our top priorities. Our real
              estate website goes above and beyond to provide extra security
              measures, ensuring a secure and trustworthy environment for all
              users. With robust security protocols and advanced encryption
              technologies, you can browse and transact with confidence, knowing
              that your personal information and transactions are safeguarded at
              every step
            </p>
          </div>
          {/* <button className="read-more5">READ MORE</button>
          <button className="read-more6">READ MORE</button> */}
        </div>
      </div>
      <div className="frame18">
        <div className="frame19">
          <div className="frame-child14" />
          <div className="user-reviews">User Reviews</div>
          <div className="what-do-our">What do our users say about us?</div>
          <div className="frame-child15" />
          <img className="star-icon" alt="" src="/star-2.svg" />
          <img className="frame-child16" alt="" src="/star-2.svg" />
          <img className="frame-child17" alt="" src="/star-2.svg" />
          <img className="frame-child18" alt="" src="/star-2.svg" />
          <div className="ellipse-div" />
          <img className="ellipse-icon" alt="" src="/ellipse-1@2x.png" />
          <img className="frame-child19" alt="" src="/ellipse-3@2x.png" />
          <img className="frame-child20" alt="" src="/ellipse-4@2x.png" />
          <div className="frame-child21" />
          <div className="div1">+99</div>
          <img className="frame-child22" alt="" src="/ellipse-6@2x.png" />
          <h2 className="rahul-gopalan">Rahul Gopalan</h2>
          <img className="frame-child23" alt="" src="/star-2.svg" />
          <div className="absolutely-thrilled-with">
            Absolutely thrilled with the service provided. From start to finish,
            the experience was seamless and professional. The team went above
            and beyond to help us find our dream home. The attention to detail
            and personalized assistance truly set them apart. Highly recommend!
          </div>
        </div>
      </div>
      <div className="frame20">
        <div className="frame21">
          <div className="frame-child24" />
          <img className="frame-child25" alt="" src="/star-2.svg" />
          <img className="frame-child26" alt="" src="/star-2.svg" />
          <img className="frame-child27" alt="" src="/star-2.svg" />
          <img className="frame-child28" alt="" src="/star-2.svg" />
          <img className="frame-child29" alt="" src="/star-2.svg" />
          <button className="frame-child30">
          <Link to="/reviewpage" style={{ color: 'white', fontSize: '2em' }}>Read All Reviews</Link>
          </button>
          
          <div className="explore-what-our">
            Explore what our valued users have to say in our Reviews section.
            Discover firsthand experiences and testimonials from satisfied
            clients who have found their perfect homes through our platform.
            From seamless transactions to exceptional customer service, our user
            reviews reflect the commitment to excellence that defines our real
            estate services. Join the conversation and see why our clients trust
            us to make their property dreams a reality
          </div>
          <img className="frame-child31" alt="" src="/ellipse-7@2x.png" />
          <h2 className="pranav-v-jambur">Pranav V Jambur</h2>
          <div className="exceptional-experience-the">
            Exceptional experience .The platform is user-friendly, and the
            selection of properties is outstanding. The support team was
            responsive and knowledgeable, guiding us through every step of the
            process. We couldn't be happier with our new home. Thank you!
          </div>
        </div>
      </div>
      <div className="frame22">
        <div className="frame23">
          <div className="frame-child32" />
          <div className="support">Support</div>
        </div>
      </div>
      <div className="frame24">
        <div className="frame25">
          <FAQ />
          <Link to="/contact-info" className="contact-link">
            <button className="ci contact-information">Contact Information</button>
          </Link>
          
          <Link to="/live-chat">
            <button className="live-chat-support">
              Live Chat Support 
            </button>
          </Link>
        </div>
      </div>
      <div className="frame26">
        <div className="frame27">
          <Updates />
          <Comforum />
          <Userguides />
          <Link to="/ar" className="ar">
            <button className="ar">
              Augmented Reality Experience
            </button>
          </Link>
          <Link to="/FAQPage" className="map">
            <button className="MAP">
              MAP
            </button>
          </Link>
        </div>
      </div>
      <div className="frame28">
        <div className="frame29">
          <SUBMITFEEDBACK />
          <div className="your-feedback-means">
            Geo-Location Pinpointing

          </div>
          
        </div>
      </div>
      <div className="frame30">
        <div className="frame31">
          <div className="virtual-tour">Virtual Tour</div>
          <div className="step-into-a-container">
            <p className="step-into-a1">{`Step into a world of modern living! `}</p>
            <p className="explore-our-brand-new">{`Explore our brand-new homes like  never before with our immersive 3D virtual tour. Click now to embark `}</p>
            <p className="on-a">{`on a  virtual journey and experience the elegance, comfort, and style that await you in these stunning homes. `}</p>
            <p className="take-your-time">
              Take your time to wander through each room, visualize the layout,
              and get a feel for the spacious interiors.
            </p>
          </div>
          <div className="wrapper-line-5">
            <img className="wrapper-line-5-child" alt="" src="/line-5.svg" />
          </div>
          <img
            className="depositphotos-59622135-stock-i-icon"
            alt=""
            src="/depositphotos-59622135stockillustration360degresicon-1@2x.png"
          />
          <img
            className="tutorial-preview-image-2-1-icon"
            alt=""
            src="/tutorialpreviewimage2-1@2x.png"
          />
        </div>
      </div>
      <div className="frame32">
        <div className="frame33">
          <div className="frame-child33" />
          
         <div>
            <button className="frame-child34" onClick={() => setOpen(true)}>View Video</button>
            <ModalVideo 
              channel='youtube' 
              autoplay 
              isOpen={isOpen} 
              videoId='Gic_CtkJSjE' 
              onClose={() => setOpen(false)} 
            />
          </div>
        

          
          <button style={{border: 'none', background: 'none'}}>
          <img className="polygon-icon" alt="" src="/polygon-1.svg" />
          </button>
          <div className="vr-supported">VR Supported!</div>
          <div className="frame-child36" />
          <div className="explore-the-3d">Explore the 3D View</div>
          <img className="vector-icon" alt="" src="/vector.svg" />
          <div className="experience-the-future-container">
            <p className="experience-the-future">
              Experience the future of real estate exploration with our advanced
              AR rendering feature, seamlessly integrated with VR capabilities.
              Immerse yourself in a virtual world where you can navigate and
              explore properties with unprecedented freedom. With our AR
              rendering technology, you can visualize every corner of the house
              as if you were physically there, allowing you to move around and
              interact with the space from the comfort of your device.
            </p>
            <p className="whether-youre-interested">
              Whether you're interested in exploring the layout of a new home or
              envisioning potential renovations, our AR feature provides a
              dynamic and immersive experience like no other. With support for
              VR headsets, you can dive even deeper into the virtual
              environment, gaining a true sense of scale and perspective.
            </p>
            <p className="say-goodbye-to">
              Say goodbye to static images and floor plans – with our AR
              rendering feature, the possibilities are endless. Step into the
              future of real estate exploration and unlock new levels of
              interactivity and engagement.
            </p>
          </div>
          <div className="frame-child37" />
          <div className="frame-child38" />
          <div className="frame-child39" />
          <div className="div2">1</div>
          <div className="div3">2</div>
          <div className="div4">3</div>
          <div className="access-your-property-container">
            <p className="access-your-property">
              Access Your Property Listing:
            </p>
            <p className="log-in-to">
              Log in to your account on our real estate platform.
            </p>
            <p className="navigate-to-your">
              Navigate to your property listing that you wish to view in AR
              rendering.
            </p>
          </div>
          <div className="access-your-property-container1">
            <p className="access-your-property1">
              Access Your Property Listing:
            </p>
            <p className="log-in-to1">
              Log in to your account on our real estate platform.
            </p>
            <p className="navigate-to-your1">
              Navigate to your property listing that you wish to view in AR
              rendering.
            </p>
          </div>
          <div className="view-in-ar-container">
            <p className="view-in-ar">View in AR:</p>
            <ul className="open-our-mobile-app-or-ar-comp">
              <li className="open-our-mobile">
                Open our mobile app or AR-compatible web browser on your device.
              </li>
              <li className="paste-the-copied">
                Paste the copied AR tag into the designated field.
              </li>
              <li>
                Watch as your property comes to life in augmented reality,
                allowing you to explore and visualize the space from every
                angle.
              </li>
            </ul>
          </div>
          
          
          
          
        </div>
      </div>
      <div className="frame34">
        <div className="frame35">
          <div className="frame-child46" />
          <img
            className="il6tow0piz-ax8sw-1-icon"
            alt=""
            src="/0-il6tow0pizax8sw-1@2x.png"
          />
          <div className="unlimited-furnishing">Unlimited Furnishing!</div>
          <div className="immerse-yourself-in">
            Immerse yourself in the future of home design with our virtual
            furniture display, providing customers with a vivid and realistic
            experience to effortlessly envision their dream home by virtually
            placing and arranging furniture within the spaces.
          </div>
        </div>
      </div>
      <div className="frame36">
        <div className="frame37">
          <div className="frame-child47" />
          <div className="div5">1</div>
          <div className="frame-child48" />
          <div className="div6">2</div>
          <div className="frame-child49" />
          <div className="div7">3</div>
          <div className="choose-furniture-type-container">
            <p className="choose-furniture-type">
              <b>Choose Furniture Type:</b>
            </p>
            <p className="navigate-through-the">
              {" "}
              Navigate through the options and select the type of furniture
              you're interested in, trusting the website to suggest the best-fit
              sizes for your space.
            </p>
          </div>
          <div className="customize-features-personaliz-container">
            <p className="customize-features">
              <b>{`Customize Features: `}</b>
            </p>
            <p className="personalize-your-furniture">{`Personalize your furniture by choosing specific `}</p>
            <p className="features-such-as">{`features such as  material, color, and other `}</p>
            <p className="relevant-attributes-to">
              relevant attributes to match your style and preferences.
            </p>
          </div>
          <div className="place-in-virtual-container">
            <p className="place-in-virtual-environment">
              <b>{`Place in Virtual Environment: `}</b>
            </p>
            <p className="effortlessly-place-the">{`Effortlessly place the selected furniture within the virtual  `}</p>
            <p className="environment-allowing-you">{`environment, allowing you to seamlessly visualize its placement `}</p>
            <p className="and-appearance-in">
              and appearance in different areas of your home with just a glance.
            </p>
          </div>
          <img
            className="two-chairs-isometric-style-877-icon"
            alt=""
            src="/twochairsisometricstyle-877441084-1@2x.png"
          />
          <img
            className="a348a3390f8213ede953f15a95d4c8-icon"
            alt=""
            src="/9a348a3390f8213ede953f15a95d4c80-1@2x.png"
          />
          <img
            className="depositphotos-139457906-stock-icon"
            alt=""
            src="/depositphotos-139457906stockillustrationapartmentillustrationinisometricprojection-1@2x.png"
          />
        </div>
      </div>
      <div className="frame38">
        <div className="frame39">
          <div className="frame-child50" />
          <div className="top-news">{`Top News & Articles`}</div>
        </div>
      </div>
      <div className="frame40">
        <div className="frame41">
          <img className="frame-child51" alt="" src="/rectangle-53@2x.png" />
          <img className="frame-child52" alt="" src="/rectangle-55@2x.png" />
          <img className="frame-child53" alt="" src="/rectangle-54@2x.png" />
        </div>
      </div>
      <div className="frame42">
        <div className="frame43">
          <read-more7 />
          <read-more8 />
          <read-more9 />
          {/* <button className="read-more7">READ MORE</button>
          <button className="read-more8">READ MORE</button>
          <button className="read-more9">READ MORE</button> */}
         </div>  
        {/* other components */}
      <div className="news-description">{news[0]?.title || '*NEWS DESCRIPTION*'}</div>
      <div className="news-description1">{news[1]?.title || '*NEWS DESCRIPTION*'}</div>
      <div className="news-description2">{news[2]?.title || '*NEWS DESCRIPTION*'}</div>
      {/* other components */}
          


      </div>
      
      <div className="frame44">
        <div className="frame45">
          <div className="frame-child54" />
          <div className="market-insights-explore">
            Market Insights: Explore Real Estate Trends
          </div>
        </div>
      </div>
      <div className="frame46">
        <div className="frame47">
          <img className="frame-child55" alt="" src="/rectangle-56@2x.png" />
          <div className="dive-into-the">
            Dive into the pulse of the real estate market with our comprehensive
            Market Insights feature. Gain access to the latest trends, data, and
            analysis to empower your decision-making process. From property
            values to market forecasts, explore all the information you need to
            stay informed and ahead of the curve in the dynamic world of real
            estate.
          </div>
        </div>
      </div>
      <section className="frame48">
          <Clicktoexplore />
      </section>
      <div className="frame49">
        <div className="frame50">
          <div className="security-and-privacy-container">
            <p className="security-and-privacy">Security and Privacy</p>
          </div>
          <div className="frame51">
            <div className="in-our-project">
              In our project, we prioritize the security and privacy of our
              users' sensitive information and personal data. We utilize JSON
              Web Tokens (JWT) for secure authentication and authorization,
              allowing for the transmission of user data between client and
              server in a secure manner. Additionally, we implement
              industry-standard encryption protocols and secure communication
              channels to protect user accounts, transactions, and sensitive
              data exchanges within our platform. By adhering to best practices
              in web security, including the use of HTTPS for secure
              communication and data encryption at rest, we aim to mitigate
              potential security risks and ensure the integrity and
              confidentiality of user data. Our commitment to maintaining robust
              security measures underscores our dedication to providing a secure
              and trustworthy environment for our users.
            </div>
          </div>
          <div className="frame52">
            <img
              className="incognito-man-free-vector-icon"
              alt=""
              src="/incognitomanfreevectoricon800x5661-1@2x.png"
            />
          </div>
          <div className="frame-child56" />
        </div>
      </div>
      <div className="frame53">
        <div className="in-spotlight">
          <p className="in-spotlight1">In Spotlight</p>
        </div>
      </div>
      <div className="frame54">
        <div className="featured-developers">Featured Developers</div>
      </div>
      <img className="frame-icon1" alt="" src="/frame2.svg" />
    </div>
  );
};

export default Desktop;
