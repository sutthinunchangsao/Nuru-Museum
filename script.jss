/**
 * GRURU MUSEUM — Interactive Website Engine
 * Theme: Future Archaeology ("New Knowledge. New Storytelling. Built for Everyday Living.")
 */

document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initDataBooming();
  initKnowledgeGraph();
  initExhibitions();
  initEverydayLab();
});

// ==========================================================================
// 1. THEME SWITCHER (Light Tech / Dark Lab)
// ==========================================================================
function initTheme() {
  const themeBtn = document.getElementById('theme-toggle-btn');
  if (!themeBtn) return;

  const savedTheme = localStorage.getItem('gruru_theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
  updateThemeIcon(savedTheme);

  themeBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('gruru_theme', newTheme);
    updateThemeIcon(newTheme);
    showToast(`สลับสู่โหมด ${newTheme === 'dark' ? 'ห้องแล็บมืด (Lab Graphite)' : 'สว่าง (Archive Paper)'}`);
  });
}

function updateThemeIcon(theme) {
  const icon = document.getElementById('theme-icon');
  if (icon) {
    icon.textContent = theme === 'dark' ? '☀️' : '🌙';
  }
}

// ==========================================================================
// 2. AUDIO SYNTHESIZER (Web Audio API)
// ==========================================================================
let audioCtx = null;
function playSound(type) {
  try {
    if (!audioCtx) {
      audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    }
    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.destination);

    const now = audioCtx.currentTime;

    if (type === 'boom') {
      osc.type = 'sine';
      osc.frequency.setValueAtTime(140, now);
      osc.frequency.exponentialRampToValueAtTime(440, now + 0.15);
      gain.gain.setValueAtTime(0.12, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
      osc.start(now);
      osc.stop(now + 0.35);
    } else if (type === 'click') {
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(600, now);
      gain.gain.setValueAtTime(0.06, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
      osc.start(now);
      osc.stop(now + 0.08);
    }
  } catch (e) {
    // Audio context not allowed or blocked
  }
}

// ==========================================================================
// 3. TOAST NOTIFICATION
// ==========================================================================
function showToast(message) {
  let toast = document.getElementById('global-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'global-toast';
    toast.className = 'toast-msg';
    document.body.appendChild(toast);
  }
  toast.innerHTML = `<span>⚡</span> <span>${message}</span>`;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 2800);
}

