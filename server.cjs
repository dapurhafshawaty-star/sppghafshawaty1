var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// server.ts
var import_dotenv = __toESM(require("dotenv"), 1);
var import_express22 = __toESM(require("express"), 1);
var import_path2 = __toESM(require("path"), 1);
var import_fs2 = __toESM(require("fs"), 1);
var import_cors = __toESM(require("cors"), 1);

// db.js
var import_config = require("dotenv/config");
var import_supabase_js = require("@supabase/supabase-js");
var rawSupabaseUrl = (process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL || "https://eqncmbbcewrgbhzzfwiv.supabase.co").trim();
var supabaseUrl = rawSupabaseUrl && !rawSupabaseUrl.includes("placeholder") ? rawSupabaseUrl : "https://eqncmbbcewrgbhzzfwiv.supabase.co";
var rawSupabaseKey = (process.env.SUPABASE_API_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY || "").trim();
var isKeyValid = Boolean(
  rawSupabaseKey && !rawSupabaseKey.includes("placeholder") && !rawSupabaseKey.includes("your-")
);
var supabase = null;
if (!isKeyValid) {
  console.warn("Supabase API key belum dikonfigurasi");
} else {
  try {
    supabase = (0, import_supabase_js.createClient)(supabaseUrl, rawSupabaseKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
        detectSessionInUrl: false
      }
    });
  } catch (err) {
    console.warn("Connection error:", err?.message || String(err));
    supabase = null;
  }
}
async function testDbConnection() {
  if (!supabase) return null;
  try {
    const { data, error } = await supabase.from("users").select("*").limit(1);
    if (error) {
      console.warn("Connection error:", error.message || String(error));
    } else {
      console.log("Connected:", data);
    }
    return { data, error };
  } catch (err) {
    console.warn("Connection error:", err?.message || String(err));
    return { data: null, error: err };
  }
}
if (supabase) {
  void testDbConnection();
}

// server/routes/auth.ts
var import_express = require("express");
var import_jsonwebtoken = __toESM(require("jsonwebtoken"), 1);

// src/types/documentTemplate.ts
var DEFAULT_MASTER_TEMPLATE_CONFIG = {
  version: "1.0.0",
  updatedAt: "2026-09-13T08:00:00.000Z",
  updatedBy: "Admin Penuh (Dr. H. Ahmad Pratama, M.Kom)",
  profile: {
    namaInstansi: "BADAN GIZI NASIONAL (NATIONAL NUTRITION AGENCY)",
    namaSppg: "SPPG PROBOLINGGO KREJENGAN TEMENGGUNGAN",
    namaYayasan: "YAYASAN HAFSHAWATY ZAINUL HASAN",
    alamat: "Dusun Krajan",
    rtRw: "003/004",
    desa: "Temenggungan",
    kecamatan: "Krejengan",
    kabupaten: "Kab. Probolinggo",
    provinsi: "Jawa Timur",
    kodePos: "67284",
    nomorTelepon: "0812-3456-7890",
    email: "sppg.krejengan@bgn.go.id",
    website: "https://sppg.bgn.go.id",
    penanggungJawabNama: "Dr. H. Ahmad Pratama, M.Kom",
    penanggungJawabJabatan: "Kepala SPPG Probolinggo Krejengan",
    penanggungJawabNip: "19820514 200801 1 003"
  },
  letterhead: {
    logoUrl: "/badan-gizi-nasional-seeklogo.png",
    logoSize: 68,
    logoPosition: "left",
    showLogo: true,
    namaInstansi: "BADAN GIZI NASIONAL (NATIONAL NUTRITION AGENCY)",
    namaSppg: "SPPG PROBOLINGGO KREJENGAN TEMENGGUNGAN",
    namaYayasan: "YAYASAN HAFSHAWATY ZAINUL HASAN",
    alamatLengkap: "Dusun Krajan RT/RW 003/004, Desa Temenggungan, Kec. Krejengan, Kab. Probolinggo",
    showContactInfo: false,
    fontFamily: "inherit",
    instansiFontSize: 15,
    sppgFontSize: 13,
    yayasanFontSize: 12,
    alamatFontSize: 10,
    isBoldInstansi: true,
    isBoldSppg: true,
    isBoldYayasan: true,
    isItalicAlamat: true,
    textAlign: "center",
    lineSpacing: "tight",
    gapLogoWithText: 16,
    borderThickness: 3,
    borderStyle: "double",
    borderColor: "#0f172a",
    kopMarginBottom: 16,
    repeatOnEveryPage: false
  },
  format: {
    paperSize: "A4",
    orientation: "portrait",
    marginTop: 18,
    marginBottom: 18,
    marginLeft: 18,
    marginRight: 18,
    defaultFontFamily: "sans-serif",
    defaultFontSize: 10,
    fontColor: "#0f172a",
    lineHeight: 1.4,
    paragraphSpacing: 8,
    tableFontSize: 9,
    tableBorderWidth: 1,
    tableBorderColor: "#334155",
    tableHeaderBg: "#f1f5f9",
    tableCellPadding: 6
  },
  footer: {
    showFooter: true,
    showPageNumber: true,
    pageNumberFormat: "Halaman {page} dari {total}",
    showPrintDate: true,
    printDateFormat: "DD MMMM YYYY, HH:mm",
    customDocumentNote: "Dokumen Resmi SPPG Krejengan Temenggungan \u2022 Badan Gizi Nasional RI",
    isConfidential: false,
    confidentialText: "DOKUMEN RESMI INTERNAL - BGN RI",
    footerAlignment: "between"
  },
  numbering: {
    prefix: "SPPG-TMG",
    counterLength: 3,
    currentCounters: {
      "STOK": 14,
      "BM": 8,
      "BK": 6,
      "OPN": 4,
      "BBM": 19,
      "DIV": 22,
      "MENU": 15,
      "PO": 38,
      "RAB": 11,
      "PM": 9,
      "BA": 5,
      "TUGAS": 12,
      "UMUM": 7
    },
    monthFormat: "roman",
    yearFormat: "YYYY",
    separator: "/",
    formatPattern: "{counter}/{prefix}/{code}/{month}/{year}",
    resetInterval: "year",
    lastResetDate: "2026-01-01"
  },
  signatures: [
    {
      id: "SIG-001",
      nama: "Dr. H. Ahmad Pratama, M.Kom",
      jabatan: "Kepala SPPG Probolinggo Krejengan",
      nip: "19820514 200801 1 003",
      keterangan: "Mengetahui / Menyetujui",
      signatureImageUrl: "",
      stampImageUrl: "",
      isActive: true,
      isDefault: true,
      order: 1
    },
    {
      id: "SIG-002",
      nama: "Siti Rahmawati, S.Gz",
      jabatan: "Tenaga Ahli Gizi SPPG",
      nip: "19900315 201402 2 004",
      keterangan: "Penyusun Menu & Ahli Gizi",
      signatureImageUrl: "",
      stampImageUrl: "",
      isActive: true,
      isDefault: true,
      order: 2
    },
    {
      id: "SIG-003",
      nama: "Budi Santoso, S.E.",
      jabatan: "Petugas Logistik & Pengadaan (PLOG)",
      nip: "19870820 201101 1 002",
      keterangan: "Verifikator Logistik & Pengadaan",
      signatureImageUrl: "",
      stampImageUrl: "",
      isActive: true,
      isDefault: true,
      order: 3
    },
    {
      id: "SIG-004",
      nama: "Rudi Hermawan",
      jabatan: "Koordinator Distribusi & Armada",
      nip: "19920110 201503 1 005",
      keterangan: "Pemeriksa Distribusi & BBM",
      signatureImageUrl: "",
      stampImageUrl: "",
      isActive: true,
      isDefault: false,
      order: 4
    }
  ],
  documentTypes: [
    {
      id: "stock-laporan",
      code: "STOK",
      name: "Laporan Stok & Mutasi Gudang",
      category: "Logistik & Stok",
      enableLetterhead: true,
      enableFooter: true,
      enableAutoNumber: true,
      paperSize: "A4",
      orientation: "portrait",
      selectedSignatureIds: ["SIG-003", "SIG-001"],
      signatureLayout: "2-kolom",
      customTitle: "LAPORAN STOCK OPNAME & MUTASI BAHAN BAKU",
      customSubTitle: "Satuan Pelayanan Program Gizi (SPPG) Krejengan Temenggungan"
    },
    {
      id: "barang-masuk",
      code: "BM",
      name: "Laporan Barang Masuk & Verifikasi Penerimaan",
      category: "Logistik & Stok",
      enableLetterhead: true,
      enableFooter: true,
      enableAutoNumber: true,
      paperSize: "A4",
      orientation: "portrait",
      selectedSignatureIds: ["SIG-003", "SIG-001"],
      signatureLayout: "2-kolom",
      customTitle: "LAPORAN PENERIMAAN & LOGISTIK BARANG MASUK",
      customSubTitle: "Verifikasi Penerimaan Bahan Pangan & Logistik Dapur SPPG"
    },
    {
      id: "barang-keluar",
      code: "BK",
      name: "Laporan Barang Keluar (Pemakaian Dapur)",
      category: "Logistik & Stok",
      enableLetterhead: true,
      enableFooter: true,
      enableAutoNumber: true,
      paperSize: "A4",
      orientation: "portrait",
      selectedSignatureIds: ["SIG-003", "SIG-002"],
      signatureLayout: "2-kolom",
      customTitle: "BUKTI PENGELUARAN BARANG & BAHAN BAKU DAPUR",
      customSubTitle: "Dokumen Mutasi Stok Logistik Dapur SPPG"
    },
    {
      id: "stock-opname",
      code: "OPN",
      name: "Berita Acara Stock Opname Bulanan",
      category: "Logistik & Stok",
      enableLetterhead: true,
      enableFooter: true,
      enableAutoNumber: true,
      paperSize: "A4",
      orientation: "portrait",
      selectedSignatureIds: ["SIG-003", "SIG-001"],
      signatureLayout: "2-kolom",
      customTitle: "BERITA ACARA AUDIT FISIK STOCK OPNAME GUDANG",
      customSubTitle: "Pemeriksaan Persediaan Fisik vs Sistem Terpadu SPPG"
    },
    {
      id: "bbm-laporan",
      code: "BBM",
      name: "Laporan Konsumsi BBM & Armada Kendaraan",
      category: "Keuangan & BBM",
      enableLetterhead: true,
      enableFooter: true,
      enableAutoNumber: true,
      paperSize: "A4",
      orientation: "portrait",
      selectedSignatureIds: ["SIG-004", "SIG-001"],
      signatureLayout: "2-kolom",
      customTitle: "LAPORAN KONSUMSI BAHAN BAKAR MINYAK (BBM) KENDARAAN",
      customSubTitle: "Operasional Logistik & Armada Distribusi Makanan Bergizi"
    },
    {
      id: "tugas-divisi",
      code: "DIV",
      name: "Laporan Tugas Divisi Harian (Persiapan, Olah, Porsi, Cuci)",
      category: "Operasional & Menu",
      enableLetterhead: true,
      enableFooter: true,
      enableAutoNumber: true,
      paperSize: "A4",
      orientation: "portrait",
      selectedSignatureIds: ["SIG-002", "SIG-001"],
      signatureLayout: "2-kolom",
      customTitle: "LAPORAN TUGAS HARIAN DIVISI OPERASIONAL DAPUR",
      customSubTitle: "Sistem Manajemen Mutu, Kebersihan, dan Pengolahan Pangan"
    },
    {
      id: "laporan-menu",
      code: "MENU",
      name: "Laporan Perencanaan Menu & Ahli Gizi",
      category: "Operasional & Menu",
      enableLetterhead: true,
      enableFooter: true,
      enableAutoNumber: true,
      paperSize: "A4",
      orientation: "portrait",
      selectedSignatureIds: ["SIG-002", "SIG-001"],
      signatureLayout: "2-kolom",
      customTitle: "DOKUMEN SPESIFIKASI MENU & ANALISIS GIZI HARIAN",
      customSubTitle: "Standar Porsi dan Kebutuhan Makro Nutrisi BGN"
    },
    {
      id: "po-harian",
      code: "PO",
      name: "Purchase Order (PO) Pengadaan Bahan Pangan",
      category: "Pengadaan & PO",
      enableLetterhead: true,
      enableFooter: true,
      enableAutoNumber: true,
      paperSize: "A4",
      orientation: "portrait",
      selectedSignatureIds: ["SIG-003", "SIG-001"],
      signatureLayout: "2-kolom",
      customTitle: "SURAT PESANAN PEMBELIAN / PURCHASE ORDER (PO)",
      customSubTitle: "Pengadaan Bahan Baku Pangan Segar & Kering SPPG"
    },
    {
      id: "rab-laporan",
      code: "RAB",
      name: "Rencana Anggaran Biaya (RAB) Operasional",
      category: "Keuangan & BBM",
      enableLetterhead: true,
      enableFooter: true,
      enableAutoNumber: true,
      paperSize: "A4",
      orientation: "portrait",
      selectedSignatureIds: ["SIG-002", "SIG-003", "SIG-001"],
      signatureLayout: "3-kolom",
      customTitle: "DOKUMEN RENCANA ANGGARAN BELANJA (RAB) OPERASIONAL",
      customSubTitle: "Alokasi Pagu Anggaran Bahan Pangan & Operasional Dapur"
    },
    {
      id: "penerima-manfaat",
      code: "PM",
      name: "Laporan Rekapitulasi Penerima Manfaat",
      category: "Operasional & Menu",
      enableLetterhead: true,
      enableFooter: true,
      enableAutoNumber: true,
      paperSize: "A4",
      orientation: "portrait",
      selectedSignatureIds: ["SIG-004", "SIG-001"],
      signatureLayout: "2-kolom",
      customTitle: "REKAPITULASI PENYALURAN & PENERIMA MANFAAT",
      customSubTitle: "Distribusi Porsi Makanan Bergizi Sasaran Sekolah & Posyandu"
    },
    {
      id: "berita-acara",
      code: "BA",
      name: "Berita Acara Serah Terima (BAST)",
      category: "Surat & Administrasi",
      enableLetterhead: true,
      enableFooter: true,
      enableAutoNumber: true,
      paperSize: "A4",
      orientation: "portrait",
      selectedSignatureIds: ["SIG-003", "SIG-001"],
      signatureLayout: "2-kolom",
      customTitle: "BERITA ACARA SERAH TERIMA PEKERJAAN & BARANG",
      customSubTitle: "Dokumen Legalitas dan Pertanggungjawaban Resmi SPPG"
    },
    {
      id: "surat-tugas",
      code: "TUGAS",
      name: "Surat Tugas / Perjalanan Dinas Operasional",
      category: "Surat & Administrasi",
      enableLetterhead: true,
      enableFooter: true,
      enableAutoNumber: true,
      paperSize: "A4",
      orientation: "portrait",
      selectedSignatureIds: ["SIG-001"],
      signatureLayout: "1-kolom",
      customTitle: "SURAT PERINTAH TUGAS OPERASIONAL",
      customSubTitle: "Penugasan Resmi Personel SPPG Krejengan Temenggungan"
    },
    {
      id: "surat-pemberitahuan",
      code: "UMUM",
      name: "Surat Pemberitahuan / Permohonan Resmi",
      category: "Surat & Administrasi",
      enableLetterhead: true,
      enableFooter: true,
      enableAutoNumber: true,
      paperSize: "A4",
      orientation: "portrait",
      selectedSignatureIds: ["SIG-001"],
      signatureLayout: "1-kolom",
      customTitle: "SURAT PEMBERITAHUAN RESMI",
      customSubTitle: "Komunikasi Resmi Antar Instansi / Mitra SPPG"
    },
    {
      id: "laporan-distribusi",
      code: "DIST",
      name: "Laporan Pengiriman & Distribusi Makanan",
      category: "Operasional & Menu",
      enableLetterhead: true,
      enableFooter: true,
      enableAutoNumber: true,
      paperSize: "A4",
      orientation: "portrait",
      selectedSignatureIds: ["SIG-004", "SIG-001"],
      signatureLayout: "2-kolom",
      customTitle: "LAPORAN REKAPITULASI DISTRIBUSI & PENYERAHAN Makanan",
      customSubTitle: "Dokumen Verifikasi Pengiriman & Penjemputan Ompreng SPPG"
    }
  ]
};

// src/utils/divisiDistribusiHelper.ts
var isValidSignerName = (val) => {
  const clean = String(val || "").trim();
  return Boolean(clean && clean !== "-" && clean !== "\u2014");
};
function resolveDivisiDistribusiName(divisiList) {
  if (!Array.isArray(divisiList) || divisiList.length === 0) return null;
  const exactMatch = divisiList.find(
    (d) => String(d?.nama || "").trim().toLowerCase() === "divisi distribusi" && isValidSignerName(d?.kepalaDivisi)
  );
  if (exactMatch) return exactMatch.kepalaDivisi.trim();
  const containsDivisiDistribusi = divisiList.find(
    (d) => String(d?.nama || "").trim().toLowerCase().includes("divisi distribusi") && isValidSignerName(d?.kepalaDivisi)
  );
  if (containsDivisiDistribusi) return containsDivisiDistribusi.kepalaDivisi.trim();
  const containsDistribusi = divisiList.find(
    (d) => (String(d?.nama || "").trim().toLowerCase().includes("distribusi") || ["DIST", "DST"].includes(String(d?.kode || "").trim().toUpperCase())) && isValidSignerName(d?.kepalaDivisi)
  );
  if (containsDistribusi) return containsDistribusi.kepalaDivisi.trim();
  return null;
}
function resolvePengawasKeuanganName(divisiList, fallback = "Muhammad Fadil, S.Akun") {
  if (!Array.isArray(divisiList) || divisiList.length === 0) return fallback;
  const exactMatch = divisiList.find(
    (d) => String(d?.nama || "").trim().toLowerCase() === "pengawas keuangan" && isValidSignerName(d?.kepalaDivisi)
  );
  if (exactMatch) return exactMatch.kepalaDivisi.trim();
  const containsPengawasKeuangan = divisiList.find(
    (d) => (String(d?.nama || "").trim().toLowerCase().includes("pengawas keuangan") || ["PK", "KEU-PK", "PENGAWAS-KEUANGAN"].includes(String(d?.kode || "").trim().toUpperCase())) && isValidSignerName(d?.kepalaDivisi)
  );
  if (containsPengawasKeuangan) return containsPengawasKeuangan.kepalaDivisi.trim();
  const containsKeuangan = divisiList.find(
    (d) => String(d?.nama || "").trim().toLowerCase().includes("keuangan") && isValidSignerName(d?.kepalaDivisi) && d.kepalaDivisi.trim() !== "Drs. Bambang Hariyanto, M.Si"
  );
  if (containsKeuangan) return containsKeuangan.kepalaDivisi.trim();
  return fallback;
}
function resolveKepalaSppgName(divisiList, fallback = "Sri Rohayu, S.Pd") {
  if (!Array.isArray(divisiList) || divisiList.length === 0) return fallback;
  const exactMatch = divisiList.find((d) => {
    const namaLower = String(d?.nama || "").trim().toLowerCase();
    return (namaLower === "kepala sppg" || namaLower === "ka. sppg" || namaLower === "ka sppg") && isValidSignerName(d?.kepalaDivisi);
  });
  if (exactMatch) return exactMatch.kepalaDivisi.trim();
  const containsKepala = divisiList.find((d) => {
    const namaLower = String(d?.nama || "").trim().toLowerCase();
    const kodeUpper = String(d?.kode || "").trim().toUpperCase();
    return (namaLower.includes("kepala sppg") || namaLower.includes("ka. sppg") || namaLower.includes("ka sppg") || ["KA-SPPG", "KSPPG", "SPPG"].includes(kodeUpper)) && isValidSignerName(d?.kepalaDivisi);
  });
  if (containsKepala) return containsKepala.kepalaDivisi.trim();
  return fallback;
}

// src/utils/jamKerjaHelper.ts
var DIVISI_JAM_KERJA_RULES = [
  {
    key: "persiapan",
    label: "Divisi Persiapan",
    keywords: ["persiapan", "siap"],
    jamMasuk: "15:00",
    jamKeluar: "23:00",
    jamKeluarSetengahHari: "19:00"
  },
  {
    key: "pengolahan",
    label: "Divisi Pengolahan",
    keywords: ["pengolahan", "olah", "juru masak"],
    jamMasuk: "00:00",
    jamKeluar: "09:00",
    jamKeluarSetengahHari: "04:30"
  },
  {
    key: "pemorsian",
    label: "Divisi Pemorsian",
    keywords: ["pemorsian", "porsi", "packing"],
    jamMasuk: "02:00",
    jamKeluar: "10:00",
    jamKeluarSetengahHari: "06:00"
  },
  {
    key: "distribusi",
    label: "Divisi Distribusi",
    keywords: ["distribusi", "driver", "armada"],
    jamMasuk: "07:00",
    jamKeluar: "15:00",
    jamKeluarSetengahHari: "11:00"
  },
  {
    key: "cuci_ompreng",
    label: "Divisi Cuci Ompreng",
    keywords: ["cuci ompreng", "ompreng", "cuci"],
    jamMasuk: "12:00",
    jamKeluar: "20:00",
    jamKeluarSetengahHari: "16:00"
  },
  {
    key: "kebersihan",
    label: "Kebersihan",
    keywords: ["kebersihan", "bersih", "sanitasi", "cleaning"],
    jamMasuk: "08:00",
    jamKeluar: "16:00",
    jamKeluarSetengahHari: "12:00"
  },
  {
    key: "security",
    label: "Security",
    keywords: ["security", "keamanan", "satpam", "penjaga"],
    jamMasuk: "23:00",
    jamKeluar: "10:00",
    jamKeluarSetengahHari: "04:30"
  },
  {
    key: "asisten_lapangan",
    label: "Asisten Lapangan",
    keywords: ["asisten lapangan", "aslap"],
    jamMasuk: "00:00",
    jamKeluar: "23:00",
    jamKeluarSetengahHari: "11:30"
  },
  {
    key: "head_chef",
    label: "Head Chef",
    keywords: ["head chef", "kepala chef", "chef"],
    jamMasuk: "00:00",
    jamKeluar: "10:00",
    jamKeluarSetengahHari: "05:00"
  }
];
var LEGACY_DEFAULT_HOURS = /* @__PURE__ */ new Set([
  "05:30|14:00",
  "05:30|10:30",
  "05.30|14.00",
  "05.30|10.30"
]);
function isLegacyDefaultJamKerja(jamMasuk, jamKeluar) {
  const m = (jamMasuk || "").trim();
  const k = (jamKeluar || "").trim();
  if (!m || m === "-" || !k || k === "-") return true;
  return LEGACY_DEFAULT_HOURS.has(`${m}|${k}`);
}
function matchDivisiJamKerjaRule(jabatan) {
  const normalized = (jabatan || "").toLowerCase().trim();
  if (!normalized) return null;
  for (const rule of DIVISI_JAM_KERJA_RULES) {
    if (normalized === rule.label.toLowerCase()) {
      return rule;
    }
  }
  for (const rule of DIVISI_JAM_KERJA_RULES) {
    if (rule.keywords.some((kw) => normalized.includes(kw))) {
      return rule;
    }
  }
  return null;
}
function getDefaultJamKerjaByJabatan(jabatan, statusAbsensi = "Hadir") {
  if (statusAbsensi !== "Hadir" && statusAbsensi !== "Setengah Hari") {
    return { jamMasuk: "-", jamKeluar: "-" };
  }
  const rule = matchDivisiJamKerjaRule(jabatan);
  if (rule) {
    return {
      jamMasuk: rule.jamMasuk,
      jamKeluar: statusAbsensi === "Setengah Hari" ? rule.jamKeluarSetengahHari : rule.jamKeluar
    };
  }
  return {
    jamMasuk: "08:00",
    jamKeluar: statusAbsensi === "Setengah Hari" ? "12:00" : "16:00"
  };
}

// src/utils/masterDivisiJabatanHelper.ts
var cleanText = (val) => String(val || "").trim();
var LEGACY_PLACEHOLDER_DIVISI_REGEX = /^(dapur\s*&\s*distribusi|staf operasional|petugas operasional dapur)$/i;
function buildMasterDivisiJabatanOptions(divisiList = [], jabatanList = []) {
  const options = [];
  const seenKeys = /* @__PURE__ */ new Set();
  const jabById = /* @__PURE__ */ new Map();
  const jabByKode = /* @__PURE__ */ new Map();
  for (const j of jabatanList || []) {
    const jId = cleanText(j?.id);
    const jKode = cleanText(j?.kode).toUpperCase();
    if (jId) jabById.set(jId, j);
    if (jKode) jabByKode.set(jKode, j);
  }
  for (const d of divisiList || []) {
    const namaDivisi = cleanText(d?.nama);
    const kodeDivisi = cleanText(d?.kode).toUpperCase();
    const jabId = cleanText(d?.jabatanId);
    const linkedJab = (jabId ? jabById.get(jabId) : void 0) || (kodeDivisi ? jabByKode.get(kodeDivisi) : void 0);
    const canonicalJabatan = cleanText(linkedJab?.nama) || cleanText(d?.jabatanNama) || namaDivisi;
    if (!canonicalJabatan && !namaDivisi) continue;
    const finalJabatan = canonicalJabatan || namaDivisi;
    const finalDivisi = namaDivisi || canonicalJabatan;
    const dedupKey = `${kodeDivisi}|${finalJabatan.toLowerCase()}|${finalDivisi.toLowerCase()}`;
    if (seenKeys.has(dedupKey)) continue;
    seenKeys.add(dedupKey);
    options.push({
      divisiId: cleanText(d?.id) || `DIV-${kodeDivisi || options.length + 1}`,
      kodeDivisi: kodeDivisi || cleanText(linkedJab?.kode).toUpperCase(),
      namaDivisi: finalDivisi,
      jabatan: finalJabatan,
      kepalaDivisi: cleanText(d?.kepalaDivisi),
      isMasterDivisi: true
    });
  }
  for (const j of jabatanList || []) {
    const jNama = cleanText(j?.nama);
    const jKode = cleanText(j?.kode).toUpperCase();
    if (!jNama) continue;
    const alreadyCovered = options.some(
      (opt) => opt.jabatan.toLowerCase() === jNama.toLowerCase() || jKode && opt.kodeDivisi === jKode
    );
    if (!alreadyCovered) {
      options.push({
        divisiId: cleanText(j?.id) || `JAB-${options.length + 1}`,
        kodeDivisi: jKode,
        namaDivisi: cleanText(j?.divisiNama) || jNama,
        jabatan: jNama,
        kepalaDivisi: "",
        isMasterDivisi: false
      });
    }
  }
  return options;
}
var SEMANTIC_DIVISION_RULES = [
  {
    kodes: ["OLAH", "MASAK"],
    optionKeywords: ["pengolahan", "masak"],
    inputPatterns: ["pengolahan", "asisten juru masak", "cook helper", "asisten masak"]
  },
  {
    kodes: ["CHEF", "KJM", "KOKI"],
    optionKeywords: ["head chef", "chef", "kepala juru masak", "kepala koki"],
    inputPatterns: ["head chef", "kepala chef", "kepala juru masak", "kepala koki", "chef"]
  },
  {
    kodes: ["OMP", "CUCI"],
    optionKeywords: ["cuci ompreng", "ompreng"],
    inputPatterns: ["cuci ompreng", "ompreng", "cuci & higiene", "petugas cuci"]
  },
  {
    kodes: ["SIAP", "PREP"],
    optionKeywords: ["persiapan", "preparasi"],
    inputPatterns: ["persiapan", "preparasi"]
  },
  {
    kodes: ["PORSI", "PACK"],
    optionKeywords: ["pemorsian", "porsi"],
    inputPatterns: ["pemorsian", "tim pemorsian", "pemorsian & packing"]
  },
  {
    kodes: ["DIS", "DIST", "DST"],
    optionKeywords: ["distribusi"],
    inputPatterns: ["distribusi", "driver distribusi", "armada", "driver"]
  },
  {
    kodes: ["ASLAP"],
    optionKeywords: ["asisten lapangan"],
    inputPatterns: ["asisten lapangan", "aslap"]
  },
  {
    kodes: ["PLOG", "GIZI"],
    optionKeywords: ["pengawas gizi", "ahli gizi", "gizi"],
    inputPatterns: ["pengawas gizi", "ahli gizi", "pengawas mutu", "gizi"]
  },
  {
    kodes: ["PLOK", "KEU", "KEU-PK"],
    optionKeywords: ["pengawas keuangan", "keuangan", "bendahara"],
    inputPatterns: ["pengawas keuangan", "keuangan", "bendahara", "administrasi sppg", "akuntan"]
  },
  {
    kodes: ["KA.SPPG", "KA-SPPG", "KSPPG"],
    optionKeywords: ["ka. sppg", "kepala sppg", "ka sppg"],
    inputPatterns: ["kepala sppg", "ka. sppg", "ka sppg"]
  },
  {
    kodes: ["BRS", "KEB", "SAN"],
    optionKeywords: ["kebersihan", "lingkungan", "cleaning"],
    inputPatterns: ["kebersihan", "lingkungan", "cleaning"]
  },
  {
    kodes: ["SEC", "KEAM", "SATPAM"],
    optionKeywords: ["security", "keamanan", "satpam"],
    inputPatterns: ["security", "keamanan", "satpam"]
  },
  {
    kodes: ["LOG", "GDG"],
    optionKeywords: ["logistik", "gudang"],
    inputPatterns: ["logistik", "gudang"]
  }
];
function findOptionByCandidateText(candidateText, candidateKode, options) {
  if (options.length === 0) return null;
  const cleanKode = cleanText(candidateKode).toUpperCase();
  if (cleanKode) {
    const byKode = options.find((opt) => opt.kodeDivisi === cleanKode);
    if (byKode) return byKode;
  }
  const normalized = cleanText(candidateText).toLowerCase();
  if (!normalized || LEGACY_PLACEHOLDER_DIVISI_REGEX.test(normalized)) return null;
  const exactMatch = options.find(
    (opt) => opt.jabatan.toLowerCase() === normalized || opt.namaDivisi.toLowerCase() === normalized || opt.kodeDivisi && opt.kodeDivisi.toLowerCase() === normalized
  );
  if (exactMatch) return exactMatch;
  const wantsLeader = /\b(ketua|koordinator|koor)\b/i.test(normalized);
  for (const rule of SEMANTIC_DIVISION_RULES) {
    const inputMatches = rule.inputPatterns.some((pat) => normalized.includes(pat));
    if (!inputMatches) continue;
    const candidates = options.filter((opt) => {
      if (opt.kodeDivisi && rule.kodes.includes(opt.kodeDivisi)) return true;
      const optBlob = `${opt.jabatan} ${opt.namaDivisi}`.toLowerCase();
      return rule.optionKeywords.some((kw) => optBlob.includes(kw));
    });
    if (candidates.length > 0) {
      const preferred = candidates.find((opt) => {
        const isLeader = opt.kodeDivisi.startsWith("KET-") || /\b(ketua|koordinator)\b/i.test(opt.jabatan);
        return wantsLeader ? isLeader : !isLeader;
      });
      return preferred || candidates[0];
    }
  }
  const cleanWords = normalized.replace(/^(divisi|ketua divisi|petugas|tim|tenaga)\s+/i, "").trim();
  if (cleanWords.length >= 4) {
    const partialMatch = options.find((opt) => {
      const jabLower = opt.jabatan.toLowerCase();
      const divLower = opt.namaDivisi.toLowerCase();
      return jabLower.includes(cleanWords) || divLower.includes(cleanWords) || normalized.includes(jabLower) || normalized.includes(divLower);
    });
    if (partialMatch) return partialMatch;
  }
  return null;
}
function resolveJabatanAndDivisiFromMaster(params) {
  const options = buildMasterDivisiJabatanOptions(params.divisiList, params.jabatanList || []);
  const rawJab = cleanText(params.rawJabatan);
  const rawDiv = cleanText(params.rawDivisi);
  const rawKode = cleanText(params.rawKodeDivisi);
  const petJab = cleanText(params.petugasJabatan);
  const petDiv = cleanText(params.petugasDivisi);
  const petKode = cleanText(params.petugasKodeDivisi);
  const candidates = [
    ...petJab || petKode ? [{ text: petJab, kode: petKode }] : [],
    ...petDiv ? [{ text: petDiv, kode: petKode }] : [],
    { text: rawJab, kode: rawKode },
    ...rawDiv && rawDiv !== rawJab ? [{ text: rawDiv, kode: rawKode }] : []
  ];
  for (const cand of candidates) {
    const matched = findOptionByCandidateText(cand.text, cand.kode, options);
    if (matched) {
      return {
        jabatan: matched.jabatan,
        divisi: matched.namaDivisi,
        kodeDivisi: matched.kodeDivisi,
        divisiId: matched.divisiId,
        kepalaDivisi: matched.kepalaDivisi,
        matchedMaster: true
      };
    }
  }
  const fallbackJabatan = petJab || rawJab || "Staf Operasional";
  const cleanFallbackDiv = petDiv && !LEGACY_PLACEHOLDER_DIVISI_REGEX.test(petDiv) ? petDiv : rawDiv && !LEGACY_PLACEHOLDER_DIVISI_REGEX.test(rawDiv) ? rawDiv : fallbackJabatan;
  return {
    jabatan: fallbackJabatan,
    divisi: cleanFallbackDiv,
    kodeDivisi: petKode || rawKode || "",
    divisiId: "",
    kepalaDivisi: "",
    matchedMaster: false
  };
}

// server/db/store.ts
var JWT_SECRET = process.env.JWT_SECRET || "portal-administrasi-terpadu-super-secret-jwt-key-2026";
var initialUsers = [
  {
    id: "USR-001",
    nama: "Dr. H. Ahmad Pratama, M.Kom",
    username: "superadmin",
    email: "admin.portal@instansi.go.id",
    role: "Admin Penuh",
    divisi: "Teknologi Informasi & Komunikasi",
    jabatan: "Kepala Pusat Data & Sistem Informasi",
    status: "Aktif",
    password: "password123",
    foto: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150",
    lastLogin: (/* @__PURE__ */ new Date()).toISOString(),
    createdAt: "2026-01-01T08:00:00Z",
    emailVerified: true
  },
  {
    id: "USR-001-USER",
    nama: "Pengelola Dapur Hafshawaty",
    username: "dapurhafshawaty",
    email: "dapurhafshawaty@gmail.com",
    role: "Admin Penuh",
    divisi: "Direksi & Administrasi Utama",
    jabatan: "Administrator Utama Portal",
    status: "Aktif",
    password: "password123",
    foto: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150",
    lastLogin: (/* @__PURE__ */ new Date()).toISOString(),
    createdAt: "2026-01-01T08:00:00Z",
    emailVerified: true
  },
  {
    id: "USR-009",
    nama: "Siti Aminah, S.AP",
    username: "staff_kantor",
    email: "staff.kantor@instansi.go.id",
    role: "Staff Kantor",
    divisi: "Sekretariat & Operasional Kantor",
    jabatan: "Staf Administrasi & Inventaris",
    status: "Aktif",
    password: "password123",
    foto: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150",
    lastLogin: new Date(Date.now() - 18e5).toISOString(),
    createdAt: "2026-01-10T09:30:00Z",
    emailVerified: true
  },
  {
    id: "USR-010",
    nama: "Rudi Hermawan",
    username: "distribusi_bbm",
    email: "distribusi@instansi.go.id",
    role: "Distribusi",
    divisi: "Logistik & Armada Distribusi",
    jabatan: "Koordinator Distribusi & BBM Kendaraan",
    status: "Aktif",
    password: "password123",
    foto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
    lastLogin: new Date(Date.now() - 36e5).toISOString(),
    createdAt: "2026-01-12T10:00:00Z",
    emailVerified: true
  },
  {
    id: "USR-002",
    nama: "Siti Rahmawati, S.STP",
    username: "admin",
    email: "siti.rahmawati@instansi.go.id",
    role: "Admin",
    divisi: "Sekretariat / Tata Usaha",
    jabatan: "Head of Administrative Services",
    status: "Aktif",
    password: "password123",
    foto: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150",
    lastLogin: new Date(Date.now() - 36e5).toISOString(),
    createdAt: "2026-01-10T09:30:00Z",
    emailVerified: true
  },
  {
    id: "USR-003",
    nama: "Budi Santoso, S.E.",
    username: "operator_surat",
    email: "budi.santoso@instansi.go.id",
    role: "Operator",
    divisi: "Sekretariat / Tata Usaha",
    jabatan: "Staf Registrasi e-Surat",
    status: "Aktif",
    password: "password123",
    foto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
    lastLogin: new Date(Date.now() - 72e5).toISOString(),
    createdAt: "2026-01-15T11:00:00Z",
    emailVerified: true
  },
  {
    id: "USR-004",
    nama: "Ahmad Fauzi, S.T.",
    username: "operator_stock",
    email: "ahmad.fauzi@instansi.go.id",
    role: "Operator",
    divisi: "Logistik & Perlengkapan",
    jabatan: "Staf Opname Gudang Central",
    status: "Aktif",
    password: "password123",
    foto: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150",
    lastLogin: new Date(Date.now() - 108e5).toISOString(),
    createdAt: "2026-01-18T08:15:00Z",
    emailVerified: true
  },
  {
    id: "USR-005",
    nama: "Drs. Bambang Hariyanto, M.Si",
    username: "supervisor",
    email: "bambang.hariyanto@instansi.go.id",
    role: "Supervisor",
    divisi: "Keuangan & Aset",
    jabatan: "Kabid Pengawasan Aset",
    status: "Aktif",
    password: "password123",
    foto: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150",
    lastLogin: new Date(Date.now() - 144e5).toISOString(),
    createdAt: "2026-02-01T10:00:00Z",
    emailVerified: true
  },
  {
    id: "USR-006",
    nama: "Rina Wijaya, S.E., M.M.",
    username: "manager",
    email: "rina.wijaya@instansi.go.id",
    role: "Manager",
    divisi: "Perencanaan & Evaluasi",
    jabatan: "Manager Perencanaan Strategic",
    status: "Aktif",
    password: "password123",
    foto: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150",
    lastLogin: new Date(Date.now() - 864e5).toISOString(),
    createdAt: "2026-02-05T14:20:00Z",
    emailVerified: true
  },
  {
    id: "USR-007",
    nama: "Eko Prasetyo, S.Kom",
    username: "staff",
    email: "eko.prasetyo@instansi.go.id",
    role: "Staff",
    divisi: "Teknologi Informasi & Komunikasi",
    jabatan: "Staf Support IT",
    status: "Aktif",
    password: "password123",
    foto: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150",
    lastLogin: new Date(Date.now() - 1728e5).toISOString(),
    createdAt: "2026-02-10T09:00:00Z",
    emailVerified: true
  },
  {
    id: "USR-008",
    nama: "Maya Indah, S.Sos",
    username: "viewer",
    email: "maya.indah@instansi.go.id",
    role: "Viewer",
    divisi: "Hubungan Masyarakat",
    jabatan: "Analis Publikasi Data",
    status: "Aktif",
    password: "password123",
    foto: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150",
    lastLogin: new Date(Date.now() - 2592e5).toISOString(),
    createdAt: "2026-02-12T11:30:00Z",
    emailVerified: true
  }
];
var initialRoles = [
  {
    role: "Admin Penuh",
    description: "Akses penuh tanpa batas ke seluruh fitur aplikasi, master data, user management, dan cloud settings.",
    modulesAccess: {
      dashboard: true,
      esurat: true,
      stockOpname: true,
      bbm: true,
      masterData: true,
      userManagement: true,
      dynamicMenu: true,
      activityLogs: true,
      settings: true,
      apiDocs: true
    },
    actions: { canCreate: true, canEdit: true, canDelete: true, canApprove: true, canExport: true }
  },
  {
    role: "Staff Kantor",
    description: "Mengakses Menu Dashboard Utama, e-Surat Digital, dan Stock Opname.",
    modulesAccess: {
      dashboard: true,
      esurat: true,
      stockOpname: true,
      bbm: false,
      masterData: false,
      userManagement: false,
      dynamicMenu: false,
      activityLogs: false,
      settings: false,
      apiDocs: false
    },
    actions: { canCreate: true, canEdit: true, canDelete: false, canApprove: false, canExport: true }
  },
  {
    role: "Distribusi",
    description: "Mengakses Dashboard Utama dan Laporan BBM Kendaraan.",
    modulesAccess: {
      dashboard: true,
      esurat: false,
      stockOpname: false,
      bbm: true,
      masterData: false,
      userManagement: false,
      dynamicMenu: false,
      activityLogs: false,
      settings: false,
      apiDocs: false
    },
    actions: { canCreate: true, canEdit: true, canDelete: false, canApprove: false, canExport: true }
  },
  {
    role: "Super Admin",
    description: "Akses penuh tanpa batas ke seluruh modul, master data, audit logs, dan konfigurasi portal.",
    modulesAccess: {
      dashboard: true,
      esurat: true,
      stockOpname: true,
      bbm: true,
      masterData: true,
      userManagement: true,
      dynamicMenu: true,
      activityLogs: true,
      settings: true,
      apiDocs: true
    },
    actions: { canCreate: true, canEdit: true, canDelete: true, canApprove: true, canExport: true }
  },
  {
    role: "Admin",
    description: "Akses pengelolaan operasional, master data, e-Surat, dan Stock Opname.",
    modulesAccess: {
      dashboard: true,
      esurat: true,
      stockOpname: true,
      bbm: true,
      masterData: true,
      userManagement: true,
      dynamicMenu: false,
      activityLogs: true,
      settings: false,
      apiDocs: true
    },
    actions: { canCreate: true, canEdit: true, canDelete: false, canApprove: true, canExport: true }
  },
  {
    role: "Operator",
    description: "Akses entri data surat masuk/keluar, transaksi stok masuk/keluar, dan fisik opname.",
    modulesAccess: {
      dashboard: true,
      esurat: true,
      stockOpname: true,
      bbm: false,
      masterData: false,
      userManagement: false,
      dynamicMenu: false,
      activityLogs: false,
      settings: false,
      apiDocs: false
    },
    actions: { canCreate: true, canEdit: true, canDelete: false, canApprove: false, canExport: true }
  },
  {
    role: "Supervisor",
    description: "Pengawasan, verifikasi surat, disposisi, dan persetujuan stok penyesuaian.",
    modulesAccess: {
      dashboard: true,
      esurat: true,
      stockOpname: true,
      bbm: true,
      masterData: true,
      userManagement: false,
      dynamicMenu: false,
      activityLogs: true,
      settings: false,
      apiDocs: false
    },
    actions: { canCreate: true, canEdit: true, canDelete: false, canApprove: true, canExport: true }
  },
  {
    role: "Manager",
    description: "Akses laporan, persetujuan level tinggi, analisis aktivitas, dan dashboard eksekutif.",
    modulesAccess: {
      dashboard: true,
      esurat: true,
      stockOpname: true,
      bbm: true,
      masterData: true,
      userManagement: false,
      dynamicMenu: false,
      activityLogs: true,
      settings: false,
      apiDocs: true
    },
    actions: { canCreate: false, canEdit: true, canDelete: false, canApprove: true, canExport: true }
  },
  {
    role: "Staff",
    description: "Menerima disposisi surat, mengajukan permintaan barang, dan melihat status dokumen.",
    modulesAccess: {
      dashboard: true,
      esurat: true,
      stockOpname: true,
      bbm: false,
      masterData: false,
      userManagement: false,
      dynamicMenu: false,
      activityLogs: false,
      settings: false,
      apiDocs: false
    },
    actions: { canCreate: true, canEdit: false, canDelete: false, canApprove: false, canExport: false }
  },
  {
    role: "Viewer",
    description: "Hanya dapat melihat ringkasan dashboard dan laporan publik tanpa hak modifikasi.",
    modulesAccess: {
      dashboard: true,
      esurat: false,
      stockOpname: false,
      bbm: false,
      masterData: false,
      userManagement: false,
      dynamicMenu: false,
      activityLogs: false,
      settings: false,
      apiDocs: false
    },
    actions: { canCreate: false, canEdit: false, canDelete: false, canApprove: false, canExport: true }
  }
];
var initialMenus = [
  {
    id: "MNU-001",
    title: "Dashboard Utama",
    path: "/dashboard",
    icon: "LayoutDashboard",
    color: "#3B82F6",
    order: 1,
    targetModule: "portal",
    requiredRole: ["Admin Penuh", "Staff Kantor", "Distribusi", "Super Admin", "Admin", "Operator", "Supervisor", "Manager", "Staff", "Viewer"],
    isActive: true
  },
  {
    id: "MNU-002",
    title: "e-Surat Digital",
    path: "/esurat",
    icon: "Mail",
    color: "#10B981",
    order: 2,
    targetModule: "esurat",
    requiredRole: ["Admin Penuh", "Staff Kantor", "Super Admin", "Admin", "Operator", "Supervisor", "Manager", "Staff"],
    isActive: true
  },
  {
    id: "MNU-003",
    title: "Stock Opname",
    path: "/stock",
    icon: "Boxes",
    color: "#F59E0B",
    order: 3,
    targetModule: "stock",
    requiredRole: ["Admin Penuh", "Staff Kantor", "Super Admin", "Admin", "Operator", "Supervisor", "Manager", "Staff"],
    isActive: true
  },
  {
    id: "MNU-003-DATANG",
    title: "Input Kedatangan Barang",
    path: "/barang-datang",
    icon: "PackagePlus",
    color: "#0284C7",
    order: 3.1,
    targetModule: "barangDatang",
    requiredRole: ["Admin Penuh", "Staff Kantor", "Distribusi", "Super Admin", "Admin", "Operator", "Supervisor", "Manager", "Staff", "Viewer"],
    isActive: true
  },
  {
    id: "MNU-003-BENEFICIARY",
    title: "Penerima Manfaat",
    path: "/penerima-manfaat",
    icon: "Users",
    color: "#059669",
    order: 3.5,
    targetModule: "portal",
    requiredRole: ["Admin Penuh", "Staff Kantor", "Distribusi", "Super Admin", "Admin", "Operator", "Supervisor", "Manager", "Staff", "Viewer"],
    isActive: true
  },
  {
    id: "MNU-003-GIZI",
    title: "Gizi",
    path: "/gizi",
    icon: "UtensilsCrossed",
    color: "#059669",
    order: 3.8,
    targetModule: "gizi",
    requiredRole: ["Admin Penuh", "Staff Kantor", "Distribusi", "Super Admin", "Admin", "Operator", "Supervisor", "Manager", "Staff", "Viewer"],
    isActive: true
  },
  {
    id: "MNU-003-MENU-HARIAN",
    title: "Menu Harian",
    path: "/menu-harian",
    icon: "Utensils",
    color: "#F59E0B",
    order: 3.85,
    targetModule: "menuHarian",
    requiredRole: ["Admin Penuh", "Staff Kantor", "Distribusi", "Super Admin", "Admin", "Operator", "Supervisor", "Manager", "Staff", "Viewer"],
    isActive: true
  },
  {
    id: "MNU-003-FOOD-WASTE",
    title: "Food Waste",
    path: "/food-waste",
    icon: "Trash2",
    color: "#EF4444",
    order: 3.86,
    targetModule: "foodWaste",
    requiredRole: ["Admin Penuh", "Staff Kantor", "Distribusi", "Super Admin", "Admin", "Operator", "Supervisor", "Manager", "Staff", "Viewer"],
    isActive: true
  },
  {
    id: "MNU-003-PETUGAS",
    title: "Daftar Petugas",
    path: "/petugas",
    icon: "Users",
    color: "#6366F1",
    order: 3.87,
    targetModule: "petugas",
    requiredRole: ["Admin Penuh", "Staff Kantor", "Distribusi", "Super Admin", "Admin", "Operator", "Supervisor", "Manager", "Staff", "Viewer"],
    isActive: true
  },
  {
    id: "MNU-003-PO",
    title: "Purchase Order (PO) 5 Hari",
    path: "/purchase-order",
    icon: "FileCheck",
    color: "#2563EB",
    order: 3.9,
    targetModule: "po",
    requiredRole: ["Admin Penuh", "Staff Kantor", "Distribusi", "Super Admin", "Admin", "Operator", "Supervisor", "Manager", "Staff", "Viewer"],
    isActive: true
  },
  {
    id: "MNU-003-SUPPLIER",
    title: "Portal Supplier",
    path: "/portal-supplier",
    icon: "Truck",
    color: "#059669",
    order: 3.95,
    targetModule: "portal",
    requiredRole: ["Admin Penuh", "Staff Kantor", "Distribusi", "Super Admin", "Admin", "Operator", "Supervisor", "Manager", "Staff", "Viewer"],
    isActive: true
  },
  {
    id: "MNU-003-TUGAS",
    title: "Tugas Divisi",
    path: "/tugas-divisi",
    icon: "ClipboardCheck",
    color: "#2563EB",
    order: 4,
    targetModule: "portal",
    requiredRole: ["Admin Penuh", "Staff Kantor", "Distribusi", "Super Admin", "Admin", "Operator", "Supervisor", "Manager", "Staff", "Viewer"],
    isActive: true
  },
  {
    id: "MNU-003-BBM",
    title: "Laporan BBM Kendaraan",
    path: "/bbm/laporan",
    icon: "Fuel",
    color: "#0284C7",
    order: 5,
    targetModule: "portal",
    requiredRole: ["Admin Penuh", "Distribusi", "Super Admin", "Admin", "Supervisor", "Manager"],
    isActive: true
  },
  {
    id: "MNU-003-DISTRIBUSI",
    title: "Laporan Distribusi",
    path: "/laporan-distribusi",
    icon: "Truck",
    color: "#2563EB",
    order: 4.5,
    targetModule: "portal",
    requiredRole: ["Admin Penuh", "Staff Kantor", "Distribusi", "Super Admin", "Admin", "Operator", "Supervisor", "Manager", "Staff", "Viewer"],
    isActive: true
  },
  {
    id: "MNU-004",
    title: "Master Data Terpadu",
    path: "/master-data",
    icon: "Database",
    color: "#8B5CF6",
    order: 5,
    targetModule: "portal",
    requiredRole: ["Admin Penuh", "Super Admin", "Admin", "Supervisor", "Manager"],
    isActive: true
  },
  {
    id: "MNU-005",
    title: "Manajemen Pengguna",
    path: "/admin/users",
    icon: "Users",
    color: "#EC4899",
    order: 6,
    targetModule: "portal",
    requiredRole: ["Admin Penuh", "Super Admin", "Admin"],
    isActive: true
  },
  {
    id: "MNU-006",
    title: "Menu Dinamis",
    path: "/admin/menus",
    icon: "Menu",
    color: "#06B6D4",
    order: 7,
    targetModule: "portal",
    requiredRole: ["Admin Penuh", "Super Admin"],
    isActive: true
  },
  {
    id: "MNU-007",
    title: "Log Aktivitas Central",
    path: "/admin/logs",
    icon: "FileText",
    color: "#64748B",
    order: 8,
    targetModule: "portal",
    requiredRole: ["Admin Penuh", "Super Admin", "Admin", "Supervisor", "Manager"],
    isActive: true
  },
  {
    id: "MNU-008",
    title: "Dokumentasi REST API",
    path: "/docs/api",
    icon: "Code2",
    color: "#14B8A6",
    order: 8,
    targetModule: "portal",
    isActive: true
  },
  {
    id: "MNU-009",
    title: "Arsitektur Enterprise",
    path: "/docs/architecture",
    icon: "BookOpen",
    color: "#6366F1",
    order: 9,
    targetModule: "portal",
    isActive: true
  },
  {
    id: "MNU-010",
    title: "Pengaturan Portal",
    path: "/admin/settings",
    icon: "Settings",
    color: "#EF4444",
    order: 10,
    targetModule: "portal",
    requiredRole: ["Super Admin"],
    isActive: true
  }
];
var initialPegawai = [
  { id: "PEG-001", nip: "198504122010121001", nama: "Dr. H. Ahmad Pratama, M.Kom", email: "admin.portal@instansi.go.id", telepon: "081234567890", divisiId: "DIV-001", divisiNama: "Teknologi Informasi & Komunikasi", jabatanId: "JAB-001", jabatanNama: "Kepala Pusat Data & Sistem Informasi", status: "Aktif" },
  { id: "PEG-002", nip: "199002152015032002", nama: "Siti Rahmawati, S.STP", email: "siti.rahmawati@instansi.go.id", telepon: "081298765432", divisiId: "DIV-002", divisiNama: "Sekretariat / Tata Usaha", jabatanId: "JAB-002", jabatanNama: "Head of Administrative Services", status: "Aktif" },
  { id: "PEG-003", nip: "199208202018011003", nama: "Budi Santoso, S.E.", email: "budi.santoso@instansi.go.id", telepon: "081377889900", divisiId: "DIV-003", divisiNama: "Logistik & Perlengkapan", jabatanId: "JAB-003", jabatanNama: "Staf Opname Gudang Central", status: "Aktif" },
  { id: "PEG-004", nip: "198211052008041002", nama: "Drs. Bambang Hariyanto, M.Si", email: "bambang.hariyanto@instansi.go.id", telepon: "081122334455", divisiId: "DIV-004", divisiNama: "Keuangan & Aset", jabatanId: "JAB-004", jabatanNama: "Kabid Pengawasan Aset", status: "Aktif" },
  { id: "PEG-005", nip: "198806122012022001", nama: "Rina Wijaya, S.E., M.M.", email: "rina.wijaya@instansi.go.id", telepon: "081566778899", divisiId: "DIV-005", divisiNama: "Perencanaan & Evaluasi", jabatanId: "JAB-005", jabatanNama: "Manager Perencanaan Strategic", status: "Aktif" }
];
var initialDivisi = [
  { id: "DIV-001", kode: "TIK", nama: "Teknologi Informasi & Komunikasi", kepalaDivisi: "Dr. H. Ahmad Pratama, M.Kom", keterangan: "Pengelola Infrastruktur IT, Server, & Aplikasi Enterprise" },
  { id: "DIV-002", kode: "TU", nama: "Sekretariat / Tata Usaha", kepalaDivisi: "Siti Rahmawati, S.STP", keterangan: "Pengelola Persuratan, Arsip, & Administrasi Umum" },
  { id: "DIV-003", kode: "LOG", nama: "Logistik & Perlengkapan", kepalaDivisi: "Ahmad Fauzi, S.T.", keterangan: "Pengelola Pergudangan, Aset, & Stock Opname" },
  { id: "DIV-004", kode: "KEU", nama: "Keuangan & Aset", kepalaDivisi: "Drs. Bambang Hariyanto, M.Si", keterangan: "Pengelolaan Anggaran, Akuntansi, & Verifikasi Aset" },
  { id: "DIV-005", kode: "REN", nama: "Perencanaan & Evaluasi", kepalaDivisi: "Rina Wijaya, S.E., M.M.", keterangan: "Perencanaan Program Kerja & Monitoring Kinerja" }
];
var initialJabatan = [
  { id: "JAB-001", kode: "KAPUS", nama: "Kepala Pusat Data & Sistem Informasi", deskripsi: "Penanggung jawab sistem informasi dan integrasi data portal." },
  { id: "JAB-002", kode: "HEAD-TU", nama: "Head of Administrative Services", deskripsi: "Koordinator layanan administrasi, tata usaha, dan persuratan." },
  { id: "JAB-003", kode: "STAF-LOG", nama: "Staf Opname Gudang Central", deskripsi: "Pengelola stok gudang, penerimaan bahan, dan opname persediaan." },
  { id: "JAB-004", kode: "KABID-ASET", nama: "Kabid Pengawasan Aset", deskripsi: "Pengawasan inventaris, barang datang, dan aset operasional." },
  { id: "JAB-005", kode: "MGR-REN", nama: "Manager Perencanaan Strategic", deskripsi: "Perencanaan anggaran, RAB, dan evaluasi operasional program." },
  { id: "JAB-006", kode: "KJM", nama: "Kepala Juru Masak (Head Chef)", deskripsi: "Memimpin proses pengolahan makanan dan standar mutu dapur." },
  { id: "JAB-007", kode: "AJM", nama: "Asisten Juru Masak", deskripsi: "Membantu persiapan bahan dan proses memasak harian." },
  { id: "JAB-008", kode: "PMS", nama: "Petugas Pemorsian & Packing", deskripsi: "Melakukan pemorsian ompreng sesuai kelompok sasaran penerima manfaat." },
  { id: "JAB-009", kode: "DRV", nama: "Driver Distribusi & Armada", deskripsi: "Mengirimkan paket makanan ke sekolah/lembaga dan menjemput ompreng." },
  { id: "JAB-010", kode: "SNT", nama: "Petugas Cuci Ompreng & Sanitasi", deskripsi: "Pencucian, sterilisasi ompreng, dan menjaga sanitasi ruang dapur." },
  { id: "JAB-011", kode: "GIZI", nama: "Ahli Gizi & Pengawas Mutu", deskripsi: "Menyusun siklus menu, nilai gizi, CCP suhu, dan uji organoleptik." },
  { id: "JAB-012", kode: "ADM-SPPG", nama: "Tenaga Administrasi SPPG", deskripsi: "Pelaporan administrasi, absensi, dan dokumentasi operasional SPPG." }
];
var initialGudang = [
  { id: "GDG-001", kode: "GDG-CENTRAL", nama: "Gudang Utama Central Enterprise", lokasi: "Gedung A Lantai Dasar, Kompleks Perkantoran Pusat", penanggungJawab: "Budi Santoso, S.E.", status: "Aktif" },
  { id: "GDG-002", kode: "GDG-ATK", nama: "Gudang ATK & Cetakan", lokasi: "Gedung B Ruang 102", penanggungJawab: "Dewi Lestari, A.Md", status: "Aktif" },
  { id: "GDG-003", kode: "GDG-IT", nama: "Gudang Perangkat Hardware TIK", lokasi: "Gedung Server Lantai 2", penanggungJawab: "Ahmad Pratama, M.Kom", status: "Aktif" }
];
var initialKategori = [
  { id: "KAT-001", kode: "BAHAN_BAKU", nama: "Bahan Baku", deskripsi: "Semua jenis bahan baku makanan, bumbu, dan konsumsi dapur" },
  { id: "KAT-002", kode: "OPERASIONAL", nama: "Operasional", deskripsi: "Perlengkapan operasional, peralatan, ATK, dan kebersihan" }
];
var initialInstansi = [
  { id: "INS-001", kode: "KEMENKEU", nama: "Kementerian Keuangan Republik Indonesia", alamat: "Jl. Dr. Wahidin Raya No.1, Jakarta Pusat", telepon: "021-3841000", email: "humas@kemenkeu.go.id", kontakPerson: "Bapak Sugeng S." },
  { id: "INS-002", kode: "BKN", nama: "Badan Kepegawaian Negara", alamat: "Jl. Mayor Jendral Sutoyo No.12, Cililitan, Jakarta Timur", telepon: "021-80882815", email: "info@bkn.go.id", kontakPerson: "Ibu Ratna M." },
  { id: "INS-003", kode: "PEMPROV", nama: "Pemerintah Provinsi DKI Jakarta", alamat: "Jl. Medan Merdeka Selatan No.8-9, Jakarta Pusat", telepon: "021-3822222", email: "sekretariat@jakarta.go.id", kontakPerson: "Drs. Hendra W." }
];
var initialSuratMasuk = [
  {
    id: "SM-2026-001",
    nomorSurat: "102/KEMENKEU/07/2026",
    nomorAgenda: "AGD-2026-089",
    pengirim: "Kementerian Keuangan Republik Indonesia",
    perihal: "Undangan Koordinasi Penganggaran & Sinkronisasi Sistem Informasi Terpadu",
    tanggalSurat: "2026-07-25",
    tanggalTerima: "2026-07-28",
    sifat: "Penting",
    status: "Proses Disposisi",
    ringkasan: "Permohonan kehadiran pada Rapat Koordinasi Nasional Integrasi Layanan Digital.",
    fileUrl: "/docs/surat-undangan-kemenkeu.pdf",
    qrCodeUrl: "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=VERIFIED-SM-2026-001"
  },
  {
    id: "SM-2026-002",
    nomorSurat: "450/BKN/SEC/2026",
    nomorAgenda: "AGD-2026-090",
    pengirim: "Badan Kepegawaian Negara",
    perihal: "Pemberitahuan Audit Kepatuhan Data Pegawai Enterprise",
    tanggalSurat: "2026-07-27",
    tanggalTerima: "2026-07-29",
    sifat: "Biasa",
    status: "Baru",
    ringkasan: "Pelaksanaan sinkronisasi Master Data Pegawai periode Semester II.",
    fileUrl: "/docs/surat-bkn-audit.pdf",
    qrCodeUrl: "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=VERIFIED-SM-2026-002"
  },
  {
    id: "SM-2026-003",
    nomorSurat: "088/PEMPROV/DKI/2026",
    nomorAgenda: "AGD-2026-085",
    pengirim: "Pemerintah Provinsi DKI Jakarta",
    perihal: "Kerjasama Layanan Publik & Pertukaran Data Antar Moda",
    tanggalSurat: "2026-07-20",
    tanggalTerima: "2026-07-21",
    sifat: "Sangat Rahasia",
    status: "Diarsipkan",
    ringkasan: "Kesepakatan bersama integrasi API Gateway antar instansi.",
    fileUrl: "/docs/mou-dki.pdf",
    qrCodeUrl: "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=VERIFIED-SM-2026-003"
  }
];
var initialSuratKeluar = [
  {
    id: "SK-2026-001",
    nomorSurat: "005/PORTAL-TIK/SK/VII/2026",
    tujuan: "Kementerian Keuangan Republik Indonesia",
    perihal: "Konfirmasi Kehadiran & Penyampaian Laporan Kesiapan Portal Terpadu",
    tanggalSurat: "2026-07-29",
    pembuat: "Siti Rahmawati, S.STP",
    statusApproval: "Disetujui",
    approver: "Dr. H. Ahmad Pratama, M.Kom",
    templateId: "TMP-001",
    qrCodeUrl: "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=VERIFIED-SK-2026-001",
    fileUrl: "/docs/sk-005-kemenkeu.pdf"
  },
  {
    id: "SK-2026-002",
    nomorSurat: "006/PORTAL-LOG/SK/VII/2026",
    tujuan: "PT Nusa Logistics Enterprise",
    perihal: "Permohonan Pengadaan Barang & Stock Refill Gudang Central",
    tanggalSurat: "2026-07-30",
    pembuat: "Budi Santoso, S.E.",
    statusApproval: "Menunggu Approval",
    approver: "Drs. Bambang Hariyanto, M.Si",
    templateId: "TMP-002",
    qrCodeUrl: "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=VERIFIED-SK-2026-002"
  }
];
var initialDisposisi = [
  {
    id: "DSP-001",
    suratMasukId: "SM-2026-001",
    nomorSurat: "102/KEMENKEU/07/2026",
    pengirimDisposisi: "Dr. H. Ahmad Pratama, M.Kom (Kepala Pusat)",
    penerimaDisposisi: "Sekretariat / Tata Usaha & Divisi TIK",
    instruksi: "Harap siapkan materi presentasi arsitektur SSO dan API Gateway sebelum rapat tgl 5 Agustus.",
    sifat: "Segera",
    batasWaktu: "2026-08-03",
    status: "Dalam Proses",
    catatanPenerima: "Materi sedang disusun oleh tim pengembangan.",
    tanggalDisposisi: "2026-07-28 14:00"
  }
];
var initialTemplateSurat = [
  {
    id: "TMP-001",
    nama: "Surat Undangan / Konfirmasi Resmi",
    kategori: "Surat Keluar Dinamis",
    formatNomor: "{URUT}/PORTAL-{DIVISI}/SK/{BULAN-ROMAWI}/{TAHUN}",
    isiHeader: "PORTAL ADMINISTRASI TERPADU ENTERPRISE\nSEKRETARIAT UTAMA PUSAT DATA",
    isiBody: "Dengan hormat, sehubungan dengan {PERIHAL}, kami menyampaikan konfirmasi kehadiran tim...",
    isiFooter: "Demikian disampaikan, atas perhatian dan kerjasamanya diucapkan terima kasih."
  },
  {
    id: "TMP-002",
    nama: "Surat Permohonan Pengadaan & Stock Refill",
    kategori: "Logistik",
    formatNomor: "{URUT}/PORTAL-LOG/SK/{BULAN-ROMAWI}/{TAHUN}",
    isiHeader: "DIVISI LOGISTIK & PERLENGKAPAN GUDANG CENTRAL",
    isiBody: "Guna menunjang operasional, bersama ini kami mengajukan permohonan pengadaan barang...",
    isiFooter: "Mengetahui, Kepala Pusat Data & Sistem Informasi."
  }
];
var initialMasterBarang = [
  { id: "BRG-001", kodeBarang: "BRG-ATK-001", namaBarang: "Kertas HVS A4 80gsm PaperOne (Box)", kategoriId: "KAT-002", kategoriNama: "Operasional", gudangId: "GDG-002", gudangNama: "Gudang ATK & Cetakan", satuan: "Box", stokMinimal: 15, stokSekarang: 42, hargaSatuan: 225e3, barcode: "8991001200301", qrCodeUrl: "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=BRG-ATK-001" },
  { id: "BRG-002", kodeBarang: "BRG-IT-002", namaBarang: "Laptop Enterprise Intel i7 16GB RAM 512GB SSD", kategoriId: "KAT-002", kategoriNama: "Operasional", gudangId: "GDG-003", gudangNama: "Gudang Perangkat Hardware TIK", satuan: "Unit", stokMinimal: 5, stokSekarang: 18, hargaSatuan: 165e5, barcode: "8991001200402", qrCodeUrl: "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=BRG-IT-002" },
  { id: "BRG-003", kodeBarang: "BRG-IT-003", namaBarang: "Barcode & QR Scanner Wireless Wireless 2D", kategoriId: "KAT-002", kategoriNama: "Operasional", gudangId: "GDG-001", gudangNama: "Gudang Utama Central Enterprise", satuan: "Unit", stokMinimal: 4, stokSekarang: 3, hargaSatuan: 125e4, barcode: "8991001200503", qrCodeUrl: "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=BRG-IT-003" },
  { id: "BRG-004", kodeBarang: "BRG-CTK-004", namaBarang: "Map Stopmap Folio Ber-Kop Instansi (Pack 50)", kategoriId: "KAT-002", kategoriNama: "Operasional", gudangId: "GDG-002", gudangNama: "Gudang ATK & Cetakan", satuan: "Pack", stokMinimal: 20, stokSekarang: 85, hargaSatuan: 85e3, barcode: "8991001200604", qrCodeUrl: "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=BRG-CTK-004" }
];
var initialStockMovements = [
  { id: "MOV-001", jenis: "Masuk", barangId: "BRG-001", kodeBarang: "BRG-ATK-001", namaBarang: "Kertas HVS A4 80gsm PaperOne (Box)", jumlah: 20, gudangId: "GDG-002", gudangNama: "Gudang ATK & Cetakan", referensiNota: "PO-LOG-2026-088", keterangan: "Pengadaan Rutin Triwulan III", tanggal: "2026-07-28 10:00", petugas: "Budi Santoso, S.E." },
  { id: "MOV-002", jenis: "Keluar", barangId: "BRG-002", kodeBarang: "BRG-IT-002", namaBarang: "Laptop Enterprise Intel i7 16GB RAM 512GB SSD", jumlah: 2, gudangId: "GDG-003", gudangNama: "Gudang Perangkat Hardware TIK", referensiNota: "REQ-TIK-2026-012", keterangan: "Penyerahan Laptop Kerja Pegawai Baru", tanggal: "2026-07-29 14:30", petugas: "Ahmad Pratama, M.Kom" }
];
var initialStockOpnameSessions = [
  {
    id: "SOP-2026-001",
    kodeOpname: "SOP-JULI-2026-GDG1",
    tanggal: "2026-07-31",
    gudangId: "GDG-001",
    gudangNama: "Gudang Utama Central Enterprise",
    petugas: "Budi Santoso, S.E. & Team Audit",
    status: "Sedang Berjalan",
    items: [
      { barangId: "BRG-003", kodeBarang: "BRG-IT-003", namaBarang: "Barcode & QR Scanner Wireless Wireless 2D", stokSistem: 4, stokFisik: 3, selisih: -1, catatan: "1 unit sedang dipinjam divisi TIK tanpa nota" }
    ],
    catatanGeneral: "Opname rutin bulanan area gudang central."
  }
];
var initialNotifications = [
  { id: "NTF-001", modul: "e-Surat", judul: "Surat Masuk Baru Received", pesan: "Surat Masuk 102/KEMENKEU/07/2026 perlu tindak lanjut disposisi.", tipe: "info", isRead: false, createdAt: "2026-07-31 09:15", linkUrl: "/esurat" },
  { id: "NTF-002", modul: "Stock Opname", judul: "Peringatan Stok Minimal!", pesan: 'Barang "Barcode & QR Scanner Wireless Wireless 2D" berada di bawah batas stok minimal (3/4 unit).', tipe: "warning", isRead: false, createdAt: "2026-07-31 10:30", linkUrl: "/stock" },
  { id: "NTF-003", modul: "e-Surat", judul: "Approval Surat Keluar", pesan: "Surat Keluar 005/PORTAL-TIK/SK/VII/2026 telah disetujui oleh Kepala Pusat.", tipe: "success", isRead: true, createdAt: "2026-07-30 16:00", linkUrl: "/esurat" },
  { id: "NTF-004", modul: "Stock Opname", judul: "Stock Opname Selesai", pesan: "Sesi Stock Opname SOP-JULI-2026-GDG1 berhasil dicatat.", tipe: "info", isRead: true, createdAt: "2026-07-29 11:20", linkUrl: "/stock" }
];
var initialActivityLogs = [
  { id: "LOG-001", userId: "USR-001", namaUser: "Dr. H. Ahmad Pratama, M.Kom", modul: "SSO & Auth", aktivitas: "User Login Single Sign-On", detail: "Login berhasil via SSO Portal Gateway", tanggal: "2026-07-31", jam: "08:00:12", browser: "Chrome 126.0 (Windows 11)", ipAddress: "10.240.1.45", status: "Sukses" },
  { id: "LOG-002", userId: "USR-002", namaUser: "Siti Rahmawati, S.STP", modul: "e-Surat Digital", aktivitas: "Proses Disposisi Surat", detail: "Meneruskan Surat Masuk 102/KEMENKEU/07/2026 ke TIK", tanggal: "2026-07-31", jam: "09:20:05", browser: "Firefox 127.0 (macOS)", ipAddress: "10.240.1.88", status: "Sukses" },
  { id: "LOG-003", userId: "USR-003", namaUser: "Budi Santoso, S.E.", modul: "Stock Opname", aktivitas: "Input Stock Opname Physical", detail: "Mencatat hasil hitung fisik BRG-IT-003 selisih -1 unit", tanggal: "2026-07-31", jam: "10:35:40", browser: "Edge 125.0 (Windows 11)", ipAddress: "10.240.2.12", status: "Sukses" },
  { id: "LOG-004", userId: "USR-001", namaUser: "Dr. H. Ahmad Pratama, M.Kom", modul: "Master Data", aktivitas: "Update Master Gudang", detail: "Mengubah penanggung jawab Gudang Central", tanggal: "2026-07-30", jam: "15:10:00", browser: "Chrome 126.0 (Windows 11)", ipAddress: "10.240.1.45", status: "Sukses" }
];
var initialSettings = {
  namaPortal: "Portal Administrasi Terpadu",
  deskripsi: "Single Entry Point Enterprise & Module Integration Gateway (e-Surat & Stock Opname)",
  logoUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=100",
  theme: "light",
  primaryColor: "#2563EB",
  smtpHost: "smtp.instansi.go.id",
  smtpPort: 587,
  smtpUser: "notifications@instansi.go.id",
  maintenanceMode: false,
  sessionTimeoutMinutes: 120,
  rateLimitPerMin: 100
};
var initialKendaraan = [
  {
    id: "KND-001",
    namaKendaraan: "Mobil Operasional Avanza",
    platNomor: "B 1234 RFS",
    jenisKendaraan: "Mobil Operasional",
    standarKmLiter: 12,
    status: "Aktif"
  },
  {
    id: "KND-002",
    namaKendaraan: "Mobil Box Isuzu Traga",
    platNomor: "B 9876 POS",
    jenisKendaraan: "Mobil Box",
    standarKmLiter: 9,
    status: "Aktif"
  },
  {
    id: "KND-003",
    namaKendaraan: "Motor Operasional Honda Beat",
    platNomor: "B 3456 TIK",
    jenisKendaraan: "Motor",
    standarKmLiter: 40,
    status: "Aktif"
  },
  {
    id: "KND-004",
    namaKendaraan: "Ambulance Hino Dutro",
    platNomor: "B 7788 SPP",
    jenisKendaraan: "Ambulance",
    standarKmLiter: 8,
    status: "Aktif"
  },
  {
    id: "KND-005",
    namaKendaraan: "Bus Jemputan Staf Isuzu",
    platNomor: "B 1122 SPP",
    jenisKendaraan: "Bus",
    standarKmLiter: 7,
    status: "Aktif"
  }
];
var initialLaporanBbm = [
  {
    id: "BBM-202608-001",
    tanggalPembelian: "2026-08-01",
    kendaraanId: "KND-001",
    kendaraanNama: "Mobil Operasional Avanza",
    platNomor: "B 1234 RFS",
    jenisBbm: "Pertamax",
    kmAwal: 42100,
    kmAkhir: 42520,
    jarakTempuh: 420,
    hargaBbm: 451500,
    jumlahLiter: 35,
    kmLiterAktual: 12,
    standarKmLiter: 12,
    statusPemakaian: "Normal",
    uploadStruk: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=400",
    statusStruk: "Ter-upload",
    keterangan: "Pemakaian Wajar",
    userInput: "Ahmad Fauzi, S.T.",
    timestamp: "2026-08-01T09:15:00.000Z"
  },
  {
    id: "BBM-202608-002",
    tanggalPembelian: "2026-08-02",
    kendaraanId: "KND-002",
    kendaraanNama: "Mobil Box Isuzu Traga",
    platNomor: "B 9876 POS",
    jenisBbm: "Solar",
    kmAwal: 85300,
    kmAkhir: 85660,
    jarakTempuh: 360,
    hargaBbm: 306e3,
    jumlahLiter: 45,
    kmLiterAktual: 8,
    standarKmLiter: 9,
    statusPemakaian: "Tidak Normal",
    uploadStruk: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=400",
    statusStruk: "Ter-upload",
    keterangan: "Boros",
    userInput: "Budi Santoso, S.E.",
    timestamp: "2026-08-02T10:30:00.000Z"
  },
  {
    id: "BBM-202608-003",
    tanggalPembelian: "2026-08-02",
    kendaraanId: "KND-003",
    kendaraanNama: "Motor Operasional Honda Beat",
    platNomor: "B 3456 TIK",
    jenisBbm: "Pertalite",
    kmAwal: 12400,
    kmAkhir: 12568,
    jarakTempuh: 168,
    hargaBbm: 42e3,
    jumlahLiter: 4,
    kmLiterAktual: 42,
    standarKmLiter: 40,
    statusPemakaian: "Normal",
    uploadStruk: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=400",
    statusStruk: "Ter-upload",
    keterangan: "Pemakaian Wajar",
    userInput: "Eko Prasetyo, S.Kom",
    timestamp: "2026-08-02T14:10:00.000Z"
  },
  {
    id: "BBM-202607-001",
    tanggalPembelian: "2026-07-28",
    kendaraanId: "KND-001",
    kendaraanNama: "Mobil Operasional Avanza",
    platNomor: "B 1234 RFS",
    jenisBbm: "Pertamax",
    kmAwal: 41650,
    kmAkhir: 42100,
    jarakTempuh: 450,
    hargaBbm: 470850,
    jumlahLiter: 36.5,
    kmLiterAktual: 12.33,
    standarKmLiter: 12,
    statusPemakaian: "Normal",
    uploadStruk: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=400",
    statusStruk: "Ter-upload",
    keterangan: "Pemakaian Wajar",
    userInput: "Ahmad Fauzi, S.T.",
    timestamp: "2026-07-28T16:20:00.000Z"
  },
  {
    id: "BBM-202607-002",
    tanggalPembelian: "2026-07-25",
    kendaraanId: "KND-004",
    kendaraanNama: "Ambulance Hino Dutro",
    platNomor: "B 7788 SPP",
    jenisBbm: "Pertamina Dex",
    kmAwal: 31200,
    kmAkhir: 31520,
    jarakTempuh: 320,
    hargaBbm: 634200,
    jumlahLiter: 42,
    kmLiterAktual: 7.62,
    standarKmLiter: 8,
    statusPemakaian: "Tidak Normal",
    uploadStruk: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=400",
    statusStruk: "Ter-upload",
    keterangan: "Boros",
    userInput: "Dr. H. Ahmad Pratama, M.Kom",
    timestamp: "2026-07-25T11:45:00.000Z"
  },
  {
    id: "BBM-202607-003",
    tanggalPembelian: "2026-07-20",
    kendaraanId: "KND-005",
    kendaraanNama: "Bus Jemputan Staf Isuzu",
    platNomor: "B 1122 SPP",
    jenisBbm: "Solar",
    kmAwal: 98100,
    kmAkhir: 98520,
    jarakTempuh: 420,
    hargaBbm: 394400,
    jumlahLiter: 58,
    kmLiterAktual: 7.24,
    standarKmLiter: 7,
    statusPemakaian: "Normal",
    uploadStruk: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?w=400",
    statusStruk: "Ter-upload",
    keterangan: "Pemakaian Wajar",
    userInput: "Budi Santoso, S.E.",
    timestamp: "2026-07-20T08:00:00.000Z"
  }
];
var initialDrivers = [
  {
    id: "DRV-001",
    nama: "Joko Susilo",
    telepon: "0812-3456-7891",
    noSim: "92817263541",
    kendaraan: "Armada Box A - L300 Pendingin",
    platNomor: "N 8412 PQ",
    foto: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300",
    status: "Aktif",
    catatan: "Driver senior rute sekolah Pajarakan & Kraksaan"
  },
  {
    id: "DRV-002",
    nama: "Bambang Supriadi",
    telepon: "0813-9876-5432",
    noSim: "81726354910",
    kendaraan: "Armada Box B - Grand Max",
    platNomor: "N 1982 WX",
    foto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300",
    status: "Aktif",
    catatan: "Driver spesialis rute Posyandu Balita & Ibu Hamil"
  },
  {
    id: "DRV-003",
    nama: "Herman Pratama",
    telepon: "0852-1122-3344",
    noSim: "71625349102",
    kendaraan: "Armada Box C - Isuzu Traga",
    platNomor: "N 3109 AZ",
    foto: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300",
    status: "Tugas",
    catatan: "Driver rute Pesantren & SMA Hafshawaty"
  },
  {
    id: "DRV-004",
    nama: "Agus Hermawan",
    telepon: "0821-4455-6677",
    noSim: "61524379801",
    kendaraan: "Armada Pickup D - Carry",
    platNomor: "N 7721 KL",
    foto: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300",
    status: "Aktif",
    catatan: "Driver cadangan operasional dapur SPPG"
  }
];
var initialDistributionReports = [
  {
    id: "DST-20260914-001",
    tanggal: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
    driverId: "DRV-001",
    driverNama: "Joko Susilo",
    driverFoto: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300",
    driverKendaraan: "Armada Box A - L300 Pendingin (N 8412 PQ)",
    instansiId: "LOC-001",
    namaInstansi: "SD Zainul Hasan Genggong",
    jumlahPenerimaManfaat: 409,
    jamPengiriman: "07:30",
    jamPenjemputan: "11:30",
    dokPengiriman: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=500",
    dokPenjemputan: "https://images.unsplash.com/photo-1580674684081-7617fbf3d745?w=500",
    status: "Selesai",
    catatan: "Pengiriman tepat waktu, ompreng bersih dan diserahkan ke Pihak Sekolah.",
    createdBy: "Joko Susilo",
    createdAt: (/* @__PURE__ */ new Date()).toISOString()
  },
  {
    id: "DST-20260914-002",
    tanggal: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
    driverId: "DRV-002",
    driverNama: "Bambang Supriadi",
    driverFoto: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300",
    driverKendaraan: "Armada Box B - Grand Max (N 1982 WX)",
    instansiId: "LOC-002",
    namaInstansi: "MA Model Hafshawaty",
    jumlahPenerimaManfaat: 243,
    jamPengiriman: "08:00",
    jamPenjemputan: "12:00",
    dokPengiriman: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=500",
    dokPenjemputan: "https://images.unsplash.com/photo-1580674684081-7617fbf3d745?w=500",
    status: "Selesai",
    catatan: "Selesai didistribusikan ke OSIS MA Model.",
    createdBy: "Bambang Supriadi",
    createdAt: (/* @__PURE__ */ new Date()).toISOString()
  }
];
var initialWaDivisiSettings = [
  { divisiId: "persiapan", divisiNama: "Divisi Persiapan", nomorWa: "6281234567891", namaKontak: "Budi Santoso (Persiapan)" },
  { divisiId: "pengolahan", divisiNama: "Divisi Pengolahan", nomorWa: "6281234567892", namaKontak: "Siti Nurhaliza (Chef Dapur)" },
  { divisiId: "pemorsian", divisiNama: "Divisi Pemorsian", nomorWa: "6281234567893", namaKontak: "Ahmad Yani (Pemorsian)" },
  { divisiId: "distribusi", divisiNama: "Divisi Distribusi", nomorWa: "6281234567894", namaKontak: "Rudi Hermawan (Kurir/Distribusi)" },
  { divisiId: "cuci_ompreng", divisiNama: "Divisi Cuci Ompreng", nomorWa: "6281234567895", namaKontak: "Dewi Sartika (Sanitasi Ompreng)" }
];
var initialTaskTemplates = [
  {
    id: "TPL-001",
    divisiId: "persiapan",
    divisiNama: "Divisi Persiapan",
    judulTemplate: "Checklist Standar Persiapan Dapur SPPG",
    checklists: [
      "Pemeriksaan bahan baku",
      "Pemeriksaan kualitas sayur",
      "Pemeriksaan kualitas lauk",
      "Menimbang bahan",
      "Menyiapkan alat",
      "Membersihkan area persiapan",
      "Menyiapkan bumbu",
      "Menyiapkan bahan sesuai menu",
      "Pemeriksaan kebersihan personel",
      "Checklist selesai"
    ]
  },
  {
    id: "TPL-002",
    divisiId: "pengolahan",
    divisiNama: "Divisi Pengolahan",
    judulTemplate: "Checklist Standar Pengolahan/Memasak SPPG",
    checklists: [
      "Memasak nasi",
      "Memasak lauk",
      "Memasak sayur",
      "Memasak buah jika diperlukan",
      "Pemeriksaan suhu makanan",
      "Pemeriksaan kematangan",
      "Pemeriksaan rasa",
      "Pemeriksaan sanitasi",
      "Checklist selesai"
    ]
  },
  {
    id: "TPL-003",
    divisiId: "pemorsian",
    divisiNama: "Divisi Pemorsian",
    judulTemplate: "Checklist Standar Pemorsian Ompreng SPPG",
    checklists: [
      "Menyiapkan ompreng",
      "Pemeriksaan ompreng",
      "Pemorsian nasi",
      "Pemorsian lauk",
      "Pemorsian sayur",
      "Pemorsian buah",
      "Pemeriksaan berat porsi",
      "Pemeriksaan kualitas",
      "Menutup ompreng",
      "Checklist selesai"
    ]
  },
  {
    id: "TPL-004",
    divisiId: "distribusi",
    divisiNama: "Divisi Distribusi",
    judulTemplate: "Checklist Standar Distribusi SPPG",
    checklists: [
      "Pemeriksaan jumlah ompreng",
      "Pemeriksaan kendaraan",
      "Loading kendaraan",
      "Pemeriksaan rute",
      "Pengiriman",
      "Dokumentasi",
      "Serah terima",
      "Konfirmasi penerimaan",
      "Checklist selesai"
    ]
  },
  {
    id: "TPL-005",
    divisiId: "cuci_ompreng",
    divisiNama: "Divisi Cuci Ompreng",
    judulTemplate: "Checklist Standar Sanitasi & Cuci Ompreng SPPG",
    checklists: [
      "Penerimaan ompreng",
      "Sortir ompreng",
      "Pencucian pertama",
      "Pencucian kedua",
      "Sanitasi",
      "Pengeringan",
      "Penyimpanan",
      "Pemeriksaan akhir",
      "Checklist selesai"
    ]
  }
];
function createDefaultTasksForDateAndDivisi(tanggal, divisiId) {
  const template = initialTaskTemplates.find((t) => t.divisiId === divisiId);
  const checklistTexts = template ? template.checklists : [];
  const checklists = checklistTexts.map((text, idx) => ({
    id: `CHK-${divisiId}-${idx + 1}`,
    text,
    completed: idx < 3,
    // demo first 3 items completed
    jamMulai: idx < 3 ? "06:00" : void 0,
    jamSelesai: idx < 3 ? "07:00" : void 0,
    namaPetugas: idx < 3 ? "Staf Dapur Operasional" : void 0,
    catatan: idx === 0 ? "Kondisi bahan segar & lengkap." : void 0,
    status: idx < 3 ? "Selesai" : idx === 3 ? "Sedang Dikerjakan" : "Belum Dikerjakan"
  }));
  const defaultPenanggungJawab = {
    persiapan: "Budi Santoso, S.ST",
    pengolahan: "Chef Hendra Wijaya",
    pemorsian: "Siti Rahmawati",
    distribusi: "Rudi Hermawan",
    cuci_ompreng: "Dewi Sartika"
  };
  const defaultDivisiNama = {
    persiapan: "Divisi Persiapan",
    pengolahan: "Divisi Pengolahan",
    pemorsian: "Divisi Pemorsian",
    distribusi: "Divisi Distribusi",
    cuci_ompreng: "Divisi Cuci Ompreng"
  };
  return {
    id: `TASK-${tanggal}-${divisiId}`,
    tanggal,
    divisiId,
    divisiNama: defaultDivisiNama[divisiId] || divisiId,
    penanggungJawab: defaultPenanggungJawab[divisiId] || "Penanggung Jawab Divisi",
    shift: "Shift 1 (Pagi)",
    statusProduksi: "Proses Memasak",
    jumlahProduksi: 2500,
    keterangan: "Pemeriksaan & pelaksanaan operasional rutin divisi.",
    menuHarian: "Nasi, Ayam Goreng Lengkuas, Sayur Sop Bening, Pisang Ambon",
    checklists,
    updatedAt: (/* @__PURE__ */ new Date()).toISOString(),
    createdBy: "System Default"
  };
}
var initialBeneficiaryGroups = [
  { id: "GRP-001", nama: "PAUD / TK", kategoriUtama: "Siswa", kategoriLembaga: "PAUD / TK / RA", klasifikasiPorsi: "Porsi Kecil", deskripsi: "Kelompok Anak Usia Dini & Taman Kanak-kanak", urutan: 1, status: "Aktif" },
  { id: "GRP-002", nama: "SD (Kelas 1-3)", kategoriUtama: "Siswa", kategoriLembaga: "SD / MI", klasifikasiPorsi: "Porsi Kecil", deskripsi: "Kelompok Siswa Sekolah Dasar Kelas Rendah", urutan: 2, status: "Aktif" },
  { id: "GRP-003", nama: "SD (Kelas 4-6)", kategoriUtama: "Siswa", kategoriLembaga: "SD / MI", klasifikasiPorsi: "Porsi Besar", deskripsi: "Kelompok Siswa Sekolah Dasar Kelas Tinggi", urutan: 3, status: "Aktif" },
  { id: "GRP-004", nama: "SMP / MTs", kategoriUtama: "Siswa", kategoriLembaga: "SMP / MTs", klasifikasiPorsi: "Porsi Besar", deskripsi: "Kelompok Siswa Sekolah Menengah Pertama", urutan: 4, status: "Aktif" },
  { id: "GRP-005", nama: "SMA / MA", kategoriUtama: "Siswa", kategoriLembaga: "SMA / SMK / MA", klasifikasiPorsi: "Porsi Besar", deskripsi: "Kelompok Siswa Sekolah Menengah Atas / Madrasah Aliyah", urutan: 5, status: "Aktif" },
  { id: "GRP-006", nama: "BALITA", kategoriUtama: "Balita", kategoriLembaga: "Balita / Posyandu", klasifikasiPorsi: "Balita", deskripsi: "Kelompok Anak Balita Pemenuhan Gizi", urutan: 6, status: "Aktif" },
  { id: "GRP-007", nama: "IBU HAMIL & MENYUSUI", kategoriUtama: "Ibu Hamil", kategoriLembaga: "Bumil & Busui", klasifikasiPorsi: "Bumil & Busui", deskripsi: "Kelompok Ibu Hamil & Ibu Menyusui Penerima Nutrisi", urutan: 7, status: "Aktif" },
  { id: "GRP-008", nama: "GURU / STAF", kategoriUtama: "Guru / Staf", kategoriLembaga: "Lainnya", klasifikasiPorsi: "Porsi Besar", deskripsi: "Kelompok Guru dan Staf Tenaga Pendidik", urutan: 8, status: "Aktif" }
];
var initialBeneficiaryLocations = [
  {
    id: "LOC-001",
    groupId: "GRP-002",
    groupNama: "SD",
    namaInstansi: "SD Zainul Hasan Genggong",
    alamat: "Jl. Raya Genggong, Pajarakan, Probolinggo",
    kontak: "081234567801",
    picNama: "Ahmad Fauzi, S.Pd.",
    picTelepon: "081234567801",
    kategoriLembaga: "SD / MI",
    klasifikasiPorsi: "Porsi Kecil",
    breakdownKelas: { kelas1: 130, kelas2: 128, kelas3: 126 },
    kategoriBreakdown: { siswa: 384, guru: 25, breakdownKelas: { kelas1: 130, kelas2: 128, kelas3: 126 } },
    defaultJumlah: 409,
    status: "Aktif"
  },
  {
    id: "LOC-002",
    groupId: "GRP-005",
    groupNama: "SMA / MA",
    namaInstansi: "MA Model Hafshawaty",
    alamat: "Kompleks Pesantren Hafshawaty, Probolinggo",
    kontak: "081234567802",
    picNama: "Fatimah Az-Zahra, M.Pd.",
    picTelepon: "081234567802",
    kategoriLembaga: "SMA / SMK / MA",
    klasifikasiPorsi: "Porsi Besar",
    breakdownKelas: { kelas10: 75, kelas11: 72, kelas12: 71 },
    kategoriBreakdown: { siswa: 218, guru: 25, breakdownKelas: { kelas10: 75, kelas11: 72, kelas12: 71 } },
    defaultJumlah: 243,
    status: "Aktif"
  },
  {
    id: "LOC-003",
    groupId: "GRP-004",
    groupNama: "SMP",
    namaInstansi: "SMP ZAINUL HASAN 1 GENGGONG",
    alamat: "Jl. Pesantren Genggong, Probolinggo",
    kontak: "081234567803",
    picNama: "Rahmat Hidayat, S.Pd.",
    picTelepon: "081234567803",
    kategoriLembaga: "SMP / MTs",
    klasifikasiPorsi: "Porsi Besar",
    breakdownKelas: { kelas7: 120, kelas8: 115, kelas9: 115 },
    kategoriBreakdown: { siswa: 350, guru: 20, breakdownKelas: { kelas7: 120, kelas8: 115, kelas9: 115 } },
    defaultJumlah: 370,
    status: "Aktif"
  },
  {
    id: "LOC-004",
    groupId: "GRP-001",
    groupNama: "PAUD / TK",
    namaInstansi: "PAUD Nurul Islam",
    alamat: "Jl. Masjid Nurul Islam No. 12",
    kontak: "081234567804",
    picNama: "Siti Nuraini, S.Pd.",
    picTelepon: "081234567804",
    kategoriLembaga: "PAUD / TK / RA",
    klasifikasiPorsi: "Porsi Kecil",
    breakdownKelas: { kb: 25, tkA: 35, tkB: 35 },
    kategoriBreakdown: { siswa: 95, guru: 8, breakdownKelas: { kb: 25, tkA: 35, tkB: 35 } },
    defaultJumlah: 103,
    status: "Aktif"
  },
  {
    id: "LOC-TKZH",
    groupId: "GRP-001",
    groupNama: "PAUD / TK",
    namaInstansi: "TK ZAINUL HASAN",
    alamat: "Jl. Raya Genggong, Pajarakan, Probolinggo",
    kontak: "085234834095",
    picNama: "Lulut Biyadillah",
    picTelepon: "085234834095",
    kategoriLembaga: "PAUD / TK / RA",
    klasifikasiPorsi: "Porsi Kecil",
    breakdownKelas: { tkA: 110, tkB: 111 },
    kategoriBreakdown: { siswa: 221, guru: 0, breakdownKelas: { tkA: 110, tkB: 111 } },
    defaultJumlah: 221,
    status: "Aktif"
  },
  {
    id: "LOC-005",
    groupId: "GRP-006",
    groupNama: "BALITA",
    namaInstansi: "Posyandu Desa Temenggungan (Balita)",
    alamat: "Dusun Krajan RT/RW 003/004, Desa Temenggungan, Kec. Krejengan, Kab. Probolinggo",
    kontak: "081234567805",
    kategoriLembaga: "Balita / Posyandu",
    klasifikasiPorsi: "Porsi Balita",
    breakdownKelas: { baduta: 42, balita: 58 },
    kategoriBreakdown: { balita: 100, guru: 5, breakdownKelas: { baduta: 42, balita: 58 } },
    defaultJumlah: 105,
    status: "Aktif"
  },
  {
    id: "LOC-006",
    groupId: "GRP-007",
    groupNama: "IBU HAMIL",
    namaInstansi: "Posyandu Desa Temenggungan (Ibu Hamil)",
    alamat: "Dusun Krajan RT/RW 003/004, Desa Temenggungan, Kec. Krejengan, Kab. Probolinggo",
    kontak: "081234567806",
    kategoriLembaga: "Bumil & Busui",
    klasifikasiPorsi: "Porsi Ibu Hamil",
    breakdownKelas: { bumilTrimester1: 9, bumilTrimester3: 8 },
    kategoriBreakdown: { ibuHamil: 17, guru: 2, breakdownKelas: { bumilTrimester1: 9, bumilTrimester3: 8 } },
    defaultJumlah: 19,
    status: "Aktif"
  },
  {
    id: "LOC-007",
    groupId: "GRP-007",
    groupNama: "IBU MENYUSUI",
    namaInstansi: "Posyandu Desa Temenggungan (Ibu Menyusui)",
    alamat: "Dusun Krajan RT/RW 003/004, Desa Temenggungan, Kec. Krejengan, Kab. Probolinggo",
    kontak: "081234567807",
    kategoriLembaga: "Bumil & Busui",
    klasifikasiPorsi: "Porsi Ibu Menyusui",
    breakdownKelas: { busui06: 20, busui612: 14 },
    kategoriBreakdown: { ibuMenyusui: 34, guru: 3, breakdownKelas: { busui06: 20, busui612: 14 } },
    defaultJumlah: 37,
    status: "Aktif"
  },
  {
    id: "LOC-008",
    groupId: "GRP-007",
    groupNama: "3B",
    namaInstansi: "Posyandu Desa Temenggungan",
    alamat: "Dusun Krajan RT/RW 003/004, Desa Temenggungan, Kec. Krejengan, Kab. Probolinggo",
    kontak: "081234567808",
    picNama: "Bidan Desa Temenggungan",
    picTelepon: "081234567808",
    kategoriLembaga: "3B (Balita, Ibu Hamil & Ibu Menyusui)",
    klasifikasiPorsi: "Bumil & Busui",
    breakdownKelas: { busui_w: 21, bumil_w: 30, balita511_l: 15, balita511_p: 18, balita1259_l: 17, balita1259_p: 18, kader_l: 0, kader_p: 0 },
    kategoriBreakdown: { siswa: 0, guru: 0, balita: 68, ibuHamil: 30, ibuMenyusui: 21 },
    defaultJumlah: 119,
    status: "Aktif"
  }
];
var initialMasterBahanPangan = [
  { id: "ING-001", namaBahan: "Beras kepompong 25kg", kategori: "Sembako", satuanPembelian: "kg", satuanPerhitungan: "gram", bddDefault: 100, hargaDasarPerKg: 15e3, supplier: "Perum BULOG Probolinggo", lokasi: "Gudang Central A1", statusAktif: "Aktif", faktorKonversi: "1 karung = 25 kg" },
  { id: "ING-002", namaBahan: "Daging ayam fillet", kategori: "Lauk Pauk", satuanPembelian: "kg", satuanPerhitungan: "gram", bddDefault: 100, hargaDasarPerKg: 38e3, supplier: "RPA Berkah Unggas", lokasi: "Cold Storage Freezer 1", statusAktif: "Aktif", faktorKonversi: "1 kg = 1000 gram" },
  { id: "ING-003", namaBahan: "Tepung terigu Segitiga Biru 1 Kg", kategori: "Bahan Olahan", satuanPembelian: "kg", satuanPerhitungan: "gram", bddDefault: 100, hargaDasarPerKg: 13e3, supplier: "Distributor Bogasari", lokasi: "Gudang Kering A2", statusAktif: "Aktif", faktorKonversi: "1 pack = 1 kg" },
  { id: "ING-004", namaBahan: "Tepung panir 10Kg", kategori: "Bahan Olahan", satuanPembelian: "pcs", satuanPerhitungan: "gram", bddDefault: 100, hargaDasarPerKg: 22e3, supplier: "Grosir Bahan Kue", lokasi: "Gudang Kering A2", statusAktif: "Aktif", faktorKonversi: "1 sak = 10 kg" },
  { id: "ING-005", namaBahan: "Daun pisang", kategori: "Pelengkap", satuanPembelian: "ikat", satuanPerhitungan: "gram", bddDefault: 100, hargaDasarPerKg: 5e3, supplier: "Petani Lokal Temenggungan", lokasi: "Rak Daun & Segar", statusAktif: "Aktif", faktorKonversi: "1 ikat = 10 lembar" },
  { id: "ING-006", namaBahan: "Tahu", kategori: "Lauk Nabati", satuanPembelian: "pcs", satuanPerhitungan: "gram", bddDefault: 100, hargaDasarPerKg: 1e4, supplier: "Pengrajin Tahu Temenggungan", lokasi: "Chiller Dapur", statusAktif: "Aktif", faktorKonversi: "1 papan = 50 potong" },
  { id: "ING-007", namaBahan: "Wortel", kategori: "Sayuran", satuanPembelian: "kg", satuanPerhitungan: "gram", bddDefault: 100, hargaDasarPerKg: 14e3, supplier: "Mitra Sayur Sukapura", lokasi: "Chiller Sayuran", statusAktif: "Aktif", faktorKonversi: "1 kg = 1000 gram" },
  { id: "ING-008", namaBahan: "Kentang", kategori: "Sayuran", satuanPembelian: "kg", satuanPerhitungan: "gram", bddDefault: 100, hargaDasarPerKg: 18e3, supplier: "Petani Kentang Bromo", lokasi: "Rak Sayur Kering", statusAktif: "Aktif", faktorKonversi: "1 kg = 1000 gram" },
  { id: "ING-009", namaBahan: "Kelengkeng", kategori: "Buah", satuanPembelian: "kg", satuanPerhitungan: "gram", bddDefault: 100, hargaDasarPerKg: 35e3, supplier: "Grosir Buah Segar Probolinggo", lokasi: "Gudang Buah", statusAktif: "Aktif", faktorKonversi: "1 kg = 1000 gram" },
  { id: "ING-010", namaBahan: "Minyak goreng filma 2ltr", kategori: "Minyak & Lemak", satuanPembelian: "pcs", satuanPerhitungan: "gram", bddDefault: 100, hargaDasarPerKg: 36e3, supplier: "Distributor Sinar Mas", lokasi: "Gudang Kering B1", statusAktif: "Aktif", faktorKonversi: "1 pouch = 2 liter" },
  { id: "ING-011", namaBahan: "Bumbu kari jepang 40g", kategori: "Bumbu & Rempah", satuanPembelian: "pcs", satuanPerhitungan: "gram", bddDefault: 100, hargaDasarPerKg: 12e3, supplier: "Distributor House Foods", lokasi: "Rak Bumbu", statusAktif: "Aktif", faktorKonversi: "1 pack = 40 gram" },
  { id: "ING-012", namaBahan: "Bawang putih kupas", kategori: "Bumbu & Rempah", satuanPembelian: "kg", satuanPerhitungan: "gram", bddDefault: 100, hargaDasarPerKg: 38e3, supplier: "Pasar Dringu", lokasi: "Rak Bumbu", statusAktif: "Aktif", faktorKonversi: "1 kg = 1000 gram" },
  { id: "ING-013", namaBahan: "Bawang merah kupas", kategori: "Bumbu & Rempah", satuanPembelian: "kg", satuanPerhitungan: "gram", bddDefault: 100, hargaDasarPerKg: 34e3, supplier: "Petani Bawang Dringu", lokasi: "Rak Bumbu", statusAktif: "Aktif", faktorKonversi: "1 kg = 1000 gram" },
  { id: "ING-014", namaBahan: "Bawang bombay", kategori: "Bumbu & Rempah", satuanPembelian: "kg", satuanPerhitungan: "gram", bddDefault: 100, hargaDasarPerKg: 26e3, supplier: "Pasar Maron", lokasi: "Rak Bumbu", statusAktif: "Aktif", faktorKonversi: "1 kg = 1000 gram" },
  { id: "ING-015", namaBahan: "Cabe merah besar", kategori: "Bumbu & Rempah", satuanPembelian: "kg", satuanPerhitungan: "gram", bddDefault: 100, hargaDasarPerKg: 3e4, supplier: "Pasar Maron", lokasi: "Chiller Sayur", statusAktif: "Aktif", faktorKonversi: "1 kg = 1000 gram" },
  { id: "ING-016", namaBahan: "Jahe", kategori: "Bumbu & Rempah", satuanPembelian: "kg", satuanPerhitungan: "gram", bddDefault: 100, hargaDasarPerKg: 2e4, supplier: "Pasar Kraksaan", lokasi: "Rak Bumbu", statusAktif: "Aktif", faktorKonversi: "1 kg = 1000 gram" },
  { id: "ING-017", namaBahan: "Kunyit", kategori: "Bumbu & Rempah", satuanPembelian: "kg", satuanPerhitungan: "gram", bddDefault: 100, hargaDasarPerKg: 16e3, supplier: "Pasar Kraksaan", lokasi: "Rak Bumbu", statusAktif: "Aktif", faktorKonversi: "1 kg = 1000 gram" },
  { id: "ING-018", namaBahan: "Ketumbar", kategori: "Bumbu & Rempah", satuanPembelian: "kg", satuanPerhitungan: "gram", bddDefault: 100, hargaDasarPerKg: 25e3, supplier: "Grosir Rempah", lokasi: "Rak Bumbu", statusAktif: "Aktif", faktorKonversi: "1 kg = 1000 gram" },
  { id: "ING-019", namaBahan: "Kemiri", kategori: "Bumbu & Rempah", satuanPembelian: "kg", satuanPerhitungan: "gram", bddDefault: 100, hargaDasarPerKg: 4e4, supplier: "Grosir Rempah", lokasi: "Rak Bumbu", statusAktif: "Aktif", faktorKonversi: "1 kg = 1000 gram" },
  { id: "ING-020", namaBahan: "Daun jeruk", kategori: "Bumbu & Rempah", satuanPembelian: "kg", satuanPerhitungan: "gram", bddDefault: 100, hargaDasarPerKg: 25e3, supplier: "Kebun Herbal", lokasi: "Rak Bumbu", statusAktif: "Aktif", faktorKonversi: "1 kg = 1000 gram" },
  { id: "ING-021", namaBahan: "Gula", kategori: "Bumbu & Rempah", satuanPembelian: "kg", satuanPerhitungan: "gram", bddDefault: 100, hargaDasarPerKg: 17500, supplier: "PG Gending", lokasi: "Gudang Kering A2", statusAktif: "Aktif", faktorKonversi: "1 kg = 1000 gram" },
  { id: "ING-022", namaBahan: "Garam cap kapal 250 gr", kategori: "Bumbu & Rempah", satuanPembelian: "pcs", satuanPerhitungan: "gram", bddDefault: 100, hargaDasarPerKg: 3e3, supplier: "Grosir Garam", lokasi: "Rak Bumbu", statusAktif: "Aktif", faktorKonversi: "1 bungkus = 250 gram" },
  { id: "ING-023", namaBahan: "Ladaku", kategori: "Bumbu & Rempah", satuanPembelian: "renteng", satuanPerhitungan: "gram", bddDefault: 100, hargaDasarPerKg: 12e3, supplier: "Distributor Motasa", lokasi: "Rak Bumbu", statusAktif: "Aktif", faktorKonversi: "1 renteng = 12 sachet" },
  { id: "ING-024", namaBahan: "Kaldu jamur totole 200 gr", kategori: "Bumbu & Rempah", satuanPembelian: "pcs", satuanPerhitungan: "gram", bddDefault: 100, hargaDasarPerKg: 18e3, supplier: "PT Totole Berkah", lokasi: "Rak Bumbu", statusAktif: "Aktif", faktorKonversi: "1 bungkus = 200 gram" }
];
var initialMasterMenuResep = [
  {
    id: "MNR-001",
    namaMenu: "NASI + CHICKEN KATSU (DAUN PISANG) + TAHU GORENG + CURRY WORTEL & KENTANG + KELENGKENG",
    kategoriMenu: "Standar SPPG Badan Gizi Nasional",
    deskripsi: "Menu resmi SPPG Probolinggo Krejengan Temenggungan lengkap dengan 4 porsi sasaran (Porsi Kecil, Porsi Besar, Balita, Bumil & Busui).",
    bahanResep: [
      { ingredientId: "ING-001", ingredientName: "Beras kepompong 25kg", netWeightGram: 50, bddPercent: 100 },
      { ingredientId: "ING-002", ingredientName: "Daging ayam fillet", netWeightGram: 50, bddPercent: 100 },
      { ingredientId: "ING-003", ingredientName: "Tepung terigu Segitiga Biru 1 Kg", netWeightGram: 10, bddPercent: 100 },
      { ingredientId: "ING-004", ingredientName: "Tepung panir 10Kg", netWeightGram: 10, bddPercent: 100 },
      { ingredientId: "ING-005", ingredientName: "Daun pisang", netWeightGram: 5, bddPercent: 100 },
      { ingredientId: "ING-006", ingredientName: "Tahu", netWeightGram: 50, bddPercent: 100 },
      { ingredientId: "ING-007", ingredientName: "Wortel", netWeightGram: 25, bddPercent: 100 },
      { ingredientId: "ING-008", ingredientName: "Kentang", netWeightGram: 25, bddPercent: 100 },
      { ingredientId: "ING-009", ingredientName: "Kelengkeng", netWeightGram: 100, bddPercent: 100 },
      { ingredientId: "ING-010", ingredientName: "Minyak goreng filma 2ltr", netWeightGram: 15, bddPercent: 100 },
      { ingredientId: "ING-011", ingredientName: "Bumbu kari jepang 40g", netWeightGram: 1, bddPercent: 100 },
      { ingredientId: "ING-012", ingredientName: "Bawang putih kupas", netWeightGram: 1, bddPercent: 100 },
      { ingredientId: "ING-013", ingredientName: "Bawang merah kupas", netWeightGram: 1, bddPercent: 100 },
      { ingredientId: "ING-014", ingredientName: "Bawang bombay", netWeightGram: 0.5, bddPercent: 100 },
      { ingredientId: "ING-015", ingredientName: "Cabe merah besar", netWeightGram: 0.5, bddPercent: 100 },
      { ingredientId: "ING-016", ingredientName: "Jahe", netWeightGram: 0.5, bddPercent: 100 },
      { ingredientId: "ING-017", ingredientName: "Kunyit", netWeightGram: 0.5, bddPercent: 100 },
      { ingredientId: "ING-018", ingredientName: "Ketumbar", netWeightGram: 0.5, bddPercent: 100 },
      { ingredientId: "ING-019", ingredientName: "Kemiri", netWeightGram: 0.5, bddPercent: 100 },
      { ingredientId: "ING-020", ingredientName: "Daun jeruk", netWeightGram: 0.5, bddPercent: 100 },
      { ingredientId: "ING-021", ingredientName: "Gula", netWeightGram: 1, bddPercent: 100 },
      { ingredientId: "ING-022", ingredientName: "Garam cap kapal 250 gr", netWeightGram: 1, bddPercent: 100 },
      { ingredientId: "ING-023", ingredientName: "Ladaku", netWeightGram: 0.5, bddPercent: 100 },
      { ingredientId: "ING-024", ingredientName: "Kaldu jamur totole 200 gr", netWeightGram: 0.5, bddPercent: 100 }
    ]
  },
  {
    id: "MNR-002",
    namaMenu: "NASI + TELUR BALADO + TEMPE BACEM + SUP SAYUR BUNCIS WORTEL + BUAH JERUK",
    kategoriMenu: "Standar SPPG Harian",
    deskripsi: "Menu alternatif gizi seimbang dengan protein telur balado, tempe bacem, sayur buncis wortel, dan jeruk manis.",
    bahanResep: [
      { ingredientId: "ING-001", ingredientName: "Beras kepompong 25kg", netWeightGram: 50, bddPercent: 100 },
      { ingredientId: "ING-006", ingredientName: "Tahu", netWeightGram: 50, bddPercent: 100 },
      { ingredientId: "ING-007", ingredientName: "Wortel", netWeightGram: 25, bddPercent: 100 },
      { ingredientId: "ING-010", ingredientName: "Minyak goreng filma 2ltr", netWeightGram: 12, bddPercent: 100 },
      { ingredientId: "ING-012", ingredientName: "Bawang putih kupas", netWeightGram: 2, bddPercent: 100 },
      { ingredientId: "ING-013", ingredientName: "Bawang merah kupas", netWeightGram: 2, bddPercent: 100 },
      { ingredientId: "ING-021", ingredientName: "Gula", netWeightGram: 1, bddPercent: 100 },
      { ingredientId: "ING-022", ingredientName: "Garam cap kapal 250 gr", netWeightGram: 1, bddPercent: 100 },
      { ingredientId: "ING-024", ingredientName: "Kaldu jamur totole 200 gr", netWeightGram: 0.5, bddPercent: 100 }
    ]
  }
];
var initialNutritionPlans = [];
var initialNutritionPlanItems = [];
var initialFoodWasteRecords = [
  {
    id: "FW-20260806-001",
    tanggal: "2026-08-06",
    hariTanggalFormatted: "KAMIS, 06 AGUSTUS 2026",
    sppgName: "SPPG PROBOLINGGO KREJENGAN TEMENGGUNGAN",
    penerimaManfaatTotal: 2808,
    items: [
      {
        id: "FWI-001",
        menu: "Nasi",
        jumlah: 66.9,
        satuan: "Kg",
        penerimaManfaat: 2808,
        standarPorsi: 150,
        totalDisajikanKg: 421.2,
        persentase: 16,
        kesimpulan: "Toleransi"
      },
      {
        id: "FWI-002",
        menu: "Chickem katsu",
        jumlah: 1.1,
        satuan: "Kg",
        penerimaManfaat: 2808,
        standarPorsi: 50,
        totalDisajikanKg: 140.4,
        persentase: 1,
        kesimpulan: "Baik Sekali"
      },
      {
        id: "FWI-003",
        menu: "Tahu goreng",
        jumlah: 7.2,
        satuan: "Kg",
        penerimaManfaat: 2808,
        standarPorsi: 50,
        totalDisajikanKg: 140.4,
        persentase: 5,
        kesimpulan: "Baik Sekali"
      },
      {
        id: "FWI-004",
        menu: "Curry wortel & kentang",
        jumlah: 39.65,
        satuan: "Kg",
        penerimaManfaat: 2808,
        standarPorsi: 50,
        totalDisajikanKg: 140.4,
        persentase: 28,
        kesimpulan: "Perlu perbaikan menu"
      },
      {
        id: "FWI-005",
        menu: "Jeruk santang",
        jumlah: 0,
        satuan: "Kg",
        penerimaManfaat: 2808,
        standarPorsi: 100,
        totalDisajikanKg: 280.8,
        persentase: 0,
        kesimpulan: "Baik Sekali"
      }
    ],
    totalDisajikanKg: 1123.2,
    totalSisaKg: 114.85,
    rataRataPersentase: 10,
    kesimpulanUmum: "Toleransi (\u226420% masih dianggap batas toleransi maksimal)",
    petugas: "Ahli Gizi SPPG",
    status: "Final",
    createdAt: "2026-08-06T13:30:00Z",
    updatedAt: "2026-08-06T13:30:00Z",
    createdBy: "Ahli Gizi SPPG"
  }
];
function angkaKeTerbilang(angka) {
  const bilangan = [
    "",
    "Satu",
    "Dua",
    "Tiga",
    "Empat",
    "Lima",
    "Enam",
    "Tujuh",
    "Delapan",
    "Sembilan",
    "Sepuluh",
    "Sebelas"
  ];
  const n = Math.floor(Math.abs(angka));
  if (n === 0) return "Nol Rupiah";
  function terbilang(x) {
    if (x < 12) return bilangan[x];
    if (x < 20) return terbilang(x - 10) + " Belas";
    if (x < 100) return terbilang(Math.floor(x / 10)) + " Puluh" + (x % 10 !== 0 ? " " + terbilang(x % 10) : "");
    if (x < 200) return "Seratus" + (x % 100 !== 0 ? " " + terbilang(x % 100) : "");
    if (x < 1e3) return terbilang(Math.floor(x / 100)) + " Ratus" + (x % 100 !== 0 ? " " + terbilang(x % 100) : "");
    if (x < 2e3) return "Seribu" + (x % 1e3 !== 0 ? " " + terbilang(x % 1e3) : "");
    if (x < 1e6) return terbilang(Math.floor(x / 1e3)) + " Ribu" + (x % 1e3 !== 0 ? " " + terbilang(x % 1e3) : "");
    if (x < 1e9) return terbilang(Math.floor(x / 1e6)) + " Juta" + (x % 1e6 !== 0 ? " " + terbilang(x % 1e6) : "");
    return String(x);
  }
  return (terbilang(n) + " Rupiah").replace(/\s+/g, " ").trim();
}
var initialPetugasList = [
  {
    id: "PTG-001",
    nomor: "01",
    nama: "Budi Hartono",
    jabatan: "Kepala Juru Masak (Head Chef)",
    alamat: "Dusun Krajan RT 02 RW 01, Desa Krejengan, Kec. Krejengan, Kab. Probolinggo",
    besaranGaji: 15e4,
    telepon: "081234567801",
    status: "Aktif",
    tanggalMulai: "2026-01-02",
    nomorRekening: "0123-01-045678-50-1",
    namaBank: "BRI",
    keterangan: "Penanggung jawab operasional dapur dan olahan menu utama SPPG"
  },
  {
    id: "PTG-002",
    nomor: "02",
    nama: "Siti Maisaroh",
    jabatan: "Asisten Juru Masak",
    alamat: "Dusun Temenggungan RT 04 RW 02, Desa Krejengan, Kec. Krejengan, Kab. Probolinggo",
    besaranGaji: 125e3,
    telepon: "081234567802",
    status: "Aktif",
    tanggalMulai: "2026-01-05",
    nomorRekening: "0123-01-089765-53-2",
    namaBank: "BRI",
    keterangan: "Asisten pengolahan lauk pauk, telur, & sayuran"
  },
  {
    id: "PTG-003",
    nomor: "03",
    nama: "Ahmad Syarifudin",
    jabatan: "Petugas Pemorsian & Packing",
    alamat: "Jl. Raya Kraksaan No. 14, RT 01 RW 04, Kraksaan, Kab. Probolinggo",
    besaranGaji: 11e4,
    telepon: "081377889903",
    status: "Aktif",
    tanggalMulai: "2026-01-10",
    nomorRekening: "345-098-1122",
    namaBank: "BCA",
    keterangan: "Piket divisi pemorsian ompreng 2.808 porsi sasaran"
  },
  {
    id: "PTG-004",
    nomor: "04",
    nama: "Nurul Hidayati",
    jabatan: "Petugas Pemorsian & Packing",
    alamat: "Desa Karangren RT 01 RW 03, Kec. Krejengan, Kab. Probolinggo",
    besaranGaji: 11e4,
    telepon: "081566778804",
    status: "Aktif",
    tanggalMulai: "2026-01-10",
    nomorRekening: "142-00-9876543-1",
    namaBank: "Mandiri",
    keterangan: "Piket divisi pemorsian dan penimbangan gramatur menu"
  },
  {
    id: "PTG-005",
    nomor: "05",
    nama: "Joko Widodo Santoso",
    jabatan: "Driver Distribusi & Armada",
    alamat: "Dusun Krajan RT 03 RW 01, Desa Maron Kidul, Kab. Probolinggo",
    besaranGaji: 13e4,
    telepon: "081298765405",
    status: "Aktif",
    tanggalMulai: "2026-01-15",
    nomorRekening: "0123-01-033445-50-8",
    namaBank: "BRI",
    keterangan: "Driver GranMax Box Rute A (Temenggungan - Kraksaan)"
  },
  {
    id: "PTG-006",
    nomor: "06",
    nama: "Hendra Setiawan",
    jabatan: "Driver Distribusi & Armada",
    alamat: "Jl. Kyai Sekar No. 8, Kec. Pajarakan, Kab. Probolinggo",
    besaranGaji: 13e4,
    telepon: "081122334406",
    status: "Aktif",
    tanggalMulai: "2026-01-15",
    nomorRekening: "0123-01-055667-50-9",
    namaBank: "BRI",
    keterangan: "Driver BlindVan Box Rute B (Krejengan - Besuk)"
  },
  {
    id: "PTG-007",
    nomor: "07",
    nama: "Suminah",
    jabatan: "Petugas Cuci Ompreng & Sanitasi",
    alamat: "Dusun Temenggungan RT 02 RW 01, Desa Krejengan, Kab. Probolinggo",
    besaranGaji: 1e5,
    telepon: "081599887707",
    status: "Aktif",
    tanggalMulai: "2026-01-20",
    nomorRekening: "-",
    namaBank: "Tunai",
    keterangan: "Sanitasi ompreng stainless & sterilisasi wadah makanan"
  },
  {
    id: "PTG-008",
    nomor: "08",
    nama: "Rahmat Hidayat",
    jabatan: "Petugas Logistik & Gudang",
    alamat: "Desa Sentong RT 05 RW 02, Kec. Krejengan, Kab. Probolinggo",
    besaranGaji: 12e4,
    telepon: "081344556608",
    status: "Aktif",
    tanggalMulai: "2026-01-22",
    nomorRekening: "0123-01-077889-50-4",
    namaBank: "BRI",
    keterangan: "Penerimaan bahan baku datang & penataan gudang kering"
  },
  {
    id: "PTG-009",
    nomor: "09",
    nama: "Dewi Anggraini, S.Gz",
    jabatan: "Ahli Gizi & Pengawas Mutu",
    alamat: "Jl. Pahlawan No. 45, Kraksaan, Kab. Probolinggo",
    besaranGaji: 16e4,
    telepon: "081233445509",
    status: "Aktif",
    tanggalMulai: "2026-01-02",
    nomorRekening: "142-00-1122334-5",
    namaBank: "Mandiri",
    keterangan: "Pengawasan gizi, porsi, dan evaluasi food waste harian"
  },
  {
    id: "PTG-010",
    nomor: "10",
    nama: "Sugeng Riyadi",
    jabatan: "Petugas Kebersihan & Lingkungan",
    alamat: "Dusun Krajan RT 01 RW 02, Desa Krejengan, Kab. Probolinggo",
    besaranGaji: 95e3,
    telepon: "081622334410",
    status: "Aktif",
    tanggalMulai: "2026-02-01",
    nomorRekening: "-",
    namaBank: "Tunai",
    keterangan: "Kebersihan area luar dapur dan pembuangan limbah organik"
  }
];
var initialSlipGajiList = [
  {
    id: "SLIP-20261010-001",
    nomorSlip: "SLIP/SPPG/2026/10/001",
    tanggal: "2026-10-10",
    hariTanggalFormatted: "Sabtu, 10 Oktober 2026",
    petugasId: "PTG-001",
    nomorPetugas: "01",
    namaPetugas: "Budi Hartono",
    jabatan: "Kepala Juru Masak (Head Chef)",
    alamat: "Dusun Krajan RT 02 RW 01, Desa Krejengan, Kec. Krejengan, Kab. Probolinggo",
    kehadiranHari: 1,
    tarifGajiPerHari: 15e4,
    gajiPokokHarian: 15e4,
    uangMakanHarian: 0,
    uangTransportHarian: 0,
    uangLemburHarian: 0,
    bonusHarian: 0,
    totalPenghasilanKotor: 15e4,
    potonganHarian: 0,
    keteranganPotongan: "-",
    totalGajiBersih: 15e4,
    terbilang: "Seratus Lima Puluh Ribu Rupiah",
    metodePembayaran: "Tunai",
    statusPembayaran: "Lunas",
    tanggalBayar: "2026-10-10",
    jamBayar: "14:30 WIB",
    catatanTugas: "Piket operasional dapur memasak menu pagi 2.808 porsi tuntas",
    namaPenerima: "Budi Hartono",
    namaBendahara: "Hj. Siti Aminah, S.E.",
    namaKepalaSppg: "Sri Rohayu, S. Pd",
    createdAt: "2026-10-10T14:30:00Z",
    createdBy: "Bendahara SPPG"
  },
  {
    id: "SLIP-20261010-002",
    nomorSlip: "SLIP/SPPG/2026/10/002",
    tanggal: "2026-10-10",
    hariTanggalFormatted: "Sabtu, 10 Oktober 2026",
    petugasId: "PTG-002",
    nomorPetugas: "02",
    namaPetugas: "Siti Maisaroh",
    jabatan: "Asisten Juru Masak",
    alamat: "Dusun Temenggungan RT 04 RW 02, Desa Krejengan, Kec. Krejengan, Kab. Probolinggo",
    kehadiranHari: 1,
    tarifGajiPerHari: 125e3,
    gajiPokokHarian: 125e3,
    uangMakanHarian: 0,
    uangTransportHarian: 0,
    uangLemburHarian: 0,
    bonusHarian: 0,
    totalPenghasilanKotor: 125e3,
    potonganHarian: 0,
    keteranganPotongan: "-",
    totalGajiBersih: 125e3,
    terbilang: "Seratus Dua Puluh Lima Ribu Rupiah",
    metodePembayaran: "Tunai",
    statusPembayaran: "Lunas",
    tanggalBayar: "2026-10-10",
    jamBayar: "14:30 WIB",
    catatanTugas: "Pengolahan sayur sup buncis wortel dan lauk pendamping",
    namaPenerima: "Siti Maisaroh",
    namaBendahara: "Hj. Siti Aminah, S.E.",
    namaKepalaSppg: "Sri Rohayu, S. Pd",
    createdAt: "2026-10-10T14:30:00Z",
    createdBy: "Bendahara SPPG"
  },
  {
    id: "SLIP-20261010-003",
    nomorSlip: "SLIP/SPPG/2026/10/003",
    tanggal: "2026-10-10",
    hariTanggalFormatted: "Sabtu, 10 Oktober 2026",
    petugasId: "PTG-003",
    nomorPetugas: "03",
    namaPetugas: "Ahmad Syarifudin",
    jabatan: "Petugas Pemorsian & Packing",
    alamat: "Jl. Raya Kraksaan No. 14, RT 01 RW 04, Kraksaan, Kab. Probolinggo",
    kehadiranHari: 1,
    tarifGajiPerHari: 11e4,
    gajiPokokHarian: 11e4,
    uangMakanHarian: 0,
    uangTransportHarian: 0,
    uangLemburHarian: 0,
    bonusHarian: 0,
    totalPenghasilanKotor: 11e4,
    potonganHarian: 0,
    keteranganPotongan: "-",
    totalGajiBersih: 11e4,
    terbilang: "Seratus Sepuluh Ribu Rupiah",
    metodePembayaran: "Tunai",
    statusPembayaran: "Lunas",
    tanggalBayar: "2026-10-10",
    jamBayar: "14:35 WIB",
    catatanTugas: "Pemorsian ompreng porsi kecil dan porsi besar sekolah",
    namaPenerima: "Ahmad Syarifudin",
    namaBendahara: "Hj. Siti Aminah, S.E.",
    namaKepalaSppg: "Sri Rohayu, S. Pd",
    createdAt: "2026-10-10T14:35:00Z",
    createdBy: "Bendahara SPPG"
  },
  {
    id: "SLIP-20261010-005",
    nomorSlip: "SLIP/SPPG/2026/10/005",
    tanggal: "2026-10-10",
    hariTanggalFormatted: "Sabtu, 10 Oktober 2026",
    petugasId: "PTG-005",
    nomorPetugas: "05",
    namaPetugas: "Joko Widodo Santoso",
    jabatan: "Driver Distribusi & Armada",
    alamat: "Dusun Krajan RT 03 RW 01, Desa Maron Kidul, Kab. Probolinggo",
    kehadiranHari: 1,
    tarifGajiPerHari: 13e4,
    gajiPokokHarian: 13e4,
    uangMakanHarian: 0,
    uangTransportHarian: 0,
    uangLemburHarian: 0,
    bonusHarian: 0,
    totalPenghasilanKotor: 13e4,
    potonganHarian: 0,
    keteranganPotongan: "-",
    totalGajiBersih: 13e4,
    terbilang: "Seratus Tiga Puluh Ribu Rupiah",
    metodePembayaran: "Transfer Bank",
    statusPembayaran: "Lunas",
    tanggalBayar: "2026-10-10",
    jamBayar: "15:00 WIB",
    catatanTugas: "Pengantaran ompreng tepat waktu ke 6 titik sekolah Rute Kraksaan",
    namaPenerima: "Joko Widodo Santoso",
    namaBendahara: "Hj. Siti Aminah, S.E.",
    namaKepalaSppg: "Sri Rohayu, S. Pd",
    createdAt: "2026-10-10T15:00:00Z",
    createdBy: "Bendahara SPPG"
  },
  {
    id: "SLIP-20261010-007",
    nomorSlip: "SLIP/SPPG/2026/10/007",
    tanggal: "2026-10-10",
    hariTanggalFormatted: "Sabtu, 10 Oktober 2026",
    petugasId: "PTG-007",
    nomorPetugas: "07",
    namaPetugas: "Suminah",
    jabatan: "Petugas Cuci Ompreng & Sanitasi",
    alamat: "Dusun Temenggungan RT 02 RW 01, Desa Krejengan, Kab. Probolinggo",
    kehadiranHari: 1,
    tarifGajiPerHari: 1e5,
    gajiPokokHarian: 1e5,
    uangMakanHarian: 0,
    uangTransportHarian: 0,
    uangLemburHarian: 0,
    bonusHarian: 0,
    totalPenghasilanKotor: 1e5,
    potonganHarian: 0,
    keteranganPotongan: "-",
    totalGajiBersih: 1e5,
    terbilang: "Seratus Ribu Rupiah",
    metodePembayaran: "Tunai",
    statusPembayaran: "Lunas",
    tanggalBayar: "2026-10-10",
    jamBayar: "15:10 WIB",
    catatanTugas: "Pencucian & pengeringan higienis seluruh ompreng balik dari sekolah",
    namaPenerima: "Suminah",
    namaBendahara: "Hj. Siti Aminah, S.E.",
    namaKepalaSppg: "Sri Rohayu, S. Pd",
    createdAt: "2026-10-10T15:10:00Z",
    createdBy: "Bendahara SPPG"
  }
];
function formatHariTanggalIndo(dateStr) {
  try {
    const parts = dateStr.split("-");
    if (parts.length < 3) return dateStr;
    const date = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
    const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
    const months = [
      "Januari",
      "Februari",
      "Maret",
      "April",
      "Mei",
      "Juni",
      "Juli",
      "Agustus",
      "September",
      "Oktober",
      "November",
      "Desember"
    ];
    const hari = days[date.getDay()];
    const tanggal = date.getDate();
    const bulan = months[date.getMonth()];
    const tahun = date.getFullYear();
    return `${hari}, ${tanggal} ${bulan} ${tahun}`;
  } catch {
    return dateStr;
  }
}
function getNamaHariIndo(dateStr) {
  try {
    const parts = dateStr.split("-");
    if (parts.length < 3) return "";
    const date = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
    const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
    return days[date.getDay()] || "";
  } catch {
    return "";
  }
}
function getBulanRomawi(monthNumber) {
  const roman = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII"];
  return roman[monthNumber - 1] || "I";
}
var initialBastDocuments = [
  {
    id: "BAST-20261025-001",
    nomorBast: "0103/BAST/SPPG-TMG/X/2026",
    tanggal: "2026-10-25",
    hari: "Minggu",
    hariTanggalFormatted: "Minggu, 25 Oktober 2026",
    waktuPenerimaan: "................ WIB",
    instansiId: "LOC-TKZH",
    namaSekolah: "TK ZAINUL HASAN",
    alamatSekolah: "Jl. Raya Genggong, Pajarakan, Probolinggo",
    namaPic: "Lulut Biyadillah",
    telponPic: "085234834095",
    isDataLengkap: true,
    jumlahPaketMakanan: 221,
    jumlahAlatMakan: 221,
    namaSppg: "Satuan Pelayanan Pemenuhan Gizi (SPPG) Probolinggo Krejengan Temenggungan Yayasan Hafshawaty Pesantren Zainul Hasan Genggong Kecamatan Pajarakan Kabupaten Probolinggo",
    unitCode: "SPPG-TMG",
    namaTimDistribusi: "Tim Distribusi SPPG Hafshawaty 001 Genggong",
    namaPetugasDistribusi: "Abdus Salam",
    telponPetugasDistribusi: "085212581665",
    namaKepalaSppg: "Sri Rohayu, S.Pd.",
    jabatanKepalaSppg: "Kepala SPPG Probolinggo Krejengan Temenggungan",
    status: "SIAP_DICETAK",
    catatan: "Berita acara resmi serah terima paket MBG dan alat makan sesuai template acuan BGN",
    createdAt: "2026-10-25T07:15:00.000Z",
    updatedAt: "2026-10-25T07:15:00.000Z",
    createdBy: "Tim Distribusi"
  }
];
var initialRekapAbsensiList = [
  {
    id: "ABS-20261010",
    tanggal: "2026-10-10",
    hariTanggalFormatted: "Sabtu, 10 Oktober 2026",
    totalPetugas: 10,
    totalHadir: 5,
    totalSetengahHari: 0,
    totalSakit: 2,
    totalIzin: 2,
    totalAlpha: 1,
    totalMasuk: 5,
    totalTidakMasuk: 5,
    statusRekap: "Selesai",
    disinkronkanKeSlipGaji: true,
    tanggalSinkronisasi: "2026-10-10T14:20:00Z",
    diverifikasiOleh: "Bendahara SPPG & HRD",
    items: [
      {
        petugasId: "PTG-001",
        nomorPetugas: "01",
        namaPetugas: "Budi Hartono",
        jabatan: "Kepala Juru Masak (Head Chef)",
        besaranGaji: 15e4,
        statusAbsensi: "Hadir",
        kehadiranHari: 1,
        jamMasuk: "05:00",
        jamKeluar: "14:30",
        keterangan: "Piket operasional masak menu pagi tuntas"
      },
      {
        petugasId: "PTG-002",
        nomorPetugas: "02",
        namaPetugas: "Siti Maisaroh",
        jabatan: "Asisten Juru Masak",
        besaranGaji: 125e3,
        statusAbsensi: "Hadir",
        kehadiranHari: 1,
        jamMasuk: "05:15",
        jamKeluar: "14:30",
        keterangan: "Pengolahan sayur & lauk pendamping"
      },
      {
        petugasId: "PTG-003",
        nomorPetugas: "03",
        namaPetugas: "Ahmad Syarifudin",
        jabatan: "Petugas Pemorsian & Packing",
        besaranGaji: 11e4,
        statusAbsensi: "Hadir",
        kehadiranHari: 1,
        jamMasuk: "05:30",
        jamKeluar: "14:35",
        keterangan: "Pemorsian ompreng porsi kecil dan besar"
      },
      {
        petugasId: "PTG-004",
        nomorPetugas: "04",
        namaPetugas: "Siti Khodijah",
        jabatan: "Petugas Pemorsian & Packing",
        besaranGaji: 11e4,
        statusAbsensi: "Sakit",
        kehadiranHari: 0,
        jamMasuk: "-",
        jamKeluar: "-",
        keterangan: "Sakit demam & flu (surat dokter terlampir)"
      },
      {
        petugasId: "PTG-005",
        nomorPetugas: "05",
        namaPetugas: "Joko Widodo Santoso",
        jabatan: "Driver Distribusi & Armada",
        besaranGaji: 13e4,
        statusAbsensi: "Hadir",
        kehadiranHari: 1,
        jamMasuk: "05:30",
        jamKeluar: "15:00",
        keterangan: "Distribusi 6 rute sekolah tuntas tepat waktu"
      },
      {
        petugasId: "PTG-006",
        nomorPetugas: "06",
        namaPetugas: "Hendra Setiawan",
        jabatan: "Driver Distribusi & Armada",
        besaranGaji: 13e4,
        statusAbsensi: "Izin",
        kehadiranHari: 0,
        jamMasuk: "-",
        jamKeluar: "-",
        keterangan: "Izin urusan keluarga mendesak"
      },
      {
        petugasId: "PTG-007",
        nomorPetugas: "07",
        namaPetugas: "Suminah",
        jabatan: "Petugas Cuci Ompreng & Sanitasi",
        besaranGaji: 1e5,
        statusAbsensi: "Hadir",
        kehadiranHari: 1,
        jamMasuk: "06:00",
        jamKeluar: "15:10",
        keterangan: "Pencucian & sterilisasi ompreng balik"
      },
      {
        petugasId: "PTG-008",
        nomorPetugas: "08",
        namaPetugas: "Rahmat Hidayat",
        jabatan: "Petugas Logistik & Gudang",
        besaranGaji: 12e4,
        statusAbsensi: "Sakit",
        kehadiranHari: 0,
        jamMasuk: "-",
        jamKeluar: "-",
        keterangan: "Sakit rawat jalan puskesmas"
      },
      {
        petugasId: "PTG-009",
        nomorPetugas: "09",
        namaPetugas: "Dewi Anggraini, S.Gz",
        jabatan: "Ahli Gizi & Pengawas Mutu",
        besaranGaji: 16e4,
        statusAbsensi: "Izin",
        kehadiranHari: 0,
        jamMasuk: "-",
        jamKeluar: "-",
        keterangan: "Izin koordinasi dinas luar Puskesmas"
      },
      {
        petugasId: "PTG-010",
        nomorPetugas: "10",
        namaPetugas: "Sugeng Riyadi",
        jabatan: "Petugas Kebersihan & Lingkungan",
        besaranGaji: 95e3,
        statusAbsensi: "Alpha",
        kehadiranHari: 0,
        jamMasuk: "-",
        jamKeluar: "-",
        keterangan: "Tanpa keterangan"
      }
    ]
  }
];
var initialBarangDatang = [
  {
    id: "BD-20260908-001",
    hari: "Selasa",
    tanggal: "2026-09-08",
    hariTanggalFormatted: "Selasa, 08 September 2026",
    namaBarang: "Beras Premium Ramos",
    jumlahMasuk: 200,
    satuan: "Kg",
    jenisBarang: "Bahan Baku",
    kualitasProduk: "Baik",
    dokumentasiUrl: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600",
    keterangan: "Penerimaan beras karung 25kg x 8 karung, kemasan utuh dan kering",
    petugas: "Dapur Hafshawaty",
    createdAt: "2026-09-08T08:30:00Z",
    createdBy: "Dapur Hafshawaty"
  },
  {
    id: "BD-20260908-002",
    hari: "Selasa",
    tanggal: "2026-09-08",
    hariTanggalFormatted: "Selasa, 08 September 2026",
    namaBarang: "Daging Ayam Broiler Segar",
    jumlahMasuk: 75,
    satuan: "Kg",
    jenisBarang: "Bahan Baku",
    kualitasProduk: "Baik",
    dokumentasiUrl: "https://images.unsplash.com/photo-1604503468506-a8da13d82791?w=600",
    keterangan: "Kondisi dingin segar, sertifikat halal terlampir",
    petugas: "Staff Logistik",
    createdAt: "2026-09-08T09:15:00Z",
    createdBy: "Staff Logistik"
  },
  {
    id: "BD-20260908-003",
    hari: "Selasa",
    tanggal: "2026-09-08",
    hariTanggalFormatted: "Selasa, 08 September 2026",
    namaBarang: "Gas LPG 12 Kg",
    jumlahMasuk: 8,
    satuan: "Tabung",
    jenisBarang: "Operasional",
    kualitasProduk: "Baik",
    dokumentasiUrl: "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?w=600",
    keterangan: "Tabung terisi penuh, segel terpasang rapat dan aman",
    petugas: "Dapur Hafshawaty",
    createdAt: "2026-09-08T10:00:00Z",
    createdBy: "Dapur Hafshawaty"
  },
  {
    id: "BD-20260908-004",
    hari: "Selasa",
    tanggal: "2026-09-08",
    hariTanggalFormatted: "Selasa, 08 September 2026",
    namaBarang: "Plastik Wrap & Kemasan Ompreng",
    jumlahMasuk: 15,
    satuan: "Roll",
    jenisBarang: "Operasional",
    kualitasProduk: "Baik",
    dokumentasiUrl: "https://images.unsplash.com/photo-1607344645866-009c320c5ab8?w=600",
    keterangan: "Food grade wrapping untuk kemasan box makanan",
    petugas: "Staff Logistik",
    createdAt: "2026-09-08T11:20:00Z",
    createdBy: "Staff Logistik"
  },
  {
    id: "BD-20260907-001",
    hari: "Senin",
    tanggal: "2026-09-07",
    hariTanggalFormatted: "Senin, 07 September 2026",
    namaBarang: "Telur Ayam Ras Fresh",
    jumlahMasuk: 60,
    satuan: "Tray",
    jenisBarang: "Bahan Baku",
    kualitasProduk: "Baik",
    dokumentasiUrl: "https://images.unsplash.com/photo-1516467508483-a7212febe31a?w=600",
    keterangan: "Telur utuh tidak ada yang retak, grade A",
    petugas: "Dapur Hafshawaty",
    createdAt: "2026-09-07T08:00:00Z",
    createdBy: "Dapur Hafshawaty"
  },
  {
    id: "BD-20260907-002",
    hari: "Senin",
    tanggal: "2026-09-07",
    hariTanggalFormatted: "Senin, 07 September 2026",
    namaBarang: "Sabun Cuci Piring Cair 5L",
    jumlahMasuk: 6,
    satuan: "Jerigen",
    jenisBarang: "Operasional",
    kualitasProduk: "Baik",
    dokumentasiUrl: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600",
    keterangan: "Kebutuhan divisi cuci ompreng dan sanitasi dapur",
    petugas: "Staff Logistik",
    createdAt: "2026-09-07T13:40:00Z",
    createdBy: "Staff Logistik"
  }
];
var EnterpriseDataStore = class {
  constructor() {
    this.users = [...initialUsers];
    this.roles = [...initialRoles];
    this.menus = [...initialMenus];
    this.pegawai = [...initialPegawai];
    this.divisi = [...initialDivisi];
    this.jabatan = [...initialJabatan];
    this.gudang = [...initialGudang];
    this.kategori = [...initialKategori];
    this.instansi = [...initialInstansi];
    this.suratMasuk = [...initialSuratMasuk];
    this.suratKeluar = [...initialSuratKeluar];
    this.disposisi = [...initialDisposisi];
    this.templates = [...initialTemplateSurat];
    this.barang = [...initialMasterBarang];
    this.stockMovements = [...initialStockMovements];
    this.opnameSessions = [...initialStockOpnameSessions];
    this.kendaraan = [...initialKendaraan];
    this.laporanBbm = [...initialLaporanBbm];
    this.drivers = [...initialDrivers];
    this.distributionReports = [...initialDistributionReports];
    this.notifications = [...initialNotifications];
    this.activityLogs = [...initialActivityLogs];
    this.settings = { ...initialSettings };
    this.waDivisiSettings = [...initialWaDivisiSettings];
    this.taskTemplates = [...initialTaskTemplates];
    this.tugasDivisiRecords = (() => {
      const todayStr = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
      const divisionIds = ["persiapan", "pengolahan", "pemorsian", "distribusi", "cuci_ompreng"];
      return divisionIds.map((divId) => createDefaultTasksForDateAndDivisi(todayStr, divId));
    })();
    // --- KEDATANGAN BARANG STORE ---
    this.barangDatang = [...initialBarangDatang];
    // --- MENU HARIAN STORE ---
    this.menuHarian = [
      {
        id: "MH-20260928-001",
        tanggalOperasional: (() => {
          const d = /* @__PURE__ */ new Date();
          d.setDate(d.getDate() - 1);
          return d.toISOString().split("T")[0];
        })(),
        hari: "Senin",
        hariTanggalFormatted: "Senin, 28 September 2026",
        namaMenu: "Nasi Putih, Ayam Krispy & Saus Tomat, Tempe Balado, Acar Timun & Wortel, Jeruk Madu",
        kategoriPorsi: "Porsi Besar & Porsi Kecil",
        energiKkal: 698.9,
        proteinGram: 26.3,
        lemakGram: 27.9,
        karbohidratGram: 87.27,
        seratGram: 2.62,
        giziPorsiBesar: {
          energiKkal: 698.9,
          proteinGram: 26.3,
          lemakGram: 27.9,
          karbohidratGram: 87.27,
          seratGram: 2.62,
          keterangan: "Sasaran SD Kelas 4-6, SMP, SMA / Bumil & Busui"
        },
        giziPorsiKecil: {
          energiKkal: 609,
          proteinGram: 24.8,
          lemakGram: 27.75,
          karbohidratGram: 67.37,
          seratGram: 2.62,
          keterangan: "Sasaran PAUD, TK, SD Kelas 1-3 / Balita"
        },
        rincianKomponen: {
          karbohidrat: "Nasi Putih",
          laukHewani: "Ayam Krispy & Saus Tomat",
          laukNabati: "Tempe Balado",
          sayur: "Acar Timun & Wortel",
          buahSusu: "Jeruk Madu"
        },
        catatanGizi: "Memenuhi standar AKG harian program Makan Bergizi Gratis (MBG) Badan Gizi Nasional.",
        fotoMenuUrl: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&auto=format&fit=crop&q=80",
        fotoFileName: "menu-mbg-ayam-krispy.jpg",
        fotoFileSizeKb: 230,
        petugas: "Ahli Gizi SPPG",
        createdAt: new Date(Date.now() - 864e5).toISOString(),
        updatedAt: new Date(Date.now() - 864e5).toISOString(),
        createdBy: "Ahli Gizi SPPG"
      },
      {
        id: "MH-20260929-001",
        tanggalOperasional: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
        hari: "Selasa",
        hariTanggalFormatted: "Selasa, 29 September 2026",
        namaMenu: "Nasi Putih, Telur Ceplok Bumbu Balado, Tahu Krispy & Abon Sapi, Tumis Sawi Putih & Wortel, Apel Red",
        kategoriPorsi: "Porsi Besar & Porsi Kecil",
        energiKkal: 610.2,
        proteinGram: 13.1,
        lemakGram: 21.9,
        karbohidratGram: 88.34,
        seratGram: 3.66,
        giziPorsiBesar: {
          energiKkal: 610.2,
          proteinGram: 13.1,
          lemakGram: 21.9,
          karbohidratGram: 88.34,
          seratGram: 3.66,
          keterangan: "Sasaran SD Kelas 4-6, SMP, SMA / Bumil & Busui"
        },
        giziPorsiKecil: {
          energiKkal: 520,
          proteinGram: 11.6,
          lemakGram: 21.75,
          karbohidratGram: 68.44,
          seratGram: 3.66,
          keterangan: "Sasaran PAUD, TK, SD Kelas 1-3 / Balita"
        },
        rincianKomponen: {
          karbohidrat: "Nasi Putih",
          laukHewani: "Telur Ceplok Bumbu Balado",
          laukNabati: "Tahu Krispy & Abon Sapi",
          sayur: "Tumis Sawi Putih & Wortel",
          buahSusu: "Apel Red"
        },
        catatanGizi: "Memenuhi standar AKG harian program Makan Bergizi Gratis (MBG) Badan Gizi Nasional.",
        fotoMenuUrl: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&auto=format&fit=crop&q=80",
        fotoFileName: "menu-mbg-telur-balado.jpg",
        fotoFileSizeKb: 245,
        petugas: "Ahli Gizi SPPG",
        createdAt: (/* @__PURE__ */ new Date()).toISOString(),
        updatedAt: (/* @__PURE__ */ new Date()).toISOString(),
        createdBy: "Ahli Gizi SPPG"
      }
    ];
    // --- PENERIMA MANFAAT STORE DATA & METHODS ---
    this.beneficiaryGroups = [...initialBeneficiaryGroups];
    this.beneficiaryLocations = [...initialBeneficiaryLocations];
    this.dailyBeneficiaryRecords = [];
    this.beneficiaryAuditLogs = [];
    this.beneficiaryLockStatus = {};
    // --- NUTRITION & FOOD MATERIAL PLANNING STORE ---
    this.masterBahanPangan = [...initialMasterBahanPangan];
    this.masterMenuResep = [...initialMasterMenuResep];
    this.nutritionPlans = [...initialNutritionPlans];
    this.nutritionPlanItems = [...initialNutritionPlanItems];
    this.rabPlans = [];
    this.purchaseOrders = [];
    this.documentTemplate = JSON.parse(JSON.stringify(DEFAULT_MASTER_TEMPLATE_CONFIG));
    this.foodWasteRecords = [...initialFoodWasteRecords];
    this.petugasList = [...initialPetugasList];
    this.slipGajiList = [...initialSlipGajiList];
    this.rekapAbsensiList = [...initialRekapAbsensiList];
    this.bastDocuments = [...initialBastDocuments];
    this.suhuPengolahan = [];
    this.suhuMasukOmpreng = [];
    this.organoleptikRecords = [];
    this.appStateSync = {};
    // Global Config for RAB Tarifs & Pagu (persistent across all menu plannings)
    this.globalTarifConfig = {
      porsiKecil: 1e4,
      porsiBesar: 15e3,
      balita: 8500,
      bumilBusui: 12500
    };
    // Administration Etika Persuratan: Config for BAST numbering
    this.bastNumberConfig = {
      startNumber: 1,
      digitCount: 4,
      kodeJenisSurat: "BAST",
      kodeInstansi: "SPPG-TMG",
      resetMonthly: true
    };
    this.sanitizeCategories();
  }
  saveGlobalTarifConfig(newTarif) {
    this.globalTarifConfig = {
      porsiKecil: Number(newTarif.porsiKecil) || 1e4,
      porsiBesar: Number(newTarif.porsiBesar) || 15e3,
      balita: Number(newTarif.balita) || 8500,
      bumilBusui: Number(newTarif.bumilBusui) || 12500
    };
    this.rabPlans.forEach((plan, idx) => {
      if (plan.status !== "Final" && plan.status !== "Disetujui") {
        this.rabPlans[idx] = this.calculateRABPlan(plan.tanggalPelaksanaan, {
          ...plan,
          tarifConfig: this.globalTarifConfig
        });
      }
    });
    return this.globalTarifConfig;
  }
  // Helper method to compute and construct a synchronized RAB Plan
  calculateRABPlan(tanggal, customData) {
    const defaultTarif = this.globalTarifConfig || {
      porsiKecil: 1e4,
      porsiBesar: 15e3,
      balita: 8500,
      bumilBusui: 12500
    };
    const defaultKomposisi = {
      bahanPanganPersen: 100,
      // Penyerapan Pagu Anggaran harus 100% untuk Belanja Bahan Baku
      operasionalPersen: 0,
      kemasanDistribusiPersen: 0
    };
    const existingPlan = this.nutritionPlans.find((p) => p.tanggalPelaksanaan === tanggal);
    const benSummary = this.getBeneficiarySummaryForDate(tanggal);
    const pb = benSummary.portionBreakdown || {
      porsiBesar: 0,
      porsiKecil: 0,
      balita: 0,
      bumilBusui: 0
    };
    const planTargets = existingPlan?.targetCountsConfig;
    const hasAnyPlanning = Boolean(
      existingPlan || customData && (customData.itemsBahanBaku && customData.itemsBahanBaku.length > 0 || customData.biayaOperasionalItems && customData.biayaOperasionalItems.length > 0 || customData.namaMenu)
    );
    const resolvedKecil = customData?.targetCounts?.porsiKecil ?? planTargets?.porsiKecil ?? (hasAnyPlanning ? pb.porsiKecil || 0 : 0);
    const resolvedBesar = customData?.targetCounts?.porsiBesar ?? planTargets?.porsiBesar ?? (hasAnyPlanning ? pb.porsiBesar || 0 : 0);
    const resolvedBalita = customData?.targetCounts?.balita ?? planTargets?.balita ?? (hasAnyPlanning ? pb.balita || 0 : 0);
    const resolvedBumil = customData?.targetCounts?.bumilBusui ?? planTargets?.bumilBusui ?? (hasAnyPlanning ? pb.bumilBusui || 0 : 0);
    const targetCounts = {
      porsiKecil: resolvedKecil,
      porsiBesar: resolvedBesar,
      balita: resolvedBalita,
      bumilBusui: resolvedBumil,
      total: customData?.targetCounts?.total ?? resolvedKecil + resolvedBesar + resolvedBalita + resolvedBumil
    };
    const tarifConfig = customData?.tarifConfig || defaultTarif;
    const komposisiConfig = customData?.komposisiConfig || defaultKomposisi;
    const totalPaguAnggaran = targetCounts.porsiKecil * tarifConfig.porsiKecil + targetCounts.porsiBesar * tarifConfig.porsiBesar + targetCounts.balita * tarifConfig.balita + targetCounts.bumilBusui * tarifConfig.bumilBusui;
    const targetPenyerapanPagu = totalPaguAnggaran;
    const targetPlafondBahan = totalPaguAnggaran;
    const namaMenu = customData?.namaMenu ?? existingPlan?.menuName ?? "";
    let itemsBahanBaku = [];
    if (customData?.itemsBahanBaku && customData.itemsBahanBaku.length > 0) {
      itemsBahanBaku = customData.itemsBahanBaku.map((it, idx) => {
        const kebutuhanKg = Number(it.kebutuhanKg) || 0;
        const hargaSatuan = Number(it.hargaSatuan) || 0;
        const matchingMaster = this.masterBahanPangan.find((m) => m.namaBahan.toLowerCase() === (it.namaBahan || "").toLowerCase());
        const satuan = matchingMaster?.satuanPembelian || it.satuan || "Kg";
        return {
          ...it,
          no: idx + 1,
          kebutuhanKg,
          satuan,
          hargaSatuan,
          subtotal: Math.round(kebutuhanKg * hargaSatuan)
        };
      });
    } else if (existingPlan?.ingredientsData && existingPlan.ingredientsData.length > 0) {
      itemsBahanBaku = existingPlan.ingredientsData.map((ing, idx) => {
        const matchingMaster = this.masterBahanPangan.find((m) => m.namaBahan.toLowerCase() === (ing.bahanPangan || "").toLowerCase());
        const isTahu = (ing.bahanPangan || "").toLowerCase().includes("tahu");
        let kebutuhan = null;
        if (ing.pembulatan !== void 0 && ing.pembulatan !== null && ing.pembulatan !== "-") {
          const rawStr = String(ing.pembulatan).trim();
          if (rawStr) {
            if (rawStr.includes(",") && !rawStr.includes(".")) {
              kebutuhan = Number(rawStr.replace(",", "."));
            } else if (rawStr.includes(".") && !rawStr.includes(",")) {
              const parts = rawStr.split(".");
              if (parts.length === 2 && parts[1].length === 3 && Number(parts[0]) > 0 && !rawStr.startsWith("0.")) {
                kebutuhan = Number(parts.join(""));
              } else {
                kebutuhan = Number(rawStr);
              }
            } else {
              kebutuhan = Number(rawStr);
            }
          }
        }
        if (kebutuhan === null || isNaN(kebutuhan) || kebutuhan <= 0) {
          if (ing.totalPlusBuffer && !isNaN(Number(ing.totalPlusBuffer)) && Number(ing.totalPlusBuffer) > 0) {
            kebutuhan = Number(ing.totalPlusBuffer);
          } else if (ing.totalKebutuhan && !isNaN(Number(ing.totalKebutuhan)) && Number(ing.totalKebutuhan) > 0) {
            kebutuhan = Number(ing.totalKebutuhan);
          } else {
            const bdd = Number(ing.bddPercent) || 100;
            const safeBdd = bdd > 0 ? bdd / 100 : 1;
            const reqKecil = Number(ing.porsiKecilNet || 0) / safeBdd * targetCounts.porsiKecil / 1e3;
            const reqBesar = Number(ing.porsiBesarNet || 0) / safeBdd * targetCounts.porsiBesar / 1e3;
            const reqBalita = Number(ing.balitaNet || 0) / safeBdd * targetCounts.balita / 1e3;
            const reqBumil = Number(ing.bumilBusuiNet || 0) / safeBdd * targetCounts.bumilBusui / 1e3;
            const totalKg = reqKecil + reqBesar + reqBalita + reqBumil;
            kebutuhan = Number((totalKg * 1.05).toFixed(2));
          }
        }
        const harga = Number(ing.hargaPerKg || matchingMaster?.hargaDasarPerKg || (isTahu ? 1e4 : 15e3));
        const satuan = matchingMaster?.satuanPembelian || ing.satuan || "Kg";
        return {
          no: idx + 1,
          namaBahan: ing.bahanPangan || `Bahan ${idx + 1}`,
          kategori: matchingMaster?.kategori || (isTahu ? "Lauk Nabati" : "Bahan Pangan"),
          kebutuhanKg: kebutuhan,
          satuan,
          hargaSatuan: harga,
          subtotal: Math.round(kebutuhan * harga),
          sumberHarga: "Harga Acuan Pasar SPPG"
        };
      });
    } else {
      itemsBahanBaku = [];
    }
    const totalBiayaBahanBaku = itemsBahanBaku.reduce((acc, it) => acc + it.subtotal, 0);
    itemsBahanBaku = itemsBahanBaku.map((it) => ({
      ...it,
      bobotPersen: totalBiayaBahanBaku > 0 ? Number((it.subtotal / totalBiayaBahanBaku * 100).toFixed(1)) : 0
    }));
    const defaultOperasionalItems = [
      { id: "OPS-01", namaItem: "Gas LPG 50 Kg / 12 Kg Dapur Industri SPPG", kategori: "OPERASIONAL", volume: 2, satuan: "Tabung", hargaSatuan: 85e4, subtotal: 17e5, keterangan: "Bahan bakar memasak kapasitas besar" },
      { id: "OPS-02", namaItem: "Listrik, Air Bersih & Sanitasi Dapur", kategori: "OPERASIONAL", volume: 1, satuan: "Hari", hargaSatuan: 65e4, subtotal: 65e4, keterangan: "Utilitas dapur dan kebersihan standar HACCP" },
      { id: "OPS-03", namaItem: "Insentif & Upah Juru Masak / Tim Dapur (15 Orang)", kategori: "OPERASIONAL", volume: 15, satuan: "Orang/Hari", hargaSatuan: 175e3, subtotal: 2625e3, keterangan: "Tenaga persiapan, pengolahan, dan pemorsian" }
    ];
    const biayaOperasionalItems = customData?.biayaOperasionalItems ?? (existingPlan ? defaultOperasionalItems : []);
    const biayaKemasanDistribusiItems = [];
    const totalBiayaOperasional = biayaOperasionalItems.reduce((acc, it) => acc + it.subtotal, 0);
    const totalBiayaKemasanDistribusi = 0;
    const cadanganTakTerduga = customData?.cadanganTakTerduga ?? (hasAnyPlanning ? Math.round(totalPaguAnggaran * 0.02) : 0);
    const grandTotalRAB = totalBiayaBahanBaku + totalBiayaOperasional + cadanganTakTerduga;
    const sisaAnggaranPagu = totalPaguAnggaran - totalBiayaBahanBaku;
    const selisihPlafondBahan = sisaAnggaranPagu;
    const persentaseSerapanPagu = totalPaguAnggaran > 0 ? Number((totalBiayaBahanBaku / totalPaguAnggaran * 100).toFixed(1)) : 0;
    const persentaseFoodCost = persentaseSerapanPagu;
    const biayaPerPorsiRataRata = targetCounts.total > 0 ? Math.round(grandTotalRAB / targetCounts.total) : 0;
    let statusKelayakan = "HEMAT_EFISIEN";
    let keteranganStatus = "Belum ada aktivitas perencanaan kebutuhan bahan pangan untuk tanggal ini.";
    if (itemsBahanBaku.length > 0 || totalPaguAnggaran > 0) {
      if (persentaseSerapanPagu > 100) {
        statusKelayakan = "PERINGATAN_OVER_BUDGET";
        keteranganStatus = `Belanja bahan baku (${persentaseSerapanPagu}%) melebihi Pagu Anggaran 100% (Defisit Rp ${Math.abs(sisaAnggaranPagu).toLocaleString("id-ID")}). Perlu penyesuaian gramatur atau harga satuan.`;
      } else if (persentaseSerapanPagu < 98) {
        statusKelayakan = "HEMAT_EFISIEN";
        keteranganStatus = `Penyerapan Pagu Anggaran baru mencapai ${persentaseSerapanPagu}% (Target: 100%). Terdapat sisa alokasi Rp ${sisaAnggaranPagu.toLocaleString("id-ID")} yang belum terserap maksimal untuk bahan baku.`;
      } else {
        statusKelayakan = "OPTIMAL_SESUAI_PAGU";
        keteranganStatus = `Penyerapan Pagu Anggaran sangat presisi & optimal 100% (${persentaseSerapanPagu}%). Seluruh pagu teralokasikan tuntas untuk belanja bahan baku.`;
      }
    }
    const sortedItems = [...itemsBahanBaku].sort((a, b) => b.subtotal - a.subtotal);
    const topCostDrivers = sortedItems.slice(0, 5).map((it) => ({
      namaBahan: it.namaBahan,
      subtotal: it.subtotal,
      persen: totalBiayaBahanBaku > 0 ? Number((it.subtotal / totalBiayaBahanBaku * 100).toFixed(1)) : 0
    }));
    const analisis = {
      totalPaguAnggaran,
      targetPlafondBahan: totalPaguAnggaran,
      targetPenyerapanPagu,
      totalRealisasiBahan: totalBiayaBahanBaku,
      selisihPlafondBahan: sisaAnggaranPagu,
      sisaAnggaranPagu,
      persentaseFoodCost: persentaseSerapanPagu,
      persentaseSerapanPagu,
      biayaPerPorsiRataRata,
      statusKelayakan,
      keteranganStatus,
      topCostDrivers
    };
    const nowStr = (/* @__PURE__ */ new Date()).toISOString();
    return {
      id: customData?.id || `RAB-${tanggal.replace(/-/g, "")}-001`,
      tanggalPelaksanaan: tanggal,
      namaMenu,
      status: customData?.status || "Draft",
      targetCounts,
      tarifConfig,
      komposisiConfig,
      totalPaguAnggaran,
      itemsBahanBaku,
      totalBiayaBahanBaku,
      biayaOperasionalItems,
      totalBiayaOperasional,
      biayaKemasanDistribusiItems,
      totalBiayaKemasanDistribusi,
      cadanganTakTerduga,
      grandTotalRAB,
      analisis,
      catatan: customData?.catatan || "Rencana Anggaran Belanja (RAB) terintegrasi otomatis dengan Data Sasaran Penerima Manfaat & Lembar Kerja Gizi SPPG.",
      penanggungJawab: customData?.penanggungJawab || {
        nutritionistName: "Rina Wijaya, S.Gz., M.Gizi",
        kepalaSppgName: "Sri Rohayu, S. Pd",
        bendaharaName: "Hj. Siti Aminah, S.E."
      },
      createdAt: customData?.createdAt || nowStr,
      updatedAt: nowStr,
      approvedAt: customData?.approvedAt,
      approvedBy: customData?.approvedBy
    };
  }
  getOrCreateRABForDate(tanggal) {
    const existingIdx = this.rabPlans.findIndex((r) => r.tanggalPelaksanaan === tanggal);
    const existingPlan = this.nutritionPlans.find((p) => p.tanggalPelaksanaan === tanggal);
    if (existingIdx >= 0) {
      const existingRAB = this.rabPlans[existingIdx];
      if (existingPlan && existingPlan.ingredientsData && existingPlan.ingredientsData.length > 0) {
        const oldPriceMap = /* @__PURE__ */ new Map();
        (existingRAB.itemsBahanBaku || []).forEach((item) => {
          if (item.namaBahan) {
            oldPriceMap.set(item.namaBahan.toLowerCase(), item.hargaSatuan);
          }
        });
        const updated = this.calculateRABPlan(tanggal, {
          id: existingRAB.id,
          status: existingRAB.status,
          approvedAt: existingRAB.approvedAt,
          approvedBy: existingRAB.approvedBy,
          createdAt: existingRAB.createdAt,
          biayaOperasionalItems: existingRAB.biayaOperasionalItems,
          catatan: existingRAB.catatan,
          penanggungJawab: existingRAB.penanggungJawab
        });
        if (updated.itemsBahanBaku) {
          updated.itemsBahanBaku = updated.itemsBahanBaku.map((item) => {
            const oldPrice = oldPriceMap.get(item.namaBahan.toLowerCase());
            if (oldPrice && oldPrice > 0) {
              const hargaSatuan = oldPrice;
              return {
                ...item,
                hargaSatuan,
                subtotal: Math.round(item.kebutuhanKg * hargaSatuan)
              };
            }
            return item;
          });
          updated.totalBiayaBahanBaku = updated.itemsBahanBaku.reduce((sum, i) => sum + i.subtotal, 0);
          updated.grandTotalRAB = updated.totalBiayaBahanBaku + updated.totalBiayaOperasional + updated.cadanganTakTerduga;
          updated.analisis.totalRealisasiBahan = updated.totalBiayaBahanBaku;
          updated.analisis.selisihPlafondBahan = updated.totalPaguAnggaran - updated.totalBiayaBahanBaku;
          updated.analisis.sisaAnggaranPagu = updated.analisis.selisihPlafondBahan;
          updated.analisis.persentaseSerapanPagu = updated.totalPaguAnggaran > 0 ? Number((updated.totalBiayaBahanBaku / updated.totalPaguAnggaran * 100).toFixed(1)) : 0;
          updated.analisis.persentaseFoodCost = updated.analisis.persentaseSerapanPagu;
        }
        this.rabPlans[existingIdx] = updated;
        return updated;
      }
      if (existingRAB && existingRAB.itemsBahanBaku) {
        existingRAB.itemsBahanBaku = existingRAB.itemsBahanBaku.map((item) => {
          const matchingMaster = this.masterBahanPangan.find((m) => m.namaBahan.toLowerCase() === (item.namaBahan || "").toLowerCase());
          if (matchingMaster && matchingMaster.satuanPembelian) {
            return { ...item, satuan: matchingMaster.satuanPembelian };
          }
          return item;
        });
      }
      return existingRAB;
    }
    const computed = this.calculateRABPlan(tanggal);
    if (existingPlan) {
      this.rabPlans.push(computed);
    }
    return computed;
  }
  // --- PURCHASE ORDER (PO) CONSOLIDATION & DAILY GENERATION ALGORITHM ---
  aggregatePeriodPO(startDate, datesOverride, syncData) {
    let dates = [];
    if (datesOverride && datesOverride.length > 0) {
      dates = datesOverride.slice(0, 5);
    } else {
      const start = new Date(startDate || (/* @__PURE__ */ new Date()).toISOString().split("T")[0]);
      for (let i = 0; i < 5; i++) {
        const d = new Date(start);
        d.setDate(start.getDate() + i);
        dates.push(d.toISOString().split("T")[0]);
      }
    }
    const pStart = dates[0];
    const pEnd = dates[dates.length - 1];
    const batchId = `BATCH-${pStart.replace(/-/g, "")}-5D`;
    const defaultSupplier = {
      name: "KOPERASI KONSUMEN ZANTARA",
      address: "Dusun Krajan RT/RW 003/004, Temenggungan, Krejengan, Probolinggo",
      contact: "082319871985"
    };
    const defaultShipTo = {
      name: "SPPG KREJENGAN TEMENGGUNGAN",
      address: "Kantor Kesekretariatan SPPG, Temenggungan, Krejengan, Probolinggo",
      contact: "082333141643"
    };
    const rabs = dates.map((d) => this.getOrCreateRABForDate(d));
    const defaultRabBahanBaku = [
      { namaBarang: "Beras Premium Ramos (Steamer)", satuan: "Kg", totalKebutuhanKg: 291.6, hargaSatuan: 14500, totalAnggaran: 4228200 },
      { namaBarang: "Daging Ayam Broiler Fillet & Daging Sapi Segar", satuan: "Kg", totalKebutuhanKg: 189.5, hargaSatuan: 46e3, totalAnggaran: 8717e3 },
      { namaBarang: "Tempe Daun Kedelai & Tahu Segar", satuan: "Kg", totalKebutuhanKg: 145.8, hargaSatuan: 18e3, totalAnggaran: 2624400 },
      { namaBarang: "Sayuran Campur (Wortel, Buncis & Jagung Manis)", satuan: "Kg", totalKebutuhanKg: 175, hargaSatuan: 2e4, totalAnggaran: 35e5 },
      { namaBarang: "Buah Semangka Merah / Pisang Cavendish", satuan: "Kg", totalKebutuhanKg: 291.6, hargaSatuan: 24e3, totalAnggaran: 6998400 },
      { namaBarang: "Minyak Goreng Sawit & Bumbu Dapur Rempah Alami", satuan: "Kg", totalKebutuhanKg: 72.9, hargaSatuan: 27e3, totalAnggaran: 1968e3 }
    ];
    const defaultRabOpBarang = [
      { namaBarang: "Gas LPG 50 Kg & 12 Kg Dapur Sentral", satuan: "Tabung", jumlah: 4, hargaSatuan: 485e3, totalAnggaran: 194e4 },
      { namaBarang: "Plastik Wrap Roll & Paper Lunch Box Food Grade", satuan: "Pcs", jumlah: 2916, hargaSatuan: 1250, totalAnggaran: 3645e3 },
      { namaBarang: "Perlengkapan Kerja APD, Hairnet & Sabun Sanitasi", satuan: "Paket", jumlah: 1, hargaSatuan: 185e4, totalAnggaran: 185e4 },
      { namaBarang: "Perawatan Box Termal & Ice Gel Pendingin Armada", satuan: "Paket", jumlah: 1, hargaSatuan: 1313e3, totalAnggaran: 1313e3 }
    ];
    const defaultOperasionalLainnya = [
      { namaPengeluaran: "Tagihan Listrik PLN 3 Phase Dapur Pengolahan", satuan: "Bulan", biayaSatuan: 245e4, jumlahBiaya: 245e4 },
      { namaPengeluaran: "Paket Internet Fiber Optic Dedicated Portal Terpadu", satuan: "Bulan", biayaSatuan: 75e4, jumlahBiaya: 75e4 },
      { namaPengeluaran: "Uji Laboratorium Sampel Pangan & Mikrobiologi E.Coli", satuan: "Sampel", biayaSatuan: 12e5, jumlahBiaya: 12e5 }
    ];
    const dailyPOBahanBaku = [];
    const dailyPOOperasional = [];
    let overallBahanTotal = 0;
    let overallOpsTotal = 0;
    let overallPorsiTotal = 0;
    dates.forEach((d, idx) => {
      const r = rabs[idx];
      const pB = (r.targetCounts?.porsiBesar || 0) + (r.targetCounts?.bumilBusui || 0);
      const pK = (r.targetCounts?.porsiKecil || 0) + (r.targetCounts?.balita || 0);
      const dayPorsi = pB + pK;
      overallPorsiTotal += dayPorsi;
      const sourceBahanBaku = syncData?.rabBahanBaku && syncData.rabBahanBaku.length > 0 ? syncData.rabBahanBaku : r.itemsBahanBaku && r.itemsBahanBaku.length > 0 ? r.itemsBahanBaku : defaultRabBahanBaku;
      const itemsBahan = sourceBahanBaku.map((item, iIdx) => {
        const name = item.namaBarang || item.namaBahan || "Bahan Baku";
        const key = name.trim().toLowerCase();
        const masterMatch = this.masterBahanPangan.find((m) => m.namaBahan.toLowerCase() === key);
        const unit = item.satuan || masterMatch?.satuanPembelian || "Kg";
        const price = item.hargaSatuan || masterMatch?.hargaDasarPerKg || 0;
        const qty = item.pembulatan !== void 0 ? item.pembulatan : item.totalKebutuhanKg !== void 0 ? item.totalKebutuhanKg : item.kebutuhanKg !== void 0 ? item.kebutuhanKg : item.jumlah !== void 0 ? item.jumlah : 1;
        const total = item.totalAnggaran || Math.round(Number(qty) * price);
        return {
          no: iIdx + 1,
          details: name,
          qty: Math.round(Number(qty) * 100) / 100,
          unit,
          unitPrice: price,
          totalPrice: total,
          category: "Bahan Baku"
        };
      });
      const dayBahanAmount = itemsBahan.reduce((sum, i) => sum + i.totalPrice, 0);
      overallBahanTotal += dayBahanAmount;
      const dateClean = d.replace(/-/g, "");
      const dParts = d.split("-");
      const menuDateObj = new Date(Number(dParts[0]), Number(dParts[1]) - 1, Number(dParts[2]));
      const arrivalDateObj = new Date(menuDateObj);
      arrivalDateObj.setDate(arrivalDateObj.getDate() - 1);
      const arrY = arrivalDateObj.getFullYear();
      const arrM = String(arrivalDateObj.getMonth() + 1).padStart(2, "0");
      const arrD = String(arrivalDateObj.getDate()).padStart(2, "0");
      const targetArrivalDate = `${arrY}-${arrM}-${arrD}`;
      const dailyPOBahanDoc = {
        id: `PO-${d}-BB-${batchId}`,
        poNumber: `040-H${idx + 1}/PO-SPPG/HAF/${dateClean}`,
        poType: "Bahan Baku",
        periodeBatchId: batchId,
        dayIndex: idx + 1,
        dayLabel: `Hari ${idx + 1} dari 5 (Menu: ${d} | Tiba: ${targetArrivalDate})`,
        periodeStartDate: pStart,
        periodeEndDate: pEnd,
        periodeDates: dates,
        date: d,
        orderDate: d,
        targetArrivalDate,
        estimatedArrival: `${targetArrivalDate} Pkl 16:00 WIB (H-1)`,
        porsiBesar: pB,
        porsiKecil: pK,
        totalPorsi: dayPorsi,
        menuSummary: r.namaMenu || "MENU PANGAN SPPG HARIAN",
        supplier: defaultSupplier,
        shipTo: defaultShipTo,
        pemesan: "Muhammad Fadil, S. Akun",
        approvedBy: "SRI ROHAYU, S. Pd",
        approvedTitle: "Kepala Satuan Pelayanan Pemenuhan Gizi",
        items: itemsBahan,
        totalAmount: dayBahanAmount,
        additionalNotes: `Tanggal Pemesanan (Menu): ${d}. Target Tiba / Kedatangan Barang (H-1): ${targetArrivalDate} pkl 16:00 WIB (Satu hari sebelum tanggal masak).`,
        status: "Draft",
        createdAt: (/* @__PURE__ */ new Date()).toISOString(),
        updatedAt: (/* @__PURE__ */ new Date()).toISOString()
      };
      dailyPOBahanBaku.push(dailyPOBahanDoc);
      const sourceOpBarang = syncData?.rabOpBarang && syncData.rabOpBarang.length > 0 ? syncData.rabOpBarang : defaultRabOpBarang;
      const sourceOpLainnya = syncData?.operasionalLainnya && syncData.operasionalLainnya.length > 0 ? syncData.operasionalLainnya : defaultOperasionalLainnya;
      const itemsOpBarang = sourceOpBarang.map((item) => ({
        no: 0,
        details: item.namaBarang || item.namaItem || "Operasional Barang Dapur",
        qty: Math.round(Number(item.jumlah || item.volume || 1) * 100) / 100,
        unit: item.satuan || "Paket",
        unitPrice: item.hargaSatuan || 0,
        totalPrice: item.totalAnggaran || Math.round(Number(item.jumlah || item.volume || 1) * (item.hargaSatuan || 0)),
        category: "Operasional"
      }));
      const itemsOpLainnya = sourceOpLainnya.map((item) => {
        const price = item.biayaSatuan !== void 0 ? item.biayaSatuan : item.jumlahBiaya || 0;
        return {
          no: 0,
          details: item.namaPengeluaran || item.keterangan || "Operasional Lainnya (Utilitas/Lab)",
          qty: 1,
          unit: item.satuan || item.kategori || "Bulan",
          unitPrice: price,
          totalPrice: item.jumlahBiaya || price,
          category: "Operasional"
        };
      });
      const itemsOps = [...itemsOpBarang, ...itemsOpLainnya].map((it, oIdx) => ({
        ...it,
        no: oIdx + 1
      }));
      const dayOpsAmount = itemsOps.reduce((sum, i) => sum + i.totalPrice, 0);
      overallOpsTotal += dayOpsAmount;
      const dailyPOOpsDoc = {
        id: `PO-${d}-OPS-${batchId}`,
        poNumber: `041-H${idx + 1}/PO-SPPG/HAF/${dateClean}`,
        poType: "Operasional",
        periodeBatchId: batchId,
        dayIndex: idx + 1,
        dayLabel: `Hari ${idx + 1} dari 5 (Menu: ${d} | Tiba: ${targetArrivalDate})`,
        periodeStartDate: pStart,
        periodeEndDate: pEnd,
        periodeDates: dates,
        date: d,
        orderDate: d,
        targetArrivalDate,
        estimatedArrival: `${targetArrivalDate} Pkl 16:00 WIB (H-1)`,
        porsiBesar: pB,
        porsiKecil: pK,
        totalPorsi: dayPorsi,
        menuSummary: `PENGADAAN BARANG & OPERASIONAL LAINNYA (${d})`,
        supplier: defaultSupplier,
        shipTo: defaultShipTo,
        pemesan: "Muhammad Fadil, S. Akun",
        approvedBy: "SRI ROHAYU, S. Pd",
        approvedTitle: "Kepala Satuan Pelayanan Pemenuhan Gizi",
        items: itemsOps,
        totalAmount: dayOpsAmount,
        additionalNotes: `Tanggal Pemesanan: ${d}. Target Tiba / Realisasi (H-1): ${targetArrivalDate} pkl 16:00 WIB. Konsolidasi gabungan RAB Operasional Pengadaan Barang & Operasional Lainnya.`,
        status: "Draft",
        createdAt: (/* @__PURE__ */ new Date()).toISOString(),
        updatedAt: (/* @__PURE__ */ new Date()).toISOString()
      };
      dailyPOOperasional.push(dailyPOOpsDoc);
    });
    const poBahanBaku = {
      poType: "Bahan Baku",
      periodeBatchId: batchId,
      periodeStartDate: pStart,
      periodeEndDate: pEnd,
      periodeDates: dates,
      poNumber: `040-BATCH/PO-SPPG/HAF/${pStart.replace(/-/g, "")}`,
      date: pStart,
      estimatedArrival: `${pStart} s/d ${pEnd}`,
      porsiBesar: dailyPOBahanBaku.reduce((s, d) => s + d.porsiBesar, 0),
      porsiKecil: dailyPOBahanBaku.reduce((s, d) => s + d.porsiKecil, 0),
      totalPorsi: overallPorsiTotal,
      menuSummary: dailyPOBahanBaku.map((d) => `${d.dayLabel.split(" ")[0]}: ${d.menuSummary}`).join(" | "),
      supplier: defaultSupplier,
      shipTo: defaultShipTo,
      pemesan: "Muhammad Fadil, S. Akun",
      approvedBy: "SRI ROHAYU, S. Pd",
      approvedTitle: "Kepala Satuan Pelayanan Pemenuhan Gizi",
      items: dailyPOBahanBaku[0]?.items || [],
      totalAmount: overallBahanTotal,
      status: "Draft"
    };
    const poOperasional = {
      poType: "Operasional",
      periodeBatchId: batchId,
      periodeStartDate: pStart,
      periodeEndDate: pEnd,
      periodeDates: dates,
      poNumber: `041-BATCH/PO-SPPG/HAF/${pStart.replace(/-/g, "")}`,
      date: pStart,
      estimatedArrival: `${pStart} s/d ${pEnd}`,
      porsiBesar: dailyPOOperasional.reduce((s, d) => s + d.porsiBesar, 0),
      porsiKecil: dailyPOOperasional.reduce((s, d) => s + d.porsiKecil, 0),
      totalPorsi: overallPorsiTotal,
      menuSummary: "OPERASIONAL DAPUR PERIODE 5 HARI (SISTEM HARIAN)",
      supplier: defaultSupplier,
      shipTo: defaultShipTo,
      pemesan: "Muhammad Fadil, S. Akun",
      approvedBy: "SRI ROHAYU, S. Pd",
      approvedTitle: "Kepala Satuan Pelayanan Pemenuhan Gizi",
      items: dailyPOOperasional[0]?.items || [],
      totalAmount: overallOpsTotal,
      status: "Draft"
    };
    return {
      batchId,
      poBahanBaku,
      poOperasional,
      dailyPOBahanBaku,
      dailyPOOperasional,
      periodeDates: dates,
      periodSummary: {
        totalBahanBaku: overallBahanTotal,
        totalOperasional: overallOpsTotal,
        grandTotal: overallBahanTotal + overallOpsTotal,
        totalPorsi5Hari: overallPorsiTotal
      }
    };
  }
  ensureInitialPOs() {
    if (this.purchaseOrders.length === 0) {
      const todayStr = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
      const aggregated = this.aggregatePeriodPO(todayStr);
      const allDaily = [...aggregated.dailyPOBahanBaku, ...aggregated.dailyPOOperasional];
      allDaily.forEach((po, idx) => {
        if (idx === 0 || idx === 5) {
          po.status = "Dikonfirmasi Admin";
          po.adminConfirmation = {
            isConfirmed: true,
            confirmedAt: new Date(Date.now() - 36e5).toISOString(),
            confirmedBy: "SRI ROHAYU, S. Pd",
            notes: "PO telah diverifikasi dan dikonfirmasi Admin SPPG untuk segera dibelanjakan oleh Supplier."
          };
        } else if (idx === 1 || idx === 6) {
          po.status = "Diproses Belanja";
          po.adminConfirmation = {
            isConfirmed: true,
            confirmedAt: new Date(Date.now() - 72e5).toISOString(),
            confirmedBy: "SRI ROHAYU, S. Pd",
            notes: "Disetujui belanja pasar subuh."
          };
          po.supplierShoppingStatus = {
            isAccepted: true,
            acceptedAt: new Date(Date.now() - 54e5).toISOString(),
            acceptedBy: "Budi Santoso (Koperasi Zantara)",
            isShopping: true,
            shoppingStartedAt: new Date(Date.now() - 18e5).toISOString(),
            checkedItemIndexes: [0, 1, 2]
          };
        } else {
          po.status = "Draft";
        }
        this.purchaseOrders.push(po);
      });
    }
  }
  getAllPO() {
    this.ensureInitialPOs();
    return this.purchaseOrders;
  }
  getSupplierPortalPOs() {
    this.ensureInitialPOs();
    return this.purchaseOrders.filter((p) => p.status !== "Draft");
  }
  confirmPOByAdmin(poId, confirmedBy, notes) {
    this.ensureInitialPOs();
    const targetPOs = this.purchaseOrders.filter((p) => p.id === poId || p.poNumber === poId || p.periodeBatchId === poId);
    if (targetPOs.length === 0) return null;
    const now = (/* @__PURE__ */ new Date()).toISOString();
    targetPOs.forEach((po) => {
      po.status = "Dikonfirmasi Admin";
      po.adminConfirmation = {
        isConfirmed: true,
        confirmedAt: now,
        confirmedBy: confirmedBy || "SRI ROHAYU, S. Pd (Kepala SPPG)",
        notes: notes || "PO telah diverifikasi dan dikonfirmasi resmi oleh Admin SPPG untuk dibelanjakan oleh Supplier."
      };
      po.updatedAt = now;
    });
    this.addNotification(
      "Perencanaan Bahan",
      "PO Dikonfirmasi Admin SPPG",
      `PO ${targetPOs[0].poNumber} telah dikonfirmasi oleh Admin dan sekarang tampil di Status Pemesanan Portal Supplier.`,
      "success",
      "/portal-supplier"
    );
    return targetPOs[0];
  }
  confirmPOBatchByAdmin(poIds, confirmedBy, notes) {
    this.ensureInitialPOs();
    const confirmed = [];
    poIds.forEach((id) => {
      const res = this.confirmPOByAdmin(id, confirmedBy, notes);
      if (res && !confirmed.some((c) => c.id === res.id)) {
        confirmed.push(res);
      }
    });
    return confirmed;
  }
  updatePOSupplierShoppingProgress(poId, status, supplierData) {
    this.ensureInitialPOs();
    const targetPOs = this.purchaseOrders.filter((p) => p.id === poId || p.poNumber === poId);
    if (targetPOs.length === 0) return null;
    const now = (/* @__PURE__ */ new Date()).toISOString();
    targetPOs.forEach((po) => {
      po.status = status;
      po.supplierShoppingStatus = {
        ...po.supplierShoppingStatus || {},
        isAccepted: true,
        acceptedAt: po.supplierShoppingStatus?.acceptedAt || now,
        acceptedBy: supplierData?.acceptedBy || po.supplierShoppingStatus?.acceptedBy || "Petugas Pengadaan Supplier",
        isShopping: status === "Diproses Belanja" || po.supplierShoppingStatus?.isShopping,
        shoppingStartedAt: status === "Diproses Belanja" ? now : po.supplierShoppingStatus?.shoppingStartedAt,
        isDispatched: status === "Dikirim Supplier" || po.supplierShoppingStatus?.isDispatched,
        dispatchedAt: status === "Dikirim Supplier" ? now : po.supplierShoppingStatus?.dispatchedAt,
        driverName: supplierData?.driverName || po.supplierShoppingStatus?.driverName,
        driverPhone: supplierData?.driverPhone || po.supplierShoppingStatus?.driverPhone,
        driverPlate: supplierData?.driverPlate || po.supplierShoppingStatus?.driverPlate,
        checkedItemIndexes: supplierData?.checkedItemIndexes !== void 0 ? supplierData.checkedItemIndexes : po.supplierShoppingStatus?.checkedItemIndexes,
        notes: supplierData?.notes || po.supplierShoppingStatus?.notes
      };
      if (status === "Dikonfirmasi Supplier") {
        po.supplierConfirmation = {
          isConfirmed: true,
          confirmedAt: now,
          confirmedBy: supplierData?.acceptedBy || "Koperasi Zantara",
          notes: supplierData?.notes || "Pesanan telah diterima & disanggupi untuk dibelanjakan"
        };
      }
      po.updatedAt = now;
    });
    return targetPOs[0];
  }
  savePOBatch(batch) {
    const saved = [];
    batch.forEach((item) => {
      saved.push(this.savePO(item));
    });
    return saved;
  }
  confirmPOBySupplier(poId, confirmedBy, notes) {
    const targetPOs = this.purchaseOrders.filter((p) => p.id === poId || p.poNumber === poId || p.periodeBatchId === poId);
    if (targetPOs.length === 0) return null;
    const now = (/* @__PURE__ */ new Date()).toISOString();
    targetPOs.forEach((po) => {
      po.status = "Dikonfirmasi Supplier";
      po.supplierConfirmation = {
        isConfirmed: true,
        confirmedAt: now,
        confirmedBy: confirmedBy || "Koperasi Zantara",
        notes: notes || "PO Harian telah diterima dan disetujui untuk dikirimkan sesuai jadwal."
      };
      po.updatedAt = now;
    });
    return targetPOs[0];
  }
  savePO(data) {
    const existingIdx = this.purchaseOrders.findIndex((p) => p.id === data.id);
    const now = (/* @__PURE__ */ new Date()).toISOString();
    const orderDate = data.orderDate || data.date || now.split("T")[0];
    let targetArrivalDate = data.targetArrivalDate;
    if (!targetArrivalDate && orderDate) {
      const parts = orderDate.split("-");
      if (parts.length === 3) {
        const dObj = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
        dObj.setDate(dObj.getDate() - 1);
        const y = dObj.getFullYear();
        const m = String(dObj.getMonth() + 1).padStart(2, "0");
        const d = String(dObj.getDate()).padStart(2, "0");
        targetArrivalDate = `${y}-${m}-${d}`;
      }
    }
    const poDoc = {
      id: data.id || `PO-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      poNumber: data.poNumber || `PO-${Date.now()}`,
      poType: data.poType || "Bahan Baku",
      periodeStartDate: data.periodeStartDate || now.split("T")[0],
      periodeEndDate: data.periodeEndDate || now.split("T")[0],
      periodeDates: data.periodeDates || [],
      date: orderDate,
      orderDate,
      targetArrivalDate: targetArrivalDate || orderDate,
      estimatedArrival: data.estimatedArrival || (targetArrivalDate ? `${targetArrivalDate} Pkl 16:00 WIB (H-1)` : now.split("T")[0]),
      porsiBesar: data.porsiBesar || 0,
      porsiKecil: data.porsiKecil || 0,
      totalPorsi: (data.porsiBesar || 0) + (data.porsiKecil || 0),
      menuSummary: data.menuSummary || "",
      supplier: data.supplier || { name: "KOPERASI KONSUMEN ZANTARA", address: "", contact: "" },
      shipTo: data.shipTo || { name: "SPPG KREJENGAN TEMENGGUNGAN", address: "", contact: "" },
      pemesan: data.pemesan || "Muhammad Fadil, S. Akun",
      approvedBy: data.approvedBy || "SRI ROHAYU, S. Pd",
      approvedTitle: data.approvedTitle || "Kepala Satuan Pelayanan Pemenuhan Gizi",
      items: data.items || [],
      totalAmount: data.totalAmount || (data.items || []).reduce((sum, i) => sum + i.totalPrice, 0),
      additionalNotes: data.additionalNotes || "",
      status: data.status || "Draft",
      createdAt: data.createdAt || now,
      updatedAt: now
    };
    if (existingIdx >= 0) {
      this.purchaseOrders[existingIdx] = poDoc;
    } else {
      this.purchaseOrders.unshift(poDoc);
    }
    return poDoc;
  }
  deletePO(id) {
    const initialLen = this.purchaseOrders.length;
    this.purchaseOrders = this.purchaseOrders.filter((p) => p.id !== id);
    return this.purchaseOrders.length < initialLen;
  }
  getTargetCountForDateAndGroup(tanggal, groupNama) {
    const summary = this.getBeneficiarySummaryForDate(tanggal);
    const pb = summary.portionBreakdown;
    const target = (groupNama || "").toUpperCase();
    let count = 0;
    if (target.includes("PORSI BESAR") || target.includes("SD KELAS 4-6") || target.includes("SMA") || target.includes("SMP")) {
      count = pb?.porsiBesar || 0;
    } else if (target.includes("PORSI KECIL") || target.includes("SD KELAS 1-3") || target.includes("PAUD") || target.includes("TK")) {
      count = pb?.porsiKecil || 0;
    } else if (target.includes("BALITA")) {
      count = pb?.balita || 0;
    } else if (target.includes("HAMIL") || target.includes("MENYUSUI") || target.includes("BUMIL") || target.includes("BUSUI")) {
      count = pb?.bumilBusui || 0;
    } else if (target.includes("GURU") || target.includes("STAF")) {
      count = summary.totalGuru || 0;
    } else {
      const recs = this.getBeneficiaryRecordsForDate(tanggal);
      const filtered = recs.filter((r) => {
        const gName = (r.groupNama || "").toUpperCase();
        return gName.includes(target) || target.includes(gName) || r.kategori && r.kategori.toUpperCase().includes(target);
      });
      if (filtered.length > 0) {
        count = filtered.reduce((acc, curr) => acc + curr.totalPenerima, 0);
      } else {
        count = summary.totalPenerima || 0;
      }
    }
    if (count === 0 && Array.isArray(this.beneficiaryGroups) && this.beneficiaryGroups.length > 0) {
      let fallbackSum = 0;
      this.beneficiaryGroups.forEach((g) => {
        const gKlas = g.klasifikasiPorsi || "Porsi Besar";
        const isMatch = target.includes("PORSI BESAR") && gKlas === "Porsi Besar" || target.includes("PORSI KECIL") && gKlas === "Porsi Kecil" || target.includes("BALITA") && (gKlas === "Balita" || g.nama.toUpperCase().includes("BALITA")) || (target.includes("BUMIL") || target.includes("BUSUI") || target.includes("HAMIL") || target.includes("MENYUSUI")) && (gKlas === "Bumil & Busui" || g.nama.toUpperCase().includes("HAMIL") || g.nama.toUpperCase().includes("MENYUSUI"));
        if (isMatch) {
          if (Array.isArray(g.lembagaList) && g.lembagaList.length > 0) {
            g.lembagaList.forEach((l) => {
              const tSiswa = Number(l.targetSiswa) || 0;
              const tGuru = Number(l.targetGuru) || 0;
              const tBalita = Number(l.targetBalita) || 0;
              const tBumil = Number(l.targetBumilBusui) || 0;
              if (target.includes("BALITA")) fallbackSum += tBalita || tSiswa;
              else if (target.includes("BUMIL") || target.includes("BUSUI") || target.includes("HAMIL")) fallbackSum += tBumil || tSiswa;
              else fallbackSum += tSiswa + tGuru;
            });
          }
        }
      });
      if (fallbackSum > 0) return fallbackSum;
    }
    if (count > 0) return count;
    if (target.includes("PORSI BESAR")) return 618;
    if (target.includes("PORSI KECIL")) return 481;
    if (target.includes("BALITA")) return 100;
    if (target.includes("BUMIL") || target.includes("BUSUI")) return 51;
    return summary.totalPenerima || 1250;
  }
  getBeneficiaryRecordsForDate(tanggal) {
    return this.dailyBeneficiaryRecords.filter(
      (r) => r.tanggal === tanggal && r.createdBy !== "System Copy" && !(r.createdBy === "USR-001" && r.createdAt?.endsWith("06:30:00"))
    );
  }
  getBeneficiarySummaryForDate(tanggal) {
    const recs = this.getBeneficiaryRecordsForDate(tanggal);
    if (recs.length === 0) {
      return {
        tanggal,
        hasPlanning: false,
        totalPenerima: 0,
        totalPorsi: 0,
        totalKelompok: 0,
        totalInstansi: 0,
        totalBalita: 0,
        totalIbuHamil: 0,
        totalIbuMenyusui: 0,
        totalSiswa: 0,
        totalGuru: 0,
        portionBreakdown: {
          porsiBesar: 0,
          porsiKecil: 0,
          porsiBalita: 0,
          porsiIbuHamil: 0,
          porsiIbuMenyusui: 0,
          balita: 0,
          bumilBusui: 0
        },
        statusLock: "DRAFT"
      };
    }
    const allFinal = recs.every((r) => r.status === "FINAL");
    const lockInfo = this.beneficiaryLockStatus[tanggal] || {
      status: allFinal ? "FINAL" : "DRAFT",
      finalizedBy: allFinal ? recs.find((r) => r.finalizedBy)?.finalizedBy : void 0,
      finalizedAt: allFinal ? recs.find((r) => r.finalizedAt)?.finalizedAt : void 0
    };
    const effectiveStatusLock = lockInfo.status === "FINAL" || allFinal ? "FINAL" : "DRAFT";
    let totalPenerima = 0;
    let totalBalita = 0;
    let totalIbuHamil = 0;
    let totalIbuMenyusui = 0;
    let totalSiswa = 0;
    let totalGuru = 0;
    const groupSet = /* @__PURE__ */ new Set();
    const instansiSet = /* @__PURE__ */ new Set();
    let porsiBesar = 0;
    let porsiKecil = 0;
    let porsiBesarSekolah = 0;
    let porsiKecilSekolah = 0;
    recs.forEach((r) => {
      totalPenerima += r.totalPenerima;
      groupSet.add(r.groupNama || r.groupId);
      instansiSet.add(r.namaInstansi);
      const upperGroup = (r.groupNama || "").toUpperCase();
      const loc = this.beneficiaryLocations.find((l) => l.id === r.locationId || l.namaInstansi.trim().toLowerCase() === r.namaInstansi.trim().toLowerCase());
      const grp = this.beneficiaryGroups.find((g) => g.id === r.groupId || g.nama.toUpperCase() === upperGroup);
      const klas = r.klasifikasiPorsi || loc?.klasifikasiPorsi || grp?.klasifikasiPorsi || r.groupNama;
      const normInst = r.namaInstansi.toLowerCase();
      const is3B = upperGroup.includes("3B") || normInst.includes("posyandu") || normInst.includes("temenggungan") || r.kategoriLembaga && r.kategoriLembaga.includes("3B");
      let itemS = 0;
      let itemG = 0;
      let itemB = 0;
      let itemIh = 0;
      let itemIm = 0;
      if (r.statusKbm === "Libur Full" || r.totalPenerima === 0) {
      } else if (is3B) {
        const bd = r.breakdownKelas || r.rincianSasaran?.breakdownKelas || loc?.breakdownKelas || {};
        let bdBumil = Number(r.rincianSasaran?.ibuHamil) || Number(bd.bumil_w ?? bd.bumil) || 0;
        let bdBusui = Number(r.rincianSasaran?.ibuMenyusui) || Number(bd.busui_w ?? bd.busui) || 0;
        let bdBalita = Number(r.rincianSasaran?.balita) || (Number(bd.balita511_l) || 0) + (Number(bd.balita511_p) || 0) + (Number(bd.balita1259_l) || 0) + (Number(bd.balita1259_p) || 0) || 0;
        let bdKader = (Number(bd.kader_l) || 0) + (Number(bd.kader_p) || 0) || Number(bd.kader) || 0;
        const baseTot = bdBumil + bdBusui + bdBalita + bdKader;
        if (r.totalPenerima === baseTot || baseTot === 0) {
          itemIh = bdBumil;
          itemIm = bdBusui;
          itemB = bdBalita;
          itemG = bdKader;
        } else {
          itemG = Math.min(bdKader, r.totalPenerima);
          const rem = Math.max(0, r.totalPenerima - itemG);
          const nonKader = bdBumil + bdBusui + bdBalita;
          if (nonKader > 0) {
            const ratio = rem / nonKader;
            itemB = Math.round(bdBalita * ratio);
            itemIh = Math.round(bdBumil * ratio);
            itemIm = Math.max(0, rem - itemB - itemIh);
          } else {
            itemB = rem;
          }
        }
      } else if (r.kategori === "Balita" || upperGroup.includes("BALITA")) {
        itemB = r.totalPenerima;
      } else if (r.kategori === "Ibu Hamil" || upperGroup.includes("HAMIL")) {
        itemIh = r.totalPenerima;
      } else if (r.kategori === "Ibu Menyusui" || upperGroup.includes("MENYUSUI")) {
        itemIm = r.totalPenerima;
      } else if (r.kategori === "Guru / Staf" || upperGroup.includes("GURU")) {
        itemG = r.totalPenerima;
      } else {
        const targetGuru = Number(r.rincianSasaran?.guru) || loc?.kategoriBreakdown?.guru || 0;
        if (r.totalPenerima > targetGuru) {
          itemG = targetGuru;
          itemS = r.totalPenerima - targetGuru;
        } else {
          itemS = r.totalPenerima;
          itemG = 0;
        }
      }
      totalSiswa += itemS;
      totalGuru += itemG;
      totalBalita += itemB;
      totalIbuHamil += itemIh;
      totalIbuMenyusui += itemIm;
      const isPaud = (upperGroup.includes("PAUD") || upperGroup.includes("TK") || upperGroup.includes("RA")) && !is3B;
      const isSmp = (upperGroup.includes("SMP") || upperGroup.includes("MTS")) && !is3B;
      const isSma = (upperGroup.includes("SMA") || upperGroup.includes("SMK") || upperGroup.includes("MA")) && !upperGroup.includes("SD") && !isSmp && !is3B;
      const isSd = (upperGroup.includes("SD") || upperGroup.includes("MI")) && !isSmp && !isSma && !isPaud && !is3B;
      if (is3B) {
        porsiKecil += itemB;
        porsiBesar += itemIh + itemIm + itemG;
        porsiBesarSekolah += itemG;
      } else if (isPaud || klas === "Porsi Kecil" || upperGroup.includes("KECIL")) {
        porsiKecil += itemS;
        porsiBesar += itemG;
        porsiKecilSekolah += itemS;
        porsiBesarSekolah += itemG;
      } else if (isSd) {
        const bd = loc?.breakdownKelas || loc?.kategoriBreakdown?.breakdownKelas;
        let sdKecil = 0;
        let sdBesar = 0;
        if (bd && (bd.kelas1 || bd.kelas2 || bd.kelas3 || bd.kelas4 || bd.kelas5 || bd.kelas6)) {
          const k13 = (Number(bd.kelas1) || 0) + (Number(bd.kelas2) || 0) + (Number(bd.kelas3) || 0);
          const k46 = (Number(bd.kelas4) || 0) + (Number(bd.kelas5) || 0) + (Number(bd.kelas6) || 0);
          const totK = k13 + k46;
          if (totK > 0 && itemS > 0) {
            const ratio = itemS / totK;
            sdKecil = Math.round(k13 * ratio);
            sdBesar = Math.round(k46 * ratio) + itemG;
          } else {
            sdKecil = Math.ceil(itemS / 2);
            sdBesar = Math.floor(itemS / 2) + itemG;
          }
        } else {
          sdKecil = Math.ceil(itemS / 2);
          sdBesar = Math.floor(itemS / 2) + itemG;
        }
        porsiKecil += sdKecil;
        porsiBesar += sdBesar;
        porsiKecilSekolah += sdKecil;
        porsiBesarSekolah += sdBesar;
      } else if (isSmp || isSma) {
        porsiBesar += itemS + itemG;
        porsiBesarSekolah += itemS + itemG;
      } else {
        porsiBesar += itemS + itemG;
        porsiBesarSekolah += itemS + itemG;
      }
    });
    const catSum = totalSiswa + totalGuru + totalBalita + totalIbuHamil + totalIbuMenyusui;
    if (catSum !== totalPenerima && totalPenerima > 0) {
      totalSiswa = Math.max(0, totalSiswa + (totalPenerima - catSum));
    }
    const totalBumilBusui = totalIbuHamil + totalIbuMenyusui;
    const fourGroupSum = porsiKecilSekolah + porsiBesarSekolah + totalBalita + totalBumilBusui;
    if (fourGroupSum !== totalPenerima && totalPenerima > 0) {
      porsiBesarSekolah = Math.max(0, porsiBesarSekolah + (totalPenerima - fourGroupSum));
    }
    porsiKecil = porsiKecilSekolah + totalBalita;
    porsiBesar = porsiBesarSekolah + totalBumilBusui;
    const twoGroupSum = porsiBesar + porsiKecil;
    if (twoGroupSum !== totalPenerima && totalPenerima > 0) {
      porsiBesar = Math.max(0, porsiBesar + (totalPenerima - twoGroupSum));
    }
    return {
      tanggal,
      hasPlanning: true,
      totalPenerima,
      totalPorsi: totalPenerima,
      totalKelompok: groupSet.size,
      totalInstansi: instansiSet.size,
      totalBalita,
      totalIbuHamil,
      totalIbuMenyusui,
      totalSiswa,
      totalGuru,
      portionBreakdown: {
        porsiBesar: porsiBesarSekolah,
        porsiKecil: porsiKecilSekolah,
        porsiBesarSekolah,
        porsiKecilSekolah,
        broadPorsiBesar: porsiBesar,
        broadPorsiKecil: porsiKecil,
        porsiBalita: totalBalita,
        porsiIbuHamil: totalIbuHamil,
        porsiIbuMenyusui: totalIbuMenyusui,
        balita: totalBalita,
        bumilBusui: totalBumilBusui
      },
      statusLock: effectiveStatusLock,
      finalizedBy: lockInfo.finalizedBy,
      finalizedAt: lockInfo.finalizedAt
    };
  }
  copyBeneficiaryFromPreviousDay(targetDate, sourceDate) {
    let sourceRecs = [];
    if (sourceDate) {
      sourceRecs = this.getBeneficiaryRecordsForDate(sourceDate);
    } else {
      const availableDates = Array.from(
        new Set(
          this.dailyBeneficiaryRecords.filter((r) => r.createdBy !== "System Copy" && !(r.createdBy === "USR-001" && r.createdAt?.endsWith("06:30:00"))).map((r) => r.tanggal)
        )
      ).filter((d) => d < targetDate).sort((a, b) => b.localeCompare(a));
      if (availableDates.length > 0) {
        sourceRecs = this.getBeneficiaryRecordsForDate(availableDates[0]);
      }
    }
    if (sourceRecs.length === 0) {
      return [];
    }
    this.dailyBeneficiaryRecords = this.dailyBeneficiaryRecords.filter((r) => r.tanggal !== targetDate);
    const nowStr = (/* @__PURE__ */ new Date()).toISOString().replace("T", " ").slice(0, 19);
    const newRecords = sourceRecs.map((src, idx) => ({
      ...src,
      id: `BEN-${targetDate}-${String(idx + 1).padStart(3, "0")}`,
      tanggal: targetDate,
      penambahan: 0,
      pengurangan: 0,
      totalPenerima: src.jumlahAwal,
      status: "DRAFT",
      createdBy: "Operator (Salin Data)",
      createdAt: nowStr,
      updatedBy: void 0,
      updatedAt: void 0
    }));
    this.dailyBeneficiaryRecords.push(...newRecords);
    return newRecords;
  }
  getTugasDivisiForDate(tanggal) {
    return this.tugasDivisiRecords.filter((r) => r.tanggal === tanggal);
  }
  getOrCreateTugasDivisiForDate(tanggal) {
    let records = this.getTugasDivisiForDate(tanggal);
    if (records.length === 0) {
      const divisionIds = ["persiapan", "pengolahan", "pemorsian", "distribusi", "cuci_ompreng"];
      const newRecords = divisionIds.map((divId) => createDefaultTasksForDateAndDivisi(tanggal, divId));
      this.tugasDivisiRecords.push(...newRecords);
      return newRecords;
    }
    return records;
  }
  sanitizeCategories() {
    this.kategori = [...initialKategori];
    if (Array.isArray(this.barang)) {
      this.barang.forEach((b) => {
        const kName = (b.kategoriNama || "").toLowerCase();
        const bName = (b.namaBarang || "").toLowerCase();
        const isOps = kName.includes("operasional") || kName.includes("hardware") || kName.includes("atk") || kName.includes("cetakan") || kName.includes("konsumabel") || bName.includes("laptop") || bName.includes("scanner") || bName.includes("kertas") || bName.includes("map");
        if (isOps) {
          b.kategoriId = "KAT-002";
          b.kategoriNama = "Operasional";
        } else {
          b.kategoriId = "KAT-001";
          b.kategoriNama = "Bahan Baku";
        }
      });
    }
    this.normalizeJabatanList();
  }
  normalizeJabatanList() {
    if (!Array.isArray(this.jabatan)) {
      this.jabatan = [...initialJabatan];
      return;
    }
    const seenIds = /* @__PURE__ */ new Set();
    const cleaned = [];
    for (const item of this.jabatan) {
      if (!item || !item.id || !item.nama || seenIds.has(item.id)) continue;
      seenIds.add(item.id);
      cleaned.push({
        id: String(item.id).trim(),
        kode: String(item.kode || item.id).trim().toUpperCase(),
        nama: String(item.nama).trim(),
        deskripsi: item.deskripsi ? String(item.deskripsi).trim() : "",
        ...item.createdAt ? { createdAt: item.createdAt } : {},
        ...item.updatedAt ? { updatedAt: item.updatedAt } : {}
      });
    }
    this.jabatan = cleaned;
  }
  addLog(userId, namaUser, modul, aktivitas, detail, ipAddress = "127.0.0.1", status = "Sukses") {
    const now = /* @__PURE__ */ new Date();
    const newLog = {
      id: `LOG-${Date.now()}`,
      userId,
      namaUser,
      modul,
      aktivitas,
      detail: detail || aktivitas,
      tanggal: now.toISOString().split("T")[0],
      jam: now.toTimeString().split(" ")[0],
      browser: "Web Browser / REST Client",
      ipAddress,
      status
    };
    this.activityLogs.unshift(newLog);
  }
  addNotification(modul, judul, pesan, tipe = "info", linkUrl) {
    const now = /* @__PURE__ */ new Date();
    const newNtf = {
      id: `NTF-${Date.now()}`,
      modul,
      judul,
      pesan,
      tipe,
      isRead: false,
      createdAt: `${now.toISOString().split("T")[0]} ${now.toTimeString().slice(0, 5)}`,
      linkUrl
    };
    this.notifications.unshift(newNtf);
  }
  addBarangDatang(item) {
    const now = /* @__PURE__ */ new Date();
    const cleanDate = (item.tanggal || now.toISOString().split("T")[0]).replace(/-/g, "");
    const rand = Math.random().toString(36).substring(2, 6).toUpperCase();
    const id = `BD-${cleanDate}-${rand}`;
    const newItem = {
      ...item,
      id,
      createdAt: now.toISOString(),
      updatedAt: now.toISOString()
    };
    this.barangDatang.unshift(newItem);
    return newItem;
  }
  updateBarangDatang(id, updates) {
    const idx = this.barangDatang.findIndex((b) => b.id === id);
    if (idx === -1) return null;
    this.barangDatang[idx] = {
      ...this.barangDatang[idx],
      ...updates,
      updatedAt: (/* @__PURE__ */ new Date()).toISOString()
    };
    return this.barangDatang[idx];
  }
  deleteBarangDatang(id) {
    const prevLen = this.barangDatang.length;
    this.barangDatang = this.barangDatang.filter((b) => b.id !== id);
    return this.barangDatang.length < prevLen;
  }
  addMenuHarian(item) {
    const now = /* @__PURE__ */ new Date();
    const cleanDate = (item.tanggalOperasional || now.toISOString().split("T")[0]).replace(/-/g, "");
    const rand = Math.random().toString(36).substring(2, 6).toUpperCase();
    const id = `MH-${cleanDate}-${rand}`;
    const newItem = {
      ...item,
      id,
      createdAt: now.toISOString(),
      updatedAt: now.toISOString()
    };
    this.menuHarian.unshift(newItem);
    return newItem;
  }
  updateMenuHarian(id, updates) {
    const idx = this.menuHarian.findIndex((m) => m.id === id);
    if (idx === -1) return null;
    this.menuHarian[idx] = {
      ...this.menuHarian[idx],
      ...updates,
      updatedAt: (/* @__PURE__ */ new Date()).toISOString()
    };
    return this.menuHarian[idx];
  }
  deleteMenuHarian(id) {
    const prevLen = this.menuHarian.length;
    this.menuHarian = this.menuHarian.filter((m) => m.id !== id);
    return this.menuHarian.length < prevLen;
  }
  // --- FOOD WASTE STORE METHODS ---
  getFoodWasteRecords() {
    return this.foodWasteRecords;
  }
  getFoodWasteByDate(tanggal) {
    return this.foodWasteRecords.find((r) => r.tanggal === tanggal);
  }
  saveFoodWaste(data) {
    const now = /* @__PURE__ */ new Date();
    const cleanDate = (data.tanggal || now.toISOString().split("T")[0]).replace(/-/g, "");
    const rand = Math.random().toString(36).substring(2, 6).toUpperCase();
    const id = data.id || `FW-${cleanDate}-${rand}`;
    const items = (data.items || []).map((it, idx) => {
      const pm = Number(it.penerimaManfaat) || Number(data.penerimaManfaatTotal) || 0;
      const sp = Number(it.standarPorsi) || 0;
      const totalDisajikanKg2 = Number((pm * sp / 1e3).toFixed(2));
      const sisa = Number(it.jumlah) || 0;
      const persentase = totalDisajikanKg2 > 0 ? Math.round(sisa / totalDisajikanKg2 * 100) : 0;
      let kesimpulan = it.kesimpulan || "Baik Sekali";
      if (!it.kesimpulan || it.kesimpulan === "Auto") {
        if (persentase > 20) {
          kesimpulan = "Perlu perbaikan menu";
        } else if (persentase > 15) {
          kesimpulan = "Toleransi";
        } else {
          kesimpulan = "Baik Sekali";
        }
      }
      return {
        ...it,
        id: it.id || `FWI-${Date.now()}-${idx + 1}`,
        menu: it.menu || `Menu ${idx + 1}`,
        jumlah: sisa,
        satuan: it.satuan || "Kg",
        penerimaManfaat: pm,
        standarPorsi: sp,
        totalDisajikanKg: totalDisajikanKg2,
        persentase,
        kesimpulan
      };
    });
    const totalDisajikanKg = Number(items.reduce((sum, it) => sum + it.totalDisajikanKg, 0).toFixed(2));
    const totalSisaKg = Number(items.reduce((sum, it) => sum + it.jumlah, 0).toFixed(2));
    const rataRataPersentase = totalDisajikanKg > 0 ? Math.round(totalSisaKg / totalDisajikanKg * 100) : 0;
    let kesimpulanUmum = data.kesimpulanUmum;
    if (!kesimpulanUmum) {
      if (rataRataPersentase > 20) {
        kesimpulanUmum = ">20% perlu perbaikan menu, porsi, atau edukasi";
      } else if (rataRataPersentase > 15) {
        kesimpulanUmum = "\u226420% masih dianggap batas toleransi maksimal";
      } else {
        kesimpulanUmum = "<10-15% adalah target efisiensi yang baik";
      }
    }
    const record = {
      id,
      tanggal: data.tanggal || now.toISOString().split("T")[0],
      hariTanggalFormatted: data.hariTanggalFormatted || "",
      sppgName: data.sppgName || "SPPG PROBOLINGGO KREJENGAN TEMENGGUNGAN",
      penerimaManfaatTotal: Number(data.penerimaManfaatTotal) || 0,
      items,
      totalDisajikanKg,
      totalSisaKg,
      rataRataPersentase,
      kesimpulanUmum,
      petugas: data.petugas || "Ahli Gizi SPPG",
      catatanEvaluasi: data.catatanEvaluasi || "",
      status: data.status || "Final",
      createdAt: data.createdAt || now.toISOString(),
      updatedAt: now.toISOString(),
      createdBy: data.createdBy || "Petugas Gizi"
    };
    const existingIdx = this.foodWasteRecords.findIndex((r) => r.id === id || r.tanggal === record.tanggal);
    if (existingIdx !== -1) {
      this.foodWasteRecords[existingIdx] = record;
    } else {
      this.foodWasteRecords.unshift(record);
    }
    return record;
  }
  deleteFoodWaste(id) {
    const prevLen = this.foodWasteRecords.length;
    this.foodWasteRecords = this.foodWasteRecords.filter((r) => r.id !== id);
    return this.foodWasteRecords.length < prevLen;
  }
  // --- PETUGAS & SLIP GAJI HARIAN STORE METHODS ---
  comparePetugasNomor(aNomor, bNomor) {
    const aStr = String(aNomor || "").trim();
    const bStr = String(bNomor || "").trim();
    const aMatch = aStr.match(/\d+/);
    const bMatch = bStr.match(/\d+/);
    const aNum = aMatch ? parseInt(aMatch[0], 10) : Number.MAX_SAFE_INTEGER;
    const bNum = bMatch ? parseInt(bMatch[0], 10) : Number.MAX_SAFE_INTEGER;
    if (aNum !== bNum) return aNum - bNum;
    return aStr.localeCompare(bStr, "id", { numeric: true, sensitivity: "base" });
  }
  sortPetugasList(list = this.petugasList) {
    return [...list].sort((a, b) => {
      const cmp = this.comparePetugasNomor(a.nomor, b.nomor);
      if (cmp !== 0) return cmp;
      return String(a.createdAt || a.id).localeCompare(String(b.createdAt || b.id));
    });
  }
  resolveMasterJabatanDivisi(params) {
    return resolveJabatanAndDivisiFromMaster({
      rawJabatan: params.rawJabatan,
      rawDivisi: params.rawDivisi,
      rawKodeDivisi: params.rawKodeDivisi,
      petugasJabatan: params.petugas?.jabatan,
      petugasDivisi: params.petugas?.divisi,
      petugasKodeDivisi: params.petugas?.kodeDivisi,
      divisiList: this.divisi,
      jabatanList: this.jabatan
    });
  }
  syncJabatanFromMasterDivisi() {
    const now = (/* @__PURE__ */ new Date()).toISOString();
    const updatedPetugas = [];
    const updatedSlips = [];
    const updatedAbsensi = [];
    this.petugasList = this.petugasList.map((p) => {
      const resolved = this.resolveMasterJabatanDivisi({
        rawJabatan: p.jabatan,
        rawDivisi: p.divisi,
        rawKodeDivisi: p.kodeDivisi
      });
      if (resolved.jabatan !== p.jabatan || resolved.divisi !== (p.divisi || "") || resolved.kodeDivisi !== (p.kodeDivisi || "")) {
        const updated = {
          ...p,
          jabatan: resolved.jabatan,
          divisi: resolved.divisi,
          kodeDivisi: resolved.kodeDivisi,
          updatedAt: now
        };
        updatedPetugas.push(updated);
        return updated;
      }
      return p;
    });
    const petugasById = /* @__PURE__ */ new Map();
    const petugasByNama = /* @__PURE__ */ new Map();
    for (const p of this.petugasList) {
      petugasById.set(p.id, p);
      if (p.nama) petugasByNama.set(p.nama.trim().toLowerCase(), p);
    }
    const masterBendahara = resolvePengawasKeuanganName(this.divisi);
    const masterKepala = resolveKepalaSppgName(this.divisi);
    this.slipGajiList = this.slipGajiList.map((s) => {
      const linkedPetugas = (s.petugasId ? petugasById.get(s.petugasId) : void 0) || (s.namaPetugas ? petugasByNama.get(s.namaPetugas.trim().toLowerCase()) : void 0);
      const resolved = this.resolveMasterJabatanDivisi({
        rawJabatan: s.jabatan,
        rawDivisi: s.divisi,
        rawKodeDivisi: s.kodeDivisi,
        petugas: linkedPetugas
      });
      if (resolved.jabatan !== s.jabatan || resolved.divisi !== (s.divisi || "") || resolved.kodeDivisi !== (s.kodeDivisi || "") || s.namaBendahara === "Hj. Siti Aminah, S.E." && masterBendahara !== s.namaBendahara) {
        const updated = {
          ...s,
          jabatan: resolved.jabatan,
          divisi: resolved.divisi,
          kodeDivisi: resolved.kodeDivisi,
          namaBendahara: s.namaBendahara === "Hj. Siti Aminah, S.E." ? masterBendahara : s.namaBendahara,
          namaKepalaSppg: s.namaKepalaSppg || masterKepala,
          updatedAt: now
        };
        updatedSlips.push(updated);
        return updated;
      }
      return s;
    });
    this.rekapAbsensiList = this.rekapAbsensiList.map((abs) => {
      let changed = false;
      const newItems = (abs.items || []).map((it) => {
        const linkedPetugas = (it.petugasId ? petugasById.get(it.petugasId) : void 0) || (it.namaPetugas ? petugasByNama.get(it.namaPetugas.trim().toLowerCase()) : void 0);
        const resolved = this.resolveMasterJabatanDivisi({
          rawJabatan: it.jabatan,
          petugas: linkedPetugas
        });
        if (resolved.jabatan !== it.jabatan) {
          changed = true;
          return { ...it, jabatan: resolved.jabatan };
        }
        return it;
      });
      if (changed) {
        const updatedAbs = {
          ...abs,
          items: newItems,
          updatedAt: now
        };
        updatedAbsensi.push(updatedAbs);
        return updatedAbs;
      }
      return abs;
    });
    return { updatedPetugas, updatedSlips, updatedAbsensi };
  }
  getPetugasList() {
    this.petugasList = this.sortPetugasList(this.petugasList).map((p) => {
      const resolved = this.resolveMasterJabatanDivisi({
        rawJabatan: p.jabatan,
        rawDivisi: p.divisi,
        rawKodeDivisi: p.kodeDivisi
      });
      if (resolved.jabatan === p.jabatan && resolved.divisi === p.divisi && resolved.kodeDivisi === p.kodeDivisi) {
        return p;
      }
      return {
        ...p,
        jabatan: resolved.jabatan,
        divisi: resolved.divisi,
        kodeDivisi: resolved.kodeDivisi
      };
    });
    return this.petugasList;
  }
  getPetugasById(id) {
    return this.petugasList.find((p) => p.id === id || p.nomor === id);
  }
  savePetugas(data, options) {
    const now = (/* @__PURE__ */ new Date()).toISOString();
    const shouldCreate = Boolean(options?.forceCreate) || !data.id || !String(data.id).trim();
    let id = data.id ? String(data.id).trim() : "";
    if (shouldCreate) {
      do {
        const ts = Date.now().toString(36).toUpperCase();
        const rand = Math.random().toString(36).substring(2, 7).toUpperCase();
        id = `PTG-${ts}-${rand}`;
      } while (this.petugasList.some((p) => p.id === id));
    }
    const existingIdx = shouldCreate ? -1 : this.petugasList.findIndex((p) => p.id === id);
    const existingItem = existingIdx !== -1 ? this.petugasList[existingIdx] : void 0;
    const maxNomor = this.petugasList.reduce((max, p) => {
      const m = String(p.nomor || "").match(/\d+/);
      const n = m ? parseInt(m[0], 10) : 0;
      return Number.isFinite(n) && n > max ? n : max;
    }, 0);
    const autoNomor = String(Math.max(maxNomor + 1, this.petugasList.length + 1)).padStart(2, "0");
    const nomor = data.nomor && String(data.nomor).trim() || existingItem?.nomor || autoNomor;
    const rawJabatan = data.jabatan || existingItem?.jabatan || "Staf Operasional";
    const resolvedJabDiv = this.resolveMasterJabatanDivisi({
      rawJabatan,
      rawDivisi: data.divisi ?? existingItem?.divisi,
      rawKodeDivisi: data.kodeDivisi ?? existingItem?.kodeDivisi
    });
    const item = {
      id,
      nomor,
      nama: data.nama || existingItem?.nama || "Petugas Baru",
      jabatan: resolvedJabDiv.jabatan,
      divisi: resolvedJabDiv.divisi,
      kodeDivisi: resolvedJabDiv.kodeDivisi,
      alamat: data.alamat ?? existingItem?.alamat ?? "",
      besaranGaji: Number(data.besaranGaji ?? existingItem?.besaranGaji ?? 1e5),
      telepon: data.telepon ?? existingItem?.telepon ?? "",
      status: data.status || existingItem?.status || "Aktif",
      tanggalMulai: data.tanggalMulai || existingItem?.tanggalMulai || now.split("T")[0],
      nomorRekening: data.nomorRekening ?? existingItem?.nomorRekening ?? "-",
      namaBank: data.namaBank || existingItem?.namaBank || "Tunai",
      keterangan: data.keterangan ?? existingItem?.keterangan ?? "",
      createdAt: data.createdAt || existingItem?.createdAt || now,
      updatedAt: now
    };
    if (existingIdx !== -1) {
      this.petugasList[existingIdx] = item;
    } else {
      this.petugasList.push(item);
    }
    this.petugasList = this.sortPetugasList(this.petugasList);
    return item;
  }
  savePetugasBatch(items) {
    const now = (/* @__PURE__ */ new Date()).toISOString();
    const created = [];
    let nextNomorInt = Math.max(
      this.petugasList.reduce((max, p) => {
        const m = String(p.nomor || "").match(/\d+/);
        const n = m ? parseInt(m[0], 10) : 0;
        return Number.isFinite(n) && n > max ? n : max;
      }, 0) + 1,
      this.petugasList.length + 1
    );
    const existingIds = new Set(this.petugasList.map((p) => p.id));
    for (const raw of items) {
      const nama = String(raw.nama || "").trim();
      if (!nama) continue;
      let id = "";
      do {
        const ts = Date.now().toString(36).toUpperCase();
        const rand = Math.random().toString(36).substring(2, 8).toUpperCase();
        id = `PTG-${ts}-${rand}`;
      } while (existingIds.has(id));
      existingIds.add(id);
      const customNomor = raw.nomor && String(raw.nomor).trim();
      const nomor = customNomor || String(nextNomorInt).padStart(2, "0");
      if (!customNomor) {
        nextNomorInt++;
      } else {
        const parsedCustom = parseInt(customNomor.replace(/\D/g, ""), 10);
        if (Number.isFinite(parsedCustom) && parsedCustom >= nextNomorInt) {
          nextNomorInt = parsedCustom + 1;
        }
      }
      const resolvedBatchJab = this.resolveMasterJabatanDivisi({
        rawJabatan: String(raw.jabatan || "").trim() || "Staf Operasional",
        rawDivisi: raw.divisi,
        rawKodeDivisi: raw.kodeDivisi
      });
      const item = {
        id,
        nomor,
        nama,
        jabatan: resolvedBatchJab.jabatan,
        divisi: resolvedBatchJab.divisi,
        kodeDivisi: resolvedBatchJab.kodeDivisi,
        alamat: String(raw.alamat ?? "").trim() || "-",
        besaranGaji: Math.max(0, Number(raw.besaranGaji ?? 12e4) || 0),
        telepon: String(raw.telepon ?? "").trim(),
        status: raw.status === "Cuti" || raw.status === "Nonaktif" ? raw.status : "Aktif",
        tanggalMulai: raw.tanggalMulai || now.split("T")[0],
        nomorRekening: String(raw.nomorRekening ?? "-").trim() || "-",
        namaBank: String(raw.namaBank || "Tunai").trim() || "Tunai",
        keterangan: String(raw.keterangan ?? "").trim(),
        createdAt: now,
        updatedAt: now
      };
      this.petugasList.push(item);
      created.push(item);
    }
    this.petugasList = this.sortPetugasList(this.petugasList);
    return created;
  }
  resequencePetugasNomor() {
    const now = (/* @__PURE__ */ new Date()).toISOString();
    const sorted = this.sortPetugasList(this.petugasList);
    this.petugasList = sorted.map((p, idx) => ({
      ...p,
      nomor: String(idx + 1).padStart(2, "0"),
      updatedAt: now
    }));
    return this.petugasList;
  }
  deletePetugas(id) {
    const prevLen = this.petugasList.length;
    this.petugasList = this.petugasList.filter((p) => p.id !== id);
    return this.petugasList.length < prevLen;
  }
  getSlipGajiList(filters) {
    const petugasById = new Map(this.petugasList.map((p) => [p.id, p]));
    const petugasByNama = new Map(
      this.petugasList.filter((p) => Boolean(p.nama)).map((p) => [p.nama.trim().toLowerCase(), p])
    );
    const masterBendahara = resolvePengawasKeuanganName(this.divisi);
    const masterKepala = resolveKepalaSppgName(this.divisi);
    let list = this.slipGajiList.map((s) => {
      const linkedPetugas = (s.petugasId ? petugasById.get(s.petugasId) : void 0) || (s.namaPetugas ? petugasByNama.get(s.namaPetugas.trim().toLowerCase()) : void 0);
      const resolved = this.resolveMasterJabatanDivisi({
        rawJabatan: s.jabatan,
        rawDivisi: s.divisi,
        rawKodeDivisi: s.kodeDivisi,
        petugas: linkedPetugas
      });
      return {
        ...s,
        jabatan: resolved.jabatan,
        divisi: resolved.divisi,
        kodeDivisi: resolved.kodeDivisi,
        namaBendahara: s.namaBendahara === "Hj. Siti Aminah, S.E." ? masterBendahara : s.namaBendahara,
        namaKepalaSppg: s.namaKepalaSppg || masterKepala
      };
    });
    if (filters?.tanggal) {
      list = list.filter((s) => s.tanggal === filters.tanggal);
    }
    if (filters?.petugasId) {
      list = list.filter((s) => s.petugasId === filters.petugasId);
    }
    if (filters?.status) {
      list = list.filter((s) => s.statusPembayaran.toLowerCase() === filters.status?.toLowerCase());
    }
    return list.sort((a, b) => {
      const dateDiff = new Date(b.tanggal).getTime() - new Date(a.tanggal).getTime();
      if (dateDiff !== 0) return dateDiff;
      return this.comparePetugasNomor(a.nomorPetugas, b.nomorPetugas);
    });
  }
  getSlipGajiById(id) {
    const found = this.slipGajiList.find((s) => s.id === id || s.nomorSlip === id);
    if (!found) return void 0;
    const linkedPetugas = found.petugasId ? this.getPetugasById(found.petugasId) : void 0;
    const resolved = this.resolveMasterJabatanDivisi({
      rawJabatan: found.jabatan,
      rawDivisi: found.divisi,
      rawKodeDivisi: found.kodeDivisi,
      petugas: linkedPetugas
    });
    return {
      ...found,
      jabatan: resolved.jabatan,
      divisi: resolved.divisi,
      kodeDivisi: resolved.kodeDivisi
    };
  }
  saveSlipGaji(data) {
    const now = /* @__PURE__ */ new Date();
    const todayStr = data.tanggal || now.toISOString().split("T")[0];
    const cleanDate = todayStr.replace(/-/g, "");
    let id = data.id;
    if (!id) {
      do {
        const ts = Date.now().toString(36).slice(-4).toUpperCase();
        const rand = Math.random().toString(36).substring(2, 6).toUpperCase();
        id = `SLIP-${cleanDate}-${ts}${rand}`;
      } while (this.slipGajiList.some((s) => s.id === id));
    }
    const petugas = data.petugasId ? this.getPetugasById(data.petugasId) : void 0;
    const nomorPetugas = data.nomorPetugas || petugas?.nomor || "";
    const namaPetugas = data.namaPetugas || petugas?.nama || "Petugas SPPG";
    const explicitJabProvided = Boolean(data.jabatan && String(data.jabatan).trim());
    const resolvedJabDiv = this.resolveMasterJabatanDivisi({
      rawJabatan: explicitJabProvided ? data.jabatan : petugas?.jabatan,
      rawDivisi: data.divisi ?? (explicitJabProvided ? void 0 : petugas?.divisi),
      rawKodeDivisi: data.kodeDivisi ?? (explicitJabProvided ? void 0 : petugas?.kodeDivisi),
      petugas: explicitJabProvided ? void 0 : petugas
    });
    const jabatan = resolvedJabDiv.jabatan;
    const divisi = resolvedJabDiv.divisi;
    const kodeDivisi = resolvedJabDiv.kodeDivisi;
    const alamat = data.alamat || petugas?.alamat || "";
    const kehadiranHari = Number(data.kehadiranHari !== void 0 ? data.kehadiranHari : 1);
    const tarifGajiPerHari = Number(data.tarifGajiPerHari || petugas?.besaranGaji || 1e5);
    const gajiPokokHarian = Math.round(kehadiranHari * tarifGajiPerHari);
    const uangMakanHarian = Number(data.uangMakanHarian || 0);
    const uangTransportHarian = Number(data.uangTransportHarian || 0);
    const uangLemburHarian = Number(data.uangLemburHarian || 0);
    const bonusHarian = Number(data.bonusHarian || 0);
    const totalPenghasilanKotor = gajiPokokHarian + uangMakanHarian + uangTransportHarian + uangLemburHarian + bonusHarian;
    const potonganHarian = Number(data.potonganHarian || 0);
    const totalGajiBersih = Math.max(0, totalPenghasilanKotor - potonganHarian);
    const terbilang = data.terbilang || angkaKeTerbilang(totalGajiBersih);
    const maxSlipNum = this.slipGajiList.reduce((max, s) => {
      const lastSeg = String(s.nomorSlip || "").split("/").pop() || "";
      const n = parseInt(lastSeg.replace(/\D/g, ""), 10);
      return Number.isFinite(n) && n > max ? n : max;
    }, 0);
    const nextSlipNum = Math.max(maxSlipNum + 1, this.slipGajiList.length + 1);
    const nomorSlip = data.nomorSlip || `SLIP/SPPG/${cleanDate.substring(0, 4)}/${cleanDate.substring(4, 6)}/${String(nextSlipNum).padStart(3, "0")}`;
    const masterBendahara = resolvePengawasKeuanganName(this.divisi);
    const masterKepala = resolveKepalaSppgName(this.divisi);
    const record = {
      id,
      nomorSlip,
      tanggal: todayStr,
      hariTanggalFormatted: data.hariTanggalFormatted || "",
      petugasId: data.petugasId || petugas?.id || "",
      nomorPetugas,
      namaPetugas,
      jabatan,
      divisi,
      kodeDivisi,
      alamat,
      kehadiranHari,
      tarifGajiPerHari,
      gajiPokokHarian,
      uangMakanHarian,
      uangTransportHarian,
      uangLemburHarian,
      bonusHarian,
      totalPenghasilanKotor,
      potonganHarian,
      keteranganPotongan: data.keteranganPotongan || "-",
      totalGajiBersih,
      terbilang,
      metodePembayaran: data.metodePembayaran || "Tunai",
      statusPembayaran: data.statusPembayaran || "Lunas",
      tanggalBayar: data.tanggalBayar || (data.statusPembayaran === "Lunas" ? todayStr : void 0),
      jamBayar: data.jamBayar || (data.statusPembayaran === "Lunas" ? "15:00 WIB" : void 0),
      catatanTugas: data.catatanTugas || `Operasional harian SPPG divisi ${divisi || jabatan}`,
      namaPenerima: data.namaPenerima || namaPetugas,
      namaBendahara: data.namaBendahara && data.namaBendahara !== "Hj. Siti Aminah, S.E." ? data.namaBendahara : masterBendahara,
      namaKepalaSppg: data.namaKepalaSppg || masterKepala,
      createdAt: data.createdAt || now.toISOString(),
      updatedAt: now.toISOString(),
      createdBy: data.createdBy || "Bendahara SPPG"
    };
    const existingIdx = this.slipGajiList.findIndex((s) => s.id === id);
    if (existingIdx !== -1) {
      this.slipGajiList[existingIdx] = record;
    } else {
      this.slipGajiList.unshift(record);
    }
    return record;
  }
  deleteSlipGaji(id) {
    const prevLen = this.slipGajiList.length;
    this.slipGajiList = this.slipGajiList.filter((s) => s.id !== id);
    return this.slipGajiList.length < prevLen;
  }
  generateDailySlipBatch(tanggal) {
    const existingAbsensi = this.rekapAbsensiList.find((a) => a.tanggal === tanggal);
    if (existingAbsensi) {
      const result = this.saveRekapAbsensi(existingAbsensi, true);
      return result.generatedSlips;
    }
    const activeStaff = this.petugasList.filter((p) => p.status === "Aktif");
    const existingForDate = this.slipGajiList.filter((s) => s.tanggal === tanggal);
    const existingPetugasIds = new Set(existingForDate.map((s) => s.petugasId));
    const generated = [];
    activeStaff.forEach((petugas) => {
      if (!existingPetugasIds.has(petugas.id)) {
        const slip = this.saveSlipGaji({
          tanggal,
          petugasId: petugas.id,
          nomorPetugas: petugas.nomor,
          namaPetugas: petugas.nama,
          jabatan: petugas.jabatan,
          alamat: petugas.alamat,
          kehadiranHari: 1,
          tarifGajiPerHari: petugas.besaranGaji,
          uangMakanHarian: 0,
          uangTransportHarian: 0,
          uangLemburHarian: 0,
          bonusHarian: 0,
          potonganHarian: 0,
          metodePembayaran: petugas.namaBank === "Tunai" ? "Tunai" : "Transfer Bank",
          statusPembayaran: "Lunas",
          tanggalBayar: tanggal,
          jamBayar: "15:00 WIB",
          catatanTugas: `Operasional harian SPPG divisi ${petugas.jabatan}`
        });
        generated.push(slip);
      }
    });
    return generated;
  }
  getRekapGajiHarian(tanggal) {
    const dailySlips = this.slipGajiList.filter((s) => s.tanggal === tanggal);
    const totalPetugasHadir = dailySlips.length;
    const totalGajiDibayarkan = dailySlips.reduce((sum, s) => sum + s.totalGajiBersih, 0);
    const lunasSlips = dailySlips.filter((s) => s.statusPembayaran === "Lunas");
    const belumLunasSlips = dailySlips.filter((s) => s.statusPembayaran !== "Lunas");
    const totalLunas = lunasSlips.length;
    const totalBelumLunas = belumLunasSlips.length;
    const totalGajiLunas = lunasSlips.reduce((sum, s) => sum + s.totalGajiBersih, 0);
    const totalGajiBelumLunas = belumLunasSlips.reduce((sum, s) => sum + s.totalGajiBersih, 0);
    const rataRataGajiHarian = totalPetugasHadir > 0 ? Math.round(totalGajiDibayarkan / totalPetugasHadir) : 0;
    return {
      tanggal,
      totalPetugasHadir,
      totalGajiDibayarkan,
      totalLunas,
      totalBelumLunas,
      totalGajiLunas,
      totalGajiBelumLunas,
      rataRataGajiHarian
    };
  }
  getSlipGajiPeriodeSummary(startDate, endDate) {
    const cleanStart = startDate <= endDate ? startDate : endDate;
    const cleanEnd = startDate <= endDate ? endDate : startDate;
    const absensiByDate = /* @__PURE__ */ new Map();
    for (const abs of this.rekapAbsensiList) {
      if (abs.tanggal >= cleanStart && abs.tanggal <= cleanEnd) {
        absensiByDate.set(abs.tanggal, abs);
      }
    }
    const slipsByDate = /* @__PURE__ */ new Map();
    for (const slip of this.slipGajiList) {
      if (slip.tanggal >= cleanStart && slip.tanggal <= cleanEnd) {
        let map = slipsByDate.get(slip.tanggal);
        if (!map) {
          map = /* @__PURE__ */ new Map();
          slipsByDate.set(slip.tanggal, map);
        }
        map.set(slip.petugasId, slip);
      }
    }
    const recordedDateSet = /* @__PURE__ */ new Set([
      ...absensiByDate.keys(),
      ...slipsByDate.keys()
    ]);
    const recordedDates = Array.from(recordedDateSet).sort();
    const sortedPetugas = this.sortPetugasList(this.petugasList);
    let totalHadirKeseluruhan = 0;
    let totalGajiKeseluruhan = 0;
    const items = sortedPetugas.map((p) => {
      const gajiHarian = Math.max(0, Number(p.besaranGaji || 0));
      let rawKehadiran = 0;
      const tanggalHadir = [];
      const detailHarian = [];
      for (const tgl of recordedDates) {
        const abs = absensiByDate.get(tgl);
        if (abs) {
          const item = abs.items.find(
            (it) => it.petugasId === p.id || it.namaPetugas && it.namaPetugas.trim().toLowerCase() === p.nama.trim().toLowerCase()
          );
          if (item) {
            const kh = item.statusAbsensi === "Hadir" ? 1 : item.statusAbsensi === "Setengah Hari" ? 0.5 : 0;
            if (kh > 0) {
              rawKehadiran += kh;
              tanggalHadir.push(tgl);
            }
            detailHarian.push({
              tanggal: tgl,
              statusAbsensi: item.statusAbsensi,
              kehadiranHari: kh,
              nominalHarian: Math.round(kh * gajiHarian),
              sumber: "absensi"
            });
          }
          continue;
        }
        const slipMap = slipsByDate.get(tgl);
        const slip = slipMap?.get(p.id) || Array.from(slipMap?.values() || []).find(
          (s) => s.namaPetugas && s.namaPetugas.trim().toLowerCase() === p.nama.trim().toLowerCase()
        );
        if (slip) {
          const kh = Math.max(0, Number(slip.kehadiranHari ?? 1));
          if (kh > 0) {
            rawKehadiran += kh;
            tanggalHadir.push(tgl);
            detailHarian.push({
              tanggal: tgl,
              statusAbsensi: kh === 0.5 ? "Setengah Hari" : "Hadir",
              kehadiranHari: kh,
              nominalHarian: Math.round(kh * gajiHarian),
              sumber: "slip"
            });
          }
        }
      }
      const totalKehadiran = Number(rawKehadiran.toFixed(2));
      const totalGaji = Math.round(totalKehadiran * gajiHarian);
      totalHadirKeseluruhan = Number((totalHadirKeseluruhan + totalKehadiran).toFixed(2));
      totalGajiKeseluruhan += totalGaji;
      const resolvedJabDiv = this.resolveMasterJabatanDivisi({
        rawJabatan: p.jabatan,
        rawDivisi: p.divisi,
        rawKodeDivisi: p.kodeDivisi
      });
      return {
        petugasId: p.id,
        nomor: p.nomor,
        nama: p.nama,
        jabatan: resolvedJabDiv.jabatan,
        divisi: resolvedJabDiv.divisi,
        kodeDivisi: resolvedJabDiv.kodeDivisi,
        status: p.status,
        namaBank: (p.namaBank || "").trim() || "-",
        nomorRekening: (p.nomorRekening || "").trim() || "-",
        gajiHarian,
        totalKehadiran,
        totalGaji,
        tanggalHadir,
        detailHarian
      };
    });
    return {
      startDate: cleanStart,
      endDate: cleanEnd,
      recordedDates,
      totalPetugas: items.length,
      totalHadirKeseluruhan,
      totalGajiKeseluruhan,
      items
    };
  }
  // ==========================================
  // REKAP ABSENSI PETUGAS HARIAN
  // ==========================================
  getRekapAbsensi(tanggal) {
    const activeStaff = this.sortPetugasList(this.petugasList).filter((p) => p.status === "Aktif");
    const existing = this.rekapAbsensiList.find((a) => a.tanggal === tanggal);
    if (existing) {
      if (existing.statusRekap === "Draft") {
        const petugasById = new Map(this.petugasList.map((p) => [p.id, p]));
        const syncedExistingItems = existing.items.map((it) => {
          const p = petugasById.get(it.petugasId);
          const resolvedJabatan = p ? p.jabatan : it.jabatan;
          const autoHours = getDefaultJamKerjaByJabatan(resolvedJabatan, it.statusAbsensi);
          const isPresent = it.statusAbsensi === "Hadir" || it.statusAbsensi === "Setengah Hari";
          const shouldAutoFill = isPresent && isLegacyDefaultJamKerja(it.jamMasuk, it.jamKeluar);
          return {
            ...it,
            ...p ? { nomorPetugas: p.nomor, namaPetugas: p.nama, jabatan: p.jabatan, besaranGaji: p.besaranGaji } : {},
            jamMasuk: isPresent ? shouldAutoFill ? autoHours.jamMasuk : it.jamMasuk : "-",
            jamKeluar: isPresent ? shouldAutoFill ? autoHours.jamKeluar : it.jamKeluar : "-"
          };
        });
        const existingIds = new Set(syncedExistingItems.map((i) => i.petugasId));
        const missingItems = activeStaff.filter((p) => !existingIds.has(p.id)).map((p) => {
          const autoHours = getDefaultJamKerjaByJabatan(p.jabatan, "Hadir");
          return {
            petugasId: p.id,
            nomorPetugas: p.nomor,
            namaPetugas: p.nama,
            jabatan: p.jabatan,
            besaranGaji: p.besaranGaji,
            statusAbsensi: "Hadir",
            kehadiranHari: 1,
            jamMasuk: autoHours.jamMasuk,
            jamKeluar: autoHours.jamKeluar,
            keterangan: "-"
          };
        });
        const mergedItems = [...syncedExistingItems, ...missingItems].sort(
          (a, b) => this.comparePetugasNomor(a.nomorPetugas, b.nomorPetugas)
        );
        const totalHadir = mergedItems.filter((i) => i.statusAbsensi === "Hadir").length;
        const totalSetengahHari = mergedItems.filter((i) => i.statusAbsensi === "Setengah Hari").length;
        const totalSakit = mergedItems.filter((i) => i.statusAbsensi === "Sakit").length;
        const totalIzin = mergedItems.filter((i) => i.statusAbsensi === "Izin").length;
        const totalAlpha = mergedItems.filter((i) => i.statusAbsensi === "Alpha").length;
        return {
          ...existing,
          items: mergedItems,
          totalPetugas: mergedItems.length,
          totalHadir,
          totalSetengahHari,
          totalSakit,
          totalIzin,
          totalAlpha,
          totalMasuk: totalHadir + totalSetengahHari,
          totalTidakMasuk: totalSakit + totalIzin + totalAlpha
        };
      }
      return existing;
    }
    const items = activeStaff.map((p) => {
      const autoHours = getDefaultJamKerjaByJabatan(p.jabatan, "Hadir");
      return {
        petugasId: p.id,
        nomorPetugas: p.nomor,
        namaPetugas: p.nama,
        jabatan: p.jabatan,
        besaranGaji: p.besaranGaji,
        statusAbsensi: "Hadir",
        kehadiranHari: 1,
        jamMasuk: autoHours.jamMasuk,
        jamKeluar: autoHours.jamKeluar,
        keterangan: "-"
      };
    });
    const cleanDate = tanggal.replace(/-/g, "");
    const draftRekap = {
      id: `ABS-${cleanDate}`,
      tanggal,
      hariTanggalFormatted: formatHariTanggalIndo(tanggal),
      totalPetugas: items.length,
      totalHadir: items.length,
      totalSetengahHari: 0,
      totalSakit: 0,
      totalIzin: 0,
      totalAlpha: 0,
      totalMasuk: items.length,
      totalTidakMasuk: 0,
      statusRekap: "Draft",
      items,
      catatan: "Rekap absensi staf operasional SPPG",
      disinkronkanKeSlipGaji: false
    };
    return draftRekap;
  }
  saveRekapAbsensi(data, autoSyncSlip = true) {
    const tanggal = data.tanggal;
    const cleanDate = tanggal.replace(/-/g, "");
    const id = data.id || `ABS-${cleanDate}`;
    const items = (data.items || []).map((it) => {
      let kehadiranHari = 0;
      if (it.statusAbsensi === "Hadir") kehadiranHari = 1;
      else if (it.statusAbsensi === "Setengah Hari") kehadiranHari = 0.5;
      else kehadiranHari = 0;
      const autoHours = getDefaultJamKerjaByJabatan(it.jabatan, it.statusAbsensi);
      return {
        ...it,
        kehadiranHari,
        jamMasuk: kehadiranHari > 0 ? it.jamMasuk && it.jamMasuk !== "-" ? it.jamMasuk : autoHours.jamMasuk : "-",
        jamKeluar: kehadiranHari > 0 ? it.jamKeluar && it.jamKeluar !== "-" ? it.jamKeluar : autoHours.jamKeluar : "-",
        keterangan: it.keterangan || "-"
      };
    });
    const totalPetugas = items.length;
    const totalHadir = items.filter((i) => i.statusAbsensi === "Hadir").length;
    const totalSetengahHari = items.filter((i) => i.statusAbsensi === "Setengah Hari").length;
    const totalSakit = items.filter((i) => i.statusAbsensi === "Sakit").length;
    const totalIzin = items.filter((i) => i.statusAbsensi === "Izin").length;
    const totalAlpha = items.filter((i) => i.statusAbsensi === "Alpha").length;
    const totalMasuk = totalHadir + totalSetengahHari;
    const totalTidakMasuk = totalSakit + totalIzin + totalAlpha;
    const now = /* @__PURE__ */ new Date();
    const record = {
      id,
      tanggal,
      hariTanggalFormatted: data.hariTanggalFormatted || formatHariTanggalIndo(tanggal),
      totalPetugas,
      totalHadir,
      totalSetengahHari,
      totalSakit,
      totalIzin,
      totalAlpha,
      totalMasuk,
      totalTidakMasuk,
      statusRekap: "Selesai",
      items,
      catatan: data.catatan || "Rekap absensi harian staf SPPG diverifikasi",
      disinkronkanKeSlipGaji: true,
      tanggalSinkronisasi: now.toISOString(),
      diverifikasiOleh: data.diverifikasiOleh || "Bendahara SPPG & HRD",
      createdAt: data.createdAt || now.toISOString(),
      updatedAt: now.toISOString()
    };
    const existingIdx = this.rekapAbsensiList.findIndex((a) => a.tanggal === tanggal);
    if (existingIdx !== -1) {
      this.rekapAbsensiList[existingIdx] = record;
    } else {
      this.rekapAbsensiList.unshift(record);
    }
    const generatedSlips = [];
    if (autoSyncSlip) {
      const attendingPetugasIds = new Set(
        items.filter((i) => i.statusAbsensi === "Hadir" || i.statusAbsensi === "Setengah Hari").map((i) => i.petugasId)
      );
      this.slipGajiList = this.slipGajiList.filter((s) => {
        if (s.tanggal !== tanggal) return true;
        return attendingPetugasIds.has(s.petugasId);
      });
      items.forEach((item) => {
        if (item.statusAbsensi === "Hadir" || item.statusAbsensi === "Setengah Hari") {
          const petugas = this.petugasList.find((p) => p.id === item.petugasId);
          const tarif = item.besaranGaji || petugas?.besaranGaji || 1e5;
          const kehadiran = item.kehadiranHari;
          const gajiPokok = Math.round(kehadiran * tarif);
          const existingSlip = this.slipGajiList.find((s) => s.tanggal === tanggal && s.petugasId === item.petugasId);
          const slip = this.saveSlipGaji({
            id: existingSlip?.id,
            nomorSlip: existingSlip?.nomorSlip,
            tanggal,
            hariTanggalFormatted: formatHariTanggalIndo(tanggal),
            petugasId: item.petugasId,
            nomorPetugas: item.nomorPetugas,
            namaPetugas: item.namaPetugas,
            jabatan: item.jabatan,
            alamat: petugas?.alamat || "",
            kehadiranHari: kehadiran,
            tarifGajiPerHari: tarif,
            gajiPokokHarian: gajiPokok,
            uangMakanHarian: 0,
            uangTransportHarian: 0,
            uangLemburHarian: 0,
            bonusHarian: 0,
            potonganHarian: 0,
            keteranganPotongan: "-",
            totalPenghasilanKotor: gajiPokok,
            totalGajiBersih: gajiPokok,
            terbilang: angkaKeTerbilang(gajiPokok),
            metodePembayaran: existingSlip?.metodePembayaran || (petugas?.namaBank === "Tunai" ? "Tunai" : "Transfer Bank"),
            statusPembayaran: existingSlip?.statusPembayaran || "Lunas",
            tanggalBayar: tanggal,
            jamBayar: "15:00 WIB",
            catatanTugas: `Operasional SPPG divisi ${item.jabatan} (Absensi: ${item.statusAbsensi})`
          });
          generatedSlips.push(slip);
        }
      });
    }
    return { absensi: record, generatedSlips };
  }
  // --- BAST (BERITA ACARA SERAH TERIMA) STORE METHODS ---
  getDistribusiSignerName(fallback = "Abdus Salam") {
    return resolveDivisiDistribusiName(this.divisi) || fallback;
  }
  syncBastDistribusiSignerFromDivisi() {
    const masterSigner = resolveDivisiDistribusiName(this.divisi);
    if (!masterSigner) return [];
    const updatedDocs = [];
    this.bastDocuments = this.bastDocuments.map((b) => {
      if (b.namaPetugasDistribusi !== masterSigner) {
        const updated = { ...b, namaPetugasDistribusi: masterSigner, updatedAt: (/* @__PURE__ */ new Date()).toISOString() };
        updatedDocs.push(updated);
        return updated;
      }
      return b;
    });
    return updatedDocs;
  }
  getBastDocuments(options) {
    const masterSigner = resolveDivisiDistribusiName(this.divisi);
    let list = this.bastDocuments;
    if (options?.tanggal) {
      list = list.filter((d) => d.tanggal === options.tanggal);
    }
    if (options?.startDate) {
      list = list.filter((d) => d.tanggal >= options.startDate);
    }
    if (options?.endDate) {
      list = list.filter((d) => d.tanggal <= options.endDate);
    }
    if (options?.search) {
      const q = options.search.toLowerCase();
      list = list.filter(
        (d) => d.nomorBast.toLowerCase().includes(q) || d.namaSekolah.toLowerCase().includes(q) || d.namaPic.toLowerCase().includes(q) || d.tanggal.includes(q)
      );
    }
    return list.map((d) => masterSigner ? { ...d, namaPetugasDistribusi: masterSigner } : d).sort((a, b) => b.tanggal.localeCompare(a.tanggal) || a.nomorBast.localeCompare(b.nomorBast));
  }
  getBastById(id) {
    const found = this.bastDocuments.find((d) => d.id === id || d.nomorBast === id);
    if (!found) return void 0;
    const masterSigner = resolveDivisiDistribusiName(this.divisi);
    return masterSigner ? { ...found, namaPetugasDistribusi: masterSigner } : found;
  }
  getNextBastSequence(tanggal) {
    const parts = tanggal.split("-");
    const yStr = parts[0] || "2026";
    const mNum = parseInt(parts[1] || "10", 10);
    const mStr = String(mNum).padStart(2, "0");
    const prefix = `${yStr}-${mStr}`;
    let maxSeq = 0;
    this.bastDocuments.forEach((b) => {
      const isMatch = this.bastNumberConfig.resetMonthly ? b.tanggal.startsWith(prefix) : b.tanggal.startsWith(yStr);
      if (isMatch && b.nomorBast) {
        const match = b.nomorBast.match(/^(\d+)\//);
        if (match) {
          const num = parseInt(match[1], 10);
          if (num > maxSeq) maxSeq = num;
        }
      }
    });
    return maxSeq >= this.bastNumberConfig.startNumber ? maxSeq + 1 : this.bastNumberConfig.startNumber;
  }
  generateBastNumber(tanggal, seqNum) {
    const parts = tanggal.split("-");
    const yStr = parts[0] || "2026";
    const mNum = parseInt(parts[1] || "10", 10);
    const roman = getBulanRomawi(mNum);
    const num = seqNum !== void 0 ? seqNum : this.getNextBastSequence(tanggal);
    const seq = String(num).padStart(this.bastNumberConfig.digitCount || 4, "0");
    const kodeJenis = this.bastNumberConfig.kodeJenisSurat || "BAST";
    const kodeInstansi = this.bastNumberConfig.kodeInstansi || "SPPG-TMG";
    return `${seq}/${kodeJenis}/${kodeInstansi}/${roman}/${yStr}`;
  }
  saveBastNumberConfig(cfg) {
    this.bastNumberConfig = {
      ...this.bastNumberConfig,
      ...cfg
    };
    return this.bastNumberConfig;
  }
  saveBastDocument(doc) {
    const now = (/* @__PURE__ */ new Date()).toISOString();
    const tanggal = doc.tanggal || now.split("T")[0];
    let id = doc.id;
    if (!id) {
      const cleanDate = tanggal.replace(/-/g, "");
      const count = this.bastDocuments.filter((b) => b.tanggal === tanggal).length + 1;
      id = `BAST-${cleanDate}-${String(count).padStart(3, "0")}`;
    }
    const hari = doc.hari || getNamaHariIndo(tanggal);
    const hariTanggalFormatted = doc.hariTanggalFormatted || formatHariTanggalIndo(tanggal);
    const isDataLengkap = Boolean(doc.namaPic && doc.namaPic.trim() && doc.telponPic && doc.telponPic.trim());
    const item = {
      id,
      nomorBast: doc.nomorBast || this.generateBastNumber(tanggal, this.bastDocuments.filter((b) => b.tanggal === tanggal).length + 1),
      tanggal,
      hari,
      hariTanggalFormatted,
      waktuPenerimaan: doc.waktuPenerimaan && doc.waktuPenerimaan !== "07:30 WIB" && doc.waktuPenerimaan !== "Jam 07:30 WIB" ? doc.waktuPenerimaan : "................ WIB",
      instansiId: doc.instansiId || "LOC-GEN",
      namaSekolah: doc.namaSekolah || "Sekolah / Lembaga",
      alamatSekolah: doc.alamatSekolah || "Kecamatan Pajarakan / Krejengan, Kabupaten Probolinggo",
      namaPic: doc.namaPic || "",
      telponPic: doc.telponPic || "",
      isDataLengkap,
      jumlahPaketMakanan: Number(doc.jumlahPaketMakanan) || 0,
      jumlahAlatMakan: Number(doc.jumlahAlatMakan !== void 0 ? doc.jumlahAlatMakan : doc.jumlahPaketMakanan) || 0,
      namaSppg: doc.namaSppg || "Satuan Pelayanan Pemenuhan Gizi (SPPG) Probolinggo Krejengan Temenggungan Yayasan Hafshawaty Pesantren Zainul Hasan Genggong Kecamatan Pajarakan Kabupaten Probolinggo",
      unitCode: doc.unitCode || "SPPG-TMG",
      namaTimDistribusi: doc.namaTimDistribusi || "Tim Distribusi SPPG Hafshawaty 001 Genggong",
      namaPetugasDistribusi: this.getDistribusiSignerName(doc.namaPetugasDistribusi || "Abdus Salam"),
      telponPetugasDistribusi: doc.telponPetugasDistribusi || "085212581665",
      namaKepalaSppg: doc.namaKepalaSppg || "Sri Rohayu, S.Pd.",
      jabatanKepalaSppg: doc.jabatanKepalaSppg || "Kepala SPPG Probolinggo Krejengan Temenggungan",
      status: doc.status || "SIAP_DICETAK",
      catatan: doc.catatan || "Berita acara resmi serah terima paket MBG dan alat makan",
      createdAt: doc.createdAt || now,
      updatedAt: now,
      createdBy: doc.createdBy || "Petugas Distribusi"
    };
    const idx = this.bastDocuments.findIndex((b) => b.id === id);
    if (idx !== -1) {
      this.bastDocuments[idx] = item;
    } else {
      this.bastDocuments.unshift(item);
    }
    return item;
  }
  deleteBastDocument(id) {
    const prev = this.bastDocuments.length;
    this.bastDocuments = this.bastDocuments.filter((b) => b.id !== id);
    return this.bastDocuments.length < prev;
  }
  generateDailyBastBatch(tanggal, forceRegenerate = false) {
    const dailyRecs = this.getBeneficiaryRecordsForDate(tanggal);
    const schoolMap = /* @__PURE__ */ new Map();
    if (dailyRecs.length > 0) {
      dailyRecs.forEach((r) => {
        let cleanName = r.namaInstansi.trim();
        if (cleanName.includes(" (Guru)")) cleanName = cleanName.replace(" (Guru)", "").trim();
        if (cleanName.includes(" - Balita")) cleanName = cleanName.replace(" - Balita", "").trim();
        if (cleanName.includes(" - Ibu Hamil")) cleanName = cleanName.replace(" - Ibu Hamil", "").trim();
        if (cleanName.includes(" - Ibu Menyusui")) cleanName = cleanName.replace(" - Ibu Menyusui", "").trim();
        const key = cleanName.toLowerCase();
        if (schoolMap.has(key)) {
          schoolMap.get(key).totalPenerima += Number(r.totalPenerima) || 0;
        } else {
          schoolMap.set(key, {
            instansiId: r.locationId || `LOC-${key}`,
            namaSekolah: cleanName,
            totalPenerima: Number(r.totalPenerima) || 0
          });
        }
      });
    }
    if (tanggal === "2026-10-25" && !schoolMap.has("tk zainul hasan") && !Array.from(schoolMap.values()).some((s) => s.namaSekolah.toUpperCase().includes("TK ZAINUL HASAN"))) {
      schoolMap.set("tk zainul hasan", {
        instansiId: "LOC-TKZH",
        namaSekolah: "TK ZAINUL HASAN",
        totalPenerima: 221
      });
    }
    if (schoolMap.size === 0) {
      this.beneficiaryLocations.filter((l) => l.status === "Aktif").forEach((l) => {
        let cleanName = l.namaInstansi.trim();
        if (cleanName.includes(" - Balita")) cleanName = cleanName.replace(" - Balita", "").trim();
        if (cleanName.includes(" - Ibu Hamil")) cleanName = cleanName.replace(" - Ibu Hamil", "").trim();
        if (cleanName.includes(" - Ibu Menyusui")) cleanName = cleanName.replace(" - Ibu Menyusui", "").trim();
        if (cleanName.includes(" (Guru)")) cleanName = cleanName.replace(" (Guru)", "").trim();
        const key = cleanName.toLowerCase();
        if (schoolMap.has(key)) {
          schoolMap.get(key).totalPenerima += Number(l.defaultJumlah) || 0;
        } else {
          schoolMap.set(key, {
            instansiId: l.id,
            namaSekolah: cleanName,
            totalPenerima: Number(l.defaultJumlah) || 0
          });
        }
      });
    }
    const hari = getNamaHariIndo(tanggal);
    const hariTanggalFormatted = formatHariTanggalIndo(tanggal);
    const existingForDate = this.bastDocuments.filter((b) => b.tanggal === tanggal);
    const results = [];
    let seqCounter = this.getNextBastSequence(tanggal);
    Array.from(schoolMap.values()).forEach((schoolData, idx) => {
      const loc = this.beneficiaryLocations.find(
        (l) => l.id === schoolData.instansiId || l.namaInstansi.trim().toLowerCase() === schoolData.namaSekolah.trim().toLowerCase()
      );
      const existingDoc = existingForDate.find(
        (b) => b.instansiId === schoolData.instansiId || b.namaSekolah.trim().toLowerCase() === schoolData.namaSekolah.trim().toLowerCase()
      );
      const isTemplateSample = schoolData.namaSekolah.toUpperCase().includes("TK ZAINUL HASAN") && tanggal === "2026-10-25";
      const nomorBast = isTemplateSample ? "0103/BAST/SPPG-TMG/X/2026" : existingDoc?.nomorBast || this.generateBastNumber(tanggal, seqCounter++);
      let foundPicNama = "";
      let foundTelponPic = "";
      let foundNpsn = "";
      for (const grp of this.beneficiaryGroups) {
        if (grp.lembagaList && grp.lembagaList.length > 0) {
          const matchedL = grp.lembagaList.find(
            (l) => l.namaInstansi.trim().toLowerCase() === schoolData.namaSekolah.trim().toLowerCase() || loc && l.id === loc.id
          );
          if (matchedL) {
            if (matchedL.picNama) foundPicNama = matchedL.picNama;
            if (matchedL.nomorKontak || matchedL.picKontak) foundTelponPic = matchedL.nomorKontak || matchedL.picKontak || "";
            if (matchedL.npsn) foundNpsn = matchedL.npsn;
            break;
          }
        }
      }
      if (!foundPicNama || !foundTelponPic) {
        const matchedGrp = this.beneficiaryGroups.find(
          (g) => loc && g.id === loc.groupId || g.nama.trim().toLowerCase() === schoolData.namaSekolah.trim().toLowerCase()
        );
        if (matchedGrp) {
          if (!foundPicNama && matchedGrp.picNama) foundPicNama = matchedGrp.picNama;
          if (!foundTelponPic && (matchedGrp.nomorKontak || matchedGrp.picKontak)) foundTelponPic = matchedGrp.nomorKontak || matchedGrp.picKontak || "";
        }
      }
      if (!foundPicNama && loc?.picNama) foundPicNama = loc.picNama;
      if (!foundTelponPic && (loc?.picTelepon || loc?.kontak)) foundTelponPic = loc?.picTelepon || loc?.kontak || "";
      if (!foundNpsn && loc?.npsn) foundNpsn = loc.npsn;
      const namaPic = foundPicNama || (existingDoc?.namaPic || (isTemplateSample ? "Lulut Biyadillah" : ""));
      const telponPic = foundTelponPic || (existingDoc?.telponPic || (isTemplateSample ? "085234834095" : ""));
      const npsn = foundNpsn || loc?.npsn || existingDoc?.npsn || "";
      const isDataLengkap = Boolean(namaPic && namaPic.trim() && telponPic && telponPic.trim());
      const id = existingDoc ? existingDoc.id : `BAST-${tanggal.replace(/-/g, "")}-${String(idx + 1).padStart(3, "0")}`;
      const doc = {
        id,
        nomorBast,
        tanggal,
        hari,
        hariTanggalFormatted,
        waktuPenerimaan: existingDoc?.waktuPenerimaan && existingDoc.waktuPenerimaan !== "07:30 WIB" && existingDoc.waktuPenerimaan !== "Jam 07:30 WIB" ? existingDoc.waktuPenerimaan : "................ WIB",
        instansiId: schoolData.instansiId,
        namaSekolah: schoolData.namaSekolah,
        npsn,
        alamatSekolah: loc?.alamat || existingDoc?.alamatSekolah || "Jl. Raya Genggong, Pajarakan, Probolinggo",
        namaPic,
        telponPic,
        isDataLengkap,
        jumlahPaketMakanan: schoolData.totalPenerima,
        jumlahAlatMakan: schoolData.totalPenerima,
        namaSppg: "Satuan Pelayanan Pemenuhan Gizi (SPPG) Probolinggo Krejengan Temenggungan Yayasan Hafshawaty Pesantren Zainul Hasan Genggong Kecamatan Pajarakan Kabupaten Probolinggo",
        unitCode: "SPPG-TMG",
        namaTimDistribusi: "Tim Distribusi SPPG Hafshawaty 001 Genggong",
        namaPetugasDistribusi: this.getDistribusiSignerName("Abdus Salam"),
        telponPetugasDistribusi: "085212581665",
        namaKepalaSppg: "Sri Rohayu, S.Pd.",
        jabatanKepalaSppg: "Kepala SPPG Probolinggo Krejengan Temenggungan",
        status: existingDoc?.status || "SIAP_DICETAK",
        catatan: `BAST serah terima paket MBG & alat makan untuk ${schoolData.namaSekolah}`,
        createdAt: existingDoc?.createdAt || (/* @__PURE__ */ new Date()).toISOString(),
        updatedAt: (/* @__PURE__ */ new Date()).toISOString(),
        createdBy: "Sistem BAST Otomatis"
      };
      const existingIdx = this.bastDocuments.findIndex((b) => b.id === id);
      if (existingIdx !== -1) {
        this.bastDocuments[existingIdx] = doc;
      } else {
        this.bastDocuments.unshift(doc);
      }
      results.push(doc);
    });
    return results;
  }
};
var dbStore = new EnterpriseDataStore();

// server/db/supabase.ts
var import_supabase_js2 = require("@supabase/supabase-js");
var rawSupabaseUrl2 = (process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL || "").trim();
var rawServiceOrAnonKey = (process.env.SUPABASE_API_KEY || process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY || "").trim();
function isValidHttpUrl(value) {
  if (!value || value.includes("placeholder") || value.includes("your-project")) return false;
  try {
    const parsed = new URL(value);
    return parsed.protocol === "https:" || parsed.protocol === "http:";
  } catch {
    return false;
  }
}
var isServerSupabaseConfigured = Boolean(
  isValidHttpUrl(rawSupabaseUrl2) && rawServiceOrAnonKey && !rawServiceOrAnonKey.includes("placeholder") && !rawServiceOrAnonKey.includes("your-")
);
var hasServerServiceRoleKey = Boolean(
  process.env.SUPABASE_SERVICE_ROLE_KEY && !process.env.SUPABASE_SERVICE_ROLE_KEY.includes("placeholder")
);
var serverSupabaseClient = null;
function getServerSupabaseClient() {
  if (!isServerSupabaseConfigured) return null;
  if (!serverSupabaseClient) {
    serverSupabaseClient = (0, import_supabase_js2.createClient)(rawSupabaseUrl2, rawServiceOrAnonKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
        detectSessionInUrl: false
      },
      global: {
        headers: {
          "X-Client-Info": "portal-layanan-terpadu-server"
        }
      }
    });
  }
  return serverSupabaseClient;
}
function getServerSupabaseMetadata() {
  let host = "belum-dikonfigurasi";
  if (isValidHttpUrl(rawSupabaseUrl2)) {
    try {
      host = new URL(rawSupabaseUrl2).hostname;
    } catch {
      host = rawSupabaseUrl2;
    }
  }
  return {
    urlConfigured: isValidHttpUrl(rawSupabaseUrl2),
    keyConfigured: Boolean(rawServiceOrAnonKey),
    serviceRoleConfigured: hasServerServiceRoleKey,
    projectHost: host,
    projectRef: host.includes(".") ? host.split(".")[0] : host
  };
}
async function verifySupabaseAccessToken(token) {
  const client = getServerSupabaseClient();
  if (!client || !token) return null;
  try {
    const { data, error } = await client.auth.getUser(token);
    if (error || !data?.user) return null;
    return data.user;
  } catch {
    return null;
  }
}

// server/routes/auth.ts
var router = (0, import_express.Router)();
function stripPassword(user) {
  const { password: _pwd, ...safeUser } = user;
  return safeUser;
}
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      res.status(400).json({ success: false, message: "Username dan Password wajib diisi." });
      return;
    }
    const normalized = String(username).trim().toLowerCase();
    const user = dbStore.users.find(
      (u) => u.username.toLowerCase() === normalized || u.email.toLowerCase() === normalized
    );
    if (!user) {
      dbStore.addLog("ANONYMOUS", username, "SSO & Auth", "Gagal Login User", `Username '${username}' tidak ditemukan.`, req.ip, "Gagal");
      res.status(401).json({ success: false, message: "Kredensial login tidak valid." });
      return;
    }
    if (user.status !== "Aktif") {
      dbStore.addLog(user.id, user.nama, "SSO & Auth", "Gagal Login User Nonaktif", "Akun user saat ini berstatus Nonaktif.", req.ip, "Gagal");
      res.status(403).json({ success: false, message: "Akun Anda dalam status Nonaktif. Silakan hubungi Administrator." });
      return;
    }
    const isPasswordValid = user.password ? password === user.password : password === "password123" || password === user.username;
    if (!isPasswordValid) {
      dbStore.addLog(user.id, user.nama, "SSO & Auth", "Gagal Login Password", "Kata sandi yang dimasukkan salah.", req.ip, "Gagal");
      res.status(401).json({ success: false, message: "Password tidak sesuai." });
      return;
    }
    user.lastLogin = (/* @__PURE__ */ new Date()).toISOString();
    const token = import_jsonwebtoken.default.sign(
      {
        id: user.id,
        nama: user.nama,
        username: user.username,
        email: user.email,
        role: user.role,
        divisi: user.divisi,
        jabatan: user.jabatan,
        iss: "Portal-Administrasi-Terpadu",
        aud: ["e-Surat-Digital", "Stock-Opname", "Master-Data"]
      },
      JWT_SECRET,
      { expiresIn: "12h" }
    );
    dbStore.addLog(user.id, user.nama, "SSO & Auth", "Login SSO Berhasil", `User ${user.nama} (${user.role}) berhasil autentikasi SSO.`, req.ip, "Sukses");
    res.json({
      success: true,
      message: "Autentikasi SSO Berhasil",
      data: {
        token,
        user: stripPassword(user),
        ssoRedirects: {
          esuratUrl: `/esurat?sso_token=${token}`,
          stockUrl: `/stock?sso_token=${token}`
        }
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});
router.get("/github/url", (req, res) => {
  const clientId = process.env.GITHUB_CLIENT_ID || "demo_github_client_id";
  const protocol = req.headers["x-forwarded-proto"] || req.protocol || "https";
  const host = req.headers["x-forwarded-host"] || req.get("host");
  const baseUrl = process.env.APP_URL || (host ? `${protocol}://${host}` : "https://sppg-hafshawaty1.com");
  const redirectUri = `${baseUrl}/api/v1/auth/github/callback`;
  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    scope: "user:email read:user repo",
    state: "portal_sso_github_state"
  });
  const authUrl = `https://github.com/login/oauth/authorize?${params.toString()}`;
  res.json({
    success: true,
    data: {
      authUrl,
      clientId,
      redirectUri,
      isConfigured: Boolean(process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET)
    }
  });
});
router.get(["/github/callback", "/github/callback/"], async (req, res) => {
  const { code } = req.query;
  if (!code) {
    res.status(400).send('<html><body style="font-family: sans-serif; text-align: center; padding: 40px; background: #0f172a; color: white;"><h3>Kode otorisasi GitHub tidak ditemukan.</h3></body></html>');
    return;
  }
  let loggedUser = dbStore.users[0];
  let githubLogin = "";
  const clientId = process.env.GITHUB_CLIENT_ID;
  const clientSecret = process.env.GITHUB_CLIENT_SECRET;
  if (clientId && clientSecret && !clientId.includes("DEMO")) {
    try {
      const tokenResponse = await fetch("https://github.com/login/oauth/access_token", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          client_id: clientId,
          client_secret: clientSecret,
          code: String(code)
        })
      });
      const tokenJson = await tokenResponse.json();
      if (tokenJson && tokenJson.access_token) {
        const userProfileResponse = await fetch("https://api.github.com/user", {
          headers: {
            "Authorization": `Bearer ${tokenJson.access_token}`,
            "User-Agent": "Portal-Administrasi-Terpadu"
          }
        });
        const ghUser = await userProfileResponse.json();
        if (ghUser && ghUser.login) {
          githubLogin = ghUser.login;
          const found = dbStore.users.find(
            (u) => u.username.toLowerCase() === ghUser.login.toLowerCase() || ghUser.email && u.email.toLowerCase() === ghUser.email.toLowerCase()
          );
          if (found) {
            loggedUser = found;
          }
        }
      }
    } catch (exchangeErr) {
      console.warn("GitHub token exchange notice:", exchangeErr);
    }
  }
  const token = import_jsonwebtoken.default.sign(
    {
      id: loggedUser.id,
      nama: loggedUser.nama,
      username: loggedUser.username,
      email: loggedUser.email,
      role: loggedUser.role,
      githubUsername: githubLogin || void 0,
      iss: "Portal-Administrasi-Terpadu"
    },
    JWT_SECRET,
    { expiresIn: "24h" }
  );
  res.send(`
    <html>
      <body style="font-family: sans-serif; text-align: center; padding: 40px; background: #0f172a; color: white;">
        <h2>Autentikasi GitHub Berhasil!</h2>
        <p>Login sebagai <strong>${loggedUser.nama} (${loggedUser.role})</strong>...</p>
        <script>
          if (window.opener) {
            window.opener.postMessage({ type: 'GITHUB_OAUTH_SUCCESS', token: '${token}' }, '*');
            window.close();
          } else {
            window.location.href = '/dashboard?token=${token}';
          }
        </script>
      </body>
    </html>
  `);
});
router.get("/sso/verify", async (req, res) => {
  const token = req.query.token || req.headers.authorization?.split(" ")[1];
  if (!token) {
    res.status(401).json({ success: false, message: "Token SSO tidak ditemukan." });
    return;
  }
  try {
    const decoded = import_jsonwebtoken.default.verify(token, JWT_SECRET);
    const user = dbStore.users.find((u) => u.id === decoded.id);
    if (!user || user.status !== "Aktif") {
      res.status(401).json({ success: false, message: "User SSO tidak valid atau sudah nonaktif." });
      return;
    }
    res.json({
      success: true,
      message: "SSO Token Terverifikasi Valid",
      data: {
        user: stripPassword(user),
        tokenClaims: decoded
      }
    });
    return;
  } catch {
    const supaUser = await verifySupabaseAccessToken(token);
    if (supaUser) {
      const matched = dbStore.users.find(
        (u) => u.authUid === supaUser.id || supaUser.email && u.email.toLowerCase() === supaUser.email.toLowerCase()
      );
      res.json({
        success: true,
        message: "Supabase Token Terverifikasi Valid",
        data: {
          user: matched ? stripPassword(matched) : {
            id: supaUser.id,
            email: supaUser.email,
            nama: supaUser.user_metadata?.nama || supaUser.email || "Pengguna Supabase",
            role: supaUser.user_metadata?.role || "Staff",
            status: "Aktif"
          },
          tokenClaims: supaUser
        }
      });
      return;
    }
    res.status(401).json({ success: false, message: "Token SSO kedaluwarsa atau tidak sah." });
  }
});
router.get("/me", async (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    res.status(401).json({ success: false, message: "Authorization header tidak disertakan." });
    return;
  }
  const token = authHeader.split(" ")[1];
  try {
    const decoded = import_jsonwebtoken.default.verify(token, JWT_SECRET);
    const user = dbStore.users.find((u) => u.id === decoded.id);
    res.json({ success: true, data: user ? stripPassword(user) : decoded });
    return;
  } catch {
    const supaUser = await verifySupabaseAccessToken(token);
    if (supaUser) {
      const matched = dbStore.users.find(
        (u) => u.authUid === supaUser.id || supaUser.email && u.email.toLowerCase() === supaUser.email.toLowerCase()
      );
      res.json({
        success: true,
        data: matched ? stripPassword(matched) : {
          id: supaUser.id,
          authUid: supaUser.id,
          email: supaUser.email || "",
          nama: supaUser.user_metadata?.nama || supaUser.email || "Pengguna SPPG",
          username: supaUser.user_metadata?.username || supaUser.email?.split("@")[0] || "user",
          role: supaUser.user_metadata?.role || "Staff",
          divisi: supaUser.user_metadata?.divisi || "Operasional SPPG",
          jabatan: supaUser.user_metadata?.jabatan || "Staff",
          status: "Aktif",
          foto: "",
          createdAt: supaUser.created_at || (/* @__PURE__ */ new Date()).toISOString(),
          emailVerified: Boolean(supaUser.email_confirmed_at)
        }
      });
      return;
    }
    res.status(401).json({ success: false, message: "Session expired or invalid." });
  }
});
var auth_default = router;

// server/routes/users.ts
var import_express2 = require("express");

// server/db/firestore.ts
var import_fs = __toESM(require("fs"), 1);
var import_path = __toESM(require("path"), 1);

// src/lib/supabase.ts
var import_supabase_js3 = require("@supabase/supabase-js");
var import_meta = {};
function readEnvVar(key) {
  try {
    const metaEnv = import_meta?.env;
    if (metaEnv && typeof metaEnv[key] === "string" && metaEnv[key]) {
      return String(metaEnv[key]).trim();
    }
  } catch {
  }
  try {
    if (typeof process !== "undefined" && process.env && typeof process.env[key] === "string") {
      return String(process.env[key]).trim();
    }
  } catch {
  }
  return "";
}
var rawSupabaseUrl3 = readEnvVar("VITE_SUPABASE_URL") || readEnvVar("SUPABASE_URL");
var rawSupabaseAnonKey = readEnvVar("VITE_SUPABASE_ANON_KEY") || readEnvVar("SUPABASE_ANON_KEY");
var FALLBACK_SUPABASE_URL = "https://placeholder-project.supabase.co";
var FALLBACK_SUPABASE_ANON_KEY = "placeholder-anon-key";
function isValidHttpUrl2(url) {
  try {
    const parsed = new URL(url);
    return parsed.protocol === "https:" || parsed.protocol === "http:";
  } catch {
    return false;
  }
}
var isSupabaseConfigured = Boolean(
  rawSupabaseUrl3 && rawSupabaseAnonKey && isValidHttpUrl2(rawSupabaseUrl3) && !rawSupabaseUrl3.includes("placeholder") && !rawSupabaseAnonKey.includes("placeholder")
);
var supabaseUrl2 = isValidHttpUrl2(rawSupabaseUrl3) ? rawSupabaseUrl3 : FALLBACK_SUPABASE_URL;
var supabaseAnonKey = rawSupabaseAnonKey || FALLBACK_SUPABASE_ANON_KEY;
var supabase2 = (0, import_supabase_js3.createClient)(supabaseUrl2, supabaseAnonKey, {
  auth: {
    persistSession: typeof window !== "undefined",
    autoRefreshToken: typeof window !== "undefined",
    detectSessionInUrl: typeof window !== "undefined"
  },
  realtime: {
    params: {
      eventsPerSecond: 10
    }
  }
});
function getSupabaseClient() {
  return isSupabaseConfigured ? supabase2 : null;
}

// src/lib/supabaseService.ts
var DEDICATED_COLLECTION_MAP = {
  users: "users",
  barang: "barang",
  stockMovements: "stock_movements",
  stock_movements: "stock_movements",
  opnameSessions: "opname_sessions",
  opname_sessions: "opname_sessions",
  menuHarian: "menu_harian",
  menu_harian: "menu_harian",
  suhu_pengolahan_v2: "suhu_pengolahan_v2",
  suhuPengolahan: "suhu_pengolahan_v2",
  suhu_masuk_ompreng_v2: "suhu_masuk_ompreng_v2",
  suhuMasukOmpreng: "suhu_masuk_ompreng_v2",
  organoleptik_v1: "organoleptik_v1",
  organoleptikRecords: "organoleptik_v1",
  app_state_sync: "app_state_sync",
  appStateSync: "app_state_sync"
};
function resolveSupabaseTarget(collectionName) {
  const dedicated = DEDICATED_COLLECTION_MAP[collectionName];
  if (dedicated) {
    return {
      table: dedicated,
      isPortalCollection: false,
      collectionName
    };
  }
  return {
    table: "portal_collections",
    isPortalCollection: true,
    collectionName
  };
}
function sanitizeJson(val) {
  return JSON.parse(JSON.stringify(val ?? {}));
}
function stripSensitiveUserFields(record) {
  const copy = { ...record };
  if ("password" in copy) {
    delete copy.password;
  }
  return copy;
}
function mapAppRecordToRow(target, docId, record) {
  const clean = sanitizeJson(record || {});
  const id = String(docId || clean.id || "");
  const nowIso = (/* @__PURE__ */ new Date()).toISOString();
  if (target.isPortalCollection) {
    return {
      collection_name: target.collectionName,
      id,
      data: { ...clean, id },
      updated_at: clean.updatedAt || nowIso
    };
  }
  switch (target.table) {
    case "users": {
      const safeUser = stripSensitiveUserFields({ ...clean, id });
      return {
        id,
        auth_uid: safeUser.authUid || safeUser.auth_uid || null,
        nama: String(safeUser.nama || ""),
        username: safeUser.username || null,
        email: safeUser.email || null,
        role: String(safeUser.role || "Staff"),
        divisi: String(safeUser.divisi || ""),
        jabatan: String(safeUser.jabatan || ""),
        status: String(safeUser.status || "Aktif"),
        foto: String(safeUser.foto || ""),
        last_login: safeUser.lastLogin || null,
        email_verified: Boolean(safeUser.emailVerified),
        data: safeUser,
        updated_at: nowIso
      };
    }
    case "barang":
      return {
        id,
        kode_barang: String(clean.kodeBarang || ""),
        nama_barang: String(clean.namaBarang || ""),
        kategori_id: String(clean.kategoriId || ""),
        kategori_nama: String(clean.kategoriNama || ""),
        gudang_id: String(clean.gudangId || ""),
        gudang_nama: String(clean.gudangNama || ""),
        satuan: String(clean.satuan || "Pcs"),
        stok_minimal: Number(clean.stokMinimal ?? 0),
        stok_sekarang: Number(clean.stokSekarang ?? 0),
        stok_awal: Number(clean.stokAwal ?? 0),
        harga_satuan: Number(clean.hargaSatuan ?? 0),
        barcode: String(clean.barcode || ""),
        qr_code_url: String(clean.qrCodeUrl || ""),
        foto_url: String(clean.fotoUrl || ""),
        sumber_supplier: String(clean.sumberSupplier || ""),
        keterangan: String(clean.keterangan || ""),
        status: String(clean.status || "Aktif"),
        data: { ...clean, id },
        updated_at: nowIso
      };
    case "stock_movements":
      return {
        id,
        jenis: String(clean.jenis || "Masuk"),
        barang_id: clean.barangId || null,
        kode_barang: String(clean.kodeBarang || ""),
        nama_barang: String(clean.namaBarang || ""),
        satuan: String(clean.satuan || "Pcs"),
        jumlah: Number(clean.jumlah ?? 0),
        gudang_id: String(clean.gudangId || ""),
        gudang_nama: String(clean.gudangNama || ""),
        referensi_nota: String(clean.referensiNota || ""),
        keterangan: String(clean.keterangan || ""),
        tanggal: String(clean.tanggal || ""),
        petugas: String(clean.petugas || ""),
        sumber_supplier: String(clean.sumberSupplier || ""),
        penerima_tujuan: String(clean.penerimaTujuan || ""),
        harga_satuan: Number(clean.hargaSatuan ?? 0),
        total_harga: Number(clean.totalHarga ?? 0),
        sisa_stock: Number(clean.sisaStock ?? 0),
        created_by: String(clean.createdBy || ""),
        updated_by: String(clean.updatedBy || ""),
        data: { ...clean, id },
        updated_at: nowIso
      };
    case "opname_sessions":
      return {
        id,
        kode_opname: String(clean.kodeOpname || ""),
        tanggal: String(clean.tanggal || ""),
        gudang_id: String(clean.gudangId || ""),
        gudang_nama: String(clean.gudangNama || ""),
        petugas: String(clean.petugas || ""),
        status: String(clean.status || "Draft"),
        items: Array.isArray(clean.items) ? clean.items : [],
        catatan_general: String(clean.catatanGeneral || ""),
        data: { ...clean, id },
        updated_at: nowIso
      };
    case "menu_harian":
      return {
        id,
        tanggal_operasional: String(clean.tanggalOperasional || ""),
        hari: String(clean.hari || ""),
        hari_tanggal_formatted: String(clean.hariTanggalFormatted || ""),
        nama_menu: String(clean.namaMenu || ""),
        kategori_porsi: String(clean.kategoriPorsi || "Standar / Umum"),
        energi_kkal: Number(clean.energiKkal ?? 0),
        protein_gram: Number(clean.proteinGram ?? 0),
        lemak_gram: Number(clean.lemakGram ?? 0),
        karbohidrat_gram: Number(clean.karbohidratGram ?? 0),
        serat_gram: Number(clean.seratGram ?? 0),
        gizi_porsi_besar: clean.giziPorsiBesar ?? null,
        gizi_porsi_kecil: clean.giziPorsiKecil ?? null,
        rincian_komponen: clean.rincianKomponen ?? null,
        catatan_gizi: String(clean.catatanGizi || ""),
        foto_menu_url: String(clean.fotoMenuUrl || ""),
        foto_file_name: String(clean.fotoFileName || ""),
        foto_file_size_kb: Number(clean.fotoFileSizeKb ?? 0),
        petugas: String(clean.petugas || ""),
        created_by: String(clean.createdBy || ""),
        data: { ...clean, id },
        updated_at: nowIso
      };
    case "suhu_pengolahan_v2":
    case "suhu_masuk_ompreng_v2":
      return {
        id,
        tanggal: String(clean.tanggal || ""),
        status: String(clean.status || "Sesuai Standar"),
        petugas: String(clean.petugas || ""),
        petugas_role: String(clean.petugasRole || ""),
        sesi1: clean.sesi1 || {},
        sesi2: clean.sesi2 || {},
        sesi3: clean.sesi3 || {},
        catatan: String(clean.catatan || ""),
        data: { ...clean, id },
        updated_at: nowIso
      };
    case "organoleptik_v1":
      return {
        id,
        nama_pemeriksa: String(clean.namaPemeriksa || ""),
        tempat_pemeriksaan: String(clean.tempatPemeriksaan || "SPPG"),
        nama_tempat_pemeriksa: String(clean.namaTempatPemeriksa || ""),
        tanggal_pemeriksaan: String(clean.tanggalPemeriksaan || ""),
        waktu_pemeriksaan: String(clean.waktuPemeriksaan || ""),
        rows: Array.isArray(clean.rows) ? clean.rows : [],
        kesimpulan: String(clean.kesimpulan || "Aman dikonsumsi"),
        data: { ...clean, id },
        updated_at: nowIso
      };
    case "app_state_sync":
      return {
        id,
        key: String(clean.key || id),
        value: typeof clean.value === "string" ? clean.value : JSON.stringify(clean.value ?? ""),
        updated_by: String(clean.updatedBy || ""),
        data: { ...clean, id },
        updated_at: nowIso
      };
  }
}
function mapRowToAppRecord(target, row) {
  if (!row || typeof row !== "object") return row;
  if (target.isPortalCollection) {
    const payload = row.data && typeof row.data === "object" ? row.data : {};
    return { ...payload, id: row.id || payload.id };
  }
  const basePayload = row.data && typeof row.data === "object" ? { ...row.data } : {};
  switch (target.table) {
    case "users":
      return {
        ...basePayload,
        id: row.id ?? basePayload.id,
        authUid: row.auth_uid ?? basePayload.authUid,
        nama: row.nama ?? basePayload.nama ?? "",
        username: row.username ?? basePayload.username ?? "",
        email: row.email ?? basePayload.email ?? "",
        role: row.role ?? basePayload.role ?? "Staff",
        divisi: row.divisi ?? basePayload.divisi ?? "",
        jabatan: row.jabatan ?? basePayload.jabatan ?? "",
        status: row.status ?? basePayload.status ?? "Aktif",
        foto: row.foto ?? basePayload.foto ?? "",
        lastLogin: row.last_login ?? basePayload.lastLogin,
        emailVerified: row.email_verified ?? basePayload.emailVerified ?? false,
        createdAt: row.created_at ?? basePayload.createdAt ?? ""
      };
    case "barang":
      return {
        ...basePayload,
        id: row.id ?? basePayload.id,
        kodeBarang: row.kode_barang ?? basePayload.kodeBarang ?? "",
        namaBarang: row.nama_barang ?? basePayload.namaBarang ?? "",
        kategoriId: row.kategori_id ?? basePayload.kategoriId ?? "",
        kategoriNama: row.kategori_nama ?? basePayload.kategoriNama ?? "",
        gudangId: row.gudang_id ?? basePayload.gudangId ?? "",
        gudangNama: row.gudang_nama ?? basePayload.gudangNama ?? "",
        satuan: row.satuan ?? basePayload.satuan ?? "Pcs",
        stokMinimal: Number(row.stok_minimal ?? basePayload.stokMinimal ?? 0),
        stokSekarang: Number(row.stok_sekarang ?? basePayload.stokSekarang ?? 0),
        stokAwal: Number(row.stok_awal ?? basePayload.stokAwal ?? 0),
        hargaSatuan: Number(row.harga_satuan ?? basePayload.hargaSatuan ?? 0),
        barcode: row.barcode ?? basePayload.barcode ?? "",
        qrCodeUrl: row.qr_code_url ?? basePayload.qrCodeUrl ?? "",
        fotoUrl: row.foto_url ?? basePayload.fotoUrl ?? "",
        sumberSupplier: row.sumber_supplier ?? basePayload.sumberSupplier ?? "",
        keterangan: row.keterangan ?? basePayload.keterangan ?? "",
        status: row.status ?? basePayload.status ?? "Aktif",
        updatedAt: row.updated_at ?? basePayload.updatedAt
      };
    case "stock_movements":
      return {
        ...basePayload,
        id: row.id ?? basePayload.id,
        jenis: row.jenis ?? basePayload.jenis,
        barangId: row.barang_id ?? basePayload.barangId ?? "",
        kodeBarang: row.kode_barang ?? basePayload.kodeBarang ?? "",
        namaBarang: row.nama_barang ?? basePayload.namaBarang ?? "",
        satuan: row.satuan ?? basePayload.satuan ?? "Pcs",
        jumlah: Number(row.jumlah ?? basePayload.jumlah ?? 0),
        gudangId: row.gudang_id ?? basePayload.gudangId ?? "",
        gudangNama: row.gudang_nama ?? basePayload.gudangNama ?? "",
        referensiNota: row.referensi_nota ?? basePayload.referensiNota ?? "",
        keterangan: row.keterangan ?? basePayload.keterangan ?? "",
        tanggal: row.tanggal ?? basePayload.tanggal ?? "",
        petugas: row.petugas ?? basePayload.petugas ?? "",
        sumberSupplier: row.sumber_supplier ?? basePayload.sumberSupplier ?? "",
        penerimaTujuan: row.penerima_tujuan ?? basePayload.penerimaTujuan ?? "",
        hargaSatuan: Number(row.harga_satuan ?? basePayload.hargaSatuan ?? 0),
        totalHarga: Number(row.total_harga ?? basePayload.totalHarga ?? 0),
        sisaStock: Number(row.sisa_stock ?? basePayload.sisaStock ?? 0),
        createdBy: row.created_by ?? basePayload.createdBy,
        updatedBy: row.updated_by ?? basePayload.updatedBy,
        createdAt: row.created_at ?? basePayload.createdAt,
        updatedAt: row.updated_at ?? basePayload.updatedAt
      };
    case "opname_sessions":
      return {
        ...basePayload,
        id: row.id ?? basePayload.id,
        kodeOpname: row.kode_opname ?? basePayload.kodeOpname ?? "",
        tanggal: row.tanggal ?? basePayload.tanggal ?? "",
        gudangId: row.gudang_id ?? basePayload.gudangId ?? "",
        gudangNama: row.gudang_nama ?? basePayload.gudangNama ?? "",
        petugas: row.petugas ?? basePayload.petugas ?? "",
        status: row.status ?? basePayload.status ?? "Draft",
        items: row.items ?? basePayload.items ?? [],
        catatanGeneral: row.catatan_general ?? basePayload.catatanGeneral ?? ""
      };
    case "menu_harian":
      return {
        ...basePayload,
        id: row.id ?? basePayload.id,
        tanggalOperasional: row.tanggal_operasional ?? basePayload.tanggalOperasional ?? "",
        hari: row.hari ?? basePayload.hari,
        hariTanggalFormatted: row.hari_tanggal_formatted ?? basePayload.hariTanggalFormatted,
        namaMenu: row.nama_menu ?? basePayload.namaMenu ?? "",
        kategoriPorsi: row.kategori_porsi ?? basePayload.kategoriPorsi,
        energiKkal: Number(row.energi_kkal ?? basePayload.energiKkal ?? 0),
        proteinGram: Number(row.protein_gram ?? basePayload.proteinGram ?? 0),
        lemakGram: Number(row.lemak_gram ?? basePayload.lemakGram ?? 0),
        karbohidratGram: Number(row.karbohidrat_gram ?? basePayload.karbohidratGram ?? 0),
        seratGram: Number(row.serat_gram ?? basePayload.seratGram ?? 0),
        giziPorsiBesar: row.gizi_porsi_besar ?? basePayload.giziPorsiBesar,
        giziPorsiKecil: row.gizi_porsi_kecil ?? basePayload.giziPorsiKecil,
        rincianKomponen: row.rincian_komponen ?? basePayload.rincianKomponen,
        catatanGizi: row.catatan_gizi ?? basePayload.catatanGizi,
        fotoMenuUrl: row.foto_menu_url ?? basePayload.fotoMenuUrl,
        fotoFileName: row.foto_file_name ?? basePayload.fotoFileName,
        fotoFileSizeKb: Number(row.foto_file_size_kb ?? basePayload.fotoFileSizeKb ?? 0),
        petugas: row.petugas ?? basePayload.petugas,
        createdBy: row.created_by ?? basePayload.createdBy,
        createdAt: row.created_at ?? basePayload.createdAt ?? "",
        updatedAt: row.updated_at ?? basePayload.updatedAt
      };
    case "suhu_pengolahan_v2":
    case "suhu_masuk_ompreng_v2":
      return {
        ...basePayload,
        id: row.id ?? basePayload.id,
        tanggal: row.tanggal ?? basePayload.tanggal ?? "",
        status: row.status ?? basePayload.status ?? "Sesuai Standar",
        petugas: row.petugas ?? basePayload.petugas ?? "",
        petugasRole: row.petugas_role ?? basePayload.petugasRole ?? "",
        sesi1: row.sesi1 ?? basePayload.sesi1 ?? {},
        sesi2: row.sesi2 ?? basePayload.sesi2 ?? {},
        sesi3: row.sesi3 ?? basePayload.sesi3 ?? {},
        catatan: row.catatan ?? basePayload.catatan ?? "",
        createdAt: row.created_at ?? basePayload.createdAt ?? "",
        updatedAt: row.updated_at ?? basePayload.updatedAt ?? ""
      };
    case "organoleptik_v1":
      return {
        ...basePayload,
        id: row.id ?? basePayload.id,
        namaPemeriksa: row.nama_pemeriksa ?? basePayload.namaPemeriksa ?? "",
        tempatPemeriksaan: row.tempat_pemeriksaan ?? basePayload.tempatPemeriksaan ?? "SPPG",
        namaTempatPemeriksa: row.nama_tempat_pemeriksa ?? basePayload.namaTempatPemeriksa ?? "",
        tanggalPemeriksaan: row.tanggal_pemeriksaan ?? basePayload.tanggalPemeriksaan ?? "",
        waktuPemeriksaan: row.waktu_pemeriksaan ?? basePayload.waktuPemeriksaan ?? "",
        rows: row.rows ?? basePayload.rows ?? [],
        kesimpulan: row.kesimpulan ?? basePayload.kesimpulan ?? "Aman dikonsumsi",
        updatedAt: row.updated_at ?? basePayload.updatedAt ?? ""
      };
    case "app_state_sync":
      return {
        ...basePayload,
        id: row.id ?? basePayload.id,
        key: row.key ?? basePayload.key ?? row.id,
        value: row.value ?? basePayload.value ?? ""
      };
  }
}
async function fetchSupabaseCollection(collectionName, options) {
  const client = options?.client ?? getSupabaseClient();
  if (!client) return null;
  const target = resolveSupabaseTarget(collectionName);
  let queryBuilder = client.from(target.table).select("*");
  if (target.isPortalCollection) {
    queryBuilder = queryBuilder.eq("collection_name", target.collectionName);
  }
  if (options?.orderByColumn && !target.isPortalCollection) {
    queryBuilder = queryBuilder.order(options.orderByColumn, {
      ascending: options.ascending ?? false
    });
  }
  const { data, error } = await queryBuilder;
  if (error) {
    throw error;
  }
  return (data || []).map((row) => mapRowToAppRecord(target, row));
}
async function fetchSupabaseDoc(collectionName, docId, clientOverride) {
  const client = clientOverride ?? getSupabaseClient();
  if (!client) return null;
  const target = resolveSupabaseTarget(collectionName);
  let queryBuilder = client.from(target.table).select("*").eq("id", docId);
  if (target.isPortalCollection) {
    queryBuilder = queryBuilder.eq("collection_name", target.collectionName);
  }
  const { data, error } = await queryBuilder.maybeSingle();
  if (error) throw error;
  return data ? mapRowToAppRecord(target, data) : null;
}
async function upsertSupabaseDoc(collectionName, docId, record, clientOverride) {
  const client = clientOverride ?? getSupabaseClient();
  if (!client) return false;
  const target = resolveSupabaseTarget(collectionName);
  const row = mapAppRecordToRow(target, docId, record);
  const conflictTarget = target.isPortalCollection ? "collection_name,id" : "id";
  const { error } = await client.from(target.table).upsert(row, {
    onConflict: conflictTarget
  });
  if (error) throw error;
  return true;
}
async function batchSyncSupabaseDocs(collectionName, ops, clientOverride) {
  const client = clientOverride ?? getSupabaseClient();
  if (!client || !ops.length) return false;
  const target = resolveSupabaseTarget(collectionName);
  const upserts = ops.filter((o) => o.type === "set" && o.data);
  const deletes = ops.filter((o) => o.type === "delete").map((o) => o.id);
  if (deletes.length > 0) {
    let delQuery = client.from(target.table).delete().in("id", deletes);
    if (target.isPortalCollection) {
      delQuery = delQuery.eq("collection_name", target.collectionName);
    }
    const { error } = await delQuery;
    if (error) throw error;
  }
  if (upserts.length > 0) {
    const rows = upserts.map((u) => mapAppRecordToRow(target, u.id, u.data));
    const conflictTarget = target.isPortalCollection ? "collection_name,id" : "id";
    const chunkSize = 200;
    for (let i = 0; i < rows.length; i += chunkSize) {
      const chunk = rows.slice(i, i + chunkSize);
      const { error } = await client.from(target.table).upsert(chunk, {
        onConflict: conflictTarget
      });
      if (error) throw error;
    }
  }
  return true;
}

// server/db/firestore.ts
var isConnected = isServerSupabaseConfigured;
var lastFullSyncAt = 0;
var SYNC_COOLDOWN_MS = 10 * 60 * 1e3;
var operationalSnapshot = {};
var SNAPSHOT_DIR = import_path.default.resolve(process.cwd(), ".cloud-sync-cache");
var SNAPSHOT_FILE = import_path.default.join(SNAPSHOT_DIR, "db-snapshot.json");
var snapshotSaveTimer = null;
function sanitizeDocId(rawKey) {
  return encodeURIComponent(rawKey).replace(/%/g, "_").slice(0, 200);
}
function hydrateFromLocalSnapshot() {
  try {
    if (!import_fs.default.existsSync(SNAPSHOT_FILE)) return false;
    const raw = import_fs.default.readFileSync(SNAPSHOT_FILE, "utf8");
    if (!raw) return false;
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return false;
    if (parsed.collections && typeof parsed.collections === "object") {
      for (const item of SYNCED_COLLECTIONS) {
        if (parsed.collections[item.key] !== void 0) {
          dbStore[item.key] = parsed.collections[item.key];
        }
      }
    }
    if (parsed.appStateSync && typeof parsed.appStateSync === "object") {
      dbStore.appStateSync = { ...dbStore.appStateSync, ...parsed.appStateSync };
    }
    if (parsed.operationalSnapshot && typeof parsed.operationalSnapshot === "object") {
      Object.assign(operationalSnapshot, parsed.operationalSnapshot);
    }
    if (typeof parsed.lastFullSyncAt === "number") {
      lastFullSyncAt = parsed.lastFullSyncAt;
    }
    console.log(
      `\u{1F4BE} Hydrated local persistent cloud cache (${Object.keys(dbStore.appStateSync).length} app-state keys, ${Object.keys(operationalSnapshot).length} operational slices).`
    );
    return true;
  } catch (err) {
    console.warn("\u26A0\uFE0F Failed to hydrate local snapshot cache:", err?.message || err);
    return false;
  }
}
function saveSnapshotToDiskNow() {
  try {
    if (!import_fs.default.existsSync(SNAPSHOT_DIR)) {
      import_fs.default.mkdirSync(SNAPSHOT_DIR, { recursive: true });
    }
    const collections = {};
    for (const item of SYNCED_COLLECTIONS) {
      collections[item.key] = dbStore[item.key];
    }
    const payload = {
      savedAt: (/* @__PURE__ */ new Date()).toISOString(),
      lastFullSyncAt,
      collections,
      appStateSync: dbStore.appStateSync,
      operationalSnapshot
    };
    const tmpFile = `${SNAPSHOT_FILE}.tmp`;
    import_fs.default.writeFileSync(tmpFile, JSON.stringify(payload), "utf8");
    import_fs.default.renameSync(tmpFile, SNAPSHOT_FILE);
  } catch (err) {
    console.warn("\u26A0\uFE0F Failed saving local snapshot cache:", err?.message || err);
  }
}
function scheduleSnapshotSave(delayMs = 250) {
  if (snapshotSaveTimer) return;
  snapshotSaveTimer = setTimeout(() => {
    snapshotSaveTimer = null;
    saveSnapshotToDiskNow();
  }, delayMs);
}
function getAppStateEntries() {
  return dbStore.appStateSync || {};
}
async function saveAppStateEntries(entries, userMeta) {
  if (!entries || typeof entries !== "object") return 0;
  let updatedCount = 0;
  for (const [key, val] of Object.entries(entries)) {
    if (!key || !key.startsWith("sppg_") || key.startsWith("sppg_fs_cache_")) continue;
    const docId = sanitizeDocId(key);
    if (val === null || val === void 0) {
      if (dbStore.appStateSync[key] !== void 0) {
        delete dbStore.appStateSync[key];
        updatedCount++;
        await syncDeleteDoc("app_state_sync", docId);
      }
    } else {
      const strVal = typeof val === "string" ? val : JSON.stringify(val);
      if (dbStore.appStateSync[key] !== strVal) {
        dbStore.appStateSync[key] = strVal;
        updatedCount++;
        await syncSaveDoc(
          "app_state_sync",
          docId,
          { id: docId, key, value: strVal },
          userMeta
        );
      }
    }
  }
  if (updatedCount > 0) {
    scheduleSnapshotSave(150);
  }
  return updatedCount;
}
function getOperationalSnapshot() {
  return operationalSnapshot;
}
function saveOperationalSnapshotSlices(slices) {
  if (!slices || typeof slices !== "object") return;
  for (const [k, v] of Object.entries(slices)) {
    if (k && v !== void 0) {
      operationalSnapshot[k] = v;
    }
  }
  scheduleSnapshotSave(150);
}
function getCollectionSnapshot(collectionName) {
  const entry = SYNCED_COLLECTIONS.find((c) => c.coll === collectionName || c.key === collectionName);
  if (entry) {
    const val = dbStore[entry.key];
    if (Array.isArray(val)) return val;
  }
  const opVal = operationalSnapshot[collectionName];
  if (Array.isArray(opVal)) return opVal;
  return null;
}
function saveCollectionSnapshot(collectionName, data) {
  if (!collectionName || !Array.isArray(data)) return;
  const entry = SYNCED_COLLECTIONS.find((c) => c.coll === collectionName || c.key === collectionName);
  if (entry) {
    dbStore[entry.key] = data;
  } else {
    operationalSnapshot[collectionName] = data;
  }
  scheduleSnapshotSave(200);
}
function getFirestoreDb() {
  const client = getServerSupabaseClient();
  isConnected = Boolean(client);
  return client;
}
function getCloudInfo() {
  const client = getFirestoreDb();
  const meta = getServerSupabaseMetadata();
  return {
    provider: "supabase",
    isConnected: Boolean(client),
    status: client ? "online" : "local-cache",
    quotaExceeded: false,
    lastQuotaErrorAt: null,
    lastFullSyncAt: lastFullSyncAt ? new Date(lastFullSyncAt).toISOString() : null,
    appStateKeysCount: Object.keys(dbStore.appStateSync || {}).length,
    projectId: meta.projectRef,
    databaseId: "supabase-postgres-public",
    authDomain: meta.projectHost,
    appId: meta.projectRef,
    apiKey: "",
    supabaseConfigured: Boolean(client),
    supabaseUrlConfigured: meta.urlConfigured,
    supabaseKeyConfigured: meta.keyConfigured,
    serviceRoleConfigured: meta.serviceRoleConfigured,
    jwtSecretConfigured: Boolean(process.env.JWT_SECRET),
    githubOAuthConfigured: Boolean(process.env.GITHUB_CLIENT_ID && process.env.GITHUB_CLIENT_SECRET),
    syncedCollectionsCount: SYNCED_COLLECTIONS.length,
    collections: SYNCED_COLLECTIONS.map((s) => s.coll),
    mode: client ? "Supabase PostgreSQL + Realtime + Server Persistent Snapshot Cache" : "Server Persistent Snapshot Cache (Menunggu konfigurasi VITE_SUPABASE_URL)",
    writeQueue: getQueueStatus()
  };
}
async function testFirestoreConnection() {
  const start = Date.now();
  const client = getFirestoreDb();
  const meta = getServerSupabaseMetadata();
  if (!client) {
    return {
      success: false,
      latencyMs: Date.now() - start,
      message: "Variabel VITE_SUPABASE_URL / SUPABASE_SERVICE_ROLE_KEY belum dikonfigurasi. Aplikasi berjalan dengan cache server lokal.",
      projectId: meta.projectRef,
      databaseId: "local-cache"
    };
  }
  try {
    const nowIso = (/* @__PURE__ */ new Date()).toISOString();
    const { error: readErr } = await client.from("app_state_sync").select("id").limit(1);
    if (readErr) {
      throw readErr;
    }
    const latency = Date.now() - start;
    return {
      success: true,
      latencyMs: latency,
      message: "Koneksi ke database Supabase PostgreSQL berhasil 100%!",
      projectId: meta.projectRef,
      databaseId: "supabase-postgres-public",
      probeTimestamp: nowIso
    };
  } catch (err) {
    return {
      success: false,
      latencyMs: Date.now() - start,
      message: err?.message || "Gagal menghubungkan ke Supabase PostgreSQL"
    };
  }
}
var pendingWriteQueue = /* @__PURE__ */ new Map();
var flushTimeout = null;
var isFlushing = false;
var totalWritesQueued = 0;
var totalWritesCommitted = 0;
var writeErrors = 0;
function getQueueStatus() {
  return {
    pendingCount: pendingWriteQueue.size,
    totalQueued: totalWritesQueued,
    totalCommitted: totalWritesCommitted,
    errors: writeErrors,
    isFlushing
  };
}
function scheduleFlush(delayMs = 25) {
  if (flushTimeout) return;
  flushTimeout = setTimeout(async () => {
    flushTimeout = null;
    await flushWriteQueue();
  }, delayMs);
}
async function flushWriteQueue() {
  if (isFlushing || pendingWriteQueue.size === 0) return;
  const client = getFirestoreDb();
  if (!client) {
    pendingWriteQueue.clear();
    scheduleSnapshotSave(150);
    return;
  }
  isFlushing = true;
  try {
    const entries = Array.from(pendingWriteQueue.entries());
    const grouped = /* @__PURE__ */ new Map();
    const now = (/* @__PURE__ */ new Date()).toISOString();
    for (const [key, item] of entries) {
      let preparedData = item.data;
      if (item.type === "set") {
        const cleanData = JSON.parse(JSON.stringify(item.data || {}));
        cleanData.updatedAt = now;
        if (item.userMeta?.name) {
          cleanData.updatedBy = item.userMeta.name;
        }
        if (!cleanData.createdAt) {
          cleanData.createdAt = now;
          cleanData.createdBy = item.userMeta?.name || "System";
        }
        preparedData = cleanData;
      }
      const list = grouped.get(item.collectionName) || [];
      list.push({
        key,
        op: {
          type: item.type,
          id: item.docId,
          data: preparedData
        }
      });
      grouped.set(item.collectionName, list);
    }
    for (const [collectionName, groupItems] of grouped.entries()) {
      try {
        await batchSyncSupabaseDocs(
          collectionName,
          groupItems.map((g) => g.op),
          client
        );
        for (const g of groupItems) {
          pendingWriteQueue.delete(g.key);
        }
        totalWritesCommitted += groupItems.length;
      } catch (err) {
        writeErrors++;
        console.warn(`\u26A0\uFE0F Supabase batch sync notice (${collectionName}):`, err?.message || err);
        for (const g of groupItems) {
          pendingWriteQueue.delete(g.key);
        }
      }
    }
  } finally {
    isFlushing = false;
    if (pendingWriteQueue.size > 0) {
      scheduleFlush(30);
    }
  }
}
async function syncSaveDoc(collectionName, docId, data, userMeta) {
  if (!collectionName || !docId) return;
  totalWritesQueued++;
  const key = `${collectionName}/${docId}`;
  pendingWriteQueue.set(key, {
    type: "set",
    collectionName,
    docId,
    data,
    userMeta,
    queuedAt: Date.now()
  });
  scheduleSnapshotSave();
  if (pendingWriteQueue.size >= 50) {
    setImmediate(() => {
      flushWriteQueue().catch((err) => {
        console.error("\u26A0\uFE0F Error flushing Supabase write queue:", err);
      });
    });
  } else {
    scheduleFlush(25);
  }
}
async function syncSaveBatch(collectionName, items, userMeta) {
  if (!collectionName || !items || items.length === 0) return;
  for (const rawItem of items) {
    const docId = rawItem.id;
    if (!docId) continue;
    const rawData = rawItem.data !== void 0 ? rawItem.data : rawItem;
    totalWritesQueued++;
    const key = `${collectionName}/${docId}`;
    pendingWriteQueue.set(key, {
      type: "set",
      collectionName,
      docId,
      data: rawData,
      userMeta,
      queuedAt: Date.now()
    });
  }
  scheduleSnapshotSave();
  if (pendingWriteQueue.size >= 50) {
    setImmediate(() => {
      flushWriteQueue().catch((err) => {
        console.error("\u26A0\uFE0F Error flushing Supabase batch queue:", err);
      });
    });
  } else {
    scheduleFlush(25);
  }
}
async function syncDeleteDoc(collectionName, docId) {
  if (!collectionName || !docId) return;
  totalWritesQueued++;
  const key = `${collectionName}/${docId}`;
  pendingWriteQueue.set(key, {
    type: "delete",
    collectionName,
    docId,
    queuedAt: Date.now()
  });
  scheduleSnapshotSave();
  scheduleFlush(25);
}
async function syncSaveDocNow(collectionName, docId, data, userMeta) {
  await syncSaveDoc(collectionName, docId, data, userMeta);
  if (flushTimeout) {
    clearTimeout(flushTimeout);
    flushTimeout = null;
  }
  await flushWriteQueue();
  saveSnapshotToDiskNow();
}
async function syncSaveBatchNow(collectionName, items, userMeta) {
  await syncSaveBatch(collectionName, items, userMeta);
  if (flushTimeout) {
    clearTimeout(flushTimeout);
    flushTimeout = null;
  }
  await flushWriteQueue();
  saveSnapshotToDiskNow();
}
async function syncDeleteDocNow(collectionName, docId) {
  await syncDeleteDoc(collectionName, docId);
  if (flushTimeout) {
    clearTimeout(flushTimeout);
    flushTimeout = null;
  }
  await flushWriteQueue();
  saveSnapshotToDiskNow();
}
function generateUniqueId(prefix) {
  const timestamp = Date.now().toString(36).toUpperCase();
  const randomPart = Math.random().toString(36).substring(2, 7).toUpperCase();
  return `${prefix}-${timestamp}-${randomPart}`;
}
async function runStockTransaction(params) {
  const client = getFirestoreDb();
  const {
    barangId,
    jenis,
    jumlah,
    referensiNota,
    keterangan,
    petugas = "Petugas Logistik",
    sumberSupplier = "",
    penerimaTujuan = "",
    hargaSatuan,
    customMovementId
  } = params;
  const now = /* @__PURE__ */ new Date();
  const nowIso = now.toISOString();
  const tanggal = `${nowIso.split("T")[0]} ${now.toTimeString().slice(0, 5)}`;
  const movementId = customMovementId || generateUniqueId("MOV");
  let itemData = dbStore.barang.find((b) => b.id === barangId) || null;
  if (client) {
    try {
      const remoteItem = await fetchSupabaseDoc("barang", barangId, client);
      if (remoteItem) {
        itemData = remoteItem;
      }
    } catch (err) {
      console.warn(`Supabase stock lookup notice for ${barangId}:`, err?.message || err);
    }
  }
  if (!itemData) {
    throw new Error(`Barang dengan ID "${barangId}" tidak ditemukan.`);
  }
  const currentStock = Number(itemData.stokSekarang) || 0;
  const qty = Number(jumlah);
  if (isNaN(qty) || jenis !== "Stock Awal" && jenis !== "Penyesuaian Opname" && qty <= 0) {
    throw new Error("Jumlah barang harus berupa angka positif.");
  }
  if (jenis === "Keluar" && currentStock < qty) {
    throw new Error(
      `Stok tidak mencukupi! Stok saat ini ${currentStock} ${itemData.satuan}, permintaan keluar: ${qty} ${itemData.satuan}.`
    );
  }
  let newStock = currentStock;
  if (jenis === "Masuk") newStock = currentStock + qty;
  else if (jenis === "Keluar") newStock = currentStock - qty;
  else if (jenis === "Stock Awal" || jenis === "Penyesuaian Opname") newStock = qty;
  const unitPrice = typeof hargaSatuan === "number" ? hargaSatuan : Number(itemData.hargaSatuan) || 0;
  const effectiveDelta = jenis === "Stock Awal" || jenis === "Penyesuaian Opname" ? Math.abs(qty - currentStock) : qty;
  const updatedBarang = {
    ...itemData,
    stokSekarang: newStock,
    updatedAt: nowIso
  };
  const movement = {
    id: movementId,
    jenis,
    barangId: itemData.id,
    kodeBarang: itemData.kodeBarang,
    namaBarang: itemData.namaBarang,
    satuan: itemData.satuan || "Pcs",
    jumlah: effectiveDelta,
    gudangId: itemData.gudangId || "GDG-001",
    gudangNama: itemData.gudangNama || "Gudang Utama",
    referensiNota: referensiNota || `REF-${now.getTime().toString().slice(-6)}`,
    keterangan: keterangan || `Transaksi Stok ${jenis}`,
    tanggal,
    petugas,
    sumberSupplier,
    penerimaTujuan,
    hargaSatuan: unitPrice,
    totalHarga: effectiveDelta * unitPrice,
    sisaStock: newStock,
    createdAt: nowIso,
    createdBy: petugas,
    updatedAt: nowIso,
    updatedBy: petugas
  };
  const localIdx = dbStore.barang.findIndex((b) => b.id === barangId);
  if (localIdx >= 0) {
    dbStore.barang[localIdx] = updatedBarang;
  } else {
    dbStore.barang.unshift(updatedBarang);
  }
  dbStore.stockMovements.unshift(movement);
  scheduleSnapshotSave(150);
  if (client) {
    try {
      await upsertSupabaseDoc("barang", barangId, { ...updatedBarang, updatedBy: petugas }, client);
      await upsertSupabaseDoc("stock_movements", movementId, movement, client);
    } catch (err) {
      console.warn(`Supabase stock transaction sync notice for ${barangId}:`, err?.message || err);
    }
  }
  return { updatedBarang, movement };
}
var SYNCED_COLLECTIONS = [
  { key: "users", coll: "users" },
  { key: "roles", coll: "roles" },
  { key: "pegawai", coll: "pegawai" },
  { key: "divisi", coll: "divisi" },
  { key: "jabatan", coll: "jabatan" },
  { key: "gudang", coll: "gudang" },
  { key: "kategori", coll: "kategori" },
  { key: "instansi", coll: "instansi" },
  { key: "kendaraan", coll: "kendaraan" },
  { key: "laporanBbm", coll: "laporanBbm" },
  { key: "barang", coll: "barang" },
  { key: "barangDatang", coll: "barangDatang" },
  { key: "menuHarian", coll: "menuHarian" },
  { key: "stockMovements", coll: "stockMovements" },
  { key: "opnameSessions", coll: "opnameSessions" },
  { key: "tugasDivisiRecords", coll: "tugasDivisi" },
  { key: "taskTemplates", coll: "taskTemplates" },
  { key: "waDivisiSettings", coll: "whatsappDivisiSettings" },
  { key: "beneficiaryGroups", coll: "beneficiaryGroups" },
  { key: "beneficiaryLocations", coll: "beneficiaryLocations" },
  { key: "dailyBeneficiaryRecords", coll: "dailyBeneficiaryRecords" },
  { key: "beneficiaryAuditLogs", coll: "beneficiaryAuditLogs" },
  { key: "bastDocuments", coll: "bastDocuments" },
  { key: "drivers", coll: "drivers" },
  { key: "distributionReports", coll: "distributionReports" },
  { key: "suratMasuk", coll: "suratMasuk" },
  { key: "suratKeluar", coll: "suratKeluar" },
  { key: "disposisi", coll: "disposisi" },
  { key: "templateSurat", coll: "templateSurat" },
  { key: "masterBahanPangan", coll: "masterBahanPangan" },
  { key: "masterMenuResep", coll: "masterMenuResep" },
  { key: "nutritionPlans", coll: "nutritionPlans" },
  { key: "rabPlans", coll: "rabPlans" },
  { key: "purchaseOrders", coll: "purchaseOrders" },
  { key: "suppliers", coll: "suppliers" },
  { key: "notifications", coll: "notifications" },
  { key: "activityLogs", coll: "activityLogs" },
  { key: "menus", coll: "menus" },
  { key: "foodWasteRecords", coll: "foodWasteRecords" },
  { key: "petugasList", coll: "petugasList" },
  { key: "slipGajiList", coll: "slipGajiList" },
  { key: "rekapAbsensiList", coll: "rekapAbsensiList" },
  { key: "suhuPengolahan", coll: "suhu_pengolahan_v2" },
  { key: "suhuMasukOmpreng", coll: "suhu_masuk_ompreng_v2" },
  { key: "organoleptikRecords", coll: "organoleptik_v1" },
  { key: "settings", coll: "settings", isSingleDoc: true },
  { key: "documentTemplate", coll: "documentTemplate", isSingleDoc: true }
];
var isSyncing = false;
async function initFirestoreSync(force = false) {
  if (isSyncing) return;
  const hadLocalSnapshot = hydrateFromLocalSnapshot();
  if (!force && hadLocalSnapshot && lastFullSyncAt > 0 && Date.now() - lastFullSyncAt < SYNC_COOLDOWN_MS) {
    console.log("\u26A1 Using warm persistent cloud snapshot.");
    return;
  }
  const client = getFirestoreDb();
  if (!client) {
    console.log("\u2139\uFE0F Supabase credentials not set yet \u2014 running seamlessly on persistent local snapshot cache.");
    dbStore.sanitizeCategories();
    saveSnapshotToDiskNow();
    return;
  }
  isSyncing = true;
  console.log("\u{1F504} Initializing Supabase PostgreSQL Synchronization...");
  try {
    const syncSingleItem = async (item) => {
      try {
        if (item.isSingleDoc) {
          const existingDoc = await fetchSupabaseDoc(item.coll, "main", client);
          if (!existingDoc) {
            const initialSettings2 = dbStore[item.key];
            if (initialSettings2) {
              await upsertSupabaseDoc(item.coll, "main", JSON.parse(JSON.stringify(initialSettings2)), client).catch(
                (err) => {
                  console.error(`\u26A0\uFE0F Error seeding single doc ${item.coll}/main:`, err);
                }
              );
            }
          } else {
            dbStore[item.key] = existingDoc;
          }
          return;
        }
        const remoteDocs = await fetchSupabaseCollection(item.coll, { client });
        const initialItems = dbStore[item.key];
        if (!remoteDocs || remoteDocs.length === 0) {
          if (item.coll === "beneficiaryGroups" || item.coll === "beneficiaryLocations") {
            dbStore[item.key] = [];
            return;
          }
          if (Array.isArray(initialItems) && initialItems.length > 0) {
            const ops = initialItems.map((docData) => ({
              type: "set",
              id: docData.id || generateUniqueId("DOC"),
              data: JSON.parse(JSON.stringify(docData))
            }));
            await batchSyncSupabaseDocs(item.coll, ops, client).catch((err) => {
              console.error(`\u26A0\uFE0F Error batch-seeding collection ${item.coll}:`, err);
            });
          }
        } else {
          if (item.coll === "users") {
            const passwordById = /* @__PURE__ */ new Map();
            for (const u of dbStore.users) {
              if (u.password) passwordById.set(u.id, u.password);
            }
            dbStore[item.key] = remoteDocs.map((u) => ({
              ...u,
              password: u.password || passwordById.get(u.id)
            }));
          } else {
            dbStore[item.key] = remoteDocs;
          }
        }
      } catch (err) {
        console.warn(`\u26A0\uFE0F Warning syncing collection ${item.coll}:`, err?.message || err);
      }
    };
    const concurrency = 6;
    for (let i = 0; i < SYNCED_COLLECTIONS.length; i += concurrency) {
      const batch = SYNCED_COLLECTIONS.slice(i, i + concurrency);
      await Promise.allSettled(batch.map((item) => syncSingleItem(item)));
    }
    try {
      const appStateRows = await fetchSupabaseCollection(
        "app_state_sync",
        { client }
      );
      if (Array.isArray(appStateRows)) {
        for (const row of appStateRows) {
          if (row?.key && typeof row.value === "string") {
            dbStore.appStateSync[row.key] = row.value;
          }
        }
      }
      lastFullSyncAt = Date.now();
    } catch (err) {
      console.warn("\u26A0\uFE0F App state sync warning:", err?.message || err);
    }
    for (const defMenu of initialMenus) {
      if (!dbStore.menus.some((m) => m.id === defMenu.id || m.path === defMenu.path)) {
        dbStore.menus.push({ ...defMenu });
      }
    }
    dbStore.sanitizeCategories();
    saveSnapshotToDiskNow();
    console.log(
      `\u2705 Supabase Sync Complete (${SYNCED_COLLECTIONS.length} collections, ${Object.keys(dbStore.appStateSync).length} app-state keys)!`
    );
  } catch (err) {
    console.warn("\u26A0\uFE0F Supabase sync notice (server continues on local cache):", err?.message || err);
  } finally {
    isSyncing = false;
  }
}

// server/routes/users.ts
var router2 = (0, import_express2.Router)();
router2.get("/", (req, res) => {
  const usersWithPassword = dbStore.users.map((u) => ({
    ...u,
    password: u.password || "password123"
  }));
  res.json({ success: true, data: usersWithPassword });
});
router2.post("/", async (req, res) => {
  const { nama, username, email, role, divisi, jabatan, status, foto, password, nip, telepon } = req.body;
  if (!nama?.trim() || !username?.trim() || !email?.trim() || !role) {
    res.status(400).json({ success: false, message: "Nama Lengkap, Username, Email, dan Role wajib diisi." });
    return;
  }
  const cleanUsername = username.trim().toLowerCase().replace(/\s+/g, "_");
  const cleanEmail = email.trim().toLowerCase();
  const existing = dbStore.users.find(
    (u) => u.username && u.username.trim().toLowerCase() === cleanUsername || u.email && u.email.trim().toLowerCase() === cleanEmail
  );
  if (existing) {
    res.status(400).json({
      success: false,
      message: `Username "@${cleanUsername}" atau Email "${cleanEmail}" sudah terdaftar.`
    });
    return;
  }
  let maxId = 0;
  dbStore.users.forEach((u) => {
    const match = u.id?.match(/^USR-(\d+)$/);
    if (match) {
      const num = parseInt(match[1], 10);
      if (num > maxId) maxId = num;
    }
  });
  const newId = `USR-${String(maxId + 1).padStart(3, "0")}`;
  const newUser = {
    id: newId,
    nama: nama.trim(),
    username: cleanUsername,
    email: cleanEmail,
    role,
    divisi: divisi?.trim() || "Logistik & Perlengkapan",
    jabatan: jabatan?.trim() || "Staf Operasional",
    status: status || "Aktif",
    password: password?.trim() || "password123",
    foto: foto || `https://images.unsplash.com/photo-${1534528741775 + dbStore.users.length}?w=150`,
    createdAt: (/* @__PURE__ */ new Date()).toISOString()
  };
  if (nip) newUser.nip = nip;
  if (telepon) newUser.telepon = telepon;
  dbStore.users.unshift(newUser);
  dbStore.addLog(
    "ADMIN",
    "System Administrator",
    "Master User",
    "Tambah User Baru",
    `Menambahkan user '${newUser.nama}' (@${newUser.username}) dengan role '${role}'`,
    req.ip
  );
  await syncSaveDoc("users", newUser.id, newUser);
  res.status(201).json({
    success: true,
    message: `Pengguna "${newUser.nama}" (@${newUser.username}) berhasil ditambahkan.`,
    data: newUser
  });
});
router2.put("/:id", (req, res) => {
  const { id } = req.params;
  const index = dbStore.users.findIndex((u) => u.id === id);
  if (index === -1) {
    res.status(404).json({ success: false, message: "User tidak ditemukan." });
    return;
  }
  const updateData = { ...req.body };
  if (!updateData.password || updateData.password.trim() === "") {
    delete updateData.password;
  }
  dbStore.users[index] = {
    ...dbStore.users[index],
    ...updateData
  };
  dbStore.addLog("ADMIN", "System Administrator", "Master User", "Update User Data", `Memperbarui data/password user ID ${id}`, req.ip);
  syncSaveDoc("users", id, dbStore.users[index]);
  res.json({ success: true, message: "Data user berhasil diperbarui", data: dbStore.users[index] });
});
router2.post("/:id/reset-password", (req, res) => {
  const { id } = req.params;
  const { newPassword } = req.body;
  if (!newPassword || newPassword.trim().length < 6) {
    res.status(400).json({ success: false, message: "Password baru minimal 6 karakter." });
    return;
  }
  const user = dbStore.users.find((u) => u.id === id);
  if (!user) {
    res.status(404).json({ success: false, message: "User tidak ditemukan." });
    return;
  }
  user.password = newPassword.trim();
  dbStore.addLog("ADMIN", "System Administrator", "Master User", "Reset Password User", `Mereset password SSO untuk user '${user.nama}' (@${user.username})`, req.ip);
  syncSaveDoc("users", id, user);
  res.json({ success: true, message: `Password SSO user ${user.nama} berhasil direset.` });
});
router2.delete("/:id", (req, res) => {
  const { id } = req.params;
  const index = dbStore.users.findIndex((u) => u.id === id);
  if (index === -1) {
    res.status(404).json({ success: false, message: "User tidak ditemukan." });
    return;
  }
  const deletedUser = dbStore.users.splice(index, 1)[0];
  dbStore.addLog("ADMIN", "System Administrator", "Master User", "Hapus User", `Menghapus user '${deletedUser.nama}'`, req.ip);
  syncDeleteDoc("users", id);
  res.json({ success: true, message: "User berhasil dihapus", data: deletedUser });
});
var users_default = router2;

// server/routes/roles.ts
var import_express3 = require("express");
var router3 = (0, import_express3.Router)();
router3.get("/", (req, res) => {
  res.json({ success: true, data: dbStore.roles });
});
router3.put("/:roleName", async (req, res) => {
  const { roleName } = req.params;
  const index = dbStore.roles.findIndex((r) => r.role === roleName);
  if (index === -1) {
    res.status(404).json({ success: false, message: "Role tidak ditemukan." });
    return;
  }
  dbStore.roles[index] = {
    ...dbStore.roles[index],
    ...req.body
  };
  await syncSaveDoc("roles", roleName, dbStore.roles[index]);
  dbStore.addLog("ADMIN", "System Administrator", "Manajemen Hak Akses", "Update Role Matrix", `Mengubah hak akses untuk role ${roleName}`, req.ip);
  res.json({ success: true, message: "Matrix Hak Akses berhasil diperbarui", data: dbStore.roles[index] });
});
var roles_default = router3;

// server/routes/menus.ts
var import_express4 = require("express");
var router4 = (0, import_express4.Router)();
router4.get("/", (req, res) => {
  for (const defMenu of initialMenus) {
    if (!dbStore.menus.some((m) => m.id === defMenu.id || m.path === defMenu.path)) {
      dbStore.menus.push({ ...defMenu });
    }
  }
  dbStore.menus = dbStore.menus.filter((m) => m.id !== "MNU-003-PLANNING" && !m.path.includes("perencanaan-bahan"));
  const sortedMenus = [...dbStore.menus].sort((a, b) => a.order - b.order);
  res.json({ success: true, data: sortedMenus });
});
router4.post("/", (req, res) => {
  const { title, path: path3, icon, color, order, targetModule, requiredRole } = req.body;
  if (!title || !path3 || !icon) {
    res.status(400).json({ success: false, message: "Judul, Path URL, dan Icon wajib diisi." });
    return;
  }
  const newMenu = {
    id: `MNU-${String(dbStore.menus.length + 1).padStart(3, "0")}`,
    title,
    path: path3,
    icon: icon || "Circle",
    color: color || "#3B82F6",
    order: order || dbStore.menus.length + 1,
    targetModule: targetModule || "portal",
    requiredRole,
    isActive: true
  };
  dbStore.menus.push(newMenu);
  dbStore.addLog("ADMIN", "System Administrator", "Menu Dinamis", "Tambah Menu Baru", `Menambahkan menu '${title}' dengan modul target '${targetModule}'`, req.ip);
  res.status(201).json({ success: true, message: "Menu berhasil ditambahkan", data: newMenu });
});
router4.put("/:id", (req, res) => {
  const { id } = req.params;
  const index = dbStore.menus.findIndex((m) => m.id === id);
  if (index === -1) {
    res.status(404).json({ success: false, message: "Menu tidak ditemukan." });
    return;
  }
  dbStore.menus[index] = {
    ...dbStore.menus[index],
    ...req.body
  };
  dbStore.addLog("ADMIN", "System Administrator", "Menu Dinamis", "Update Menu", `Memperbarui menu ID ${id} ('${dbStore.menus[index].title}')`, req.ip);
  res.json({ success: true, message: "Menu berhasil diperbarui", data: dbStore.menus[index] });
});
router4.put("/reorder/batch", (req, res) => {
  const { items } = req.body;
  if (!Array.isArray(items)) {
    res.status(400).json({ success: false, message: "Payload items harus berupa array." });
    return;
  }
  items.forEach((item) => {
    const found = dbStore.menus.find((m) => m.id === item.id);
    if (found) {
      found.order = item.order;
    }
  });
  dbStore.addLog("ADMIN", "System Administrator", "Menu Dinamis", "Reorder Menus", "Mengubah urutan tampilan menu dinamis", req.ip);
  res.json({ success: true, message: "Urutan menu berhasil disimpan", data: dbStore.menus });
});
router4.delete("/:id", (req, res) => {
  const { id } = req.params;
  const index = dbStore.menus.findIndex((m) => m.id === id);
  if (index === -1) {
    res.status(404).json({ success: false, message: "Menu tidak ditemukan." });
    return;
  }
  const deletedMenu = dbStore.menus.splice(index, 1)[0];
  dbStore.addLog("ADMIN", "System Administrator", "Menu Dinamis", "Hapus Menu", `Menghapus menu '${deletedMenu.title}'`, req.ip);
  res.json({ success: true, message: "Menu berhasil dihapus", data: deletedMenu });
});
var menus_default = router4;

// server/routes/master.ts
var import_express5 = require("express");
var router5 = (0, import_express5.Router)();
router5.get("/pegawai", (req, res) => {
  const data = dbStore.users.map((u) => {
    const matchedDiv = dbStore.divisi.find((d) => d.nama.toLowerCase() === (u.divisi || "").toLowerCase());
    const matchedJab = dbStore.jabatan.find((j) => j.nama.toLowerCase() === (u.jabatan || "").toLowerCase());
    return {
      id: u.id,
      nip: u.nip || `1990${u.id.replace(/\D/g, "").padStart(10, "0")}`,
      nama: u.nama,
      username: u.username,
      email: u.email,
      telepon: u.telepon || "081234567890",
      divisiId: matchedDiv?.id || "DIV-001",
      divisiNama: u.divisi || "Sekretariat / Tata Usaha",
      jabatanId: matchedJab?.id || "",
      jabatanNama: u.jabatan || "Staf Operasional",
      role: u.role,
      status: u.status
    };
  });
  res.json({ success: true, data });
});
router5.post("/pegawai", (req, res) => {
  const { nama, email, nip, telepon, divisiNama, jabatanNama, status, username, role, password } = req.body;
  if (!nama || !email) {
    res.status(400).json({ success: false, message: "Nama dan Email pegawai wajib diisi." });
    return;
  }
  const generatedUsername = username || email.split("@")[0].toLowerCase().replace(/[^a-z0-0_]/g, "_");
  const existing = dbStore.users.find((u) => u.username === generatedUsername || u.email === email);
  if (existing) {
    res.status(400).json({ success: false, message: "Username atau Email sudah terdaftar dalam sistem." });
    return;
  }
  let newUserId = "";
  do {
    newUserId = generateUniqueId("USR");
  } while (dbStore.users.some((u) => u.id === newUserId));
  const newUser = {
    id: newUserId,
    nama,
    username: generatedUsername,
    email,
    role: role || "Staff",
    divisi: divisiNama || "Sekretariat / Tata Usaha",
    jabatan: jabatanNama || "Staf Operasional",
    status: status || "Aktif",
    password: password || "password123",
    foto: `https://images.unsplash.com/photo-${1534528741775 + dbStore.users.length}?w=150`,
    createdAt: (/* @__PURE__ */ new Date()).toISOString()
  };
  if (nip) newUser.nip = nip;
  if (telepon) newUser.telepon = telepon;
  dbStore.users.unshift(newUser);
  dbStore.addLog("ADMIN", "System Administrator", "Master Data", "Tambah Pegawai / User", `Menambahkan pegawai '${nama}' terintegrasi Manajemen Pengguna`, req.ip);
  syncSaveDoc("users", newUser.id, newUser);
  res.status(201).json({ success: true, data: newUser });
});
router5.put("/pegawai/:id", (req, res) => {
  const { id } = req.params;
  const index = dbStore.users.findIndex((u) => u.id === id);
  if (index !== -1) {
    const { nama, email, nip, telepon, divisiNama, jabatanNama, status, role, username } = req.body;
    dbStore.users[index] = {
      ...dbStore.users[index],
      nama: nama || dbStore.users[index].nama,
      email: email || dbStore.users[index].email,
      username: username || dbStore.users[index].username,
      role: role || dbStore.users[index].role,
      divisi: divisiNama || dbStore.users[index].divisi,
      jabatan: jabatanNama || dbStore.users[index].jabatan,
      status: status || dbStore.users[index].status
    };
    if (nip) dbStore.users[index].nip = nip;
    if (telepon) dbStore.users[index].telepon = telepon;
    syncSaveDoc("users", id, dbStore.users[index]);
    res.json({ success: true, data: dbStore.users[index] });
  } else {
    res.status(404).json({ success: false, message: "Pegawai tidak ditemukan." });
  }
});
router5.delete("/pegawai/:id", (req, res) => {
  const { id } = req.params;
  const index = dbStore.users.findIndex((u) => u.id === id);
  if (index !== -1) {
    const deleted = dbStore.users.splice(index, 1)[0];
    syncDeleteDoc("users", id);
    res.json({ success: true, data: deleted });
  } else {
    res.status(404).json({ success: false, message: "Pegawai tidak ditemukan." });
  }
});
router5.get("/divisi", (req, res) => {
  res.json({ success: true, data: dbStore.divisi });
});
router5.post("/divisi", async (req, res) => {
  const cleanNama = String(req.body?.nama || "").trim();
  const rawKode = String(req.body?.kode || "").trim().toUpperCase();
  const cleanKeterangan = String(req.body?.keterangan || "").trim();
  const cleanKepala = String(req.body?.kepalaDivisi || "").trim();
  if (!cleanNama) {
    res.status(400).json({ success: false, message: "Nama divisi wajib diisi." });
    return;
  }
  dbStore.normalizeJabatanList();
  const cleanKode = rawKode || cleanNama.substring(0, 3).toUpperCase();
  const matchedJabatan = dbStore.jabatan.find(
    (j) => (j.kode || "").trim().toUpperCase() === cleanKode
  );
  const uniqueSuffix = `${Date.now().toString(36).toUpperCase()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;
  const newDiv = {
    id: `DIV-${uniqueSuffix}`,
    nama: cleanNama,
    kode: cleanKode,
    keterangan: cleanKeterangan,
    kepalaDivisi: cleanKepala || "-",
    jabatanId: matchedJabatan?.id || req.body?.jabatanId || void 0,
    jabatanNama: matchedJabatan?.nama || req.body?.jabatanNama || void 0,
    jumlahPegawai: 0,
    createdAt: (/* @__PURE__ */ new Date()).toISOString()
  };
  dbStore.divisi.unshift(newDiv);
  dbStore.addLog("ADMIN", "System Administrator", "Master Data", "Tambah Divisi", `Menambahkan divisi '${cleanNama}' (${cleanKode})`, req.ip);
  await syncSaveDoc("divisi", newDiv.id, newDiv);
  const updatedBastsOnAdd = dbStore.syncBastDistribusiSignerFromDivisi();
  if (updatedBastsOnAdd.length > 0) {
    await syncSaveBatch("bastDocuments", updatedBastsOnAdd);
  }
  const syncOnAdd = dbStore.syncJabatanFromMasterDivisi();
  if (syncOnAdd.updatedPetugas.length > 0) await syncSaveBatch("petugasList", syncOnAdd.updatedPetugas);
  if (syncOnAdd.updatedSlips.length > 0) await syncSaveBatch("slipGajiList", syncOnAdd.updatedSlips);
  if (syncOnAdd.updatedAbsensi.length > 0) await syncSaveBatch("rekapAbsensiList", syncOnAdd.updatedAbsensi);
  saveSnapshotToDiskNow();
  res.status(201).json({ success: true, message: "Divisi berhasil ditambahkan", data: newDiv });
});
router5.put("/divisi/:id", async (req, res) => {
  const { id } = req.params;
  const idx = dbStore.divisi.findIndex((d) => d.id === id);
  if (idx === -1) {
    res.status(404).json({ success: false, message: "Divisi tidak ditemukan." });
    return;
  }
  const current = dbStore.divisi[idx];
  const cleanNama = req.body?.nama !== void 0 ? String(req.body.nama).trim() : current.nama;
  const cleanKode = req.body?.kode !== void 0 ? String(req.body.kode).trim().toUpperCase() || current.kode || cleanNama.substring(0, 3).toUpperCase() : current.kode || "";
  if (!cleanNama) {
    res.status(400).json({ success: false, message: "Nama divisi wajib diisi." });
    return;
  }
  dbStore.normalizeJabatanList();
  const matchedJabatan = dbStore.jabatan.find(
    (j) => (j.kode || "").trim().toUpperCase() === cleanKode
  );
  dbStore.divisi[idx] = {
    ...current,
    ...req.body,
    id,
    nama: cleanNama,
    kode: cleanKode,
    jabatanId: matchedJabatan ? matchedJabatan.id : req.body?.jabatanId ?? void 0,
    jabatanNama: matchedJabatan ? matchedJabatan.nama : req.body?.jabatanNama ?? void 0,
    updatedAt: (/* @__PURE__ */ new Date()).toISOString()
  };
  dbStore.addLog("ADMIN", "System Administrator", "Master Data", "Edit Divisi", `Memperbarui divisi '${cleanNama}' (${cleanKode})`, req.ip);
  await syncSaveDoc("divisi", id, dbStore.divisi[idx]);
  const updatedBastsOnEdit = dbStore.syncBastDistribusiSignerFromDivisi();
  if (updatedBastsOnEdit.length > 0) {
    await syncSaveBatch("bastDocuments", updatedBastsOnEdit);
  }
  const syncOnEdit = dbStore.syncJabatanFromMasterDivisi();
  if (syncOnEdit.updatedPetugas.length > 0) await syncSaveBatch("petugasList", syncOnEdit.updatedPetugas);
  if (syncOnEdit.updatedSlips.length > 0) await syncSaveBatch("slipGajiList", syncOnEdit.updatedSlips);
  if (syncOnEdit.updatedAbsensi.length > 0) await syncSaveBatch("rekapAbsensiList", syncOnEdit.updatedAbsensi);
  saveSnapshotToDiskNow();
  res.json({ success: true, message: "Divisi berhasil diperbarui", data: dbStore.divisi[idx] });
});
router5.delete("/divisi/:id", async (req, res) => {
  const { id } = req.params;
  const idx = dbStore.divisi.findIndex((d) => d.id === id);
  if (idx !== -1) {
    const deleted = dbStore.divisi.splice(idx, 1)[0];
    dbStore.addLog("ADMIN", "System Administrator", "Master Data", "Hapus Divisi", `Menghapus divisi '${deleted.nama}' (${deleted.kode})`, req.ip);
    await syncDeleteDoc("divisi", id);
    const updatedBastsOnDel = dbStore.syncBastDistribusiSignerFromDivisi();
    if (updatedBastsOnDel.length > 0) {
      await syncSaveBatch("bastDocuments", updatedBastsOnDel);
    }
    const syncOnDel = dbStore.syncJabatanFromMasterDivisi();
    if (syncOnDel.updatedPetugas.length > 0) await syncSaveBatch("petugasList", syncOnDel.updatedPetugas);
    if (syncOnDel.updatedSlips.length > 0) await syncSaveBatch("slipGajiList", syncOnDel.updatedSlips);
    if (syncOnDel.updatedAbsensi.length > 0) await syncSaveBatch("rekapAbsensiList", syncOnDel.updatedAbsensi);
    saveSnapshotToDiskNow();
    res.json({ success: true, message: "Divisi berhasil dihapus", data: deleted });
  } else {
    res.status(404).json({ success: false, message: "Divisi tidak ditemukan." });
  }
});
router5.get("/jabatan", (req, res) => {
  dbStore.normalizeJabatanList();
  res.json({ success: true, data: dbStore.jabatan });
});
router5.post("/jabatan", async (req, res) => {
  const cleanNama = String(req.body?.nama || "").trim();
  const rawKode = String(req.body?.kode || "").trim().toUpperCase();
  const cleanDeskripsi = String(req.body?.deskripsi || "").trim();
  if (!cleanNama) {
    res.status(400).json({ success: false, message: "Nama jenis jabatan wajib diisi." });
    return;
  }
  dbStore.normalizeJabatanList();
  const duplicateName = dbStore.jabatan.find(
    (j) => j.nama.trim().toLowerCase() === cleanNama.toLowerCase()
  );
  if (duplicateName) {
    res.status(400).json({ success: false, message: `Jenis jabatan "${cleanNama}" sudah terdaftar di database.` });
    return;
  }
  const maxNum = dbStore.jabatan.reduce((max, item) => {
    const match = item.id?.match(/(\d+)$/);
    const num = match ? parseInt(match[1], 10) : 0;
    return num > max ? num : max;
  }, 0);
  const nextNum = String(maxNum + 1).padStart(3, "0");
  const cleanKode = rawKode || `JAB-${nextNum}`;
  const duplicateKode = dbStore.jabatan.find(
    (j) => (j.kode || "").trim().toUpperCase() === cleanKode
  );
  if (duplicateKode) {
    res.status(400).json({ success: false, message: `Kode jabatan "${cleanKode}" sudah digunakan oleh "${duplicateKode.nama}".` });
    return;
  }
  const nowIso = (/* @__PURE__ */ new Date()).toISOString();
  const newJabatan = {
    id: `JAB-${nextNum}`,
    kode: cleanKode,
    nama: cleanNama,
    deskripsi: cleanDeskripsi,
    createdAt: nowIso,
    updatedAt: nowIso
  };
  dbStore.jabatan.unshift(newJabatan);
  dbStore.addLog("ADMIN", "System Administrator", "Master Data", "Tambah Jenis Jabatan", `Menambahkan jenis jabatan '${cleanNama}' (${cleanKode})`, req.ip);
  await syncSaveDoc("jabatan", newJabatan.id, newJabatan);
  saveSnapshotToDiskNow();
  res.status(201).json({ success: true, message: "Jenis jabatan berhasil ditambahkan dan disimpan ke database.", data: newJabatan });
});
router5.put("/jabatan/:id", async (req, res) => {
  const { id } = req.params;
  const idx = dbStore.jabatan.findIndex((j) => j.id === id);
  if (idx === -1) {
    res.status(404).json({ success: false, message: "Jenis jabatan tidak ditemukan." });
    return;
  }
  const current = dbStore.jabatan[idx];
  const cleanNama = req.body?.nama !== void 0 ? String(req.body.nama).trim() : current.nama;
  const cleanKode = req.body?.kode !== void 0 ? String(req.body.kode).trim().toUpperCase() || current.kode || id : current.kode || id;
  const cleanDeskripsi = req.body?.deskripsi !== void 0 ? String(req.body.deskripsi).trim() : current.deskripsi || "";
  if (!cleanNama) {
    res.status(400).json({ success: false, message: "Nama jenis jabatan wajib diisi." });
    return;
  }
  const duplicateName = dbStore.jabatan.find(
    (j) => j.id !== id && j.nama.trim().toLowerCase() === cleanNama.toLowerCase()
  );
  if (duplicateName) {
    res.status(400).json({ success: false, message: `Jenis jabatan "${cleanNama}" sudah terdaftar.` });
    return;
  }
  const duplicateKode = dbStore.jabatan.find(
    (j) => j.id !== id && (j.kode || "").trim().toUpperCase() === cleanKode
  );
  if (duplicateKode) {
    res.status(400).json({ success: false, message: `Kode jabatan "${cleanKode}" sudah digunakan.` });
    return;
  }
  const nowIso = (/* @__PURE__ */ new Date()).toISOString();
  const updatedJabatan = {
    id,
    kode: cleanKode,
    nama: cleanNama,
    deskripsi: cleanDeskripsi,
    createdAt: current.createdAt || nowIso,
    updatedAt: nowIso
  };
  dbStore.jabatan[idx] = updatedJabatan;
  dbStore.divisi = dbStore.divisi.map((d) => {
    const matchesJab = d.jabatanId === id || (d.kode || "").trim().toUpperCase() === cleanKode || current.kode && (d.kode || "").trim().toUpperCase() === (current.kode || "").trim().toUpperCase();
    if (matchesJab) {
      return {
        ...d,
        kode: cleanKode,
        jabatanId: id,
        jabatanNama: cleanNama,
        updatedAt: nowIso
      };
    }
    return d;
  });
  dbStore.addLog("ADMIN", "System Administrator", "Master Data", "Edit Jenis Jabatan", `Memperbarui jenis jabatan '${cleanNama}' (${cleanKode})`, req.ip);
  await syncSaveDoc("jabatan", id, updatedJabatan);
  const syncOnJabEdit = dbStore.syncJabatanFromMasterDivisi();
  if (syncOnJabEdit.updatedPetugas.length > 0) await syncSaveBatch("petugasList", syncOnJabEdit.updatedPetugas);
  if (syncOnJabEdit.updatedSlips.length > 0) await syncSaveBatch("slipGajiList", syncOnJabEdit.updatedSlips);
  if (syncOnJabEdit.updatedAbsensi.length > 0) await syncSaveBatch("rekapAbsensiList", syncOnJabEdit.updatedAbsensi);
  saveSnapshotToDiskNow();
  res.json({ success: true, message: "Jenis jabatan berhasil diperbarui.", data: updatedJabatan });
});
router5.delete("/jabatan/:id", async (req, res) => {
  const { id } = req.params;
  const idx = dbStore.jabatan.findIndex((j) => j.id === id);
  if (idx !== -1) {
    const deleted = dbStore.jabatan.splice(idx, 1)[0];
    dbStore.addLog("ADMIN", "System Administrator", "Master Data", "Hapus Jenis Jabatan", `Menghapus jenis jabatan '${deleted.nama}' (${deleted.kode})`, req.ip);
    await syncDeleteDoc("jabatan", id);
    saveSnapshotToDiskNow();
    res.json({ success: true, message: "Jenis jabatan berhasil dihapus dari database.", data: deleted });
  } else {
    res.status(404).json({ success: false, message: "Jenis jabatan tidak ditemukan." });
  }
});
router5.get("/gudang", (req, res) => {
  res.json({ success: true, data: dbStore.gudang });
});
router5.post("/gudang", async (req, res) => {
  const { nama, kode, lokasi, penanggungJawab, kapasitasM3, status } = req.body;
  if (!nama) {
    res.status(400).json({ success: false, message: "Nama gudang wajib diisi." });
    return;
  }
  let newGdgId = "";
  do {
    newGdgId = generateUniqueId("GDG");
  } while (dbStore.gudang.some((g) => g.id === newGdgId));
  const newGdg = {
    id: newGdgId,
    nama,
    kode: kode || `GDG-${nama.slice(0, 3).toUpperCase()}`,
    lokasi: lokasi || "Area SPPG Kraksaan",
    penanggungJawab: penanggungJawab || "Petugas Gudang",
    kapasitasM3: Number(kapasitasM3) || 100,
    status: status === "Nonaktif" ? "Nonaktif" : "Aktif",
    createdAt: (/* @__PURE__ */ new Date()).toISOString()
  };
  dbStore.gudang.unshift(newGdg);
  await syncSaveDoc("gudang", newGdg.id, newGdg);
  res.status(201).json({ success: true, message: "Gudang berhasil ditambahkan", data: newGdg });
});
router5.put("/gudang/:id", async (req, res) => {
  const { id } = req.params;
  const idx = dbStore.gudang.findIndex((g) => g.id === id);
  if (idx === -1) {
    res.status(404).json({ success: false, message: "Gudang tidak ditemukan." });
    return;
  }
  dbStore.gudang[idx] = { ...dbStore.gudang[idx], ...req.body };
  await syncSaveDoc("gudang", id, dbStore.gudang[idx]);
  res.json({ success: true, message: "Gudang berhasil diperbarui", data: dbStore.gudang[idx] });
});
router5.delete("/gudang/:id", async (req, res) => {
  const { id } = req.params;
  const idx = dbStore.gudang.findIndex((g) => g.id === id);
  if (idx !== -1) {
    const deleted = dbStore.gudang.splice(idx, 1)[0];
    await syncDeleteDoc("gudang", id);
    res.json({ success: true, message: "Gudang berhasil dihapus", data: deleted });
  } else {
    res.status(404).json({ success: false, message: "Gudang tidak ditemukan." });
  }
});
router5.get("/kategori", (req, res) => {
  res.json({ success: true, data: dbStore.kategori });
});
router5.post("/kategori", async (req, res) => {
  const { nama, kode, deskripsi } = req.body;
  if (!nama) {
    res.status(400).json({ success: false, message: "Nama kategori wajib diisi." });
    return;
  }
  let newKatId = "";
  do {
    newKatId = generateUniqueId("KAT");
  } while (dbStore.kategori.some((k) => k.id === newKatId));
  const newKat = {
    id: newKatId,
    nama,
    kode: kode || `KAT-${nama.slice(0, 3).toUpperCase()}`,
    deskripsi: deskripsi || "",
    jumlahBarang: 0,
    createdAt: (/* @__PURE__ */ new Date()).toISOString()
  };
  dbStore.kategori.unshift(newKat);
  await syncSaveDoc("kategori", newKat.id, newKat);
  res.status(201).json({ success: true, message: "Kategori berhasil ditambahkan", data: newKat });
});
router5.put("/kategori/:id", async (req, res) => {
  const { id } = req.params;
  const idx = dbStore.kategori.findIndex((k) => k.id === id);
  if (idx === -1) {
    res.status(404).json({ success: false, message: "Kategori tidak ditemukan." });
    return;
  }
  dbStore.kategori[idx] = { ...dbStore.kategori[idx], ...req.body };
  await syncSaveDoc("kategori", id, dbStore.kategori[idx]);
  res.json({ success: true, message: "Kategori berhasil diperbarui", data: dbStore.kategori[idx] });
});
router5.delete("/kategori/:id", async (req, res) => {
  const { id } = req.params;
  const idx = dbStore.kategori.findIndex((k) => k.id === id);
  if (idx !== -1) {
    const deleted = dbStore.kategori.splice(idx, 1)[0];
    await syncDeleteDoc("kategori", id);
    res.json({ success: true, message: "Kategori berhasil dihapus", data: deleted });
  } else {
    res.status(404).json({ success: false, message: "Kategori tidak ditemukan." });
  }
});
router5.get("/instansi", (req, res) => {
  res.json({ success: true, data: dbStore.instansi });
});
router5.post("/instansi", async (req, res) => {
  const { nama, jenis, alamat, kontak, telepon, email, status } = req.body;
  if (!nama) {
    res.status(400).json({ success: false, message: "Nama instansi mitra wajib diisi." });
    return;
  }
  let newInsId = "";
  do {
    newInsId = generateUniqueId("INS");
  } while (dbStore.instansi.some((i) => i.id === newInsId));
  const newInstansi = {
    id: newInsId,
    kode: req.body.kode || newInsId,
    nama,
    jenis: jenis || "Sekolah / Madrasah",
    alamat: alamat || "Kabupaten Probolinggo",
    kontak: kontak || "-",
    kontakPerson: req.body.kontakPerson || kontak || "-",
    telepon: telepon || "-",
    email: email || "-",
    status: status || "Aktif",
    createdAt: (/* @__PURE__ */ new Date()).toISOString()
  };
  dbStore.instansi.unshift(newInstansi);
  await syncSaveDoc("instansi", newInstansi.id, newInstansi);
  res.status(201).json({ success: true, message: "Instansi mitra berhasil ditambahkan", data: newInstansi });
});
router5.put("/instansi/:id", async (req, res) => {
  const { id } = req.params;
  const idx = dbStore.instansi.findIndex((i) => i.id === id);
  if (idx === -1) {
    res.status(404).json({ success: false, message: "Instansi tidak ditemukan." });
    return;
  }
  dbStore.instansi[idx] = { ...dbStore.instansi[idx], ...req.body };
  await syncSaveDoc("instansi", id, dbStore.instansi[idx]);
  res.json({ success: true, message: "Instansi berhasil diperbarui", data: dbStore.instansi[idx] });
});
router5.delete("/instansi/:id", async (req, res) => {
  const { id } = req.params;
  const idx = dbStore.instansi.findIndex((i) => i.id === id);
  if (idx !== -1) {
    const deleted = dbStore.instansi.splice(idx, 1)[0];
    await syncDeleteDoc("instansi", id);
    res.json({ success: true, message: "Instansi berhasil dihapus", data: deleted });
  } else {
    res.status(404).json({ success: false, message: "Instansi tidak ditemukan." });
  }
});
var master_default = router5;

// server/routes/esurat.ts
var import_express6 = require("express");
var router6 = (0, import_express6.Router)();
router6.get("/surat-masuk", (req, res) => {
  res.json({ success: true, data: dbStore.suratMasuk });
});
router6.post("/surat-masuk", (req, res) => {
  const { nomorSurat, pengirim, perihal, tanggalSurat, tanggalTerima, sifat, ringkasan } = req.body;
  if (!nomorSurat || !pengirim || !perihal) {
    res.status(400).json({ success: false, message: "Nomor Surat, Pengirim, dan Perihal wajib diisi." });
    return;
  }
  const newSurat = {
    id: `SM-2026-${String(dbStore.suratMasuk.length + 1).padStart(3, "0")}`,
    nomorSurat,
    nomorAgenda: `AGD-2026-${String(100 + dbStore.suratMasuk.length)}`,
    pengirim,
    perihal,
    tanggalSurat: tanggalSurat || (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
    tanggalTerima: tanggalTerima || (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
    sifat: sifat || "Biasa",
    status: "Baru",
    ringkasan,
    qrCodeUrl: `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=VERIFIED-SM-${Date.now()}`
  };
  dbStore.suratMasuk.unshift(newSurat);
  syncSaveDoc("suratMasuk", newSurat.id, newSurat);
  dbStore.addLog("USER", "Operator e-Surat", "e-Surat Digital", "Input Surat Masuk", `Mencatat Surat Masuk No: ${nomorSurat}`, req.ip);
  dbStore.addNotification("e-Surat", "Surat Masuk Baru Received", `Surat Masuk No: ${nomorSurat} dari ${pengirim} telah dicatat.`, "info", "/esurat");
  res.status(201).json({ success: true, message: "Surat Masuk berhasil dicatat", data: newSurat });
});
router6.get("/surat-keluar", (req, res) => {
  res.json({ success: true, data: dbStore.suratKeluar });
});
router6.post("/surat-keluar/generate-number", (req, res) => {
  const { divisiCode = "TIK" } = req.body;
  const count = dbStore.suratKeluar.length + 1;
  const romanMonths = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII"];
  const monthRoman = romanMonths[(/* @__PURE__ */ new Date()).getMonth()];
  const generatedNum = `${String(count).padStart(3, "0")}/PORTAL-${divisiCode}/SK/${monthRoman}/2026`;
  res.json({ success: true, data: { nomorSurat: generatedNum } });
});
router6.post("/surat-keluar", (req, res) => {
  const { nomorSurat, tujuan, perihal, tanggalSurat, pembuat, templateId } = req.body;
  if (!tujuan || !perihal) {
    res.status(400).json({ success: false, message: "Tujuan dan Perihal wajib diisi." });
    return;
  }
  const generatedNum = nomorSurat || `${String(dbStore.suratKeluar.length + 1).padStart(3, "0")}/PORTAL-TIK/SK/VII/2026`;
  const newSurat = {
    id: `SK-2026-${String(dbStore.suratKeluar.length + 1).padStart(3, "0")}`,
    nomorSurat: generatedNum,
    tujuan,
    perihal,
    tanggalSurat: tanggalSurat || (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
    pembuat: pembuat || "Staf Tata Usaha",
    statusApproval: "Menunggu Approval",
    templateId,
    qrCodeUrl: `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=VERIFIED-SK-${Date.now()}`
  };
  dbStore.suratKeluar.unshift(newSurat);
  syncSaveDoc("suratKeluar", newSurat.id, newSurat);
  dbStore.addLog("USER", pembuat || "Staf TU", "e-Surat Digital", "Buat Surat Keluar", `Draft Surat Keluar No: ${generatedNum}`, req.ip);
  dbStore.addNotification("e-Surat", "Permohonan Approval Surat Keluar", `Surat Keluar No: ${generatedNum} menunggu persetujuan supervisor.`, "info", "/esurat");
  res.status(201).json({ success: true, message: "Surat Keluar diajukan untuk approval", data: newSurat });
});
router6.put("/surat-keluar/:id/approve", (req, res) => {
  const { id } = req.params;
  const { statusApproval, approver } = req.body;
  const surat = dbStore.suratKeluar.find((s) => s.id === id);
  if (!surat) {
    res.status(404).json({ success: false, message: "Surat Keluar tidak ditemukan." });
    return;
  }
  surat.statusApproval = statusApproval || "Disetujui";
  surat.approver = approver || "Dr. H. Ahmad Pratama, M.Kom";
  syncSaveDoc("suratKeluar", surat.id, surat);
  dbStore.addLog("ADMIN", approver || "Pimpinan", "e-Surat Digital", "Approval Surat Keluar", `Surat Keluar No: ${surat.nomorSurat} status: ${surat.statusApproval}`, req.ip);
  dbStore.addNotification("e-Surat", `Surat Keluar ${surat.statusApproval}`, `Surat Keluar ${surat.nomorSurat} telah ${surat.statusApproval}.`, "success", "/esurat");
  res.json({ success: true, message: `Surat Keluar berhasil ${surat.statusApproval}`, data: surat });
});
router6.get("/disposisi", (req, res) => {
  res.json({ success: true, data: dbStore.disposisi });
});
router6.post("/disposisi", (req, res) => {
  const { suratMasukId, pengirimDisposisi, penerimaDisposisi, instruksi, sifat, batasWaktu } = req.body;
  const surat = dbStore.suratMasuk.find((s) => s.id === suratMasukId);
  if (!surat) {
    res.status(400).json({ success: false, message: "Surat Masuk sasaran tidak valid." });
    return;
  }
  const newDisposisi = {
    id: `DSP-${String(dbStore.disposisi.length + 1).padStart(3, "0")}`,
    suratMasukId,
    nomorSurat: surat.nomorSurat,
    pengirimDisposisi: pengirimDisposisi || "Kepala Pusat Data",
    penerimaDisposisi: penerimaDisposisi || "Divisi TIK & Logistik",
    instruksi: instruksi || "Harap ditindaklanjuti segera.",
    sifat: sifat || "Segera",
    batasWaktu: batasWaktu || "2026-08-05",
    status: "Pending",
    tanggalDisposisi: (/* @__PURE__ */ new Date()).toISOString().replace("T", " ").slice(0, 16)
  };
  surat.status = "Proses Disposisi";
  dbStore.disposisi.unshift(newDisposisi);
  syncSaveDoc("disposisi", newDisposisi.id, newDisposisi);
  syncSaveDoc("suratMasuk", surat.id, surat);
  dbStore.addLog("ADMIN", pengirimDisposisi || "Pimpinan", "e-Surat Digital", "Disposisi Surat", `Meneruskan disposisi Surat No: ${surat.nomorSurat}`, req.ip);
  dbStore.addNotification("e-Surat", "Disposisi Surat Baru", `Disposisi baru dari ${pengirimDisposisi} untuk ${penerimaDisposisi}.`, "warning", "/esurat");
  res.status(201).json({ success: true, message: "Disposisi berhasil diterbitkan", data: newDisposisi });
});
router6.get("/templates", (req, res) => {
  res.json({ success: true, data: dbStore.templates });
});
var esurat_default = router6;

// server/routes/stock.ts
var import_express7 = require("express");
var router7 = (0, import_express7.Router)();
router7.get("/summary", (req, res) => {
  const barang = dbStore.barang || [];
  const movements = dbStore.stockMovements || [];
  const sessions = dbStore.opnameSessions || [];
  const todayStr = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
  const totalBarang = barang.length;
  const totalStokPcs = barang.reduce((acc, b) => acc + (Number(b.stokSekarang) || 0), 0);
  const totalNilaiPersediaan = barang.reduce((acc, b) => acc + (Number(b.stokSekarang) || 0) * (Number(b.hargaSatuan) || 0), 0);
  const masukHariIni = movements.filter((m) => m.jenis === "Masuk" && m.tanggal.startsWith(todayStr)).reduce((acc, m) => acc + (Number(m.jumlah) || 0), 0);
  const keluarHariIni = movements.filter((m) => m.jenis === "Keluar" && m.tanggal.startsWith(todayStr)).reduce((acc, m) => acc + (Number(m.jumlah) || 0), 0);
  const stokRendahCount = 0;
  const opnameTerakhir = sessions.length > 0 ? sessions[0].tanggal : "-";
  res.json({
    success: true,
    data: {
      totalBarang,
      totalStokPcs,
      totalNilaiPersediaan,
      masukHariIni,
      keluarHariIni,
      stokRendahCount,
      opnameTerakhir
    }
  });
});
router7.get("/barang", (req, res) => {
  res.json({ success: true, data: dbStore.barang });
});
router7.post("/barang", async (req, res) => {
  const {
    namaBarang,
    kategoriId,
    gudangId,
    satuan,
    stokMinimal,
    stokSekarang,
    stokAwal,
    hargaSatuan,
    sumberSupplier,
    keterangan,
    fotoUrl,
    petugas
  } = req.body;
  if (!namaBarang || !kategoriId || !gudangId) {
    res.status(400).json({ success: false, message: "Nama Barang, Kategori, dan Gudang wajib diisi." });
    return;
  }
  const kat = dbStore.kategori.find((k) => k.id === kategoriId);
  const gdg = dbStore.gudang.find((g) => g.id === gudangId);
  const newId = generateUniqueId("BRG");
  const initStok = typeof stokAwal === "number" ? stokAwal : Number(stokSekarang) || 0;
  const newBarang = {
    id: newId,
    kodeBarang: `BRG-${kat?.kode || "GEN"}-${Date.now().toString(36).toUpperCase().slice(-4)}`,
    namaBarang,
    kategoriId,
    kategoriNama: kat?.nama || "Bahan Baku",
    gudangId,
    gudangNama: gdg?.nama || "Gudang Utama Central",
    satuan: satuan || "Pcs",
    stokSekarang: initStok,
    stokAwal: initStok,
    status: "Aktif",
    hargaSatuan: Number(hargaSatuan) || 0,
    barcode: `8991001${Date.now().toString().slice(-6)}`,
    qrCodeUrl: `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=BRG-${Date.now()}`,
    sumberSupplier: sumberSupplier || "",
    fotoUrl: fotoUrl || "",
    keterangan: keterangan || "",
    updatedAt: (/* @__PURE__ */ new Date()).toISOString()
  };
  dbStore.barang.unshift(newBarang);
  await syncSaveDoc("barang", newBarang.id, newBarang, { name: petugas });
  if (initStok > 0) {
    const initMovement = {
      id: generateUniqueId("MOV"),
      jenis: "Stock Awal",
      barangId: newBarang.id,
      kodeBarang: newBarang.kodeBarang,
      namaBarang: newBarang.namaBarang,
      jumlah: initStok,
      gudangId: newBarang.gudangId,
      gudangNama: newBarang.gudangNama,
      referensiNota: `INIT-${newBarang.kodeBarang}`,
      keterangan: "Pencatatan Saldo Stock Awal Baru",
      tanggal: (/* @__PURE__ */ new Date()).toISOString().replace("T", " ").slice(0, 16),
      petugas: petugas || "Staf Opname",
      hargaSatuan: newBarang.hargaSatuan,
      totalHarga: initStok * newBarang.hargaSatuan
    };
    dbStore.stockMovements.unshift(initMovement);
    await syncSaveDoc("stockMovements", initMovement.id, initMovement, { name: petugas });
  }
  dbStore.addLog("USER", petugas || "Staf Opname", "Stock Opname", "Tambah Master Barang", `Menambahkan barang baru: ${namaBarang} (${newBarang.kodeBarang})`, req.ip);
  res.status(201).json({ success: true, message: "Master Barang berhasil disimpan", data: newBarang });
});
router7.put("/barang/:id", async (req, res) => {
  const { id } = req.params;
  const item = dbStore.barang.find((b) => b.id === id);
  if (!item) {
    res.status(404).json({ success: false, message: "Barang tidak ditemukan" });
    return;
  }
  const {
    namaBarang,
    kategoriId,
    gudangId,
    satuan,
    stokSekarang,
    hargaSatuan,
    sumberSupplier,
    keterangan,
    fotoUrl,
    status,
    petugas
  } = req.body;
  if (kategoriId) {
    const kat = dbStore.kategori.find((k) => k.id === kategoriId);
    if (kat) {
      item.kategoriId = kategoriId;
      item.kategoriNama = kat.nama;
    }
  }
  if (gudangId) {
    const gdg = dbStore.gudang.find((g) => g.id === gudangId);
    if (gdg) {
      item.gudangId = gudangId;
      item.gudangNama = gdg.nama;
    }
  }
  if (namaBarang) item.namaBarang = namaBarang;
  if (satuan) item.satuan = satuan;
  if (typeof stokSekarang === "number") {
    item.stokSekarang = Number(stokSekarang);
    if (item.stokSekarang <= 0 && !status) {
      item.status = "Arsip";
    } else if (item.stokSekarang > 0 && item.status === "Arsip") {
      item.status = "Aktif";
    }
  }
  if (status) item.status = status;
  if (typeof hargaSatuan === "number") item.hargaSatuan = Number(hargaSatuan);
  if (sumberSupplier !== void 0) item.sumberSupplier = sumberSupplier;
  if (keterangan !== void 0) item.keterangan = keterangan;
  if (fotoUrl !== void 0) item.fotoUrl = fotoUrl;
  item.updatedAt = (/* @__PURE__ */ new Date()).toISOString();
  await syncSaveDoc("barang", item.id, item, { name: petugas });
  dbStore.addLog("USER", petugas || "Staf Opname", "Stock Opname", "Edit Master Barang", `Mengubah data barang: ${item.namaBarang} (${item.kodeBarang})`, req.ip);
  res.json({ success: true, message: "Data Barang Berhasil Diperbarui", data: item });
});
router7.delete("/barang/:id", async (req, res) => {
  const { id } = req.params;
  const idx = dbStore.barang.findIndex((b) => b.id === id);
  if (idx === -1) {
    res.status(404).json({ success: false, message: "Barang tidak ditemukan" });
    return;
  }
  const removed = dbStore.barang.splice(idx, 1)[0];
  await syncDeleteDoc("barang", id);
  const opPetugas = req.body && req.body.petugas || "Admin Logistik";
  const nowIso = (/* @__PURE__ */ new Date()).toISOString();
  const movId = generateUniqueId("MOV");
  const outQty = Number(removed.stokSekarang) || 0;
  const movementRecord = {
    id: movId,
    jenis: "Keluar",
    barangId: removed.id,
    kodeBarang: removed.kodeBarang,
    namaBarang: removed.namaBarang,
    satuan: removed.satuan || "Pcs",
    jumlah: outQty,
    gudangId: removed.gudangId,
    gudangNama: removed.gudangNama,
    referensiNota: `HAPUS-${Date.now().toString(36).toUpperCase()}`,
    keterangan: `Penghapusan Master Barang - Stok dikeluarkan (${outQty} ${removed.satuan})`,
    tanggal: `${nowIso.split("T")[0]} ${(/* @__PURE__ */ new Date()).toTimeString().slice(0, 5)}`,
    petugas: opPetugas,
    hargaSatuan: removed.hargaSatuan || 0,
    totalHarga: outQty * (removed.hargaSatuan || 0),
    sisaStock: 0,
    createdAt: nowIso,
    createdBy: opPetugas,
    updatedAt: nowIso,
    updatedBy: opPetugas
  };
  dbStore.stockMovements.unshift(movementRecord);
  await syncSaveDoc("stockMovements", movementRecord.id, movementRecord, { name: opPetugas });
  dbStore.addLog("USER", opPetugas, "Stock Opname", "Hapus Master Barang", `Menghapus barang: ${removed.namaBarang} (${removed.kodeBarang}) & mencatat saldo akhir ke History Keluar`, req.ip);
  res.json({ success: true, message: `Master Barang "${removed.namaBarang}" Berhasil Dihapus & Dicatat ke History Keluar` });
});
router7.post("/stock-awal", async (req, res) => {
  const { barangId, stokAwal, keterangan, petugas } = req.body;
  try {
    const qty = Number(stokAwal) || 0;
    const result = await runStockTransaction({
      barangId,
      jenis: "Stock Awal",
      jumlah: qty,
      keterangan: keterangan || `Penyesuaian Saldo Stock Awal`,
      petugas: petugas || "Staf Stock Opname"
    });
    dbStore.addLog("USER", petugas || "Staf Opname", "Stock Opname", "Set Stock Awal", `Pengaturan Stock Awal ${result.updatedBarang.namaBarang} diset ke ${qty}`, req.ip);
    res.status(200).json({ success: true, message: "Stock Awal berhasil diperbarui", data: { barang: result.updatedBarang, movement: result.movement } });
  } catch (err) {
    res.status(400).json({ success: false, message: err?.message || "Gagal memproses stock awal." });
  }
});
router7.get("/movements", (req, res) => {
  res.json({ success: true, data: dbStore.stockMovements });
});
router7.post("/movements", async (req, res) => {
  const {
    jenis,
    barangId,
    jumlah,
    referensiNota,
    keterangan,
    petugas,
    sumberSupplier,
    penerimaTujuan,
    hargaSatuan
  } = req.body;
  try {
    const result = await runStockTransaction({
      barangId,
      jenis: jenis || "Masuk",
      jumlah: Number(jumlah),
      referensiNota,
      keterangan,
      petugas: petugas || "Petugas Logistik",
      sumberSupplier,
      penerimaTujuan,
      hargaSatuan: typeof hargaSatuan === "number" ? hargaSatuan : void 0
    });
    const isPurged = result.updatedBarang && result.updatedBarang.stokSekarang <= 0;
    if (isPurged) {
      dbStore.barang = dbStore.barang.filter((b) => b.id !== barangId);
      await syncDeleteDoc("barang", barangId);
    }
    dbStore.addLog(
      "USER",
      petugas || "Staf Opname",
      "Stock Opname",
      `Stok ${jenis}`,
      isPurged ? `Transaksi Stok ${jenis} ${jumlah} - ${result.updatedBarang.namaBarang} (Stok 0/Habis: Barang Otomatis Dihapus dari Master Data)` : `Transaksi Stok ${jenis} ${jumlah} - ${result.updatedBarang.namaBarang}`,
      req.ip
    );
    res.status(201).json({
      success: true,
      message: isPurged ? `Transaksi Pengeluaran Berhasil! Barang "${result.updatedBarang.namaBarang}" telah habis (0) dan otomatis dihapus dari inventaris aktif.` : `Transaksi Stok ${jenis} Berhasil`,
      data: {
        movement: result.movement,
        barangUpdated: result.updatedBarang,
        isPurged
      }
    });
  } catch (err) {
    res.status(400).json({ success: false, message: err?.message || "Gagal memproses transaksi stok." });
  }
});
router7.post("/movements/bulk", async (req, res) => {
  const { items, jenis, referensiNota, sumberSupplier, petugas, keterangan } = req.body;
  if (!Array.isArray(items) || items.length === 0) {
    res.status(400).json({ success: false, message: "Daftar barang tidak boleh kosong." });
    return;
  }
  const results = [];
  const updatedBarang = [];
  const refNota = referensiNota || `BULK-${(jenis || "IN").toUpperCase()}-${Date.now().toString().slice(-6)}`;
  const opPetugas = petugas || "Petugas Logistik";
  const typeJenis = jenis || "Masuk";
  for (const row of items) {
    const { barangId, namaBarang, kategori, satuan, jumlah, hargaSatuan, sisaStok, lokasi, vendor } = row;
    let item = dbStore.barang.find((b) => b.id === barangId);
    if (!item && namaBarang) {
      item = dbStore.barang.find((b) => b.namaBarang.toLowerCase() === namaBarang.toLowerCase().trim());
    }
    let qty = Number(jumlah);
    const rowPrice = typeof hargaSatuan === "number" && !isNaN(hargaSatuan) && hargaSatuan > 0 ? Number(hargaSatuan) : void 0;
    if (!item && namaBarang) {
      const newId = generateUniqueId("BRG");
      item = {
        id: newId,
        kodeBarang: `ING-${Date.now().toString(36).toUpperCase()}`,
        namaBarang: namaBarang.trim(),
        kategoriId: (kategori || "").toLowerCase().includes("operasional") ? "KAT-002" : "KAT-001",
        kategoriNama: (kategori || "").toLowerCase().includes("operasional") ? "Operasional" : "Bahan Baku",
        stokSekarang: 0,
        stokMinimal: 0,
        satuan: satuan || "Pcs",
        hargaSatuan: rowPrice || 1e4,
        barcode: `899${Date.now().toString().slice(-8)}`,
        gudangId: "GDG-01",
        gudangNama: lokasi || "Gudang Utama",
        updatedAt: (/* @__PURE__ */ new Date()).toISOString()
      };
      dbStore.barang.unshift(item);
      await syncSaveDoc("barang", item.id, item, { name: opPetugas });
    } else if (item && rowPrice && rowPrice !== item.hargaSatuan) {
      item.hargaSatuan = rowPrice;
      await syncSaveDoc("barang", item.id, item, { name: opPetugas });
    }
    if (!item) continue;
    if (typeJenis === "Keluar" && typeof sisaStok === "number" && !isNaN(sisaStok)) {
      qty = item.stokSekarang - sisaStok;
    }
    if (isNaN(qty) || qty <= 0) continue;
    try {
      const txResult = await runStockTransaction({
        barangId: item.id,
        jenis: typeJenis,
        jumlah: qty,
        referensiNota: refNota,
        keterangan: keterangan || (typeJenis === "Masuk" ? "Penerimaan Massal Restock" : "Pengeluaran Massal"),
        petugas: opPetugas,
        sumberSupplier: sumberSupplier || vendor || "",
        penerimaTujuan: row.penerimaTujuan || "",
        hargaSatuan: rowPrice || item.hargaSatuan
      });
      results.push(txResult.movement);
      updatedBarang.push(txResult.updatedBarang);
    } catch (err) {
      console.warn(`Bulk stock skip for ${item.namaBarang}:`, err?.message);
    }
  }
  dbStore.addLog("USER", opPetugas, "Stock Opname", `Bulk Stok ${typeJenis}`, `Transaksi Massal ${typeJenis} sebanyak ${results.length} item barang`, req.ip);
  res.status(201).json({
    success: true,
    message: `Berhasil memproses ${results.length} transaksi barang ${typeJenis} secara massal!`,
    data: { movements: results, updatedBarang }
  });
});
router7.get("/opname-sessions", (req, res) => {
  res.json({ success: true, data: dbStore.opnameSessions });
});
router7.post("/opname-sessions", async (req, res) => {
  const { gudangId, petugas, items, catatanGeneral } = req.body;
  const gdg = dbStore.gudang.find((g) => g.id === gudangId);
  const opPetugas = petugas || "Tim Stock Opname";
  const session = {
    id: generateUniqueId("SOP"),
    kodeOpname: `SOP-${(/* @__PURE__ */ new Date()).getFullYear()}-${Date.now().toString(36).toUpperCase().slice(-4)}`,
    tanggal: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
    gudangId: gudangId || "GDG-001",
    gudangNama: gdg?.nama || "Gudang Utama Central Enterprise",
    petugas: opPetugas,
    status: "Selesai",
    items: items || [],
    catatanGeneral: catatanGeneral || "Sesi perhitungan fisik opname tercatat."
  };
  let autoDeletedCount = 0;
  const deletedItemsInfo = [];
  if (Array.isArray(items)) {
    for (const it of items) {
      const b = dbStore.barang.find((x) => x.id === it.barangId);
      if (!b || typeof it.stokFisik !== "number") continue;
      const stokLama = Number(b.stokSekarang) || 0;
      const selisih = it.stokFisik - stokLama;
      if (it.stokFisik <= 0) {
        const outQty = stokLama > 0 ? stokLama : 0;
        const nowIso = (/* @__PURE__ */ new Date()).toISOString();
        const movId = generateUniqueId("MOV");
        const zeroOutMovement = {
          id: movId,
          jenis: "Keluar",
          barangId: b.id,
          kodeBarang: b.kodeBarang,
          namaBarang: b.namaBarang,
          satuan: b.satuan || "Pcs",
          jumlah: outQty,
          gudangId: b.gudangId || session.gudangId,
          gudangNama: b.gudangNama || session.gudangNama,
          referensiNota: session.kodeOpname,
          keterangan: `Stock Opname (Stok 0) - Otomatis dipindahkan ke Arsip / Status Tidak Aktif. ${it.catatan || ""}`.trim(),
          tanggal: `${nowIso.split("T")[0]} ${(/* @__PURE__ */ new Date()).toTimeString().slice(0, 5)}`,
          petugas: opPetugas,
          hargaSatuan: b.hargaSatuan || 0,
          totalHarga: outQty * (b.hargaSatuan || 0),
          sisaStock: 0,
          createdAt: nowIso,
          createdBy: opPetugas,
          updatedAt: nowIso,
          updatedBy: opPetugas
        };
        dbStore.stockMovements.unshift(zeroOutMovement);
        await syncSaveDoc("stockMovements", zeroOutMovement.id, zeroOutMovement, { name: opPetugas });
        b.stokSekarang = 0;
        b.status = "Arsip";
        b.updatedAt = nowIso;
        await syncSaveDoc("barang", b.id, b, { name: opPetugas });
        autoDeletedCount++;
        deletedItemsInfo.push(`${b.namaBarang} (${b.kodeBarang})`);
      } else if (selisih !== 0) {
        try {
          await runStockTransaction({
            barangId: b.id,
            jenis: "Penyesuaian Opname",
            jumlah: it.stokFisik,
            referensiNota: session.kodeOpname,
            keterangan: `Penyesuaian Fisik Opname (${selisih > 0 ? "+" : ""}${selisih} ${b.satuan}) - ${it.catatan || "Koreksi Stok Fisik"}`,
            petugas: opPetugas
          });
        } catch (err) {
          console.error(`Opname adjustment error for ${b.namaBarang}:`, err?.message);
        }
      }
    }
  }
  dbStore.opnameSessions.unshift(session);
  await syncSaveDoc("opnameSessions", session.id, session, { name: opPetugas });
  const deleteMsg = autoDeletedCount > 0 ? ` (${autoDeletedCount} item stok kosong/0 otomatis dipindahkan ke Arsip Tidak Aktif & dicatat di History Keluar: ${deletedItemsInfo.join(", ")})` : "";
  dbStore.addLog("USER", opPetugas, "Stock Opname", "Finish Opname Physical", `Menyelesaikan Sesi Stock Opname Kode: ${session.kodeOpname}${deleteMsg}`, req.ip);
  dbStore.addNotification("Stock Opname", "Stock Opname Physical Selesai", `Sesi opname ${session.kodeOpname} telah diproses.${deleteMsg}`, "success", "/stock-opname/opname");
  res.status(201).json({
    success: true,
    message: `Sesi Stock Opname berhasil disimpan.${deleteMsg}`,
    data: session,
    autoDeletedCount,
    deletedItems: deletedItemsInfo
  });
});
router7.post("/opname/purge-zero", async (req, res) => {
  const { petugas = "Admin Logistik", permanentDelete = false } = req.body;
  const zeroItems = dbStore.barang.filter((b) => (Number(b.stokSekarang) || 0) <= 0);
  if (zeroItems.length === 0) {
    res.json({ success: true, message: "Tidak ada barang dengan stok 0 / kosong di Master Stok.", purgedCount: 0 });
    return;
  }
  const purgedNames = [];
  const nowIso = (/* @__PURE__ */ new Date()).toISOString();
  const dateStr = `${nowIso.split("T")[0]} ${(/* @__PURE__ */ new Date()).toTimeString().slice(0, 5)}`;
  for (const b of zeroItems) {
    const movId = generateUniqueId("MOV");
    const mov = {
      id: movId,
      jenis: "Keluar",
      barangId: b.id,
      kodeBarang: b.kodeBarang,
      namaBarang: b.namaBarang,
      satuan: b.satuan || "Pcs",
      jumlah: 0,
      gudangId: b.gudangId,
      gudangNama: b.gudangNama,
      referensiNota: `OPN-ZERO-${Date.now().toString(36).toUpperCase()}`,
      keterangan: "Stock Opname: Stok Kosong (0) - Dipindahkan ke Arsip / Status Tidak Aktif",
      tanggal: dateStr,
      petugas,
      hargaSatuan: b.hargaSatuan || 0,
      totalHarga: 0,
      sisaStock: 0,
      createdAt: nowIso,
      createdBy: petugas,
      updatedAt: nowIso,
      updatedBy: petugas
    };
    dbStore.stockMovements.unshift(mov);
    await syncSaveDoc("stockMovements", mov.id, mov, { name: petugas });
    if (permanentDelete) {
      const idx = dbStore.barang.findIndex((x) => x.id === b.id);
      if (idx !== -1) {
        dbStore.barang.splice(idx, 1);
      }
      await syncDeleteDoc("barang", b.id);
    } else {
      b.stokSekarang = 0;
      b.status = "Arsip";
      b.updatedAt = nowIso;
      await syncSaveDoc("barang", b.id, b, { name: petugas });
    }
    purgedNames.push(`${b.namaBarang} (${b.kodeBarang})`);
  }
  dbStore.addLog("USER", petugas, "Stock Opname", "Arsip Barang Stok Kosong", `Memindahkan ${purgedNames.length} barang stok 0 ke Arsip Tidak Aktif: ${purgedNames.join(", ")}`, req.ip);
  res.json({
    success: true,
    message: `Berhasil memindahkan ${purgedNames.length} barang stok 0 ke Arsip / Status Tidak Aktif. Riwayat tetap tersimpan di History Barang Keluar.`,
    purgedCount: purgedNames.length,
    purgedItems: purgedNames
  });
});
var stock_default = router7;

// server/routes/notifications.ts
var import_express8 = require("express");
var router8 = (0, import_express8.Router)();
router8.get("/", (req, res) => {
  res.json({ success: true, data: dbStore.notifications });
});
router8.put("/read-all", (req, res) => {
  dbStore.notifications.forEach((n) => n.isRead = true);
  res.json({ success: true, message: "Semua notifikasi telah ditandai dibaca." });
});
router8.put("/:id/read", (req, res) => {
  const ntf = dbStore.notifications.find((n) => n.id === req.params.id);
  if (ntf) {
    ntf.isRead = true;
    res.json({ success: true, data: ntf });
  } else {
    res.status(404).json({ success: false, message: "Notifikasi tidak ditemukan." });
  }
});
router8.post("/", (req, res) => {
  const { modul, judul, pesan, tipe, linkUrl } = req.body;
  dbStore.addNotification(modul || "System", judul, pesan, tipe || "info", linkUrl);
  res.status(201).json({ success: true, message: "Notifikasi berhasil dikirim." });
});
var notifications_default = router8;

// server/routes/logs.ts
var import_express9 = require("express");
var router9 = (0, import_express9.Router)();
router9.get("/", (req, res) => {
  const { search, modul, status } = req.query;
  let filtered = [...dbStore.activityLogs];
  if (modul && typeof modul === "string" && modul !== "All") {
    filtered = filtered.filter((l) => l.modul.toLowerCase().includes(modul.toLowerCase()));
  }
  if (status && typeof status === "string" && status !== "All") {
    filtered = filtered.filter((l) => l.status === status);
  }
  if (search && typeof search === "string") {
    const q = search.toLowerCase();
    filtered = filtered.filter(
      (l) => l.namaUser.toLowerCase().includes(q) || l.aktivitas.toLowerCase().includes(q) || l.detail?.toLowerCase().includes(q) || l.ipAddress.includes(q)
    );
  }
  res.json({ success: true, data: filtered });
});
var logs_default = router9;

// server/routes/search.ts
var import_express10 = require("express");
var router10 = (0, import_express10.Router)();
router10.get("/", (req, res) => {
  const q = (req.query.q || "").trim().toLowerCase();
  if (!q) {
    res.json({ success: true, data: [] });
    return;
  }
  const results = [];
  dbStore.suratMasuk.forEach((sm) => {
    if (sm.nomorSurat.toLowerCase().includes(q) || sm.nomorAgenda.toLowerCase().includes(q) || sm.pengirim.toLowerCase().includes(q) || sm.perihal.toLowerCase().includes(q)) {
      results.push({
        id: sm.id,
        type: "Surat Masuk",
        modul: "e-Surat",
        title: `Surat Masuk: ${sm.nomorSurat}`,
        subtitle: `${sm.pengirim} - ${sm.perihal}`,
        badge: sm.sifat,
        targetView: "/esurat"
      });
    }
  });
  dbStore.suratKeluar.forEach((sk) => {
    if (sk.nomorSurat.toLowerCase().includes(q) || sk.tujuan.toLowerCase().includes(q) || sk.perihal.toLowerCase().includes(q)) {
      results.push({
        id: sk.id,
        type: "Surat Keluar",
        modul: "e-Surat",
        title: `Surat Keluar: ${sk.nomorSurat}`,
        subtitle: `Tujuan: ${sk.tujuan} - ${sk.perihal}`,
        badge: sk.statusApproval,
        targetView: "/esurat"
      });
    }
  });
  dbStore.barang.forEach((b) => {
    if (b.kodeBarang.toLowerCase().includes(q) || b.namaBarang.toLowerCase().includes(q) || b.barcode.includes(q) || b.kategoriNama.toLowerCase().includes(q)) {
      results.push({
        id: b.id,
        type: "Barang",
        modul: "Stock Opname",
        title: `[${b.kodeBarang}] ${b.namaBarang}`,
        subtitle: `Stok Saat Ini: ${b.stokSekarang} ${b.satuan} (${b.gudangNama})`,
        badge: `${b.stokSekarang} ${b.satuan}`,
        targetView: "/stock"
      });
    }
  });
  dbStore.pegawai.forEach((p) => {
    if (p.nama.toLowerCase().includes(q) || p.nip.toLowerCase().includes(q) || p.email.toLowerCase().includes(q) || p.divisiNama.toLowerCase().includes(q)) {
      results.push({
        id: p.id,
        type: "Pegawai",
        modul: "Master Data",
        title: `Pegawai: ${p.nama} (NIP: ${p.nip})`,
        subtitle: `${p.jabatanNama} - ${p.divisiNama}`,
        badge: p.status,
        targetView: "/master-data"
      });
    }
  });
  res.json({ success: true, query: q, total: results.length, data: results });
});
var search_default = router10;

// server/routes/settings.ts
var import_express11 = require("express");
var router11 = (0, import_express11.Router)();
router11.get("/", (req, res) => {
  res.json({ success: true, data: dbStore.settings });
});
router11.put("/", (req, res) => {
  dbStore.settings = { ...dbStore.settings, ...req.body };
  dbStore.addLog("ADMIN", "System Administrator", "Pengaturan Portal", "Update Configuration", "Memperbarui konfigurasi utama portal", req.ip);
  res.json({ success: true, message: "Pengaturan Portal berhasil disimpan", data: dbStore.settings });
});
router11.get("/backup/export", (req, res) => {
  const snapshot = {
    timestamp: (/* @__PURE__ */ new Date()).toISOString(),
    version: "2026.1.0-Enterprise",
    settings: dbStore.settings,
    users: dbStore.users,
    roles: dbStore.roles,
    menus: dbStore.menus,
    pegawai: dbStore.pegawai,
    divisi: dbStore.divisi,
    jabatan: dbStore.jabatan,
    gudang: dbStore.gudang,
    kategori: dbStore.kategori,
    instansi: dbStore.instansi,
    suratMasuk: dbStore.suratMasuk,
    suratKeluar: dbStore.suratKeluar,
    disposisi: dbStore.disposisi,
    templates: dbStore.templates,
    barang: dbStore.barang,
    stockMovements: dbStore.stockMovements,
    opnameSessions: dbStore.opnameSessions,
    notifications: dbStore.notifications,
    activityLogs: dbStore.activityLogs
  };
  dbStore.addLog("ADMIN", "System Administrator", "Pengaturan Portal", "Database Backup Export", "Mengekspor cadangan sistem JSON", req.ip);
  res.json({ success: true, data: snapshot });
});
router11.post("/backup/restore", (req, res) => {
  const { data } = req.body;
  if (!data) {
    res.status(400).json({ success: false, message: "Payload restore data tidak valid." });
    return;
  }
  if (data.users) dbStore.users = data.users;
  if (data.menus) dbStore.menus = data.menus;
  if (data.pegawai) dbStore.pegawai = data.pegawai;
  if (data.barang) dbStore.barang = data.barang;
  if (data.suratMasuk) dbStore.suratMasuk = data.suratMasuk;
  if (data.settings) dbStore.settings = data.settings;
  dbStore.addLog("ADMIN", "System Administrator", "Pengaturan Portal", "Database Restore", "Memulihkan data sistem dari cadangan JSON", req.ip);
  res.json({ success: true, message: "Restore data sistem berhasil diselesaikan." });
});
var settings_default = router11;

// server/routes/bbm.ts
var import_express12 = require("express");
var router12 = (0, import_express12.Router)();
router12.get("/kendaraan", (req, res) => {
  try {
    res.json({
      success: true,
      data: dbStore.kendaraan
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});
router12.post("/kendaraan", (req, res) => {
  try {
    const { namaKendaraan, platNomor, jenisKendaraan, standarKmLiter, status } = req.body;
    if (!namaKendaraan || !platNomor || !standarKmLiter) {
      return res.status(400).json({
        success: false,
        message: "Nama kendaraan, plat nomor, dan standar KM/Liter wajib diisi."
      });
    }
    const newKendaraan = {
      id: `KND-${Date.now()}`,
      namaKendaraan,
      platNomor: platNomor.toUpperCase(),
      jenisKendaraan: jenisKendaraan || "Mobil Operasional",
      standarKmLiter: Number(standarKmLiter),
      status: status || "Aktif"
    };
    dbStore.kendaraan.unshift(newKendaraan);
    dbStore.addLog("SYSTEM", "Admin", "Laporan BBM", "Tambah Master Kendaraan", `Menambahkan kendaraan ${namaKendaraan} (${platNomor})`);
    syncSaveDoc("kendaraan", newKendaraan.id, newKendaraan);
    res.status(201).json({
      success: true,
      data: newKendaraan,
      message: "Master kendaraan berhasil ditambahkan."
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});
router12.put("/kendaraan/:id", (req, res) => {
  try {
    const { id } = req.params;
    const index = dbStore.kendaraan.findIndex((k) => k.id === id);
    if (index === -1) {
      return res.status(404).json({ success: false, message: "Kendaraan tidak ditemukan." });
    }
    const { namaKendaraan, platNomor, jenisKendaraan, standarKmLiter, status } = req.body;
    dbStore.kendaraan[index] = {
      ...dbStore.kendaraan[index],
      namaKendaraan: namaKendaraan || dbStore.kendaraan[index].namaKendaraan,
      platNomor: platNomor ? platNomor.toUpperCase() : dbStore.kendaraan[index].platNomor,
      jenisKendaraan: jenisKendaraan || dbStore.kendaraan[index].jenisKendaraan,
      standarKmLiter: standarKmLiter !== void 0 ? Number(standarKmLiter) : dbStore.kendaraan[index].standarKmLiter,
      status: status || dbStore.kendaraan[index].status
    };
    dbStore.addLog("SYSTEM", "Admin", "Laporan BBM", "Update Master Kendaraan", `Memperbarui data kendaraan ${dbStore.kendaraan[index].namaKendaraan}`);
    syncSaveDoc("kendaraan", id, dbStore.kendaraan[index]);
    res.json({
      success: true,
      data: dbStore.kendaraan[index],
      message: "Data kendaraan berhasil diperbarui."
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});
router12.delete("/kendaraan/:id", (req, res) => {
  try {
    const { id } = req.params;
    const index = dbStore.kendaraan.findIndex((k) => k.id === id);
    if (index === -1) {
      return res.status(404).json({ success: false, message: "Kendaraan tidak ditemukan." });
    }
    const removed = dbStore.kendaraan.splice(index, 1)[0];
    dbStore.addLog("SYSTEM", "Admin", "Laporan BBM", "Hapus Master Kendaraan", `Menghapus kendaraan ${removed.namaKendaraan} (${removed.platNomor})`);
    syncDeleteDoc("kendaraan", id);
    res.json({
      success: true,
      message: "Kendaraan berhasil dihapus."
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});
router12.get("/latest-km/:kendaraanId", (req, res) => {
  try {
    const { kendaraanId } = req.params;
    const vehicle = dbStore.kendaraan.find((k) => k.id === kendaraanId);
    if (!vehicle) {
      return res.status(404).json({ success: false, message: "Kendaraan tidak ditemukan." });
    }
    const vehicleLogs = dbStore.laporanBbm.filter((log) => log.kendaraanId === kendaraanId);
    let latestKmAwal = 0;
    if (vehicleLogs.length > 0) {
      latestKmAwal = Math.max(...vehicleLogs.map((l) => l.kmAkhir));
    }
    res.json({
      success: true,
      data: {
        kendaraanId,
        namaKendaraan: vehicle.namaKendaraan,
        platNomor: vehicle.platNomor,
        standarKmLiter: vehicle.standarKmLiter,
        latestKmAwal
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});
router12.get("/dashboard", (req, res) => {
  try {
    const now = /* @__PURE__ */ new Date();
    const currentYearStr = req.query.tahun ? String(req.query.tahun) : String(now.getFullYear());
    const currentMonthStr = req.query.bulan ? String(req.query.bulan).padStart(2, "0") : String(now.getMonth() + 1).padStart(2, "0");
    const thisMonthLogs = dbStore.laporanBbm.filter((l) => {
      const [year, month] = l.tanggalPembelian.split("-");
      return year === currentYearStr && month === currentMonthStr;
    });
    const totalPengeluaranBulanIni = thisMonthLogs.reduce((acc, curr) => acc + curr.hargaBbm, 0);
    const totalLiterBulanIni = thisMonthLogs.reduce((acc, curr) => acc + curr.jumlahLiter, 0);
    const totalJarakTempuhBulanIni = thisMonthLogs.reduce((acc, curr) => acc + curr.jarakTempuh, 0);
    const rataRataKmLiter = totalLiterBulanIni > 0 ? parseFloat((totalJarakTempuhBulanIni / totalLiterBulanIni).toFixed(2)) : 0;
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"];
    const pengeluaranPerBulan = monthNames.map((mName, idx) => {
      const mStr = String(idx + 1).padStart(2, "0");
      const monthLogs = dbStore.laporanBbm.filter((l) => l.tanggalPembelian.startsWith(`${currentYearStr}-${mStr}`));
      const totalRupiah = monthLogs.reduce((a, b) => a + b.hargaBbm, 0);
      const totalLiter = monthLogs.reduce((a, b) => a + Number(b.jumlahLiter), 0);
      return {
        bulan: mName,
        totalRupiah,
        totalLiter: parseFloat(totalLiter.toFixed(1))
      };
    });
    const efisiensiPerKendaraan = dbStore.kendaraan.map((v) => {
      const logs = dbStore.laporanBbm.filter((l) => l.kendaraanId === v.id);
      const totalDist = logs.reduce((a, b) => a + b.jarakTempuh, 0);
      const totalLit = logs.reduce((a, b) => a + b.jumlahLiter, 0);
      const avgKmLiter = totalLit > 0 ? parseFloat((totalDist / totalLit).toFixed(2)) : 0;
      const status = avgKmLiter >= v.standarKmLiter || logs.length === 0 ? "Normal" : "Tidak Normal";
      return {
        kendaraan: v.namaKendaraan,
        platNomor: v.platNomor,
        kmLiterAktual: avgKmLiter,
        standarKmLiter: v.standarKmLiter,
        status
      };
    });
    const kendaraanTerboros = dbStore.kendaraan.map((v) => {
      const logs = dbStore.laporanBbm.filter((l) => l.kendaraanId === v.id);
      const borosLogs = logs.filter((l) => l.statusPemakaian === "Tidak Normal");
      const totalRupiah = logs.reduce((a, b) => a + b.hargaBbm, 0);
      const totalDist = logs.reduce((a, b) => a + b.jarakTempuh, 0);
      const totalLit = logs.reduce((a, b) => a + b.jumlahLiter, 0);
      const avgKmLiter = totalLit > 0 ? parseFloat((totalDist / totalLit).toFixed(2)) : 0;
      return {
        kendaraan: v.namaKendaraan,
        platNomor: v.platNomor,
        totalBorosCount: borosLogs.length,
        avgKmLiter,
        totalRupiah
      };
    }).sort((a, b) => b.totalBorosCount - a.totalBorosCount || b.totalRupiah - a.totalRupiah);
    res.json({
      success: true,
      data: {
        totalPengeluaranBulanIni,
        totalLiterBulanIni: parseFloat(totalLiterBulanIni.toFixed(2)),
        totalJarakTempuhBulanIni,
        rataRataKmLiter,
        totalTransaksi: thisMonthLogs.length,
        pengeluaranPerBulan,
        efisiensiPerKendaraan,
        kendaraanTerboros
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});
router12.get("/", (req, res) => {
  try {
    const { tanggal, bulan, tahun, kendaraanId, jenisBbm, statusPemakaian, search } = req.query;
    let filtered = [...dbStore.laporanBbm];
    if (tanggal) {
      filtered = filtered.filter((item) => item.tanggalPembelian === String(tanggal));
    }
    if (bulan) {
      const bStr = String(bulan).padStart(2, "0");
      filtered = filtered.filter((item) => item.tanggalPembelian.split("-")[1] === bStr);
    }
    if (tahun) {
      filtered = filtered.filter((item) => item.tanggalPembelian.split("-")[0] === String(tahun));
    }
    if (kendaraanId) {
      filtered = filtered.filter((item) => item.kendaraanId === String(kendaraanId));
    }
    if (jenisBbm) {
      filtered = filtered.filter((item) => item.jenisBbm === String(jenisBbm));
    }
    if (statusPemakaian) {
      filtered = filtered.filter((item) => item.statusPemakaian === String(statusPemakaian));
    }
    if (search) {
      const q = String(search).toLowerCase();
      filtered = filtered.filter(
        (item) => item.kendaraanNama.toLowerCase().includes(q) || item.platNomor.toLowerCase().includes(q) || item.userInput.toLowerCase().includes(q) || item.jenisBbm.toLowerCase().includes(q)
      );
    }
    filtered.sort((a, b) => new Date(b.tanggalPembelian).getTime() - new Date(a.tanggalPembelian).getTime());
    res.json({
      success: true,
      totalCount: filtered.length,
      data: filtered
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});
router12.post("/", (req, res) => {
  try {
    const {
      tanggalPembelian,
      kendaraanId,
      jenisBbm,
      kmAkhir,
      hargaBbm,
      jumlahLiter,
      uploadStruk,
      userInput
    } = req.body;
    if (!tanggalPembelian) {
      return res.status(400).json({ success: false, message: "Tanggal Pembelian wajib diisi." });
    }
    if (!kendaraanId) {
      return res.status(400).json({ success: false, message: "Kendaraan wajib dipilih." });
    }
    const vehicle = dbStore.kendaraan.find((k) => k.id === kendaraanId);
    if (!vehicle) {
      return res.status(404).json({ success: false, message: "Kendaraan tidak valid." });
    }
    const vehicleLogs = dbStore.laporanBbm.filter((log) => log.kendaraanId === kendaraanId);
    let kmAwal = 0;
    if (vehicleLogs.length > 0) {
      kmAwal = Math.max(...vehicleLogs.map((l) => l.kmAkhir));
    }
    const numKmAkhir = Number(kmAkhir);
    const numHarga = Number(hargaBbm);
    const numLiter = Number(jumlahLiter);
    if (isNaN(numKmAkhir) || numKmAkhir <= kmAwal) {
      return res.status(400).json({
        success: false,
        message: `KM Akhir tidak boleh lebih kecil dari KM Awal (${kmAwal.toLocaleString("id-ID")} KM).`
      });
    }
    if (isNaN(numHarga) || numHarga <= 0) {
      return res.status(400).json({ success: false, message: "Harga BBM wajib lebih dari nol." });
    }
    if (isNaN(numLiter) || numLiter <= 0) {
      return res.status(400).json({ success: false, message: "Jumlah Liter wajib lebih dari nol." });
    }
    if (!uploadStruk || typeof uploadStruk !== "string" || uploadStruk.trim() === "") {
      return res.status(400).json({
        success: false,
        message: "Foto Struk bersifat wajib di-upload sebelum data dapat disimpan."
      });
    }
    const jarakTempuh = numKmAkhir - kmAwal;
    const kmLiterAktual = parseFloat((jarakTempuh / numLiter).toFixed(2));
    const statusPemakaian = kmLiterAktual >= vehicle.standarKmLiter ? "Normal" : "Tidak Normal";
    const statusStruk = uploadStruk ? "Ter-upload" : "Belum Upload";
    const keterangan = statusPemakaian === "Normal" ? "Pemakaian Wajar" : "Boros";
    const now = /* @__PURE__ */ new Date();
    const newLog = {
      id: `BBM-${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, "0")}-${Date.now().toString().slice(-4)}`,
      tanggalPembelian,
      kendaraanId,
      kendaraanNama: vehicle.namaKendaraan,
      platNomor: vehicle.platNomor,
      jenisBbm: jenisBbm || "Pertamax",
      kmAwal,
      kmAkhir: numKmAkhir,
      jarakTempuh,
      hargaBbm: numHarga,
      jumlahLiter: numLiter,
      kmLiterAktual,
      standarKmLiter: vehicle.standarKmLiter,
      statusPemakaian,
      uploadStruk,
      statusStruk,
      keterangan,
      userInput: userInput || "Operator Terpadu",
      timestamp: now.toISOString()
    };
    dbStore.laporanBbm.unshift(newLog);
    syncSaveDoc("laporanBbm", newLog.id, newLog);
    dbStore.addLog(
      "SYSTEM",
      newLog.userInput,
      "Laporan BBM",
      "Input Transaksi BBM",
      `Input BBM ${vehicle.namaKendaraan} (${vehicle.platNomor}): ${numLiter}L, Rp${numHarga.toLocaleString("id-ID")}`
    );
    if (statusPemakaian === "Tidak Normal") {
      dbStore.addNotification(
        "System",
        "\u26A0\uFE0F Konsumsi BBM Tidak Normal!",
        `Kendaraan ${vehicle.namaKendaraan} (${vehicle.platNomor}) tercatat BOROS (${kmLiterAktual} KM/L vs Standar ${vehicle.standarKmLiter} KM/L).`,
        "warning",
        "/bbm/laporan"
      );
    }
    res.status(201).json({
      success: true,
      message: "Data Laporan BBM berhasil disimpan!",
      data: newLog
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});
router12.delete("/:id", (req, res) => {
  try {
    const { id } = req.params;
    const index = dbStore.laporanBbm.findIndex((l) => l.id === id);
    if (index === -1) {
      return res.status(404).json({ success: false, message: "Data laporan BBM tidak ditemukan." });
    }
    const deleted = dbStore.laporanBbm.splice(index, 1)[0];
    dbStore.addLog("SYSTEM", "Admin", "Laporan BBM", "Hapus Transaksi BBM", `Menghapus transaksi ${deleted.id} untuk ${deleted.kendaraanNama}`);
    syncDeleteDoc("laporanBbm", id);
    res.json({
      success: true,
      message: "Transaksi BBM berhasil dihapus."
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});
var bbm_default = router12;

// server/routes/tugasDivisi.ts
var import_express13 = require("express");
var router13 = (0, import_express13.Router)();
router13.get("/by-date", (req, res) => {
  const todayStr = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
  const dateQuery = req.query.tanggal || todayStr;
  const records = dbStore.getTugasDivisiForDate(dateQuery);
  res.json({
    success: true,
    tanggal: dateQuery,
    data: records
  });
});
router13.get("/menu-harian", (req, res) => {
  const todayStr = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
  const dateQuery = req.query.tanggal || todayStr;
  const records = dbStore.getTugasDivisiForDate(dateQuery);
  const foundMenu = records.find((r) => r.menuHarian && r.menuHarian.trim() !== "")?.menuHarian || "";
  res.json({
    success: true,
    tanggal: dateQuery,
    data: {
      tanggal: dateQuery,
      menuHarian: foundMenu
    }
  });
});
router13.put("/record", (req, res) => {
  const updatedData = req.body;
  if (!updatedData.tanggal || !updatedData.divisiId) {
    res.status(400).json({ success: false, message: "Tanggal dan ID Divisi wajib diisi." });
    return;
  }
  let idx = -1;
  if (updatedData.id) {
    idx = dbStore.tugasDivisiRecords.findIndex((r) => r.id === updatedData.id);
  }
  if (idx === -1) {
    idx = dbStore.tugasDivisiRecords.findIndex(
      (r) => r.tanggal === updatedData.tanggal && r.divisiId === updatedData.divisiId
    );
  }
  if (idx !== -1) {
    dbStore.tugasDivisiRecords[idx] = {
      ...dbStore.tugasDivisiRecords[idx],
      ...updatedData,
      updatedAt: (/* @__PURE__ */ new Date()).toISOString()
    };
  } else {
    const newRecord = {
      id: updatedData.id || `TASK-${updatedData.tanggal}-${updatedData.divisiId}-${Date.now()}`,
      tanggal: updatedData.tanggal,
      divisiId: updatedData.divisiId,
      divisiNama: updatedData.divisiNama || updatedData.divisiId,
      penanggungJawab: updatedData.penanggungJawab || "Petugas SPPG",
      shift: updatedData.shift || "Shift 1 (Pagi)",
      statusProduksi: updatedData.statusProduksi || "Dalam Persiapan",
      jumlahProduksi: updatedData.jumlahProduksi || 2500,
      keterangan: updatedData.keterangan || "",
      menuHarian: updatedData.menuHarian || "",
      checklists: updatedData.checklists || [],
      updatedAt: (/* @__PURE__ */ new Date()).toISOString(),
      createdBy: updatedData.createdBy || "Petugas SPPG"
    };
    dbStore.tugasDivisiRecords.push(newRecord);
    idx = dbStore.tugasDivisiRecords.length - 1;
  }
  const savedRecord = dbStore.tugasDivisiRecords[idx];
  syncSaveDoc("tugasDivisi", savedRecord.id, savedRecord);
  syncSaveDoc("divisiTaskRecords", savedRecord.id, savedRecord);
  dbStore.addLog(
    "USER",
    updatedData.createdBy || "Petugas SPPG",
    "Tugas Divisi",
    "Update Tugas Divisi",
    `Memperbarui tugas untuk ${savedRecord.divisiNama} tanggal ${savedRecord.tanggal}`,
    req.ip
  );
  res.json({
    success: true,
    message: `Data tugas ${savedRecord.divisiNama} berhasil disimpan.`,
    data: savedRecord
  });
});
router13.put("/menu-harian", (req, res) => {
  const { tanggal, menuHarian } = req.body;
  if (!tanggal) {
    res.status(400).json({ success: false, message: "Tanggal wajib diisi." });
    return;
  }
  let records = dbStore.getOrCreateTugasDivisiForDate(tanggal);
  records.forEach((r) => {
    r.menuHarian = menuHarian;
    r.updatedAt = (/* @__PURE__ */ new Date()).toISOString();
  });
  syncSaveBatch("tugasDivisi", records);
  syncSaveBatch("divisiTaskRecords", records);
  dbStore.addLog(
    "USER",
    "Petugas SPPG",
    "Tugas Divisi",
    "Update Menu Harian",
    `Memperbarui menu harian tanggal ${tanggal}: ${menuHarian}`,
    req.ip
  );
  res.json({
    success: true,
    message: `Menu harian untuk tanggal ${tanggal} berhasil diperbarui.`,
    menuHarian,
    data: dbStore.getTugasDivisiForDate(tanggal)
  });
});
router13.delete("/menu-harian", (req, res) => {
  const { tanggal } = req.query;
  if (!tanggal) {
    res.status(400).json({ success: false, message: "Tanggal wajib diisi." });
    return;
  }
  const records = dbStore.tugasDivisiRecords.filter((r) => r.tanggal === tanggal);
  records.forEach((r) => {
    r.menuHarian = "";
    r.updatedAt = (/* @__PURE__ */ new Date()).toISOString();
  });
  syncSaveBatch("tugasDivisi", records);
  syncSaveBatch("divisiTaskRecords", records);
  dbStore.addLog(
    "USER",
    "Petugas SPPG",
    "Tugas Divisi",
    "Hapus Menu Harian",
    `Menghapus/mengosongkan menu harian untuk tanggal ${tanggal}`,
    req.ip
  );
  res.json({
    success: true,
    message: `Menu harian tanggal ${tanggal} berhasil dihapus.`
  });
});
router13.get("/menu-harian-range", (req, res) => {
  const { startDate, endDate, days } = req.query;
  let start = startDate || (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
  let numDays = parseInt(days || "7", 10);
  if (isNaN(numDays) || numDays < 1) numDays = 7;
  const resultList = [];
  const startDt = new Date(start);
  for (let i = 0; i < numDays; i++) {
    const curDt = new Date(startDt);
    curDt.setDate(startDt.getDate() + i);
    const dateStr = curDt.toISOString().split("T")[0];
    const existingRecords = dbStore.tugasDivisiRecords.filter((r) => r.tanggal === dateStr);
    const existingMenu = existingRecords.find((r) => r.menuHarian && r.menuHarian.trim() !== "")?.menuHarian || "";
    resultList.push({
      tanggal: dateStr,
      menuHarian: existingMenu,
      isPlanned: Boolean(existingMenu && existingMenu.trim() !== "")
    });
  }
  res.json({
    success: true,
    data: resultList
  });
});
router13.put("/menu-harian-bulk", (req, res) => {
  const { items } = req.body;
  if (!Array.isArray(items)) {
    res.status(400).json({ success: false, message: "Format data items tidak valid." });
    return;
  }
  const allUpdated = [];
  items.forEach((item) => {
    if (!item.tanggal) return;
    const records = dbStore.getOrCreateTugasDivisiForDate(item.tanggal);
    records.forEach((r) => {
      r.menuHarian = item.menuHarian || "";
      r.updatedAt = (/* @__PURE__ */ new Date()).toISOString();
      allUpdated.push(r);
    });
  });
  if (allUpdated.length > 0) {
    syncSaveBatch("tugasDivisi", allUpdated);
    syncSaveBatch("divisiTaskRecords", allUpdated);
  }
  dbStore.addLog(
    "USER",
    "Petugas SPPG",
    "Tugas Divisi",
    "Bulk Update Menu Harian",
    `Memperbarui perencanaan menu harian untuk ${items.length} tanggal.`,
    req.ip
  );
  res.json({
    success: true,
    message: `Perencanaan menu harian untuk ${items.length} hari berhasil disimpan!`
  });
});
router13.delete("/record/:id", (req, res) => {
  const { id } = req.params;
  const idx = dbStore.tugasDivisiRecords.findIndex((r) => r.id === id);
  if (idx !== -1) {
    const deleted = dbStore.tugasDivisiRecords.splice(idx, 1)[0];
    syncDeleteDoc("tugasDivisi", id);
    syncDeleteDoc("divisiTaskRecords", id);
    dbStore.addLog(
      "USER",
      "Petugas SPPG",
      "Tugas Divisi",
      "Hapus Tugas Divisi",
      `Menghapus tugas ${deleted.divisiNama} tanggal ${deleted.tanggal}`,
      req.ip
    );
    res.json({
      success: true,
      message: `Tugas ${deleted.divisiNama} tanggal ${deleted.tanggal} berhasil dihapus.`
    });
  } else {
    res.status(404).json({ success: false, message: "Record tugas divisi tidak ditemukan." });
  }
});
router13.get("/history", (req, res) => {
  const { tanggal, bulan, tahun, divisi, status, search } = req.query;
  let results = [...dbStore.tugasDivisiRecords];
  if (tanggal) {
    results = results.filter((r) => r.tanggal === tanggal);
  }
  if (bulan) {
    const padBulan = String(bulan).padStart(2, "0");
    results = results.filter((r) => r.tanggal.split("-")[1] === padBulan);
  }
  if (tahun) {
    results = results.filter((r) => r.tanggal.split("-")[0] === tahun);
  }
  if (divisi && divisi !== "semua") {
    results = results.filter((r) => r.divisiId === divisi);
  }
  if (status && status !== "semua") {
    results = results.filter((r) => r.statusProduksi === status);
  }
  if (search) {
    const q = search.toLowerCase();
    results = results.filter(
      (r) => r.divisiNama.toLowerCase().includes(q) || r.penanggungJawab.toLowerCase().includes(q) || r.keterangan.toLowerCase().includes(q)
    );
  }
  results.sort((a, b) => b.tanggal.localeCompare(a.tanggal));
  res.json({
    success: true,
    total: results.length,
    data: results
  });
});
router13.get("/wa-settings", (req, res) => {
  res.json({ success: true, data: dbStore.waDivisiSettings });
});
router13.put("/wa-settings", (req, res) => {
  const newSettings = req.body;
  if (Array.isArray(newSettings)) {
    dbStore.waDivisiSettings = newSettings;
    syncSaveBatch("whatsappDivisiSettings", newSettings.map((s, idx) => ({ ...s, id: s.id || s.divisiId || `wa-setting-${idx}` })));
    dbStore.addLog("ADMIN", "Administrator", "Pengaturan WhatsApp", "Update WA Divisi", "Memperbarui kontak WhatsApp divisi", req.ip);
    res.json({ success: true, message: "Nomor WhatsApp Divisi berhasil diperbarui.", data: dbStore.waDivisiSettings });
  } else {
    res.status(400).json({ success: false, message: "Data setting harus berupa array." });
  }
});
router13.get("/templates", (req, res) => {
  res.json({ success: true, data: dbStore.taskTemplates });
});
router13.put("/templates", (req, res) => {
  const newTemplate = req.body;
  const idx = dbStore.taskTemplates.findIndex((t) => t.id === newTemplate.id);
  if (idx !== -1) {
    dbStore.taskTemplates[idx] = newTemplate;
  } else {
    newTemplate.id = newTemplate.id || `TPL-${Date.now()}`;
    dbStore.taskTemplates.push(newTemplate);
  }
  syncSaveDoc("taskTemplates", newTemplate.id, newTemplate);
  dbStore.addLog("ADMIN", "Administrator", "Template Tugas", "Simpan Template", `Menyimpan template tugas untuk ${newTemplate.divisiNama}`, req.ip);
  res.json({ success: true, message: "Template tugas berhasil disimpan.", data: dbStore.taskTemplates });
});
router13.delete("/templates/:id", (req, res) => {
  const { id } = req.params;
  const idx = dbStore.taskTemplates.findIndex((t) => t.id === id);
  if (idx !== -1) {
    const deleted = dbStore.taskTemplates.splice(idx, 1)[0];
    syncDeleteDoc("taskTemplates", id);
    dbStore.addLog("ADMIN", "Administrator", "Template Tugas", "Hapus Template", `Menghapus template ${deleted.judulTemplate}`, req.ip);
    res.json({ success: true, message: "Template tugas berhasil dihapus." });
  } else {
    res.status(404).json({ success: false, message: "Template tidak ditemukan." });
  }
});
var tugasDivisi_default = router13;

// server/routes/penerimaManfaat.ts
var import_express14 = require("express");

// src/utils/bastDocxGenerator.ts
var import_docx = require("docx");
var KEPALA_SPPG_TTD_PATH = "/assets/aistudio/Untitled_design__4__71e57967.png";
async function loadKepalaSppgSignatureBytes() {
  try {
    if (typeof fetch === "function") {
      const res = await fetch(KEPALA_SPPG_TTD_PATH);
      if (res.ok) {
        const buf = await res.arrayBuffer();
        return new Uint8Array(buf);
      }
    }
    return null;
  } catch {
    return null;
  }
}
function buildMengetahuiSignatureParagraphs(sigBytes) {
  if (!sigBytes) {
    return [
      new import_docx.Paragraph({
        spacing: { before: 0, after: 400 },
        children: [
          new import_docx.TextRun({ text: "Mengetahui:", font: "Times New Roman", size: 20 })
        ]
      })
    ];
  }
  return [
    new import_docx.Paragraph({
      spacing: { before: 0, after: 40 },
      children: [
        new import_docx.TextRun({ text: "Mengetahui:", font: "Times New Roman", size: 20 })
      ]
    }),
    new import_docx.Paragraph({
      spacing: { before: 20, after: 40 },
      children: [
        new import_docx.ImageRun({
          data: sigBytes,
          transformation: {
            width: 88,
            height: 56
          },
          type: "png"
        })
      ]
    })
  ];
}
async function createBastWordDocument(bast) {
  const signatureBytes = await loadKepalaSppgSignatureBytes();
  const waktuText = bast.waktuPenerimaan && bast.waktuPenerimaan !== "Jam \u2026\u2026\u2026\u2026\u2026 WIB" && bast.waktuPenerimaan !== "07:30 WIB" && bast.waktuPenerimaan !== "Jam 07:30 WIB" && !bast.waktuPenerimaan.includes("\u2026\u2026\u2026\u2026") ? bast.waktuPenerimaan.replace(/^Jam\s*/i, "").trim() : "................ WIB";
  const noBorder = {
    top: { style: import_docx.BorderStyle.NONE, size: 0, color: "auto" },
    bottom: { style: import_docx.BorderStyle.NONE, size: 0, color: "auto" },
    left: { style: import_docx.BorderStyle.NONE, size: 0, color: "auto" },
    right: { style: import_docx.BorderStyle.NONE, size: 0, color: "auto" }
  };
  const boxBorder = {
    top: { style: import_docx.BorderStyle.SINGLE, size: 6, color: "000000" },
    bottom: { style: import_docx.BorderStyle.SINGLE, size: 6, color: "000000" },
    left: { style: import_docx.BorderStyle.SINGLE, size: 6, color: "000000" },
    right: { style: import_docx.BorderStyle.SINGLE, size: 6, color: "000000" }
  };
  const cleanDateFormatted = bast.hariTanggalFormatted.includes(",") ? bast.hariTanggalFormatted.split(",")[1].trim() : bast.hariTanggalFormatted;
  const doc = new import_docx.Document({
    sections: [
      {
        properties: {
          page: {
            margin: {
              top: 720,
              // 0.5 in
              bottom: 720,
              // 0.5 in
              left: 1152,
              // 0.8 in
              right: 1152
              // 0.8 in
            }
          }
        },
        children: [
          // ==========================================
          // BAGIAN A: BERITA ACARA PENERIMAAN PAKET MAKANAN
          // ==========================================
          new import_docx.Paragraph({
            alignment: import_docx.AlignmentType.CENTER,
            spacing: { before: 0, after: 40 },
            children: [
              new import_docx.TextRun({
                text: "BERITA ACARA PENERIMAAN PAKET MAKANAN",
                bold: true,
                underline: {},
                size: 24,
                // 12pt
                font: "Times New Roman"
              })
            ]
          }),
          new import_docx.Paragraph({
            alignment: import_docx.AlignmentType.CENTER,
            spacing: { before: 0, after: 40 },
            children: [
              new import_docx.TextRun({
                text: "PROGRAM MAKAN BERGIZI",
                bold: true,
                underline: {},
                size: 24,
                // 12pt
                font: "Times New Roman"
              })
            ]
          }),
          new import_docx.Paragraph({
            alignment: import_docx.AlignmentType.CENTER,
            spacing: { before: 0, after: 140 },
            children: [
              new import_docx.TextRun({
                text: `Nomor: ${bast.nomorBast}`,
                size: 22,
                // 11pt
                font: "Times New Roman"
              })
            ]
          }),
          // Paragraf Narasi Bagian A
          new import_docx.Paragraph({
            alignment: import_docx.AlignmentType.JUSTIFIED,
            spacing: { before: 40, after: 120, line: 260 },
            children: [
              new import_docx.TextRun({ text: "Pada Hari ", font: "Times New Roman", size: 21 }),
              new import_docx.TextRun({ text: bast.hari, bold: true, font: "Times New Roman", size: 21 }),
              new import_docx.TextRun({ text: " Tanggal ", font: "Times New Roman", size: 21 }),
              new import_docx.TextRun({ text: cleanDateFormatted, bold: true, font: "Times New Roman", size: 21 }),
              new import_docx.TextRun({ text: " Jam ", font: "Times New Roman", size: 21 }),
              new import_docx.TextRun({ text: "................ WIB", underline: {}, font: "Times New Roman", size: 21 }),
              new import_docx.TextRun({ text: " Telah Diterima Paket Makanan Bergizi Gratis (MBG) Sejumlah : ", font: "Times New Roman", size: 21 }),
              new import_docx.TextRun({ text: `${bast.jumlahPaketMakanan}`, bold: true, font: "Times New Roman", size: 21 }),
              new import_docx.TextRun({
                text: ` dalam keadaan baik dan layak dikonsumsi dari ${bast.namaSppg}.`,
                font: "Times New Roman",
                size: 21
              })
            ]
          }),
          // Yang Menyerahkan (Bagian Atas)
          new import_docx.Paragraph({
            spacing: { before: 40, after: 20 },
            children: [
              new import_docx.TextRun({ text: "Yang Menyerahkan  : ", font: "Times New Roman", size: 21 }),
              new import_docx.TextRun({ text: bast.namaTimDistribusi, bold: true, font: "Times New Roman", size: 21 })
            ]
          }),
          new import_docx.Paragraph({
            spacing: { before: 0, after: 560 },
            children: [
              new import_docx.TextRun({ text: "Nomor Telpon        : ", font: "Times New Roman", size: 21 }),
              new import_docx.TextRun({ text: bast.telponPetugasDistribusi || "085212581665", font: "Times New Roman", size: 21 })
            ]
          }),
          new import_docx.Paragraph({
            spacing: { before: 0, after: 120 },
            children: [
              new import_docx.TextRun({
                text: `(${bast.namaPetugasDistribusi || "Abdus Salam"} )`,
                bold: true,
                font: "Times New Roman",
                size: 21
              })
            ]
          }),
          // Tabel 2 Kolom Bagian Bawah: Kiri Diterima Lembaga, Kanan Kotak Mengetahui
          new import_docx.Table({
            width: { size: 100, type: import_docx.WidthType.PERCENTAGE },
            borders: noBorder,
            rows: [
              new import_docx.TableRow({
                children: [
                  // Kolom Kiri: Diterima Oleh Lembaga
                  new import_docx.TableCell({
                    width: { size: 68, type: import_docx.WidthType.PERCENTAGE },
                    borders: noBorder,
                    children: [
                      new import_docx.Paragraph({
                        spacing: { before: 0, after: 20 },
                        children: [
                          new import_docx.TextRun({ text: "Diterima Oleh Lembaga: ", bold: true, font: "Times New Roman", size: 21 }),
                          new import_docx.TextRun({ text: bast.npsn ? `${bast.namaSekolah} (NPSN: ${bast.npsn})` : bast.namaSekolah, bold: true, font: "Times New Roman", size: 21 })
                        ]
                      }),
                      new import_docx.Paragraph({
                        spacing: { before: 0, after: 20 },
                        children: [
                          new import_docx.TextRun({ text: "PIC                         : ", font: "Times New Roman", size: 21 }),
                          new import_docx.TextRun({ text: bast.namaPic || "Lulut Biyadillah", font: "Times New Roman", size: 21 })
                        ]
                      }),
                      new import_docx.Paragraph({
                        spacing: { before: 0, after: 560 },
                        children: [
                          new import_docx.TextRun({ text: "Nomor Telpon        : ", font: "Times New Roman", size: 21 }),
                          new import_docx.TextRun({ text: bast.telponPic || "085234834095", font: "Times New Roman", size: 21 })
                        ]
                      }),
                      new import_docx.Paragraph({
                        spacing: { before: 0, after: 20 },
                        children: [
                          new import_docx.TextRun({
                            text: `( ${bast.namaPic || "Lulut Biyadillah"} )`,
                            bold: true,
                            font: "Times New Roman",
                            size: 21
                          })
                        ]
                      }),
                      new import_docx.Paragraph({
                        spacing: { before: 0, after: 0 },
                        children: [
                          new import_docx.TextRun({
                            text: "__________________________________",
                            font: "Times New Roman",
                            size: 21
                          })
                        ]
                      })
                    ]
                  }),
                  // Kolom Kanan: Kotak Mengetahui
                  new import_docx.TableCell({
                    width: { size: 32, type: import_docx.WidthType.PERCENTAGE },
                    borders: boxBorder,
                    margins: { top: 80, bottom: 80, left: 100, right: 100 },
                    children: [
                      ...buildMengetahuiSignatureParagraphs(signatureBytes),
                      new import_docx.Paragraph({
                        spacing: { before: 0, after: 10 },
                        children: [
                          new import_docx.TextRun({
                            text: bast.namaKepalaSppg || "Sri Rohayu, S.Pd.",
                            bold: true,
                            underline: {},
                            font: "Times New Roman",
                            size: 20
                          })
                        ]
                      }),
                      new import_docx.Paragraph({
                        spacing: { before: 0, after: 10 },
                        children: [
                          new import_docx.TextRun({
                            text: "Kepala SPPG Probolinggo",
                            font: "Times New Roman",
                            size: 19
                          })
                        ]
                      }),
                      new import_docx.Paragraph({
                        spacing: { before: 0, after: 0 },
                        children: [
                          new import_docx.TextRun({
                            text: "Krejengan Temenggungan",
                            font: "Times New Roman",
                            size: 19
                          })
                        ]
                      })
                    ]
                  })
                ]
              })
            ]
          }),
          // Jarak Antara Dokumen 1 dan Dokumen 2
          new import_docx.Paragraph({
            spacing: { before: 200, after: 120 },
            children: []
          }),
          // ==========================================
          // BAGIAN B: BERITA ACARA PENYERAHAN ALAT MAKAN
          // ==========================================
          new import_docx.Paragraph({
            alignment: import_docx.AlignmentType.CENTER,
            spacing: { before: 0, after: 40 },
            children: [
              new import_docx.TextRun({
                text: "BERITA ACARA PENYERAHAN ALAT MAKAN",
                bold: true,
                underline: {},
                size: 24,
                // 12pt
                font: "Times New Roman"
              })
            ]
          }),
          new import_docx.Paragraph({
            alignment: import_docx.AlignmentType.CENTER,
            spacing: { before: 0, after: 40 },
            children: [
              new import_docx.TextRun({
                text: "PROGRAM MAKAN BERGIZI",
                bold: true,
                underline: {},
                size: 24,
                // 12pt
                font: "Times New Roman"
              })
            ]
          }),
          new import_docx.Paragraph({
            alignment: import_docx.AlignmentType.CENTER,
            spacing: { before: 0, after: 140 },
            children: [
              new import_docx.TextRun({
                text: `Nomor: ${bast.nomorBast}`,
                size: 22,
                // 11pt
                font: "Times New Roman"
              })
            ]
          }),
          // Paragraf Narasi Bagian B
          new import_docx.Paragraph({
            alignment: import_docx.AlignmentType.JUSTIFIED,
            spacing: { before: 40, after: 120, line: 260 },
            children: [
              new import_docx.TextRun({ text: "Pada Hari ", font: "Times New Roman", size: 21 }),
              new import_docx.TextRun({ text: bast.hari, bold: true, font: "Times New Roman", size: 21 }),
              new import_docx.TextRun({ text: " Tanggal ", font: "Times New Roman", size: 21 }),
              new import_docx.TextRun({ text: cleanDateFormatted, bold: true, font: "Times New Roman", size: 21 }),
              new import_docx.TextRun({ text: " Jam ", font: "Times New Roman", size: 21 }),
              new import_docx.TextRun({ text: "................ WIB", underline: {}, font: "Times New Roman", size: 21 }),
              new import_docx.TextRun({ text: " Telah Diterima Kembali Alat Makan Sejumlah : ", font: "Times New Roman", size: 21 }),
              new import_docx.TextRun({ text: `${bast.jumlahAlatMakan || bast.jumlahPaketMakanan}`, bold: true, font: "Times New Roman", size: 21 }),
              new import_docx.TextRun({
                text: ` Paket Alat Makan Bergizi Dari ${bast.namaSppg}.`,
                font: "Times New Roman",
                size: 21
              })
            ]
          }),
          // Yang Menyerahkan (diisi oleh Lembaga)
          new import_docx.Paragraph({
            spacing: { before: 40, after: 20 },
            children: [
              new import_docx.TextRun({ text: "Yang Menyerahkan (diisi oleh Lembaga): ", bold: true, font: "Times New Roman", size: 21 }),
              new import_docx.TextRun({ text: bast.npsn ? `${bast.namaSekolah} (NPSN: ${bast.npsn})` : bast.namaSekolah, bold: true, font: "Times New Roman", size: 21 })
            ]
          }),
          new import_docx.Paragraph({
            spacing: { before: 0, after: 20 },
            children: [
              new import_docx.TextRun({ text: "PIC                         : ", font: "Times New Roman", size: 21 }),
              new import_docx.TextRun({ text: bast.namaPic || "Lulut Biyadillah", font: "Times New Roman", size: 21 })
            ]
          }),
          new import_docx.Paragraph({
            spacing: { before: 0, after: 560 },
            children: [
              new import_docx.TextRun({ text: "Nomor Telpon        : ", font: "Times New Roman", size: 21 }),
              new import_docx.TextRun({ text: bast.telponPic || "085234834095", font: "Times New Roman", size: 21 })
            ]
          }),
          new import_docx.Paragraph({
            spacing: { before: 0, after: 20 },
            children: [
              new import_docx.TextRun({
                text: `(${bast.namaPic || "Lulut Biyadillah"})`,
                bold: true,
                font: "Times New Roman",
                size: 21
              })
            ]
          }),
          new import_docx.Paragraph({
            spacing: { before: 0, after: 120 },
            children: [
              new import_docx.TextRun({
                text: "__________________________________",
                font: "Times New Roman",
                size: 21
              })
            ]
          }),
          // Tabel 2 Kolom Bagian Bawah: Kiri Diterima Oleh Tim Distribusi, Kanan Kotak Mengetahui
          new import_docx.Table({
            width: { size: 100, type: import_docx.WidthType.PERCENTAGE },
            borders: noBorder,
            rows: [
              new import_docx.TableRow({
                children: [
                  // Kolom Kiri: Diterima Oleh Tim Distribusi
                  new import_docx.TableCell({
                    width: { size: 68, type: import_docx.WidthType.PERCENTAGE },
                    borders: noBorder,
                    children: [
                      new import_docx.Paragraph({
                        spacing: { before: 0, after: 20 },
                        children: [
                          new import_docx.TextRun({ text: "Diterima Oleh         : ", font: "Times New Roman", size: 21 }),
                          new import_docx.TextRun({ text: "Tim Distribusi", bold: true, font: "Times New Roman", size: 21 })
                        ]
                      }),
                      new import_docx.Paragraph({
                        spacing: { before: 0, after: 20 },
                        children: [
                          new import_docx.TextRun({ text: "                           ", font: "Times New Roman", size: 21 }),
                          new import_docx.TextRun({ text: "SPPG Hafshawaty 001 Genggong", bold: true, font: "Times New Roman", size: 21 })
                        ]
                      }),
                      new import_docx.Paragraph({
                        spacing: { before: 0, after: 560 },
                        children: [
                          new import_docx.TextRun({ text: "Nomor Telpon        : ", font: "Times New Roman", size: 21 }),
                          new import_docx.TextRun({ text: bast.telponPetugasDistribusi || "085212581665", font: "Times New Roman", size: 21 })
                        ]
                      }),
                      new import_docx.Paragraph({
                        spacing: { before: 0, after: 0 },
                        children: [
                          new import_docx.TextRun({
                            text: `(${bast.namaPetugasDistribusi || "Abdus Salam"})`,
                            bold: true,
                            font: "Times New Roman",
                            size: 21
                          })
                        ]
                      })
                    ]
                  }),
                  // Kolom Kanan: Kotak Mengetahui
                  new import_docx.TableCell({
                    width: { size: 32, type: import_docx.WidthType.PERCENTAGE },
                    borders: boxBorder,
                    margins: { top: 80, bottom: 80, left: 100, right: 100 },
                    children: [
                      ...buildMengetahuiSignatureParagraphs(signatureBytes),
                      new import_docx.Paragraph({
                        spacing: { before: 0, after: 10 },
                        children: [
                          new import_docx.TextRun({
                            text: bast.namaKepalaSppg || "Sri Rohayu, S.Pd.",
                            bold: true,
                            underline: {},
                            font: "Times New Roman",
                            size: 20
                          })
                        ]
                      }),
                      new import_docx.Paragraph({
                        spacing: { before: 0, after: 10 },
                        children: [
                          new import_docx.TextRun({
                            text: "Kepala SPPG Probolinggo",
                            font: "Times New Roman",
                            size: 19
                          })
                        ]
                      }),
                      new import_docx.Paragraph({
                        spacing: { before: 0, after: 0 },
                        children: [
                          new import_docx.TextRun({
                            text: "Krejengan Temenggungan",
                            font: "Times New Roman",
                            size: 19
                          })
                        ]
                      })
                    ]
                  })
                ]
              })
            ]
          })
        ]
      }
    ]
  });
  return doc;
}

// server/routes/penerimaManfaat.ts
var import_docx2 = require("docx");
var router14 = (0, import_express14.Router)();
function cleanDuplicateGroupsAndLocations() {
  const uniqueGroups = [];
  const seenGroupIds = /* @__PURE__ */ new Set();
  const sorted = [...dbStore.beneficiaryGroups].sort((a, b) => (a.urutan || 0) - (b.urutan || 0));
  sorted.forEach((g) => {
    if (!g.id) {
      g.id = `GRP-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`;
    }
    if (seenGroupIds.has(g.id)) {
      return;
    }
    seenGroupIds.add(g.id);
    uniqueGroups.push(g);
  });
  uniqueGroups.forEach((g, idx) => {
    const correctUrutan = idx + 1;
    if (g.urutan !== correctUrutan) {
      g.urutan = correctUrutan;
      syncSaveDoc("beneficiaryGroups", g.id, g);
    }
  });
  uniqueGroups.forEach((g) => {
    if (Array.isArray(g.lembagaList) && g.lembagaList.length > 0) {
      g.lembagaList.forEach((item, lIdx) => {
        const itemKlas = item.klasifikasiPorsi || g.klasifikasiPorsi || "Porsi Besar";
        const normInstansi = (item.namaInstansi || "").trim().toLowerCase();
        if (itemKlas === "Porsi Ibu Hamil" || normInstansi.includes("ibu hamil") || normInstansi.includes("hamil") && !normInstansi.includes("menyusui")) {
          const val = Number(item.targetBumilBusui) || Number(item.targetSiswa) || 0;
          item.targetBumilBusui = val;
          item.targetSiswa = 0;
          item.targetBalita = 0;
        } else if (itemKlas === "Porsi Ibu Menyusui" || normInstansi.includes("ibu menyusui") || normInstansi.includes("menyusui")) {
          const val = Number(item.targetBumilBusui) || Number(item.targetSiswa) || 0;
          item.targetBumilBusui = val;
          item.targetSiswa = 0;
          item.targetBalita = 0;
        } else if (itemKlas === "Porsi Balita" || itemKlas === "Balita" || normInstansi.includes("balita")) {
          const val = Number(item.targetBalita) || Number(item.targetSiswa) || 0;
          item.targetBalita = val;
          item.targetSiswa = 0;
          item.targetBumilBusui = 0;
        }
        const is3BItem = item.kategoriLembaga?.includes("3B") || normInstansi.includes("3b") || g.kategoriLembaga?.includes("3B") || g.nama && g.nama.includes("3B");
        if (is3BItem) {
          const bd = item.breakdownKelas || {};
          const kL = Number(bd.kader_l) || 0;
          const kP = Number(bd.kader_p) || 0;
          const kTot = kL + kP || Number(bd.kader) || 0;
          item.targetGuru = kTot;
          item.targetSiswa = 0;
        }
        const s = is3BItem ? 0 : Number(item.targetSiswa) || 0;
        const guru = is3BItem ? Number(item.targetGuru) || 0 : Number(item.targetGuru) || 0;
        const balita = Number(item.targetBalita) || 0;
        const bumil = Number(item.targetBumilBusui) || 0;
        const accurateTotal = s + guru + balita + bumil;
        item.total = accurateTotal;
        const locId = item.id || `LOC-${g.id}-${lIdx + 1}`;
        const locIdx = dbStore.beneficiaryLocations.findIndex(
          (l) => l.id === locId || l.groupId === g.id && l.namaInstansi.trim().toLowerCase() === item.namaInstansi.trim().toLowerCase()
        );
        if (locIdx !== -1) {
          const loc = dbStore.beneficiaryLocations[locIdx];
          loc.defaultJumlah = accurateTotal;
          loc.klasifikasiPorsi = itemKlas;
          loc.kategoriBreakdown = {
            siswa: is3BItem ? 0 : s,
            guru: is3BItem ? Number(item.targetGuru) || 0 : guru,
            kader: is3BItem ? Number(item.targetGuru) || 0 : 0,
            balita,
            ibuHamil: itemKlas === "Porsi Ibu Hamil" || normInstansi.includes("hamil") ? bumil : itemKlas === "Bumil & Busui" ? Math.ceil(bumil / 2) : 0,
            ibuMenyusui: itemKlas === "Porsi Ibu Menyusui" || normInstansi.includes("menyusui") ? bumil : itemKlas === "Bumil & Busui" ? Math.floor(bumil / 2) : 0
          };
          syncSaveDoc("beneficiaryLocations", loc.id, loc);
        }
      });
      syncSaveDoc("beneficiaryGroups", g.id, g);
    }
  });
  dbStore.dailyBeneficiaryRecords.forEach((rec) => {
    const is3BRec = rec.kategoriLembaga && rec.kategoriLembaga.includes("3B") || rec.groupNama && rec.groupNama.includes("3B") || rec.namaInstansi && (rec.namaInstansi.toLowerCase().includes("posyandu") || rec.namaInstansi.toLowerCase().includes("temenggungan"));
    if (is3BRec && rec.rincianSasaran) {
      const bd = rec.breakdownKelas || rec.rincianSasaran?.breakdownKelas || {};
      const kL = Number(bd.kader_l) || 0;
      const kP = Number(bd.kader_p) || 0;
      const realKader = kL + kP || Number(bd.kader) || 0;
      if (realKader === 0 && rec.rincianSasaran.guru === 8) {
        rec.rincianSasaran.guru = 0;
        const b = Number(rec.rincianSasaran.balita) || 0;
        const ih = Number(rec.rincianSasaran.ibuHamil) || 0;
        const im = Number(rec.rincianSasaran.ibuMenyusui) || 0;
        rec.totalPenerima = b + ih + im;
        rec.jumlahAwal = rec.totalPenerima;
        syncSaveDoc("dailyBeneficiaryRecords", rec.id, rec);
      }
    }
  });
  dbStore.beneficiaryGroups = uniqueGroups;
  const uniqueLocations = [];
  const locMap = /* @__PURE__ */ new Map();
  dbStore.beneficiaryLocations.forEach((l) => {
    const key = `${(l.groupId || "").trim().toLowerCase()}::${(l.namaInstansi || "").trim().toLowerCase()}`;
    if (!l.namaInstansi) return;
    if (locMap.has(key)) {
      const existing = locMap.get(key);
      if (l.id !== existing.id) {
        syncDeleteDoc("beneficiaryLocations", l.id);
      }
    } else {
      locMap.set(key, l);
      uniqueLocations.push(l);
    }
  });
  dbStore.beneficiaryLocations = uniqueLocations;
}
cleanDuplicateGroupsAndLocations();
router14.get("/groups", (req, res) => {
  const sorted = [...dbStore.beneficiaryGroups].sort((a, b) => (a.urutan || 0) - (b.urutan || 0));
  res.json({
    success: true,
    data: sorted
  });
});
async function updateGroupHandler(id, body, res) {
  const { nama, kategoriUtama, kategoriLembaga, klasifikasiPorsi, deskripsi, alamat, status, lembagaList, picNama, nomorKontak, picKontak } = body;
  const idx = dbStore.beneficiaryGroups.findIndex((g) => g.id === id);
  if (idx === -1) {
    res.status(404).json({ success: false, message: "Kelompok tidak ditemukan" });
    return;
  }
  const existingGroup = dbStore.beneficiaryGroups[idx];
  const updatedNama = nama || existingGroup.nama;
  const updatedGroup = {
    ...existingGroup,
    nama: updatedNama,
    kategoriUtama: kategoriUtama || existingGroup.kategoriUtama,
    kategoriLembaga: kategoriLembaga || existingGroup.kategoriLembaga,
    klasifikasiPorsi: klasifikasiPorsi || existingGroup.klasifikasiPorsi,
    alamat: alamat !== void 0 ? alamat : deskripsi !== void 0 ? deskripsi : existingGroup.alamat,
    deskripsi: deskripsi !== void 0 ? deskripsi : alamat !== void 0 ? alamat : existingGroup.deskripsi,
    picNama: picNama !== void 0 ? picNama : existingGroup.picNama,
    nomorKontak: nomorKontak !== void 0 ? nomorKontak : picKontak !== void 0 ? picKontak : existingGroup.nomorKontak,
    picKontak: picKontak !== void 0 ? picKontak : nomorKontak !== void 0 ? nomorKontak : existingGroup.picKontak,
    status: status || existingGroup.status,
    lembagaList: Array.isArray(lembagaList) ? lembagaList : existingGroup.lembagaList
  };
  dbStore.beneficiaryGroups[idx] = updatedGroup;
  await syncSaveDoc("beneficiaryGroups", id, updatedGroup);
  if (Array.isArray(lembagaList)) {
    const todayStr = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
    const groupLocs = dbStore.beneficiaryLocations.filter(
      (l) => l.groupId === id || l.groupNama.trim().toLowerCase() === existingGroup.nama.trim().toLowerCase()
    );
    const updatedLocIds = /* @__PURE__ */ new Set();
    for (let lIdx = 0; lIdx < lembagaList.length; lIdx++) {
      const item = lembagaList[lIdx];
      const itemKlas = item.klasifikasiPorsi || klasifikasiPorsi || updatedGroup.klasifikasiPorsi || "Porsi Besar";
      let targetSiswa = Number(item.targetSiswa) || 0;
      let targetGuru = Number(item.targetGuru) || 0;
      let targetBalita = Number(item.targetBalita) || 0;
      let targetBumilBusui = Number(item.targetBumilBusui) || 0;
      const normInstansi = (item.namaInstansi || "").trim().toLowerCase();
      let ibuHamil = 0;
      let ibuMenyusui = 0;
      let balita = 0;
      let siswa = 0;
      if (item.kategoriLembaga?.includes("3B") || normInstansi.includes("3b") || item.breakdownKelas && (item.breakdownKelas.baduta !== void 0 || item.breakdownKelas.bumil !== void 0 || item.breakdownKelas.busui_w !== void 0)) {
        const bd = item.breakdownKelas || {};
        const tBalita511 = (Number(bd.balita511_l) || 0) + (Number(bd.balita511_p) || 0) || Number(bd.baduta) || 0;
        const tBalita1259 = (Number(bd.balita1259_l) || 0) + (Number(bd.balita1259_p) || 0) || Number(bd.balita) || 0;
        const tBusui = Number(bd.busui_w) || Number(bd.busui) || 0;
        const tBumil = Number(bd.bumil_w) || Number(bd.bumil) || 0;
        const tKader = (Number(bd.kader_l) || 0) + (Number(bd.kader_p) || 0) || Number(bd.kader) || 0;
        balita = tBalita511 + tBalita1259 || Number(targetBalita) || 0;
        ibuHamil = tBumil || Math.ceil((Number(targetBumilBusui) || 0) / 2);
        ibuMenyusui = tBusui || Math.floor((Number(targetBumilBusui) || 0) / 2);
        targetGuru = tKader;
        targetBalita = balita;
        targetBumilBusui = ibuHamil + ibuMenyusui;
        targetSiswa = 0;
      } else if (itemKlas === "Porsi Ibu Hamil" || normInstansi.includes("ibu hamil") || normInstansi.includes("hamil") && !normInstansi.includes("menyusui")) {
        const val = targetBumilBusui || targetSiswa || 0;
        ibuHamil = val;
        targetBumilBusui = val;
        targetSiswa = 0;
        targetBalita = 0;
      } else if (itemKlas === "Porsi Ibu Menyusui" || normInstansi.includes("ibu menyusui") || normInstansi.includes("menyusui")) {
        const val = targetBumilBusui || targetSiswa || 0;
        ibuMenyusui = val;
        targetBumilBusui = val;
        targetSiswa = 0;
        targetBalita = 0;
      } else if (itemKlas === "Bumil & Busui") {
        const val = targetBumilBusui || targetSiswa || 0;
        ibuHamil = Math.ceil(val / 2);
        ibuMenyusui = Math.floor(val / 2);
        targetBumilBusui = val;
        targetSiswa = 0;
        targetBalita = 0;
      } else if (itemKlas === "Porsi Balita" || itemKlas === "Balita" || normInstansi.includes("balita")) {
        const val = targetBalita || targetSiswa || 0;
        balita = val;
        targetBalita = val;
        targetSiswa = 0;
        targetBumilBusui = 0;
      } else {
        siswa = targetSiswa;
      }
      const accurateTotal = targetSiswa + targetGuru + targetBalita + targetBumilBusui;
      item.total = accurateTotal;
      item.targetSiswa = targetSiswa;
      item.targetGuru = targetGuru;
      item.targetBalita = targetBalita;
      item.targetBumilBusui = targetBumilBusui;
      item.klasifikasiPorsi = itemKlas;
      const matchedLoc = groupLocs.find(
        (l) => item.id && l.id === item.id || item.namaInstansi && l.namaInstansi.trim().toLowerCase() === item.namaInstansi.trim().toLowerCase()
      ) || groupLocs[lIdx];
      const locId = item.id || matchedLoc?.id || `LOC-${id}-${lIdx + 1}`;
      item.id = locId;
      const locData = {
        id: locId,
        groupId: id,
        groupNama: updatedNama,
        namaInstansi: item.namaInstansi || `${updatedNama} - Instansi ${lIdx + 1}`,
        alamat: item.alamat || updatedGroup.alamat || "Kecamatan Pajarakan / Krejengan, Kabupaten Probolinggo",
        kontak: item.nomorKontak || item.picKontak || updatedGroup.nomorKontak || updatedGroup.picKontak || "",
        picNama: item.picNama || updatedGroup.picNama || "",
        picTelepon: item.nomorKontak || item.picKontak || updatedGroup.nomorKontak || updatedGroup.picKontak || "",
        kategoriLembaga: item.kategoriLembaga || kategoriLembaga || updatedGroup.kategoriLembaga,
        klasifikasiPorsi: itemKlas,
        breakdownKelas: item.breakdownKelas || {},
        kategoriBreakdown: {
          siswa,
          guru: targetGuru,
          balita,
          ibuHamil,
          ibuMenyusui,
          breakdownKelas: item.breakdownKelas || {}
        },
        defaultJumlah: accurateTotal,
        status: "Aktif"
      };
      updatedLocIds.add(locId);
      const existingLocIdx = dbStore.beneficiaryLocations.findIndex((l) => l.id === locId);
      if (existingLocIdx !== -1) {
        dbStore.beneficiaryLocations[existingLocIdx] = locData;
      } else {
        dbStore.beneficiaryLocations.push(locData);
      }
      await syncSaveDoc("beneficiaryLocations", locId, locData);
      const recIdx = dbStore.dailyBeneficiaryRecords.findIndex(
        (r) => r.tanggal === todayStr && (r.locationId === locId || r.namaInstansi.trim().toLowerCase() === locData.namaInstansi.trim().toLowerCase())
      );
      if (recIdx !== -1) {
        const existingRec = dbStore.dailyBeneficiaryRecords[recIdx];
        if (existingRec.statusKbm !== "Libur Full") {
          existingRec.namaInstansi = locData.namaInstansi;
          existingRec.kategoriLembaga = locData.kategoriLembaga;
          existingRec.klasifikasiPorsi = locData.klasifikasiPorsi;
          existingRec.breakdownKelas = locData.breakdownKelas;
          existingRec.rincianSasaran = {
            siswa,
            guru: targetGuru,
            balita,
            ibuHamil,
            ibuMenyusui,
            breakdownKelas: locData.breakdownKelas
          };
          existingRec.jumlahAwal = locData.defaultJumlah;
          existingRec.totalPenerima = Math.max(0, locData.defaultJumlah + (existingRec.penambahan || 0) - (existingRec.pengurangan || 0));
          await syncSaveDoc("dailyBeneficiaryRecords", existingRec.id, existingRec);
        }
      }
    }
    const orphanedLocs = groupLocs.filter((l) => !updatedLocIds.has(l.id));
    for (const o of orphanedLocs) {
      const oIdx = dbStore.beneficiaryLocations.findIndex((l) => l.id === o.id);
      if (oIdx !== -1) {
        dbStore.beneficiaryLocations.splice(oIdx, 1);
      }
      await syncDeleteDoc("beneficiaryLocations", o.id);
    }
    dbStore.beneficiaryGroups[idx].lembagaList = lembagaList;
    await syncSaveDoc("beneficiaryGroups", id, dbStore.beneficiaryGroups[idx]);
  }
  cleanDuplicateGroupsAndLocations();
  dbStore.addLog("USR-SYSTEM", "Operator", "Penerima Manfaat", "Edit Kelompok", `Memperbarui kelompok: ${updatedNama}`);
  res.json({ success: true, data: dbStore.beneficiaryGroups[idx], message: "Kelompok dan spesifikasi lembaga sasaran berhasil diperbarui" });
}
router14.post("/groups", async (req, res) => {
  const { id, nama, kategoriUtama, kategoriLembaga, klasifikasiPorsi, deskripsi, alamat, status, lembagaList, picNama, nomorKontak, picKontak } = req.body;
  const groupNama = nama && nama.trim() || `Kelompok Sasaran #${dbStore.beneficiaryGroups.length + 1}`;
  if (id) {
    const existingIdx = dbStore.beneficiaryGroups.findIndex((g) => g.id === id);
    if (existingIdx !== -1) {
      await updateGroupHandler(id, { ...req.body, nama: groupNama }, res);
      return;
    }
  }
  const groupId = id || `GRP-${Date.now()}-${Math.random().toString(36).substr(2, 6)}`;
  const nextUrutan = dbStore.beneficiaryGroups.length + 1;
  const newGroup = {
    id: groupId,
    nama: groupNama,
    kategoriUtama: kategoriUtama || "Siswa",
    kategoriLembaga: kategoriLembaga || "SD / MI",
    klasifikasiPorsi: klasifikasiPorsi || "Porsi Besar",
    alamat: alamat || deskripsi || "",
    deskripsi: deskripsi || alamat || "",
    picNama: picNama || "",
    nomorKontak: nomorKontak || picKontak || "",
    picKontak: picKontak || nomorKontak || "",
    urutan: nextUrutan,
    status: status || "Aktif",
    lembagaList: Array.isArray(lembagaList) ? lembagaList : []
  };
  dbStore.beneficiaryGroups.push(newGroup);
  await syncSaveDoc("beneficiaryGroups", newGroup.id, newGroup);
  if (Array.isArray(lembagaList) && lembagaList.length > 0) {
    for (let idx = 0; idx < lembagaList.length; idx++) {
      const item = lembagaList[idx];
      const itemKlas = item.klasifikasiPorsi || klasifikasiPorsi || "Porsi Besar";
      let targetSiswa = Number(item.targetSiswa) || 0;
      let targetGuru = Number(item.targetGuru) || 0;
      let targetBalita = Number(item.targetBalita) || 0;
      let targetBumilBusui = Number(item.targetBumilBusui) || 0;
      const normInstansi = (item.namaInstansi || "").trim().toLowerCase();
      let ibuHamil = 0;
      let ibuMenyusui = 0;
      let balita = 0;
      let siswa = 0;
      if (item.kategoriLembaga?.includes("3B") || normInstansi.includes("3b") || item.breakdownKelas && (item.breakdownKelas.baduta !== void 0 || item.breakdownKelas.bumil !== void 0 || item.breakdownKelas.busui_w !== void 0)) {
        const bd = item.breakdownKelas || {};
        const tBalita511 = (Number(bd.balita511_l) || 0) + (Number(bd.balita511_p) || 0) || Number(bd.baduta) || 0;
        const tBalita1259 = (Number(bd.balita1259_l) || 0) + (Number(bd.balita1259_p) || 0) || Number(bd.balita) || 0;
        const tBusui = Number(bd.busui_w) || Number(bd.busui) || 0;
        const tBumil = Number(bd.bumil_w) || Number(bd.bumil) || 0;
        const tKader = (Number(bd.kader_l) || 0) + (Number(bd.kader_p) || 0) || Number(bd.kader) || 0;
        balita = tBalita511 + tBalita1259 || Number(targetBalita) || 0;
        ibuHamil = tBumil || Math.ceil((Number(targetBumilBusui) || 0) / 2);
        ibuMenyusui = tBusui || Math.floor((Number(targetBumilBusui) || 0) / 2);
        targetGuru = tKader;
        targetBalita = balita;
        targetBumilBusui = ibuHamil + ibuMenyusui;
        targetSiswa = 0;
      } else if (itemKlas === "Porsi Ibu Hamil" || normInstansi.includes("ibu hamil") || normInstansi.includes("hamil") && !normInstansi.includes("menyusui")) {
        const val = targetBumilBusui || targetSiswa || 0;
        ibuHamil = val;
        targetBumilBusui = val;
        targetSiswa = 0;
        targetBalita = 0;
      } else if (itemKlas === "Porsi Ibu Menyusui" || normInstansi.includes("ibu menyusui") || normInstansi.includes("menyusui")) {
        const val = targetBumilBusui || targetSiswa || 0;
        ibuMenyusui = val;
        targetBumilBusui = val;
        targetSiswa = 0;
        targetBalita = 0;
      } else if (itemKlas === "Bumil & Busui") {
        const val = targetBumilBusui || targetSiswa || 0;
        ibuHamil = Math.ceil(val / 2);
        ibuMenyusui = Math.floor(val / 2);
        targetBumilBusui = val;
        targetSiswa = 0;
        targetBalita = 0;
      } else if (itemKlas === "Porsi Balita" || itemKlas === "Balita" || normInstansi.includes("balita")) {
        const val = targetBalita || targetSiswa || 0;
        balita = val;
        targetBalita = val;
        targetSiswa = 0;
        targetBumilBusui = 0;
      } else {
        siswa = targetSiswa;
      }
      const accurateTotal = targetSiswa + targetGuru + targetBalita + targetBumilBusui;
      item.total = accurateTotal;
      item.targetSiswa = targetSiswa;
      item.targetGuru = targetGuru;
      item.targetBalita = targetBalita;
      item.targetBumilBusui = targetBumilBusui;
      item.klasifikasiPorsi = itemKlas;
      const locId = item.id || `LOC-${groupId}-${idx + 1}`;
      item.id = locId;
      const locData = {
        id: locId,
        groupId,
        groupNama,
        namaInstansi: item.namaInstansi || `${groupNama} - Instansi ${idx + 1}`,
        kategoriLembaga: item.kategoriLembaga || kategoriLembaga || newGroup.kategoriLembaga,
        klasifikasiPorsi: itemKlas,
        breakdownKelas: item.breakdownKelas || {},
        kategoriBreakdown: {
          siswa,
          guru: targetGuru,
          balita,
          ibuHamil,
          ibuMenyusui,
          breakdownKelas: item.breakdownKelas || {}
        },
        defaultJumlah: accurateTotal,
        status: "Aktif"
      };
      const existingLocIdx = dbStore.beneficiaryLocations.findIndex((l) => l.id === locId);
      if (existingLocIdx !== -1) {
        dbStore.beneficiaryLocations[existingLocIdx] = locData;
      } else {
        dbStore.beneficiaryLocations.push(locData);
      }
      await syncSaveDoc("beneficiaryLocations", locId, locData);
    }
    newGroup.lembagaList = lembagaList;
    await syncSaveDoc("beneficiaryGroups", newGroup.id, newGroup);
  }
  cleanDuplicateGroupsAndLocations();
  dbStore.addLog("USR-SYSTEM", "Operator", "Penerima Manfaat", "Tambah Kelompok", `Menambahkan kelompok: ${groupNama} (${lembagaList?.length || 0} lembaga)`);
  res.json({ success: true, data: newGroup, message: "Kelompok dan spesifikasi lembaga sasaran berhasil disimpan" });
});
router14.put("/groups/:id", async (req, res) => {
  const { id } = req.params;
  await updateGroupHandler(id, req.body, res);
});
router14.delete("/groups", async (req, res) => {
  const count = dbStore.beneficiaryGroups.length;
  const allGroups = [...dbStore.beneficiaryGroups];
  dbStore.beneficiaryGroups = [];
  for (const g of allGroups) {
    await syncDeleteDoc("beneficiaryGroups", g.id);
  }
  const allLocs = [...dbStore.beneficiaryLocations];
  dbStore.beneficiaryLocations = [];
  for (const l of allLocs) {
    await syncDeleteDoc("beneficiaryLocations", l.id);
  }
  dbStore.addLog("USR-SYSTEM", "Operator", "Penerima Manfaat", "Hapus Semua Kelompok", `Menghapus seluruh kelompok (${count} kelompok)`);
  res.json({ success: true, message: "Seluruh kelompok penerima manfaat berhasil dihapus" });
});
router14.delete("/groups/:id", async (req, res) => {
  const { id } = req.params;
  const idx = dbStore.beneficiaryGroups.findIndex((g) => g.id === id);
  let removedNama = id;
  if (idx !== -1) {
    const removed = dbStore.beneficiaryGroups.splice(idx, 1)[0];
    removedNama = removed.nama;
  }
  await syncDeleteDoc("beneficiaryGroups", id);
  const locsToRemove = dbStore.beneficiaryLocations.filter((l) => l.groupId === id);
  dbStore.beneficiaryLocations = dbStore.beneficiaryLocations.filter((l) => l.groupId !== id);
  for (const l of locsToRemove) {
    await syncDeleteDoc("beneficiaryLocations", l.id);
  }
  cleanDuplicateGroupsAndLocations();
  dbStore.addLog("USR-SYSTEM", "Operator", "Penerima Manfaat", "Hapus Kelompok", `Menghapus kelompok: ${removedNama}`);
  res.json({ success: true, message: `Kelompok "${removedNama}" berhasil dihapus` });
});
router14.get("/locations", (req, res) => {
  res.json({
    success: true,
    data: dbStore.beneficiaryLocations
  });
});
router14.post("/locations", (req, res) => {
  const { groupId, groupNama, namaInstansi, alamat, kontak, kategoriBreakdown, defaultJumlah } = req.body;
  if (!namaInstansi) {
    res.status(400).json({ success: false, message: "Nama instansi/lokasi wajib diisi" });
    return;
  }
  const existingIdx = dbStore.beneficiaryLocations.findIndex(
    (l) => l.namaInstansi.trim().toLowerCase() === namaInstansi.trim().toLowerCase() && l.groupId === (groupId || "GRP-001")
  );
  const locId = existingIdx !== -1 ? dbStore.beneficiaryLocations[existingIdx].id : `LOC-${Date.now()}`;
  const locData = {
    id: locId,
    groupId: groupId || "GRP-001",
    groupNama: groupNama || "Umum",
    namaInstansi,
    alamat: alamat || "",
    kontak: kontak || "",
    kategoriBreakdown: kategoriBreakdown || {},
    defaultJumlah: Number(defaultJumlah) || 0,
    status: "Aktif"
  };
  if (existingIdx !== -1) {
    dbStore.beneficiaryLocations[existingIdx] = locData;
  } else {
    dbStore.beneficiaryLocations.push(locData);
  }
  syncSaveDoc("beneficiaryLocations", locId, locData);
  cleanDuplicateGroupsAndLocations();
  dbStore.addLog("USR-SYSTEM", "Operator", "Penerima Manfaat", "Simpan Lokasi", `Menyimpan lokasi: ${namaInstansi}`);
  res.json({ success: true, data: locData, message: "Lokasi berhasil disimpan" });
});
router14.put("/locations/:id", (req, res) => {
  const { id } = req.params;
  const idx = dbStore.beneficiaryLocations.findIndex((l) => l.id === id);
  if (idx === -1) {
    res.status(404).json({ success: false, message: "Lokasi tidak ditemukan" });
    return;
  }
  dbStore.beneficiaryLocations[idx] = {
    ...dbStore.beneficiaryLocations[idx],
    ...req.body
  };
  syncSaveDoc("beneficiaryLocations", id, dbStore.beneficiaryLocations[idx]);
  cleanDuplicateGroupsAndLocations();
  dbStore.addLog("USR-SYSTEM", "Operator", "Penerima Manfaat", "Edit Lokasi", `Memperbarui lokasi: ${dbStore.beneficiaryLocations[idx].namaInstansi}`);
  res.json({ success: true, data: dbStore.beneficiaryLocations[idx], message: "Lokasi berhasil diperbarui" });
});
router14.delete("/locations/:id", (req, res) => {
  const { id } = req.params;
  const idx = dbStore.beneficiaryLocations.findIndex((l) => l.id === id);
  if (idx === -1) {
    res.status(404).json({ success: false, message: "Lokasi tidak ditemukan" });
    return;
  }
  const removed = dbStore.beneficiaryLocations.splice(idx, 1)[0];
  syncDeleteDoc("beneficiaryLocations", id);
  dbStore.addLog("USR-SYSTEM", "Operator", "Penerima Manfaat", "Hapus Lokasi", `Menghapus lokasi: ${removed.namaInstansi}`);
  res.json({ success: true, message: `Lokasi "${removed.namaInstansi}" berhasil dihapus` });
});
router14.get("/by-date", (req, res) => {
  const todayStr = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
  const tanggal = req.query.tanggal || todayStr;
  const finalOnly = req.query.finalOnly === "true";
  const allRecords = dbStore.getBeneficiaryRecordsForDate(tanggal);
  const fullSummary = dbStore.getBeneficiarySummaryForDate(tanggal);
  const hasPlanning = allRecords.length > 0;
  const isDraft = hasPlanning && fullSummary.statusLock !== "FINAL";
  if (finalOnly && (!hasPlanning || isDraft)) {
    res.json({
      success: true,
      tanggal,
      hasPlanning,
      isDraft,
      draftCount: allRecords.length,
      records: [],
      summary: {
        tanggal,
        hasPlanning,
        totalPenerima: 0,
        totalPorsi: 0,
        totalKelompok: 0,
        totalInstansi: 0,
        totalBalita: 0,
        totalIbuHamil: 0,
        totalIbuMenyusui: 0,
        totalSiswa: 0,
        totalGuru: 0,
        portionBreakdown: {
          porsiBesar: 0,
          porsiKecil: 0,
          porsiBalita: 0,
          porsiIbuHamil: 0,
          porsiIbuMenyusui: 0,
          balita: 0,
          bumilBusui: 0
        },
        statusLock: isDraft ? "DRAFT" : "DRAFT"
      }
    });
    return;
  }
  res.json({
    success: true,
    tanggal,
    hasPlanning,
    isDraft,
    draftCount: isDraft ? allRecords.length : 0,
    records: allRecords,
    summary: fullSummary
  });
});
router14.post("/plan", (req, res) => {
  const { tanggal, statusDoc, catatan, lembagaList, userName, userId } = req.body;
  if (!tanggal || !Array.isArray(lembagaList) || lembagaList.length === 0) {
    res.status(400).json({ success: false, message: "Tanggal dan daftar lembaga sasaran wajib diisi" });
    return;
  }
  const finalStatus = statusDoc === "FINAL" ? "FINAL" : "DRAFT";
  const nowStr = (/* @__PURE__ */ new Date()).toISOString().replace("T", " ").slice(0, 19);
  const operatorName = userName || "Operator";
  const oldRecords = dbStore.dailyBeneficiaryRecords.filter((r) => r.tanggal === tanggal);
  dbStore.dailyBeneficiaryRecords = dbStore.dailyBeneficiaryRecords.filter((r) => r.tanggal !== tanggal);
  oldRecords.forEach((old) => syncDeleteDoc("dailyBeneficiaryRecords", old.id));
  const newRecords = lembagaList.map((item, idx) => {
    const itemKlas = item.klasifikasiPorsi || "Porsi Besar";
    const normInstansi = (item.namaInstansi || "").trim().toLowerCase();
    const statusKbm = item.statusKbm || "Aktif";
    let siswa = 0;
    let guru = 0;
    let balita = 0;
    let ibuHamil = 0;
    let ibuMenyusui = 0;
    let kategori = "Siswa";
    const matchedLoc = dbStore.beneficiaryLocations.find((l) => item.id && l.id === item.id || l.namaInstansi.trim().toLowerCase() === normInstansi);
    const matchedGroup = dbStore.beneficiaryGroups.find(
      (g) => item.groupId && g.id === item.groupId || matchedLoc?.groupId && g.id === matchedLoc.groupId || g.nama && g.nama.toLowerCase() === (item.groupNama || "").toLowerCase()
    );
    const groupName = matchedGroup?.nama || matchedLoc?.groupNama || item.groupNama || itemKlas;
    const itemCat = item.kategoriLembaga || matchedLoc?.kategoriLembaga || matchedGroup?.kategoriLembaga || (normInstansi.includes("3b") ? "3B (Balita, Ibu Hamil & Ibu Menyusui)" : normInstansi.includes("sd") ? "SD / MI" : "SD / MI");
    const bd = item.breakdownKelas || matchedLoc?.breakdownKelas || {};
    const is3B = itemCat.includes("3B") || normInstansi.includes("3b");
    if (statusKbm !== "Libur Full") {
      guru = Number(item.targetGuru) || 0;
      if (is3B) {
        const tBalita511 = (Number(bd.balita511_l) || 0) + (Number(bd.balita511_p) || 0) || Number(bd.baduta) || 0;
        const tBalita1259 = (Number(bd.balita1259_l) || 0) + (Number(bd.balita1259_p) || 0) || Number(bd.balita) || 0;
        const tBusui = Number(bd.busui_w) || Number(bd.busui) || 0;
        const tBumil = Number(bd.bumil_w) || Number(bd.bumil) || 0;
        const tKader = (Number(bd.kader_l) || 0) + (Number(bd.kader_p) || 0) || Number(bd.kader) || 0;
        balita = tBalita511 + tBalita1259 || Number(item.targetBalita) || 0;
        ibuHamil = tBumil || Math.ceil((Number(item.targetBumilBusui) || 0) / 2);
        ibuMenyusui = tBusui || Math.floor((Number(item.targetBumilBusui) || 0) / 2);
        guru = tKader;
        siswa = 0;
        kategori = "Balita";
      } else {
        const computeBreakdownTotal = (breakdown) => {
          if (!breakdown || typeof breakdown !== "object") return 0;
          const baseKeys = /* @__PURE__ */ new Set();
          for (const k of Object.keys(breakdown)) {
            baseKeys.add(k.replace(/_(l|p|w)$/, ""));
          }
          let total2 = 0;
          for (const base of baseKeys) {
            const hasGender = breakdown[`${base}_l`] !== void 0 || breakdown[`${base}_p`] !== void 0 || breakdown[`${base}_w`] !== void 0;
            if (hasGender) {
              total2 += (Number(breakdown[`${base}_l`]) || 0) + (Number(breakdown[`${base}_p`]) || 0) + (Number(breakdown[`${base}_w`]) || 0);
            } else {
              total2 += Number(breakdown[base]) || 0;
            }
          }
          return total2;
        };
        const sumClasses = computeBreakdownTotal(bd);
        if (sumClasses > 0) {
          if (itemCat === "Balita / Posyandu" || itemKlas === "Porsi Balita") {
            balita = sumClasses;
            siswa = 0;
            kategori = "Balita";
          } else if (itemCat === "Bumil & Busui" || itemKlas === "Porsi Ibu Hamil" || itemKlas === "Porsi Ibu Menyusui") {
            ibuHamil = Math.ceil(sumClasses / 2);
            ibuMenyusui = Math.floor(sumClasses / 2);
            siswa = 0;
            kategori = "Ibu Hamil";
          } else {
            siswa = sumClasses;
            kategori = "Siswa";
          }
        } else if (itemKlas === "Porsi Balita" || itemKlas === "Balita" || normInstansi.includes("balita")) {
          balita = Number(item.targetBalita ?? item.targetSiswa) || 0;
          kategori = "Balita";
        } else if (itemKlas === "Porsi Ibu Hamil" || normInstansi.includes("ibu hamil") || normInstansi.includes("hamil") && !normInstansi.includes("menyusui")) {
          ibuHamil = Number(item.targetBumilBusui ?? item.targetSiswa) || 0;
          kategori = "Ibu Hamil";
        } else if (itemKlas === "Porsi Ibu Menyusui" || normInstansi.includes("ibu menyusui") || normInstansi.includes("menyusui")) {
          ibuMenyusui = Number(item.targetBumilBusui ?? item.targetSiswa) || 0;
          kategori = "Ibu Menyusui";
        } else if (itemKlas === "Bumil & Busui") {
          const val = Number(item.targetBumilBusui ?? item.targetSiswa) || 0;
          ibuHamil = Math.ceil(val / 2);
          ibuMenyusui = Math.floor(val / 2);
          kategori = "Ibu Hamil";
        } else {
          siswa = Number(item.targetSiswa) || 0;
          kategori = "Siswa";
        }
      }
    } else {
      if (itemKlas === "Porsi Balita" || itemKlas === "Balita" || normInstansi.includes("balita")) {
        kategori = "Balita";
      } else if (itemKlas === "Porsi Ibu Hamil" || normInstansi.includes("ibu hamil")) {
        kategori = "Ibu Hamil";
      } else if (itemKlas === "Porsi Ibu Menyusui" || normInstansi.includes("ibu menyusui")) {
        kategori = "Ibu Menyusui";
      }
    }
    const total = siswa + guru + balita + ibuHamil + ibuMenyusui;
    const statusNote = statusKbm === "Libur Sebagian" ? `Libur Sebagian: ${item.keteranganLibur || "-"}` : statusKbm === "Libur Full" ? "Libur Full" : "Aktif";
    const combinedKeterangan = item.keterangan ? `${statusNote} \u2022 ${item.keterangan}` : statusNote;
    return {
      id: `BEN-${tanggal}-${String(idx + 1).padStart(3, "0")}`,
      tanggal,
      groupId: matchedGroup?.id || matchedLoc?.groupId || item.groupId || `GRP-${idx + 1}`,
      groupNama: groupName,
      locationId: item.id || matchedLoc?.id || `LOC-${idx + 1}`,
      namaInstansi: item.namaInstansi || `Instansi ${idx + 1}`,
      kategori,
      kategoriLembaga: itemCat,
      breakdownKelas: bd,
      klasifikasiPorsi: itemKlas,
      statusKbm,
      keteranganLibur: item.keteranganLibur || "",
      catatan: statusNote,
      rincianSasaran: {
        siswa,
        guru,
        balita,
        ibuHamil,
        ibuMenyusui,
        breakdownKelas: bd
      },
      jumlahAwal: total,
      penambahan: 0,
      pengurangan: 0,
      totalPenerima: total,
      keterangan: combinedKeterangan,
      status: finalStatus,
      finalizedBy: finalStatus === "FINAL" ? operatorName : void 0,
      finalizedAt: finalStatus === "FINAL" ? nowStr : void 0,
      createdBy: operatorName,
      createdAt: nowStr
    };
  });
  dbStore.dailyBeneficiaryRecords.push(...newRecords);
  syncSaveBatch("dailyBeneficiaryRecords", newRecords);
  dbStore.beneficiaryLockStatus[tanggal] = {
    status: finalStatus,
    finalizedBy: finalStatus === "FINAL" ? operatorName : void 0,
    finalizedAt: finalStatus === "FINAL" ? nowStr : void 0
  };
  syncSaveDoc("beneficiaryLocks", tanggal, { id: tanggal, ...dbStore.beneficiaryLockStatus[tanggal] });
  const updatedSummary = dbStore.getBeneficiarySummaryForDate(tanggal);
  dbStore.addLog(
    userId || "USR-001",
    operatorName,
    "Penerima Manfaat",
    "Buat Perencanaan Penerima Manfaat",
    `Menyimpan perencanaan penerima manfaat tanggal ${tanggal} (${newRecords.length} lembaga, Status: ${finalStatus}, Total: ${updatedSummary.totalPorsi} porsi)`
  );
  res.json({
    success: true,
    tanggal,
    records: newRecords,
    summary: updatedSummary,
    message: `Perencanaan penerima manfaat tanggal ${tanggal} berhasil disimpan (${finalStatus})`
  });
});
router14.post("/record", (req, res) => {
  const data = req.body;
  if (!data.tanggal || !data.namaInstansi) {
    res.status(400).json({ success: false, message: "Tanggal dan Nama Instansi wajib diisi" });
    return;
  }
  const summary = dbStore.getBeneficiarySummaryForDate(data.tanggal);
  if (summary.hasPlanning && summary.statusLock === "FINAL" && data.userRole !== "Admin" && data.userRole !== "Admin Penuh" && data.userRole !== "Super Admin") {
    res.status(403).json({ success: false, message: "Data untuk tanggal ini sudah DIFINALISASI / DIKUNCI. Memerlukan hak akses Admin untuk mengubah." });
    return;
  }
  const jumlahAwal = Number(data.jumlahAwal) || 0;
  const penambahan = Number(data.penambahan) || 0;
  const pengurangan = Number(data.pengurangan) || 0;
  const totalPenerima = Math.max(0, jumlahAwal + penambahan - pengurangan);
  const nowStr = (/* @__PURE__ */ new Date()).toISOString().replace("T", " ").slice(0, 19);
  let existingIdx = -1;
  if (data.id) {
    existingIdx = dbStore.dailyBeneficiaryRecords.findIndex((r) => r.id === data.id);
  } else {
    existingIdx = dbStore.dailyBeneficiaryRecords.findIndex(
      (r) => r.tanggal === data.tanggal && r.namaInstansi.trim().toLowerCase() === data.namaInstansi.trim().toLowerCase()
    );
  }
  let savedRecord;
  if (existingIdx !== -1) {
    const prevRec = dbStore.dailyBeneficiaryRecords[existingIdx];
    const prevTotal = prevRec.totalPenerima;
    savedRecord = {
      ...prevRec,
      groupId: data.groupId || prevRec.groupId,
      groupNama: data.groupNama || prevRec.groupNama,
      locationId: data.locationId || prevRec.locationId,
      namaInstansi: data.namaInstansi || prevRec.namaInstansi,
      kategori: data.kategori || prevRec.kategori,
      klasifikasiPorsi: data.klasifikasiPorsi || prevRec.klasifikasiPorsi,
      statusKbm: data.statusKbm || prevRec.statusKbm,
      keteranganLibur: data.keteranganLibur !== void 0 ? data.keteranganLibur : prevRec.keteranganLibur,
      rincianSasaran: data.rincianSasaran || prevRec.rincianSasaran,
      jumlahAwal,
      penambahan,
      pengurangan,
      totalPenerima,
      status: data.status || prevRec.status,
      keterangan: data.keterangan !== void 0 ? data.keterangan : prevRec.keterangan,
      updatedBy: data.userName || "Operator",
      updatedAt: nowStr
    };
    dbStore.dailyBeneficiaryRecords[existingIdx] = savedRecord;
    if (prevTotal !== totalPenerima) {
      const auditLog = {
        id: `AUD-${Date.now()}`,
        recordId: savedRecord.id,
        namaInstansi: savedRecord.namaInstansi,
        tanggal: savedRecord.tanggal,
        jam: (/* @__PURE__ */ new Date()).toTimeString().slice(0, 8),
        user: data.userName || "Operator",
        dataSebelum: prevTotal,
        dataSesudah: totalPenerima,
        selisih: totalPenerima - prevTotal,
        keterangan: data.keterangan || "Perubahan jumlah penerima"
      };
      dbStore.beneficiaryAuditLogs.unshift(auditLog);
    }
    dbStore.addLog(data.userId || "USR-001", data.userName || "Operator", "Penerima Manfaat", "Update Penerima", `Update ${savedRecord.namaInstansi}: ${prevTotal} -> ${totalPenerima}`);
  } else {
    const currentLock = dbStore.beneficiaryLockStatus[data.tanggal]?.status;
    const recStatus = data.status === "FINAL" || currentLock === "FINAL" ? "FINAL" : "DRAFT";
    const randSuffix = Math.random().toString(36).substring(2, 6).toUpperCase();
    savedRecord = {
      id: `BEN-${data.tanggal}-${randSuffix}`,
      tanggal: data.tanggal,
      groupId: data.groupId || "GRP-001",
      groupNama: data.groupNama || "Umum",
      locationId: data.locationId || "LOC-001",
      namaInstansi: data.namaInstansi,
      kategori: data.kategori || "Siswa",
      klasifikasiPorsi: data.klasifikasiPorsi,
      statusKbm: data.statusKbm || "Aktif",
      keteranganLibur: data.keteranganLibur || "",
      rincianSasaran: data.rincianSasaran,
      jumlahAwal,
      penambahan,
      pengurangan,
      totalPenerima,
      keterangan: data.keterangan || "",
      status: recStatus,
      createdBy: data.userName || "Operator",
      createdAt: nowStr
    };
    dbStore.dailyBeneficiaryRecords.push(savedRecord);
    dbStore.addLog(data.userId || "USR-001", data.userName || "Operator", "Penerima Manfaat", "Tambah Penerima", `Tambah ${savedRecord.namaInstansi}: Total ${totalPenerima}`);
  }
  syncSaveDoc("dailyBeneficiaryRecords", savedRecord.id, savedRecord);
  const updatedSummary = dbStore.getBeneficiarySummaryForDate(data.tanggal);
  res.json({
    success: true,
    data: savedRecord,
    summary: updatedSummary,
    message: "Data penerima manfaat berhasil disimpan"
  });
});
router14.delete("/record/:id", (req, res) => {
  const { id } = req.params;
  const idx = dbStore.dailyBeneficiaryRecords.findIndex((r) => r.id === id);
  if (idx === -1) {
    res.status(404).json({ success: false, message: "Record penerima tidak ditemukan" });
    return;
  }
  const targetRec = dbStore.dailyBeneficiaryRecords[idx];
  const summary = dbStore.getBeneficiarySummaryForDate(targetRec.tanggal);
  if (summary.statusLock === "FINAL") {
    res.status(403).json({ success: false, message: "Data sudah DIFINALISASI. Buka kunci data terlebih dahulu untuk menghapus." });
    return;
  }
  dbStore.dailyBeneficiaryRecords.splice(idx, 1);
  syncDeleteDoc("dailyBeneficiaryRecords", id);
  dbStore.addLog("USR-SYSTEM", "Operator", "Penerima Manfaat", "Hapus Penerima", `Menghapus record: ${targetRec.namaInstansi}`);
  res.json({
    success: true,
    message: "Data penerima berhasil dihapus"
  });
});
router14.delete("/records/date/:tanggal", (req, res) => {
  const { tanggal } = req.params;
  const toDelete = dbStore.dailyBeneficiaryRecords.filter((r) => r.tanggal === tanggal);
  if (toDelete.length > 0) {
    dbStore.dailyBeneficiaryRecords = dbStore.dailyBeneficiaryRecords.filter((r) => r.tanggal !== tanggal);
    toDelete.forEach((r) => syncDeleteDoc("dailyBeneficiaryRecords", r.id));
  }
  delete dbStore.beneficiaryLockStatus[tanggal];
  syncDeleteDoc("beneficiaryLocks", tanggal);
  dbStore.addLog("USR-SYSTEM", "Operator", "Penerima Manfaat", "Hapus Rekap Harian", `Menghapus rekap harian tanggal ${tanggal}`);
  res.json({
    success: true,
    message: `Data rekap harian tanggal ${tanggal} berhasil dihapus`
  });
});
router14.post("/copy-previous", (req, res) => {
  const { targetDate, sourceDate } = req.body;
  if (!targetDate) {
    res.status(400).json({ success: false, message: "Tanggal target wajib diisi" });
    return;
  }
  const copiedRecords = dbStore.copyBeneficiaryFromPreviousDay(targetDate, sourceDate);
  if (copiedRecords.length === 0) {
    res.status(400).json({
      success: false,
      message: "Belum ada data perencanaan penerima manfaat pada hari sebelumnya untuk disalin. Silakan buat perencanaan terlebih dahulu melalui tombol Buat Penerima Manfaat."
    });
    return;
  }
  dbStore.beneficiaryLockStatus[targetDate] = { status: "DRAFT" };
  syncSaveDoc("beneficiaryLocks", targetDate, { id: targetDate, status: "DRAFT" });
  syncSaveBatch("dailyBeneficiaryRecords", copiedRecords);
  const summary = dbStore.getBeneficiarySummaryForDate(targetDate);
  dbStore.addLog("USR-SYSTEM", "Operator", "Penerima Manfaat", "Salin Data Hari Sebelumnya", `Menyalin data ke tanggal ${targetDate}`);
  res.json({
    success: true,
    message: `Berhasil menyalin ${copiedRecords.length} data penerima ke tanggal ${targetDate} (Status: DRAFT)`,
    records: copiedRecords,
    summary
  });
});
router14.post("/finalize", (req, res) => {
  const { tanggal, user } = req.body;
  if (!tanggal) {
    res.status(400).json({ success: false, message: "Tanggal wajib diisi" });
    return;
  }
  const nowStr = (/* @__PURE__ */ new Date()).toISOString().replace("T", " ").slice(0, 19);
  dbStore.beneficiaryLockStatus[tanggal] = {
    status: "FINAL",
    finalizedBy: user || "Supervisor / Admin",
    finalizedAt: nowStr
  };
  syncSaveDoc("beneficiaryLocks", tanggal, { id: tanggal, ...dbStore.beneficiaryLockStatus[tanggal] });
  const updatedForDate = [];
  dbStore.dailyBeneficiaryRecords.forEach((r) => {
    if (r.tanggal === tanggal) {
      r.status = "FINAL";
      r.finalizedBy = user || "Supervisor / Admin";
      r.finalizedAt = nowStr;
      updatedForDate.push(r);
    }
  });
  if (updatedForDate.length > 0) {
    syncSaveBatch("dailyBeneficiaryRecords", updatedForDate);
  }
  dbStore.addLog("USR-SYSTEM", user || "Supervisor", "Penerima Manfaat", "Finalisasi Data", `Data tanggal ${tanggal} difinalisasi / dikunci.`);
  res.json({
    success: true,
    message: `Data penerima manfaat tanggal ${tanggal} berhasil DIFINALISASI & DIKUNCI serta ditampilkan di Dashboard.`,
    summary: dbStore.getBeneficiarySummaryForDate(tanggal)
  });
});
router14.post("/unlock", (req, res) => {
  const { tanggal, user } = req.body;
  if (!tanggal) {
    res.status(400).json({ success: false, message: "Tanggal wajib diisi" });
    return;
  }
  dbStore.beneficiaryLockStatus[tanggal] = {
    status: "DRAFT"
  };
  syncSaveDoc("beneficiaryLocks", tanggal, { id: tanggal, ...dbStore.beneficiaryLockStatus[tanggal] });
  const updatedForDate = [];
  dbStore.dailyBeneficiaryRecords.forEach((r) => {
    if (r.tanggal === tanggal) {
      r.status = "DRAFT";
      updatedForDate.push(r);
    }
  });
  if (updatedForDate.length > 0) {
    syncSaveBatch("dailyBeneficiaryRecords", updatedForDate);
  }
  dbStore.addLog("USR-SYSTEM", user || "Admin", "Penerima Manfaat", "Buka Finalisasi", `Kunci data tanggal ${tanggal} dibuka kembali.`);
  res.json({
    success: true,
    message: `Kunci data penerima tanggal ${tanggal} berhasil DIBUKA (Status kembali ke DRAFT dan disembunyikan dari Dashboard).`,
    summary: dbStore.getBeneficiarySummaryForDate(tanggal)
  });
});
router14.get("/history", (req, res) => {
  const { startDate, endDate, groupId, locationId, search } = req.query;
  let results = dbStore.dailyBeneficiaryRecords.filter(
    (r) => r.createdBy !== "System Copy" && !(r.createdBy === "USR-001" && r.createdAt?.endsWith("06:30:00"))
  );
  if (startDate) {
    results = results.filter((r) => r.tanggal >= startDate);
  }
  if (endDate) {
    results = results.filter((r) => r.tanggal <= endDate);
  }
  if (groupId && groupId !== "all") {
    results = results.filter((r) => r.groupId === groupId);
  }
  if (locationId && locationId !== "all") {
    results = results.filter((r) => r.locationId === locationId);
  }
  if (search) {
    const q = search.toLowerCase();
    results = results.filter(
      (r) => r.namaInstansi.toLowerCase().includes(q) || r.groupNama.toLowerCase().includes(q) || r.kategori.toLowerCase().includes(q)
    );
  }
  res.json({
    success: true,
    totalRecords: results.length,
    data: results
  });
});
router14.get("/rekap-bulanan", (req, res) => {
  const { bulan, tahun } = req.query;
  const currentYear = tahun || (/* @__PURE__ */ new Date()).getFullYear().toString();
  const currentMonth = bulan ? String(bulan).padStart(2, "0") : String((/* @__PURE__ */ new Date()).getMonth() + 1).padStart(2, "0");
  const prefix = `${currentYear}-${currentMonth}`;
  const recs = dbStore.dailyBeneficiaryRecords.filter(
    (r) => r.tanggal.startsWith(prefix) && r.createdBy !== "System Copy" && !(r.createdBy === "USR-001" && r.createdAt?.endsWith("06:30:00"))
  );
  const dateMap = {};
  recs.forEach((r) => {
    if (!dateMap[r.tanggal]) {
      dateMap[r.tanggal] = {
        tanggal: r.tanggal,
        totalBalita: 0,
        totalIbuHamil: 0,
        totalIbuMenyusui: 0,
        totalSiswa: 0,
        totalGuru: 0,
        totalPenerima: 0
      };
    }
    const item = dateMap[r.tanggal];
    item.totalPenerima += r.totalPenerima;
    if (r.rincianSasaran) {
      if (r.statusKbm !== "Libur Full" && r.totalPenerima > 0) {
        const delta = (Number(r.penambahan) || 0) - (Number(r.pengurangan) || 0);
        let s = Number(r.rincianSasaran.siswa) || 0;
        let g = Number(r.rincianSasaran.guru) || 0;
        let b = Number(r.rincianSasaran.balita) || 0;
        let ih = Number(r.rincianSasaran.ibuHamil) || 0;
        let im = Number(r.rincianSasaran.ibuMenyusui) || 0;
        if (ih === 0 && im === 0 && r.breakdownKelas) {
          ih = Number(r.breakdownKelas.bumil_w || r.breakdownKelas.bumil || 0);
          im = Number(r.breakdownKelas.busui_w || r.breakdownKelas.busui || 0);
        }
        if (delta !== 0) {
          if (b > 0 || r.kategori === "Balita") b = Math.max(0, b + delta);
          else if (ih > 0 || r.kategori === "Ibu Hamil") ih = Math.max(0, ih + delta);
          else if (im > 0 || r.kategori === "Ibu Menyusui") im = Math.max(0, im + delta);
          else if (s > 0 || r.kategori === "Siswa") s = Math.max(0, s + delta);
          else g = Math.max(0, g + delta);
        }
        item.totalSiswa += s;
        item.totalGuru += g;
        item.totalBalita += b;
        item.totalIbuHamil += ih;
        item.totalIbuMenyusui += im;
      }
    } else if (r.namaInstansi?.toLowerCase().includes("temenggungan") || r.namaInstansi?.toLowerCase().includes("posyandu") || r.groupNama?.toUpperCase().includes("3B")) {
      const bd = r.breakdownKelas || {};
      const b = (Number(bd.balita511_l) || 0) + (Number(bd.balita511_p) || 0) + (Number(bd.balita1259_l) || 0) + (Number(bd.balita1259_p) || 0);
      const ih = Number(bd.bumil_w || bd.bumil || 0);
      const im = Number(bd.busui_w || bd.busui || 0);
      const k = (Number(bd.kader_l) || 0) + (Number(bd.kader_p) || 0) || Number(bd.kader) || 0;
      item.totalBalita += b;
      item.totalIbuHamil += ih;
      item.totalIbuMenyusui += im;
      item.totalGuru += k;
    } else if (r.kategori === "Balita" || r.groupNama.toUpperCase().includes("BALITA")) {
      item.totalBalita += r.totalPenerima;
    } else if (r.kategori === "Ibu Hamil" || r.groupNama.toUpperCase().includes("HAMIL")) {
      item.totalIbuHamil += r.totalPenerima;
    } else if (r.kategori === "Ibu Menyusui" || r.groupNama.toUpperCase().includes("MENYUSUI")) {
      item.totalIbuMenyusui += r.totalPenerima;
    } else if (r.kategori === "Guru / Staf" || r.groupNama.toUpperCase().includes("GURU")) {
      item.totalGuru += r.totalPenerima;
    } else {
      item.totalSiswa += r.totalPenerima;
    }
  });
  const dailyList = Object.values(dateMap).sort((a, b) => a.tanggal.localeCompare(b.tanggal));
  const totalHariProduksi = dailyList.length;
  let totalPorsi = 0;
  let maxPenerima = 0;
  let minPenerima = dailyList.length > 0 ? dailyList[0].totalPenerima : 0;
  dailyList.forEach((d) => {
    totalPorsi += d.totalPenerima;
    if (d.totalPenerima > maxPenerima) maxPenerima = d.totalPenerima;
    if (d.totalPenerima < minPenerima) minPenerima = d.totalPenerima;
  });
  const rataRataPerHari = totalHariProduksi > 0 ? Math.round(totalPorsi / totalHariProduksi) : 0;
  res.json({
    success: true,
    bulan: currentMonth,
    tahun: currentYear,
    dailyList,
    summary: {
      totalHariProduksi,
      totalPorsi,
      rataRataPerHari,
      maxPenerima,
      minPenerima
    }
  });
});
router14.get("/audit-logs", (req, res) => {
  res.json({
    success: true,
    data: dbStore.beneficiaryAuditLogs
  });
});
router14.get("/summary", (req, res) => {
  const todayStr = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
  const tanggal = req.query.tanggal || todayStr;
  const summary = dbStore.getBeneficiarySummaryForDate(tanggal);
  res.json({
    success: true,
    tanggal,
    summary
  });
});
router14.get("/bast", (req, res) => {
  try {
    const { tanggal, startDate, endDate, search } = req.query;
    const docs = dbStore.getBastDocuments({
      tanggal: typeof tanggal === "string" && tanggal !== "all" ? tanggal : void 0,
      startDate: typeof startDate === "string" ? startDate : void 0,
      endDate: typeof endDate === "string" ? endDate : void 0,
      search: typeof search === "string" ? search : void 0
    });
    res.json({
      success: true,
      data: docs
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Gagal mengambil data BAST", error: error.message });
  }
});
router14.get("/bast/config", (req, res) => {
  res.json({
    success: true,
    data: dbStore.bastNumberConfig
  });
});
router14.post("/bast/config", async (req, res) => {
  try {
    const updated = dbStore.saveBastNumberConfig(req.body);
    await syncSaveDoc("configs", "bastNumberConfig", updated);
    dbStore.addLog("USR-ADMIN", req.body.adminName || "Admin SPPG", "BAST", "Konfigurasi Nomor BAST", `Memperbarui konfigurasi nomor surat BAST: Mulai ${updated.startNumber}, Digit ${updated.digitCount}, Instansi ${updated.kodeInstansi}`);
    res.json({
      success: true,
      message: "Konfigurasi nomor urut surat BAST berhasil disimpan",
      data: updated
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Gagal menyimpan konfigurasi nomor BAST", error: error.message });
  }
});
router14.get("/bast/next-number", (req, res) => {
  const tanggal = req.query.tanggal || (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
  const nextNumber = dbStore.generateBastNumber(tanggal);
  res.json({
    success: true,
    data: {
      tanggal,
      nextNumber,
      config: dbStore.bastNumberConfig
    }
  });
});
router14.get("/bast/:id", (req, res) => {
  try {
    const doc = dbStore.getBastById(req.params.id);
    if (!doc) {
      res.status(404).json({ success: false, message: "Dokumen BAST tidak ditemukan" });
      return;
    }
    res.json({ success: true, data: doc });
  } catch (error) {
    res.status(500).json({ success: false, message: "Gagal mengambil detail BAST", error: error.message });
  }
});
router14.post("/bast/generate", async (req, res) => {
  try {
    const { tanggal, force } = req.body;
    if (!tanggal) {
      res.status(400).json({ success: false, message: "Parameter tanggal wajib diisi" });
      return;
    }
    const docs = dbStore.generateDailyBastBatch(tanggal, Boolean(force));
    for (const d of docs) {
      await syncSaveDoc("bastDocuments", d.id, d);
    }
    res.json({
      success: true,
      message: `Berhasil generate ${docs.length} dokumen BAST untuk tanggal ${tanggal}`,
      data: docs
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Gagal generate BAST harian", error: error.message });
  }
});
router14.post("/bast", async (req, res) => {
  try {
    const saved = dbStore.saveBastDocument(req.body);
    await syncSaveDoc("bastDocuments", saved.id, saved);
    res.json({
      success: true,
      message: "Dokumen BAST berhasil disimpan",
      data: saved
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Gagal menyimpan BAST", error: error.message });
  }
});
router14.put("/bast/:id", async (req, res) => {
  try {
    const existing = dbStore.getBastById(req.params.id);
    if (!existing) {
      res.status(404).json({ success: false, message: "Dokumen BAST tidak ditemukan" });
      return;
    }
    const updated = dbStore.saveBastDocument({
      ...existing,
      ...req.body,
      id: req.params.id
    });
    if (req.body.namaPic || req.body.telponPic) {
      const locIdx = dbStore.beneficiaryLocations.findIndex(
        (l) => l.id === updated.instansiId || l.namaInstansi.trim().toLowerCase() === updated.namaSekolah.trim().toLowerCase()
      );
      if (locIdx !== -1) {
        if (req.body.namaPic) dbStore.beneficiaryLocations[locIdx].picNama = req.body.namaPic;
        if (req.body.telponPic) {
          dbStore.beneficiaryLocations[locIdx].picTelepon = req.body.telponPic;
          dbStore.beneficiaryLocations[locIdx].kontak = req.body.telponPic;
        }
        await syncSaveDoc("beneficiaryLocations", dbStore.beneficiaryLocations[locIdx].id, dbStore.beneficiaryLocations[locIdx]);
      }
    }
    await syncSaveDoc("bastDocuments", updated.id, updated);
    res.json({
      success: true,
      message: "Dokumen BAST berhasil diperbarui",
      data: updated
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Gagal memperbarui BAST", error: error.message });
  }
});
router14.post("/bast/:id/regenerate", async (req, res) => {
  try {
    const existing = dbStore.getBastById(req.params.id);
    if (!existing) {
      res.status(404).json({ success: false, message: "Dokumen BAST tidak ditemukan" });
      return;
    }
    const dailyRecs = dbStore.getBeneficiaryRecordsForDate(existing.tanggal);
    const matching = dailyRecs.filter((r) => {
      let clean = r.namaInstansi.trim();
      if (clean.includes(" (Guru)")) clean = clean.replace(" (Guru)", "").trim();
      return r.locationId === existing.instansiId || clean.toLowerCase() === existing.namaSekolah.trim().toLowerCase();
    });
    const loc = dbStore.beneficiaryLocations.find((l) => l.id === existing.instansiId || l.namaInstansi.trim().toLowerCase() === existing.namaSekolah.trim().toLowerCase());
    let newCount = matching.reduce((sum, r) => sum + (Number(r.totalPenerima) || 0), 0);
    if (newCount === 0) {
      newCount = loc?.defaultJumlah || existing.jumlahPaketMakanan;
    }
    const updated = dbStore.saveBastDocument({
      ...existing,
      npsn: existing.npsn || loc?.npsn || "",
      jumlahPaketMakanan: newCount,
      jumlahAlatMakan: newCount,
      updatedAt: (/* @__PURE__ */ new Date()).toISOString()
    });
    await syncSaveDoc("bastDocuments", updated.id, updated);
    res.json({
      success: true,
      message: `BAST ${updated.nomorBast} berhasil digenerate ulang dengan jumlah ${newCount} paket.`,
      data: updated
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Gagal meregenerasi BAST", error: error.message });
  }
});
router14.delete("/bast/:id", async (req, res) => {
  try {
    const success = dbStore.deleteBastDocument(req.params.id);
    if (success) {
      await syncDeleteDoc("bastDocuments", req.params.id);
      res.json({ success: true, message: "Dokumen BAST berhasil dihapus" });
    } else {
      res.status(404).json({ success: false, message: "Dokumen BAST tidak ditemukan" });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: "Gagal menghapus BAST", error: error.message });
  }
});
router14.get("/bast/:id/docx", async (req, res) => {
  try {
    const doc = dbStore.getBastById(req.params.id);
    if (!doc) {
      res.status(404).json({ success: false, message: "Dokumen BAST tidak ditemukan" });
      return;
    }
    const syncedDoc = {
      ...doc,
      namaPetugasDistribusi: dbStore.getDistribusiSignerName(doc.namaPetugasDistribusi || "Abdus Salam")
    };
    const wordDoc = await createBastWordDocument(syncedDoc);
    const buffer = await import_docx2.Packer.toBuffer(wordDoc);
    const cleanSchool = doc.namaSekolah.replace(/[^a-zA-Z0-9_-]/g, "_");
    const filename = `BAST_${cleanSchool}_${doc.tanggal}.docx`;
    res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.wordprocessingml.document");
    res.setHeader("Content-Disposition", `attachment; filename="${filename}"`);
    res.send(buffer);
  } catch (error) {
    res.status(500).json({ success: false, message: "Gagal mengunduh dokumen Word", error: error.message });
  }
});
var penerimaManfaat_default = router14;

// server/routes/nutritionPlans.ts
var import_express15 = require("express");
var router15 = (0, import_express15.Router)();
function computePlanItem(planId, menuName, targetGroup, targetCount, itemData, idx) {
  const ingredient = dbStore.masterBahanPangan.find((b) => b.id === itemData.ingredientId);
  const ingredientName = itemData.ingredientName || ingredient?.namaBahan || "Bahan Pangan Baru";
  const netWeightGram = Number(itemData.netWeightGram) || 0;
  let bddPercent = Number(itemData.bddPercent);
  if (isNaN(bddPercent) || bddPercent <= 0) {
    bddPercent = ingredient?.bddDefault || 100;
  }
  bddPercent = Math.min(100, Math.max(0.1, bddPercent));
  const grossWeightGram = Number((netWeightGram / (bddPercent / 100)).toFixed(2));
  const requiredKg = Number((grossWeightGram * targetCount / 1e3).toFixed(4));
  const pricePerKg = Number(itemData.pricePerKg ?? ingredient?.hargaDasarPerKg ?? 0);
  const totalPrice = Math.round(requiredKg * pricePerKg);
  let stockAvailable = Number(itemData.stockAvailable ?? 0);
  if (ingredient) {
    const matchingStockBarang = dbStore.barang.find(
      (b) => b.namaBarang.toLowerCase().includes(ingredient.namaBahan.toLowerCase()) || ingredient.namaBahan.toLowerCase().includes(b.namaBarang.toLowerCase())
    );
    if (matchingStockBarang) {
      stockAvailable = matchingStockBarang.stokSekarang;
    } else {
      stockAvailable = 50;
    }
  }
  const shortageKg = Number(Math.max(0, requiredKg - stockAvailable).toFixed(4));
  let status = "CUKUP";
  if (!ingredient && !itemData.ingredientId) {
    status = "DATA BELUM LENGKAP";
  } else if (pricePerKg <= 0) {
    status = "HARGA BELUM ADA";
  } else if (shortageKg > 0) {
    status = "PERLU PENGADAAN";
  } else {
    status = "CUKUP";
  }
  return {
    id: itemData.id || `PLI-${Date.now()}-${idx + 1}`,
    planId,
    menuName: itemData.menuName || menuName,
    ingredientId: itemData.ingredientId || `CUSTOM-${Date.now()}`,
    ingredientName,
    targetGroup: itemData.targetGroup || targetGroup,
    netWeightGram,
    bddPercent,
    grossWeightGram,
    targetCount,
    requiredKg,
    pricePerKg,
    totalPrice,
    stockAvailable,
    shortageKg,
    status,
    notes: itemData.notes || (shortageKg > 0 ? `Defisit ${shortageKg} kg` : "Stok Cukup")
  };
}
router15.get("/target-count", (req, res) => {
  const tanggal = req.query.tanggal || (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
  const targetGroup = req.query.targetGroup || "Porsi Besar";
  const count = dbStore.getTargetCountForDateAndGroup(tanggal, targetGroup);
  res.json({
    success: true,
    tanggal,
    targetGroup,
    targetCount: count
  });
});
router15.get("/sync-context", (req, res) => {
  const todayStr = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
  const tanggal = req.query.tanggal || todayStr;
  const tugasRecords = dbStore.getTugasDivisiForDate(tanggal);
  const foundMenuTugas = tugasRecords.find((r) => r.menuHarian && r.menuHarian.trim() !== "")?.menuHarian || "";
  const summary = dbStore.getBeneficiarySummaryForDate(tanggal);
  const pb = summary.portionBreakdown || {
    porsiBesar: 0,
    porsiKecil: 0,
    balita: 0,
    bumilBusui: 0
  };
  const hasBeneficiary = Boolean(summary.hasPlanning && summary.totalPenerima > 0);
  let porsiKecil = pb.porsiKecil || 0;
  let porsiBesar = pb.porsiBesar || 0;
  const balita = pb.balita ?? summary.totalBalita ?? 0;
  const bumilBusui = pb.bumilBusui ?? summary.totalIbuHamil + summary.totalIbuMenyusui ?? 0;
  const sum4 = porsiKecil + porsiBesar + balita + bumilBusui;
  if (sum4 > summary.totalPenerima && summary.totalPenerima > 0) {
    if (porsiKecil + porsiBesar === summary.totalPenerima) {
      porsiKecil = Math.max(0, porsiKecil - balita);
      porsiBesar = Math.max(0, porsiBesar - bumilBusui);
    }
    const rem = summary.totalPenerima - (porsiKecil + balita + bumilBusui);
    porsiBesar = Math.max(0, rem);
  } else if (sum4 < summary.totalPenerima && summary.totalPenerima > 0 && hasBeneficiary) {
    porsiBesar += summary.totalPenerima - sum4;
  }
  const targetCounts = hasBeneficiary ? {
    porsiKecil,
    porsiBesar,
    balita,
    bumilBusui,
    total: summary.totalPenerima
  } : {
    porsiKecil: 0,
    porsiBesar: 0,
    balita: 0,
    bumilBusui: 0,
    total: 0
  };
  const existingPlan = dbStore.nutritionPlans.find((p) => p.tanggalPelaksanaan === tanggal) || null;
  if (existingPlan) {
    existingPlan.targetCount = targetCounts.total;
    existingPlan.targetCountsConfig = {
      porsiKecil: targetCounts.porsiKecil,
      porsiBesar: targetCounts.porsiBesar,
      balita: targetCounts.balita,
      bumilBusui: targetCounts.bumilBusui
    };
  }
  res.json({
    success: true,
    tanggal,
    hasPlanningActivity: Boolean(existingPlan),
    menuTugasDivisi: foundMenuTugas,
    hasTugasDivisiMenu: Boolean(foundMenuTugas && foundMenuTugas.trim().length > 0),
    targetCounts,
    beneficiarySummary: summary,
    existingPlan
  });
});
router15.get("/master/ingredients", (req, res) => {
  res.json({
    success: true,
    data: dbStore.masterBahanPangan
  });
});
router15.post("/master/ingredients", (req, res) => {
  const { namaBahan, kategori, satuanPembelian, satuanPerhitungan, bddDefault, hargaDasarPerKg, supplier, lokasi, keterangan, faktorKonversi } = req.body;
  if (!namaBahan) {
    res.status(400).json({ success: false, message: "Nama bahan pangan wajib diisi" });
    return;
  }
  const newIng = {
    id: `ING-${String(dbStore.masterBahanPangan.length + 1).padStart(3, "0")}`,
    namaBahan,
    kategori: kategori || "Lain-lain",
    satuanPembelian: satuanPembelian || "kg",
    satuanPerhitungan: satuanPerhitungan || "gram",
    bddDefault: Number(bddDefault) || 100,
    hargaDasarPerKg: Number(hargaDasarPerKg) || 0,
    supplier: supplier || "",
    lokasi: lokasi || "",
    keterangan: keterangan || "",
    statusAktif: "Aktif",
    faktorKonversi: faktorKonversi || "1 kg = 1000 gram",
    updatedAt: (/* @__PURE__ */ new Date()).toISOString()
  };
  dbStore.masterBahanPangan.push(newIng);
  dbStore.addLog("USR-SYSTEM", "Ahli Gizi", "Perencanaan Bahan", "Tambah Master Bahan", `Menambahkan bahan: ${namaBahan}`);
  res.json({ success: true, data: newIng, message: "Bahan pangan berhasil ditambahkan ke master data" });
});
router15.put("/master/ingredients/:id", (req, res) => {
  const { id } = req.params;
  const idx = dbStore.masterBahanPangan.findIndex((b) => b.id === id);
  if (idx === -1) {
    res.status(404).json({ success: false, message: "Bahan pangan tidak ditemukan" });
    return;
  }
  dbStore.masterBahanPangan[idx] = {
    ...dbStore.masterBahanPangan[idx],
    ...req.body,
    updatedAt: (/* @__PURE__ */ new Date()).toISOString()
  };
  dbStore.addLog("USR-SYSTEM", "Ahli Gizi", "Perencanaan Bahan", "Update Master Bahan", `Update bahan: ${dbStore.masterBahanPangan[idx].namaBahan}`);
  res.json({ success: true, data: dbStore.masterBahanPangan[idx], message: "Data bahan pangan diperbarui" });
});
router15.get("/master/recipes", (req, res) => {
  res.json({
    success: true,
    data: dbStore.masterMenuResep
  });
});
router15.get("/", (req, res) => {
  const { tanggal, status, q } = req.query;
  let plans = [...dbStore.nutritionPlans];
  if (tanggal) {
    plans = plans.filter((p) => p.tanggalPelaksanaan === tanggal || p.tanggalPerencanaan === tanggal);
  }
  if (status) {
    plans = plans.filter((p) => p.status === status);
  }
  if (q) {
    const query = q.toLowerCase();
    plans = plans.filter(
      (p) => p.menuName.toLowerCase().includes(query) || p.targetGroup.toLowerCase().includes(query) || p.nutritionistName.toLowerCase().includes(query)
    );
  }
  const plansWithItems = plans.map((p) => {
    const benSummary = dbStore.getBeneficiarySummaryForDate(p.tanggalPelaksanaan);
    if (benSummary && benSummary.hasPlanning && benSummary.totalPenerima > 0) {
      p.targetCount = benSummary.totalPenerima;
      p.targetCountsConfig = {
        porsiKecil: benSummary.portionBreakdown.porsiKecil || 0,
        porsiBesar: benSummary.portionBreakdown.porsiBesar || 0,
        balita: benSummary.portionBreakdown.balita || 0,
        bumilBusui: benSummary.portionBreakdown.bumilBusui || 0
      };
    }
    return {
      ...p,
      items: dbStore.nutritionPlanItems.filter((i) => i.planId === p.id)
    };
  });
  res.json({
    success: true,
    total: plansWithItems.length,
    data: plansWithItems
  });
});
router15.get("/:id", (req, res) => {
  const { id } = req.params;
  const plan = dbStore.nutritionPlans.find((p) => p.id === id);
  if (!plan) {
    res.status(404).json({ success: false, message: "Perencanaan bahan pangan tidak ditemukan" });
    return;
  }
  const benSummary = dbStore.getBeneficiarySummaryForDate(plan.tanggalPelaksanaan);
  if (benSummary && benSummary.hasPlanning && benSummary.totalPenerima > 0) {
    plan.targetCount = benSummary.totalPenerima;
    plan.targetCountsConfig = {
      porsiKecil: benSummary.portionBreakdown.porsiKecil || 0,
      porsiBesar: benSummary.portionBreakdown.porsiBesar || 0,
      balita: benSummary.portionBreakdown.balita || 0,
      bumilBusui: benSummary.portionBreakdown.bumilBusui || 0
    };
  }
  const items = dbStore.nutritionPlanItems.filter((i) => i.planId === plan.id);
  res.json({
    success: true,
    data: {
      ...plan,
      items
    }
  });
});
router15.get("/by-date/:tanggal", (req, res) => {
  const { tanggal } = req.params;
  const plan = dbStore.nutritionPlans.find((p) => p.tanggalPelaksanaan === tanggal);
  if (!plan) {
    res.status(404).json({ success: false, message: `Belum ada perencanaan menu untuk tanggal ${tanggal}` });
    return;
  }
  const benSummary = dbStore.getBeneficiarySummaryForDate(plan.tanggalPelaksanaan);
  if (benSummary && benSummary.hasPlanning && benSummary.totalPenerima > 0) {
    plan.targetCount = benSummary.totalPenerima;
    plan.targetCountsConfig = {
      porsiKecil: benSummary.portionBreakdown.porsiKecil || 0,
      porsiBesar: benSummary.portionBreakdown.porsiBesar || 0,
      balita: benSummary.portionBreakdown.balita || 0,
      bumilBusui: benSummary.portionBreakdown.bumilBusui || 0
    };
  }
  const items = dbStore.nutritionPlanItems.filter((i) => i.planId === plan.id);
  res.json({
    success: true,
    data: {
      ...plan,
      items
    }
  });
});
router15.post("/save-by-date", (req, res) => {
  const {
    tanggalPerencanaan,
    tanggalPelaksanaan,
    menuId,
    menuName,
    targetGroup,
    targetCount,
    periode,
    keterangan,
    nutritionistId,
    nutritionistName,
    kepalaSppgName,
    status,
    items,
    ingredientsData,
    targetCountsConfig,
    totalCost: customCost,
    totalWeightKg: customWeight
  } = req.body;
  if (!tanggalPelaksanaan) {
    res.status(400).json({ success: false, message: "Tanggal pelaksanaan wajib dipilih" });
    return;
  }
  if (!menuName) {
    res.status(400).json({ success: false, message: "Nama menu utama wajib diisi" });
    return;
  }
  const todayStr = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
  const planDate = tanggalPerencanaan || todayStr;
  const execDate = tanggalPelaksanaan;
  const totalSasaran = targetCountsConfig ? (Number(targetCountsConfig.porsiKecil) || 0) + (Number(targetCountsConfig.porsiBesar) || 0) + (Number(targetCountsConfig.balita) || 0) + (Number(targetCountsConfig.bumilBusui) || 0) : Number(targetCount) || 0;
  const existingIdx = dbStore.nutritionPlans.findIndex((p) => p.tanggalPelaksanaan === execDate);
  if (existingIdx !== -1 && dbStore.nutritionPlans[existingIdx].status === "Final" && !req.body.allowRevision) {
    res.status(403).json({
      success: false,
      message: `Perencanaan menu untuk tanggal pelaksanaan ${execDate} sudah berstatus FINAL & TERKUNCI (${dbStore.nutritionPlans[existingIdx].menuName}). Buka kunci revisi terlebih dahulu untuk mengubah data.`
    });
    return;
  }
  let planId;
  let isUpdate = false;
  if (existingIdx !== -1) {
    planId = dbStore.nutritionPlans[existingIdx].id;
    isUpdate = true;
  } else {
    planId = `PLAN-${execDate.replace(/-/g, "")}-${String(dbStore.nutritionPlans.length + 1).padStart(3, "0")}`;
  }
  let processedItems = [];
  if (Array.isArray(items) && items.length > 0) {
    dbStore.nutritionPlanItems = dbStore.nutritionPlanItems.filter((i) => i.planId !== planId);
    processedItems = items.map((it, idx) => computePlanItem(planId, menuName, targetGroup || "Multi-Kelompok", totalSasaran, it, idx));
    dbStore.nutritionPlanItems.push(...processedItems);
  }
  const calculatedCost = processedItems.length > 0 ? processedItems.reduce((acc, curr) => acc + curr.totalPrice, 0) : Number(customCost) || 0;
  const calculatedWeight = processedItems.length > 0 ? Number(processedItems.reduce((acc, curr) => acc + curr.requiredKg, 0).toFixed(2)) : Number(customWeight) || 0;
  const planPayload = {
    id: planId,
    tanggalPerencanaan: planDate,
    tanggalPelaksanaan: execDate,
    menuId: menuId || void 0,
    menuName,
    targetGroup: targetGroup || "Multi-Kelompok (Porsi Kecil, Besar, Balita, Bumil/Busui)",
    targetCount: totalSasaran,
    periode: periode || "Harian",
    keterangan: keterangan || "Standar Menu SPPG Probolinggo Krejengan Temenggungan",
    nutritionistId: nutritionistId || "USR-006",
    nutritionistName: nutritionistName || "Fitria, S. ST",
    kepalaSppgName: kepalaSppgName || "Sri Rohayu, S. Pd",
    status: status || "Draft",
    totalCost: calculatedCost,
    totalWeightKg: calculatedWeight,
    ingredientsData: ingredientsData || void 0,
    targetCountsConfig: targetCountsConfig || void 0,
    createdAt: isUpdate ? dbStore.nutritionPlans[existingIdx].createdAt : (/* @__PURE__ */ new Date()).toISOString(),
    updatedAt: (/* @__PURE__ */ new Date()).toISOString()
  };
  if (isUpdate) {
    dbStore.nutritionPlans[existingIdx] = planPayload;
  } else {
    dbStore.nutritionPlans.unshift(planPayload);
  }
  syncSaveDoc("nutritionPlans", planPayload.id, planPayload);
  if (processedItems && processedItems.length > 0) {
    syncSaveBatch("nutritionPlanItems", processedItems);
  }
  const rabPlan = dbStore.getOrCreateRABForDate(execDate);
  if (status === "Final") {
    rabPlan.status = "Final";
    rabPlan.approvedAt = (/* @__PURE__ */ new Date()).toISOString();
    rabPlan.approvedBy = kepalaSppgName || "Sri Rohayu, S. Pd (Kepala SPPG)";
    rabPlan.updatedAt = (/* @__PURE__ */ new Date()).toISOString();
  } else if (status === "Revisi" || status === "Draft") {
    if (rabPlan.status === "Final" && req.body.allowRevision) {
      rabPlan.status = "Draft";
      rabPlan.updatedAt = (/* @__PURE__ */ new Date()).toISOString();
    }
  }
  syncSaveDoc("rabPlans", rabPlan.id, rabPlan);
  if (req.body.syncToTugasDivisi !== false && menuName) {
    const tugasRecords = dbStore.getOrCreateTugasDivisiForDate(execDate);
    tugasRecords.forEach((r) => {
      r.menuHarian = menuName;
    });
    syncSaveBatch("tugasDivisi", tugasRecords);
  }
  dbStore.addLog(
    planPayload.nutritionistId,
    planPayload.nutritionistName,
    "Perencanaan Bahan",
    isUpdate ? "Update Perencanaan Menu" : "Simpan Perencanaan Menu",
    `Menyimpan perencanaan menu untuk tanggal pelaksanaan ${execDate}: ${menuName} (${totalSasaran} sasaran)`
  );
  dbStore.addNotification(
    "Tugas Divisi",
    `Perencanaan Menu Tanggal ${execDate}`,
    `Perencanaan menu "${menuName}" untuk tanggal pelaksanaan ${execDate} berhasil disimpan.`,
    "info",
    "/perencanaan-bahan"
  );
  res.json({
    success: true,
    message: `Perencanaan menu untuk tanggal pelaksanaan ${execDate} berhasil disimpan!`,
    data: {
      ...planPayload,
      items: processedItems
    }
  });
});
router15.post("/", (req, res) => {
  const {
    tanggalPerencanaan,
    tanggalPelaksanaan,
    menuId,
    menuName,
    targetGroup,
    targetCount,
    periode,
    keterangan,
    nutritionistId,
    nutritionistName,
    status,
    items
  } = req.body;
  if (!menuName || !targetGroup) {
    res.status(400).json({ success: false, message: "Nama menu dan kelompok sasaran wajib diisi" });
    return;
  }
  const todayStr = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
  const planDate = tanggalPerencanaan || todayStr;
  const execDate = tanggalPelaksanaan || todayStr;
  const finalTargetCount = Number(targetCount) || dbStore.getTargetCountForDateAndGroup(execDate, targetGroup);
  const planId = `PLAN-${execDate.replace(/-/g, "")}-${String(dbStore.nutritionPlans.length + 1).padStart(3, "0")}`;
  const processedItems = Array.isArray(items) ? items.map((it, idx) => computePlanItem(planId, menuName, targetGroup, finalTargetCount, it, idx)) : [];
  const totalCost = processedItems.reduce((acc, curr) => acc + curr.totalPrice, 0);
  const totalWeightKg = Number(processedItems.reduce((acc, curr) => acc + curr.requiredKg, 0).toFixed(2));
  const newPlan = {
    id: planId,
    tanggalPerencanaan: planDate,
    tanggalPelaksanaan: execDate,
    menuId: menuId || void 0,
    menuName,
    targetGroup,
    targetCount: finalTargetCount,
    periode: periode || "Harian",
    keterangan: keterangan || "",
    nutritionistId: nutritionistId || "USR-006",
    nutritionistName: nutritionistName || "Rina Wijaya, S.Gz., M.Gizi",
    status: status || "Draft",
    totalCost,
    totalWeightKg,
    createdAt: (/* @__PURE__ */ new Date()).toISOString(),
    updatedAt: (/* @__PURE__ */ new Date()).toISOString()
  };
  dbStore.nutritionPlans.unshift(newPlan);
  dbStore.nutritionPlanItems.push(...processedItems);
  dbStore.addLog(
    newPlan.nutritionistId,
    newPlan.nutritionistName,
    "Perencanaan Bahan",
    "Buat Perencanaan",
    `Membuat perencanaan bahan pangan: ${menuName} (${finalTargetCount} sasaran)`
  );
  dbStore.addNotification(
    "Tugas Divisi",
    "Perencanaan Bahan Pangan Baru",
    `Perencanaan bahan pangan "${menuName}" untuk ${finalTargetCount} sasaran telah dibuat.`,
    "info",
    "/perencanaan-bahan"
  );
  res.json({
    success: true,
    message: "Perencanaan kebutuhan bahan pangan berhasil disimpan",
    data: {
      ...newPlan,
      items: processedItems
    }
  });
});
router15.put("/:id", (req, res) => {
  const { id } = req.params;
  const idx = dbStore.nutritionPlans.findIndex((p) => p.id === id);
  if (idx === -1) {
    res.status(404).json({ success: false, message: "Perencanaan tidak ditemukan" });
    return;
  }
  const existing = dbStore.nutritionPlans[idx];
  if (existing.status === "Final" && !req.body.allowRevision) {
    res.status(403).json({
      success: false,
      message: `Perencanaan menu "${existing.menuName}" sudah berstatus FINAL & TERKUNCI. Buka kunci revisi terlebih dahulu untuk mengubah data.`
    });
    return;
  }
  const body = req.body;
  const targetGroup = body.targetGroup || existing.targetGroup;
  const execDate = body.tanggalPelaksanaan || existing.tanggalPelaksanaan;
  const targetCount = Number(body.targetCount) || dbStore.getTargetCountForDateAndGroup(execDate, targetGroup);
  const menuName = body.menuName || existing.menuName;
  let processedItems = [];
  if (Array.isArray(body.items)) {
    dbStore.nutritionPlanItems = dbStore.nutritionPlanItems.filter((i) => i.planId !== id);
    processedItems = body.items.map(
      (it, itemIdx) => computePlanItem(id, menuName, targetGroup, targetCount, it, itemIdx)
    );
    dbStore.nutritionPlanItems.push(...processedItems);
  } else {
    processedItems = dbStore.nutritionPlanItems.filter((i) => i.planId === id);
  }
  const totalCost = processedItems.reduce((acc, curr) => acc + curr.totalPrice, 0);
  const totalWeightKg = Number(processedItems.reduce((acc, curr) => acc + curr.requiredKg, 0).toFixed(2));
  dbStore.nutritionPlans[idx] = {
    ...existing,
    ...body,
    targetCount,
    totalCost,
    totalWeightKg,
    updatedAt: (/* @__PURE__ */ new Date()).toISOString()
  };
  dbStore.addLog(
    dbStore.nutritionPlans[idx].nutritionistId,
    dbStore.nutritionPlans[idx].nutritionistName,
    "Perencanaan Bahan",
    "Edit Perencanaan",
    `Memperbarui perencanaan: ${menuName}`
  );
  res.json({
    success: true,
    message: "Perencanaan berhasil diperbarui",
    data: {
      ...dbStore.nutritionPlans[idx],
      items: processedItems
    }
  });
});
router15.post("/:id/finalize", (req, res) => {
  const { id } = req.params;
  const idx = dbStore.nutritionPlans.findIndex((p) => p.id === id);
  if (idx === -1) {
    res.status(404).json({ success: false, message: "Perencanaan tidak ditemukan" });
    return;
  }
  const now = (/* @__PURE__ */ new Date()).toISOString();
  dbStore.nutritionPlans[idx].status = "Final";
  dbStore.nutritionPlans[idx].finalizedAt = now;
  dbStore.nutritionPlans[idx].finalizedBy = req.body.nutritionistName || dbStore.nutritionPlans[idx].nutritionistName;
  dbStore.nutritionPlans[idx].updatedAt = now;
  const execDate = dbStore.nutritionPlans[idx].tanggalPelaksanaan;
  if (execDate) {
    const rabPlan = dbStore.getOrCreateRABForDate(execDate);
    rabPlan.status = "Final";
    rabPlan.approvedAt = now;
    rabPlan.approvedBy = req.body.kepalaSppgName || "Sri Rohayu, S. Pd (Kepala SPPG)";
    rabPlan.updatedAt = now;
  }
  dbStore.addLog(
    dbStore.nutritionPlans[idx].nutritionistId,
    dbStore.nutritionPlans[idx].nutritionistName,
    "Perencanaan Bahan",
    "Finalisasi Perencanaan",
    `Finalisasi & Kunci perencanaan bahan: ${dbStore.nutritionPlans[idx].menuName}`
  );
  res.json({
    success: true,
    message: "Perencanaan berhasil difinalisasi dan dikunci",
    data: dbStore.nutritionPlans[idx]
  });
});
router15.post("/:id/unlock-revision", (req, res) => {
  const { id } = req.params;
  const { reason, revisedBy } = req.body;
  const idx = dbStore.nutritionPlans.findIndex((p) => p.id === id);
  if (idx === -1) {
    res.status(404).json({ success: false, message: "Perencanaan tidak ditemukan" });
    return;
  }
  const existing = dbStore.nutritionPlans[idx];
  const now = (/* @__PURE__ */ new Date()).toISOString();
  const revReason = reason && String(reason).trim() || "Perubahan dan penyesuaian bahan baku";
  const revUser = revisedBy || existing.nutritionistName || "Petugas Gizi / Logistik";
  const historyRecord = {
    version: (existing.revisionCount || 0) + 1,
    reason: revReason,
    revisedBy: revUser,
    revisedAt: now,
    snapshotMenuName: existing.menuName,
    snapshotTotalCost: existing.totalCost,
    snapshotTotalWeightKg: existing.totalWeightKg
  };
  const updatedHistory = Array.isArray(existing.revisionHistory) ? [...existing.revisionHistory, historyRecord] : [historyRecord];
  dbStore.nutritionPlans[idx] = {
    ...existing,
    status: "Revisi",
    revisionReason: revReason,
    revisionCount: (existing.revisionCount || 0) + 1,
    revisionRequestedAt: now,
    revisionRequestedBy: revUser,
    revisionHistory: updatedHistory,
    updatedAt: now
  };
  dbStore.addLog(
    existing.nutritionistId,
    revUser,
    "Perencanaan Bahan",
    "Buka Kunci Revisi Menu",
    `Membuka kunci status Final untuk revisi bahan menu "${existing.menuName}" (${existing.tanggalPelaksanaan}). Alasan: ${revReason}`
  );
  dbStore.addNotification(
    "Perencanaan Bahan",
    `Kunci Menu Dibuka: ${existing.tanggalPelaksanaan}`,
    `Menu "${existing.menuName}" untuk tanggal ${existing.tanggalPelaksanaan} telah dibuka untuk revisi bahan baku. Alasan: ${revReason}`,
    "warning",
    "/perencanaan-bahan"
  );
  res.json({
    success: true,
    message: `Kunci menu "${existing.menuName}" berhasil dibuka untuk revisi bahan baku.`,
    data: dbStore.nutritionPlans[idx]
  });
});
router15.post("/unlock-revision-by-date", (req, res) => {
  const { tanggalPelaksanaan, reason, revisedBy } = req.body;
  if (!tanggalPelaksanaan) {
    res.status(400).json({ success: false, message: "Tanggal pelaksanaan wajib disertakan" });
    return;
  }
  const idx = dbStore.nutritionPlans.findIndex((p) => p.tanggalPelaksanaan === tanggalPelaksanaan);
  if (idx === -1) {
    res.status(404).json({ success: false, message: `Perencanaan untuk tanggal ${tanggalPelaksanaan} tidak ditemukan` });
    return;
  }
  const existing = dbStore.nutritionPlans[idx];
  const now = (/* @__PURE__ */ new Date()).toISOString();
  const revReason = reason && String(reason).trim() || "Perubahan dan penyesuaian bahan baku";
  const revUser = revisedBy || existing.nutritionistName || "Petugas Gizi / Logistik";
  const historyRecord = {
    version: (existing.revisionCount || 0) + 1,
    reason: revReason,
    revisedBy: revUser,
    revisedAt: now,
    snapshotMenuName: existing.menuName,
    snapshotTotalCost: existing.totalCost,
    snapshotTotalWeightKg: existing.totalWeightKg
  };
  const updatedHistory = Array.isArray(existing.revisionHistory) ? [...existing.revisionHistory, historyRecord] : [historyRecord];
  dbStore.nutritionPlans[idx] = {
    ...existing,
    status: "Revisi",
    revisionReason: revReason,
    revisionCount: (existing.revisionCount || 0) + 1,
    revisionRequestedAt: now,
    revisionRequestedBy: revUser,
    revisionHistory: updatedHistory,
    updatedAt: now
  };
  const targetRabByDate = dbStore.rabPlans.find((r) => r.tanggalPelaksanaan === tanggalPelaksanaan);
  if (targetRabByDate) {
    targetRabByDate.status = "Draft";
    targetRabByDate.updatedAt = now;
  }
  dbStore.addLog(
    existing.nutritionistId,
    revUser,
    "Perencanaan Bahan",
    "Buka Kunci Revisi Menu",
    `Membuka kunci status Final untuk revisi bahan menu "${existing.menuName}" (${existing.tanggalPelaksanaan}). Alasan: ${revReason}`
  );
  dbStore.addNotification(
    "Perencanaan Bahan",
    `Kunci Menu Dibuka: ${existing.tanggalPelaksanaan}`,
    `Menu "${existing.menuName}" untuk tanggal ${existing.tanggalPelaksanaan} telah dibuka untuk revisi bahan baku. Alasan: ${revReason}`,
    "warning",
    "/perencanaan-bahan"
  );
  res.json({
    success: true,
    message: `Kunci menu "${existing.menuName}" untuk tanggal ${tanggalPelaksanaan} berhasil dibuka untuk revisi bahan baku.`,
    data: dbStore.nutritionPlans[idx]
  });
});
router15.post("/:id/duplicate", (req, res) => {
  const { id } = req.params;
  const { newTanggalPelaksanaan, newTargetGroup } = req.body;
  const original = dbStore.nutritionPlans.find((p) => p.id === id);
  if (!original) {
    res.status(404).json({ success: false, message: "Perencanaan asal tidak ditemukan" });
    return;
  }
  const targetDate = newTanggalPelaksanaan || original.tanggalPelaksanaan;
  const targetGroup = newTargetGroup || original.targetGroup;
  const targetCount = dbStore.getTargetCountForDateAndGroup(targetDate, targetGroup);
  const newPlanId = `PLAN-${targetDate.replace(/-/g, "")}-${String(dbStore.nutritionPlans.length + 1).padStart(3, "0")}`;
  const originalItems = dbStore.nutritionPlanItems.filter((i) => i.planId === id);
  const duplicatedItems = originalItems.map((it, idx) => computePlanItem(
    newPlanId,
    original.menuName,
    targetGroup,
    targetCount,
    { ...it, id: void 0 },
    idx
  ));
  const totalCost = duplicatedItems.reduce((acc, curr) => acc + curr.totalPrice, 0);
  const totalWeightKg = Number(duplicatedItems.reduce((acc, curr) => acc + curr.requiredKg, 0).toFixed(2));
  const newPlan = {
    ...original,
    id: newPlanId,
    tanggalPerencanaan: (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
    tanggalPelaksanaan: targetDate,
    targetGroup,
    targetCount,
    status: "Draft",
    totalCost,
    totalWeightKg,
    createdAt: (/* @__PURE__ */ new Date()).toISOString(),
    updatedAt: (/* @__PURE__ */ new Date()).toISOString(),
    finalizedAt: void 0,
    finalizedBy: void 0
  };
  dbStore.nutritionPlans.unshift(newPlan);
  dbStore.nutritionPlanItems.push(...duplicatedItems);
  dbStore.addLog("USR-SYSTEM", "Ahli Gizi", "Perencanaan Bahan", "Duplikasi Perencanaan", `Duplikasi perencanaan ke tanggal ${targetDate}`);
  res.json({
    success: true,
    message: "Perencanaan berhasil diduplikasi",
    data: {
      ...newPlan,
      items: duplicatedItems
    }
  });
});
router15.delete("/:id", (req, res) => {
  const { id } = req.params;
  const idx = dbStore.nutritionPlans.findIndex((p) => p.id === id);
  if (idx === -1) {
    res.status(404).json({ success: false, message: "Perencanaan tidak ditemukan" });
    return;
  }
  const removed = dbStore.nutritionPlans.splice(idx, 1)[0];
  dbStore.nutritionPlanItems = dbStore.nutritionPlanItems.filter((i) => i.planId !== id);
  syncDeleteDoc("nutritionPlans", id);
  dbStore.addLog("USR-SYSTEM", "Ahli Gizi", "Perencanaan Bahan", "Hapus Perencanaan", `Menghapus perencanaan: ${removed.menuName}`);
  res.json({
    success: true,
    message: `Perencanaan "${removed.menuName}" berhasil dihapus`
  });
});
router15.get("/rekap/aggregate", (req, res) => {
  const { tanggal } = req.query;
  let plans = dbStore.nutritionPlans;
  if (tanggal) {
    plans = plans.filter((p) => p.tanggalPelaksanaan === tanggal);
  }
  const planIds = plans.map((p) => p.id);
  const items = dbStore.nutritionPlanItems.filter((i) => planIds.includes(i.planId));
  const rekapMap = {};
  items.forEach((it) => {
    const ing = dbStore.masterBahanPangan.find((b) => b.id === it.ingredientId);
    const key = it.ingredientId || it.ingredientName;
    if (!rekapMap[key]) {
      rekapMap[key] = {
        ingredientId: it.ingredientId,
        ingredientName: it.ingredientName,
        category: ing?.kategori || "Bahan Pangan",
        unit: ing?.satuanPembelian || "kg",
        totalNetWeightGram: 0,
        totalGrossWeightGram: 0,
        totalRequiredKg: 0,
        pricePerKg: it.pricePerKg,
        totalPrice: 0,
        stockAvailable: it.stockAvailable,
        shortageKg: 0,
        status: "CUKUP",
        menusInvolved: []
      };
    }
    rekapMap[key].totalNetWeightGram += it.netWeightGram * it.targetCount;
    rekapMap[key].totalGrossWeightGram += it.grossWeightGram * it.targetCount;
    rekapMap[key].totalRequiredKg += it.requiredKg;
    rekapMap[key].totalPrice += it.totalPrice;
    if (!rekapMap[key].menusInvolved.includes(it.menuName)) {
      rekapMap[key].menusInvolved.push(it.menuName);
    }
  });
  const rekapList = Object.values(rekapMap).map((rk) => {
    const totalReqKg = Number(rk.totalRequiredKg.toFixed(2));
    const bufferKg = Number((totalReqKg * 0.05).toFixed(2));
    const totalWithBufferKg = Number((totalReqKg + bufferKg).toFixed(2));
    rk.totalRequiredKg = totalReqKg;
    rk.bufferPercent = 5;
    rk.bufferKg = bufferKg;
    rk.totalWithBufferKg = totalWithBufferKg;
    rk.satuanBeli = rk.unit || "Kg";
    if (rk.unit === "pcs" || rk.unit === "renteng" || rk.unit === "ikat") {
      rk.pembulatan = Math.ceil(totalWithBufferKg);
    } else {
      rk.pembulatan = Math.round(totalWithBufferKg);
    }
    rk.shortageKg = Number(Math.max(0, totalWithBufferKg - rk.stockAvailable).toFixed(2));
    if (rk.pricePerKg <= 0) {
      rk.status = "HARGA BELUM ADA";
    } else if (rk.shortageKg > 0) {
      rk.status = "PERLU PENGADAAN";
    } else {
      rk.status = "CUKUP";
    }
    return rk;
  });
  const totalRekapCost = rekapList.reduce((acc, curr) => acc + curr.totalPrice, 0);
  const totalRekapKg = Number(rekapList.reduce((acc, curr) => acc + curr.totalRequiredKg, 0).toFixed(2));
  res.json({
    success: true,
    tanggal: tanggal || "Semua Periode",
    totalIngredients: rekapList.length,
    totalRekapCost,
    totalRekapKg,
    data: rekapList
  });
});
router15.get("/rab/sync-context", (req, res) => {
  const todayStr = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
  const tanggal = req.query.tanggal || todayStr;
  const hasPlan = dbStore.nutritionPlans.some((p) => p.tanggalPelaksanaan === tanggal);
  const hasSavedRab = dbStore.rabPlans.some(
    (r) => r.tanggalPelaksanaan === tanggal && (r.itemsBahanBaku && r.itemsBahanBaku.length > 0 || r.biayaOperasionalItems && r.biayaOperasionalItems.length > 0)
  );
  const rabPlan = dbStore.getOrCreateRABForDate(tanggal);
  res.json({
    success: true,
    hasPlanningActivity: hasPlan || hasSavedRab,
    data: rabPlan,
    message: `RAB tersinkronisasi untuk tanggal ${tanggal}`
  });
});
router15.post("/rab/calculate", (req, res) => {
  const { tanggal, targetCounts, tarifConfig, komposisiConfig, itemsBahanBaku, biayaOperasionalItems, biayaKemasanDistribusiItems, cadanganTakTerduga, namaMenu } = req.body;
  const targetDate = tanggal || (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
  const calculated = dbStore.calculateRABPlan(targetDate, {
    namaMenu,
    targetCounts,
    tarifConfig,
    komposisiConfig,
    itemsBahanBaku,
    biayaOperasionalItems,
    biayaKemasanDistribusiItems,
    cadanganTakTerduga
  });
  res.json({
    success: true,
    data: calculated
  });
});
router15.get("/rab/global-tarif", (req, res) => {
  res.json({
    success: true,
    data: dbStore.globalTarifConfig
  });
});
router15.post("/rab/global-tarif", async (req, res) => {
  try {
    const updated = dbStore.saveGlobalTarifConfig(req.body);
    await syncSaveDoc("configs", "globalTarifConfig", updated);
    dbStore.addLog("USR-SYSTEM", req.body.adminName || "Admin SPPG", "Perencanaan Anggaran", "Update Tarif Global", `Mengubah tarif dasar pagu global: Porsi Kecil Rp ${updated.porsiKecil}, Porsi Besar Rp ${updated.porsiBesar}, Balita Rp ${updated.balita}, Bumil/Busui Rp ${updated.bumilBusui}`);
    res.json({
      success: true,
      message: "Pengaturan Tarif & Pagu berhasil disimpan permanen. Seluruh perencanaan menu otomatis mengikuti tarif ini!",
      data: updated
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Gagal menyimpan pengaturan tarif global", error: error.message });
  }
});
router15.post("/rab/save", (req, res) => {
  const rabData = req.body;
  if (!rabData.tanggalPelaksanaan) {
    res.status(400).json({ success: false, message: "Tanggal pelaksanaan wajib diisi" });
    return;
  }
  const existingIdx = dbStore.rabPlans.findIndex((r) => r.tanggalPelaksanaan === rabData.tanggalPelaksanaan || r.id === rabData.id);
  if (existingIdx >= 0) {
    const existing = dbStore.rabPlans[existingIdx];
    if ((existing.status === "Final" || existing.status === "Disetujui") && !req.body.allowRevision) {
      res.status(403).json({
        success: false,
        message: "RAB dan Biaya Operasional sudah berstatus FINAL & TERKUNCI. Buka kunci terlebih dahulu untuk melakukan perubahan."
      });
      return;
    }
  }
  const calculated = dbStore.calculateRABPlan(rabData.tanggalPelaksanaan, rabData);
  if (existingIdx >= 0) {
    dbStore.rabPlans[existingIdx] = calculated;
  } else {
    dbStore.rabPlans.push(calculated);
  }
  syncSaveDoc("rabPlans", calculated.id, calculated);
  dbStore.addLog("USR-SYSTEM", "Ahli Gizi & Bendahara", "Perencanaan Anggaran", "Simpan RAB", `Menyimpan RAB ${calculated.id} (${calculated.namaMenu}) - Total Rp ${calculated.grandTotalRAB.toLocaleString("id-ID")}`);
  res.json({
    success: true,
    data: calculated,
    message: "Rencana Anggaran Belanja (RAB) berhasil disimpan"
  });
});
router15.post("/rab/status", (req, res) => {
  const { id, tanggal, status, approverName } = req.body;
  const targetRAB = dbStore.rabPlans.find((r) => r.id === id || r.tanggalPelaksanaan === tanggal);
  if (!targetRAB) {
    res.status(404).json({ success: false, message: "Data RAB tidak ditemukan" });
    return;
  }
  targetRAB.status = status || "Disetujui";
  const now = (/* @__PURE__ */ new Date()).toISOString();
  let menuPlan = null;
  if (status === "Disetujui" || status === "Final") {
    targetRAB.approvedAt = now;
    targetRAB.approvedBy = approverName || "Sri Rohayu, S. Pd (Kepala SPPG)";
    menuPlan = dbStore.nutritionPlans.find((p) => p.tanggalPelaksanaan === targetRAB.tanggalPelaksanaan);
    if (menuPlan) {
      menuPlan.status = "Final";
      menuPlan.finalizedAt = now;
      menuPlan.finalizedBy = approverName || "Sri Rohayu, S. Pd (Kepala SPPG)";
      menuPlan.updatedAt = now;
      syncSaveDoc("nutritionPlans", menuPlan.id, menuPlan);
    }
  } else if (status === "Revisi" || status === "Draft") {
    menuPlan = dbStore.nutritionPlans.find((p) => p.tanggalPelaksanaan === targetRAB.tanggalPelaksanaan);
    if (menuPlan) {
      menuPlan.status = status;
      menuPlan.updatedAt = now;
      syncSaveDoc("nutritionPlans", menuPlan.id, menuPlan);
    }
  }
  targetRAB.updatedAt = now;
  syncSaveDoc("rabPlans", targetRAB.id, targetRAB);
  dbStore.addLog("USR-SYSTEM", "Kepala SPPG", "Perencanaan Anggaran", "Persetujuan RAB", `Mengubah status RAB ${targetRAB.id} & Perencanaan Menu menjadi ${status}`);
  res.json({
    success: true,
    data: targetRAB,
    message: `Status RAB berhasil diperbarui menjadi ${status}`
  });
});
router15.get("/rab/list", (req, res) => {
  res.json({
    success: true,
    data: dbStore.rabPlans
  });
});
router15.get("/po/list", (req, res) => {
  res.json({
    success: true,
    data: dbStore.getAllPO()
  });
});
router15.post("/po/aggregate", (req, res) => {
  const { startDate, dates, rabBahanBaku, rabOpBarang, operasionalLainnya } = req.body;
  const result = dbStore.aggregatePeriodPO(startDate || (/* @__PURE__ */ new Date()).toISOString().split("T")[0], dates, {
    rabBahanBaku,
    rabOpBarang,
    operasionalLainnya
  });
  res.json({
    success: true,
    data: result
  });
});
router15.post("/po/save", (req, res) => {
  const poDoc = dbStore.savePO(req.body);
  syncSaveDoc("purchaseOrders", poDoc.id, poDoc);
  dbStore.addLog("USR-SYSTEM", req.body.pemesan || "Admin SPPG", "Purchase Order", "Simpan PO", `Menyimpan Purchase Order ${poDoc.poNumber} (${poDoc.poType})`);
  res.json({
    success: true,
    data: poDoc,
    message: `Purchase Order ${poDoc.poNumber} berhasil disimpan!`
  });
});
router15.post("/po/save-batch", (req, res) => {
  const batch = req.body.batch || [];
  const saved = dbStore.savePOBatch(batch);
  syncSaveBatch("purchaseOrders", saved);
  dbStore.addLog("USR-SYSTEM", "Admin SPPG", "Purchase Order", "Simpan Paket PO 5-Hari", `Menyimpan ${saved.length} Dokumen PO Harian Paket Periode`);
  res.json({
    success: true,
    data: saved,
    message: `Berhasil menerbitkan ${saved.length} Dokumen PO Harian Paket Periode 5 Hari!`
  });
});
router15.post("/po/confirm-admin", (req, res) => {
  const { poId, confirmedBy, notes } = req.body;
  if (!poId) {
    res.status(400).json({ success: false, message: "poId wajib dikirim" });
    return;
  }
  const updated = dbStore.confirmPOByAdmin(poId, confirmedBy, notes);
  if (updated) {
    syncSaveDoc("purchaseOrders", updated.id, updated);
    dbStore.addLog("USR-ADMIN", confirmedBy || "Sri Rohayu, S. Pd", "Purchase Order", "Konfirmasi Admin", `Admin mengonfirmasi PO ${updated.poNumber} dan merilis ke Portal Supplier`);
    res.json({
      success: true,
      data: updated,
      message: `PO ${updated.poNumber} berhasil dikonfirmasi oleh Admin dan kini tampil di Status Pemesanan Portal Supplier!`
    });
  } else {
    res.status(404).json({
      success: false,
      message: `Dokumen PO ${poId} tidak ditemukan`
    });
  }
});
router15.post("/po/confirm-admin-batch", (req, res) => {
  const { poIds, confirmedBy, notes } = req.body;
  if (!Array.isArray(poIds) || poIds.length === 0) {
    res.status(400).json({ success: false, message: "poIds (array) wajib dikirim" });
    return;
  }
  const confirmed = dbStore.confirmPOBatchByAdmin(poIds, confirmedBy, notes);
  syncSaveBatch("purchaseOrders", confirmed);
  dbStore.addLog("USR-ADMIN", confirmedBy || "Sri Rohayu, S. Pd", "Purchase Order", "Konfirmasi Admin Batch", `Admin mengonfirmasi ${confirmed.length} Dokumen PO dan merilis ke Portal Supplier`);
  res.json({
    success: true,
    data: confirmed,
    message: `Berhasil mengonfirmasi ${confirmed.length} PO! Dokumen kini aktif dan muncul di Status Pemesanan Supplier.`
  });
});
router15.get("/po/supplier-list", (req, res) => {
  const list = dbStore.getSupplierPortalPOs();
  res.json({
    success: true,
    data: list
  });
});
router15.post("/po/supplier-progress", (req, res) => {
  const { poId, status, supplierData } = req.body;
  if (!poId || !status) {
    res.status(400).json({ success: false, message: "poId dan status wajib dikirim" });
    return;
  }
  const updated = dbStore.updatePOSupplierShoppingProgress(poId, status, supplierData);
  if (updated) {
    syncSaveDoc("purchaseOrders", updated.id, updated);
    dbStore.addLog("USR-SUPPLIER", supplierData?.acceptedBy || "Mitra Supplier SPPG", "Portal Supplier", `Update Status PO: ${status}`, `Status PO ${updated.poNumber} diperbarui menjadi ${status}`);
    res.json({
      success: true,
      data: updated,
      message: `Status pesanan ${updated.poNumber} berhasil diperbarui menjadi '${status}'!`
    });
  } else {
    res.status(404).json({
      success: false,
      message: `Dokumen PO ${poId} tidak ditemukan`
    });
  }
});
router15.post("/po/supplier-progress-batch", (req, res) => {
  const { poIds, status, supplierData } = req.body;
  if (!Array.isArray(poIds) || poIds.length === 0 || !status) {
    res.status(400).json({ success: false, message: "poIds (array) dan status wajib dikirim" });
    return;
  }
  const updatedList = [];
  poIds.forEach((id) => {
    const updated = dbStore.updatePOSupplierShoppingProgress(id, status, supplierData);
    if (updated) updatedList.push(updated);
  });
  syncSaveBatch("purchaseOrders", updatedList);
  dbStore.addLog(
    "USR-SUPPLIER",
    supplierData?.acceptedBy || "Mitra Supplier SPPG",
    "Portal Supplier",
    `Update Status Batch PO: ${status}`,
    `Status ${updatedList.length} PO diperbarui menjadi ${status}`
  );
  res.json({
    success: true,
    data: updatedList,
    message: `Status ${updatedList.length} pesanan berhasil diperbarui menjadi '${status}'!`
  });
});
router15.post("/po/confirm-supplier", (req, res) => {
  const { poId, confirmedBy, notes } = req.body;
  const updated = dbStore.confirmPOBySupplier(poId, confirmedBy, notes);
  if (updated) {
    syncSaveDoc("purchaseOrders", updated.id, updated);
    dbStore.addLog("USR-SYSTEM", confirmedBy || "Koperasi Zantara", "Purchase Order", "Konfirmasi Supplier", `Konfirmasi PO Online ${poId}`);
    res.json({
      success: true,
      data: updated,
      message: `Status PO ${poId} berhasil dikonfirmasi & disetujui oleh Supplier!`
    });
  } else {
    res.status(404).json({
      success: false,
      message: `Dokumen PO ${poId} tidak ditemukan`
    });
  }
});
router15.delete("/po/:id", (req, res) => {
  const { id } = req.params;
  const deleted = dbStore.deletePO(id);
  if (deleted) {
    syncDeleteDoc("purchaseOrders", id);
  }
  res.json({
    success: deleted,
    message: deleted ? "Purchase Order berhasil dihapus" : "Purchase Order tidak ditemukan"
  });
});
var nutritionPlans_default = router15;

// server/routes/barangDatang.ts
var import_express16 = require("express");
var router16 = (0, import_express16.Router)();
function getIndonesianDay(dateStr) {
  try {
    const d = new Date(dateStr);
    const days = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
    return days[d.getDay()] || "Senin";
  } catch {
    return "Senin";
  }
}
function formatIndonesianDate(dateStr) {
  try {
    const d = new Date(dateStr);
    const months = [
      "Januari",
      "Februari",
      "Maret",
      "April",
      "Mei",
      "Juni",
      "Juli",
      "Agustus",
      "September",
      "Oktober",
      "November",
      "Desember"
    ];
    const dayName = getIndonesianDay(dateStr);
    const dateNum = String(d.getDate()).padStart(2, "0");
    const monthName = months[d.getMonth()];
    const year = d.getFullYear();
    return `${dayName}, ${dateNum} ${monthName} ${year}`;
  } catch {
    return dateStr;
  }
}
router16.get("/", (req, res) => {
  const { tanggal, startDate, endDate, jenisBarang, kualitasProduk, search } = req.query;
  let results = [...dbStore.barangDatang];
  if (tanggal && typeof tanggal === "string" && tanggal.trim() !== "") {
    results = results.filter((b) => b.tanggal === tanggal.trim());
  }
  if (startDate && typeof startDate === "string" && startDate.trim() !== "") {
    results = results.filter((b) => b.tanggal >= startDate.trim());
  }
  if (endDate && typeof endDate === "string" && endDate.trim() !== "") {
    results = results.filter((b) => b.tanggal <= endDate.trim());
  }
  if (jenisBarang && typeof jenisBarang === "string" && jenisBarang !== "Semua" && jenisBarang.trim() !== "") {
    results = results.filter((b) => b.jenisBarang === jenisBarang.trim());
  }
  if (kualitasProduk && typeof kualitasProduk === "string" && kualitasProduk !== "Semua" && kualitasProduk.trim() !== "") {
    results = results.filter((b) => (b.kualitasProduk || "Baik") === kualitasProduk.trim());
  }
  if (search && typeof search === "string" && search.trim() !== "") {
    const q = search.toLowerCase().trim();
    results = results.filter(
      (b) => b.namaBarang?.toLowerCase().includes(q) || b.satuan?.toLowerCase().includes(q) || b.petugas?.toLowerCase().includes(q) || b.keterangan?.toLowerCase().includes(q) || (b.kualitasProduk || "Baik").toLowerCase().includes(q)
    );
  }
  results.sort((a, b) => {
    if (a.tanggal !== b.tanggal) {
      return b.tanggal.localeCompare(a.tanggal);
    }
    return (b.createdAt || "").localeCompare(a.createdAt || "");
  });
  res.json({
    success: true,
    count: results.length,
    totalBahanBaku: results.filter((b) => b.jenisBarang === "Bahan Baku").length,
    totalOperasional: results.filter((b) => b.jenisBarang === "Operasional").length,
    data: results
  });
});
router16.get("/:id", (req, res) => {
  const item = dbStore.barangDatang.find((b) => b.id === req.params.id);
  if (!item) {
    res.status(404).json({ success: false, message: "Data kedatangan barang tidak ditemukan" });
    return;
  }
  res.json({ success: true, data: item });
});
router16.post("/", async (req, res) => {
  try {
    const {
      hari,
      tanggal,
      hariTanggalFormatted,
      namaBarang,
      jumlahMasuk,
      satuan,
      jenisBarang,
      kualitasProduk,
      dokumentasiUrl,
      keterangan,
      petugas
    } = req.body;
    if (!namaBarang || namaBarang.trim() === "") {
      res.status(400).json({ success: false, message: "Nama Barang wajib diisi" });
      return;
    }
    if (jumlahMasuk === void 0 || jumlahMasuk === null || isNaN(Number(jumlahMasuk)) || Number(jumlahMasuk) <= 0) {
      res.status(400).json({ success: false, message: "Jumlah Masuk harus berupa angka lebih dari 0" });
      return;
    }
    if (!satuan || satuan.trim() === "") {
      res.status(400).json({ success: false, message: "Satuan barang wajib diisi" });
      return;
    }
    if (!jenisBarang || jenisBarang !== "Bahan Baku" && jenisBarang !== "Operasional") {
      res.status(400).json({ success: false, message: 'Jenis Barang harus "Bahan Baku" atau "Operasional"' });
      return;
    }
    const validKualitas = kualitasProduk === "Baik" || kualitasProduk === "Lumayan" || kualitasProduk === "Jelek" ? kualitasProduk : "Baik";
    const todayStr = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
    const finalTanggal = tanggal && tanggal.trim() !== "" ? tanggal.trim() : todayStr;
    const finalHari = hari && hari.trim() !== "" ? hari.trim() : getIndonesianDay(finalTanggal);
    const finalHariTanggalFormatted = hariTanggalFormatted || formatIndonesianDate(finalTanggal);
    const newItem = dbStore.addBarangDatang({
      hari: finalHari,
      tanggal: finalTanggal,
      hariTanggalFormatted: finalHariTanggalFormatted,
      namaBarang: namaBarang.trim(),
      jumlahMasuk: Number(jumlahMasuk),
      satuan: satuan.trim(),
      jenisBarang,
      kualitasProduk: validKualitas,
      dokumentasiUrl: dokumentasiUrl || "",
      keterangan: keterangan?.trim() || "",
      petugas: petugas?.trim() || "Petugas Logistik",
      createdBy: petugas?.trim() || "Petugas Logistik"
    });
    const firestoreData = { ...newItem };
    if (firestoreData.dokumentasiUrl && firestoreData.dokumentasiUrl.length > 5e5) {
      firestoreData.dokumentasiUrl = firestoreData.dokumentasiUrl.slice(0, 5e5);
    }
    syncSaveDoc("barangDatang", newItem.id, firestoreData, {
      name: newItem.petugas,
      userId: "API-USER"
    }).catch((err) => console.warn("Background sync to Firestore warning:", err?.message || err));
    dbStore.addLog(
      "SYSTEM",
      newItem.petugas || "Petugas Logistik",
      "Kedatangan Barang",
      "Input Barang Datang",
      `Mencatat kedatangan ${newItem.jenisBarang}: ${newItem.namaBarang} (${newItem.jumlahMasuk} ${newItem.satuan}, Kualitas: ${newItem.kualitasProduk}) pada ${newItem.hariTanggalFormatted}`
    );
    dbStore.addNotification(
      "Stock Opname",
      `Barang Datang: ${newItem.namaBarang}`,
      `Penerimaan ${newItem.jumlahMasuk} ${newItem.satuan} (${newItem.jenisBarang} - Kualitas: ${newItem.kualitasProduk}) berhasil dicatat.`,
      "success",
      "/barang-datang/data"
    );
    res.status(201).json({
      success: true,
      message: "Data kedatangan barang berhasil disimpan",
      data: newItem
    });
  } catch (err) {
    console.error("Error in POST /api/v1/barang-datang:", err);
    res.status(500).json({ success: false, message: err?.message || "Gagal menyimpan data kedatangan barang" });
  }
});
router16.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;
    if (updates.tanggal && !updates.hari) {
      updates.hari = getIndonesianDay(updates.tanggal);
      updates.hariTanggalFormatted = formatIndonesianDate(updates.tanggal);
    }
    const updated = dbStore.updateBarangDatang(id, updates);
    if (!updated) {
      res.status(404).json({ success: false, message: "Data kedatangan barang tidak ditemukan" });
      return;
    }
    const firestoreData = { ...updated };
    if (firestoreData.dokumentasiUrl && firestoreData.dokumentasiUrl.length > 5e5) {
      firestoreData.dokumentasiUrl = firestoreData.dokumentasiUrl.slice(0, 5e5);
    }
    syncSaveDoc("barangDatang", id, firestoreData, {
      name: updated.petugas || "Petugas Logistik",
      userId: "API-USER"
    }).catch((err) => console.warn("Background update sync to Firestore warning:", err?.message || err));
    res.json({
      success: true,
      message: "Data kedatangan barang berhasil diperbarui",
      data: updated
    });
  } catch (err) {
    console.error("Error in PUT /api/v1/barang-datang/:id:", err);
    res.status(500).json({ success: false, message: err?.message || "Gagal memperbarui data" });
  }
});
router16.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = dbStore.deleteBarangDatang(id);
    if (!deleted) {
      res.status(404).json({ success: false, message: "Data kedatangan barang tidak ditemukan" });
      return;
    }
    syncDeleteDoc("barangDatang", id).catch(
      (err) => console.warn("Background delete from Firestore warning:", err?.message || err)
    );
    res.json({
      success: true,
      message: "Data kedatangan barang berhasil dihapus"
    });
  } catch (err) {
    console.error("Error in DELETE /api/v1/barang-datang/:id:", err);
    res.status(500).json({ success: false, message: err?.message || "Gagal menghapus data" });
  }
});
var barangDatang_default = router16;

// server/routes/menuHarian.ts
var import_express17 = require("express");
var router17 = (0, import_express17.Router)();
var NAMA_HARI = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
var NAMA_BULAN = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember"
];
function formatIndonesianDate2(dateStr) {
  try {
    const parts = dateStr.split("-");
    const d = parts.length === 3 ? new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2])) : new Date(dateStr);
    const hari = NAMA_HARI[d.getDay()] || "Senin";
    const dateNum = String(d.getDate()).padStart(2, "0");
    const monthName = NAMA_BULAN[d.getMonth()] || "Januari";
    const year = d.getFullYear();
    return {
      hari,
      formatted: `${hari}, ${dateNum} ${monthName} ${year}`
    };
  } catch {
    return { hari: "Senin", formatted: dateStr };
  }
}
router17.get("/", (req, res) => {
  const { tanggal, startDate, endDate, search } = req.query;
  let results = [...dbStore.menuHarian];
  if (tanggal && typeof tanggal === "string" && tanggal.trim() !== "") {
    results = results.filter((m) => m.tanggalOperasional === tanggal.trim());
  }
  if (startDate && typeof startDate === "string" && startDate.trim() !== "") {
    results = results.filter((m) => m.tanggalOperasional >= startDate.trim());
  }
  if (endDate && typeof endDate === "string" && endDate.trim() !== "") {
    results = results.filter((m) => m.tanggalOperasional <= endDate.trim());
  }
  if (search && typeof search === "string" && search.trim() !== "") {
    const q = search.toLowerCase().trim();
    results = results.filter(
      (m) => m.namaMenu?.toLowerCase().includes(q) || m.kategoriPorsi?.toLowerCase().includes(q) || m.catatanGizi?.toLowerCase().includes(q) || m.hariTanggalFormatted?.toLowerCase().includes(q) || m.petugas?.toLowerCase().includes(q)
    );
  }
  results.sort((a, b) => {
    if (a.tanggalOperasional !== b.tanggalOperasional) {
      return b.tanggalOperasional.localeCompare(a.tanggalOperasional);
    }
    return (b.createdAt || "").localeCompare(a.createdAt || "");
  });
  res.json({
    success: true,
    count: results.length,
    data: results
  });
});
router17.get("/:id", (req, res) => {
  const item = dbStore.menuHarian.find((m) => m.id === req.params.id);
  if (!item) {
    res.status(404).json({ success: false, message: "Data menu harian tidak ditemukan" });
    return;
  }
  res.json({ success: true, data: item });
});
router17.post("/", async (req, res) => {
  try {
    const {
      tanggalOperasional,
      namaMenu,
      kategoriPorsi,
      energiKkal,
      proteinGram,
      lemakGram,
      karbohidratGram,
      seratGram,
      giziPorsiBesar,
      giziPorsiKecil,
      rincianKomponen,
      catatanGizi,
      fotoMenuUrl,
      fotoFileName,
      fotoFileSizeKb,
      petugas
    } = req.body;
    if (!namaMenu || String(namaMenu).trim() === "") {
      res.status(400).json({ success: false, message: "Nama Menu wajib diisi" });
      return;
    }
    const todayStr = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
    const finalTanggal = tanggalOperasional && String(tanggalOperasional).trim() !== "" ? String(tanggalOperasional).trim() : todayStr;
    const { hari, formatted } = formatIndonesianDate2(finalTanggal);
    const parsedBesar = {
      energiKkal: Number(giziPorsiBesar?.energiKkal ?? energiKkal) || 0,
      proteinGram: Number(giziPorsiBesar?.proteinGram ?? proteinGram) || 0,
      lemakGram: Number(giziPorsiBesar?.lemakGram ?? lemakGram) || 0,
      karbohidratGram: Number(giziPorsiBesar?.karbohidratGram ?? karbohidratGram) || 0,
      seratGram: Number(giziPorsiBesar?.seratGram ?? seratGram) || 0,
      keterangan: giziPorsiBesar?.keterangan ? String(giziPorsiBesar.keterangan).trim() : ""
    };
    const parsedKecil = {
      energiKecil: Number(giziPorsiKecil?.energiKkal) || 0,
      energiKkal: Number(giziPorsiKecil?.energiKkal) || 0,
      proteinGram: Number(giziPorsiKecil?.proteinGram) || 0,
      lemakGram: Number(giziPorsiKecil?.lemakGram) || 0,
      karbohidratGram: Number(giziPorsiKecil?.karbohidratGram) || 0,
      seratGram: Number(giziPorsiKecil?.seratGram) || 0,
      keterangan: giziPorsiKecil?.keterangan ? String(giziPorsiKecil.keterangan).trim() : ""
    };
    const newItem = dbStore.addMenuHarian({
      tanggalOperasional: finalTanggal,
      hari,
      hariTanggalFormatted: formatted,
      namaMenu: String(namaMenu).trim(),
      kategoriPorsi: kategoriPorsi ? String(kategoriPorsi).trim() : "Porsi Besar & Porsi Kecil",
      energiKkal: parsedBesar.energiKkal,
      proteinGram: parsedBesar.proteinGram,
      lemakGram: parsedBesar.lemakGram,
      karbohidratGram: parsedBesar.karbohidratGram,
      seratGram: parsedBesar.seratGram,
      giziPorsiBesar: parsedBesar,
      giziPorsiKecil: {
        energiKkal: parsedKecil.energiKkal,
        proteinGram: parsedKecil.proteinGram,
        lemakGram: parsedKecil.lemakGram,
        karbohidratGram: parsedKecil.karbohidratGram,
        seratGram: parsedKecil.seratGram,
        keterangan: parsedKecil.keterangan
      },
      rincianKomponen: rincianKomponen || {},
      catatanGizi: catatanGizi ? String(catatanGizi).trim() : "",
      fotoMenuUrl: fotoMenuUrl || "",
      fotoFileName: fotoFileName || "",
      fotoFileSizeKb: Number(fotoFileSizeKb) || 0,
      petugas: petugas?.trim() || "Ahli Gizi SPPG",
      createdBy: petugas?.trim() || "Ahli Gizi SPPG"
    });
    await syncSaveDoc("menuHarian", newItem.id, newItem, {
      name: newItem.petugas,
      userId: "API-USER"
    });
    dbStore.addLog(
      "SYSTEM",
      newItem.petugas || "Ahli Gizi SPPG",
      "Menu Harian",
      "Input Form Menu Harian",
      `Menyimpan Menu Harian (${newItem.hariTanggalFormatted}): ${newItem.namaMenu} \u2014 Porsi Besar: ${parsedBesar.energiKkal} kkal | Porsi Kecil: ${parsedKecil.energiKkal} kkal`
    );
    dbStore.addNotification(
      "Menu Harian",
      `Menu Harian: ${newItem.hariTanggalFormatted}`,
      `${newItem.namaMenu} (Porsi Besar: ${parsedBesar.energiKkal} kkal | Porsi Kecil: ${parsedKecil.energiKkal} kkal) berhasil disimpan.`,
      "success",
      "/menu-harian/form"
    );
    res.status(201).json({
      success: true,
      message: "Data Menu Harian berhasil disimpan",
      data: newItem
    });
  } catch (err) {
    console.error("Error in POST /api/v1/menu-harian:", err);
    res.status(500).json({ success: false, message: err?.message || "Gagal menyimpan data menu harian" });
  }
});
router17.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updates = { ...req.body };
    if (updates.tanggalOperasional) {
      const { hari, formatted } = formatIndonesianDate2(updates.tanggalOperasional);
      updates.hari = hari;
      updates.hariTanggalFormatted = formatted;
    }
    const updated = dbStore.updateMenuHarian(id, updates);
    if (!updated) {
      res.status(404).json({ success: false, message: "Data menu harian tidak ditemukan" });
      return;
    }
    await syncSaveDoc("menuHarian", id, updated, {
      name: updated.petugas || "Ahli Gizi SPPG",
      userId: "API-USER"
    });
    res.json({
      success: true,
      message: "Data Menu Harian berhasil diperbarui",
      data: updated
    });
  } catch (err) {
    console.error("Error in PUT /api/v1/menu-harian/:id:", err);
    res.status(500).json({ success: false, message: err?.message || "Gagal memperbarui data menu harian" });
  }
});
router17.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = dbStore.deleteMenuHarian(id);
    if (!deleted) {
      res.status(404).json({ success: false, message: "Data menu harian tidak ditemukan" });
      return;
    }
    await syncDeleteDoc("menuHarian", id);
    res.json({
      success: true,
      message: "Data Menu Harian berhasil dihapus"
    });
  } catch (err) {
    console.error("Error in DELETE /api/v1/menu-harian/:id:", err);
    res.status(500).json({ success: false, message: err?.message || "Gagal menghapus data menu harian" });
  }
});
var menuHarian_default = router17;

// server/routes/documentTemplate.ts
var import_express18 = require("express");
var router18 = (0, import_express18.Router)();
router18.get("/", (req, res) => {
  if (!dbStore.documentTemplate) {
    dbStore.documentTemplate = JSON.parse(JSON.stringify(DEFAULT_MASTER_TEMPLATE_CONFIG));
  }
  res.json({
    success: true,
    data: dbStore.documentTemplate
  });
});
function getRomanMonth(monthIndex) {
  const romanMonths = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII"];
  return romanMonths[monthIndex] || String(monthIndex + 1);
}
router18.put("/", async (req, res) => {
  try {
    const payload = req.body;
    if (!payload) {
      res.status(400).json({ success: false, message: "Payload konfigurasi tidak valid" });
      return;
    }
    const current = dbStore.documentTemplate || JSON.parse(JSON.stringify(DEFAULT_MASTER_TEMPLATE_CONFIG));
    let currentVersion = current.version || "1.0.0";
    const parts = currentVersion.split(".").map((p) => parseInt(p, 10) || 0);
    if (parts.length === 3) {
      parts[2] = parts[2] + 1;
      currentVersion = parts.join(".");
    } else {
      currentVersion = "1.0.1";
    }
    const updated = {
      ...current,
      ...payload,
      version: payload.version || currentVersion,
      updatedAt: (/* @__PURE__ */ new Date()).toISOString(),
      updatedBy: req.headers["x-user-name"] || "Administrator SPPG",
      profile: { ...current.profile, ...payload.profile || {} },
      letterhead: { ...current.letterhead, ...payload.letterhead || {} },
      format: { ...current.format, ...payload.format || {} },
      footer: { ...current.footer, ...payload.footer || {} },
      numbering: { ...current.numbering, ...payload.numbering || {} },
      signatures: Array.isArray(payload.signatures) ? payload.signatures : current.signatures,
      documentTypes: Array.isArray(payload.documentTypes) ? payload.documentTypes : current.documentTypes
    };
    dbStore.documentTemplate = updated;
    dbStore.addLog(
      "ADMIN",
      req.headers["x-user-name"] || "Administrator",
      "Master Template Dokumen",
      "Update Master Template",
      `Memperbarui konfigurasi Master Template Dokumen (v${updated.version})`,
      req.ip
    );
    await syncSaveDoc("documentTemplate", "main", updated, {
      name: req.headers["x-user-name"] || "Admin Penuh"
    });
    res.json({
      success: true,
      message: `Master Template Dokumen berhasil disimpan (Versi ${updated.version})`,
      data: updated
    });
  } catch (err) {
    console.error("Error updating document template:", err);
    res.status(500).json({ success: false, message: "Gagal menyimpan template: " + (err?.message || err) });
  }
});
router18.post("/reset", async (req, res) => {
  try {
    const factoryReset = JSON.parse(JSON.stringify(DEFAULT_MASTER_TEMPLATE_CONFIG));
    factoryReset.updatedAt = (/* @__PURE__ */ new Date()).toISOString();
    factoryReset.updatedBy = req.headers["x-user-name"] || "System Admin (Factory Reset)";
    dbStore.documentTemplate = factoryReset;
    dbStore.addLog(
      "ADMIN",
      req.headers["x-user-name"] || "Administrator",
      "Master Template Dokumen",
      "Reset Template Default",
      "Mengembalikan konfigurasi Master Template Dokumen ke format default pabrik BGN SPPG",
      req.ip
    );
    await syncSaveDoc("documentTemplate", "main", factoryReset);
    res.json({
      success: true,
      message: "Master Template Dokumen berhasil di-reset ke pengaturan standar resmi BGN.",
      data: factoryReset
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Gagal mereset template: " + (err?.message || err) });
  }
});
router18.post("/generate-number", async (req, res) => {
  try {
    const { docCode = "STOK", category = "Logistik & Stok" } = req.body;
    const config = dbStore.documentTemplate || JSON.parse(JSON.stringify(DEFAULT_MASTER_TEMPLATE_CONFIG));
    const numbering = config.numbering;
    const currentCounter = (numbering.currentCounters[docCode] || 0) + 1;
    numbering.currentCounters[docCode] = currentCounter;
    const padLen = numbering.counterLength || 3;
    const counterStr = String(currentCounter).padStart(padLen, "0");
    const now = /* @__PURE__ */ new Date();
    const monthStr = numbering.monthFormat === "roman" ? getRomanMonth(now.getMonth()) : String(now.getMonth() + 1).padStart(2, "0");
    const yearStr = numbering.yearFormat === "YY" ? String(now.getFullYear()).slice(2) : String(now.getFullYear());
    const sep = numbering.separator || "/";
    const prefix = numbering.prefix || "SPPG-TMG";
    const generatedNumber = numbering.formatPattern.replace("{counter}", counterStr).replace("{prefix}", prefix).replace("{code}", docCode).replace("{month}", monthStr).replace("{year}", yearStr);
    dbStore.documentTemplate.numbering = numbering;
    syncSaveDoc("documentTemplate", "main", dbStore.documentTemplate).catch((err) => {
      console.error("\u26A0\uFE0F Error syncing documentTemplate counter to Firestore:", err);
    });
    res.json({
      success: true,
      data: {
        number: generatedNumber,
        counter: currentCounter,
        code: docCode,
        generatedAt: now.toISOString()
      }
    });
  } catch (err) {
    res.status(500).json({ success: false, message: "Gagal membuat nomor dokumen: " + (err?.message || err) });
  }
});
var documentTemplate_default = router18;

// server/routes/distribusi.ts
var import_express19 = require("express");
var router19 = (0, import_express19.Router)();
router19.get("/drivers", (req, res) => {
  res.json({ success: true, data: dbStore.drivers });
});
router19.post("/drivers", async (req, res) => {
  const { nama, telepon, noSim, kendaraan, platNomor, foto, status, catatan } = req.body;
  if (!nama) {
    res.status(400).json({ success: false, message: "Nama driver wajib diisi." });
    return;
  }
  const newDriver = {
    id: `DRV-${Date.now().toString().slice(-6)}`,
    nama,
    telepon: telepon || "-",
    noSim: noSim || "-",
    kendaraan: kendaraan || "Armada Box",
    platNomor: platNomor || "-",
    foto: foto || "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150",
    status: status || "Aktif",
    catatan: catatan || "",
    createdAt: (/* @__PURE__ */ new Date()).toISOString()
  };
  dbStore.drivers.unshift(newDriver);
  await syncSaveDoc("drivers", newDriver.id, newDriver);
  dbStore.addLog("ADMIN", "Operator Distribusi", "Laporan Distribusi", "Tambah Driver", `Menambahkan driver baru ${nama}`, req.ip);
  res.status(201).json({ success: true, message: "Driver berhasil ditambahkan", data: newDriver });
});
router19.put("/drivers/:id", async (req, res) => {
  const { id } = req.params;
  const index = dbStore.drivers.findIndex((d) => d.id === id);
  if (index === -1) {
    res.status(404).json({ success: false, message: "Driver tidak ditemukan." });
    return;
  }
  dbStore.drivers[index] = {
    ...dbStore.drivers[index],
    ...req.body
  };
  await syncSaveDoc("drivers", id, dbStore.drivers[index]);
  dbStore.addLog("ADMIN", "Operator Distribusi", "Laporan Distribusi", "Edit Driver", `Memperbarui data driver ${dbStore.drivers[index].nama}`, req.ip);
  res.json({ success: true, message: "Driver berhasil diperbarui", data: dbStore.drivers[index] });
});
router19.delete("/drivers/:id", async (req, res) => {
  const { id } = req.params;
  const index = dbStore.drivers.findIndex((d) => d.id === id);
  if (index === -1) {
    res.status(404).json({ success: false, message: "Driver tidak ditemukan." });
    return;
  }
  const deletedDriver = dbStore.drivers.splice(index, 1)[0];
  await syncDeleteDoc("drivers", id);
  dbStore.addLog("ADMIN", "Operator Distribusi", "Laporan Distribusi", "Hapus Driver", `Menghapus driver ${deletedDriver.nama}`, req.ip);
  res.json({ success: true, message: "Driver berhasil dihapus", data: deletedDriver });
});
router19.get("/reports", (req, res) => {
  const { tanggal, startDate, endDate, search } = req.query;
  let results = [...dbStore.distributionReports];
  if (tanggal && typeof tanggal === "string") {
    results = results.filter((r) => r.tanggal === tanggal);
  }
  if (startDate && typeof startDate === "string") {
    results = results.filter((r) => r.tanggal >= startDate);
  }
  if (endDate && typeof endDate === "string") {
    results = results.filter((r) => r.tanggal <= endDate);
  }
  if (search && typeof search === "string") {
    const q = search.toLowerCase();
    results = results.filter(
      (r) => r.namaInstansi.toLowerCase().includes(q) || r.driverNama.toLowerCase().includes(q) || r.catatan && r.catatan.toLowerCase().includes(q)
    );
  }
  results.sort((a, b) => new Date(b.createdAt || b.tanggal).getTime() - new Date(a.createdAt || a.tanggal).getTime());
  res.json({ success: true, data: results });
});
router19.post("/reports", async (req, res) => {
  const {
    tanggal,
    driverId,
    driverNama,
    driverFoto,
    driverKendaraan,
    instansiId,
    namaInstansi,
    jumlahPenerimaManfaat,
    jamPengiriman,
    jamPenjemputan,
    dokPengiriman,
    dokPenjemputan,
    catatan,
    status
  } = req.body;
  if (!tanggal || !driverNama || !namaInstansi) {
    res.status(400).json({ success: false, message: "Tanggal, Distributor, dan Nama Sekolah/Instansi wajib diisi." });
    return;
  }
  const newReport = {
    id: `DST-${tanggal.replace(/-/g, "")}-${String(dbStore.distributionReports.length + 1).padStart(3, "0")}`,
    tanggal,
    driverId: driverId || "DRV-GENERAL",
    driverNama,
    driverFoto: driverFoto || "",
    driverKendaraan: driverKendaraan || "",
    instansiId: instansiId || "",
    namaInstansi,
    jumlahPenerimaManfaat: Number(jumlahPenerimaManfaat) || 0,
    jamPengiriman: jamPengiriman || "08:00",
    jamPenjemputan: jamPenjemputan || "12:00",
    dokPengiriman: dokPengiriman || "",
    dokPenjemputan: dokPenjemputan || "",
    catatan: catatan || "",
    status: status || "Selesai",
    createdBy: driverNama || "Petugas Distribusi",
    createdAt: (/* @__PURE__ */ new Date()).toISOString()
  };
  dbStore.distributionReports.unshift(newReport);
  await syncSaveDoc("distributionReports", newReport.id, newReport);
  await syncSaveDoc("distribution_reports", newReport.id, newReport);
  dbStore.addLog("DISTRIBUSI", driverNama || "Petugas Distribusi", "Laporan Distribusi", "Tambah Laporan Distribusi", `Input laporan distribusi untuk ${namaInstansi}`, req.ip);
  res.status(201).json({ success: true, message: "Laporan distribusi berhasil disimpan", data: newReport });
});
router19.put("/reports/:id", async (req, res) => {
  const { id } = req.params;
  const index = dbStore.distributionReports.findIndex((r) => r.id === id);
  if (index === -1) {
    res.status(404).json({ success: false, message: "Laporan tidak ditemukan." });
    return;
  }
  dbStore.distributionReports[index] = {
    ...dbStore.distributionReports[index],
    ...req.body,
    updatedAt: (/* @__PURE__ */ new Date()).toISOString()
  };
  await syncSaveDoc("distributionReports", id, dbStore.distributionReports[index]);
  await syncSaveDoc("distribution_reports", id, dbStore.distributionReports[index]);
  dbStore.addLog("DISTRIBUSI", "Petugas Distribusi", "Laporan Distribusi", "Edit Laporan Distribusi", `Update laporan ID ${id}`, req.ip);
  res.json({ success: true, message: "Laporan distribusi berhasil diperbarui", data: dbStore.distributionReports[index] });
});
router19.delete("/reports/:id", async (req, res) => {
  const { id } = req.params;
  const index = dbStore.distributionReports.findIndex((r) => r.id === id);
  if (index === -1) {
    res.status(404).json({ success: false, message: "Laporan tidak ditemukan." });
    return;
  }
  const deletedReport = dbStore.distributionReports.splice(index, 1)[0];
  await syncDeleteDoc("distributionReports", id);
  await syncDeleteDoc("distribution_reports", id);
  dbStore.addLog("DISTRIBUSI", "Petugas Distribusi", "Laporan Distribusi", "Hapus Laporan Distribusi", `Menghapus laporan ${deletedReport.id}`, req.ip);
  res.json({ success: true, message: "Laporan distribusi berhasil dihapus", data: deletedReport });
});
var distribusi_default = router19;

// server/routes/foodWaste.ts
var import_express20 = require("express");
var router20 = (0, import_express20.Router)();
var NAMA_HARI2 = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
var NAMA_BULAN2 = [
  "Januari",
  "Februari",
  "Maret",
  "April",
  "Mei",
  "Juni",
  "Juli",
  "Agustus",
  "September",
  "Oktober",
  "November",
  "Desember"
];
function formatIndonesianDateUpper(dateStr) {
  try {
    const parts = dateStr.split("-");
    const d = parts.length === 3 ? new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2])) : new Date(dateStr);
    const hari = NAMA_HARI2[d.getDay()] || "Senin";
    const dateNum = String(d.getDate()).padStart(2, "0");
    const monthName = NAMA_BULAN2[d.getMonth()] || "Januari";
    const year = d.getFullYear();
    return `${hari.toUpperCase()}, ${dateNum} ${monthName.toUpperCase()} ${year}`;
  } catch {
    return dateStr;
  }
}
router20.get("/", (req, res) => {
  const { tanggal, startDate, endDate, search } = req.query;
  let results = [...dbStore.foodWasteRecords];
  if (tanggal && typeof tanggal === "string" && tanggal.trim() !== "") {
    results = results.filter((r) => r.tanggal === tanggal.trim());
  }
  if (startDate && typeof startDate === "string" && startDate.trim() !== "") {
    results = results.filter((r) => r.tanggal >= startDate.trim());
  }
  if (endDate && typeof endDate === "string" && endDate.trim() !== "") {
    results = results.filter((r) => r.tanggal <= endDate.trim());
  }
  if (search && typeof search === "string" && search.trim() !== "") {
    const q = search.toLowerCase().trim();
    results = results.filter(
      (r) => r.sppgName?.toLowerCase().includes(q) || r.hariTanggalFormatted?.toLowerCase().includes(q) || r.petugas?.toLowerCase().includes(q) || r.items?.some((it) => it.menu?.toLowerCase().includes(q))
    );
  }
  results.sort((a, b) => b.tanggal.localeCompare(a.tanggal));
  res.json({
    success: true,
    data: results,
    total: results.length
  });
});
router20.get("/context/:tanggal", (req, res) => {
  const { tanggal } = req.params;
  const benSummary = dbStore.getBeneficiarySummaryForDate(tanggal);
  const totalBeneficiaries = benSummary.totalPorsi || 2808;
  const menuHarian = dbStore.menuHarian.find((m) => m.tanggalOperasional === tanggal);
  const existingRecord = dbStore.getFoodWasteByDate(tanggal);
  const suggestedItems = [];
  if (menuHarian && menuHarian.rincianKomponen) {
    const r = menuHarian.rincianKomponen;
    if (r.karbohidrat) {
      suggestedItems.push({ menu: r.karbohidrat, standarPorsi: 150 });
    }
    if (r.laukHewani) {
      suggestedItems.push({ menu: r.laukHewani, standarPorsi: 50 });
    }
    if (r.laukNabati) {
      suggestedItems.push({ menu: r.laukNabati, standarPorsi: 50 });
    }
    if (r.sayur) {
      suggestedItems.push({ menu: r.sayur, standarPorsi: 50 });
    }
    if (r.buahSusu) {
      suggestedItems.push({ menu: r.buahSusu, standarPorsi: 100 });
    }
  }
  res.json({
    success: true,
    data: {
      tanggal,
      hariTanggalFormatted: formatIndonesianDateUpper(tanggal),
      sppgName: "SPPG PROBOLINGGO KREJENGAN TEMENGGUNGAN",
      totalBeneficiaries,
      menuHarian: menuHarian ? {
        id: menuHarian.id,
        namaMenu: menuHarian.namaMenu,
        rincianKomponen: menuHarian.rincianKomponen
      } : null,
      suggestedItems,
      existingRecord: existingRecord || null
    }
  });
});
router20.get("/by-date/:tanggal", (req, res) => {
  const { tanggal } = req.params;
  const record = dbStore.getFoodWasteByDate(tanggal);
  if (!record) {
    res.status(404).json({
      success: false,
      message: `Tidak ditemukan catatan Food Waste untuk tanggal ${tanggal}`
    });
    return;
  }
  res.json({
    success: true,
    data: record
  });
});
router20.get("/:id", (req, res) => {
  const { id } = req.params;
  const record = dbStore.foodWasteRecords.find((r) => r.id === id);
  if (!record) {
    res.status(404).json({
      success: false,
      message: "Catatan Food Waste tidak ditemukan"
    });
    return;
  }
  res.json({
    success: true,
    data: record
  });
});
router20.post("/", async (req, res) => {
  try {
    const payload = req.body;
    if (!payload.tanggal) {
      res.status(400).json({
        success: false,
        message: "Tanggal wajib diisi"
      });
      return;
    }
    if (!payload.hariTanggalFormatted) {
      payload.hariTanggalFormatted = formatIndonesianDateUpper(payload.tanggal);
    }
    if (!payload.sppgName) {
      payload.sppgName = "SPPG PROBOLINGGO KREJENGAN TEMENGGUNGAN";
    }
    const saved = dbStore.saveFoodWaste(payload);
    syncSaveDoc("foodWasteRecords", saved.id, saved).catch((err) => {
      console.warn("\u26A0\uFE0F Gagal sinkronisasi Food Waste ke Firestore:", err?.message || err);
    });
    res.json({
      success: true,
      message: "Catatan Food Waste berhasil disimpan",
      data: saved
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error?.message || "Gagal menyimpan catatan Food Waste"
    });
  }
});
router20.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const ok = dbStore.deleteFoodWaste(id);
    if (!ok) {
      res.status(404).json({
        success: false,
        message: "Catatan Food Waste tidak ditemukan"
      });
      return;
    }
    syncDeleteDoc("foodWasteRecords", id).catch((err) => {
      console.warn("\u26A0\uFE0F Gagal menghapus Food Waste dari Firestore:", err?.message || err);
    });
    res.json({
      success: true,
      message: "Catatan Food Waste berhasil dihapus"
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error?.message || "Gagal menghapus catatan Food Waste"
    });
  }
});
var foodWaste_default = router20;

// server/routes/petugas.ts
var import_express21 = require("express");
var router21 = (0, import_express21.Router)();
router21.get("/", (req, res) => {
  try {
    let list = dbStore.getPetugasList();
    const { q, jabatan, status } = req.query;
    if (q && typeof q === "string") {
      const query = q.toLowerCase();
      list = list.filter(
        (p) => p.nama.toLowerCase().includes(query) || p.nomor.toLowerCase().includes(query) || p.jabatan.toLowerCase().includes(query) || p.alamat.toLowerCase().includes(query)
      );
    }
    if (jabatan && typeof jabatan === "string" && jabatan !== "Semua") {
      list = list.filter((p) => p.jabatan.toLowerCase() === jabatan.toLowerCase());
    }
    if (status && typeof status === "string" && status !== "Semua") {
      list = list.filter((p) => p.status.toLowerCase() === status.toLowerCase());
    }
    return res.json({
      success: true,
      total: list.length,
      data: list
    });
  } catch (error) {
    console.error("Error fetching petugas:", error);
    return res.status(500).json({ success: false, message: "Gagal mengambil data petugas", error: error.message });
  }
});
router21.get("/absensi", (req, res) => {
  try {
    const tanggal = req.query.tanggal || (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
    const data = dbStore.getRekapAbsensi(tanggal);
    return res.json({
      success: true,
      data
    });
  } catch (error) {
    console.error("Error fetching absensi:", error);
    return res.status(500).json({ success: false, message: "Gagal mengambil rekap absensi", error: error.message });
  }
});
router21.post("/absensi", async (req, res) => {
  try {
    const { tanggal, items } = req.body;
    if (!tanggal || !items) {
      return res.status(400).json({ success: false, message: "Parameter tanggal dan items absensi wajib diisi" });
    }
    const autoSync = req.body.autoSync !== false;
    const result = dbStore.saveRekapAbsensi(req.body, autoSync);
    await syncSaveDocNow("rekapAbsensiList", result.absensi.id, result.absensi);
    if (result.generatedSlips.length > 0) {
      await syncSaveBatchNow("slipGajiList", result.generatedSlips);
    }
    return res.json({
      success: true,
      message: `Rekap absensi tanggal ${tanggal} berhasil disimpan. ${result.absensi.totalMasuk} petugas masuk otomatis masuk ke rekap slip gaji (${result.absensi.totalTidakMasuk} petugas tidak masuk difilter).`,
      data: result.absensi,
      slips: result.generatedSlips
    });
  } catch (error) {
    console.error("Error saving absensi:", error);
    return res.status(500).json({ success: false, message: "Gagal menyimpan rekap absensi", error: error.message });
  }
});
router21.get("/slip-gaji", (req, res) => {
  try {
    const { tanggal, petugasId, status, bulan, tahun } = req.query;
    let list = dbStore.getSlipGajiList({
      tanggal: typeof tanggal === "string" ? tanggal : void 0,
      petugasId: typeof petugasId === "string" ? petugasId : void 0,
      status: typeof status === "string" && status !== "Semua" ? status : void 0
    });
    if (bulan && typeof bulan === "string" && bulan !== "Semua") {
      list = list.filter((s) => {
        const parts = s.tanggal.split("-");
        return parts.length >= 2 && parts[1] === bulan.padStart(2, "0");
      });
    }
    if (tahun && typeof tahun === "string" && tahun !== "Semua") {
      list = list.filter((s) => s.tanggal.startsWith(tahun));
    }
    return res.json({
      success: true,
      total: list.length,
      data: list
    });
  } catch (error) {
    console.error("Error fetching slip gaji:", error);
    return res.status(500).json({ success: false, message: "Gagal mengambil data slip gaji", error: error.message });
  }
});
router21.get("/rekap-harian", (req, res) => {
  try {
    const tanggal = req.query.tanggal || (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
    const summary = dbStore.getRekapGajiHarian(tanggal);
    return res.json({
      success: true,
      data: summary
    });
  } catch (error) {
    console.error("Error fetching rekap harian:", error);
    return res.status(500).json({ success: false, message: "Gagal mengambil rekapitulasi harian", error: error.message });
  }
});
router21.post("/slip-gaji/batch-generate", async (req, res) => {
  try {
    const { tanggal } = req.body;
    if (!tanggal) {
      return res.status(400).json({ success: false, message: "Parameter tanggal diperlukan (YYYY-MM-DD)" });
    }
    const generated = dbStore.generateDailySlipBatch(tanggal);
    if (generated.length > 0) {
      await syncSaveBatchNow("slipGajiList", generated);
    }
    return res.json({
      success: true,
      message: `Berhasil membuat ${generated.length} slip gaji harian untuk tanggal ${tanggal}`,
      generatedCount: generated.length,
      data: generated
    });
  } catch (error) {
    console.error("Error generating batch slip gaji:", error);
    return res.status(500).json({ success: false, message: "Gagal generate slip gaji massal", error: error.message });
  }
});
router21.get("/slip-gaji/periode", (req, res) => {
  try {
    const todayStr = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
    const startDate = typeof req.query.startDate === "string" && req.query.startDate || todayStr;
    const endDate = typeof req.query.endDate === "string" && req.query.endDate || startDate;
    const summary = dbStore.getSlipGajiPeriodeSummary(startDate, endDate);
    return res.json({
      success: true,
      data: summary
    });
  } catch (error) {
    console.error("Error fetching periode slip gaji:", error);
    return res.status(500).json({ success: false, message: "Gagal menghitung slip gaji periode", error: error.message });
  }
});
router21.get("/slip-gaji/:slipId", (req, res) => {
  try {
    const slip = dbStore.getSlipGajiById(req.params.slipId);
    if (!slip) {
      return res.status(404).json({ success: false, message: "Slip gaji tidak ditemukan" });
    }
    return res.json({ success: true, data: slip });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Gagal mengambil slip gaji", error: error.message });
  }
});
router21.post("/slip-gaji", async (req, res) => {
  try {
    const payload = req.body;
    if (!payload.petugasId && !payload.namaPetugas) {
      return res.status(400).json({ success: false, message: "Data petugas wajib diisi" });
    }
    const saved = dbStore.saveSlipGaji(payload);
    await syncSaveDoc("slipGajiList", saved.id, saved);
    return res.json({
      success: true,
      message: "Slip gaji harian berhasil disimpan",
      data: saved
    });
  } catch (error) {
    console.error("Error saving slip gaji:", error);
    return res.status(500).json({ success: false, message: "Gagal menyimpan slip gaji", error: error.message });
  }
});
router21.patch("/slip-gaji/:slipId/status", async (req, res) => {
  try {
    const { statusPembayaran, metodePembayaran } = req.body;
    const slip = dbStore.getSlipGajiById(req.params.slipId);
    if (!slip) {
      return res.status(404).json({ success: false, message: "Slip gaji tidak ditemukan" });
    }
    const todayStr = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
    const updated = dbStore.saveSlipGaji({
      ...slip,
      statusPembayaran: statusPembayaran || slip.statusPembayaran,
      metodePembayaran: metodePembayaran || slip.metodePembayaran,
      tanggalBayar: statusPembayaran === "Lunas" ? todayStr : void 0,
      jamBayar: statusPembayaran === "Lunas" ? (/* @__PURE__ */ new Date()).toLocaleTimeString("id-ID", { hour: "2-digit", minute: "2-digit" }) + " WIB" : void 0
    });
    await syncSaveDoc("slipGajiList", updated.id, updated);
    return res.json({
      success: true,
      message: `Status pembayaran slip gaji berhasil diubah menjadi ${updated.statusPembayaran}`,
      data: updated
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Gagal memperbarui status bayar", error: error.message });
  }
});
router21.delete("/slip-gaji/:slipId", async (req, res) => {
  try {
    const ok = dbStore.deleteSlipGaji(req.params.slipId);
    if (!ok) {
      return res.status(404).json({ success: false, message: "Slip gaji tidak ditemukan" });
    }
    await syncDeleteDoc("slipGajiList", req.params.slipId);
    return res.json({ success: true, message: "Slip gaji harian berhasil dihapus" });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Gagal menghapus slip gaji", error: error.message });
  }
});
router21.post("/resequence", async (_req, res) => {
  try {
    const updated = dbStore.resequencePetugasNomor();
    if (updated.length > 0) {
      await syncSaveBatchNow("petugasList", updated);
    }
    saveSnapshotToDiskNow();
    return res.json({
      success: true,
      message: `Semua ${updated.length} nomer urut petugas berhasil diurutkan mulai dari 01 dari atas`,
      total: updated.length,
      data: updated
    });
  } catch (error) {
    console.error("Error resequencing petugas:", error);
    return res.status(500).json({ success: false, message: "Gagal mengurutkan nomer urut petugas", error: error.message });
  }
});
router21.post("/sync-master-divisi", async (_req, res) => {
  try {
    const { updatedPetugas, updatedSlips, updatedAbsensi } = dbStore.syncJabatanFromMasterDivisi();
    if (updatedPetugas.length > 0) {
      await syncSaveBatch("petugasList", updatedPetugas);
    }
    if (updatedSlips.length > 0) {
      await syncSaveBatch("slipGajiList", updatedSlips);
    }
    if (updatedAbsensi.length > 0) {
      await syncSaveBatch("rekapAbsensiList", updatedAbsensi);
    }
    saveSnapshotToDiskNow();
    const allPetugas = dbStore.getPetugasList();
    const allSlips = dbStore.getSlipGajiList();
    return res.json({
      success: true,
      message: `Sinkronisasi jenis jabatan sesuai Master Divisi selesai (${updatedPetugas.length} petugas & ${updatedSlips.length} slip gaji diperbarui).`,
      updatedPetugasCount: updatedPetugas.length,
      updatedSlipsCount: updatedSlips.length,
      updatedAbsensiCount: updatedAbsensi.length,
      petugas: allPetugas,
      slips: allSlips
    });
  } catch (error) {
    console.error("Error syncing master divisi:", error);
    return res.status(500).json({ success: false, message: "Gagal menyinkronkan jenis jabatan dengan Master Divisi", error: error.message });
  }
});
router21.post("/batch", async (req, res) => {
  try {
    const rawItems = Array.isArray(req.body?.items) ? req.body.items : [];
    const validItems = rawItems.map((item) => ({
      ...item,
      nama: String(item?.nama || "").trim(),
      jabatan: String(item?.jabatan || "").trim() || "Staf Operasional",
      alamat: String(item?.alamat ?? "").trim() || "-",
      besaranGaji: Math.max(0, Number(item?.besaranGaji ?? 12e4) || 0)
    })).filter((item) => item.nama.length > 0);
    if (validItems.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Minimal 1 data petugas dengan nama yang valid wajib diisi."
      });
    }
    const created = dbStore.savePetugasBatch(validItems);
    if (created.length > 0) {
      await syncSaveBatchNow("petugasList", created);
    }
    saveSnapshotToDiskNow();
    const allList = dbStore.getPetugasList();
    return res.json({
      success: true,
      message: `Berhasil menambahkan ${created.length} petugas baru (Total saat ini: ${allList.length} petugas)`,
      count: created.length,
      total: allList.length,
      data: created,
      allData: allList
    });
  } catch (error) {
    console.error("Error batch creating petugas:", error);
    return res.status(500).json({
      success: false,
      message: "Gagal menyimpan data petugas massal",
      error: error.message
    });
  }
});
router21.get("/:id", (req, res) => {
  try {
    const petugas = dbStore.getPetugasById(req.params.id);
    if (!petugas) {
      return res.status(404).json({ success: false, message: "Petugas tidak ditemukan" });
    }
    return res.json({ success: true, data: petugas });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Gagal mengambil detail petugas", error: error.message });
  }
});
router21.post("/", async (req, res) => {
  try {
    const rawBody = req.body || {};
    const isCreateMode = rawBody._mode === "create" || !rawBody.id;
    const { _mode, ...payload } = rawBody;
    const cleanNama = String(payload.nama || "").trim();
    const cleanJabatan = String(payload.jabatan || "").trim();
    if (!cleanNama || !cleanJabatan) {
      return res.status(400).json({ success: false, message: "Nama dan jabatan wajib diisi" });
    }
    const normalizedPayload = {
      ...payload,
      nama: cleanNama,
      jabatan: cleanJabatan,
      alamat: String(payload.alamat ?? "").trim() || "-"
    };
    const saved = dbStore.savePetugas(normalizedPayload, { forceCreate: isCreateMode });
    await syncSaveDocNow("petugasList", saved.id, saved);
    const { updatedSlips, updatedAbsensi } = dbStore.syncJabatanFromMasterDivisi();
    if (updatedSlips.length > 0) {
      await syncSaveBatch("slipGajiList", updatedSlips);
    }
    if (updatedAbsensi.length > 0) {
      await syncSaveBatch("rekapAbsensiList", updatedAbsensi);
    }
    saveSnapshotToDiskNow();
    const allList = dbStore.getPetugasList();
    return res.json({
      success: true,
      message: isCreateMode ? "Petugas baru berhasil ditambahkan" : "Data petugas berhasil diperbarui",
      data: saved,
      allData: allList,
      total: allList.length
    });
  } catch (error) {
    console.error("Error saving petugas:", error);
    return res.status(500).json({ success: false, message: "Gagal menyimpan data petugas", error: error.message });
  }
});
router21.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const payload = req.body || {};
    const cleanNama = String(payload.nama || "").trim();
    const cleanJabatan = String(payload.jabatan || "").trim();
    if (!cleanNama || !cleanJabatan) {
      return res.status(400).json({ success: false, message: "Nama dan jabatan wajib diisi" });
    }
    const saved = dbStore.savePetugas(
      {
        ...payload,
        id,
        nama: cleanNama,
        jabatan: cleanJabatan,
        alamat: String(payload.alamat ?? "").trim() || "-"
      },
      { forceCreate: false }
    );
    await syncSaveDocNow("petugasList", saved.id, saved);
    const { updatedSlips, updatedAbsensi } = dbStore.syncJabatanFromMasterDivisi();
    if (updatedSlips.length > 0) {
      await syncSaveBatch("slipGajiList", updatedSlips);
    }
    if (updatedAbsensi.length > 0) {
      await syncSaveBatch("rekapAbsensiList", updatedAbsensi);
    }
    saveSnapshotToDiskNow();
    const allList = dbStore.getPetugasList();
    return res.json({
      success: true,
      message: "Data petugas berhasil diperbarui",
      data: saved,
      allData: allList,
      total: allList.length
    });
  } catch (error) {
    console.error("Error updating petugas:", error);
    return res.status(500).json({ success: false, message: "Gagal memperbarui data petugas", error: error.message });
  }
});
router21.delete("/:id", async (req, res) => {
  try {
    const ok = dbStore.deletePetugas(req.params.id);
    if (!ok) {
      return res.status(404).json({ success: false, message: "Petugas tidak ditemukan" });
    }
    await syncDeleteDocNow("petugasList", req.params.id);
    saveSnapshotToDiskNow();
    const allList = dbStore.getPetugasList();
    return res.json({
      success: true,
      message: "Data petugas berhasil dihapus",
      allData: allList,
      total: allList.length
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: "Gagal menghapus data petugas", error: error.message });
  }
});
var petugas_default = router21;

// server/docs/swagger.ts
var swaggerSpec = {
  openapi: "3.0.0",
  info: {
    title: "Portal Administrasi Terpadu REST API",
    version: "1.0.0",
    description: "Dokumentasi REST API Gateway untuk Portal Utama, Single Sign-On (SSO), e-Surat Digital, Stock Opname, dan Master Data Terpadu.",
    contact: {
      name: "Tim Arsitektur Sistem Enterprise",
      email: "architecture@instansi.go.id"
    }
  },
  servers: [
    {
      url: "/api/v1",
      description: "API Gateway Server Local / Enterprise Container"
    }
  ],
  components: {
    securitySchemes: {
      BearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
        description: "Masukkan JWT Token hasil login dari /auth/login"
      }
    }
  },
  security: [
    {
      BearerAuth: []
    }
  ],
  paths: {
    "/auth/login": {
      post: {
        summary: "Single Sign-On (SSO) User Login",
        tags: ["Authentication & SSO"],
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  username: { type: "string", example: "superadmin" },
                  password: { type: "string", example: "password123" }
                }
              }
            }
          }
        },
        responses: {
          200: { description: "Login Berhasil, Mengembalikan Bearer JWT Token & Direct Redirect Links" },
          401: { description: "Kredensial Tidak Valid" }
        }
      }
    },
    "/auth/sso/verify": {
      get: {
        summary: "Verifikasi Token SSO dari Modul Eksternal",
        tags: ["Authentication & SSO"],
        parameters: [
          { name: "token", in: "query", schema: { type: "string" }, description: "JWT Token SSO" }
        ],
        responses: {
          200: { description: "Token Valid & Detail Identity Claims User" }
        }
      }
    },
    "/menus": {
      get: { summary: "Ambil Daftar Menu Dinamis Portal", tags: ["Dynamic Menus"] },
      post: { summary: "Tambah Menu Dinamis Baru", tags: ["Dynamic Menus"] }
    },
    "/users": {
      get: { summary: "Ambil Daftar Master User Enterprise", tags: ["User Management"] },
      post: { summary: "Tambah User Baru", tags: ["User Management"] }
    },
    "/master/pegawai": {
      get: { summary: "Ambil Master Data Pegawai", tags: ["Master Data"] },
      post: { summary: "Tambah Data Pegawai Baru", tags: ["Master Data"] }
    },
    "/esurat/surat-masuk": {
      get: { summary: "Daftar Surat Masuk Digital", tags: ["e-Surat Digital"] },
      post: { summary: "Catat Surat Masuk Baru", tags: ["e-Surat Digital"] }
    },
    "/esurat/surat-keluar": {
      get: { summary: "Daftar Surat Keluar", tags: ["e-Surat Digital"] },
      post: { summary: "Ajukan Draft Surat Keluar", tags: ["e-Surat Digital"] }
    },
    "/stock/barang": {
      get: { summary: "Daftar Master Barang Gudang", tags: ["Stock Opname"] },
      post: { summary: "Tambah Master Barang Baru", tags: ["Stock Opname"] }
    },
    "/stock/movements": {
      get: { summary: "Riwayat Transaksi Stok Masuk/Keluar", tags: ["Stock Opname"] },
      post: { summary: "Catat Transaksi Stok Masuk atau Keluar", tags: ["Stock Opname"] }
    },
    "/stock/opname-sessions": {
      get: { summary: "Daftar Sesi Physical Stock Opname", tags: ["Stock Opname"] },
      post: { summary: "Simpan Hasil Hitung Fisik Opname & Auto Adjust Stok", tags: ["Stock Opname"] }
    },
    "/search": {
      get: {
        summary: "Global Cross-Module Search Engine",
        tags: ["Global Features"],
        parameters: [{ name: "q", in: "query", schema: { type: "string" }, description: "Kata kunci nomor surat, barang, pegawai" }]
      }
    },
    "/activity-logs": {
      get: { summary: "Ambil Audit Trail Log Aktivitas Central", tags: ["Audit & Logs"] }
    }
  }
};

// server.ts
import_dotenv.default.config();
process.on("unhandledRejection", (reason) => {
  console.warn("[Process Warning] Unhandled Rejection:", reason);
});
process.on("uncaughtException", (err) => {
  console.warn("[Process Warning] Uncaught Exception:", err?.message || err);
});
process.env.VITE_SUPABASE_URL = process.env.VITE_SUPABASE_URL || process.env.SUPABASE_URL || "";
process.env.VITE_SUPABASE_ANON_KEY = process.env.VITE_SUPABASE_ANON_KEY || process.env.SUPABASE_ANON_KEY || "";
if (!process.env.JWT_SECRET) {
  process.env.JWT_SECRET = "portal_bgn_terpadu_jwt_secret_token_secure_key_2026_prod";
}
var DEFAULT_PROD_APP_URL = "https://sppg-hafshawaty1.com";
async function startServer() {
  try {
    hydrateFromLocalSnapshot();
  } catch (hydrateErr) {
    console.warn("[Startup Warning] Gagal memuat local snapshot:", hydrateErr?.message || hydrateErr);
  }
  const app = (0, import_express22.default)();
  const distPath = import_path2.default.join(process.cwd(), "dist");
  const distIndexHtml = import_path2.default.join(distPath, "index.html");
  const isProduction = process.env.NODE_ENV === "production" || Boolean(process.argv[1]?.includes("server.cjs"));
  const PORT = Number(process.env.PORT) || 3e3;
  const APP_URL = process.env.APP_URL || (isProduction ? DEFAULT_PROD_APP_URL : `http://localhost:${PORT}`);
  app.use((0, import_cors.default)());
  app.use(import_express22.default.json({ limit: "100mb" }));
  app.use(import_express22.default.text({ type: "text/plain", limit: "50mb" }));
  app.use(import_express22.default.urlencoded({ extended: true, limit: "100mb" }));
  app.get("/api/health", (req, res) => {
    res.json({
      status: "online",
      appName: "Portal Administrasi Terpadu",
      version: "2026.1.0-Enterprise",
      timestamp: (/* @__PURE__ */ new Date()).toISOString()
    });
  });
  app.get("/api/v1/cloud/status", (req, res) => {
    res.json({
      success: true,
      cloud: getCloudInfo()
    });
  });
  app.post("/api/v1/cloud/test-connection", async (req, res) => {
    const result = await testFirestoreConnection();
    res.json(result);
  });
  app.get("/api/v1/cloud/app-state", (req, res) => {
    res.json({
      success: true,
      data: getAppStateEntries(),
      cloud: getCloudInfo()
    });
  });
  app.post("/api/v1/cloud/app-state", async (req, res) => {
    try {
      let bodyPayload = req.body;
      if (typeof bodyPayload === "string") {
        try {
          bodyPayload = JSON.parse(bodyPayload);
        } catch (_) {
          bodyPayload = {};
        }
      }
      const entries = bodyPayload?.entries;
      if (!entries || typeof entries !== "object") {
        return res.status(400).json({ success: false, message: "Payload entries tidak valid" });
      }
      const userName = req.headers["x-user-name"] || bodyPayload?.userName || "Web Client";
      const updatedCount = await saveAppStateEntries(entries, { name: userName });
      res.json({
        success: true,
        updatedCount,
        cloud: getCloudInfo()
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err?.message || "Gagal menyimpan sinkronisasi app-state"
      });
    }
  });
  app.get("/api/v1/cloud/collection/:name", (req, res) => {
    const rawName = req.params.name;
    const aliasMap = {
      distribution_reports: "distributionReports",
      divisiTaskRecords: "tugasDivisi"
    };
    const resolvedName = aliasMap[rawName] || rawName;
    const data = getCollectionSnapshot(resolvedName);
    res.json({
      success: true,
      collection: rawName,
      data: Array.isArray(data) ? data : []
    });
  });
  app.post("/api/v1/cloud/collection/:name", (req, res) => {
    const rawName = req.params.name;
    const aliasMap = {
      distribution_reports: "distributionReports",
      divisiTaskRecords: "tugasDivisi"
    };
    const resolvedName = aliasMap[rawName] || rawName;
    const items = Array.isArray(req.body?.data) ? req.body.data : [];
    saveCollectionSnapshot(resolvedName, items);
    res.json({ success: true, collection: rawName, count: items.length });
  });
  app.get("/api/v1/cloud/operational-snapshot", (_req, res) => {
    res.json({
      success: true,
      data: getOperationalSnapshot()
    });
  });
  app.post("/api/v1/cloud/operational-snapshot", (req, res) => {
    const slices = req.body?.slices;
    if (slices && typeof slices === "object") {
      saveOperationalSnapshotSlices(slices);
    }
    res.json({ success: true });
  });
  app.post("/api/v1/cloud/sync-all", async (req, res) => {
    try {
      let bodyPayload = req.body;
      if (typeof bodyPayload === "string") {
        try {
          bodyPayload = JSON.parse(bodyPayload);
        } catch (_) {
          bodyPayload = {};
        }
      }
      if (bodyPayload?.entries && typeof bodyPayload.entries === "object") {
        await saveAppStateEntries(bodyPayload.entries, {
          name: req.headers["x-user-name"] || "Manual Cloud Sync"
        });
      }
      await flushWriteQueue();
      saveSnapshotToDiskNow();
      await initFirestoreSync(Boolean(bodyPayload?.forcePull));
      res.json({
        success: true,
        message: "Seluruh data aplikasi berhasil disinkronisasi ke Supabase & cadangan server.",
        cloud: getCloudInfo()
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err?.message || "Gagal melakukan sinkronisasi penuh ke Supabase"
      });
    }
  });
  app.post("/api/v1/cloud/reseed-clean-slate", async (req, res) => {
    try {
      await initFirestoreSync(true);
      res.json({
        success: true,
        message: "Koleksi database berhasil diinisialisasi dan disinkronisasi ke Supabase!",
        cloud: getCloudInfo()
      });
    } catch (err) {
      res.status(500).json({
        success: false,
        message: err?.message || "Gagal sinkronisasi data ke Supabase"
      });
    }
  });
  app.get("/api/docs/swagger.json", (req, res) => {
    res.json(swaggerSpec);
  });
  app.use("/api/v1/auth", auth_default);
  app.use("/api/v1/users", users_default);
  app.use("/api/v1/roles", roles_default);
  app.use("/api/v1/menus", menus_default);
  app.use("/api/v1/master", master_default);
  app.use("/api/v1/esurat", esurat_default);
  app.use("/api/v1/stock", stock_default);
  app.use("/api/v1/notifications", notifications_default);
  app.use("/api/v1/activity-logs", logs_default);
  app.use("/api/v1/search", search_default);
  app.use("/api/v1/settings", settings_default);
  app.use("/api/v1/bbm", bbm_default);
  app.use("/api/v1/tugas-divisi", tugasDivisi_default);
  app.use("/api/v1/penerima-manfaat", penerimaManfaat_default);
  app.use("/api/v1/nutrition-plans", nutritionPlans_default);
  app.use("/api/nutrition", nutritionPlans_default);
  app.use("/api/v1/barang-datang", barangDatang_default);
  app.use("/api/v1/menu-harian", menuHarian_default);
  app.use("/api/v1/document-template", documentTemplate_default);
  app.use("/api/v1/distribusi", distribusi_default);
  app.use("/api/v1/food-waste", foodWaste_default);
  app.use("/api/food-waste", foodWaste_default);
  app.use("/api/v1/petugas", petugas_default);
  app.use("/api/petugas", petugas_default);
  app.all("/api/*", (req, res) => {
    res.status(404).json({
      success: false,
      message: `Endpoint API tidak ditemukan: ${req.method} ${req.originalUrl}`
    });
  });
  app.use((err, req, res, next) => {
    if (req.path.startsWith("/api")) {
      res.status(err?.status || 500).json({
        success: false,
        message: err?.message || "Terjadi kesalahan internal pada server API"
      });
      return;
    }
    next(err);
  });
  if (!isProduction) {
    const { createServer: createViteServer } = await import("vite");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    if (import_fs2.default.existsSync(distPath)) {
      app.use(import_express22.default.static(distPath, { index: "index.html" }));
    }
    app.get("*", (_req, res) => {
      if (import_fs2.default.existsSync(distIndexHtml)) {
        res.sendFile(distIndexHtml);
      } else {
        res.status(503).send("Aplikasi sedang disiapkan. Silakan jalankan build atau muat ulang beberapa saat lagi.");
      }
    });
  }
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Portal Enterprise Gateway] Running on http://0.0.0.0:${PORT} (${isProduction ? "production" : "development"}, APP_URL=${APP_URL})`);
    setTimeout(() => {
      try {
        initFirestoreSync().catch((err) => console.warn("Firestore initialization warning:", err?.message || err));
      } catch (err) {
        console.warn("Firestore startup warning:", err?.message || err);
      }
    }, 200);
  });
}
startServer().catch((err) => {
  console.error("[Startup Warning] Server initialization issue:", err);
});
//# sourceMappingURL=server.cjs.map
