// 타이핑 애니메이션 효과
class TypeWriter {
  constructor(element, texts, speed = 100, deleteSpeed = 50, pauseTime = 2000) {
    this.element = element
    this.texts = texts
    this.speed = speed
    this.deleteSpeed = deleteSpeed
    this.pauseTime = pauseTime
    this.textIndex = 0
    this.charIndex = 0
    this.isDeleting = false
    this.start()
  }

  start() {
    this.type()
  }

  type() {
    const currentText = this.texts[this.textIndex]

    if (this.isDeleting) {
      // 글자 삭제
      this.element.textContent = currentText.substring(0, this.charIndex - 1)
      this.charIndex--
    } else {
      // 글자 추가
      this.element.textContent = currentText.substring(0, this.charIndex + 1)
      this.charIndex++
    }

    // 타이핑 속도 설정
    let typeSpeed = this.isDeleting ? this.deleteSpeed : this.speed

    // 현재 텍스트 완성 시
    if (!this.isDeleting && this.charIndex === currentText.length) {
      typeSpeed = this.pauseTime
      this.isDeleting = true
    } else if (this.isDeleting && this.charIndex === 0) {
      this.isDeleting = false
      this.textIndex = (this.textIndex + 1) % this.texts.length
    }

    setTimeout(() => this.type(), typeSpeed)
  }
}

// 페이지 로드 시 실행
document.addEventListener('DOMContentLoaded', function () {
  // 타이핑 애니메이션을 적용할 요소
  const typewriterElement = document.querySelector('.typewriter')

  if (typewriterElement) {
    // 여러 텍스트 배열
    const texts = [
      '안녕하세요! 저는 개발자입니다.',
      '새로운 기술을 배우는 것을 좋아합니다.',
      '함께 성장하고 싶습니다.',
      '좋은 코드를 작성하려 노력합니다.'
    ]

    // 타이핑 애니메이션 시작
    new TypeWriter(typewriterElement, texts, 80, 40, 1500)
  }

  // 부드러운 스크롤 효과
  const links = document.querySelectorAll('a[href^="#"]')
  links.forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute('href'))
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth'
        })
      }
    })
  })

  // 페이드인 애니메이션
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  }

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in')
      }
    })
  }, observerOptions)

  // 섹션들에 관찰자 적용
  const sections = document.querySelectorAll('section')
  sections.forEach(section => {
    section.classList.add('fade-element')
    observer.observe(section)
  })
})