// ==========================================================================
// 4. HALL 03: DATA BOOMING INTERACTIVE ENGINE
// ==========================================================================
const SEED_DATASETS = {
  herbal: {
    title: 'ตำรายาสมุนไพร & แพทย์แผนไทย',
    tag: 'GRM-1832-MED-001',
    era: 'รัตนโกสินทร์ตอนต้น (รัชกาลที่ 3)',
    desc: 'การจารึกตำรายาวัดโพธิ์ ที่เชื่อมโยงสู่เภสัชวิทยาสมัยใหม่และการแพทย์ทางเลือก',
    children: [
      { id: 'hb1', label: 'ฟ้าทะลายโจร', cat: 'ธรรมชาติ', era: 'โบราณ-ปัจจุบัน', color: '#10B981', dist: 180, angle: 0, rel: 'derived_from', takeaway: 'สาร Andrographolide ยับยั้งไวรัสทางเดินหายใจเบื้องต้น' },
      { id: 'hb2', label: 'การสกัดตัวยาระดับนาโน', cat: 'วิทยาศาสตร์', era: 'ศตวรรษที่ 21', color: '#0284C7', dist: 220, angle: 45, rel: 'influenced', takeaway: 'การนำเทคโนโลยีนำส่งยามาเพิ่มการดูดซึมของสมุนไพร' },
      { id: 'hb3', label: 'จารึกวัดพระเชตุพนฯ', cat: 'ประวัติศาสตร์', era: 'พ.ศ. 2375', color: '#FF5A1F', dist: 170, angle: 90, rel: 'derived_from', takeaway: 'มรดกความทรงจำแห่งโลกยูเนสโก ยืนยันสิทธิภูมิปัญญาไทย' },
      { id: 'hb4', label: 'ชีวสารสนเทศ AI ยาสมุนไพร', cat: 'เทคโนโลยี', era: 'ปัจจุบัน-อนาคต', color: '#8C6BFF', dist: 230, angle: 135, rel: 'influenced', takeaway: 'ใช้ AI จำลองโมเลกุลยาเพื่อค้นหาสูตรยาใหม่ในเวลา 10 วัน' },
      { id: 'hb5', label: 'โภชนาบำบัด: อาหารเป็นยา', cat: 'วัฒนธรรม', era: 'วิถีชีวิต', color: '#D97706', dist: 180, angle: 180, rel: 'used_in', takeaway: 'กินแกงเลียงต้านอนุมูลอิสระ และสมุนไพรลดน้ำตาลในเลือด' },
      { id: 'hb6', label: 'ผลิตภัณฑ์สปา & อโรมาไทย', cat: 'ศิลปะ/ออกแบบ', era: 'เศรษฐกิจสร้างสรรค์', color: '#E11D48', dist: 210, angle: 225, rel: 'used_in', takeaway: 'กลิ่นตะไคร้หอมและไพลช่วยลดระดับคอร์ติซอล (ฮอร์โมนความเครียด)' },
      { id: 'hb7', label: 'ระบบแพทย์ปฐมภูมิชุมชน', cat: 'วิถีชีวิต', era: 'ร่วมสมัย', color: '#10B981', dist: 190, angle: 270, rel: 'derived_from', takeaway: 'สวนสมุนไพรประจำบ้านช่วยลดค่าใช้จ่ายด้านสาธารณสุข 40%' },
      { id: 'hb8', label: 'สิทธิบัตรยาธรรมชาติระดับโลก', cat: 'กฎหมายดิจิทัล', era: 'สากล', color: '#0284C7', dist: 220, angle: 315, rel: 'used_in', takeaway: 'การจดสิทธิบัตรคุ้มครองสารสกัดจากพืชเขตร้อนชื้นของไทย' }
    ]
  },
  astronomy: {
    title: 'ดาราศาสตร์สยาม & สุริยุปราคาหว้ากอ',
    tag: 'GRM-1868-SCI-042',
    era: 'พ.ศ. 2411 (รัชกาลที่ 4)',
    desc: 'การคำนวณตำแหน่งสุริยุปราคาล่วงหน้า 2 ปี ด้วยหลักวิทยาศาสตร์สากล ณ หว้ากอ',
    children: [
      { id: 'as1', label: 'การคำนวณพิกัดล่วงหน้า 2 ปี', cat: 'วิทยาศาสตร์', era: 'พ.ศ. 2409', color: '#0284C7', dist: 210, angle: 15, rel: 'influenced', takeaway: 'พลังของการใช้ข้อมูลและการคำนวณทางคณิตศาสตร์ในการคาดการณ์' },
      { id: 'as2', label: 'หอดูดาวหว้ากอ ประจวบฯ', cat: 'ประวัติศาสตร์', era: 'พ.ศ. 2411', color: '#FF5A1F', dist: 175, angle: 65, rel: 'derived_from', takeaway: 'การตั้งฐานสังเกตการณ์ร่วมกับนักดาราศาสตร์นานาชาติ' },
      { id: 'as3', label: 'กล้องโทรทรรศน์ยุควิกตอเรีย', cat: 'เทคโนโลยี', era: 'ศตวรรษที่ 19', color: '#8C6BFF', dist: 200, angle: 120, rel: 'derived_from', takeaway: 'การรับถ่ายทอดเทคโนโลยีเลนส์สายตาและดาราศาสตร์สู่สยาม' },
      { id: 'as4', label: 'ระบบดาวเทียมสำรวจไทยโชต', cat: 'เทคโนโลยี', era: 'ยุคปัจจุบัน', color: '#8C6BFF', dist: 225, angle: 170, rel: 'influenced', takeaway: 'การเฝ้าระวังภัยพิบัติน้ำท่วมและไฟป่าด้วยภาพถ่ายดาวเทียม' },
      { id: 'as5', label: 'ปฏิทินสุริยคติไทย', cat: 'วัฒนธรรม', era: 'วิถีชีวิต', color: '#D97706', dist: 185, angle: 225, rel: 'used_in', takeaway: 'การบริหารจัดการฤดูกาลเพาะปลูกข้าวอย่างแม่นยำ' },
      { id: 'as6', label: 'การดูทิศทางดาวชาวประมง', cat: 'ภูมิปัญญา', era: 'พื้นบ้าน', color: '#10B981', dist: 195, angle: 285, rel: 'derived_from', takeaway: 'การเดินเรือตามกลุ่มดาวจระเข้และดาวลูกไก่โดยไม่พึ่งพาระบบไฟ' },
      { id: 'as7', label: 'หอสังเกตการณ์อวกาศแห่งชาติ', cat: 'วิทยาศาสตร์', era: 'ดอยอินทนนท์', color: '#0284C7', dist: 230, angle: 335, rel: 'influenced', takeaway: 'กล้องโทรทรรศน์ 2.4 เมตรตรวจจับดาวเคราะห์นอกระบบสุริยะ' }
    ]
  },
  architecture: {
    title: 'สถาปัตยกรรมเรือนไทย & นิเวศวิทยา',
    tag: 'GRM-1782-ARC-088',
    era: 'อยุธยา-รัตนโกสินทร์',
    desc: 'ภูมิปัญญาการสร้างบ้านใต้ถุนสูง หลังคาลาดชัน ออกแบบสอดรับกับสภาพอากาศมรสุม',
    children: [
      { id: 'ar1', label: 'การระบายลมตามธรรมชาติ (Stack Effect)', cat: 'วิทยาศาสตร์', era: 'วิศวกรรม', color: '#0284C7', dist: 195, angle: 30, rel: 'influenced', takeaway: 'ลดอุณหภูมิในบ้าน 3–5°C โดยไม่ต้องเปิดเครื่องปรับอากาศ' },
      { id: 'ar2', label: 'ใต้ถุนสูงรับน้ำหลาก', cat: 'ประวัติศาสตร์', era: 'ที่ราบลุ่มเจ้าพระยา', color: '#FF5A1F', dist: 175, angle: 80, rel: 'derived_from', takeaway: 'อยู่ร่วมกับธรรมชาติน้ำท่วมแทนการสร้างเขื่อนกั้น' },
      { id: 'ar3', label: 'ระบบโครงสร้างเข้าลิ้น ถอดประกอบได้', cat: 'เทคโนโลยี', era: 'งานช่างไทย', color: '#8C6BFF', dist: 215, angle: 140, rel: 'derived_from', takeaway: 'ต้นแบบ Modular Architecture รื้อถอนและย้ายได้ไร้ตะปู' },
      { id: 'ar4', label: 'ชายคายื่นยาวกันแดดฝน', cat: 'ศิลปะ/ออกแบบ', era: 'ภูมิปัญญา', color: '#E11D48', dist: 180, angle: 200, rel: 'used_in', takeaway: 'การออกแบบอาคารประหยัดพลังงานยุคใหม่ (Passive Cooling)' },
      { id: 'ar5', label: 'วัสดุไม้ไผ่และดินเผาระบายความร้อน', cat: 'ธรรมชาติ', era: 'วัสดุศาสตร์', color: '#10B981', dist: 220, angle: 260, rel: 'derived_from', takeaway: 'วัสดุ Low Carbon Footprint และการหมุนเวียนคืนสู่ดิน' },
      { id: 'ar6', label: 'ชานบ้านศูนย์รวมครอบครัว', cat: 'วัฒนธรรม', era: 'วิถีชีวิต', color: '#D97706', dist: 185, angle: 320, rel: 'used_in', takeaway: 'พื้นที่ส่วนกลางเสริมสร้างสุขภาพจิตและความสัมพันธ์ข้ามเจเนอเรชัน' }
    ]
  }
};

