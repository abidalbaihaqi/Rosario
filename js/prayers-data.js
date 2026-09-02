/**
 * Rosario Database - Catholic Holy Rosary Prayers, Mysteries & Translations
 * Bilingual: Indonesian (ID) & English (EN)
 */

const ROSARY_DATA = {
  // Translations for UI labels
  translations: {
    id: {
      appName: "Rosario",
      tagline: "Doa Rosario Harian",
      welcomeGreeting: "Selamat Datang,",
      welcomeSubtitle: "Umat terkasih",
      recomTitle: "REKOMENDASI HARI INI",
      recomDescPrefix: "Sangat cocok didoakan pada hari",
      mysteriesSectionTitle: "MISTERI ROSARIO",
      scheduleTitle: "Jadwal Rosario",
      scheduleSubtitle: "Panduan mendaras misteri sepanjang pekan",
      todayBadge: "Hari Ini",
      startPrayingBtn: "Mulai Berdoa Rosario",
      prayedOn: "Didaras tiap",
      navRosary: "Rosario",
      navSchedule: "Jadwal",
      navSettings: "Pengaturan",
      settingsTitle: "Pengaturan",
      settingsSubtitle: "Sesuaikan pengalaman doa Anda",
      languageLabel: "Bahasa (Language)",
      themeLabel: "Tema Tampilan",
      themeLight: "Terang (Light)",
      themeDark: "Gelap (Dark)",
      audioChimeLabel: "Suara Dentang Lonceng",
      audioChimeDesc: "Dentang lembut saat berpindah butir doa",
      voiceReaderLabel: "Pembaca Teks Otomatis (TTS)",
      voiceReaderDesc: "Membaca teks doa dengan suara sistem",
      fontSizeLabel: "Ukuran Teks Doa",
      fontSizeNormal: "Normal",
      fontSizeLarge: "Besar",
      fontSizeXLarge: "Sangat Besar",
      viewModeLabel: "Tampilan Desktop",
      viewModeDevice: "Bingkai Ponsel",
      viewModeDesktop: "Layar Penuh",
      decadeLabel: "PERISTIWA KE-",
      prayerIntro: "Doa Pembuka",
      prayerDecade: "Peristiwa",
      prayerClosing: "Doa Penutup",
      beadProgress: "Butir",
      completedTitle: "Doa Rosario Selesai",
      completedSubtitle: "Semoga Bunda Maria senantiasa menyertai langkah hidup Anda.",
      backToHome: "Kembali ke Beranda",
      prayAgain: "Doa Lagi",
      nextBead: "Berikutnya",
      prevBead: "Sebelumnya",
      autoPlay: "Otomatis",
      pause: "Jeda",
      play: "Putar",
      scriptureTitle: "Renungan Kitab Suci",
      fruitTitle: "Buah Misteri",
      prayerListTitle: "Daftar Doa",
      close: "Tutup"
    },
    en: {
      appName: "Rosary",
      tagline: "Daily Holy Rosary",
      welcomeGreeting: "Welcome,",
      welcomeSubtitle: "Beloved Faithful",
      recomTitle: "TODAY'S RECOMMENDATION",
      recomDescPrefix: "Recommended to pray on",
      mysteriesSectionTitle: "ROSARY MYSTERIES",
      scheduleTitle: "Rosary Schedule",
      scheduleSubtitle: "Weekly guide to reciting the mysteries",
      todayBadge: "Today",
      startPrayingBtn: "Start Praying Rosary",
      prayedOn: "Prayed on",
      navRosary: "Rosary",
      navSchedule: "Schedule",
      navSettings: "Settings",
      settingsTitle: "Settings",
      settingsSubtitle: "Customize your prayer experience",
      languageLabel: "Language",
      themeLabel: "Display Theme",
      themeLight: "Light Mode",
      themeDark: "Dark Mode",
      audioChimeLabel: "Bell Chime Sound",
      audioChimeDesc: "Gentle chime on bead transition",
      voiceReaderLabel: "Voice Reader (TTS)",
      voiceReaderDesc: "Read prayers aloud using system voice",
      fontSizeLabel: "Prayer Text Size",
      fontSizeNormal: "Normal",
      fontSizeLarge: "Large",
      fontSizeXLarge: "Extra Large",
      viewModeLabel: "Desktop View",
      viewModeDevice: "Phone Frame",
      viewModeDesktop: "Full Width",
      decadeLabel: "MYSTERY ",
      prayerIntro: "Opening Prayers",
      prayerDecade: "Decade",
      prayerClosing: "Closing Prayers",
      beadProgress: "Bead",
      completedTitle: "Rosary Completed",
      completedSubtitle: "May the Blessed Virgin Mary intercede for you always.",
      backToHome: "Back to Home",
      prayAgain: "Pray Again",
      nextBead: "Next",
      prevBead: "Previous",
      autoPlay: "Auto Play",
      pause: "Pause",
      play: "Play",
      scriptureTitle: "Scripture Meditation",
      fruitTitle: "Spiritual Fruit",
      prayerListTitle: "Prayer Texts",
      close: "Close"
    }
  },

  // Days of week mapping (0: Sunday, 1: Monday, ..., 6: Saturday)
  daysOfWeek: [
    { id: "Min", en: "Sun", dayNameId: "Minggu", dayNameEn: "Sunday", mysteryKey: "mulia" },
    { id: "Sen", en: "Mon", dayNameId: "Senin", dayNameEn: "Monday", mysteryKey: "gembira" },
    { id: "Sel", en: "Tue", dayNameId: "Selasa", dayNameEn: "Tuesday", mysteryKey: "sedih" },
    { id: "Rab", en: "Wed", dayNameId: "Rabu", dayNameEn: "Wednesday", mysteryKey: "mulia" },
    { id: "Kam", en: "Thu", dayNameId: "Kamis", dayNameEn: "Thursday", mysteryKey: "terang" },
    { id: "Jum", en: "Fri", dayNameId: "Jumat", dayNameEn: "Friday", mysteryKey: "sedih" },
    { id: "Sab", en: "Sat", dayNameId: "Sabtu", dayNameEn: "Saturday", mysteryKey: "gembira" }
  ],

  // Common Catholic Prayers
  prayers: {
    tandaSalib: {
      label: { id: "TANDA SALIB", en: "SIGN OF THE CROSS" },
      audio: { id: "assets/audio/tanda_salib_id.mp3", en: "assets/audio/sign_of_cross_en.mp3" },
      text: {
        id: "Dalam nama Bapa, dan Putra, dan Roh Kudus. Amin.",
        en: "In the name of the Father, and of the Son, and of the Holy Spirit. Amen."
      }
    },
    doaTobat: {
      label: { id: "DOA TOBAT", en: "ACT OF CONTRITION" },
      audio: { id: "assets/audio/doa_tobat_id.mp3", en: "assets/audio/act_of_contrition_en.mp3" },
      text: {
        id: "Allah yang maharahim, aku menyesal atas dosa-dosaku. Aku sungguh patut Engkau hukum, terutama karena aku telah menduakan Engkau yang mahabaik dan mahacinta bagiku. Aku benci akan segala dosaku, dan berjanji dengan pertolongan rahmat-Mu hendak memperbaiki hidupku dan tidak akan berbuat dosa lagi. Allah yang maha murah, ampunilah aku, orang berdosa ini. Amin.",
        en: "O my God, I am heartily sorry for having offended Thee, and I detest all my sins because of Thy just punishments, but most of all because they offend Thee, my God, Who art all-good and deserving of all my love. I firmly resolve, with the help of Thy grace, to sin no more and to avoid the near occasions of sin. Amen."
      }
    },
    akuPercaya: {
      label: { id: "AKU PERCAYA (SYAHADAT PARA RASUL)", en: "APOSTLES' CREED" },
      audio: { id: "assets/audio/aku_percaya_id.mp3", en: "assets/audio/apostles_creed_en.mp3" },
      text: {
        id: "Aku percaya akan Allah, Bapa yang Mahakuasa, pencipta langit dan bumi; dan akan Yesus Kristus, Putra-Nya yang tunggal, Tuhan kita; yang dikandung dari Roh Kudus, dilahirkan oleh Perawan Maria; yang menderita sengsara dalam pemerintahan Pontius Pilatus, disalibkan, wafat, dan dimakamkan; yang turun ke tempat penantian, pada hari ketiga bangkit dari antara orang mati; yang naik ke surga, duduk di sebelah kanan Allah Bapa yang Mahakuasa; dari situ Ia akan datang mengadili orang yang hidup dan yang mati. Aku percaya akan Roh Kudus, Gereja Katolik yang kudus, persekutuan para kudus, pengampunan dosa, kebangkitan badan, kehidupan kekal. Amin.",
        en: "I believe in God, the Father Almighty, Creator of heaven and earth, and in Jesus Christ, His only Son, our Lord, who was conceived by the Holy Spirit, born of the Virgin Mary, suffered under Pontius Pilate, was crucified, died and was buried; He descended into hell; on the third day He rose again from the dead; He ascended into heaven, and is seated at the right hand of God the Father Almighty; from there He will come to judge the living and the dead. I believe in the Holy Spirit, the Holy Catholic Church, the communion of saints, the forgiveness of sins, the resurrection of the body, and life everlasting. Amen."
      }
    },
    bapaKami: {
      label: { id: "BAPA KAMI", en: "OUR FATHER" },
      audio: { id: "assets/audio/bapa_kami_id.mp3", en: "assets/audio/our_father_en.mp3" },
      text: {
        id: "Bapa kami yang ada di surga, dimuliakanlah nama-Mu, datanglah Kerajaan-Mu, jadilah kehendak-Mu di atas bumi seperti di dalam surga. Berilah kami rezeki pada hari ini dan ampunilah kesalahan kami, seperti kami pun mengampuni yang bersalah kepada kami; dan janganlah masukkan kami ke dalam pencobaan, tetapi bebaskanlah kami dari yang jahat. Amin.",
        en: "Our Father, Who art in heaven, hallowed be Thy name; Thy kingdom come; Thy will be done on earth as it is in heaven. Give us this day our daily bread; and forgive us our trespasses as we forgive those who trespass against us; and lead us not into temptation, but deliver us from evil. Amen."
      }
    },
    salamMaria: {
      label: { id: "SALAM MARIA", en: "HAIL MARY" },
      audio: { id: "assets/audio/salam_maria_id.mp3", en: "assets/audio/hail_mary_en.mp3" },
      text: {
        id: "Salam Maria, penuh rahmat, Tuhan sertamu, terpujilah engkau di antara wanita dan terpujilah buah tubuhmu, Yesus. Santa Maria, Bunda Allah, doakanlah kami yang berdosa ini, sekarang dan waktu kami mati. Amin.",
        en: "Hail Mary, full of grace, the Lord is with thee; blessed art thou amongst women, and blessed is the fruit of thy womb, Jesus. Holy Mary, Mother of God, pray for us sinners, now and at the hour of our death. Amen."
      }
    },
    kemuliaan: {
      label: { id: "KEMULIAAN", en: "GLORY BE" },
      audio: { id: "assets/audio/kemuliaan_id.mp3", en: "assets/audio/glory_be_en.mp3" },
      text: {
        id: "Kemuliaan kepada Bapa dan Putra dan Roh Kudus, seperti pada permulaan, sekarang, selalu, dan sepanjang segala abad. Amin.",
        en: "Glory be to the Father, and to the Son, and to the Holy Spirit, as it was in the beginning, is now, and ever shall be, world without end. Amen."
      }
    },
    terpujilah: {
      label: { id: "TERPUJILAH", en: "PRAISE BE" },
      audio: { id: "assets/audio/terpujilah_id.mp3", en: "assets/audio/praise_be_en.mp3" },
      text: {
        id: "Terpujilah nama Yesus, Maria, dan Santo Yosef, sekarang dan selama-lamanya. Amin.",
        en: "O Sacrament Most Holy, O Sacrament Divine, all praise and all thanksgiving be every moment Thine."
      }
    },
    doaFatima: {
      label: { id: "DOA FATIMA", en: "FATIMA PRAYER" },
      audio: { id: "assets/audio/doa_fatima_id.mp3", en: "assets/audio/fatima_prayer_en.mp3" },
      text: {
        id: "Ya Yesus yang baik, ampunilah dosa-dosa kami, selamatkanlah kami dari api neraka, dan hantarlah jiwa-jiwa ke dalam surga, terutama mereka yang sangat membutuhkan kerahiman-Mu. Amin.",
        en: "O My Jesus, forgive us our sins, save us from the fires of hell, and lead all souls to Heaven, especially those who have most need of Thy mercy. Amen."
      }
    },
    salamYaRatu: {
      label: { id: "SALAM YA RATU (SALVE REGINA)", en: "HAIL HOLY QUEEN (SALVE REGINA)" },
      audio: { id: "assets/audio/salam_ya_ratu_id.mp3", en: "assets/audio/salve_regina_en.mp3" },
      text: {
        id: "Salam, ya Ratu, Bunda yang berbelaskasih, hidup, hiburan, dan harapan kami. Kami semua memanjatkan permohonan, kami amat susah, mengeluh, dan menangis di lembah air mata ini. Maka bukalah, ya Pembela kami, pandanganmu yang berbelaskasih kepada kami; dan sesudah pengasingan ini, tunjukkanlah kepada kami, Yesus, buah tubuhmu yang terpuji. Ya Maria, perawan yang murah hati, penuh kasih sayang, dan manis. Doakanlah kami, ya Santa Bunda Allah, supaya kami dapat menikmati janji Kristus. Amin.",
        en: "Hail, Holy Queen, Mother of Mercy, our life, our sweetness and our hope. To thee do we cry, poor banished children of Eve. To thee do we send up our sighs, mourning and weeping in this valley of tears. Turn then, most gracious advocate, thine eyes of mercy toward us, and after this our exile, show unto us the blessed fruit of thy womb, Jesus. O clement, O loving, O sweet Virgin Mary. Pray for us, O Holy Mother of God, that we may be made worthy of the promises of Christ. Amen."
      }
    },
    doaPenutup: {
      label: { id: "DOA PENUTUP ROSARIO", en: "CONCLUDING PRAYER" },
      audio: { id: "assets/audio/doa_penutup_id.mp3", en: "assets/audio/concluding_prayer_en.mp3" },
      text: {
        id: "Marilah berdoa: Ya Allah, Putra Tunggal-Mu telah memperoleh bagi kami ganjaran keselamatan kekal melalui hidup, wafat, dan kebangkitan-Nya. Kami mohon, anugerahkanlah agar dengan merenungkan misteri Rosario Suci Santa Perawan Maria ini, kami dapat meneladani apa yang terkandung di dalamnya dan memperoleh apa yang dijanjikannya, demi Kristus Tuhan kami. Amin.",
        en: "Let us pray: O God, whose only begotten Son, by His life, death, and resurrection, has purchased for us the rewards of eternal life, grant, we beseech Thee, that meditating upon these mysteries of the Most Holy Rosary of the Blessed Virgin Mary, we may imitate what they contain and obtain what they promise, through the same Christ our Lord. Amen."
      }
    }
  },

  // 4 Mysteries definition
  mysteries: {
    gembira: {
      idKey: "gembira",
      name: { id: "Peristiwa Gembira", en: "Joyful Mysteries" },
      days: { id: "Senin & Sabtu", en: "Monday & Saturday" },
      accentColor: "#3b82f6", // Blue accent
      decades: [
        {
          num: "I",
          roman: "I",
          title: {
            id: "Kabar Sukacita dari Malaikat Gabriel kepada Maria",
            en: "The Annunciation of Gabriel to Mary"
          },
          shortTitle: {
            id: "Kabar Sukacita",
            en: "The Annunciation"
          },
          scripture: {
            ref: "Lukas 1:26-38",
            text: {
              id: "\"Salam, hai engkau yang dikaruniai, Tuhan menyertai engkau... Sesungguhnya engkau akan mengandung dan akan melahirkan seorang anak laki-laki dan hendaklah engkau menamai Dia Yesus.\"",
              en: "\"Hail, full of grace, the Lord is with thee... Behold, thou shalt conceive in thy womb, and bring forth a son, and shalt call his name Jesus.\""
            }
          },
          fruit: { id: "Kerendahan Hati", en: "Humility" }
        },
        {
          num: "II",
          roman: "II",
          title: {
            id: "Kunjungan Maria kepada Elisabet",
            en: "The Visitation of Mary to Elizabeth"
          },
          shortTitle: {
            id: "Kunjungan Maria",
            en: "The Visitation"
          },
          scripture: {
            ref: "Lukas 1:39-45",
            text: {
              id: "\"Diberkatilah engkau di antara semua perempuan dan diberkatilah buah rahimmu. Siapakah aku ini sampai ibu Tuhanku datang mengunjungi aku?\"",
              en: "\"Blessed art thou among women, and blessed is the fruit of thy womb. And whence is this to me, that the mother of my Lord should come to me?\""
            }
          },
          fruit: { id: "Kasih kepada Sesama", en: "Love of Neighbor" }
        },
        {
          num: "III",
          roman: "III",
          title: {
            id: "Kelahiran Yesus di Betlehem",
            en: "The Nativity of Jesus in Bethlehem"
          },
          shortTitle: {
            id: "Kelahiran Yesus",
            en: "The Nativity"
          },
          scripture: {
            ref: "Lukas 2:1-7",
            text: {
              id: "\"Dan ia melahirkan seorang anak laki-laki, anaknya yang sulung, lalu dibungkusnya dengan lampin dan dibaringkannya di dalam palungan, karena tidak ada tempat bagi mereka di rumah penginapan.\"",
              en: "\"And she brought forth her firstborn son, and wrapped him in swaddling clothes, and laid him in a manger; because there was no room for them in the inn.\""
            }
          },
          fruit: { id: "Semangat Kemiskinan Rohani", en: "Poverty of Spirit" }
        },
        {
          num: "IV",
          roman: "IV",
          title: {
            id: "Yesus Dipersembahkan di Bait Allah",
            en: "The Presentation of Jesus in the Temple"
          },
          shortTitle: {
            id: "Yesus Dipersembahkan",
            en: "The Presentation"
          },
          scripture: {
            ref: "Lukas 2:22-38",
            text: {
              id: "\"Sekarang, Tuhan, biarkanlah hamba-Mu ini pergi dalam damai sejahtera, sesuai dengan firman-Mu, sebab mataku telah melihat keselamatan yang dari pada-Mu.\"",
              en: "\"Lord, now lettest thou thy servant depart in peace, according to thy word: For mine eyes have seen thy salvation.\""
            }
          },
          fruit: { id: "Ketaatan pada Kehendak Allah", en: "Purity and Obedience" }
        },
        {
          num: "V",
          roman: "V",
          title: {
            id: "Yesus Ditemukan di Bait Allah",
            en: "The Finding of Jesus in the Temple"
          },
          shortTitle: {
            id: "Yesus Ditemukan",
            en: "Finding in the Temple"
          },
          scripture: {
            ref: "Lukas 2:41-52",
            text: {
              id: "\"Mengapa kamu mencari Aku? Tidakkah kamu tahu, bahwa Aku harus berada di dalam rumah Bapa-Ku?\"",
              en: "\"How is it that ye sought me? Wist ye not that I must be about my Father's business?\""
            }
          },
          fruit: { id: "Kegembiraan Menemukan Yesus", en: "Piety and Joy in God" }
        }
      ]
    },

    terang: {
      idKey: "terang",
      name: { id: "Peristiwa Terang", en: "Luminous Mysteries" },
      days: { id: "Kamis", en: "Thursday" },
      accentColor: "#eab308", // Golden yellow accent
      decades: [
        {
          num: "I",
          roman: "I",
          title: {
            id: "Baptisan Yesus di Sungai Yordan",
            en: "The Baptism of Jesus in the Jordan"
          },
          shortTitle: {
            id: "Baptisan Yesus",
            en: "Baptism in Jordan"
          },
          scripture: {
            ref: "Matius 3:13-17",
            text: {
              id: "\"Lalu terdengarlah suara dari surga yang mengatakan: 'Inilah Anak-Ku yang terkasih, kepada-Nyalah Aku berkenan.'\"",
              en: "\"And lo a voice from heaven, saying, This is my beloved Son, in whom I am well pleased.\""
            }
          },
          fruit: { id: "Keterbukaan pada Roh Kudus", en: "Openness to the Holy Spirit" }
        },
        {
          num: "II",
          roman: "II",
          title: {
            id: "Mukjizat Pertama di Perkawinan Kana",
            en: "The Wedding at Cana"
          },
          shortTitle: {
            id: "Perkawinan di Kana",
            en: "Wedding at Cana"
          },
          scripture: {
            ref: "Yohanes 2:1-11",
            text: {
              id: "\"Tetapi ibu Yesus berkata kepada pelayan-pelayan: 'Apa yang dikatakan-Nya kepadamu, buatlah itu!'\"",
              en: "\"His mother saith unto the servants, Whatsoever he saith unto you, do it.\""
            }
          },
          fruit: { id: "Percaya Penuh kepada Yesus melalui Maria", en: "To Jesus through Mary" }
        },
        {
          num: "III",
          roman: "III",
          title: {
            id: "Pemberitaan Kerajaan Allah dan Seruan Pertobatan",
            en: "The Proclamation of the Kingdom of God"
          },
          shortTitle: {
            id: "Pemberitaan Kerajaan Allah",
            en: "Proclamation of Kingdom"
          },
          scripture: {
            ref: "Markus 1:14-15",
            text: {
              id: "\"Waktunya telah genap; Kerajaan Allah sudah dekat. Bertobatlah dan percayalah kepada Injil!\"",
              en: "\"The time is fulfilled, and the kingdom of God is at hand: repent ye, and believe the gospel.\""
            }
          },
          fruit: { id: "Pertobatan Hati & Pengampunan", en: "Repentance and Trust in God" }
        },
        {
          num: "IV",
          roman: "IV",
          title: {
            id: "Transfigurasi Yesus di Atas Gunung",
            en: "The Transfiguration of Jesus"
          },
          shortTitle: {
            id: "Transfigurasi Yesus",
            en: "The Transfiguration"
          },
          scripture: {
            ref: "Matius 17:1-8",
            text: {
              id: "\"Lalu Yesus berubah rupa di depan mata mereka; wajah-Nya bercahaya seperti matahari dan pakaian-Nya menjadi putih bersinar seperti terang.\"",
              en: "\"And was transfigured before them: and his face did shine as the sun, and his raiment was white as the light.\""
            }
          },
          fruit: { id: "Kerinduan akan Kekudusan", en: "Desire for Holiness" }
        },
        {
          num: "V",
          roman: "V",
          title: {
            id: "Penetapan Sakramen Ekaristi Mahakudus",
            en: "The Institution of the Holy Eucharist"
          },
          shortTitle: {
            id: "Penetapan Ekaristi",
            en: "Institution of Eucharist"
          },
          scripture: {
            ref: "Lukas 22:19-20",
            text: {
              id: "\"Inilah tubuh-Ku yang diserahkan bagi kamu; perbuatlah ini menjadi peringatan akan Aku!\"",
              en: "\"This is my body which is given for you: this do in remembrance of me.\""
            }
          },
          fruit: { id: "Cinta Mendalam pada Ekaristi", en: "Eucharistic Adoration" }
        }
      ]
    },

    sedih: {
      idKey: "sedih",
      name: { id: "Peristiwa Sedih", en: "Sorrowful Mysteries" },
      days: { id: "Selasa & Jumat", en: "Tuesday & Friday" },
      accentColor: "#ef4444", // Crimson Red accent
      decades: [
        {
          num: "I",
          roman: "I",
          title: {
            id: "Yesus Berdoa di Taman Getsemani",
            en: "The Agony in the Garden of Gethsemane"
          },
          shortTitle: {
            id: "Doa di Getsemani",
            en: "Agony in Garden"
          },
          scripture: {
            ref: "Matius 26:36-46",
            text: {
              id: "\"Ya Bapa-Ku, jikalau sekiranya mungkin, biarlah cawan ini lalu dari pada-Ku, tetapi janganlah seperti yang Kukehendaki, melainkan seperti yang Engkau kehendaki.\"",
              en: "\"O my Father, if it be possible, let this cup pass from me: nevertheless not as I will, but as thou wilt.\""
            }
          },
          fruit: { id: "Penyesalan atas Dosa", en: "Sorrow for Sin" }
        },
        {
          num: "II",
          roman: "II",
          title: {
            id: "Yesus Didera di Hadapan Pilatus",
            en: "The Scourging at the Pillar"
          },
          shortTitle: {
            id: "Yesus Didera",
            en: "The Scourging"
          },
          scripture: {
            ref: "Yohanes 19:1",
            text: {
              id: "\"Lalu Pilatus mengambil Yesus dan menyuruh orang menyesah Dia.\"",
              en: "\"Then Pilate therefore took Jesus, and scourged him.\""
            }
          },
          fruit: { id: "Kemurnian Hati & Pengendalian Diri", en: "Purity and Mortification" }
        },
        {
          num: "III",
          roman: "III",
          title: {
            id: "Yesus Dimahkotai Duri",
            en: "The Crowning with Thorns"
          },
          shortTitle: {
            id: "Dimahkotai Duri",
            en: "Crowning with Thorns"
          },
          scripture: {
            ref: "Matius 27:27-31",
            text: {
              id: "\"Mereka menganyam sebuah mahkota duri dan menaruhnya di atas kepala-Nya, lalu memberikan Dia sebatang buluh di tangan kanan-Nya.\"",
              en: "\"And when they had platted a crown of thorns, they put it upon his head, and a reed in his right hand.\""
            }
          },
          fruit: { id: "Ketabahan Menghadapi Penghinaan", en: "Courage and Moral Strength" }
        },
        {
          num: "IV",
          roman: "IV",
          title: {
            id: "Yesus Memanggul Salib-Nya ke Kalvari",
            en: "The Carrying of the Cross"
          },
          shortTitle: {
            id: "Memanggul Salib",
            en: "Carrying of the Cross"
          },
          scripture: {
            ref: "Lukas 23:26-32",
            text: {
              id: "\"Sambil memikul salib-Nya Ia pergi ke luar ke tempat yang bernama Tempat Tengkorak, dalam bahasa Ibrani: Golgota.\"",
              en: "\"And he bearing his cross went forth into a place called the place of a skull, which is called in the Hebrew Golgotha.\""
            }
          },
          fruit: { id: "Kesabaran Memikul Salib Hidup", en: "Patience in Suffering" }
        },
        {
          num: "V",
          roman: "V",
          title: {
            id: "Yesus Wafat di Kayu Salib",
            en: "The Crucifixion and Death of Jesus"
          },
          shortTitle: {
            id: "Wafat di Salib",
            en: "The Crucifixion"
          },
          scripture: {
            ref: "Lukas 23:44-46",
            text: {
              id: "\"Lalu Yesus berseru dengan suara nyaring: 'Ya Bapa, ke dalam tangan-Mu Kuserahkan nyawa-Ku.' Dan sesudah berkata demikian Ia menyerahkan nyawa-Nya.\"",
              en: "\"And when Jesus had cried with a loud voice, he said, Father, into thy hands I commend my spirit: and having said thus, he gave up the ghost.\""
            }
          },
          fruit: { id: "Pengorbanan & Pengampunan Kasih", en: "Self-Sacrifice and Forgiveness" }
        }
      ]
    },

    mulia: {
      idKey: "mulia",
      name: { id: "Peristiwa Mulia", en: "Glorious Mysteries" },
      days: { id: "Rabu & Minggu", en: "Wednesday & Sunday" },
      accentColor: "#a855f7", // Royal Purple / Gold accent
      decades: [
        {
          num: "I",
          roman: "I",
          title: {
            id: "Yesus Bangkit dari Antara Orang Mati",
            en: "The Resurrection of Jesus"
          },
          shortTitle: {
            id: "Kebangkitan Yesus",
            en: "The Resurrection"
          },
          scripture: {
            ref: "Matius 28:1-10",
            text: {
              id: "\"Ia tidak ada di sini, sebab Ia telah bangkit, sama seperti yang telah dikatakan-Nya. Mari, lihatlah tempat Ia berbaring.\"",
              en: "\"He is not here: for he is risen, as he said. Come, see the place where the Lord lay.\""
            }
          },
          fruit: { id: "Iman yang Teguh", en: "Faith" }
        },
        {
          num: "II",
          roman: "II",
          title: {
            id: "Yesus Naik ke Surga",
            en: "The Ascension of Jesus into Heaven"
          },
          shortTitle: {
            id: "Kenaikan ke Surga",
            en: "The Ascension"
          },
          scripture: {
            ref: "Kisah Para Rasul 1:6-11",
            text: {
              id: "\"Sesudah Ia mengatakan demikian, terangkatlah Ia disaksikan oleh mereka, dan awan menutup-Nya dari pandangan mereka.\"",
              en: "\"And when he had spoken these things, while they beheld, he was taken up; and a cloud received him out of their sight.\""
            }
          },
          fruit: { id: "Pengharapan akan Surga", en: "Hope and Desire for Heaven" }
        },
        {
          num: "III",
          roman: "III",
          title: {
            id: "Roh Kudus Turun atas Para Rasul",
            en: "The Descent of the Holy Spirit (Pentecost)"
          },
          shortTitle: {
            id: "Turunnya Roh Kudus",
            en: "Descent of Holy Spirit"
          },
          scripture: {
            ref: "Kisah Para Rasul 2:1-4",
            text: {
              id: "\"Maka penuhlah mereka dengan Roh Kudus, lalu mereka mulai berkata-kata dalam bahasa-bahasa lain, seperti yang diberikan oleh Roh itu kepada mereka untuk mengatakannya.\"",
              en: "\"And they were all filled with the Holy Ghost, and began to speak with other tongues, as the Spirit gave them utterance.\""
            }
          },
          fruit: { id: "Kasih & Karunia Roh Kudus", en: "Love of God and Zeal" }
        },
        {
          num: "IV",
          roman: "IV",
          title: {
            id: "Maria Diangkat ke Surga",
            en: "The Assumption of the Blessed Virgin Mary"
          },
          shortTitle: {
            id: "Maria Diangkat ke Surga",
            en: "The Assumption"
          },
          scripture: {
            ref: "Wahyu 12:1",
            text: {
              id: "\"Maka tampaklah suatu tanda besar di langit: Seorang perempuan berselubungkan matahari, dengan bulan di bawah kakinya dan sebuah mahkota dari dua belas bintang di atas kepalanya.\"",
              en: "\"And there appeared a great wonder in heaven; a woman clothed with the sun, and the moon under her feet, and upon her head a crown of twelve stars.\""
            }
          },
          fruit: { id: "Rahmat Kematian yang Bahagia", en: "Grace of a Happy Death" }
        },
        {
          num: "V",
          roman: "V",
          title: {
            id: "Maria Dimahkotai di Surga sebagai Ratu Semesta Alam",
            en: "The Coronation of Mary as Queen of Heaven"
          },
          shortTitle: {
            id: "Maria Dimahkotai",
            en: "The Coronation"
          },
          scripture: {
            ref: "Lukas 1:48-49",
            text: {
              id: "\"Sesungguhnya, mulai dari sekarang segala keturunan akan menyebut aku berbahagia, karena Yang Mahakuasa telah melakukan perbuatan-perbuatan besar kepadaku dan nama-Nya adalah kudus.\"",
              en: "\"For behold, from henceforth all generations shall call me blessed. For he that is mighty hath done to me great things; and holy is his name.\""
            }
          },
          fruit: { id: "Devosi Sejati kepada Santa Perawan Maria", en: "Trust in Mary's Intercession" }
        }
      ]
    }
  }
};
