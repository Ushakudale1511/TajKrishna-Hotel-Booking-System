import { Carousel } from "react-bootstrap";
import image1 from "../../assets/images/Taj1.jpg";
import image2 from "../../assets/images/Taj2.jpg";
import image3 from "../../assets/images/images3.jpg"; 
import "../../index.css";

const MainHeader = () => {
  return (
    <header className="header-banner">
      <Carousel>

        <Carousel.Item>
          <img
            className="d-block w-100 carousel-image"
            src={image1}
            alt="First slide"
          />
          <Carousel.Caption className="carousel-caption-dark">
            <h1 className="centered-text carosel1-color">
              Welcome to <span className="hotel-color">Our Premier Hotel</span>
            </h1>
            <h4 className="carosel1-color">
              Experience Refined Elegance and World-Class Service
            </h4>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="d-block w-100 carousel-image"
            src={image2}
            alt="Second slide"
          />
          <Carousel.Caption className="carousel-caption-dark">
            <h1 className="centered-text bg-warning">
              Discover <span className="hotel-color">our exclusive services</span>
            </h1>
            <h4 className="bg-warning">
              A Stay Designed for Your Ultimate Comfort
            </h4>
          </Carousel.Caption>
        </Carousel.Item>

        <Carousel.Item>
          <img
            className="d-block w-100 carousel-image"
            src={image3}
            alt="Third slide"
          />
          <Carousel.Caption className="carousel-caption-dark">
            <h1 className="centered-text carosel3-color">
              Relax at <span className="hotel-color">our serene environment</span>
            </h1>
            <h4 className="carosel3-color">
              Your comfort is our priority
            </h4>
          </Carousel.Caption>
        </Carousel.Item>

      </Carousel>
    </header>
  );
};

export default MainHeader;
