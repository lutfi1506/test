const generateRandomText = (length) => {
  const words = [
    "abadi",
    "adil",
    "alam",
    "aman",
    "angin",
    "api",
    "awan",
    "ayah",
    "bagus",
    "baik",
    "bangsa",
    "bangun",
    "batu",
    "bayi",
    "bekerja",
    "belajar",
    "benar",
    "berani",
    "berjalan",
    "bermain",
    "bersama",
    "besar",
    "bicara",
    "bintang",
    "biru",
    "buah",
    "buku",
    "bunga",
    "burung",
    "datang",
    "dengan",
    "desa",
    "dunia",
    "guru",
    "hidup",
    "hijau",
    "ibu",
    "ikan",
    "jalan",
    "kasih",
    "kecil",
    "kota",
    "kuat",
    "laut",
    "makan",
    "malam",
    "manusia",
    "mata",
    "matahari",
    "meja",
    "merah",
    "minum",
    "mobil",
    "nama",
    "negara",
    "orang",
    "pagi",
    "panas",
    "pergi",
    "rumah",
    "saat",
    "saja",
    "sama",
    "satu",
    "sayang",
    "sekolah",
    "senang",
    "sepeda",
    "siang",
    "sore",
    "suara",
    "sungai",
    "tanah",
    "tangan",
    "teman",
    "tenang",
    "tidur",
    "tua",
    "udara",
    "ular",
    "warna",
    "wajah",
  ];

  return [...Array(length)].map(
    () => words[Math.floor(Math.random() * words.length)]
  );
};

const input = document.getElementById("input");
const kata = document.getElementById("kata");
const total = document.getElementById("total");
const waktu = document.getElementById("waktu");

let detik = 60;
let timerId = null;

const startGame = () => {
  detik = 60;
  timerId = setInterval(() => {
    detik--;
    if (detik === 0) {
      clearInterval(timerId);
      waktu.innerText = "Selesai";
      kata.disabled = true;
    }
    waktu.innerText = detik;
  }, 1000);
};

const createInput = () => {
  input.innerHTML = "";
  const text = generateRandomText(100);
  text.forEach((word) => {
    const span = document.createElement("span");
    span.innerText = word + " ";
    input.appendChild(span);
  });
  return text;
};
const words = createInput();

let sizeTop = 0;
const checkAnswer = (answer) => {
  const top = input.children[answer.length - 1].getBoundingClientRect().top;
  if (top > 80) {
    sizeTop -= 36;
    input.style.top = `${sizeTop}px`;
  }
  const correct = answer[answer.length - 1] === words[answer.length - 1];
  if (correct) {
    input.children[answer.length - 1].classList.add("correct");
    total.innerText = Number(total.innerText) + 1;
  } else {
    input.children[answer.length - 1].classList.add("incorrect");
  }
};

const answer = [];
kata.addEventListener("keyup", (e) => {
  if (e.key === " " && detik > 0) {
    answer.push(kata.value.trim());
    checkAnswer(answer);
    kata.value = "";
  }
});

startGame();