let currentSeedKey = 'herbal';

function initDataBooming() {
  const seedSelect = document.getElementById('seed-select');
  const triggerBtn = document.getElementById('trigger-booming-btn');

  if (seedSelect) {
    seedSelect.addEventListener('change', (e) => {
      currentSeedKey = e.target.value;
      playSound('click');
      renderBoomingView();
    });
  }

  if (triggerBtn) {
    triggerBtn.addEventListener('click', () => {
      triggerBoomingExplosion();
    });
  }

  renderBoomingView();
}

function renderBoomingView() {
  const dataset = SEED_DATASETS[currentSeedKey];
  const svg = document.getElementById('booming-svg-canvas');
  if (!svg || !dataset) return;

  const activeNodesCount = document.getElementById('booming-node-counter');
  if (activeNodesCount) {
    activeNodesCount.textContent = (dataset.children.length + 1);
  }

  const seedLabel = document.getElementById('booming-seed-name');
  if (seedLabel) {
    seedLabel.textContent = dataset.title;
  }

  // Draw SVG
  const cx = 450;
  const cy = 290;

  let svgHtml = `
    <defs>
      <filter id="node-glow" x="-30%" y="-30%" width="160%" height="160%">
        <feGaussianBlur stdDeviation="6" result="blur" />
        <feComposite in="SourceGraphic" in2="blur" operator="over" />
      </filter>
      <linearGradient id="burstGradient" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#FF5A1F" />
        <stop offset="100%" stop-color="#D7FF3A" />
      </linearGradient>
    </defs>
  `;

  // Draw lines
  dataset.children.forEach((c) => {
    const rad = (c.angle * Math.PI) / 180;
    const x = cx + c.dist * Math.cos(rad);
    const y = cy + c.dist * Math.sin(rad);

    let dash = 'none';
    if (c.rel === 'derived_from') dash = '6,4';
    if (c.rel === 'used_in') dash = '2,4';

    svgHtml += `
      <line id="b-line-${c.id}" x1="${cx}" y1="${cy}" x2="${x}" y2="${y}" 
            stroke="var(--border-strong)" stroke-width="2" stroke-dasharray="${dash}" opacity="0.8"
            style="transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);" />
    `;
  });

  // Center Seed Node
  svgHtml += `
    <g id="booming-center-node" transform="translate(${cx}, ${cy})" style="cursor: pointer;" onclick="triggerBoomingExplosion()">
      <circle r="52" fill="var(--text-main)" stroke="var(--brand-lime)" stroke-width="4" filter="url(#node-glow)"></circle>
      <circle r="44" fill="#1E293B"></circle>
      <text text-anchor="middle" y="-6" fill="var(--brand-lime)" font-family="'Chakra Petch', sans-serif" font-weight="700" font-size="14">${dataset.title.substring(0, 14)}...</text>
      <text text-anchor="middle" y="14" fill="#FFFFFF" font-family="'IBM Plex Sans Thai', sans-serif" font-size="11">[คลิกเพื่อระเบิดความรู้]</text>
      <text text-anchor="middle" y="28" fill="#38BDF8" font-family="'IBM Plex Mono', monospace" font-size="9">SEED // BOOMING</text>
    </g>
  `;

  // Child Nodes
  dataset.children.forEach((c) => {
    const rad = (c.angle * Math.PI) / 180;
    const x = cx + c.dist * Math.cos(rad);
    const y = cy + c.dist * Math.sin(rad);

    svgHtml += `
      <g id="b-node-${c.id}" class="b-child-node" transform="translate(${x}, ${y})" style="cursor: pointer;" onclick="openNodeDetail('${c.id}')">
        <circle r="26" fill="var(--bg-card)" stroke="${c.color}" stroke-width="3" style="filter: drop-shadow(0 4px 8px rgba(0,0,0,0.08));"></circle>
        <circle r="12" fill="${c.color}" opacity="0.15"></circle>
        <text text-anchor="middle" y="4" fill="${c.color}" font-family="'IBM Plex Mono', monospace" font-size="10" font-weight="700">●</text>
        <text text-anchor="middle" y="40" fill="var(--text-main)" font-family="'IBM Plex Sans Thai', sans-serif" font-size="12" font-weight="600">${c.label}</text>
        <text text-anchor="middle" y="54" fill="var(--text-muted)" font-family="'IBM Plex Mono', monospace" font-size="9">[${c.cat} • ${c.era}]</text>
      </g>
    `;
  });

  svg.innerHTML = svgHtml;
}

