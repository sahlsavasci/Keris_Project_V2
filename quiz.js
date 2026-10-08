/* ============================================================
   KUIS PUSAKA — gaya Kahoot, jawaban BENER / SALAH
   (halaman quiz.html · latarnya batik parang)
   ------------------------------------------------------------
   Alur: lobi → 5 soal (timer 20 dtk) → flash bener/salah → asil
   Poin ala Kahoot: makin cepet jawab, makin gedhe poiné.
   ============================================================ */

const $ = (s, r = document) => r.querySelector(s);

/* ---------- SOAL ---------- */
// [pernyataan, jawabanBener?, penjelasan]
const QZ = [
  ['Keris diakui UNESCO sebagai Karya Agung Warisan Budaya Takbenda dunia.', true,
    'Pengakuan itu diberikan UNESCO pada tahun 2005.'],
  ['Jumlah luk pada keris selalu genap.', false,
    'Jumlah luk selalu ganjil: 3, 5, 7, hingga 13 atau lebih.'],
  ['Pamor adalah motif pada bilah yang terbentuk dari lapisan logam berbeda.', true,
    'Motif itu dimunculkan lewat proses warangan (pemasukan bahan pamor).'],
  ['Ganja adalah gagang tempat tangan menggenggam keris.', false,
    'Gagang disebut hulu (deder). Ganja adalah bagian dasar bilah.'],
  ['Keris hanya dikenal di Pulau Jawa.', false,
    'Keris juga ada di Bali, Sumatra, Kalimantan, hingga Semenanjung Malaya.'],
];

const WAKTU = 20;              // detik per soal
const POIN_MAKS = 1000;

/* ---------- STATUS PERMAINAN ---------- */
let idx = 0;                   // soal sekarang (0-based)
let poin = 0;
let benar = 0;
let streak = 0;
let sisa = WAKTU;
let timer = null;
let lock = false;              // tunggu flash selesai

/* ---------- ELEMEN ---------- */
const elLobi = $('#lobi'), elGame = $('#game'), elAsil = $('#asil');
const elFlash = $('#flash');
const elSoal = $('#soal'), elNo = $('#noSoal'), elKartu = $('#kartuSoal');
const elTnum = $('#tnum'), elTfill = $('#tfill');
const elPoin = $('#poin'), elStreak = $('#streakBox');
const btnBener = $('#btnBener'), btnSalah = $('#btnSalah');

/* ---------- SUARA (WebAudio, tanpa berkas ekstra) ---------- */
let actx = null, sunye = true;

function ac() {
  if (!actx) actx = new (window.AudioContext || window.webkitAudioContext)();
  if (actx.state === 'suspended') actx.resume();
  return actx;
}
function tone(f, t0, dur, type = 'sine', vol = .18) {
  if (!sunye) return;
  try {
    const a = ac(), o = a.createOscillator(), g = a.createGain();
    o.type = type; o.frequency.value = f;
    const t = a.currentTime + t0;
    g.gain.setValueAtTime(vol, t);
    g.gain.exponentialRampToValueAtTime(.0001, t + dur);
    o.connect(g).connect(a.destination);
    o.start(t); o.stop(t + dur + .05);
  } catch (e) { /* suara bukan hal penting */ }
}
const sTik = () => tone(880, 0, .07, 'square', .08);
const sBener = () => { tone(660, 0, .12, 'triangle', .22); tone(990, .12, .22, 'triangle', .22); };
const sSalah = () => { tone(170, 0, .28, 'sawtooth', .2); tone(120, .14, .32, 'sawtooth', .16); };
const sRampung = () => [523, 659, 784, 1047].forEach((f, i) => tone(f, i * .13, .22, 'triangle', .2));

$('#mute').onclick = (e) => {
  sunye = !sunye;
  e.target.textContent = sunye ? '🔊' : '🔇';
};

/* ---------- NAVIGASI LAYAR ---------- */
function tampil(el) {
  [elLobi, elGame, elAsil].forEach((x) => x.classList.add('hidden'));
  el.classList.remove('hidden');
}

/* ---------- ALUR PERMAINAN ---------- */
$('#mulai').onclick = mulai;
$('#bali').onclick = mulai;

function mulai() {
  ac();                        // aktifkan audio lewat gestur pengguna
  idx = 0; poin = 0; benar = 0; streak = 0;
  elPoin.textContent = '0';
  elStreak.classList.add('hidden'); elStreak.classList.remove('flex');
  tampil(elGame);
  soalBaru();
}

function soalBaru() {
  const [teks] = QZ[idx];
  lock = false;
  sisa = WAKTU;

  elNo.textContent = `SOAL ${idx + 1}/${QZ.length}`;
  elSoal.textContent = teks;
  elKartu.classList.remove('qin'); void elKartu.offsetWidth;   // restart animasi
  elKartu.classList.add('qin');
  btnBener.disabled = btnSalah.disabled = false;
  updT();

  clearInterval(timer);
  timer = setInterval(jalan, 100);
}

