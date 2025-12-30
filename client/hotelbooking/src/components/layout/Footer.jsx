import "../../index.css";

const Footer = () => {
  return (
    <footer className="footer bg-dark text-light py-3 mt-5">
      <div className="container text-center">
        <p className="mb-0">
          &copy; {new Date().getFullYear()} Hotel Booking —
          <span className="text-warning fw-bold"> Taj Krishna</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
