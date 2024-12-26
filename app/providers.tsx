'use client'

import { useEffect, useLayoutEffect } from 'react'

// 创建一个安全的 useLayoutEffect
const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect

export function Providers({ children }: { children: React.ReactNode }) {
    // 使用 useLayoutEffect 在 DOM 更新之前移除类名
    useIsomorphicLayoutEffect(() => {
        // 立即移除类名
        document.body.classList.remove('vsc-initialized')

        // 创建一个观察器来处理动态添加的类名
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                    document.body.classList.remove('vsc-initialized')
                }
            })
        })

        // 开始观察 body 元素的属性变化
        observer.observe(document.body, {
            attributes: true,
            attributeFilter: ['class']
        })

        // 清理函数
        return () => observer.disconnect()
    }, [])

    return <>{children}</>
} 