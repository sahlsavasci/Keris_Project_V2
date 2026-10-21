/* ============================================================
   PUSAKA — Belajar Keris Nusantara
   main.js · seluruh logika interaktif website
   (tampilan tetap memakai Tailwind + <style> di index.html)
   ------------------------------------------------------------
   Daftar isi:
     1.  Helper selektor
     2.  Data bagian-bagian keris (untuk anatomi & hotspot foto)
     3.  Posisi hotspot pada tiap foto anatomi
     4.  Data galeri — empat pusaka pilihan
     5.  Audio pemandu (text-to-speech)
     6.  Tombol ukuran huruf (#fs)
     7.  Progres belajar di hero (#pr)
     8.  Anatomi: tab bagian utama + daftar sub-anatomi
     9.  Tur panduan maskot
     10. Modal bimbingan & maskot dock
     11. Foto keris dari folder img/ (galeri & modal)
     12. Galeri: kartu foto + tilt + carousel geser + bar progres
     13. Modal detail keris (#dm)
     14. Kuis
     15. Animasi muncul saat scroll
   ============================================================ */


/* ---------- 1. HELPER SELEKTOR ---------- */

// $  → ambil SATU elemen   : $('#track')
// $$ → ambil BANYAK elemen : $$('.gcard')  (hasilnya array)
const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];


/* ---------- 2. DATA BAGIAN-BAGIAN KERIS ---------- */
// n = nama · d = deskripsi · m = makna filosofis

const PARTS = {
  ukiran: {
    n: 'Ukiran (Deder)',
    d: 'Gagang/hulu keris dari kayu keras seperti trembalu atau kemuning yang diukir dengan proporsi khas.',
    m: 'Sikap merunduk dan kerendahan hati (unggah-ungguh); pengingat agar mampu mencengkeram dan mengarahkan hawa nafsu sendiri.',
  },
  mendak: {
    n: 'Mendak',
    d: 'Cincin pembatas berhias yang terletak di antara gonjo dan pegangan.',
    m: 'Penyatu dua unsur: menjaga harmoni antara pemakai dan pusakanya.',
  },
  gonjo: {
    n: 'Gonjo',
    d: 'Landasan horizontal di paling bawah bilah tempat menancapnya paksi (pesi).',
    m: 'Wadah penyatu bilah dan hulu — keseimbangan antara mikrokosmos (manusia) dan makrokosmos (alam/Pencipta).',
  },
  sorsoran: {
    n: 'Sor-soran',
    d: 'Bagian pangkal bilah yang merupakan area paling lebar — tempat berkumpulnya sebagian besar fitur detail (ricikan).',
    m: 'Pondasi awal kehidupan: akar dan asal-usul manusia.',
  },
  pamor: {
    n: 'Pamor',
    d: 'Pola serat bernuansa perak yang terbentuk dari teknik menempa lipat (folding) gabungan besi, baja, dan bahan pamor seperti nikel atau batu meteorit.',
    m: 'Visualisasi doa dan harapan sang Empu: motif lurus melambangkan keteguhan hati, motif menyebar melambangkan kelancaran rezeki dan ketenangan jiwa.',
  },
  luk: {
    n: 'Luk',
    d: 'Bagian bilah yang berkelok-kelok. Jumlah luk pada keris selalu berbilang ganjil — luk 3, 5, 7, 9, hingga 13.',
    m: 'Melambangkan dinamika dan gelombang perjalanan hidup yang tidak pernah lurus sempurna: keluwesan menghadapi rintangan tanpa mengorbankan prinsip.',
  },
  adaada: {
    n: 'Ada-ada',
    d: 'Lingir atau tulang penyeimbang yang menonjol memanjang di tengah-tengah bilah.',
    m: 'Keteguhan niat dan tulang punggung moral dalam menjaga prinsip kebenaran.',
  },
  pucukan: {
    n: 'Pucukan',
    d: 'Bagian paling ujung/runcing dari keris.',
    m: 'Fokus dan tujuan akhir hidup — kembali kepada Sang Maha Pencipta (Manunggal ing Gusti).',
  },
};

/* ---------- 4. DATA GALERI — EMPAT PUSAKA PILIHAN ---------- */
// pamor  → jenis pola yang digambar: bendo | wos | udan | pedar
// luk    → jumlah lekukan bilah (0 = keris lurus)
// figure → ukiran gandhik: 'singo' | 'naga' | null
// ridge  → garis tengah: 'iron' (ada-ada) | 'gold' (kinatah) | null

