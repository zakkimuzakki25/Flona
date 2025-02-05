package seeds

import (
	"flonn-be/pkg/entity"
	"time"

	"gorm.io/gorm"
)

func (s *seeder) seedDummyOpenAction(sql *gorm.DB) error {
	var objects []entity.OpenAction

	if err := sql.First(&objects).Error; err != gorm.ErrRecordNotFound {
		return err
	}

	parseTime := func(str string) time.Time {
		parsedTime, _ := time.Parse("2006-01-02", str)
		return parsedTime
	}

	objects = []entity.OpenAction{
		{
			Title:         "Relawan Konservasi Penyu",
			Subtitle:      "Relawan Konservasi Hewan",
			Photo:         "https://firebasestorage.googleapis.com/v0/b/flonn-pubek.appspot.com/o/volunteer%2FBannerPenyu.png?alt=media&token=0c5c4643-e85a-4499-abde-2d48d1fcdd47",
			Description:   "FLONA mengajak para Flonteer untuk terjun langsung dalam aksi konservasi penyu di Pantai Kuta, Bali. Bergabung menjadi Flonteer dan mengambil bagian dalam kegiatan mulai dari pemantauan habitat hingga penyelamatan penyu yang terluka. Di sini, setiap tindakan Flonteer berkontribusi pada pelestarian kehidupan laut. Kegiatan edukasi yang dilakukan juga membuka mata masyarakat tentang pentingnya menjaga keberlangsungan spesies ini. Jadi, siapkah Sobat Flonn untuk membuat perbedaan? Gabung sekarang dan bantu FLONN menjaga agar pantai ini tetap menjadi rumah yang aman bagi penyu untuk generasi yang akan datang.",
			Location:      "Banjarmasin, Kota Banjarmasin, Kalimantan Selatan, Indonesia",
			Coordinate:    "-3.3217,114.5944",
			StartDate:     parseTime("2025-03-25"),
			EndDate:       parseTime("2025-08-11"),
			Capacity: 1250,
			Tasks:         "Pemantauan Habitat:Flonteer akan melakukan pemantauan rutin di pantai untuk menilai kondisi habitat penyu, mencakup pemantauan kualitas air, kondisi pasir, dan area bertelur. Tugas ini penting untuk memastikan bahwa habitat tersebut tetap kondusif untuk kegiatan bertelur penyu.<>Penyelamatan Penyu yang Terluka:Jika menemukan penyu yang terluka or dalam kondisi yang tidak baik, Flonteer akan terlibat dalam proses penyelamatan. Ini terlagi pertolongan pertama di Location dan mengkoordinasikan dengan fasilitas rehabilitasi lokal untuk perawatan lebih lanjut.<>Penetasan Telur dan Pelepasan Tukik: Flonteer akan membantu dalam proses penetasan telur penyu. Mereka akan mengawasi dan melindungi telur hingga menetas dan kemudian membantu dalam pelepasan tukik ke laut, memastikan mereka memiliki kesempatan terbaik untuk bertahan hidup.<>Edukasi Komunitas:Flonteer akan terlibat dalam program edukasi untuk masyarakat lokal dan pengunjung pantai. Kegiatan ini bertujuan untuk meningkatkan kesadaran About pentingnya pelestarian penyu dan cara-cara yang dapat dilakukan masyarakat untuk mendukung usaha ini.<>Pengumpulan Data untuk Penelitian:Selama kegiatan di lapangan, Flonteer akan mengumpulkan data yang penting untuk penelitian konservasi penyu seperti pengamatan perilaku penyu, pencatatan jumlah telur yang diletakkan, dan monitoring Population<>Pembersihan Pantai:Flonteer akan terlibat dalam kegiatan rutin pembersihan pantai untuk mengurangi polusi dan memastikan pantai tetap bersih dan aman bagi penyu yang bertelur.",
			Condition:     "WNI (Warga Negara Indonesia)<>20-45 tahun<>Pengalaman bekerja dalam proyek konservasi lingkungan, terutama yang berhubungan dengan kehidupan laut atau spesies terancam punah, memberi pemahaman yang lebih baik tentang tantangan dan solusi praktis dalam pelestarian.:Pengalaman dalam melakukan pekerjaan lapangan, seperti pengambilan sampel, pemantauan spesies, atau aktivitas serupa di alam bebas.:Pengalaman berbicara di depan publik, yang berguna dalam menyampaikan pesan konservasi kepada audiens yang lebih luas atau dalam acara edukasi.<>Tidak ada batasan khusus mengenai jenjang pendidikan, namun latar belakang di bidang biologi, lingkungan, kelautan, atau pendidikan terkait lainnya akan menjadi nilai tambah.<>Bahasa Indonesia dan Bahasa Inggris<>Mampu berkomunikasi dengan baik dalam Bahasa Indonesia dan/atau Bahasa Inggris.:Mampu berinteraksi dengan berbagai kelompok, termasuk tim internal, masyarakat lokal, dan turis, dalam menyampaikan informasi atau mengatur aktivitas.:Memiliki kemampuan observasi yang baik, terutama dalam mengamati perilaku hewan atau kondisi alam.:Cukup fit untuk melakukan kegiatan di luar ruangan seperti berjalan di pantai, mengangkat atau membawa peralatan.:Mampu mengelola waktu dan sumber daya secara efisien untuk memenuhi kebutuhan program dan jadwal kegiatan.:Kemampuan untuk mengidentifikasi dan menangani masalah yang muncul selama aktivitas konservasi.",
			Target:        5000000,
			IsDisaster:    false,
			LogoOrganizer: "https://e7.pngegg.com/pngimages/574/948/png-clipart-logo-indonesian-red-cross-society-graphics-jakarta-youth-red-cross-merah-putih-angle-text.png",
		},
	}

	if err := sql.Create(&objects).Error; err != nil {
		return err
	}

	return nil
}