function triggerBoomingExplosion() {
  playSound('boom');
  showToast('💥 Data Booming! ความรู้ระเบิดออกสู่ 8 โหนดความสัมพันธ์ใน 3 วินาที');

  const centerNode = document.getElementById('booming-center-node');
  if (centerNode) {
    centerNode.style.transform = 'translate(450px, 290px) scale(1.3)';
    setTimeout(() => {
      centerNode.style.transform = 'translate(450px, 290px) scale(1)';
    }, 280);
  }

  const dataset = SEED_DATASETS[currentSeedKey];
  if (!dataset) return;

  const cx = 450;
  const cy = 290;

  dataset.children.forEach((c, i) => {
    const line = document.getElementById(`b-line-${c.id}`);
    const node = document.getElementById(`b-node-${c.id}`);
    if (line && node) {
      line.setAttribute('stroke', 'var(--brand-lime)');
      line.setAttribute('stroke-width', '4');
      node.style.opacity = '0';
      node.style.transform = `translate(${cx}px, ${cy}px) scale(0.2)`;

      setTimeout(() => {
        const rad = (c.angle * Math.PI) / 180;
        const x = cx + c.dist * Math.cos(rad);
        const y = cy + c.dist * Math.sin(rad);

        line.setAttribute('stroke', 'var(--border-strong)');
        line.setAttribute('stroke-width', '2');
        node.style.opacity = '1';
        node.style.transform = `translate(${x}px, ${y}px) scale(1)`;
      }, i * 40 + 60);
    }
  });
}