const KERIS = [
  {
    id: 'singo',
    foto: 'img/keris/Keris_barongan.webp',
    n: 'Singo Barong',
    dh: 'Dhapur Singo Barong',
    badge: 'Berluk',
    lukLabel: 'Berluk',
    luk: 9,
    pamor: 'wos',
    figure: 'singo',
    ridge: 'iron',
    greneng: true,

    pamorN: 'Pamor Wos Wutah · Ngulit Semangka',
    pamorD: 'Motif garis-garis melingkar berlapis dengan kontras warna kelabu gelap (besi) dan putih keperakan (nikel/meteor).',
    pamorM: 'Rezeki yang melimpah, ketenteraman hidup, dan keselarasan dengan alam semesta.',
    quote: 'Kepemimpinan, kewibawaan, dan perlindungan.',

    struktur: [
      ['Gandhik Singo',
        'Figur singa jantan duduk bersimpuh siap menerkam. Gelung simbar dan anatomi tubuh singa digubah menyatu estetis dengan bilah besi. Mulut menganga — pada kelas tinggi dibuat menggigit emas (ngemut inten).'],
      ['Greneng · Ron Da & Pari Sawuli',
        'Tepi bergerigi tajam meruncing di atas ganja. Selain estetika, greneng adalah simbolisasi huruf Jawa kuno atau doa tersembunyi sang Empu, sekaligus kendali rasa agar pemilik tidak kehilangan kontrol diri.'],
      ['Ada-ada',
        'Tulang tengah bilah yang tegas dengan permukaan matang — menjadikan keris gagah dan kokoh.'],
    ],
    asosiasi: 'Para raja, senopati, dan pemimpin — pengingat untuk berani, tegas, dan kuat memimpin, namun tetap bijaksana.',
    esensi: [
      'Singo Barong mengemban esensi kepemimpinan, kewibawaan, dan perlindungan. Singa sebagai raja hutan adalah lambang kekuasaan yang adil.',
      'Dipercaya sebagai perisai spiritual (tolak bala) — mengusir energi negatif serta melindungi pemilik dan daerah kekuasaannya.',
    ],
  },

  {
    id: 'bendo',
    foto: 'img/keris/Keris_Gajah.webp',
    n: 'Bendo Segodo',
    dh: 'Dapur Lurus · Tilam Sari / Tilam Upih',
    badge: 'Dapur Lurus',
    lukLabel: 'Keris Lurus',
    luk: 0,
    pamor: 'bendo',
    figure: null,
    ridge: null,
    kk: true,
    greneng: true,

    pamorN: 'Pamor Bendo Segodo (Bendo Sagodo)',
    pamorD: 'Bulatan-bulatan menggumpal berderet dari pangkal hingga ujung bilah, dikelilingi garis-garis pamor miring.',
    pamorM: 'Kemudahan rezeki, kemakmuran yang bergumpal-gumpal, dan kelancaran usaha atau perniagaan.',
    quote: 'Kemakmuran bergumpal bagi hati yang bersahaja.',

    struktur: [
      ['Kembang Kacang',
        'Tonjolan bulat kecil di bagian bawah gandik (sisi belakang) — penyeimbang bilah sekaligus penanda dapur lurus klasik.'],
      ['Lekukan Gandik',
        'Lekukan kecil di bawah kembang kacang yang melambangkan kerendahan hati pemiliknya.'],
      ['Greneng',
        'Gerigi tajam pada sisi depan (arah ganja) — estetika sekaligus penyeimbang spiritual bilah.'],
    ],
    asosiasi: 'Pedagang, pengusaha, dan petani makmur — juga kepala keluarga: keris lurus melambangkan keteguhan iman, ketenangan, dan pelindung keluarga yang bersahaja.',
    esensi: [
      'Dapur lurus dipadu pamor rezeki menjadikannya azimat kemakmuran: kesuburan, simpanan harta, dan kelancaran finansial.',
      'Filosofinya sederhana — rezeki mengalir bagi hati yang tenang, usaha yang jujur, dan rumah tangga yang selaras.',
    ],
  },

  {
    id: 'parungsari',
    foto: 'img/keris/Keris_Gajah()2.webp',
    n: 'Parungsari',
    dh: 'Dhapur Parungsari · Luk 13',
    badge: 'Luk 13',
    lukLabel: 'Luk 13',
    luk: 13,
    pamor: 'udan',
    figure: null,
    ridge: 'iron',
    kk: true,
    lambe: true,
    sogok: true,
    greneng: true,

    pamorN: 'Pamor Udan Mas Tiban · Beras Wutah',
    pamorD: 'Titik bulatan tak beraturan serta guratan putih keperakan yang tersebar acak — hasil teknik tempa lipat logam berlapis.',
    pamorM: 'Rezeki yang melimpah dan berkah yang turun bagaikan hujan emas.',
    quote: 'Keindahan tersembunyi dan kepemimpinan yang mengayomi.',

    struktur: [
      ['Kembang Kacang',
        'Struktur melingkar di ujung gandik menyerupai belalai gajah pendek.'],
      ['Dua Lambe Gajah',
        'Dua tonjolan kecil kembar di bawah kembang kacang — pembeda tegas Parungsari dari Sengkelat yang hanya punya satu.'],
      ['Sogokan Rangkap',
        'Alur parit kembar di pangkal bilah — bagian ricikan padat khas Parungsari.'],
      ['Ganja & Greneng',
        'Dudukan bilah yang melebar ke arah ganja, dengan gerigi susun (greneng) di ujung belakangnya.'],
    ],
    asosiasi: 'Ksatria dan pemimpin yang berbudi — berkuasa tinggi namun tetap merangkul dan mengayomi.',
    esensi: [
      'Parung = deretan bukit, Sari = bunga/keharuman: keindahan tersembunyi, spiritualitas, dan kepemimpinan yang mengayomi.',
      'Keluhuran budi — pemimpin berkekuasaan tinggi (luk 13 sakral) tetap lembut hati; pamor Udan Mas membawa doa rezeki berlimpah.',
    ],
  },

  {
    id: 'nagasasra',
    foto: 'img/keris/Keris_berasMuntah.webp',
    n: 'Naga Sasra',
    dh: 'Dhapur Naga Sasra (Nogososro)',
    badge: 'Berluk · Kinatah Emas',
    lukLabel: 'Berluk',
    luk: 7,
    pamor: 'pedar',
    figure: 'naga',
    ridge: 'gold',
    grenengSung: true,

    pamorN: 'Pamor Wos Wutah · Pedaringan Kebak',
    pamorD: 'Guratan kontras melingkar tak beraturan yang sangat padat di sepanjang badan bilah baja.',
    pamorM: 'Kemakmuran dan limpahan rezeki bagaikan beras yang tumpah dari wadahnya, serta ketenteraman hidup.',
    quote: 'Wibawa raja, kemenangan, dan perlindungan tertinggi.',

    struktur: [
      ['Gandik Naga Kinatah Emas',
        'Kepala naga bermahkota diselimuti emas timbul (kinatah emas); mulut disumpal emas — simbol memegang teguh sabda. Tubuh naga meliuk mengikuti lekukan hingga ujung.'],
      ['Ganja Kinatah Gajah Singo',
        'Di bawah perut naga terdapat stilasi ukiran gajah; di pangkal bungkul diukir singa duduk (singo) dengan ekor lancip greneng sungsun.'],
      ['Lung Kamarogan',
        'Ukiran flora merambat yang memenuhi area tengah antara gajah dan singa pada ganja.'],
      ['Sengkalan Memet',
        'Gajah (8) · Singa (5) · Naga (8) · Emas (1) — kronogram era Mataram Sultan Agung penanda tahun kejayaan memadamkan pemberontakan di Pati.'],
    ],
    asosiasi: 'Raja dan penguasa — aksen kekuasaan tertinggi, wibawa raja, dan aura keningratan.',
    esensi: [
      'Naga melambangkan kekuatan bumi, perlindungan, dan mandat kekuasaan. Mulut naga yang menggigit emas mengingatkan pentingnya menepati sabda.',
      'Kombinasi Naga Sasra dan Kinatah Gajah Singo menjadi simbol kemenangan sejarah sekaligus pelindung spiritual tertinggi.',
    ],
  },
];
/* ---------- 5. AUDIO PEMANDU (TEXT-TO-SPEECH) ---------- */

