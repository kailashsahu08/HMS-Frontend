import React from 'react';
import { 
  Activity, 
  Heart, 
  Shield, 
  Users, 
  Clock, 
  Star,
  Phone,
  MapPin,
  Calendar,
  Award,
  Stethoscope,
  Ambulance,
  Building2,
  UserCheck,
  ArrowRight,
  CheckCircle,
  PlayCircle
} from 'lucide-react';

const Home = () => {
  const features = [
    {
      icon: Heart,
      title: 'Expert Medical Care',
      description: 'Our team of experienced doctors and specialists provide comprehensive healthcare services with compassion and expertise.',
      color: 'from-red-500 to-pink-500'
    },
    {
      icon: Shield,
      title: '24/7 Emergency Services',
      description: 'Round-the-clock emergency care with state-of-the-art equipment and immediate response for critical situations.',
      color: 'from-green-500 to-cyan-500'
    },
    {
      icon: Users,
      title: 'Patient-Centered Approach',
      description: 'We prioritize patient comfort and satisfaction, ensuring personalized care tailored to individual needs.',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: Award,
      title: 'Advanced Technology',
      description: 'Cutting-edge medical technology and modern facilities to provide the highest quality healthcare services.',
      color: 'from-purple-500 to-indigo-500'
    }
  ];

  const services = [
    {
      icon: Stethoscope,
      title: 'General Medicine',
      description: 'Comprehensive primary care services',
      link: '/services/general-medicine'
    },
    {
      icon: Heart,
      title: 'Cardiology',
      description: 'Heart and cardiovascular care',
      link: '/services/cardiology'
    },
    {
      icon: Activity,
      title: 'Surgery',
      description: 'Advanced surgical procedures',
      link: '/services/surgery'
    },
    {
      icon: Users,
      title: 'Pediatrics',
      description: 'Specialized care for children',
      link: '/services/pediatrics'
    },
    {
      icon: Building2,
      title: 'Radiology',
      description: 'Medical imaging services',
      link: '/services/radiology'
    },
    {
      icon: UserCheck,
      title: 'Laboratory',
      description: 'Diagnostic testing services',
      link: '/services/laboratory'
    }
  ];

  const stats = [
    { icon: Users, value: '10,000+', label: 'Happy Patients' },
    { icon: Heart, value: '50+', label: 'Expert Doctors' },
    { icon: Award, value: '25+', label: 'Years Experience' },
    { icon: Shield, value: '24/7', label: 'Emergency Care' }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Patient',
      content: 'The care I received at Healthcare was exceptional. The staff was professional, caring, and made me feel comfortable throughout my treatment.',
      rating: 5,
      avatar: '👩‍💼'
    },
    {
      name: 'Michael Chen',
      role: 'Patient',
      content: 'Outstanding medical facility with state-of-the-art equipment. The doctors are knowledgeable and truly care about their patients.',
      rating: 5,
      avatar: '👨‍💻'
    },
    {
      name: 'Emily Davis',
      role: 'Patient',
      content: 'From emergency care to follow-up appointments, Healthcare provided excellent service. I highly recommend this hospital.',
      rating: 5,
      avatar: '👩‍🏫'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-green-900 via-green-800 to-cyan-800 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute inset-0 bg-gradient-to-r from-green-900/50 to-transparent"></div>
        
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full">
            <div className="grid grid-cols-8 gap-4 h-full">
              {[...Array(64)].map((_, i) => (
                <div key={i} className="bg-white/5 rounded-lg animate-pulse" style={{
                  animationDelay: `${i * 0.1}s`,
                  animationDuration: `${2 + (i % 3)}s`
                }}></div>
              ))}
            </div>
          </div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                  Your Health,{' '}
                  <span className="bg-gradient-to-r from-cyan-400 to-green-400 bg-clip-text text-transparent">
                    Our Priority
                  </span>
                </h1>
                <p className="text-xl text-green-100 leading-relaxed max-w-xl">
                  Experience exceptional healthcare with our team of dedicated professionals, 
                  state-of-the-art facilities, and compassionate care.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-gradient-to-r from-cyan-500 to-green-500 hover:from-cyan-600 hover:to-green-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center group">
                  <Calendar className="w-5 h-5 mr-2" />
                  Book Appointment
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </button>
                
                <button className="bg-white/10 backdrop-blur-lg hover:bg-white/20 text-white px-8 py-4 rounded-2xl font-semibold text-lg border border-white/20 hover:border-white/30 transition-all duration-300 flex items-center justify-center group">
                  <Phone className="w-5 h-5 mr-2" />
                  Emergency: +1 (555) 123-4567
                </button>
              </div>

              <div className="flex items-center space-x-8 pt-4">
                <div className="text-center">
                  <div className="text-3xl font-bold text-cyan-400">24/7</div>
                  <div className="text-sm text-green-200">Emergency Care</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-cyan-400">50+</div>
                  <div className="text-sm text-green-200">Expert Doctors</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-cyan-400">25+</div>
                  <div className="text-sm text-green-200">Years Experience</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative bg-white/10 backdrop-blur-lg rounded-3xl p-8 border border-white/20">
                <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-cyan-500 to-green-500 rounded-2xl flex items-center justify-center shadow-xl">
                  <Activity className="w-12 h-12 text-white" />
                </div>
                
                <div className="space-y-6">
                  <h3 className="text-2xl font-bold">Quick Actions</h3>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <button className="bg-white/10 hover:bg-white/20 p-4 rounded-xl transition-all duration-300 text-left group">
                      <Calendar className="w-8 h-8 text-cyan-400 mb-2 group-hover:scale-110 transition-transform duration-300" />
                      <div className="font-medium">Book Appointment</div>
                      <div className="text-sm text-green-200">Schedule a visit</div>
                    </button>
                    
                    <button className="bg-white/10 hover:bg-white/20 p-4 rounded-xl transition-all duration-300 text-left group">
                      <Ambulance className="w-8 h-8 text-red-400 mb-2 group-hover:scale-110 transition-transform duration-300" />
                      <div className="font-medium">Emergency</div>
                      <div className="text-sm text-green-200">24/7 Available</div>
                    </button>
                    
                    <button className="bg-white/10 hover:bg-white/20 p-4 rounded-xl transition-all duration-300 text-left group">
                      <MapPin className="w-8 h-8 text-green-400 mb-2 group-hover:scale-110 transition-transform duration-300" />
                      <div className="font-medium">Find Us</div>
                      <div className="text-sm text-green-200">Get directions</div>
                    </button>
                    
                    <button className="bg-white/10 hover:bg-white/20 p-4 rounded-xl transition-all duration-300 text-left group">
                      <Phone className="w-8 h-8 text-yellow-400 mb-2 group-hover:scale-110 transition-transform duration-300" />
                      <div className="font-medium">Contact</div>
                      <div className="text-sm text-green-200">Get in touch</div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Why Choose Healthcare?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We are committed to providing exceptional healthcare services with 
              cutting-edge technology and compassionate care.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const IconComponent = feature.icon;
              return (
                <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 group">
                  <div className={`w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <IconComponent className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Services</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive healthcare services delivered by our expert medical professionals
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <div key={index} className="group">
                  <div className="bg-gradient-to-br from-green-50 to-cyan-50 rounded-2xl p-8 hover:shadow-xl transition-all duration-300 border border-green-100 hover:border-green-200">
                    <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-cyan-500 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{service.title}</h3>
                    <p className="text-gray-600 mb-6">{service.description}</p>
                    <a
                      href={service.link}
                      className="inline-flex items-center text-green-600 hover:text-green-700 font-semibold group-hover:translate-x-1 transition-all duration-300"
                    >
                      Learn More
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gradient-to-br from-green-600 to-cyan-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Trusted by Thousands</h2>
            <p className="text-xl text-green-100">
              Our commitment to excellence is reflected in our achievements
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="w-20 h-20 bg-white/10 backdrop-blur-lg rounded-2xl flex items-center justify-center mx-auto mb-4 hover:scale-110 transition-transform duration-300">
                    <IconComponent className="w-10 h-10 text-white" />
                  </div>
                  <div className="text-4xl font-bold mb-2">{stat.value}</div>
                  <div className="text-green-100 font-medium">{stat.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Patients Say</h2>
            <p className="text-xl text-gray-600">
              Real experiences from real patients who trust us with their health
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                <div className="flex items-center mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-6 leading-relaxed">"{testimonial.content}"</p>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-cyan-500 rounded-full flex items-center justify-center text-2xl mr-4">
                    {testimonial.avatar}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">{testimonial.name}</div>
                    <div className="text-gray-500 text-sm">{testimonial.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-green-900 to-cyan-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold mb-6">
              Ready to Experience Quality Healthcare?
            </h2>
            <p className="text-xl text-green-100 mb-8 leading-relaxed">
              Take the first step towards better health. Book your appointment today 
              or contact us for any healthcare needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-green-900 hover:bg-green-50 px-8 py-4 rounded-2xl font-semibold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 transition-all duration-300 flex items-center justify-center group">
                <Calendar className="w-5 h-5 mr-2" />
                Book Appointment
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform duration-300" />
              </button>
              <button className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-green-900 px-8 py-4 rounded-2xl font-semibold text-lg transition-all duration-300 flex items-center justify-center">
                <Phone className="w-5 h-5 mr-2" />
                Call Us Now
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;