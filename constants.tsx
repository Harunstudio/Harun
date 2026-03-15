
import { SelectionItem } from './types';

// Detailed descriptions and names for more professional look
const MALE_HAND_DESCS = [
  { label: "Eksekutif Sibuk", desc: "Memperbaiki jam tangan untuk kesan eksekutif yang sibuk" },
  { label: "Kasual Modern", desc: "Tangan di saku depan dengan ibu jari menonjol untuk gaya kasual" },
  { label: "Tatapan Tajam", desc: "Menyesuaikan kerah jas atau kemeja dengan tatapan tajam ke kamera" },
  { label: "Intelektual", desc: "Tangan menyentuh dagu dalam posisi berpikir yang intelektual" },
  { label: "Candid Formal", desc: "Mengancingkan lengan kemeja (cufflink) dengan pose candid" },
  { label: "Rileks Maskulin", desc: "Tangan di saku belakang dengan bahu sedikit miring" },
  { label: "Minimalis Estetik", desc: "Memegang kacamata atau aksesoris wajah dengan minimalis" },
  { label: "Alpha Grooming", desc: "Gaya merapikan rambut (grooming) yang maskulin dan percaya diri" },
  { label: "Power Cross", desc: "Lengan disilangkan di dada dengan postur tubuh yang tegap" },
  { label: "The Jacket Swing", desc: "Satu tangan memegang jaket yang disampirkan di bahu" }
];

const MALE_HYBRID_DESCS = [
  { label: "Urban Wall Lean", desc: "Bersandar di dinding dengan satu kaki ditekuk (pose urban)" },
  { label: "Street Step", desc: "Duduk di tangga dengan kaki terbuka lebar dan tangan di lutut" },
  { label: "The Traveler", desc: "Pose berjalan santai dengan tangan di saku celana" },
  { label: "Relaxed Boss", desc: "Duduk di kursi dengan satu pergelangan kaki di atas lutut" },
  { label: "Lean Cross", desc: "Berdiri tegak dengan kaki menyilang tipis untuk kesan santai" },
  { label: "Bag Carry", desc: "Pose melangkah maju dengan tangan memegang tali tas" },
  { label: "Ground Support", desc: "Duduk di lantai dengan satu tangan menopang tubuh ke belakang" },
  { label: "Post Lean", desc: "Berdiri dengan punggung bersandar pada tiang, satu kaki terangkat" },
  { label: "Street Squat", desc: "Pose jongkok satu kaki (squat) untuk gaya streetwear yang edgy" },
  { label: "High Surface Sit", desc: "Pose duduk bersila di permukaan tinggi dengan pandangan ke samping" }
];

const MALE_BODY_DESCS = [
  { label: "Power Stand", desc: "Postur 'Power Stand' dengan kaki selebar bahu dan tangan di pinggang" },
  { label: "Over Shoulder", desc: "Pose berjalan menjauhi kamera sambil menoleh sedikit (over the shoulder)" },
  { label: "Dynamic Forward", desc: "Full body shot dengan tubuh condong ke depan untuk kesan dinamis" },
  { label: "Light Chaser", desc: "Berdiri menghadap cahaya dengan postur tubuh yang sangat tegap" },
  { label: "The CEO Master", desc: "Pose 'The CEO' - berdiri formal dengan tangan saling menggenggam" },
  { label: "Sporty Motion", desc: "Gerakan melompat dinamis untuk kesan energik dan sporty" },
  { label: "Vehicle Lean", desc: "Pose santai bersandar pada mobil atau properti besar" },
  { label: "Jawline Angle", desc: "Berdiri miring 45 derajat untuk menonjolkan garis rahang dan bahu" },
  { label: "Runway Walk", desc: "Gaya berjalan model di atas runway dengan langkah yang tegas" },
  { label: "The Rebel", desc: "Pose 'The Rebel' - berdiri dengan tangan di saku jaket kulit" }
];