const S = { on: true };       // status suara (tombol 🔊 / 🔇)
let tok = 0;                  // nomor urut ucapan; ucapan lama otomatis batal
const synth = window.speechSynthesis;

// Rekaman suara Ayu untuk tiap langkah tur (elemen <audio> di index.html)
const REKAMAN_PEMANDU = ['#suaraSambutan', '#suaraAnatomi', '#suaraGaleri', '#suaraVideo', '#suaraKuis'];
let sambutanTimer = null;     // pengaman agar tur tidak melompat dua kali

// Hentikan semua rekaman pemandu yang sedang bunyi
function stopSambutan() {
  if (sambutanTimer) { clearTimeout(sambutanTimer); sambutanTimer = null; }
  REKAMAN_PEMANDU.forEach((sel) => {
    const a = $(sel);
    if (a) { a.onended = null; a.pause(); }
  });
}

// Putar satu rekaman pemandu (default: sambutan)
function putarSambutan(sesudahSelesai, sel = '#suaraSambutan') {
  stopSambutan();
  const a = $(sel);
  a.currentTime = 0;
  a.volume = 1;
  a.onended = () => { a.onended = null; if (sesudahSelesai) sesudahSelesai(); };
  a.play().catch((e) => {
    console.warn('[PUSAKA] sambutan gagal diputar:', e && e.name, e && e.message);
    if (sesudahSelesai) setTimeout(sesudahSelesai, 2000);
  });
}

// Rekaman penutup Ayu: diputar di akhir tur (menggantikan suara robot/TTS)
function stopPenutup() {
  const a = $('#suaraPenutup');
  if (a) { a.onended = null; a.pause(); }
}

function putarPenutup(sesudahSelesai) {
  stopPenutup();
  const a = $('#suaraPenutup');
  a.currentTime = 0;
  a.volume = 1;
  a.onended = () => { a.onended = null; if (sesudahSelesai) sesudahSelesai(); };
  a.play().catch((e) => {
    console.warn('[PUSAKA] penutup gagal diputar:', e && e.name, e && e.message);
    if (sesudahSelesai) setTimeout(sesudahSelesai, 2000);
  });
}

// Perbarui kotak status audio di navbar
function setNow(topic, play) {
  const n = $('#now');
  n.classList.toggle('playing', !!play);
  $('#dot').style.display = play ? 'none' : '';
  $('#dot').style.background = topic ? '#f57b01' : '';
  $('#stopBtn').classList.toggle('hidden', !topic);
  $('#nowTxt').textContent = topic
    ? (play ? 'Memutar · ' : 'Topik · ') + topic
    : 'Audio siap · tekan maskot';
}

// Bacakan teks dengan suara + tampilkan di balon maskot
function say(topic, text, done) {
  const tokenKu = ++tok;
  if (synth) synth.cancel();
  stopSambutan();               // suara baru menggantikan semua yang sedang bunyi
  stopPenutup();
  setNow(topic, true);
  $('#cap').textContent = text;
  showDock();

  // dipanggil saat ucapan selesai
  const end = () => {
    if (tokenKu !== tok) return;            // sudah digantikan ucapan lain
    setNow(topic, false);
    if (done) done();
  };

  // Suara dimatikan → tampilkan teks saja beberapa detik
  if (!S.on) {
    setTimeout(end, Math.min(9000, text.length * 55));
    return;
  }

  const ucapan = new SpeechSynthesisUtterance(text);
  ucapan.lang = 'id-ID';
  ucapan.rate = 0.95;
  ucapan.onstart = () => { $('#nowTxt').textContent = 'Suara komputer (TTS) berbunyi…'; };
  ucapan.onend = end;
  ucapan.onerror = (e) => {
    $('#nowTxt').textContent = '⚠ TTS gagal (' + (e.error || 'err') + ')';
    end();
  };
  synth.speak(ucapan);
}

// Hentikan suara yang sedang berjalan
function silence() {
  tok++;
  if (synth) synth.cancel();
  stopSambutan();
  stopPenutup();
  setNow('', false);
}

$('#stopBtn').onclick = silence;

// — Tombol "Panduan Digital" (hero): memulai tur + memicu suara sambutan —
$('#btn-panduan').onclick = () => startGuide();

$('#mute').onclick = (e) => {
  S.on = !S.on;
  e.target.textContent = S.on ? '🔊' : '🔇';
  if (!S.on) { if (synth) synth.cancel(); stopSambutan(); stopPenutup(); }
};


