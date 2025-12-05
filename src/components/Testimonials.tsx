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
    name: 'Sarah Mitchell',
    role: 'Tech Lead',
    company: 'CodeCatalyst',
    content: 'Nicolette demonstrated exceptional problem-solving skills during our internship program. Her ability to quickly grasp complex concepts and deliver quality code was impressive. A true team player!',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop',
    rating: 5,
  },
  {
    id: 2,
    name: 'James Chen',
    role: 'Project Manager',
    company: 'AIMS Hackathon',
    content: 'The AI Compliance Interrogator project was outstanding. Nicolette led the team with passion and technical expertise. Her innovation in using AI for social good earned our "Best Team" award.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop',
    rating: 5,
  },
  {
    id: 3,
    name: 'Amanda Patel',
    role: 'Senior Developer',
    company: 'Tech Solutions Inc',
    content: 'Working with Nicolette was a pleasure. Her full-stack skills, particularly in React and .NET, are top-notch. She consistently delivered features ahead of schedule with clean, maintainable code.',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop',
    rating: 5,
  },
  {
    id: 4,
    name: 'Michael Roberts',
    role: 'CTO',
    company: 'StartupXYZ',
    content: 'Nicolette has a rare combination of technical depth and creative thinking. Her contributions to our Azure cloud infrastructure were invaluable. Highly recommend her for any development role.',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop',
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
