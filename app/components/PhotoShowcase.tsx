"use client"

import { useState, useEffect, useCallback } from 'react'
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
    const [preloadedImages, setPreloadedImages] = useState<Set<string>>(new Set())

    // 预加载下一张图片
    const preloadNextImage = useCallback((index: number) => {
        if (typeof window === 'undefined') return; // 确保在浏览器环境中

        const nextIndex = (index + 1) % photos.length
        const nextSrc = photos[nextIndex].src

        if (!preloadedImages.has(nextSrc)) {
            const img = new window.Image()  // 使用 window.Image
            img.src = nextSrc
            setPreloadedImages(prev => new Set(prev).add(nextSrc))
        }
    }, [photos, preloadedImages])

    useEffect(() => {
        setMounted(true)
    }, [])

    useEffect(() => {
        if (!mounted) return

        // 预加载下一张图片
        preloadNextImage(currentIndex)

        const timer = setInterval(() => {
            setCurrentIndex(prev => {
                const nextIndex = (prev + 1) % photos.length
                preloadNextImage(nextIndex)
                return nextIndex
            })
        }, 6000)  // 改为 6 秒

        // 清理定时器
        return () => {
            clearInterval(timer)
        }
    }, [currentIndex, photos.length, mounted, preloadNextImage])

    const handleImageLoad = useCallback(() => {
        setImageLoading(false)
        // 当前图片加载完成后预加载下一张
        preloadNextImage(currentIndex)
    }, [currentIndex, preloadNextImage])

    if (!mounted) return null

    const handlePrev = () => {
        setImageLoading(true)
        const newIndex = (currentIndex - 1 + photos.length) % photos.length
        setCurrentIndex(newIndex)
        // 预加载上一张的上一张
        preloadNextImage((newIndex - 1 + photos.length) % photos.length)
    }

    const handleNext = () => {
        setImageLoading(true)
        const newIndex = (currentIndex + 1) % photos.length
        setCurrentIndex(newIndex)
        // 预加载下一张的下一张
        preloadNextImage((newIndex + 1) % photos.length)
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
                        onLoadingComplete={handleImageLoad}
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