const MALE_CANDID_DESCS = [
  { label: "Distant Gaze", desc: "Tatapan ke arah jauh seolah sedang memperhatikan sesuatu" },
  { label: "Look Down Candid", desc: "Tersenyum tipis sambil melihat ke bawah" },
  { label: "Joyful Walk", desc: "Berjalan sambil tertawa lepas tanpa melihat ke arah kamera" },
  { label: "Productive Day", desc: "Pose sedang membaca buku atau menggunakan ponsel secara natural" },
  { label: "Surprise Look", desc: "Menoleh secara mendadak ke arah kamera" },
  { label: "Coffee Break", desc: "Pose sedang minum kopi atau memegang gelas dengan santai" },
  { label: "Suit Adjust", desc: "Memperbaiki dasi atau kancing baju tanpa ekspresi dibuat-buat" },
  { label: "Sun Enjoyer", desc: "Menutup mata seolah menikmati sinar matahari atau hembusan angin" },
  { label: "Cafe Dreamer", desc: "Pose duduk di kafe dengan tatapan melamun ke luar jendela" },
  { label: "City Motion", desc: "Berjalan di keramaian dengan fokus kamera yang dramatis" }
];

const FEMALE_HAND_DESCS = [
  { label: "Elegant Touch", desc: "Sentuhan jari lembut pada dagu untuk potret kecantikan yang elegan" },
  { label: "Hair Tucking", desc: "Menyelipkan helai rambut ke belakang telinga dengan senyum tipis" },
  { label: "Handbag Front", desc: "Kedua tangan memegang tas tangan (handbag) di depan perut" },
  { label: "The Diva Stand", desc: "Gaya 'The Diva' - satu tangan di pinggang dan lainnya menyentuh leher" },
  { label: "Face Framing", desc: "Tangan membentuk frame di area wajah untuk fokus mata yang tajam" },
  { label: "Bloom Holder", desc: "Pose memegang cangkir atau bunga dengan jari-jari yang lentur" },
  { label: "Sun-Glass Chic", desc: "Menyentuh kacamata hitam dengan gaya high-fashion yang misterius" },
  { label: "Cheek Rest", desc: "Pose menopang pipi saat duduk untuk kesan manis dan imut" },
  { label: "Jewelry Fondle", desc: "Jemari membelai lembut kalung atau aksesoris perhiasan" },
  { label: "Dreamy Palms", desc: "Kedua telapak tangan saling menempel di bawah dagu (dreamy look)" }
];

const FEMALE_HYBRID_DESCS = [
  { label: "Lady Cross Sit", desc: "Duduk di kursi dengan kaki menyilang rapat (lady-like pose)" },
  { label: "Model Cross", desc: "Berdiri dengan satu kaki di depan kaki lainnya (the model cross)" },
  { label: "Balcony Lean", desc: "Pose bersandar di balkon dengan kaki menjuntai cantik" },
  { label: "Mermaid Sit", desc: "Duduk di lantai dengan kaki ditekuk menyamping (mermaid sit)" },
  { label: "Gown Walk", desc: "Berjalan anggun dengan satu tangan memegang ujung gaun" },
  { label: "Dynamic Twirl", desc: "Pose berputar (twirl) yang membuat rok atau rambut bergerak dinamis" },
  { label: "Heel Raise", desc: "Berdiri miring dengan satu tumit terangkat untuk kesan kaki jenjang" },
  { label: "Stair Pose", desc: "Duduk di tangga dengan tangan menopang dagu di atas lutut" },
  { label: "Shoulder Glance", desc: "Pose melangkah kecil dengan kepala menoleh ke arah bahu" },
  { label: "Curve Sit", desc: "Duduk santai di sofa dengan posisi tubuh sedikit melengkung" }
];

const FEMALE_BODY_DESCS = [
  { label: "Goddess Stand", desc: "Postur 'The Goddess' - berdiri tegak dengan gaun yang menjuntai" },
  { label: "S-Curve Master", desc: "Pose 'S-Curve' untuk menonjolkan siluet tubuh yang proporsional" },
  { label: "Backwards Turn", desc: "Berdiri membelakangi kamera sambil menoleh dengan ekspresi tajam" },
  { label: "Catwalk Ready", desc: "Kaki melangkah lebar dengan ayunan tangan" },
  { label: "Wall Anchor", desc: "Full body shot bersandar di dinding dengan postur yang rileks" },
  { label: "High Platform Sit", desc: "Pose duduk di permukaan tinggi dengan satu kaki menjuntai ke bawah" },
  { label: "Fabric Dance", desc: "Gerakan menari lembut untuk menangkap estetika kain pakaian" },
  { label: "Frame Center", desc: "Berdiri di tengah bingkai dengan tangan terangkat sedikit ke samping" },
  { label: "Vogue Cover", desc: "Pose 'Vogue Cover' - postur asimetris dengan ekspresi wajah fierce" },
  { label: "Editorial Kneel", desc: "Berlutut dengan satu kaki (kneeling pose) untuk gaya editorial" }
];

