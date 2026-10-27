function Footer() {
  return (
    <footer>

      <div className="signup">
        <h3>SIGN UP FOR OUR DAILY INSIDER</h3>

        <input
          type="email"
          placeholder="Enter your email"
        />

        <button>Subscribe</button>
      </div>

      <div className="footer-content">

        <div>
          <h3>Explore</h3>
          <p>Home</p>
          <p>Questions</p>
          <p>Articles</p>
          <p>Tutorials</p>
        </div>

        <div>
          <h3>Support</h3>
          <p>FAQs</p>
          <p>Help</p>
          <p>Contact Us</p>
        </div>

        <div>
          <h3>Stay connected</h3>
          <div className="socials">
            <span>f</span>
            <span>𝕏</span>
            <span>◎</span>
          </div>
        </div>

      </div>

      <div className="footer-bottom">
        <p>DEV@Deakin 2026</p>
        <p>Privacy Policy | Terms | Code of Conduct</p>
      </div>

    </footer>
  );
}

export default Footer;