// ===== Latihan 1 — Mengubah teks dengan DOM =====
const judul = document.getElementById("judul");
const pesan = document.getElementById("pesan");
judul.textContent = "Belajar JavaScript DOM";
pesan.textContent = "Konten berhasil diubah oleh JavaScript.";

// ===== Latihan 2 — Event click =====
const tombol = document.getElementById("tombolAksi");
tombol.addEventListener("click", function () {
  pesan.textContent = "Tombol diklik pada " + new Date().toLocaleTimeString();
});

// ===== Latihan 3 — Mengubah kelas dan gaya CSS =====
const tombolGaya = document.getElementById("tombolGaya");
const teksGaya = document.getElementById("teksGaya");
tombolGaya.addEventListener("click", function () {
  teksGaya.classList.toggle("highlight");
  teksGaya.classList.toggle("teks-besar");
});

// ===== Eksperimen 4 — Sembunyikan / tampilkan paragraf dengan class CSS =====
const tombolSembunyi = document.getElementById("tombolSembunyi");
const paragrafSembunyi = document.getElementById("paragrafSembunyi");
tombolSembunyi.addEventListener("click", function () {
  const tersembunyi = paragrafSembunyi.classList.toggle("tersembunyi");
  tombolSembunyi.textContent = tersembunyi ? "Tampilkan paragraf" : "Sembunyikan paragraf";
});

// ===== Latihan 4 — Event input dan penghitung karakter =====
const namaInput = document.getElementById("namaInput");
const jumlahKarakter = document.getElementById("jumlahKarakter");
namaInput.addEventListener("input", function () {
  jumlahKarakter.textContent = namaInput.value.length;
});

// ===== Latihan 5 — Validasi form pendaftaran =====
const form = document.getElementById("formPendaftaran");
const pesanForm = document.getElementById("pesanForm");

function tampilPesanForm(teks, jenis) {
  pesanForm.textContent = teks;
  pesanForm.className = jenis;
}

form.addEventListener("submit", function (event) {
  event.preventDefault();
  const nama = document.getElementById("nama").value.trim();
  const email = document.getElementById("email").value.trim();
  const usiaInput = document.getElementById("usia").value;
  const usia = Number(usiaInput);
  const polaEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (nama === "") {
    tampilPesanForm("Nama wajib diisi.", "error");
  } else if (nama.length < 3) { // Eksperimen 2: nama minimal 3 karakter
    tampilPesanForm("Nama minimal terdiri dari 3 karakter.", "error");
  } else if (!polaEmail.test(email)) {
    tampilPesanForm("Masukkan email yang valid.", "error");
  } else if (usiaInput === "" || !Number.isInteger(usia) || usia < 17 || usia > 100) {
    tampilPesanForm("Usia harus berupa bilangan bulat 17–100.", "error");
  } else {
    tampilPesanForm("Validasi berhasil. Form siap diproses.", "sukses");
    form.reset();
  }
});

// ===== Latihan 6 — Daftar tugas (To-do List) + Eksperimen 1 (hapus item) =====
const inputTugas = document.getElementById("inputTugas");
const tambahTugas = document.getElementById("tambahTugas");
const daftarTugas = document.getElementById("daftarTugas");
const pesanTugas = document.getElementById("pesanTugas");

tambahTugas.addEventListener("click", function () {
  const teks = inputTugas.value.trim();
  if (teks === "") {
    pesanTugas.textContent = "Tulis tugas terlebih dahulu.";
    pesanTugas.className = "error";
    return;
  }

  const item = document.createElement("li");
  const label = document.createElement("span");
  const selesai = document.createElement("button");
  const hapus = document.createElement("button");

  label.textContent = teks + " "; // textContent: input pengguna tampil sebagai teks, bukan markup
  selesai.type = "button";
  selesai.textContent = "Tandai selesai";
  selesai.addEventListener("click", function () {
    item.classList.toggle("selesai");
    selesai.textContent = item.classList.contains("selesai")
      ? "Batalkan selesai" : "Tandai selesai";
  });

  hapus.type = "button";
  hapus.className = "hapus";
  hapus.textContent = "Hapus";
  hapus.addEventListener("click", function () {
    item.remove();
    pesanTugas.textContent = "Tugas dihapus.";
    pesanTugas.className = "sukses";
  });

  item.append(label, selesai, hapus);
  daftarTugas.appendChild(item);
  inputTugas.value = "";
  pesanTugas.textContent = "Tugas ditambahkan.";
  pesanTugas.className = "sukses";
  inputTugas.focus();
});
