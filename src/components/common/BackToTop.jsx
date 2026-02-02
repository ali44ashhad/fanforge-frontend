import { useState, useEffect } from 'react'
import { ChevronUp } from '../../shims/lucide-react'

const SCROLL_THRESHOLD = 300

export default function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => setVisible(window.scrollY > SCROLL_THRESHOLD)
    window.addEventListener('scroll', handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (!visible) return null

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Back to top"
      className="fixed bottom-6 right-6 z-50 flex h-11 w-11 items-center justify-center rounded-full bg-[#1D1D1F] text-white shadow-lg transition hover:bg-[#333] focus:outline-none focus:ring-2 focus:ring-[#1D1D1F] focus:ring-offset-2"
    >
      <ChevronUp />
    </button>
  )
}
