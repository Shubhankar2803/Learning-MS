import React from 'react'

/**
 * Usage:
 * <BackgroundLayout imageUrl="/path/to/your/animation.gif">
 *   <Navbar />
 *   <Heero />
 *   ...other content...
 * </BackgroundLayout>
 */
const BackgroundLayout = ({ imageUrl, children }) => {
  return (
    <div className="min-h-screen w-full relative overflow-hidden">
      {/* GIF background */}
      <img
        src={imageUrl}
        alt="background"
        className="absolute inset-0 w-full h-full object-cover z-0"
        style={{ pointerEvents: 'none' }}
        draggable={false}
      />
      {/* Optional overlay for better readability */}
      <div className="absolute inset-0 bg-black/30 pointer-events-none z-10" />
      <div className="relative z-20">
        {children}
      </div>
      {/* Credits at bottom right */}
      <div className="absolute bottom-2 right-4 z-50 text-xs text-gray-400 pointer-events-none select-none">
        credits: <span className="text-teal-600">benjybrooke</span>
      </div>
    </div>
  )
}

export default BackgroundLayout