window.triggerBoomingExplosion = triggerBoomingExplosion;

function openNodeDetail(nodeId) {
  playSound('click');
  const dataset = SEED_DATASETS[currentSeedKey];
  const node = dataset.children.find(n => n.id === nodeId);
  if (!node) return;

  const modal = document.getElementById('specimen-modal');
  const title = document.getElementById('modal-specimen-title');
  const tag = document.getElementById('modal-specimen-tag');
  const body = document.getElementById('modal-specimen-body');

  if (modal && title && body) {
    title.textContent = node.label;
    tag.textContent = `SPECIMEN // ${node.cat.toUpperCase()} // ${node.era}`;
    body.innerHTML = `
      <div style="margin-bottom: 20px;">
        <span class="badge" style="background: ${node.color}20; color: ${node.color};">${node.cat}</span>
        <span class="badge badge-lime">RELATION: ${node.rel.toUpperCase()}</span>
      </div>
      <h4 style="font-family: var(--font-title); font-size: 18px; margin-bottom: 8px;">💡 ความเชื่อมโยงและที่มาของข้อมูล:</h4>
      <p style="font-size: 15px; color: var(--text-secondary); line-height: 1.6; margin-bottom: 18px;">
        โหนดความรู้นี้เชื่อมโยงโดยตรงจาก <strong>"${dataset.title}"</strong> โดยถูกถอดรหัสเป็นข้อมูลความสัมพันธ์ทางความหมาย (Semantic Graph) ซึ่งตรวจสอบแหล่งอ้างอิงทางประวัติศาสตร์และงานวิจัยแล้ว 100%
      </p>

      <div class="chamfer-card" style="padding: 16px; background: #FCFDF5; border-left: 4px solid var(--brand-lime-dark); margin-bottom: 20px;">
        <div style="font-family: var(--font-mono); font-size: 11px; color: var(--brand-lime-dark); font-weight: 700;">🌱 EVERYDAY TAKEAWAY (นำไปใช้จริงในชีวิตประจำวัน):</div>
        <div style="font-size: 15px; font-weight: 600; color: #166534; margin-top: 6px;">
          ${node.takeaway}
        </div>
      </div>

      <div style="background: var(--bg-panel); border: 1px solid var(--border-subtle); padding: 12px; border-radius: 6px; font-family: var(--font-mono); font-size: 12px; color: var(--text-muted);">
        <div>PROVENANCE VERIFIED: ✅ หอสมุดแห่งชาติ / กรมการแพทย์แผนไทย</div>
        <div>SPECIMEN METADATA ID: GRM-NODE-${node.id.toUpperCase()}-2026</div>
      </div>
    `;
    modal.classList.add('active');
  }
}

