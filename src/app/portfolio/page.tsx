export default function PortfolioPage() {
  const projects = [
    {
      id: 1,
      title: 'Modern Penthouse',
      location: 'Downtown LA',
      image: '🏙️',
      description: 'A stunning urban retreat with contemporary furnishings and minimalist design'
    },
    {
      id: 2,
      title: 'Coastal Villa',
      location: 'Malibu, CA',
      image: '🏖️',
      description: 'Bright and airy spaces inspired by beach living and natural light'
    },
    {
      id: 3,
      title: 'Urban Loft',
      location: 'Brooklyn, NY',
      image: '🏢',
      description: 'Industrial elements blended with modern comfort for creative professionals'
    },
    {
      id: 4,
      title: 'Suburban Residence',
      location: 'San Francisco, CA',
      image: '🏡',
      description: 'Warm and inviting family home with timeless design elements'
    },
    {
      id: 5,
      title: 'Executive Office',
      location: 'Silicon Valley',
      image: '💼',
      description: 'Professional workspace designed for productivity and elegant meetings'
    },
    {
      id: 6,
      title: 'Boutique Hotel Lobby',
      location: 'Miami, FL',
      image: '🏨',
      description: 'Sophisticated hospitality design creating memorable guest experiences'
    }
  ];

  return (
    <main className="min-h-screen bg-stone-50">
      {/* Header */}
      <section className="bg-white border-b border-stone-200 py-16">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-5xl md:text-6xl font-light text-stone-900 mb-4 tracking-tight">Projects</h1>
          <p className="text-lg text-stone-600 font-light">
            A selection of completed interior design projects
          </p>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {projects.map((project) => (
            <div 
              key={project.id} 
              className="group"
            >
              <div className="aspect-video bg-gradient-to-br from-stone-300 to-stone-200 overflow-hidden mb-8 flex items-center justify-center text-8xl">
                <span className="group-hover:scale-110 transition-transform duration-300">
                  {project.image}
                </span>
              </div>
              <div className="">
                <p className="text-sm text-stone-500 font-light mb-3 tracking-wide">
                  {project.location}
                </p>
                <h3 className="text-2xl font-light text-stone-900 mb-4">
                  {project.title}
                </h3>
                <p className="text-stone-600 font-light mb-6 leading-relaxed">
                  {project.description}
                </p>
                <button className="px-6 py-3 border border-stone-900 text-stone-900 hover:bg-stone-900 hover:text-white transition-colors font-light text-sm tracking-wide">
                  View Project
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-white border-t border-stone-200 py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-light text-stone-900 mb-4 tracking-tight">
            What Our Clients Say
          </h2>
          <p className="text-lg text-stone-600 font-light mb-16">
            Feedback from our recent projects
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                name: 'Sarah Johnson',
                role: 'Homeowner',
                testimonial: 'The team transformed our house into our dream home. Every detail was thoughtfully planned and executed.',
                rating: 5
              },
              {
                name: 'Michael Chen',
                role: 'Real Estate Developer',
                testimonial: 'Their design expertise has been invaluable for our properties. They understand both aesthetics and functionality.',
                rating: 5
              },
              {
                name: 'Lisa Martinez',
                role: 'Business Owner',
                testimonial: 'Outstanding service and attention to detail. Our office space now inspires creativity and collaboration.',
                rating: 5
              }
            ].map((testimonial, index) => (
              <div key={index} className="border-t border-stone-200 pt-8">
                <div className="flex gap-1 mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-stone-400 text-lg">★</span>
                  ))}
                </div>
                <p className="text-stone-600 mb-8 font-light text-lg leading-relaxed">
                  "{testimonial.testimonial}"
                </p>
                <p className="font-light text-stone-900">{testimonial.name}</p>
                <p className="text-stone-500 text-sm font-light">{testimonial.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
