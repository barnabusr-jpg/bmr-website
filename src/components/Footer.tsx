import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t border-border py-12 px-6">
      <div className="container mx-auto max-w-7xl">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-2xl font-bold mb-2">BMR Solutions</h3>
            <p className="text-sm text-muted-foreground">
              Strategic Advisory for Responsible AI
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Navigation</h4>
            <nav className="flex flex-col gap-2">
              <Link to="/services" className="text-sm text-muted-foreground hover:text-primary transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded-sm">
                Services
              </Link>
              <Link to="/frameworks" className="text-sm text-muted-foreground hover:text-primary transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded-sm">
                Frameworks
              </Link>
              <Link to="/insights" className="text-sm text-muted-foreground hover:text-primary transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded-sm">
                Insights
              </Link>
              <Link to="/contact" className="text-sm text-muted-foreground hover:text-primary transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded-sm">
                Contact
              </Link>
              <Link to="/promise-gap" className="text-sm text-muted-foreground hover:text-primary transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded-sm">
                Promise Gap
              </Link>
              <Link to="/promise-gap/problem" className="text-sm text-muted-foreground hover:text-primary transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded-sm">
                Promise Gap Problem
              </Link>
              <Link to="/promise-gap/diagnostic" className="text-sm text-muted-foreground hover:text-primary transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded-sm">
                Promise Gap Diagnostic
              </Link>
              <Link to="/promise-gap/video" className="text-sm text-muted-foreground hover:text-primary transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded-sm">
                Promise Gap Video
              </Link>
              <Link to="/downloads/HAI-AVS-Field-Guide-Summary" className="text-sm text-muted-foreground hover:text-primary transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded-sm">
                Field Guide
              </Link>
              <Link to="/thank-you" className="text-sm text-muted-foreground hover:text-primary transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded-sm">
                Thank You
              </Link>
            </nav>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Legal</h4>
            <nav className="flex flex-col gap-2">
              <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded-sm">
                Privacy Policy
              </a>
              <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 rounded-sm">
                Terms of Service
              </a>
            </nav>
          </div>
        </div>
        
        <div className="text-center text-sm text-muted-foreground pt-8 border-t border-border">
          © {new Date().getFullYear()} BMR Solutions. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
