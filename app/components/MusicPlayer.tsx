"use client"

import { useState, useEffect, useRef } from 'react'
import styles from './MusicPlayer.module.css'

interface MusicPlayerProps {
  audioSrc: string
}

export default function MusicPlayer({ audioSrc }: MusicPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [volume, setVolume] = useState(0.5)
  const [error, setError] = useState<string | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)

  useEffect(() => {
    try {
      // 创建音频元素
      audioRef.current = new Audio(audioSrc)
      audioRef.current.loop = true
      audioRef.current.volume = volume

      // 添加错误处理
      audioRef.current.onerror = (e) => {
        console.error('Audio error:', e)
        setError('音频加载失败')
      }

      // 监听用户交互
      const handleInteraction = () => {
        if (audioRef.current && !isPlaying) {
          audioRef.current.play().catch(err => {
            console.error('Playback failed:', err)
            setError('播放失败')
          })
          setIsPlaying(true)
        }
        document.removeEventListener('click', handleInteraction)
      }

      document.addEventListener('click', handleInteraction)

      return () => {
        document.removeEventListener('click', handleInteraction)
        if (audioRef.current) {
          audioRef.current.pause()
          audioRef.current = null
        }
      }
    } catch (err) {
      console.error('Setup failed:', err)
      setError('初始化失败')
    }
  }, [audioSrc])

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume
    }
  }, [volume])

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        audioRef.current.play().catch(err => {
          console.error('Playback failed:', err)
          setError('播放失败')
        })
      }
      setIsPlaying(!isPlaying)
    }
  }

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value)
    setVolume(newVolume)
  }

  if (error) {
    return (
      <div className={styles.musicPlayer}>
        <button 
          className={`${styles.playButton} ${styles.error}`}
          title={error}
        >
          ❌
        </button>
      </div>
    )
  }

  return (
    <div className={styles.musicPlayer}>
      <button 
        onClick={togglePlay}
        className={styles.playButton}
        aria-label={isPlaying ? '暂停音乐' : '播放音乐'}
      >
        {isPlaying ? '🔊' : '🔇'}
      </button>
      <div className={styles.volumeControl}>
        <input
          type="range"
          min="0"
          max="1"
          step="0.1"
          value={volume}
          onChange={handleVolumeChange}
          className={styles.volumeSlider}
        />
      </div>
    </div>
  )
} 