/* ---------- 6. TOMBOL UKURAN HURUF (#fs) ---------- */
// Memutar ukuran akar dokumen; semua ukuran Tailwind (rem) ikut membesar

const UKURAN_HURUF = ['100%', '110%', '122%'];
const LABEL_HURUF = ['Aa', 'A+', 'A++'];
let idxHuruf = +(localStorage.getItem('pusaka-huruf') || 0);

function terapkanUkuranHuruf() {
  document.documentElement.style.fontSize = UKURAN_HURUF[idxHuruf];
  $('#fs').textContent = LABEL_HURUF[idxHuruf];
}

$('#fs').onclick = () => {
  idxHuruf = (idxHuruf + 1) % UKURAN_HURUF.length;
  localStorage.setItem('pusaka-huruf', idxHuruf);
  terapkanUkuranHuruf();
};

terapkanUkuranHuruf();


/* ---------- 7. PROGRES BELAJAR DI HERO (#pr) ---------- */
// Tiga langkah belajar; dicentang otomatis saat pengunjung menyelesaikannya.
// Progres disimpan di localStorage agar tidak hilang saat halaman dibuka lagi.

const KUNCI_PROGRES = 'pusaka-progres';
const LANGKAH_PROGRES = [
  ['anatomi', 'Pelajari anatomi keris'],
  ['galeri', 'Jelajahi galeri pusaka'],
  ['kuis', 'Selesaikan kuis'],
];

let progres = JSON.parse(localStorage.getItem(KUNCI_PROGRES) || '{}');

function tandaiProgres(kunci) {
  if (progres[kunci]) return;
  progres[kunci] = true;
  localStorage.setItem(KUNCI_PROGRES, JSON.stringify(progres));
  renderProgres();
}

function renderProgres() {
  const selesai = LANGKAH_PROGRES.filter(([k]) => progres[k]).length;
  const persen = Math.round((selesai / LANGKAH_PROGRES.length) * 100);

  $('#pr').innerHTML = `
    <div class="flex items-center justify-between mb-3">
      <p class="text-[11px] tracking-[.25em] text-orange-300/80 font-semibold">PROGRES BELAJARMU</p>
      <span class="text-xs text-orange-200">${persen}%</span>
    </div>
    <div class="h-1 rounded bg-white/15 mb-3">
      <div class="h-1 rounded bg-gold transition-all" style="width:${persen}%"></div>
    </div>
    <ul class="space-y-1.5 text-sm">
      ${LANGKAH_PROGRES.map(([k, label]) => `
        <li class="flex items-center gap-2">
          ${progres[k]
      ? '<span class="text-green-400 font-semibold">✓</span>'
      : '<span class="opacity-60">○</span>'}
          <span class="${progres[k] ? '' : 'opacity-70'}">${label}</span>
        </li>`).join('')}
    </ul>`;
}

renderProgres();


/* ---------- 8. ANATOMI: TIGA BAGIAN UTAMA ---------- */
// Navigasi hanya ke tiga bagian utama keris. Setiap bagian memakai
// satu foto besar + daftar sub-anatomi (penjelasan) di sampingnya.

