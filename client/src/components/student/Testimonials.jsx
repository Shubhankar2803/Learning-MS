import React from 'react'
import { dummyTestimonial } from '../../assets/assets'
import { assets } from '../../assets/assets'
import { motion } from 'framer-motion'

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: 'easeOut' }
  }),
  exit: { opacity: 0, y: -40, transition: { duration: 0.4 } }
}

const floatingAnimation = {
  y: [0, -10, 0],
  transition: {
    duration: 3,
    ease: 'easeInOut',
    repeat: Infinity,
    repeatType: 'loop'
  }
}

const Testimonials = () => {
  return (
    <motion.section
      className="w-full py-20 px-2 md:px-0 bg-gradient-to-b from-white to-gray-100 rounded-xl shadow-lg"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -60 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      viewport={{ once: false, amount: 0.3 }}
    >
      <div className="w-full max-w-7xl mx-auto">
        <motion.h2
          className="text-4xl font-bold text-teal-700 text-center mb-3 tracking-tight"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          viewport={{ once: false }}
        >
          What Our Learners Say
        </motion.h2>
        <motion.p
          className="text-lg text-gray-600 text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          viewport={{ once: false }}
        >
          Real stories from real students—see how our platform has empowered learners to achieve their goals and transform their futures.
        </motion.p>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {dummyTestimonial.map((testimonial, index) => (
            <motion.div
              key={index}
              className="flex flex-col border border-teal-100 rounded-2xl bg-white shadow-md hover:shadow-xl transition-shadow duration-200 overflow-hidden"
              custom={index}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              exit="exit"
              animate={floatingAnimation}
              viewport={{ once: false, amount: 0.3 }}
              style={{ animationDelay: `${index * 0.5}s` }}
            >
              <div className="flex items-center gap-4 px-6 py-5 bg-teal-50">
                <img className="h-14 w-14 rounded-full border-2 border-teal-200" src={testimonial.image} alt={testimonial.name} />
                <div>
                  <h3 className="text-lg font-semibold text-teal-900">{testimonial.name}</h3>
                  <p className="text-teal-700 text-sm">{testimonial.role}</p>
                </div>
              </div>
              <div className="px-6 py-6 flex-1 flex flex-col">
                <div className="flex gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <img
                      className="h-5"
                      key={i}
                      src={i < Math.floor(testimonial.rating) ? assets.star : assets.star_blank}
                      alt=""
                    />
                  ))}
                </div>
                <p className="text-gray-600 italic flex-1">"{testimonial.feedback}"</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  )
}

export default Testimonials