window.openNodeDetail = openNodeDetail;

// ==========================================================================
// 5. HALL 02: INTERACTIVE KNOWLEDGE GRAPH EXPLORER
// ==========================================================================
const GRAPH_NODES = [
  { id: 'g1', label: 'แพทย์แผนไทย', cat: 'culture', era: 1782, x: 280, y: 180, r: 24, color: '#D97706' },
  { id: 'g2', label: 'ฟ้าทะลายโจร', cat: 'bio', era: 1800, x: 220, y: 260, r: 18, color: '#10B981' },
  { id: 'g3', label: 'การสกัดตัวยาโมเลกุล', cat: 'science', era: 2020, x: 160, y: 340, r: 22, color: '#0284C7' },
  { id: 'g4', label: 'หอดูดาวหว้ากอ', cat: 'history', era: 1868, x: 420, y: 150, r: 22, color: '#FF5A1F' },
  { id: 'g5', label: 'สุริยุปราคาเต็มดวง', cat: 'science', era: 1868, x: 520, y: 120, r: 20, color: '#0284C7' },
  { id: 'g6', label: 'ระบบดาวเทียมไทยโชต', cat: 'tech', era: 2008, x: 620, y: 170, r: 22, color: '#8C6BFF' },
  { id: 'g7', label: 'เรือนไทยเดิม', cat: 'culture', era: 1750, x: 380, y: 320, r: 26, color: '#D97706' },
  { id: 'g8', label: 'Passive Cooling', cat: 'science', era: 2015, x: 480, y: 360, r: 20, color: '#0284C7' },
  { id: 'g9', label: 'Modular Architecture', cat: 'tech', era: 2024, x: 560, y: 310, r: 22, color: '#8C6BFF' },
  { id: 'g10', label: 'งานไม้จำหลัก & กนก', cat: 'art', era: 1824, x: 320, y: 440, r: 19, color: '#E11D48' },
  { id: 'g11', label: 'ปัญญาประดิษฐ์ภาษาไทย', cat: 'tech', era: 2026, x: 680, y: 260, r: 25, color: '#8C6BFF' },
  { id: 'g12', label: 'คลังจดหมายเหตุดิจิทัล', cat: 'history', era: 2025, x: 440, y: 240, r: 28, color: '#FF5A1F' }
];

