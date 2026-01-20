import { useState, useEffect } from 'react';
import { Quote, ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { ScrollAnimation } from '@/hooks/useScrollAnimation';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  content: string;
  avatar: string;
  rating: number;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: 'Oluwafemi Olasubomi Otusanya',
    role: 'Founder & Director',
    company: 'TechBridle Foundation',
    content: 'Nicolette has demonstrated exceptional technical proficiency throughout our intensive 11-month software development bootcamp. Her GitHub contributions reveal mastery across multiple programming languages and frameworks, with 138 total commits across diverse projects. She has successfully built full-stack applications and contributed significantly to team projects, demonstrating both theoretical understanding and practical application. Her code quality and problem-solving capabilities are evident in her systematic approach to debugging and continuous learning.',
    avatar: '/testimonials/oluwafemi-otusanya.jpg',
    rating: 5,
  },
  {
    id: 2,
    name: 'Lindy Heyns',
    role: 'Director & Life Coach',
    company: 'TechBridle Foundation',
    content: 'What sets Nicolette apart is her combination of technical excellence, leadership qualities, and genuine passion for software development. She has achieved recognition as the #3 ranked female GitHub contributor in South Africa while balancing full-time studies and family responsibilities, showcasing exceptional time management and dedication. Her proactive approach to learning, willingness to tackle complex backend challenges, and ability to mentor peers through technical discussions make her an invaluable team member. I recommend Nicolette without reservation for any software development role.',
    avatar: '/testimonials/lindy-heyns.jpg',
    rating: 5,
  },
  {
    id: 3,
    name: 'Lunga Mashaba',
    role: 'Software Developer',
    company: 'TechBridle Foundation',
    content: 'Thank you for being my constant reminder that I\'m capable of more than I think. Our collaboration, energy, and shared vision made this journey even more meaningful. Working alongside Nicolette showed me what true partnership looks like in tech - she brings incredible technical skills, unwavering support, and the kind of positive energy that lifts everyone around her.',
    avatar: '/testimonials/lunga-mashaba.png',
    rating: 5,
  },
  {
    id: 4,
    name: 'Jason Oosthuizen',
    role: 'Supervisor',
    company: 'Coast IT',
    content: 'Nicolette showed strong engagement, rapid technical progression, and consistent contribution across backend development, architecture design, real-time integration, and full system preparation. She demonstrated professionalism, solid growth, and reliable delivery across all software engineering tasks. Her ability to collaborate effectively within a multi-disciplinary team, manage backend responsibilities while coordinating with other components, and deliver under deadline-driven environments shows strong readiness for advanced development responsibilities.',
    avatar: '/testimonials/jason-oosthuizen.jpg',
    rating: 5,
  },
  {
    id: 5,
    name: 'Chibuzor Victor',
    role: 'Senior Developer',
    company: 'Online Discipleship',
    content: 'I had the pleasure of mentoring Nicolette on the Online Discipleship project, where she built the entire website supporting both Lithuanian and English languages. Her ability to take on complex multilingual requirements, implement clean architecture, and deliver a polished product under mentorship was impressive. Nicolette showed exceptional learning agility, attention to detail, and commitment to quality throughout the project.',
    avatar: '/testimonials/chibuzor-victor.jpg',
    rating: 5,
  },
];

