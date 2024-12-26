'use client'

import { useEffect, useRef, useState } from 'react'
import styles from './AudioPlayer.module.css'

export default function AudioPlayer() {
    const audioRef = useRef<HTMLAudioElement>(null)
    const [isPlaying, setIsPlaying] = useState(true)  // 默认为播放状态

    useEffect(() => {
        const initAudio = async () => {
            try {
                if (audioRef.current) {
                    audioRef.current.volume = 0.3  // 设置适中的音量
                    const playPromise = audioRef.current.play()

                    if (playPromise !== undefined) {
                        await playPromise
                        console.log('Auto-play successful')
                    }
                }
            } catch (error) {
                console.log('Auto-play failed:', error)
                setIsPlaying(false)
            }
        }

        initAudio()

        return () => {
            if (audioRef.current) {
                audioRef.current.pause()
            }
        }
    }, [])

    const togglePlay = async () => {
        if (!audioRef.current) return

        if (isPlaying) {
            audioRef.current.pause()
            setIsPlaying(false)
        } else {
            try {
                await audioRef.current.play()
                setIsPlaying(true)
            } catch (error) {
                console.error('Play failed:', error)
            }
        }
    }

    return (
        <>
            <audio
                ref={audioRef}
                src="/audio/background.mp3"
                loop
                preload="auto"
            />
            <button
                onClick={togglePlay}
                className={styles.musicButton}
                data-playing={isPlaying}
                title={isPlaying ? "暂停背景音乐" : "播放背景音乐"}
            >
                {isPlaying ? "♫" : "♪"}
            </button>
        </>
    )
} 