const FEMALE_CANDID_DESCS = [
  { label: "Candid Joy", desc: "Tertawa lepas sambil menoleh menjauhi kamera (candid joy)" },
  { label: "Street Sip", desc: "Pose sedang menikmati minuman dengan tatapan ke arah jalanan" },
  { label: "Park Wanderer", desc: "Berjalan santai di taman sambil memegang payung atau bunga" },
  { label: "Sunset Silhouette", desc: "Melihat ke arah matahari terbenam dengan siluet wajah yang lembut" },
  { label: "Shy Smile", desc: "Tersenyum malu sambil menundukkan kepala ke arah bahu" },
  { label: "Mirror Adjust", desc: "Pose sedang merapikan riasan wajah menggunakan cermin kecil" },
  { label: "Call Back", desc: "Berjalan sambil menoleh ke belakang seolah dipanggil seseorang" },
  { label: "Magazine Focus", desc: "Duduk di bangku taman sambil membaca majalah dengan fokus" },
  { label: "Sweet Surprise", desc: "Ekspresi terkejut yang manis saat melihat sesuatu yang indah" },
  { label: "Fresh Air Breath", desc: "Menutup mata sambil menghirup udara segar dengan tangan terbuka" }
];

const generatePoses = (): SelectionItem[] => {
  const poses: SelectionItem[] = [];
  
  const config = [
    { gender: 'Male', sub: 'Pose Tangan', prefix: 'M-Hand', icon: 'fa-hand', data: MALE_HAND_DESCS },
    { gender: 'Male', sub: 'Kombinasi Tangan & Kaki', prefix: 'M-Hybrid', icon: 'fa-person', data: MALE_HYBRID_DESCS },
    { gender: 'Male', sub: 'Gestur Tubuh', prefix: 'M-Body', icon: 'fa-user-tie', data: MALE_BODY_DESCS },
    { gender: 'Male', sub: 'Candid Netral', prefix: 'M-Candid', icon: 'fa-camera-retro', data: MALE_CANDID_DESCS },
    { gender: 'Female', sub: 'Pose Tangan', prefix: 'F-Hand', icon: 'fa-hand-sparkles', data: FEMALE_HAND_DESCS },
    { gender: 'Female', sub: 'Kombinasi Tangan & Kaki', prefix: 'F-Hybrid', icon: 'fa-person-dress', data: FEMALE_HYBRID_DESCS },
    { gender: 'Female', sub: 'Gestur Tubuh', prefix: 'F-Body', icon: 'fa-wand-magic-sparkles', data: FEMALE_BODY_DESCS },
    { gender: 'Female', sub: 'Candid Netral Cetil', prefix: 'F-Cetil', icon: 'fa-face-grin-wink', data: FEMALE_CANDID_DESCS },
  ];

  config.forEach((cat, catIdx) => {
    // Generate 25 variations per category
    for (let i = 1; i <= 25; i++) {
      const dataIndex = (i - 1) % cat.data.length;
      const item = cat.data[dataIndex];
      poses.push({
        id: `pose-${catIdx}-${i}`,
        category: `${cat.gender}: ${cat.sub}`,
        label: `${item.label} #${i}`,
        description: item.desc,
        icon: cat.icon
      });
    }
  });

  return poses;
};

export const POSES: SelectionItem[] = generatePoses();

