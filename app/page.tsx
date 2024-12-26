import { Inter } from 'next/font/google'
import styles from './page.module.css'
import PhotoShowcase from './components/PhotoShowcase'
import Image from 'next/image'
// import fs from 'fs'
// import path from 'path'
// import MusicPlayer from './components/MusicPlayer'  // Uncomment when needed

const inter = Inter({ subsets: ['latin'] })

// 将 getAllPhotos 改为静态数据
const PHOTO_DATA = {
  Spring: Array.from({ length: 13 }, (_, i) => ({
    id: i + 1,
    src: `/photos/Spring/spring_${i + 1}.jpg`
  })),
  Summer: Array.from({ length: 48 }, (_, i) => ({
    id: i + 14,
    src: `/photos/Summer/summer_${i + 1}.jpg`
  })),
  Autumn: Array.from({ length: 20 }, (_, i) => ({
    id: i + 62,
    src: `/photos/Autumn/autumn_${i + 1}.jpg`
  })),
  Winter: Array.from({ length: 23 }, (_, i) => ({
    id: i + 82,
    src: `/photos/Winter/winter_${i + 1}.jpg`
  }))
}

// 获取所有照片
const getAllPhotos = () => {
  return [
    ...PHOTO_DATA.Spring,
    ...PHOTO_DATA.Summer,
    ...PHOTO_DATA.Autumn,
    ...PHOTO_DATA.Winter
  ]
}

// 使用所有照片
const allPhotos = getAllPhotos()

// 使用固定的选择方法（用于精选展示）
const getSelectedPhotos = (count: number) => {
  return allPhotos.slice(0, count)
}

// 获取8张照片用于精选展示
const featuredPhotos = getSelectedPhotos(8).map(photo => ({
  ...photo,
  title: photo.src.split('/').pop()?.split('.')[0] || '',
  season: photo.src.includes('Spring') ? 'Spring' :
    photo.src.includes('Summer') ? 'Summer' :
      photo.src.includes('Autumn') ? 'Autumn' : 'Winter'
}))

export default function Home() {
  return (
    <main className={styles.main}>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={styles.sonyLogo}>α</div>
          <h1 className={`${inter.className} ${styles.title}`}>
            2024
            <span className={styles.subtitle}>MOMENTS IN FRAME</span>
          </h1>
          <div className={styles.cameraInfo}>
            <span className={styles.model}>α7 III</span>
            <span className={styles.divider}></span>
            <span className={styles.specs}>24.2 MP</span>
            <span className={styles.divider}></span>
            <span className={styles.specs}>Full-Frame</span>
          </div>
          <div className={styles.developerInfo}>
            <span className={styles.developerLabel}>开发者</span>
            <span className={styles.developerName}>云端上见你</span>
          </div>
        </div>
      </section>

      {/* Technical Specs Section */}
      <section className={styles.techSpecs}>
        <div className={styles.specGrid}>
          <div className={styles.specItem}>
            <span className={styles.specLabel}>CAMERA EVOLUTION</span>
            <span className={styles.specValue}>ZV-1 → α7 III</span>
          </div>
          <div className={styles.specItem}>
            <span className={styles.specLabel}>FAVORITE LENS</span>
            <span className={styles.specValue}>Sonnar T* FE 55mm F1.8 ZA</span>
          </div>
          <div className={styles.specItem}>
            <span className={styles.specLabel}>PHOTOS TAKEN</span>
            <span className={styles.specValue}>2,024+</span>
          </div>
        </div>
      </section>

      {/* Gallery Grid - 使用精选照片 */}
      <section className={styles.gallerySection}>
        <h2 className={`${inter.className} ${styles.galleryTitle}`}>
          <span className={styles.yearLabel}>2024</span>
          精选摄影作品
        </h2>
        <div className={styles.galleryGrid}>
          {featuredPhotos.map((photo) => (
            <div key={photo.id} className={styles.photoCard}>
              <div className={styles.photoPlaceholder}>
                <Image
                  src={photo.src}
                  alt={`Photo ${photo.id}`}
                  fill
                  style={{ objectFit: 'cover' }}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 使用新的PhotoShowcase组件 */}
      <PhotoShowcase photos={allPhotos} />

      {/* 当音频文件准备好后取消注释 */}
      {/* <MusicPlayer audioSrc="/music/background.mp3" /> */}
    </main>
  )
}