const BAGIAN = [
  {
    id: 'deder',
    n: 'Deder (Gagang)',
    foto: 'img/AnatomiKeris/Gagang%20keris.png',
    garis: 'Pegangan keris — gubahan anatomi manusia yang menunduk (unggah-ungguh).',
    anak: [
      {
        n: 'Sirah — Ngajeng & Wingking',
        d: 'Bagian teratas hulu: Sirah Ngajeng melengkung ke arah depan, Sirah Wingking adalah mahkota teratas sebelah belakang.',
        m: 'Melambangkan kepala manusia yang menunduk.'
      },
      {
        n: 'Bathuk (Dahi)',
        d: 'Cembungan atau tonjolan di bagian dahi — depan atas, tepat di bawah Sirah Ngajeng.'
      },
      {
        n: 'Geger (Punggung)',
        d: 'Sisi belakang gagang yang melengkung mulus — dirancang ergonomis untuk menempel pada telapak tangan saat keris digenggam.'
      },
      {
        n: 'Dhadha (Dada) & Weteng (Perut)',
        d: 'Bagian depan gagang yang membusung — tumpuan lekukan jari manis dan jari tengah agar genggaman mantap dan tidak licin.'
      },
      {
        n: 'Pipi',
        d: 'Bidang datar atau melengkung halus di sisi kanan dan kiri deder.'
      },
      {
        n: 'Cetek / Cigir (Pinggang)',
        d: 'Lekukan menyempit di antara bagian dada dan pangkal bawah hulu — batas estetika sekaligus lekukan ergonomis.'
      },
      {
        n: 'Bungkul',
        d: 'Tonjolan membulat di bagian bawah depan, tepat di atas pangkal hulu.'
      },
      {
        n: 'Cecekan / Patra (Ukiran Ornamen)',
        d: 'Ukiran halus berbentuk sulur-suluran (lung-lungan), dedaunan, atau garis artistik pada kayu/gading — menyamarkan bentuk manusia sesuai ajaran budaya Jawa-Islam.'
      },
      {
        n: 'Alas Deder & Lubang Pesi',
        d: 'Bagian tumpakan paling bawah yang rata; di tengahnya terdapat lubang tempat masuknya pesi (tangkai besi keris). Menempel rapat pada mendak (cincin pembatas).'
      },
    ],
  },
  {
    id: 'warangka',
    n: 'Warangka (Sarung)',
    foto: 'img/AnatomiKeris/Warangka%20Keris.png',
    garis: 'Sarung keris — penopang, pelindung, sekaligus wajah penampil pusaka.',
    anak: [
      {
        n: 'Sampir / Daun Warangka',
        d: 'Bagian teratas yang melebar mirip perahu melengkung — menopang ganja keris serta menahan keris agar tersangkut stabil saat diselipkan di pinggang.'
      },
      {
        n: 'Angkeb (Lubang Warangka)',
        d: 'Celah atau bibir di permukaan atas tempat memasukkan bilah keris.'
      },
      {
        n: 'Janggut / Dhadha',
        d: 'Bagian cembungan depan sampir yang membusung.'
      },
      {
        n: 'Godhi / Runcingan Ujung',
        d: 'Ujung melengkung runcing di bagian depan sampir — sangat menonjol pada gaya Ladrang atau Branggah.'
      },
      {
        n: 'Awa / Buntut Sampir',
        d: 'Bagian belakang sampir yang meliuk pendek ke arah belakang pegangan.'
      },
      {
        n: 'Gandar',
        d: 'Batang kayu memanjang ke bawah dari dasar sampir; di dalamnya terdapat rongga presisi (alur) yang memeluk bilah (wilah) agar aman dan tidak bergoyang.'
      },
      {
        n: 'Pendok',
        d: 'Selongsong logam (kuningan, tembaga, perak, atau emas) pembungkus gandar kayu — memperindah penampilan sekaligus menguatkan struktur agar kayu tidak mudah retak.'
      },
      {
        n: 'Buntut / Angkus',
        d: 'Bagian paling ujung/bawah warangka (ujung pendok); pada pendok tipe bunton dibuat tumpul membulat atau diberi ukiran mahkota kecil sebagai penutup estetis.'
      },
    ],
  },
  {
    id: 'wilah',
    n: 'Wilah (Bilah)',
    foto: 'img/AnatomiKeris/Badan%20keris.png',
    garis: 'Bilah inti keris — dari pesi di dasar hingga pucukan di ujung.',
    anak: [
      {
        n: 'Pesi',
        d: 'Tangkai besi silinder ramping di dasar bilah; menancap masuk ke dalam deder (pegangan) setelah melewati lubang ganja dan mendak.'
      },
      {
        n: 'Sorsoran',
        d: 'Seperempat bagian paling bawah bilah (tepat di atas ganja) — area paling padat yang memuat sebagian besar ornamen (ricikan).',
        foto: 'img/AnatomiKeris/Badan%20keris.png'
      },
      {
        n: 'Awak-awak',
        d: 'Bagian tengah atau badan bilah keris.',
        foto: 'img/AnatomiKeris/Ujung%20keris.png'
      },
      {
        n: 'Luk',
        d: 'Lekukan bilah; jumlahnya selalu berbilang ganjil — luk 3, 5, 7, 9, hingga 13.',
        m: 'Dinamika dan gelombang perjalanan hidup.',
        foto: 'img/AnatomiKeris/Ujung%20keris.png'
      },
      {
        n: 'Pamor',
        d: 'Pola serat perak hasil teknik menempa lipat besi, baja, dan bahan pamor (nikel/meteorit).',
        m: 'Visualisasi doa dan harapan sang Empu.',
        foto: 'img/AnatomiKeris/Badan%20keris.png'
      },
      {
        n: 'Pucukan',
        d: 'Ujung paling atas bilah keris yang meruncing.',
        m: 'Fokus dan tujuan akhir hidup — Manunggal ing Gusti.',
        foto: 'img/AnatomiKeris/Landep.png'
      },
      {
        n: 'Ada-ada',
        d: 'Lingir atau tulang penyeimbang yang menonjol memanjang di tengah-tengah bilah.',
        m: 'Keteguhan niat dan prinsip kebenaran.',
        foto: 'img/AnatomiKeris/Landep.png'
      },
    ],
  },
];

let bagianAktif = 0;

// Tampilkan satu bagian utama: foto besar + daftar sub-anatomi di panel
function renderAnatomi() {
  const b = BAGIAN[bagianAktif];
  const img = $('#fotoAnatomi');
  img.src = b.foto;
  img.alt = 'Foto ' + b.n;

  $('#panel').innerHTML = `
    <p class="text-gold text-xs tracking-widest">BAGIAN UTAMA</p>
    <h3 class="font-serif text-3xl mt-1">${b.n}</h3>
    <p class="text-stone-300 mt-2 text-sm leading-relaxed">${b.garis}</p>
    <div id="daftarAnak" class="mt-4 space-y-2.5 overflow-y-auto pr-1 max-h-[44vh] lg:max-h-[560px]">
      ${b.anak.map((a) => `
        <div class="anak rounded-2xl border border-stone-800 bg-black/30 p-3.5 ${a.foto ? 'cursor-pointer hover:border-gold/60' : ''}" ${a.foto ? `data-foto="${a.foto}"` : ''}>
          <p class="text-gold-soft font-semibold text-sm">${a.n}</p>
          <p class="text-stone-300 text-sm mt-1 leading-relaxed">${a.d}</p>
          ${a.m ? `<p class="text-orange-200/80 text-xs italic mt-1.5">${a.m}</p>` : ''}
          ${a.foto ? '<p class="text-[10px] text-stone-500 mt-1.5 tracking-wider">📷 LIHAT FOTO BAGIAN INI</p>' : ''}
        </div>`).join('')}
    </div>
    </div>`;

  // klik item yang punya foto khusus → ganti foto besar
  $$('#daftarAnak .anak').forEach((row) => {
    if (row.dataset.foto) row.onclick = () => {
      $('#fotoAnatomi').src = row.dataset.foto;
      $('#fotoAnatomi').alt = 'Foto ' + row.querySelector('p').textContent;
    };
  });

  tandaiProgres('anatomi');
}

// Tab bagian utama
$$('.tab').forEach((t, i) => (t.onclick = () => {
  bagianAktif = i;
  $$('.tab').forEach((x, j) => {
    const aktif = j === i;
    x.classList.toggle('bg-gold', aktif);
    x.classList.toggle('text-black', aktif);
  });
  renderAnatomi();
}));

renderAnatomi();

