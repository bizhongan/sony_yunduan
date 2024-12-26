"use client"

import { useState, useEffect } from 'react'
import Image from 'next/image'
import styles from '../page.module.css'

interface Photo {
  id: string;
  url: string;
}

export default function GalleryGrid({ photos }: { photos: Photo[] }) {
  const [randomPhotos, setRandomPhotos] = useState<Photo[]>([])

  useEffect(() => {
    const shuffled = [...photos].sort(() => 0.5 - Math.random())
    setRandomPhotos(shuffled.slice(0, 6))
  }, [photos])

  return (
    <div className={styles.galleryGrid}>
      {randomPhotos.map((photo) => (
        <div key={photo.id} className={styles.photoCard}>
          <div className={styles.photoPlaceholder}>
            <Image
              src={photo.url}
              alt={`Photo ${photo.id}`}
              fill
              style={{ objectFit: 'cover' }}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        </div>
      ))}
    </div>
  )
} 