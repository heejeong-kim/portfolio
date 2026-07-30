// ===== 모바일 네비게이션 토글 =====
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navLinks.classList.remove('open'));
});

// ===== 프로젝트 상세 데이터 =====
const projectData = {
  p1: {
    tag: '단백질 발현 · RNA-seq',
    title: '암세포 특이적 단백질 발현 패턴 분석 연구',
    background: '종양 조직과 정상 조직 간 단백질 발현 차이를 규명하여 신약 타겟 후보를 발굴하는 것을 목표로 진행한 연구입니다.',
    method: [
      '세포주 배양 및 실험군/대조군 설계',
      'RNA-seq을 통한 유전자 발현 프로파일링',
      'Python/R 기반 차등 발현 분석 및 시각화',
    ],
    result: '정상 조직 대비 종양 조직에서 발현 차이를 보이는 단백질군을 확인하고, 이를 신약 타겟 후보로 정리하여 연구 결과를 도출했습니다.',
  },
  p2: {
    tag: 'CRISPR-Cas9',
    title: 'CRISPR-Cas9 기반 유전자 편집 실험 및 효율 검증',
    background: '표적 유전자에 대한 CRISPR-Cas9 편집 시스템을 설계하고, 편집 효율을 정량적으로 검증하기 위해 진행한 연구입니다.',
    method: [
      'gRNA 설계 및 CRISPR-Cas9 편집 시스템 구축',
      '세포 내 유전자 편집 실험 수행',
      '편집 효율 정량 검증 및 결과 분석',
    ],
    result: '설계한 gRNA 기반 편집 시스템의 효율을 정량적으로 검증하고, 실험 조건별 편집 효율 차이를 비교 분석했습니다.',
  },
  p3: {
    tag: '바이오마커 · RNA-seq',
    title: '오픈소스 유전체 데이터셋 활용 바이오마커 발굴 파이프라인',
    background: '공개 유전체 데이터셋(TCGA, GEO 등)을 활용하여 재현 가능한 바이오마커 발굴 분석 파이프라인을 구축하고자 진행한 연구입니다.',
    method: [
      '공개 데이터셋 수집 및 전처리',
      'Python/R 기반 분석 파이프라인 설계 및 구축',
      '후보 바이오마커 도출 및 시각화',
    ],
    result: '재사용 가능한 분석 파이프라인을 구축하고, 이를 통해 후보 바이오마커 목록을 도출했습니다.',
  },
};

// ===== 프로젝트 태그 필터 =====
const tagButtons = document.querySelectorAll('.tag');
const projectCards = document.querySelectorAll('.project-card');

tagButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    tagButtons.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const selected = btn.dataset.tag;

    projectCards.forEach(card => {
      const tags = card.dataset.tags;
      const match = selected === 'all' || tags.includes(selected);
      card.classList.toggle('hidden-by-filter', !match);
    });
  });
});

// ===== 프로젝트 캐러셀(스와이프/버튼) =====
const track = document.getElementById('projectTrack');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

function scrollByCard(direction) {
  const card = track.querySelector('.project-card');
  if (!card) return;
  const gap = 20;
  const distance = card.offsetWidth + gap;
  track.scrollBy({ left: direction * distance, behavior: 'smooth' });
}

prevBtn.addEventListener('click', () => scrollByCard(-1));
nextBtn.addEventListener('click', () => scrollByCard(1));

// ===== 프로젝트 상세 모달 =====
const modalBackdrop = document.getElementById('modalBackdrop');
const modalBody = document.getElementById('modalBody');
const modalClose = document.getElementById('modalClose');

function openModal(id) {
  const data = projectData[id];
  if (!data) return;

  modalBody.innerHTML = `
    <p class="modal-body-eyebrow">${data.tag}</p>
    <h3>${data.title}</h3>
    <h4>배경 및 목적</h4>
    <p>${data.background}</p>
    <h4>연구 방법</h4>
    <ul>${data.method.map(m => `<li>${m}</li>`).join('')}</ul>
    <h4>결과</h4>
    <p>${data.result}</p>
  `;
  modalBackdrop.classList.add('open');
}

function closeModal() {
  modalBackdrop.classList.remove('open');
}

document.querySelectorAll('[data-open]').forEach(btn => {
  btn.addEventListener('click', () => openModal(btn.dataset.open));
});

modalClose.addEventListener('click', closeModal);
modalBackdrop.addEventListener('click', (e) => {
  if (e.target === modalBackdrop) closeModal();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});

// ===== 논문 더보기 =====
const pubMoreBtn = document.getElementById('pubMoreBtn');
let pubExpanded = false;

pubMoreBtn.addEventListener('click', () => {
  pubExpanded = !pubExpanded;
  document.querySelectorAll('.pub-extra').forEach(item => {
    item.classList.toggle('hidden', !pubExpanded);
  });
  pubMoreBtn.textContent = pubExpanded ? '접기 ▴' : '더보기 ▾';
});