/* ---------- 9. TUR PANDUAN MASKOT ---------- */
// t = judul topik · sec = section yang difokus
// sel = elemen yang disorot · s = kalimat yang diucapkan
// pose = postur maskot di langkah ini: 'sapa' | 'periksa' | 'jelas' | 'tutup' (lihat MASKOT)
// manual = true → menekan tombol sorotan TIDAK otomatis lanjut (mis. video: biarkan pengunjung menonton);
//          caption diganti `after`, lalu pengunjung menekan "Lewati" saat siap
// onLeave = dipanggil saat meninggalkan langkah ini

// Jeda (ms) antara tombol sorotan ditekan dan pindah ke langkah berikutnya — sama untuk semua langkah
const JEDA_PINDAH = 700;

const STEPS = [
  {
    t: 'Pengantar',
    pose: 'sapa',        // Ayu (Greeting)
    sec: '#hero',
    sel: '#btn-anatomi',
    audio: '#suaraSambutan',   // rekaman sambutan Ayu
    s: 'Halo, selamat datang di Pusaka, rumah belajar keris Nusantara. Aku akan menemanimu berkeliling singkat. Pertama, tekan tombol Mulai Belajar yang bersinar di layar.',
  },
  {
    t: 'Anatomi Keris',
    pose: 'periksa',     // Ayu (Inspecting)
    sec: '#anatomi',
    sel: '.tab',
    audio: '#suaraAnatomi',
    s: 'Inilah tiga bagian utama keris: deder, warangka, dan wilah. Coba tekan salah satu tab di atas, lalu baca sub-anatomi di samping fotonya.',
  },
  {
    t: 'Galeri Pusaka',
    pose: 'periksa',     // Ayu (Inspecting)
    sec: '#galeri',
    sel: '.eye',
    audio: '#suaraGaleri',
    s: 'Bagus! Sekarang galeri pusaka. Geser koleksinya ke kanan atau kiri, lalu tekan tombol pada salah satu keris untuk membuka detail lengkapnya.',
  },
  {
    t: 'Video Pembuatan Keris',
    pose: 'jelas',        // Ayu (Explaining)
    sec: '#video',
    sel: '#videoPlay',
    audio: '#suaraVideo',
    manual: true,        // jangan pindah sendiri setelah video diputar
    s: 'Sebelum menguji pengetahuan, tontonlah proses pembuatan keris. Tekan tombol putar untuk melihat bagaimana sebilah keris ditempa, mulai dari marka, pasarangan, hingga peracikan.',
    after: 'Selamat menonton! Kalau sudah selesai, tekan Lewati untuk lanjut ke kuis.',
    onLeave: jedaVideo,  // video dijeda saat tur pindah ke langkah berikutnya
  },
  {
    t: 'Uji Pengetahuan',
    pose: 'jelas',       // Ayu (Explaining)
    sec: '#kuis',
    sel: '#btn-kuis',
    audio: '#suaraKuis',
    s: 'Terakhir, uji pengetahuanmu. Tekan tombol Mulai Kuis — lima pernyataan Benar atau Salah menunggumu di halaman kuis.',
  },
];

// Jeda video YouTube (butuh enablejsapi=1 pada alamat embed di index.html)
function jedaVideo() {
  const f = $('#videoWrap iframe');
  if (f && f.contentWindow) {
    f.contentWindow.postMessage(JSON.stringify({ event: 'command', func: 'pauseVideo', args: [] }), '*');
  }
}

let gi = -1;           // indeks langkah sekarang
let clean = null;      // pembersih sorotan langkah sebelumnya
let guiding = false;   // apakah sedang tur

function focusSec(id) {
  $$('.sec').forEach((s) => s.classList.remove('focus'));
  if (id) $(id).classList.add('focus');
}

function startGuide() {
  guiding = true;
  gi = -1;
  setMaskot('sapa');    // langkah pertama: maskot menyapa (postur tiap langkah diatur di nextStep)
  showDock();           // pastikan dock terlihat walau belum digulir
  document.body.classList.add('guiding');
  $('#bubble').classList.remove('hidden');
  nextStep();
}

function nextStep() {
  if (clean) clean();
  tok++;                        // batal ucapan TTS langkah sebelumnya
  if (synth) synth.cancel();
  stopSambutan();
  stopPenutup();
  gi++;
  if (gi >= STEPS.length) return endGuide(true);
  const langkahIni = gi;

  const step = STEPS[gi];
  const targets = $$(step.sel);
  setMaskot(step.pose || 'jelas');   // postur maskot sesuai halaman/langkah

  focusSec(step.sec);
  $(step.sec).scrollIntoView({ behavior: 'smooth', block: 'start' });

  // sorot target; begitu salah satu ditekan → lanjut langkah berikut
  targets.forEach((el) => el.classList.add('spot'));
  const lanjut = () => {
    if (gi !== langkahIni) return;   // sudah maju lewat jalur lain
    stopSambutan();
    if (step.manual) {                 // mis. video: biarkan pengunjung menonton
      tok++; if (synth) synth.cancel();   // hentikan suara agar tidak menimpa audio video
      setNow('', false);
      $('#cap').textContent = step.after;
      targets.forEach((el) => el.classList.remove('spot'));
      return;
    }
    setTimeout(nextStep, JEDA_PINDAH);
  };
  targets.forEach((el) => el.addEventListener('click', lanjut, { once: true }));

  clean = () => {
    targets.forEach((el) => {
      el.classList.remove('spot');
      el.removeEventListener('click', lanjut);
    });
    if (step.onLeave) step.onLeave();
  };

  // SEMUA langkah (termasuk pengantar) bertempo sama: putar rekaman Ayu (bila suara aktif),
  // lalu TUNGGU pengunjung menekan tombol sorotan. Tur tidak pernah lanjut sendiri.
  if (step.audio && S.on) {
    $('#cap').textContent = step.s;
    setNow(step.t + ' (Ayu)', true);
    putarSambutan(() => { if (gi === langkahIni) setNow(step.t, false); }, step.audio);
    return;
  }

  say(step.t, step.s);
}

