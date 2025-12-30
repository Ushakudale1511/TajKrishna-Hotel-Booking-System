import { Container, Carousel } from "react-bootstrap";
import image1 from "../../assets/images/para1.jpg";
import image2 from "../../assets/images/image2.jpg";
import image3 from "../../assets/images/para2.jpg";

const Parallax = () => {
  return (
    <div className="parallax mb-5">
      <Container className="text-center px-5 py-5 justify-content-center">
        <Carousel>

          <Carousel.Item>
            <img
              className="d-block w-100"
              src={image1}
              alt="Luxurious hotel lobby"
            />
            <Carousel.Caption>
              <h1 style={{ textShadow: "none" }}>
                Discover <span className="hotel-color">Taj Krishna Hotel</span>
              </h1>
              <h3 style={{ textShadow: "none" }}>
                Providing exceptional services for your comfort
              </h3>
            </Carousel.Caption>
          </Carousel.Item>

          <Carousel.Item>
            <img
              className="d-block w-100"
              src={image2}
              alt="Premium hotel suite"
            />
            <Carousel.Caption>
              <h1 style={{ textShadow: "none" }}>
                Discover <span className="hotel-color">Taj Krishna Hotel</span>
              </h1>
              <h3 style={{ textShadow: "none" }}>
                Enjoy luxury and elegance
              </h3>
            </Carousel.Caption>
          </Carousel.Item>

          <Carousel.Item>
            <img
              className="d-block w-100"
              src={image3}
              alt="Relaxing hotel ambience"
            />
            <Carousel.Caption>
              <h1 style={{ textShadow: "none" }}>
                Discover <span className="hotel-color">Taj Krishna Hotel</span>
              </h1>
              <h3 style={{ textShadow: "none" }}>
                Your comfort is our mission
              </h3>
            </Carousel.Caption>
          </Carousel.Item>

        </Carousel>
      </Container>
    </div>
  );
};

export default Parallax;
