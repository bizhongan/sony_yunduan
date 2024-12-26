"use client"

import { useState, useEffect } from 'react'
import Image from 'next/image'
import styles from './PhotoShowcase.module.css'

interface Photo {
    id: number
    src: string
}

export default function PhotoShowcase({ photos }: { photos: Photo[] }) {
    const [currentIndex, setCurrentIndex] = useState(() => 0)
    const [mounted, setMounted] = useState(false)
    const [imageLoading, setImageLoading] = useState(true)

    useEffect(() => {
        setMounted(true)
    }, [])

    useEffect(() => {
        if (!mounted) return
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % photos.length)
        }, 5000)
        return () => clearInterval(timer)
    }, [photos.length, mounted])

    if (!mounted) return null

    const handlePrev = () => {
        setImageLoading(true)
        setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length)
    }

    const handleNext = () => {
        setImageLoading(true)
        setCurrentIndex((prev) => (prev + 1) % photos.length)
    }

    return (
        <div className={styles.photoShowcase}>
            <div className={styles.photoContainer}>
                <button
                    onClick={handlePrev}
                    className={`${styles.navButton} ${styles.prevButton}`}
                    aria-label="Previous photo"
                >
                    ←
                </button>

                <div className={styles.photoWrapper}>
                    {imageLoading && <div className={styles.skeleton} />}
                    <Image
                        src={photos[currentIndex].src}
                        alt={`Photo ${currentIndex + 1} of ${photos.length}`}
                        fill
                        priority={currentIndex === 0}
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        quality={85}
                        onLoadingComplete={() => setImageLoading(false)}
                        style={{
                            objectFit: 'contain',
                            opacity: imageLoading ? 0 : 1,
                            transition: 'opacity 0.3s ease-in-out'
                        }}
                    />
                </div>

                <button
                    onClick={handleNext}
                    className={`${styles.navButton} ${styles.nextButton}`}
                    aria-label="Next photo"
                >
                    →
                </button>
            </div>

            <div className={styles.infoPanel}>
                <div className={styles.cameraInfo}>
                    <h3>器材</h3>
                    <div>Sony α7 III</div>
                    <div>Sonnar T* FE 55mm F1.8 ZA</div>
                </div>
                <div className={styles.photographerNote}>
                    <div>
                        22年的那个夏天，我拥有了第一台微单，卖掉了索尼zv1，我拿到了这台a7m3，我拍下了一些生活的轨迹。
                        我没有去天南海北，也没有为了拍而拍。每一张照片都有我的回忆，那个夏天最美好的回忆，这是属于我的黄金时代，
                        我将继续记录下去，我将继续生活着。
                    </div>
                    <div>
                        虽然想说些漂亮话，但本人实在是才疏学浅，用Chessboard中的一句话来表示则是：
                        你努力生活的证明，日积月累将能长成苍天大树。
                    </div>
                    <div className={styles.quote}>
                        <div>
                            在这名为人生的棋盘上，24已缓缓落子，25正徐徐开局。这次在这棋格上又会迎来什么样的事情呢？我和你一起记录吧
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
} 