function jalan() {
  sisa = Math.max(0, sisa - .1);
  updT();
  if (Math.abs(sisa - Math.round(sisa)) < .05 && sisa > 0 && sisa <= 5) sTik();
  if (sisa <= 0) {
    clearInterval(timer);
    lock = true;
    jawab(null);               // wektune entek → dianggap salah
  }
}

function updT() {
  const n = Math.ceil(sisa);
  elTnum.textContent = n;
  elTfill.style.width = (sisa / WAKTU * 100) + '%';
  elTnum.classList.toggle('bahaya', n <= 5);
  elTfill.classList.toggle('bahaya', n <= 5);
}

btnBener.onclick = () => jawab(true);
btnSalah.onclick = () => jawab(false);

function jawab(pilihan) {
  if (lock) return;
  lock = true;
  clearInterval(timer);
  btnBener.disabled = btnSalah.disabled = true;

  const [, kunci, ket] = QZ[idx];
  const pas = pilihan === kunci;

  // Poin ala Kahoot: separuh keberanian, separuh kecepatan
  let daptar = 0;
  if (pas) {
    daptar = Math.round(POIN_MAKS * (.5 + .5 * (sisa / WAKTU)));
    streak++;
    if (streak > 1) daptar += (streak - 1) * 100;   // bonus streak
    poin += daptar;
    benar++;
  } else {
    streak = 0;
  }

  elPoin.textContent = poin.toLocaleString('id-ID');
  if (streak > 1) {
    elStreak.classList.remove('hidden'); elStreak.classList.add('flex');
    elStreak.textContent = `🔥 Streak x${streak}`;
    elStreak.classList.remove('pop'); void elStreak.offsetWidth;
    elStreak.classList.add('pop');
  } else {
    elStreak.classList.add('hidden'); elStreak.classList.remove('flex');
  }

  pas ? sBener() : sSalah();
  flash(pas, daptar, ket, pilihan === null);
}

function flash(pas, daptar, ket, entek) {
  elFlash.classList.remove('bener', 'salah');
  elFlash.classList.add(pas ? 'bener' : 'salah', 'on');

  $('#fIkon').textContent = pas ? '✓' : (entek ? '⏰' : '✕');
  $('#fJudul').textContent = pas ? 'BENER!' : (entek ? 'WEKTUNE ENTEK!' : 'SALAH!');
  $('#fPoin').textContent = pas ? `+${daptar} poin` : '+0 poin';
  $('#fKet').textContent = ket;

  const ikon = $('#fIkon');
  ikon.classList.remove('ikon'); void ikon.offsetWidth; ikon.classList.add('ikon');

  setTimeout(() => {
    elFlash.classList.remove('on');
    idx++;
    idx < QZ.length ? setTimeout(soalBaru, 250) : rampung();
  }, 2400);
}

/* ---------- HASIL AKHIR ---------- */
const GELAR = [
  [1.00, 'Empu',       'Sampurna! Kowé layak diarani Empu — sing ngéto keris nganti ing jero.'],
  [0.80, 'Pande',      'Hebat! Kowé wong Pande sing paham bab keris.'],
  [0.60, 'Siswa',      'Cukup apik! Ayo sinau maneh ana ing anatomi lan galeri.'],
  [0.00, 'Wong Anyar', 'Ora apa-apa — dolan maneh menyang anatomi lan galeri, banjur cobaa kuis iki.'],
];

function rampung() {
  tampil(elAsil);
  sRampung();

  // tandai progres belajar (dibaca halaman utama)
  try {
    const KUNCI = 'pusaka-progres';
    const p = JSON.parse(localStorage.getItem(KUNCI) || '{}');
    p.kuis = true;
    localStorage.setItem(KUNCI, JSON.stringify(p));
  } catch (e) { /* penyimpanan nonaktif */ }

  const rasio = benar / QZ.length;
  const g = GELAR.find(([m]) => rasio >= m) || GELAR[GELAR.length - 1];
  $('#ringkas').textContent = `${benar} dari ${QZ.length} bener`;
  $('#gelar').textContent = g[1];
  $('#gelarKet').textContent = g[2];

  // skor muncul mekar (count-up ala Kahoot)
  const elSkor = $('#skor'), mulaiT = performance.now(), durasi = 1200;
  (function tik(rn) {
    const t = Math.min(1, (rn - mulaiT) / durasi);
    elSkor.textContent = Math.round(poin * (1 - Math.pow(1 - t, 3))).toLocaleString('id-ID');
    if (t < 1) requestAnimationFrame(tik);
  })(mulaiT);
}
