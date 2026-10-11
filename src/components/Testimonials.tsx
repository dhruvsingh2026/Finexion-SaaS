import React, { useState } from 'react'
import { Eyebrow } from './Eyebrow'
import { SectionHeading } from './SectionHeading'
import { ImageWithFallback } from './ImageWithFallback'
import { TESTIMONIALS_DATA } from '../data/testimonials'

interface TestimonialsProps {
  onDemoAction: (msg: string) => void
}

export const Testimonials: React.FC<TestimonialsProps> = ({ onDemoAction }) => {
  const { items, brands } = TESTIMONIALS_DATA
  const [currentIndex, setCurrentIndex] = useState(0)

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev > 0 ? prev - 1 : 0))
  }

  const handleNext = () => {
    setCurrentIndex((prev) => (prev < items.length - 1 ? prev + 1 : prev))
  }

  return (
    <section id="testimonials" className="py-16 sm:py-24 px-4 sm:px-6 max-w-6xl mx-auto overflow-x-clip">
      
      {/* Header Row */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16">
        <div>
          <Eyebrow label={TESTIMONIALS_DATA.eyebrow} className="mb-4" />
          <SectionHeading
            as="h2"
            leadText={TESTIMONIALS_DATA.headingLead}
            accentText={TESTIMONIALS_DATA.headingAccent}
          />
        </div>

        <p className="max-w-md text-sm sm:text-base text-[#5B6470] font-normal leading-relaxed">
          {TESTIMONIALS_DATA.subparagraph}
        </p>
      </div>

      {/* Carousel Container */}
      <div
        role="region"
        aria-roledescription="carousel"
        aria-label="Customer testimonials"
        className="relative"
      >
        {/* Cards Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
          {items.slice(currentIndex, currentIndex + 2).map((item, idx) => (
            <div
              key={item.id}
              role="group"
              aria-roledescription="slide"
              aria-label={`${currentIndex + idx + 1} of ${items.length}`}
              className="bg-white rounded-3xl p-6 sm:p-7 shadow-lg border border-black/6 flex flex-col sm:flex-row gap-6 items-stretch justify-between transition-all"
            >
              {/* Text Left */}
              <div className="flex-1 flex flex-col justify-between">
                <div>
                  {/* Quote Glyph */}
                  <div className="font-serif text-4xl text-[#0B77B0] leading-none mb-3">
                    “
                  </div>
                  <blockquote className="text-sm sm:text-base text-[#303640] font-medium leading-relaxed mb-6">
                    {item.quote}
                  </blockquote>
                </div>

                <div>
                  <div className="font-semibold text-sm sm:text-base text-[#080D16]">
                    {item.name}
                  </div>
                  <div className="text-xs text-[#5B6470]">
                    {item.role}, {item.company}
                  </div>
                  <button
                    onClick={() => onDemoAction(`Viewing full case study for ${item.name} at ${item.company}`)}
                    className="mt-3 text-xs font-semibold text-[#0B77B0] hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <span>Read more</span>
                    <span>›</span>
                  </button>
                </div>
              </div>

              {/* Portrait Photo Right with Sky Background */}
              <div className="w-full sm:w-44 h-56 sm:h-auto rounded-2xl overflow-hidden shrink-0 bg-[#129FE3] shadow-xs relative">
                <ImageWithFallback
                  src={item.photo}
                  alt={`Portrait of ${item.name}`}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Carousel Controls & Demo Notice */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mt-8 pt-4">
          <span className="text-[11px] text-[#5B6470]">
            Sample testimonials for demonstration purposes.
          </span>

          <div className="flex items-center gap-3 self-end sm:self-auto">
            <button
              onClick={handlePrev}
              disabled={currentIndex === 0}
              aria-label="Previous testimonial"
              className={`w-11 h-11 rounded-full border border-black/15 flex items-center justify-center transition-colors cursor-pointer ${
                currentIndex === 0
                  ? 'opacity-40 cursor-not-allowed bg-transparent text-[#5B6470]'
                  : 'hover:bg-black hover:text-white text-[#080D16]'
              }`}
            >
              ←
            </button>
            <button
              onClick={handleNext}
              disabled={currentIndex >= items.length - 2}
              aria-label="Next testimonial"
              className={`w-11 h-11 rounded-full flex items-center justify-center transition-colors cursor-pointer ${
                currentIndex >= items.length - 2
                  ? 'opacity-40 cursor-not-allowed bg-slate-200 text-[#5B6470]'
                  : 'bg-[#080D16] text-white hover:bg-black'
              }`}
            >
              →
            </button>
          </div>
        </div>
      </div>

      {/* Row of 5 Fictional Partner Wordmarks */}
      <div className="mt-14 sm:mt-20 pt-8 border-t border-[#F5F6F7] flex flex-wrap items-center justify-between gap-6 sm:gap-10 opacity-70">
        {brands.map((brand, i) => (
          <span
            key={i}
            className="font-body text-xs sm:text-sm font-semibold tracking-wider uppercase text-[#5B6470] hover:text-[#080D16] transition-colors select-none"
          >
            {brand}
          </span>
        ))}
      </div>
    </section>
  )
}