function endGuide(ok) {
  if (clean) clean();
  clean = null;
  guiding = false;
  document.body.classList.remove('guiding');
  focusSec(null);

  if (ok) {
    setMaskot('tutup');   // postur penutup — tetap terpasang sampai tur berikutnya dimulai
    $('#cap').textContent = 'Selamat mencoba! Bimbingan selesai. Tekan maskot kapan saja jika kamu ingin dipandu lagi.';
    setNow('Penutup (Ayu)', true);
    putarPenutup(() => {
      $('#bubble').classList.add('hidden');
      setNow('', false);
    });
  } else {
    silence();
    setMaskot('sapa');
    $('#bubble').classList.add('hidden');
  }
}

$('#skip').onclick = nextStep;
$('#end').onclick = () => endGuide(false);


/* ---------- 10. MODAL BIMBINGAN & MASKOT DOCK ---------- */
// Maskot punya empat postur (folder img/Maskot/):
//   sapa    → menyambut pengunjung (hero, pengantar & kondisi diam)
//   periksa → saat membahas benda yang diamati (anatomi, galeri)
//   jelas   → saat tur sedang menjelaskan (video, kuis)
//   tutup   → saat tur selesai (ucapan penutup)
// Postur tiap langkah diatur lewat properti `pose` di STEPS.

const MASKOT = {
  sapa: 'img/Maskot/Ayu%20(Greeting).png',
  periksa: 'img/Maskot/Ayu%20(Inspecting).png',
  jelas: 'img/Maskot/Ayu%20(Explaining).png',
  tutup: 'img/Maskot/Ayu%20(Appreciation).png',
};

const modal = $('#modal');

function openModal() { modal.classList.replace('hidden', 'flex'); }
function closeModal() { modal.classList.replace('flex', 'hidden'); }

// Ganti postur maskot pada dock
function setMaskot(posisi) {
  $('#mascotImg').src = MASKOT[posisi];
}

// Dock maskot tersembunyi di awal (hero sudah punya maskot sapa),
// lalu muncul & mengikuti layar begitu halaman digulir / ada suara berbunyi
function showDock() {
  $('#dock').classList.remove('opacity-0', 'pointer-events-none');
}

addEventListener('scroll', () => {
  if (scrollY > 300) showDock();
}, { passive: true });

// Maskot di hero: menyapa & membuka tawaran bimbingan
const tombolHero = $('#mascotHero');
if (tombolHero) tombolHero.onclick = openModal;

// Maskot di dock: mengulang kalimat saat tur berjalan, selain itu buka modal
$('#mascotDock').onclick = () =>
  guiding
    ? say(STEPS[Math.max(gi, 0)].t, STEPS[Math.max(gi, 0)].s)
    : openModal();

$('#yes').onclick = () => { closeModal(); startGuide(); };
$('#no').onclick = closeModal;
/* ---------- 12. GALERI: KARTU TILT + CAROUSEL + PROGRES ---------- */

const IKON_MATA = `<svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M2.5 12S6 5.8 12 5.8 21.5 12 21.5 12 18 18.2 12 18.2 2.5 12 2.5 12Z"/><circle cx="12" cy="12" r="2.7"/></svg>`;

const track = $('#track');

// Buat satu kartu untuk setiap keris
KERIS.forEach((keris, i) => {
  track.insertAdjacentHTML('beforeend', `
    <article class="gcard rv group relative flex-none w-[280px] sm:w-[320px] snap-start glass rounded-3xl overflow-hidden flex flex-col" style="transition-delay:${i * 80}ms">

      <!-- Panggung ilustrasi -->
      <div class="art relative h-44 overflow-hidden">
        <img src="${keris.foto}" alt="Foto ${keris.n}" loading="lazy"
             class="gimg absolute inset-0 w-full h-full object-cover"
             style="object-position:center 72%">
        <span class="absolute top-3 left-3 rounded-full bg-black/60 border border-gold/40 text-gold text-[10px] tracking-widest px-3 py-1">
          ${keris.badge.toUpperCase()}
        </span>
        <button class="eye absolute top-3 right-3 w-9 h-9 rounded-full bg-black/60 border border-gold/40 text-gold flex items-center justify-center"
                data-i="${i}" aria-label="Lihat detail ${keris.n}" title="Lihat detail ${keris.n}">
          ${IKON_MATA}
        </button>
        <span class="absolute bottom-2 right-3 text-[10px] text-stone-600 tracking-widest">0${i + 1} / 04</span>
      </div>

      <!-- Ringkasan singkat -->
      <div class="p-5 flex flex-col gap-2 flex-1 border-t border-gold/10">
        <h3 class="font-serif text-2xl leading-tight">${keris.n}</h3>
        <p class="text-xs text-stone-400">${keris.dh}</p>
        <p class="text-sm text-stone-300 leading-relaxed">${keris.quote}</p>
        <div class="mt-auto pt-3 flex items-center gap-2 text-[10px] tracking-wider text-gold/80 uppercase">
          <span class="w-5 h-px bg-gold/50"></span>${keris.pamorN.replace('Pamor ', '')}
        </div>
      </div>
    </article>`);
});

// Efek tilt 3D mengikuti posisi kursor pada kartu
$$('.gcard').forEach((card) => {
  card.addEventListener('pointermove', (e) => {
    if (e.pointerType !== 'mouse') return;
    const r = card.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width - 0.5;
    const py = (e.clientY - r.top) / r.height - 0.5;
    card.style.setProperty('--ry', (px * 10).toFixed(2) + 'deg');
    card.style.setProperty('--rx', (-py * 10).toFixed(2) + 'deg');
  });
  card.addEventListener('pointerleave', () => {
    card.style.setProperty('--rx', '0deg');
    card.style.setProperty('--ry', '0deg');
  });
});

