import { useState, useEffect, useRef } from 'react'
import ktsLogo from './assets/kts-logo.svg'

function App() {
  const [isScrolled, setIsScrolled] = useState(false)
  const observerRef = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    // Hero 섹션은 즉시 보이도록 설정
    const heroElement = document.querySelector('#home .animate-fade-in')
    if (heroElement) {
      heroElement.classList.add('animate-in')
    }

    // Intersection Observer for scroll animations
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    }

    const observerCallback = (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in')
          
          // Animate numbers for stat items
          if (entry.target.classList.contains('stat-item-animate')) {
            const numberElement = entry.target.querySelector('.stat-number')
            if (numberElement) {
              const target = parseInt(numberElement.getAttribute('data-target'))
              animateNumber(numberElement, target)
            }
          }
        }
      })
    }

    observerRef.current = new IntersectionObserver(observerCallback, observerOptions)
    
    // Hero 섹션을 제외한 요소들만 관찰
    const elements = document.querySelectorAll('.animate-fade-in:not(#home .animate-fade-in), .animate-slide-up, .service-card-animate, .stat-item-animate')
    elements.forEach(el => observerRef.current.observe(el))

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [])

  const animateNumber = (element, target) => {
    const duration = 2000
    const start = 0
    const increment = target / (duration / 16)
    let current = start

    const timer = setInterval(() => {
      current += increment
      if (current >= target) {
        element.textContent = target + '+'
        clearInterval(timer)
      } else {
        element.textContent = Math.floor(current) + '+'
      }
    }, 16)
  }

  const features = [
    { icon: '⚙️', title: 'Easy Setup', desc: '간편한 설정으로 빠르게 시작하세요' },
    { icon: '🎨', title: 'Customizable', desc: '비즈니스에 맞게 커스터마이징 가능' },
    { icon: '📈', title: 'Scalable', desc: '성장에 따라 확장 가능한 솔루션' },
    { icon: '🔒', title: 'Secure', desc: '최고 수준의 보안으로 안전하게' },
  ]

  const detailedFeatures = [
    { icon: '📊', title: 'Insightful Reports', desc: '데이터 기반의 통찰력 있는 리포트를 제공합니다' },
    { icon: '🚀', title: 'Proactive Solutions', desc: '문제 발생 전 예방하는 선제적 솔루션' },
    { icon: '🔗', title: 'Seamless Integrations', desc: '기존 시스템과 원활하게 통합됩니다' },
    { icon: '📈', title: 'Chapter Growth', desc: '지속적인 성장을 위한 지원을 제공합니다' },
  ]

  const services = [
    { icon: '💻', title: '웹 개발', desc: '현대적이고 반응형 웹 애플리케이션을 개발하여 사용자 경험을 극대화합니다' },
    { icon: '📱', title: '모바일 앱', desc: 'iOS 및 Android 플랫폼을 위한 네이티브 및 크로스 플랫폼 앱 개발' },
    { icon: '☁️', title: '클라우드 솔루션', desc: '확장 가능하고 안전한 클라우드 인프라를 구축하여 비즈니스 효율성을 높입니다' },
    { icon: '🤖', title: 'AI/ML 개발', desc: '인공지능과 머신러닝 기술을 활용한 혁신적인 솔루션 개발' },
    { icon: '🔒', title: '보안 솔루션', desc: '최신 보안 기술로 데이터와 시스템을 보호하는 종합 보안 솔루션' },
    { icon: '📊', title: '데이터 분석', desc: '빅데이터 분석 및 비즈니스 인텔리전스를 통한 데이터 기반 의사결정 지원' },
  ]

  const stats = [
    { number: 100, label: '완료된 프로젝트' },
    { number: 50, label: '만족한 고객' },
    { number: 10, label: '경력 연수' },
  ]

  const steps = [
    { number: '01', title: '초기 상담', desc: '프로젝트 요구사항을 파악하고 목표를 설정합니다' },
    { number: '02', title: '전략 수립', desc: '최적의 솔루션 전략을 수립하고 계획을 세웁니다' },
    { number: '03', title: '구현 및 배포', desc: '개발을 완료하고 안정적으로 배포합니다' },
  ]

  const contactInfo = [
    { icon: '📧', title: '이메일', content: 'contact@kts.co.kr' },
    { icon: '📞', title: '전화', content: '02-1234-5678' },
    { icon: '📍', title: '주소', content: '서울특별시 강남구 테헤란로 123' },
  ]

  return (
    <div className="min-h-screen relative bg-white">
      {/* Header */}
      <header className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-200 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-sm shadow-sm border-b border-slate-200' 
          : 'glass-effect'
      }`}>
        <div className="container-custom py-5 flex justify-between items-center">
          <div className="cursor-pointer group">
            <img src={ktsLogo} alt="KTS Korea Technical System" className="h-10 sm:h-12 w-auto" />
          </div>
          <nav className="hidden md:flex gap-10 items-center">
            <a href="#home" className="nav-link">홈</a>
            <a href="#services" className="nav-link">서비스</a>
            <a href="#about" className="nav-link">회사소개</a>
            <a href="#contact" className="nav-link">연락처</a>
          </nav>
          <a href="#contact" className="btn btn-primary hidden md:inline-flex">
            시작하기
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center pt-24 sm:pt-28 pb-20 bg-gradient-to-b from-blue-50/30 via-white to-white">
        <div className="container-custom relative z-10">
          <div className="text-center max-w-4xl mx-auto animate-fade-in animate-in">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6 text-slate-900 tracking-tight" style={{ letterSpacing: '-0.01em' }}>
              모든 것을 탐색하세요.
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl text-slate-600 mb-10 leading-relaxed font-normal max-w-2xl mx-auto">
              KTS는 최첨단 기술 솔루션을 제공하여<br className="hidden sm:block" />
              <span className="sm:hidden"> </span>고객의 비즈니스 성장을 함께합니다
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a href="#contact" className="btn btn-primary">
                시작하기
              </a>
              <a href="#about" className="btn btn-secondary">
                더 알아보기
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* We've cracked the code Section */}
      <section className="py-24 sm:py-32 bg-white">
        <div className="container-custom">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="section-title">우리는 해답을 찾았습니다.</h2>
            <p className="section-subtitle">작은 것들에 대해 걱정할 필요가 없습니다.</p>
          </div>
          
          {/* Icon Features */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
            {features.map((feature, index) => (
              <div key={index} className="text-center">
                <div className="feature-icon mx-auto">
                  {feature.icon}
                </div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description text-sm">{feature.desc}</p>
              </div>
            ))}
          </div>

          {/* Detailed Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {detailedFeatures.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="text-3xl mb-4">{feature.icon}</div>
                <h3 className="text-lg font-semibold mb-2 text-slate-900">{feature.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* See the Big Picture Section */}
      <section className="py-24 sm:py-32 bg-beige">
        <div className="container-custom">
          <div className="text-center mb-16 animate-slide-up">
            <h2 className="section-title">큰 그림을 보세요</h2>
            <p className="section-subtitle">전체적인 관점에서 비즈니스를 이해하세요</p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-12">
            <div className="space-y-6">
              <div className="flex gap-4">
                <span className="text-xl font-bold text-primary bg-blue-100 rounded-lg w-10 h-10 flex items-center justify-center">01</span>
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-slate-900">전략적 계획</h3>
                  <p className="text-slate-600 text-sm">체계적인 접근으로 목표를 달성합니다</p>
                </div>
              </div>
              <div className="flex gap-4">
                <span className="text-xl font-bold text-primary bg-blue-100 rounded-lg w-10 h-10 flex items-center justify-center">02</span>
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-slate-900">혁신적 솔루션</h3>
                  <p className="text-slate-600 text-sm">최신 기술로 문제를 해결합니다</p>
                </div>
              </div>
              <div className="flex gap-4">
                <span className="text-xl font-bold text-primary bg-blue-100 rounded-lg w-10 h-10 flex items-center justify-center">03</span>
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-slate-900">지속적 지원</h3>
                  <p className="text-slate-600 text-sm">프로젝트 완료 후에도 함께합니다</p>
                </div>
              </div>
              <div className="flex gap-4">
                <span className="text-xl font-bold text-primary bg-blue-100 rounded-lg w-10 h-10 flex items-center justify-center">04</span>
                <div>
                  <h3 className="text-lg font-semibold mb-2 text-slate-900">성장 파트너</h3>
                  <p className="text-slate-600 text-sm">고객의 성장을 함께 만들어갑니다</p>
                </div>
              </div>
            </div>
            <div className="bg-slate-200 rounded-lg h-96 flex items-center justify-center">
              <span className="text-slate-400">이미지 영역</span>
            </div>
          </div>
          
          <div className="text-center">
            <a href="#about" className="btn btn-primary">
              더 알아보기
            </a>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 sm:py-32 bg-gradient-to-b from-white to-blue-50/20">
        <div className="container-custom">
          <div className="section-header animate-fade-in">
            <h2 className="section-title">우리의 서비스</h2>
            <p className="section-description">
              전문적인 기술 솔루션으로 고객의 성공을 지원합니다
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <div 
                key={index} 
                className="service-card service-card-animate group" 
                style={{ transitionDelay: `${index * 0.1}s` }}
              >
                <div className="service-icon-wrapper">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-blue-100 to-indigo-100 flex items-center justify-center mb-6 group-hover:from-blue-200 group-hover:to-indigo-200 transition-all duration-200">
                    <div className="service-icon">{service.icon}</div>
                  </div>
                </div>
                <h3 className="service-title">{service.title}</h3>
                <p className="service-description">{service.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose KTS Section */}
      <section id="about" className="py-24 sm:py-32 bg-beige">
        <div className="container-custom">
          <div className="text-center mb-12 animate-slide-up">
            <h2 className="section-title">왜 KTS를 선택해야 할까요?</h2>
            <p className="section-subtitle">다른 솔루션과 비교해보세요</p>
            <a href="#contact" className="btn btn-primary mt-6">
              KTS 선택하기
            </a>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-lg border-2 border-primary/20">
              <h3 className="text-lg font-semibold mb-6 text-slate-900">KTS</h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-2 text-slate-700">
                  <span className="check-icon">✓</span>
                  <span>전문 개발팀</span>
                </li>
                <li className="flex items-center gap-2 text-slate-700">
                  <span className="check-icon">✓</span>
                  <span>맞춤형 솔루션</span>
                </li>
                <li className="flex items-center gap-2 text-slate-700">
                  <span className="check-icon">✓</span>
                  <span>24/7 지원</span>
                </li>
                <li className="flex items-center gap-2 text-slate-700">
                  <span className="check-icon">✓</span>
                  <span>최신 기술 스택</span>
                </li>
              </ul>
            </div>
            <div className="bg-white p-8 rounded-lg">
              <h3 className="text-lg font-semibold mb-6 text-slate-900">일반 솔루션</h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-2 text-slate-400">
                  <span>—</span>
                  <span>제한적 커스터마이징</span>
                </li>
                <li className="flex items-center gap-2 text-slate-400">
                  <span>—</span>
                  <span>표준 기능만 제공</span>
                </li>
                <li className="flex items-center gap-2 text-slate-400">
                  <span>—</span>
                  <span>제한적 지원</span>
                </li>
                <li className="flex items-center gap-2 text-slate-400">
                  <span>—</span>
                  <span>구식 기술</span>
                </li>
              </ul>
            </div>
            <div className="bg-white p-8 rounded-lg">
              <h3 className="text-lg font-semibold mb-6 text-slate-900">경쟁사</h3>
              <ul className="space-y-3">
                <li className="flex items-center gap-2 text-slate-400">
                  <span>—</span>
                  <span>높은 비용</span>
                </li>
                <li className="flex items-center gap-2 text-slate-400">
                  <span>—</span>
                  <span>복잡한 설정</span>
                </li>
                <li className="flex items-center gap-2 text-slate-400">
                  <span>—</span>
                  <span>느린 응답</span>
                </li>
                <li className="flex items-center gap-2 text-slate-400">
                  <span>—</span>
                  <span>제한적 통합</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Map Your Success Section */}
      <section className="py-24 sm:py-32 bg-beige">
        <div className="container-custom">
          <div className="text-center mb-16 animate-slide-up">
            <h2 className="section-title">성공을 그려보세요</h2>
            <a href="#contact" className="btn btn-primary mt-6">
              지금 탐색하기
            </a>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            {steps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl font-bold text-primary bg-blue-100 rounded-xl w-16 h-16 flex items-center justify-center mx-auto mb-3">{step.number}</div>
                <h3 className="text-lg font-semibold mb-2 text-slate-900">{step.title}</h3>
                <p className="text-slate-600 text-sm">{step.desc}</p>
              </div>
            ))}
          </div>
          
          <div className="bg-slate-200 rounded-lg h-64 flex items-center justify-center">
            <span className="text-slate-400">이미지 영역</span>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 sm:py-32 bg-gradient-to-b from-blue-50/20 to-white">
        <div className="container-custom max-w-4xl">
          <div className="text-center animate-slide-up">
            <h2 className="section-title">KTS에 대해</h2>
            <div className="space-y-6 mb-16 text-left">
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
                KTS(Korea Technical System)는 혁신적인 기술 솔루션을 제공하는
                선도적인 개발 회사입니다. 우리는 최신 기술 트렌드를 선도하며,
                고객의 비즈니스 목표를 달성하기 위해 최선을 다하고 있습니다.
              </p>
              <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
                전문 개발팀과 함께 웹, 모바일, 클라우드, AI/ML 등 다양한
                분야에서 고품질의 솔루션을 제공합니다. 고객 중심의 접근 방식으로
                맞춤형 솔루션을 개발하여 고객의 성공을 함께 만들어갑니다.
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 pt-16 border-t border-slate-200">
              {stats.map((stat, index) => (
                <div 
                  key={index} 
                  className="stat-item stat-item-animate" 
                  style={{ transitionDelay: `${index * 0.1}s` }}
                >
                  <div className="stat-number" data-target={stat.number}>0+</div>
                  <div className="stat-label">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 sm:py-32 bg-gradient-to-b from-white to-blue-50/30">
        <div className="container-custom">
          <div className="section-header">
            <h2 className="section-title">연락처</h2>
            <p className="section-description">
              프로젝트 문의나 협업 제안을 환영합니다
            </p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="flex flex-col gap-4">
              {contactInfo.map((item, index) => (
                <div key={index} className="contact-item">
                  <div className="contact-icon">{item.icon}</div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2 text-slate-900">{item.title}</h3>
                    <p className="text-slate-600">{item.content}</p>
                  </div>
                </div>
              ))}
            </div>
            <form className="animate-slide-up flex flex-col gap-4 bg-white p-10 rounded-lg border border-slate-200" onSubmit={(e) => e.preventDefault()}>
              <div className="flex flex-col">
                <input type="text" placeholder="이름" required className="form-input" />
              </div>
              <div className="flex flex-col">
                <input type="email" placeholder="이메일" required className="form-input" />
              </div>
              <div className="flex flex-col">
                <textarea placeholder="메시지" rows="5" required className="form-textarea"></textarea>
              </div>
              <button type="submit" className="btn btn-primary w-full">
                메시지 보내기
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-primary text-white py-12">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div>
              <img src={ktsLogo} alt="KTS Korea Technical System" className="h-10 sm:h-12 w-auto brightness-0 invert" />
            </div>
            <nav className="flex gap-8">
              <a href="#about" className="text-white/80 hover:text-white transition-colors text-sm">회사소개</a>
              <a href="#services" className="text-white/80 hover:text-white transition-colors text-sm">서비스</a>
              <a href="#" className="text-white/80 hover:text-white transition-colors text-sm">개인정보처리방침</a>
            </nav>
            <a href="#home" className="text-white/80 hover:text-white transition-colors text-sm flex items-center gap-2">
              <span>↑</span>
              <span>맨 위로</span>
            </a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
