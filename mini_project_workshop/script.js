const form = document.getElementById("formWorkshop");
const namaEl = document.getElementById("nama");
const emailEl = document.getElementById("email");
const sesiEl = document.getElementById("sesi");
const harapanEl = document.getElementById("harapan");
const hitungHarapan = document.getElementById("hitungHarapan");
const infoSesi = document.getElementById("infoSesi");
const pesanSukses = document.getElementById("pesanSukses");
const tombolReset = document.getElementById("tombolReset");

const ringkasan = {
  nama: [document.getElementById("rNama"), "Belum diisi"],
  email: [document.getElementById("rEmail"), "Belum diisi"],
  sesi: [document.getElementById("rSesi"), "Belum dipilih"],
  harapan: [document.getElementById("rHarapan"), "Belum diisi"]
};
const polaEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// --- Fungsi 1: ringkasan input secara langsung ---
function perbaruiRingkasan(kunci, nilai) {
  const [el, kosong] = ringkasan[kunci];
  el.textContent = nilai !== "" ? nilai : kosong;
  el.classList.toggle("kosong", nilai === "");
}

// --- Fungsi 2: tampil / hapus pesan kesalahan per field ---
function setError(inputEl, idError, teks) {
  document.getElementById(idError).textContent = teks;
  inputEl.closest(".field").classList.toggle("salah", teks !== "");
  inputEl.setAttribute("aria-invalid", teks !== "" ? "true" : "false");
}

// --- Fungsi 3: validasi tiap field ---
function validasiNama() {
  const v = namaEl.value.trim();
  if (v === "") { setError(namaEl, "errNama", "Nama wajib diisi."); return false; }
  if (v.length < 3) { setError(namaEl, "errNama", "Nama minimal 3 karakter."); return false; }
  setError(namaEl, "errNama", ""); return true;
}
function validasiEmail() {
  const v = emailEl.value.trim();
  if (v === "") { setError(emailEl, "errEmail", "Email wajib diisi."); return false; }
  if (!polaEmail.test(v)) { setError(emailEl, "errEmail", "Format email belum valid, contoh: nama@domain.com."); return false; }
  setError(emailEl, "errEmail", ""); return true;
}
function validasiSesi() {
  if (sesiEl.value === "") { setError(sesiEl, "errSesi", "Pilih salah satu sesi."); return false; }
  setError(sesiEl, "errSesi", ""); return true;
}

// --- Event input: ringkasan langsung + hapus pesan sukses lama ---
namaEl.addEventListener("input", function () {
  perbaruiRingkasan("nama", namaEl.value.trim());
  pesanSukses.textContent = "";
});
emailEl.addEventListener("input", function () {
  perbaruiRingkasan("email", emailEl.value.trim());
  pesanSukses.textContent = "";
});
harapanEl.addEventListener("input", function () {
  hitungHarapan.textContent = harapanEl.value.length;
  perbaruiRingkasan("harapan", harapanEl.value.trim());
});

// --- Event blur: validasi saat meninggalkan field ---
namaEl.addEventListener("blur", validasiNama);
emailEl.addEventListener("blur", validasiEmail);

// --- Event change: dropdown sesi (Eksperimen 3) ---
sesiEl.addEventListener("change", function () {
  perbaruiRingkasan("sesi", sesiEl.value);
  infoSesi.textContent = sesiEl.value ? "Sesi dipilih: " + sesiEl.value : "";
  pesanSukses.textContent = "";
  validasiSesi();
});

// --- Event submit ---
form.addEventListener("submit", function (event) {
  event.preventDefault();
  const hasil = [validasiNama(), validasiEmail(), validasiSesi()];
  if (hasil.includes(false)) {
    pesanSukses.textContent = "";
    // fokus ke field pertama yang salah
    const pertama = form.querySelector(".field.salah input, .field.salah select");
    if (pertama) pertama.focus();
    return;
  }
  pesanSukses.textContent = "Pendaftaran berhasil! Terima kasih, " + namaEl.value.trim() +
    ". Konfirmasi dikirim ke " + emailEl.value.trim() + " (simulasi).";
  resetForm(false);
});

// --- Event click: tombol hapus isian ---
function resetForm(hapusPesan) {
  form.reset();
  [["nama", "errNama", namaEl], ["email", "errEmail", emailEl], ["sesi", "errSesi", sesiEl]]
    .forEach(function (x) { setError(x[2], x[1], ""); });
  hitungHarapan.textContent = "0";
  infoSesi.textContent = "";
  ["nama", "email", "sesi", "harapan"].forEach(function (k) { perbaruiRingkasan(k, ""); });
  if (hapusPesan) pesanSukses.textContent = "";
}
tombolReset.addEventListener("click", function () { resetForm(true); namaEl.focus(); });