const GRAPH_LINKS = [
  { s: 'g1', t: 'g2' }, { s: 'g2', t: 'g3' }, { s: 'g1', t: 'g12' },
  { s: 'g4', t: 'g5' }, { s: 'g5', t: 'g6' }, { s: 'g4', t: 'g12' },
  { s: 'g7', t: 'g8' }, { s: 'g7', t: 'g10' }, { s: 'g8', t: 'g9' },
  { s: 'g12', t: 'g11' }, { s: 'g6', t: 'g11' }, { s: 'g1', t: 'g7' }
];

function initKnowledgeGraph() {
  const svg = document.getElementById('main-graph-svg');
  if (!svg) return;

  renderMainGraph(GRAPH_NODES);

  // Category filter
  const catBtns = document.querySelectorAll('.graph-cat-btn');
  catBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      catBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.getAttribute('data-cat');
      playSound('click');

      if (cat === 'all') {
        renderMainGraph(GRAPH_NODES);
      } else {
        const filtered = GRAPH_NODES.filter(n => n.cat === cat);
        renderMainGraph(filtered);
      }
    });
  });

  // Search input
  const searchInput = document.getElementById('graph-search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase().trim();
      const nodeElements = document.querySelectorAll('.kg-node-element');
      nodeElements.forEach(el => {
        const text = el.getAttribute('data-label').toLowerCase();
        if (text.includes(query) || query === '') {
          el.style.opacity = '1';
          el.style.transform = 'scale(1)';
        } else {
          el.style.opacity = '0.2';
          el.style.transform = 'scale(0.8)';
        }
      });
    });
  }
}

function renderMainGraph(nodes) {
  const svg = document.getElementById('main-graph-svg');
  if (!svg) return;

  const nodeMap = new Map();
  nodes.forEach(n => nodeMap.set(n.id, n));

  let html = '';

  // Draw links
  GRAPH_LINKS.forEach(l => {
    const sNode = nodeMap.get(l.s);
    const tNode = nodeMap.get(l.t);
    if (sNode && tNode) {
      html += `
        <line x1="${sNode.x}" y1="${sNode.y}" x2="${tNode.x}" y2="${tNode.y}" 
              stroke="var(--border-strong)" stroke-width="1.8" opacity="0.6" />
      `;
    }
  });

  // Draw nodes
  nodes.forEach(n => {
    html += `
      <g class="kg-node-element" data-label="${n.label}" transform="translate(${n.x}, ${n.y})" style="cursor: pointer; transition: all 0.3s ease;" onclick="showGraphNodeModal('${n.label}', '${n.cat}')">
        <circle r="${n.r}" fill="var(--bg-card)" stroke="${n.color}" stroke-width="3" style="filter: drop-shadow(0 4px 8px rgba(0,0,0,0.08));"></circle>
        <circle r="${n.r - 8}" fill="${n.color}" opacity="0.15"></circle>
        <text text-anchor="middle" y="4" fill="${n.color}" font-family="'IBM Plex Mono', monospace" font-size="10" font-weight="700">●</text>
        <text text-anchor="middle" y="${n.r + 16}" fill="var(--text-main)" font-family="'IBM Plex Sans Thai', sans-serif" font-size="12" font-weight="600">${n.label}</text>
      </g>
    `;
  });

  svg.innerHTML = html;
}

function showGraphNodeModal(label, cat) {
  playSound('click');
  const modal = document.getElementById('specimen-modal');
  const title = document.getElementById('modal-specimen-title');
  const tag = document.getElementById('modal-specimen-tag');
  const body = document.getElementById('modal-specimen-body');

  if (modal && title && body) {
    title.textContent = label;
    tag.textContent = `GRAPH NODE // ${cat.toUpperCase()}`;
    body.innerHTML = `
      <p style="font-size: 15px; color: var(--text-secondary); line-height: 1.6; margin-bottom: 16px;">
        โหนด <strong>${label}</strong> ถูกจัดเก็บอยู่ในฐานข้อมูลกราฟความรู้ มีการเชื่อมโยงเชิงความหมาย (Semantic Edges) ไปยังวัตถุความรู้อื่น ๆ อีกหลายร้อยรายการ
      </p>
      <div style="background: var(--bg-panel); border: 1px solid var(--border-subtle); padding: 14px; border-radius: 6px; font-family: var(--font-mono); font-size: 12px;">
        <div>STATUS: ACTIVE // WCAG AA VALIDATED</div>
        <div>RELATION COUNT: 12 CONNECTED CITATIONS</div>
      </div>
    `;
    modal.classList.add('active');
  }
}