export const EXPRESSIONS: SelectionItem[] = [
  { id: 'default-exp', category: 'Original', label: 'Bawaan Foto', description: 'Gunakan ekspresi asli model', icon: 'fa-camera' },
  { id: 'e1', category: 'Standard', label: 'Senyum Hangat', description: 'Ramah dan mudah didekati' },
  { id: 'e2', category: 'Standard', label: 'Vogue Serius', description: 'Intens dan bernuansa high-fashion' },
  { id: 'e3', category: 'Emotional', label: 'Kegembiraan Murni', description: 'Tawa lebar dengan mata berbinar' },
  { id: 'e4', category: 'Emotional', label: 'Seringai Misterius', description: 'Halus dan membuat penasaran' },
  { id: 'e5', category: 'Dramatic', label: 'Pemimpin Percaya Diri', description: 'Tatapan bertekad dengan kekuatan' },
  { id: 'e6', category: 'Dramatic', label: 'Berpikir Mendalam', description: 'Introspektif dan penuh pemikiran' },
  { id: 'e7', category: 'Studio', label: 'Netral Tenang', description: 'Rileks dan profesional' },
  { id: 'e8', category: 'Studio', label: 'Tatapan Tajam', description: 'Fokus tajam ke arah lensa' },
  { id: 'e9', category: 'Emotional', label: 'Kedipan Nakal', description: 'Menyenangkan dan menarik' },
  { id: 'e10', category: 'Standard', label: 'Ketulusan Hati', description: 'Mata lembut dan tatapan ramah' },
  { id: 'e11', category: 'Dramatic', label: 'Fierce Model', description: 'Intensitas model elit' },
  { id: 'e12', category: 'Standard', label: 'Fokus Bisnis', description: 'Tajam dan dapat diandalkan' },
  { id: 'e13', category: 'Emotional', label: 'Melamun Estetik', description: 'Melihat jauh, fokus lembut' },
  { id: 'e14', category: 'Studio', label: 'Wajah Berani', description: 'Kuat dan tangguh' },
  { id: 'e15', category: 'Dramatic', label: 'Inspirasi Puisi', description: 'Inspirasional dan puitis' },
  { id: 'e16', category: 'Standard', label: 'Senyum Elegan', description: 'Dipoles dan sangat anggun' },
  { id: 'e17', category: 'Emotional', label: 'Tawa Lepas', description: 'Energi tinggi yang natural' },
  { id: 'e18', category: 'Studio', label: 'Berwibawa', description: 'Otoritatif dan berani' },
  { id: 'e19', category: 'Dramatic', label: 'Misteri Bayangan', description: 'Halus dan moody' },
  { id: 'e20', category: 'Standard', label: 'Karismatik', description: 'Mengundang dan penuh pesona' },
  { id: 'e21', category: 'Modern', label: 'Tatapan Menantang', description: 'Keberanian yang tenang' },
  { id: 'e22', category: 'Modern', label: 'Malu-malu', description: 'Senyum tipis yang manis' },
  { id: 'e23', category: 'Modern', label: 'Profesional Elite', description: 'Ketegasan seorang pemimpin' },
  { id: 'e24', category: 'Modern', label: 'Nostalgia', description: 'Tatapan rindu yang emosional' },
  { id: 'e25', category: 'Modern', label: 'Penuh Harapan', description: 'Mata yang bersinar menatap masa depan' },
  { id: 'e26', category: 'Elite', label: 'Damai Interior', description: 'Ketenangan jiwa yang terpancar' },
  { id: 'e27', category: 'Elite', label: 'Klasik Elegan', description: 'Gaya aristokrat yang abadi' },
  { id: 'e28', category: 'Elite', label: 'Modern Edge', description: 'Keberanian gaya kontemporer' },
  { id: 'e29', category: 'Elite', label: 'Dingin Memikat', description: 'Daya tarik yang dingin namun kuat' },
  { id: 'e30', category: 'Elite', label: 'Sinis Berkelas', description: 'Ekspresi penuh karakter' },
  { id: 'e31', category: 'Vibe', label: 'Terkejut Manis', description: 'Mata lebar penuh keajaiban' },
  { id: 'e32', category: 'Vibe', label: 'Dewasa Bijak', description: 'Ketengangan yang matang' },
  { id: 'e33', category: 'Vibe', label: 'Energik Muda', description: 'Semangat yang meledak-ledak' },
  { id: 'e34', category: 'Vibe', label: 'Ragu Halus', description: 'Ketidakpastian yang puitis' },
  { id: 'e35', category: 'Vibe', label: 'Puas Hati', description: 'Senyum kemenangan tipis' },
  { id: 'e36', category: 'Aura', label: 'Kekuatan Batin', description: 'Energi dari dalam yang terpancar' },
  { id: 'e37', category: 'Aura', label: 'Kelembutan Sutra', description: 'Ekspresi yang sangat halus' },
  { id: 'e38', category: 'Aura', label: 'Bintang Panggung', description: 'Daya tarik panggung utama' },
  { id: 'e39', category: 'Aura', label: 'Tatapan Elang', description: 'Ketajaman visual yang luar biasa' },
  { id: 'e40', category: 'Aura', label: 'Korporat Tajam', description: 'Profesionalisme tingkat tinggi' },
  { id: 'e41', category: 'Style', label: 'Melankolis Indah', description: 'Kesedihan yang estetik' },
  { id: 'e42', category: 'Style', label: 'Optimis Tinggi', description: 'Energi positif yang menular' },
  { id: 'e43', category: 'Style', label: 'Keheningan Malam', description: 'Tenang dan meditatif' },
  { id: 'e44', category: 'Style', label: 'Reflektif Diri', description: 'Melihat ke dalam diri' },
  { id: 'e45', category: 'Style', label: 'Glamour Red Carpet', description: 'Siap untuk karpet merah' },
  { id: 'e46', category: 'Final', label: 'Otentik Murni', description: 'Kejujuran ekspresi tanpa filter' },
  { id: 'e47', category: 'Final', label: 'Zen Master', description: 'Keseimbangan emosi yang sempurna' },
  { id: 'e48', category: 'Final', label: 'Intelektual Muda', description: 'Kecerdasan yang terpancar' },
  { id: 'e49', category: 'Final', label: 'Inspirasi Pagi', description: 'Kesegaran ekspresi saat bangun' },
  { id: 'e50', category: 'Final', label: 'Aura Keabadian', description: 'Ekspresi yang tak lekang oleh waktu' },
];