// Tombol panah + bar progres di bawah track
function updArrows() {
  const maks = track.scrollWidth - track.clientWidth;
  const porsi = maks > 0 ? track.scrollLeft / maks : 1;
  $('#prog').style.width = 25 + porsi * 75 + '%';
  $('#prev').style.opacity = track.scrollLeft <= 4 ? 0.25 : 1;
  $('#prev').style.pointerEvents = track.scrollLeft <= 4 ? 'none' : '';
  $('#next').style.opacity = track.scrollLeft >= maks - 4 ? 0.25 : 1;
  $('#next').style.pointerEvents = track.scrollLeft >= maks - 4 ? 'none' : '';
}

$('#prev').onclick = () => track.scrollBy({ left: -340, behavior: 'smooth' });
$('#next').onclick = () => track.scrollBy({ left: 340, behavior: 'smooth' });
track.addEventListener('scroll', updArrows, { passive: true });
addEventListener('resize', updArrows);
updArrows();

// Geser dengan mouse (di layar sentuh sudah native)
let sedangDrag = false, dragX = 0, dragScroll = 0;

track.addEventListener('pointerdown', (e) => {
  if (e.pointerType !== 'mouse') return;
  sedangDrag = true;
  dragX = e.clientX;
  dragScroll = track.scrollLeft;
  track.style.cursor = 'grabbing';
  track.classList.add('drag');
});
addEventListener('pointermove', (e) => {
  if (sedangDrag) track.scrollLeft = dragScroll - (e.clientX - dragX);
});
addEventListener('pointerup', () => {
  sedangDrag = false;
  track.style.cursor = 'grab';
  track.classList.remove('drag');
});
/* ---------- 13. MODAL DETAIL KERIS (#dm) ---------- */

const dm = $('#dm');

// Pembuat judul section kecil di dalam modal
const sec = (judul, isi) => `
  <section>
    <p class="text-gold text-[11px] tracking-[.25em] font-semibold flex items-center gap-3 mb-3">
      <span class="inline-block w-6 h-px bg-gold/60"></span>${judul}
    </p>
    <div class="space-y-2.5">${isi}</div>
  </section>`;

// Buka modal: isi gambar kiri + detail kanan
function openK(i) {
  const k = KERIS[i];

  // foto keris asli di panel kiri modal
  const img = $('#dmImg');
  img.src = k.foto;
  img.alt = `Foto keris ${k.n}`;

  $('#dmBody').innerHTML = `
    <p class="text-gold text-[10px] tracking-[.3em] font-semibold">${k.badge.toUpperCase()}</p>
    <h3 class="font-serif text-3xl mt-1">${k.n}</h3>
    <p class="text-xs text-stone-400 mt-1">${k.dh}</p>

    <div class="flex flex-wrap gap-2 text-[11px] mt-4">
      <span class="rounded-full border border-gold/40 text-gold px-3 py-1">${k.pamorN}</span>
      <span class="rounded-full border border-stone-700 text-stone-400 px-3 py-1">${k.lukLabel}</span>
    </div>

    <div class="space-y-6 mt-6">
      ${sec('PAMOR', `
        <p class="text-sm text-stone-300 leading-relaxed">${k.pamorD}</p>
        <p class="rounded-2xl border border-gold/25 bg-gold/5 p-4 text-sm text-stone-300 leading-relaxed">
          <b class="text-gold">Filosofi · </b>${k.pamorM}
        </p>`)}

      ${sec('ANATOMI SOR-SORAN', k.struktur.map(([nama, isi]) => `
        <div class="rounded-2xl border border-stone-800 bg-black/30 p-4">
          <p class="text-gold-soft font-semibold text-sm">${nama}</p>
          <p class="text-sm text-stone-300 mt-1 leading-relaxed">${isi}</p>
        </div>`).join(''))}

      ${sec('ASOSIASI', `<p class="text-sm text-stone-300 leading-relaxed">${k.asosiasi}</p>`)}

      ${sec('ESENSI & FILOSOFI', k.esensi.map((e) => `
        <p class="text-sm text-stone-300 leading-relaxed">${e}</p>`).join(''))}
    </div>`;

  // tampilkan modal + kunci gulir halaman
  document.body.style.overflow = 'hidden';
  dm.classList.add('open');
  $('#dmBody').scrollTop = 0;
  tandaiProgres('galeri');
}

// Tutup modal + kembalikan gulir halaman
function closeK() {
  dm.classList.remove('open');
  silence();
  setTimeout(() => { document.body.style.overflow = ''; }, 350);
}

$('#dmX').onclick = closeK;
$('#dmBg').onclick = closeK;    // klik area blur di luar kartu

// Tombol Esc juga menutup modal
addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && dm.classList.contains('open')) closeK();
});

// Tombol mata pada kartu membuka modal
track.addEventListener('click', (e) => {
  const tombol = e.target.closest('.eye');
  if (tombol) openK(+tombol.dataset.i);
});


/* ---------- 14. KUIS → pindah ke halaman khusus quiz.html ----------
   Tombol #btn-kuis kini berupa <a href="quiz.html"> di index.html;
   logika permainannya ada di quiz.js. */


/* ---------- 15. ANIMASI MUNCUL SAAT SCROLL ---------- */
// Elemen ber-class .rv muncul (diberi .in) pertama kali terlihat

const pengamat = new IntersectionObserver(
  (entries) => entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add('in');
    pengamat.unobserve(entry.target);   // cukup sekali saja
  }),
  { threshold: 0.15 }
);

$$('.rv').forEach((el) => pengamat.observe(el));