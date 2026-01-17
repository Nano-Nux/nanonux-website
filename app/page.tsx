import Image from "next/image";

export default function Home() {
  const services = [
    {
      category: "Product & Software Development",
      icon: "💻",
      items: [
        "Custom web application development",
        "SaaS platform development",
        "Mobile app development (iOS / Android / cross-platform)",
        "Desktop application development",
        "Internal business tools",
        "API & backend development",
        "System architecture design"
      ]
    },
    {
      category: "Frontend & UI Engineering",
      icon: "🎨",
      items: [
        "Responsive website development",
        "React / Next.js application development",
        "UI component libraries",
        "Design-to-code implementation",
        "Performance optimization",
        "Accessibility compliance"
      ]
    },
    {
      category: "UX & Product Design",
      icon: "✨",
      items: [
        "UI/UX design",
        "Wireframing & prototyping",
        "User journey mapping",
        "Design systems",
        "Usability testing"
      ]
    },
    {
      category: "Business Automation",
      icon: "⚡",
      items: [
        "Workflow automation",
        "No-code / low-code solutions",
        "CRM and ERP setup",
        "Third-party API integrations",
        "Data pipeline automation"
      ]
    },
    {
      category: "SaaS & Cloud Solutions",
      icon: "☁️",
      items: [
        "SaaS product strategy",
        "Subscription system setup",
        "Cloud deployment",
        "Serverless architecture",
        "Database design & scaling"
      ]
    },
    {
      category: "AI & Data Solutions",
      icon: "🤖",
      items: [
        "AI-powered chatbots",
        "Data dashboards & analytics",
        "Machine learning integration",
        "Recommendation systems",
        "Predictive analytics"
      ]
    },
    {
      category: "E-Commerce Solutions",
      icon: "🛒",
      items: [
        "Online store development",
        "Payment gateway integration",
        "Inventory management systems",
        "Marketplace platforms",
        "Subscription commerce"
      ]
    },
    {
      category: "Maintenance & Support",
      icon: "🛠️",
      items: [
        "Ongoing technical support",
        "Bug fixing & updates",
        "Security monitoring",
        "Performance monitoring",
        "Hosting & DevOps management"
      ]
    },
    {
      category: "Consulting & Strategy",
      icon: "💡",
      items: [
        "Tech stack consulting",
        "Product roadmap planning",
        "Startup MVP strategy",
        "Code audit & optimization",
        "CTO-as-a-Service"
      ]
    },
    {
      category: "Digital Products",
      icon: "📦",
      items: [
        "Website templates",
        "UI kits",
        "Starter codebases",
        "Developer tools",
        "Online courses & workshops"
      ]
    },
    {
      category: "Emerging Tech",
      icon: "🚀",
      items: [
        "Blockchain applications",
        "IoT dashboards",
        "AR / VR experiences",
        "Web3 integrations"
      ]
    },
    {
      category: "IoT & Smart Systems",
      icon: "🔌",
      items: [
        "Custom IoT device development",
        "Sensor-based monitoring systems",
        "Real-time device dashboards",
        "Cloud-connected device platforms",
        "Mobile apps for smart devices",
        "Edge computing solutions",
        "Device fleet management",
        "Data collection & analytics",
        "Hardware-software integration"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 nav-elev">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <Image src="/logo.svg" alt="NANO NUX" width={120} height={80} className="h-12 w-auto" />
            </div>
            <div className="hidden md:flex space-x-8">
              <a href="#services" className="text-gray-600 hover:text-[#1E3A8A] transition-colors nav-link">Services</a>
              <a href="#about" className="text-gray-600 hover:text-[#1E3A8A] transition-colors nav-link">About</a>
              <a href="#contact" className="px-6 py-2 bg-[#E5B80B] text-white rounded-full hover:bg-[#d4a90a] transition-all hover:scale-105">
                Get Started
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 gradient-overlay">
        <div className="max-w-7xl mx-auto text-center">
          <div className="animate-fade-in-up">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 text-[#1E3A8A] leading-tight">
              Transform Your Vision
              <br />
              Into <span className="gradient-text">Reality</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto">
              Premium software development, AI solutions, and cutting-edge technology consulting
              for ambitious businesses.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#services"
                className="px-8 py-4 bg-[#1E3A8A] text-white rounded-full text-lg font-semibold hover:bg-[#1e3a8ae6] transition-all hover:scale-105 shadow-lg"
              >
                Explore Our Services
              </a>
              <a
                href="#contact"
                className="px-8 py-4 bg-white text-[#1E3A8A] border-2 border-[#1E3A8A] rounded-full text-lg font-semibold hover:bg-[#1E3A8A] hover:text-white transition-all hover:scale-105"
              >
                Start Your Project
              </a>
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 max-w-4xl mx-auto">
            {[
              { label: "Projects Delivered", value: "500+" },
              { label: "Client Satisfaction", value: "98%" },
              { label: "Years Experience", value: "10+" },
              { label: "Tech Experts", value: "50+" }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold text-[#E5B80B] mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 px-4 bg-gray-50 anchor-center">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[#1E3A8A] mb-4 gold-line inline-block">
              Our Services
            </h2>
            <p className="text-xl text-gray-600 mt-8 max-w-2xl mx-auto">
              Comprehensive technology solutions tailored to your business needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="service-card bg-white rounded-2xl p-8 border border-gray-100 hover:border-[#E5B80B]"
              >
                <div className="text-5xl mb-4">{service.icon}</div>
                <h3 className="text-2xl font-bold text-[#1E3A8A] mb-4">{service.category}</h3>
                <ul className="space-y-2">
                  {service.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start text-gray-600">
                      <span className="text-[#E5B80B] mr-2 mt-1">▸</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section id="about" className="py-20 px-4 bg-white anchor-center">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-[#1E3A8A] mb-4 gold-line inline-block">
              Why Choose NANO NUX
            </h2>
            <p className="text-xl text-gray-600 mt-8 max-w-2xl mx-auto">
              We deliver excellence through innovation, expertise, and dedication
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Cutting-Edge Technology",
                description: "We leverage the latest technologies and best practices to build future-proof solutions that scale with your business.",
                icon: "🚀"
              },
              {
                title: "Expert Team",
                description: "Our team of seasoned developers, designers, and consultants bring decades of combined experience to every project.",
                icon: "👥"
              },
              {
                title: "Client-Centric Approach",
                description: "Your success is our priority. We work closely with you to understand your goals and deliver solutions that exceed expectations.",
                icon: "🎯"
              },
              {
                title: "Agile Development",
                description: "Fast, iterative delivery with continuous feedback ensures your project stays on track and adapts to changing needs.",
                icon: "⚡"
              },
              {
                title: "Premium Quality",
                description: "We maintain the highest standards of code quality, security, and performance in every line we write.",
                icon: "✨"
              },
              {
                title: "End-to-End Support",
                description: "From initial consultation to post-launch support, we're with you every step of the way.",
                icon: "🛠️"
              }
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-gray-50 to-white rounded-2xl p-8 border border-gray-100 hover:border-[#E5B80B] transition-all hover:shadow-xl"
              >
                <div className="text-5xl mb-4">{feature.icon}</div>
                <h3 className="text-2xl font-bold text-[#1E3A8A] mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-br from-[#1E3A8A] to-[#2563EB]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Build Something Amazing?
          </h2>
          <p className="text-xl text-blue-100 mb-10">
            Let's discuss your project and turn your ideas into reality
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#contact"
              className="px-8 py-4 bg-[#E5B80B] text-white rounded-full text-lg font-semibold hover:bg-[#d4a90a] transition-all hover:scale-105 shadow-lg"
            >
              Schedule a Consultation
            </a>
            <a
              href="mailto:hello@nanonux.com"
              className="px-8 py-4 bg-white text-[#1E3A8A] rounded-full text-lg font-semibold hover:bg-gray-50 transition-all hover:scale-105"
            >
              Email Us
            </a>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-4 bg-gray-50 anchor-center">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-[#1E3A8A] mb-4 gold-line inline-block">
              Get In Touch
            </h2>
            <p className="text-xl text-gray-600 mt-8">
              Start your digital transformation journey today
            </p>
          </div>

          <div className="bg-white rounded-2xl p-8 md:p-12 shadow-lg border border-gray-100">
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#E5B80B] transition-colors"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Email</label>
                  <input
                    type="email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#E5B80B] transition-colors"
                    placeholder="hello@nanonux.com"
                  />
                </div>
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Service Interested In</label>
                <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#E5B80B] transition-colors">
                  <option>Select a service</option>
                  {services.map((service, index) => (
                    <option key={index}>{service.category}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">Project Details</label>
                <textarea
                  rows={5}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-[#E5B80B] transition-colors"
                  placeholder="Tell us about your project..."
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full px-8 py-4 bg-[#1E3A8A] text-white rounded-full text-lg font-semibold hover:bg-[#1e3a8ae6] transition-all hover:scale-105 shadow-lg"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1E3A8A] text-white py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <Image src="/logo.svg" alt="NANO NUX" width={120} height={80} className="h-16 w-auto mb-4 brightness-0 invert" />
              <p className="text-blue-200">
                Transforming businesses through innovative technology solutions.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-[#E5B80B]">Quick Links</h4>
              <ul className="space-y-2">
                <li><a href="#services" className="text-blue-200 hover:text-white transition-colors">Services</a></li>
                <li><a href="#about" className="text-blue-200 hover:text-white transition-colors">About</a></li>
                <li><a href="#contact" className="text-blue-200 hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-[#E5B80B]">Services</h4>
              <ul className="space-y-2">
                <li className="text-blue-200">Software Development</li>
                <li className="text-blue-200">AI Solutions</li>
                <li className="text-blue-200">IoT Systems</li>
                <li className="text-blue-200">Consulting</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4 text-[#E5B80B]">Contact</h4>
              <ul className="space-y-2 text-blue-200">
                <li>hello@nanonux.com</li>
                <li>+1 (555) 123-4567</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-blue-800 pt-8 text-center text-blue-200">
            <p>&copy; {new Date().getFullYear()} NANO NUX. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