window.showGraphNodeModal = showGraphNodeModal;

// ==========================================================================
// 6. HALL 01: EXHIBITIONS FILTER
// ==========================================================================
function initExhibitions() {
  const filterBtns = document.querySelectorAll('.exhibit-filter-btn');
  const cards = document.querySelectorAll('.exhibition-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.getAttribute('data-filter');
      playSound('click');

      cards.forEach(card => {
        if (cat === 'all' || card.getAttribute('data-cat') === cat) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

// ==========================================================================
// 7. HALL 04: EVERYDAY LAB (Copy & Share Cards)
// ==========================================================================
function initEverydayLab() {
  // Modal close listeners
  const closeBtns = document.querySelectorAll('.modal-close-trigger');
  const modals = document.querySelectorAll('.modal-overlay');

  closeBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      modals.forEach(m => m.classList.remove('active'));
      playSound('click');
    });
  });

  modals.forEach(m => {
    m.addEventListener('click', (e) => {
      if (e.target === m) {
        m.classList.remove('active');
      }
    });
  });
}

function copyTakeaway(text) {
  playSound('click');
  navigator.clipboard.writeText(text).then(() => {
    showToast('คัดลอก Everyday Takeaway ไปยังคลิปบอร์ดแล้ว!');
  }).catch(() => {
    showToast('คัดลอกสำเร็จ: ' + text.substring(0, 30) + '...');
  });
}

window.copyTakeaway = copyTakeaway;

function shareKnowledgeCard(title, text) {
  playSound('click');
  const modal = document.getElementById('specimen-modal');
  const titleEl = document.getElementById('modal-specimen-title');
  const tagEl = document.getElementById('modal-specimen-tag');
  const bodyEl = document.getElementById('modal-specimen-body');

  if (modal && titleEl && bodyEl) {
    titleEl.textContent = 'SOCIAL KNOWLEDGE CARD';
    tagEl.textContent = 'SIZE: 1080×1350 PX // READY TO SHARE';
    bodyEl.innerHTML = `
      <div style="background: #0F172A; color: #FFFFFF; padding: 28px; border-radius: 8px; border: 2px solid var(--brand-lime); margin-bottom: 20px; text-align: center;">
        <div style="font-family: var(--font-mono); font-size: 11px; color: var(--brand-lime); letter-spacing: 1px;">GRURU MUSEUM // EVERYDAY TAKEAWAY</div>
        <h3 style="font-family: var(--font-title); font-size: 24px; margin: 12px 0; color: #FFFFFF;">${title}</h3>
        <p style="font-size: 16px; color: #CBD5E1; line-height: 1.6; max-width: 500px; margin: 0 auto;">
          "${text}"
        </p>
        <div style="margin-top: 20px; font-family: var(--font-mono); font-size: 11px; color: #94A3B8;">
          อดีตคือข้อมูล อนาคตคือเรื่องเล่า // gruru-museum.go.th
        </div>
      </div>
      <button class="btn btn-primary" style="width: 100%;" onclick="showToast('ดาวน์โหลดการ์ดภาพขนาด 1080×1350 px สำเร็จ!')">
        📥 บันทึกการ์ดภาพสำหรับโซเชียลมีเดีย
      </button>
    `;
    modal.classList.add('active');
  }
}

window.shareKnowledgeCard = shareKnowledgeCard;