export const ANGLES: SelectionItem[] = [
  { id: 'default-angle', category: 'Original', label: 'Bawaan Foto', description: 'Gunakan sudut kamera asli', icon: 'fa-video-slash' },
  { id: 'a1', category: 'Cinematic', label: 'Golden Ratio', description: 'Tampilan klasik 3/4' },
  { id: 'a2', category: 'Cinematic', label: 'Low Angle Power', description: 'Melihat ke atas ke subjek' },
  { id: 'a3', category: 'Cinematic', label: 'High Angle Art', description: 'Melihat ke bawah dari atas' },
  { id: 'a4', category: 'Studio', label: 'Direct Portrait', description: 'Mata sejajar dengan lensa' },
  { id: 'a5', category: 'Studio', label: 'Dutch Angle', description: 'Horizon miring untuk tensi' },
  { id: 'a6', category: 'Studio', label: 'Side Profile', description: 'Tampilan 90 derajat sempurna' },
  { id: 'a7', category: 'Cinematic', label: 'Worm Eye', description: 'Perspektif rendah ekstrem' },
  { id: 'a8', category: 'Cinematic', label: 'Bird Eye', description: 'Langsung dari atas kepala' },
  { id: 'a9', category: 'Studio', label: 'Full Body Wide', description: 'Konteks lingkungan luas' },
  { id: 'a10', category: 'Studio', label: 'Close Up Focus', description: 'Render detail wajah' },
  { id: 'a11', category: 'Cinematic', label: 'Noir Silhouette', description: 'Drama cahaya latar' },
  { id: 'a12', category: 'Studio', label: 'Shoulder Level', description: 'Tampilan percakapan natural' },
  { id: 'a13', category: 'Cinematic', label: 'Dynamic Action', description: 'Fokus pada garis gerak' },
  { id: 'a14', category: 'Studio', label: 'Extreme Close Up', description: 'Presisi detail mikro' },
  { id: 'a15', category: 'Cinematic', label: 'Over the Shoulder', description: 'Kedalaman perspektif' },
  { id: 'a16', category: 'Studio', label: 'Soft Profile', description: 'Kemiringan 45 derajat lembut' },
  { id: 'a17', category: 'Cinematic', label: 'Wide Landscape', description: 'Skala sinematik luas' },
  { id: 'a18', category: 'Studio', label: 'High Fashion Tilt', description: 'Keseimbangan asimetris' },
  { id: 'a19', category: 'Cinematic', label: 'Macro Beauty', description: 'Fokus tekstur dan cahaya' },
  { id: 'a20', category: 'Studio', label: 'Master Shot', description: 'Tampilan paling seimbang' },
];
