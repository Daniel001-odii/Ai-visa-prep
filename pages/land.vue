<template>
    <div class="font-sans text-gray-800">
      <!-- Navigation -->
      <nav class="fixed top-0 left-0 right-0 bg-white/90 backdrop-blur-sm z-50 border-b border-gray-100">
        <div class="container mx-auto px-4 py-4 flex justify-between items-center">
          <div class="flex items-center space-x-2">
            <TheLogo/>
          </div>
          <div class="hidden md:flex items-center space-x-8">
            <a href="#features" class="text-gray-600 hover:text-blue-600 transition-colors">Features</a>
            <a href="#how-it-works" class="text-gray-600 hover:text-blue-600 transition-colors">How it works</a>
            <a href="#pricing" class="text-gray-600 hover:text-blue-600 transition-colors">Pricing</a>
            <a href="#testimonials" class="text-gray-600 hover:text-blue-600 transition-colors">Testimonials</a>
          </div>
          <div class="flex items-center space-x-4">
            <button class="hidden md:block px-4 py-2 text-blue-600 hover:text-blue-700 transition-colors">Login</button>
            <button class="px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:shadow-lg transition transform hover:-translate-y-0.5">
              Get Started
            </button>
            <button @click="mobileMenuOpen = !mobileMenuOpen" class="md:hidden">
              <menu-icon v-if="!mobileMenuOpen" class="w-6 h-6 text-gray-600" />
              <x-icon v-else class="w-6 h-6 text-gray-600" />
            </button>
          </div>
        </div>
        <!-- Mobile menu -->
        <div v-if="mobileMenuOpen" class="md:hidden bg-white border-b border-gray-100 py-4 px-4">
          <div class="flex flex-col space-y-3">
            <a href="#features" class="text-gray-600 hover:text-blue-600 transition-colors py-2">Features</a>
            <a href="#how-it-works" class="text-gray-600 hover:text-blue-600 transition-colors py-2">How it works</a>
            <a href="#pricing" class="text-gray-600 hover:text-blue-600 transition-colors py-2">Pricing</a>
            <a href="#testimonials" class="text-gray-600 hover:text-blue-600 transition-colors py-2">Testimonials</a>
            <button class="px-4 py-2 text-blue-600 hover:text-blue-700 transition-colors text-left">Login</button>
          </div>
        </div>
      </nav>
  
      <!-- Hero Section -->
      <section class="pt-32 pb-20 bg-gradient-to-b from-white to-blue-50">
        <div class="container mx-auto px-4">
          <div class="flex flex-col md:flex-row items-center gap-5">
            <div class="md:w-1/2 mb-10 md:mb-0">
              <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Ace Your Visa Interview with <span class="bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent">AI Practice</span>
              </h1>
              <p class="text-xl text-gray-600 mb-8">
                Practice with our AI-powered visa interview simulator and boost your confidence. Get real-time feedback and improve your chances of success.
              </p>
              <div class="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <button class="px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:shadow-lg transition transform hover:-translate-y-0.5 font-medium">
                  Start Free Trial
                </button>
                <button class="px-8 py-4 border border-blue-500 text-blue-600 rounded-lg hover:bg-blue-50 transition font-medium flex items-center justify-center">
                  <play-icon class="w-5 h-5 mr-2" />
                  Watch Demo
                </button>
              </div>
              <div class="mt-8 flex items-center space-x-2">
                <div class="flex -space-x-2">
                  <img src="../assets/images/avatar/1.jpeg" alt="User" class="w-10 h-10 rounded-full border-2 border-white" />
                  <img src="../assets/images/avatar/2.jpeg" alt="User" class="w-10 h-10 rounded-full border-2 border-white" />
                  <img src="../assets/images/avatar/3.jpeg" alt="User" class="w-10 h-10 rounded-full border-2 border-white" />
                </div>
                <p class="text-gray-600">
                  <span class="font-semibold">1,000+</span> successful visa applicants
                </p>
              </div>
            </div>
            <div class="md:w-1/2 relative">
              <div class="bg-white rounded-xl shadow-xl p-4 md:p-6 border border-gray-100 relative z-10 transform transition-transform hover:scale-105">
                <div class="bg-gray-800 rounded-lg overflow-hidden">
                  <div class="flex items-center space-x-2 px-4 py-3">
                    <div class="flex space-x-1">
                      <div class="w-3 h-3 bg-red-500 rounded-full"></div>
                      <div class="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <div class="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                    <div class="text-xs text-gray-400">Visa Interview Simulation</div>
                  </div>
                  <div class="bg-gray-900 p-6 relative min-h-[300px]">
                    <div class="flex flex-col space-y-4">
                      <div class="flex items-start space-x-3">
                        <div class="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                          <user-icon class="w-4 h-4 text-white" />
                        </div>
                        <div class="bg-gray-800 rounded-lg p-3 text-gray-300 text-sm max-w-[80%]">
                          Hello, I'm your visa interview simulator. What type of visa are you applying for?
                        </div>
                      </div>
                      <div class="flex items-start space-x-3 justify-end">
                        <div class="bg-blue-600 rounded-lg p-3 text-white text-sm max-w-[80%]">
                          I'm applying for a student visa to study Computer Science.
                        </div>
                        <div class="w-8 h-8 bg-gray-700 rounded-full flex items-center justify-center flex-shrink-0">
                          <user-icon class="w-4 h-4 text-white" />
                        </div>
                      </div>
                      <div class="flex items-start space-x-3">
                        <div class="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                          <user-icon class="w-4 h-4 text-white" />
                        </div>
                        <div class="bg-gray-800 rounded-lg p-3 text-gray-300 text-sm max-w-[80%]">
                          Great. Can you tell me why you chose this particular university and program?
                        </div>
                      </div>
                      <div class="absolute bottom-4 left-0 right-0 px-6">
                        <div class="flex items-center bg-gray-800 rounded-lg px-4 py-2 border border-gray-700">
                          <input type="text" placeholder="Type your response..." class="bg-transparent text-gray-300 w-full focus:outline-none text-sm" />
                          <send-icon class="w-5 h-5 text-blue-500" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="mt-4 flex justify-between items-center">
                  <div class="flex items-center space-x-2">
                    <div class="w-2 h-2 bg-green-500 rounded-full"></div>
                    <span class="text-sm text-gray-600">AI Interview in progress</span>
                  </div>
                  <div class="text-sm text-gray-600">02:45</div>
                </div>
              </div>
              <div class="absolute -bottom-6 -right-6 w-64 h-64 bg-gradient-to-br from-blue-300 to-blue-400 rounded-full filter blur-3xl opacity-20 z-0"></div>
              <div class="absolute -top-6 -left-6 w-64 h-64 bg-gradient-to-br from-blue-300 to-blue-400 rounded-full filter blur-3xl opacity-20 z-0"></div>
            </div>
          </div>
        </div>
      </section>
  
      <!-- Trusted By Section -->
      <section class="py-12 bg-white">
        <div class="container mx-auto px-4">
          <p class="text-center text-gray-500 mb-8">Trusted by applicants from top universities worldwide</p>
          <div class="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-70">
            <div class="w-32 h-12 flex items-center justify-center">
              <div class="text-xl font-bold text-gray-400">HARVARD</div>
            </div>
            <div class="w-32 h-12 flex items-center justify-center">
              <div class="text-xl font-bold text-gray-400">STANFORD</div>
            </div>
            <div class="w-32 h-12 flex items-center justify-center">
              <div class="text-xl font-bold text-gray-400">MIT</div>
            </div>
            <div class="w-32 h-12 flex items-center justify-center">
              <div class="text-xl font-bold text-gray-400">OXFORD</div>
            </div>
            <div class="w-32 h-12 flex items-center justify-center">
              <div class="text-xl font-bold text-gray-400">CAMBRIDGE</div>
            </div>
          </div>
        </div>
      </section>
  
      <!-- Features Section -->
      <section id="features" class="py-20 bg-white">
        <div class="container mx-auto px-4">
          <div class="text-center mb-16">
            <h2 class="text-3xl md:text-4xl font-bold mb-4">Why Choose Visalify?</h2>
            <p class="text-xl text-gray-600 max-w-3xl mx-auto">
              Our AI-powered platform offers everything you need to prepare for your visa interview
            </p>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div class="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition transform hover:-translate-y-1">
              <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <brain-icon class="w-6 h-6 text-blue-600" />
              </div>
              <h3 class="text-xl font-semibold mb-2">AI-Powered Interviews</h3>
              <p class="text-gray-600">
                Practice with our advanced AI that simulates real visa officers and adapts to your responses.
              </p>
            </div>
            <div class="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition transform hover:-translate-y-1">
              <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <clipboard-check-icon class="w-6 h-6 text-blue-600" />
              </div>
              <h3 class="text-xl font-semibold mb-2">Personalized Feedback</h3>
              <p class="text-gray-600">
                Get detailed feedback on your answers, body language, and areas for improvement.
              </p>
            </div>
            <div class="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition transform hover:-translate-y-1">
              <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <globe-icon class="w-6 h-6 text-blue-600" />
              </div>
              <h3 class="text-xl font-semibold mb-2">Country-Specific Training</h3>
              <p class="text-gray-600">
                Practice with scenarios tailored to your destination country's specific visa requirements.
              </p>
            </div>
            <div class="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition transform hover:-translate-y-1">
              <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <file-text-icon class="w-6 h-6 text-blue-600" />
              </div>
              <h3 class="text-xl font-semibold mb-2">Document Preparation</h3>
              <p class="text-gray-600">
                Learn which documents you need and how to present them effectively during your interview.
              </p>
            </div>
            <!-- <div class="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition transform hover:-translate-y-1">
              <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <video-icon class="w-6 h-6 text-blue-600" />
              </div>
              <h3 class="text-xl font-semibold mb-2">Video Recording</h3>
              <p class="text-gray-600">
                Record your practice sessions to review your performance and track your improvement.
              </p>
            </div> -->
            <div class="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition transform hover:-translate-y-1">
              <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <users-icon class="w-6 h-6 text-blue-600" />
              </div>
              <h3 class="text-xl font-semibold mb-2">Expert Community</h3>
              <p class="text-gray-600">
                Connect with successful applicants and visa experts for additional tips and advice.
              </p>
            </div>
          </div>
        </div>
      </section>
  
      <!-- How It Works Section -->
      <section id="how-it-works" class="py-20 bg-blue-50">
        <div class="container mx-auto px-4">
          <div class="text-center mb-16">
            <h2 class="text-3xl md:text-4xl font-bold mb-4">How Visalify Works</h2>
            <p class="text-xl text-gray-600 max-w-3xl mx-auto">
              Our simple 3-step process will have you prepared for your visa interview in no time
            </p>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div class="bg-white p-8 rounded-xl shadow-sm relative">
              <div class="absolute -top-5 -left-5 w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">1</div>
              <div class="mb-6">
                <user-plus-icon class="w-12 h-12 text-blue-600" />
              </div>
              <h3 class="text-xl font-semibold mb-3">Create Your Profile</h3>
              <p class="text-gray-600">
                Sign up and tell us about your visa type, destination country, and personal background.
              </p>
            </div>
            <div class="bg-white p-8 rounded-xl shadow-sm relative">
              <div class="absolute -top-5 -left-5 w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">2</div>
              <div class="mb-6">
                <settings-icon class="w-12 h-12 text-blue-600" />
              </div>
              <h3 class="text-xl font-semibold mb-3">Customize Your Training</h3>
              <p class="text-gray-600">
                Select from various interview scenarios and difficulty levels based on your needs.
              </p>
            </div>
            <div class="bg-white p-8 rounded-xl shadow-sm relative">
              <div class="absolute -top-5 -left-5 w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">3</div>
              <div class="mb-6">
                <video-icon class="w-12 h-12 text-blue-600" />
              </div>
              <h3 class="text-xl font-semibold mb-3">Practice & Improve</h3>
              <p class="text-gray-600">
                Start your simulated interviews, receive feedback, and track your progress over time.
              </p>
            </div>
          </div>
          <div class="mt-16 text-center">
            <button class="px-8 py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:shadow-lg transition transform hover:-translate-y-0.5 font-medium">
              Start Your Journey
            </button>
          </div>
        </div>
      </section>
  
      <!-- Testimonials Section -->
      <section id="testimonials" class="py-20 bg-white">
        <div class="container mx-auto px-4">
          <div class="text-center mb-16">
            <h2 class="text-3xl md:text-4xl font-bold mb-4">Success Stories</h2>
            <p class="text-xl text-gray-600 max-w-3xl mx-auto">
              Hear from applicants who aced their visa interviews after training with Visalify
            </p>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div class="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition">
              <div class="flex items-center mb-4">
                <div class="flex text-yellow-400">
                  <star-icon class="w-5 h-5" />
                  <star-icon class="w-5 h-5" />
                  <star-icon class="w-5 h-5" />
                  <star-icon class="w-5 h-5" />
                  <star-icon class="w-5 h-5" />
                </div>
              </div>
              <p class="text-gray-600 mb-6">
                "Visalify helped me prepare for my student visa interview to the US. The AI asked me questions I actually got during my real interview! I felt so confident and got approved on the spot."
              </p>
              <div class="flex items-center">
                <img src="../assets/images/avatar/1.jpeg" alt="User" class="w-12 h-12 rounded-full mr-4" />
                <div>
                  <h4 class="font-semibold">Sarah Johnson</h4>
                  <p class="text-sm text-gray-500">Student at MIT, USA</p>
                </div>
              </div>
            </div>
            <div class="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition">
              <div class="flex items-center mb-4">
                <div class="flex text-yellow-400">
                  <star-icon class="w-5 h-5" />
                  <star-icon class="w-5 h-5" />
                  <star-icon class="w-5 h-5" />
                  <star-icon class="w-5 h-5" />
                  <star-icon class="w-5 h-5" />
                </div>
              </div>
              <p class="text-gray-600 mb-6">
                "After being rejected twice, I used Visalify to prepare for my third work visa interview. The feedback on my answers helped me understand what I was doing wrong. Third time was a charm!"
              </p>
              <div class="flex items-center">
                <img src="../assets/images/avatar/2.jpeg" alt="User" class="w-12 h-12 rounded-full mr-4" />
                <div>
                  <h4 class="font-semibold">Raj Patel</h4>
                  <p class="text-sm text-gray-500">Software Engineer, Canada</p>
                </div>
              </div>
            </div>
            <div class="bg-white p-6 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition">
              <div class="flex items-center mb-4">
                <div class="flex text-yellow-400">
                  <star-icon class="w-5 h-5" />
                  <star-icon class="w-5 h-5" />
                  <star-icon class="w-5 h-5" />
                  <star-icon class="w-5 h-5" />
                  <star-icon class="w-5 h-5" />
                </div>
              </div>
              <p class="text-gray-600 mb-6">
                "The country-specific training was incredibly helpful for my UK spouse visa. The AI knew exactly what documents I needed to present and how to answer questions about our relationship."
              </p>
              <div class="flex items-center">
                <img src="../assets/images/avatar/3.jpeg" alt="User" class="w-12 h-12 rounded-full mr-4" />
                <div>
                  <h4 class="font-semibold">Maria Rodriguez</h4>
                  <p class="text-sm text-gray-500">Teacher, United Kingdom</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
  
      <!-- Pricing Section -->
      <section id="pricing" class="py-20 bg-blue-50">
        <div class="container mx-auto px-4">
          <div class="text-center mb-16">
            <h2 class="text-3xl md:text-4xl font-bold mb-4">Simple, Transparent Pricing</h2>
            <p class="text-xl text-gray-600 max-w-3xl mx-auto">
              Choose the plan that fits your needs
            </p>
          </div>
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div class="bg-white p-8 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition">
              <h3 class="text-xl font-semibold mb-2">Basic</h3>
              <div class="mb-6">
                <span class="text-4xl font-bold">$29</span>
                <span class="text-gray-500">/month</span>
              </div>
              <ul class="space-y-3 mb-8">
                <li class="flex items-center">
                  <check-icon class="w-5 h-5 text-blue-500 mr-2" />
                  <span>5 practice interviews</span>
                </li>
                <li class="flex items-center">
                  <check-icon class="w-5 h-5 text-blue-500 mr-2" />
                  <span>Basic AI feedback</span>
                </li>
                <li class="flex items-center">
                  <check-icon class="w-5 h-5 text-blue-500 mr-2" />
                  <span>Document checklist</span>
                </li>
                <li class="flex items-center text-gray-400">
                  <x-icon class="w-5 h-5 mr-2" />
                  <span>Video recording</span>
                </li>
                <li class="flex items-center text-gray-400">
                  <x-icon class="w-5 h-5 mr-2" />
                  <span>Expert community access</span>
                </li>
              </ul>
              <button class="w-full py-3 border border-blue-500 text-blue-600 rounded-lg hover:bg-blue-50 transition font-medium">
                Get Started
              </button>
            </div>
            <div class="bg-gradient-to-br from-blue-500 to-blue-600 p-8 rounded-xl shadow-lg transform md:-translate-y-4 relative">
              <div class="absolute top-0 right-0 bg-yellow-400 text-xs font-bold px-3 py-1 rounded-bl-lg rounded-tr-lg text-gray-800">
                POPULAR
              </div>
              <h3 class="text-xl font-semibold mb-2 text-white">Premium</h3>
              <div class="mb-6">
                <span class="text-4xl font-bold text-white">$49</span>
                <span class="text-blue-100">/month</span>
              </div>
              <ul class="space-y-3 mb-8 text-white">
                <li class="flex items-center">
                  <check-icon class="w-5 h-5 mr-2" />
                  <span>Unlimited practice interviews</span>
                </li>
                <li class="flex items-center">
                  <check-icon class="w-5 h-5 mr-2" />
                  <span>Advanced AI feedback</span>
                </li>
                <li class="flex items-center">
                  <check-icon class="w-5 h-5 mr-2" />
                  <span>Document checklist & review</span>
                </li>
                <li class="flex items-center">
                  <check-icon class="w-5 h-5 mr-2" />
                  <span>Video recording</span>
                </li>
                <li class="flex items-center text-blue-100">
                  <x-icon class="w-5 h-5 mr-2" />
                  <span>Expert community access</span>
                </li>
              </ul>
              <button class="w-full py-3 bg-white text-blue-600 rounded-lg hover:shadow-lg transition font-medium">
                Get Started
              </button>
            </div>
            <div class="bg-white p-8 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition">
              <h3 class="text-xl font-semibold mb-2">Enterprise</h3>
              <div class="mb-6">
                <span class="text-4xl font-bold">$99</span>
                <span class="text-gray-500">/month</span>
              </div>
              <ul class="space-y-3 mb-8">
                <li class="flex items-center">
                  <check-icon class="w-5 h-5 text-blue-500 mr-2" />
                  <span>Unlimited practice interviews</span>
                </li>
                <li class="flex items-center">
                  <check-icon class="w-5 h-5 text-blue-500 mr-2" />
                  <span>Premium AI feedback</span>
                </li>
                <li class="flex items-center">
                  <check-icon class="w-5 h-5 text-blue-500 mr-2" />
                  <span>Document checklist & review</span>
                </li>
                <li class="flex items-center">
                  <check-icon class="w-5 h-5 text-blue-500 mr-2" />
                  <span>Video recording</span>
                </li>
                <li class="flex items-center">
                  <check-icon class="w-5 h-5 text-blue-500 mr-2" />
                  <span>Expert community access</span>
                </li>
              </ul>
              <button class="w-full py-3 border border-blue-500 text-blue-600 rounded-lg hover:bg-blue-50 transition font-medium">
                Get Started
              </button>
            </div>
          </div>
          <div class="mt-12 text-center">
            <p class="text-gray-600 mb-4">Need a custom solution for your organization?</p>
            <button class="px-6 py-3 border border-blue-500 text-blue-600 rounded-lg hover:bg-blue-50 transition font-medium">
              Contact Sales
            </button>
          </div>
        </div>
      </section>
  
      <!-- CTA Section -->
      <section class="py-20 bg-white">
        <div class="container mx-auto px-4">
          <div class="bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl p-12 text-center text-white max-w-5xl mx-auto relative overflow-hidden">
            <div class="absolute top-0 left-0 w-full h-full">
              <div class="absolute -top-24 -right-24 w-64 h-64 bg-white rounded-full opacity-10"></div>
              <div class="absolute -bottom-24 -left-24 w-64 h-64 bg-white rounded-full opacity-10"></div>
            </div>
            <div class="relative z-10">
              <h2 class="text-3xl md:text-4xl font-bold mb-4">Ready to Ace Your Visa Interview?</h2>
              <p class="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
                Join thousands of successful applicants who prepared with Visalify. Start your free trial today.
              </p>
              <div class="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
                <button class="px-8 py-4 bg-white text-blue-600 rounded-lg hover:shadow-lg transition transform hover:-translate-y-0.5 font-medium">
                  Start Free Trial
                </button>
                <button class="px-8 py-4 border border-white text-white rounded-lg hover:bg-blue-600 transition font-medium">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
  
      <!-- Footer -->
      <footer class="bg-gray-900 text-white py-12">
        <div class="container mx-auto px-4">
          <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div class=" flex flex-col gap-4">
            <TheLogo/>
              <p class="text-gray-400 mb-6">
                AI-powered visa interview preparation to help you achieve your global dreams.
              </p>
              <div class="flex space-x-4">
                <a href="#" class="text-gray-400 hover:text-white transition">
                  <twitter-icon class="w-5 h-5" />
                </a>
                <a href="#" class="text-gray-400 hover:text-white transition">
                  <facebook-icon class="w-5 h-5" />
                </a>
                <a href="#" class="text-gray-400 hover:text-white transition">
                  <instagram-icon class="w-5 h-5" />
                </a>
                <a href="#" class="text-gray-400 hover:text-white transition">
                  <linkedin-icon class="w-5 h-5" />
                </a>
              </div>
            </div>
            <div>
              <h4 class="text-lg font-semibold mb-4">Product</h4>
              <ul class="space-y-2">
                <li><a href="#" class="text-gray-400 hover:text-white transition">Features</a></li>
                <li><a href="#" class="text-gray-400 hover:text-white transition">Pricing</a></li>
                <li><a href="#" class="text-gray-400 hover:text-white transition">Testimonials</a></li>
                <li><a href="#" class="text-gray-400 hover:text-white transition">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h4 class="text-lg font-semibold mb-4">Resources</h4>
              <ul class="space-y-2">
                <li><a href="#" class="text-gray-400 hover:text-white transition">Blog</a></li>
                <li><a href="#" class="text-gray-400 hover:text-white transition">Visa Guides</a></li>
                <li><a href="#" class="text-gray-400 hover:text-white transition">Country Requirements</a></li>
                <li><a href="#" class="text-gray-400 hover:text-white transition">Success Stories</a></li>
              </ul>
            </div>
            <div>
              <h4 class="text-lg font-semibold mb-4">Company</h4>
              <ul class="space-y-2">
                <li><a href="#" class="text-gray-400 hover:text-white transition">About Us</a></li>
                <li><a href="#" class="text-gray-400 hover:text-white transition">Careers</a></li>
                <li><a href="#" class="text-gray-400 hover:text-white transition">Contact</a></li>
                <li><a href="#" class="text-gray-400 hover:text-white transition">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
          <div class="border-t border-gray-800 mt-12 pt-8 text-center text-gray-500">
            <p>&copy; 2025 Visalify. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  </template>
  
  <script setup>
  definePageMeta({
    layout: 'plain',
  });
  import { ref } from 'vue'
  import { 
    VideoIcon, 
    MenuIcon, 
    XIcon, 
    UserIcon, 
    SendIcon, 
    BrainIcon, 
    ClipboardCheckIcon, 
    GlobeIcon, 
    FileTextIcon, 
    UsersIcon, 
    UserPlusIcon, 
    SettingsIcon, 
    StarIcon, 
    CheckIcon, 
    PlayIcon, 
    TwitterIcon, 
    FacebookIcon, 
    InstagramIcon, 
    LinkedinIcon 
  } from 'lucide-vue-next'
  
  const mobileMenuOpen = ref(false)
  </script>
  
  <style>
  @keyframes fadeIn {
    from { opacity: 0; transform: translateY(20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  .fadeIn {
    animation: fadeIn 0.5s ease-out forwards;
  }
  
  @keyframes pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.05); }
    100% { transform: scale(1); }
  }
  
  .pulse {
    animation: pulse 2s infinite;
  }
  
  html {
    scroll-behavior: smooth;
  }
  </style>