export const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const goToPrevious = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToNext = () => {
    setIsAutoPlaying(false);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  return (
    <section id="testimonials" className="relative py-16 md:py-24 lg:py-32 px-4 sm:px-6">
      <div className="container mx-auto max-w-6xl">
        <ScrollAnimation animation="fade-up">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4 glow-text">
              <span className="text-primary font-mono">{'<'}</span>
              Testimonials
              <span className="text-primary font-mono">{' />'}</span>
            </h2>
            <p className="text-muted-foreground text-sm md:text-base lg:text-lg">
              What colleagues and clients say about working with me
            </p>
          </div>
        </ScrollAnimation>

        <ScrollAnimation animation="scale" delay={200}>
          <div className="relative">
            {/* Main testimonial card */}
            <div className="glass rounded-2xl md:rounded-3xl p-6 sm:p-8 md:p-12 relative overflow-hidden">
              {/* Background decoration */}
              <div className="absolute top-0 left-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
              <div className="absolute bottom-0 right-0 w-40 h-40 bg-accent/10 rounded-full blur-3xl" />
              
              {/* Quote icon */}
              <Quote className="absolute top-6 right-6 md:top-8 md:right-8 w-12 h-12 md:w-16 md:h-16 text-primary/20" />

              <div className="relative z-10">
                {/* Testimonial content with transition */}
                <div className="min-h-[200px] md:min-h-[180px] flex flex-col justify-center">
                  <div
                    key={currentIndex}
                    className="animate-fade-in"
                  >
                    {/* Rating */}
                    <div className="flex gap-1 mb-4 md:mb-6 justify-center md:justify-start">
                      {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                        <Star
                          key={i}
                          size={18}
                          className="fill-accent text-accent"
                          style={{ animationDelay: `${i * 100}ms` }}
                        />
                      ))}
                    </div>

                    {/* Quote */}
                    <blockquote className="text-base sm:text-lg md:text-xl lg:text-2xl text-foreground/90 leading-relaxed mb-6 md:mb-8 text-center md:text-left">
                      "{testimonials[currentIndex].content}"
                    </blockquote>

                    {/* Author */}
                    <div className="flex items-center gap-4 justify-center md:justify-start">
                      <div className="relative">
                        <img
                          src={testimonials[currentIndex].avatar}
                          alt={testimonials[currentIndex].name}
                          className="w-14 h-14 md:w-16 md:h-16 rounded-full object-cover border-2 border-primary/50"
                        />
                        <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-accent rounded-full border-2 border-background flex items-center justify-center">
                          <span className="text-[10px]">✓</span>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-bold text-foreground text-base md:text-lg">
                          {testimonials[currentIndex].name}
                        </h4>
                        <p className="text-muted-foreground text-sm">
                          {testimonials[currentIndex].role}
                        </p>
                        <p className="text-primary font-mono text-xs md:text-sm">
                          {testimonials[currentIndex].company}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Navigation */}
                <div className="flex items-center justify-between mt-8 pt-6 border-t border-primary/20">
                  {/* Dots */}
                  <div className="flex gap-2">
                    {testimonials.map((_, index) => (
                      <button
                        key={index}
                        onClick={() => {
                          setIsAutoPlaying(false);
                          setCurrentIndex(index);
                        }}
                        className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
                          index === currentIndex
                            ? 'bg-primary w-6 md:w-8'
                            : 'bg-primary/30 hover:bg-primary/50'
                        }`}
                      />
                    ))}
                  </div>

                  {/* Arrows */}
                  <div className="flex gap-2">
                    <button
                      onClick={goToPrevious}
                      className="p-2 md:p-3 glass rounded-full border border-primary/30 hover:border-primary hover:bg-primary/10 transition-all group"
                    >
                      <ChevronLeft size={18} className="group-hover:-translate-x-0.5 transition-transform" />
                    </button>
                    <button
                      onClick={goToNext}
                      className="p-2 md:p-3 glass rounded-full border border-primary/30 hover:border-primary hover:bg-primary/10 transition-all group"
                    >
                      <ChevronRight size={18} className="group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Side cards preview */}
            <div className="hidden lg:flex absolute top-1/2 -translate-y-1/2 -left-4 -right-4 justify-between pointer-events-none">
              <div className="glass rounded-xl p-4 opacity-30 blur-[1px] w-24 h-32" />
              <div className="glass rounded-xl p-4 opacity-30 blur-[1px] w-24 h-32" />
            </div>
          </div>
        </ScrollAnimation>
      </div>
    </section>
  );
};
