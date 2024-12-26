# 摄影作品展示网站

基于 Next.js 14 开发的个人摄影作品展示网站，采用现代化的设计风格和流畅的交互体验。

## 技术栈

- **框架**: Next.js 14
- **语言**: TypeScript
- **样式**: CSS Modules
- **图片优化**: next/image
- **字体优化**: next/font
- **部署**: Vercel

## 主要功能

- 响应式设计，适配各种设备
- 图片轮播展示
- 照片技术参数展示
- 渐变动画效果
- 图片懒加载优化
- 服务端渲染(SSR)

## 项目结构

```plaintext
├── app/
│   ├── components/
│   │   └── PhotoShowcase.tsx    # 照片展示组件
│   ├── page.tsx                 # 主页面
│   └── page.module.css          # 样式文件
├── public/
│   └── photos/                  # 照片资源目录
└── next.config.js              # Next.js 配置文件
```

## 开始使用

1. 克隆项目:
```bash
git clone [your-repository-url]
```

2. 安装依赖:
```bash
npm install
# 或
yarn install
```

3. 运行开发服务器:
```bash
npm run dev
# 或
yarn dev
```

4. 在浏览器中打开 [http://localhost:3000](http://localhost:3000)

## 添加照片

1. 在 `public/photos` 目录下添加照片
2. 在 `app/page.tsx` 中的 `photos` 数组中添加照片信息:

```typescript
const photos = [
  {
    id: 1,
    src: '/photos/your-photo.jpg',
    title: '照片标题',
    date: '拍摄日期',
    description: '照片描述',
    camera: '相机型号',
    lens: '镜头信息',
    settings: {
      aperture: '光圈值',
      shutterSpeed: '快门速度',
      iso: 'ISO值'
    }
  }
]
```

## 自定义样式

- 主要样式文件位于 `app/page.module.css`
- 支持自定义主题色、动画效果和布局

## 部署

项目可以轻松部署到 Vercel 平台：

1. 将代码推送到 GitHub
2. 在 Vercel 中导入项目
3. 自动部署完成

## 注意事项

- 确保添加的图片尺寸适中，建议宽度在 1200px 左右
- 如果使用外部图片源，需要在 `next.config.js` 中配置 `images.domains`
- 开发时注意 TypeScript 类型检查

## 贡献

欢迎提交 Issue 和 Pull Request！

## 许可

MIT License

## 如何替换照片

### 1. 照片目录结构
将你的照片放在 `public/photos` 目录下，按季节分类：
```
public/
  └── photos/
      ├── Spring/
      ├── Summer/
      ├── Autumn/
      └── Winter/
```

### 2. 照片命名
使用提供的重命名脚本处理照片：

```bash
# 运行重命名脚本
node scripts/renamePhotos.js
```

这会自动将照片重命名为如下格式：
- Spring: spring_1.jpg, spring_2.jpg, ...
- Summer: summer_1.jpg, summer_2.jpg, ...
- Autumn: autumn_1.jpg, autumn_2.jpg, ...
- Winter: winter_1.jpg, winter_2.jpg, ...

### 3. 修改照片配置
在 `app/page.tsx` 中修改 `PHOTO_DATA` 对象：

```typescript
const PHOTO_DATA = {
  Spring: Array.from({ length: 你的春季照片数量 }, (_, i) => ({
    id: i + 1,
    src: `/photos/Spring/spring_${i + 1}.jpg`
  })),
  Summer: Array.from({ length: 你的夏季照片数量 }, (_, i) => ({
    id: i + 14,  // ID 可以根据需要调整
    src: `/photos/Summer/summer_${i + 1}.jpg`
  })),
  Autumn: Array.from({ length: 你的秋季照片数量 }, (_, i) => ({
    id: i + 62,
    src: `/photos/Autumn/autumn_${i + 1}.jpg`
  })),
  Winter: Array.from({ length: 你的冬季照片数量 }, (_, i) => ({
    id: i + 82,
    src: `/photos/Winter/winter_${i + 1}.jpg`
  }))
}
```

### 4. 优化照片（可选）
使用提供的优化脚本处理照片：

```bash
# 安装依赖
npm install sharp

# 运行优化脚本
node scripts/optimizeImages.js
```

这会：
- 调整照片尺寸（默认最大宽度 1920px）
- 转换为 WebP 格式
- 优化质量（默认 85%）

### 5. 调整展示参数

#### 轮播图配置
在 `app/components/PhotoShowcase.tsx` 中：
- `interval`: 轮播间隔时间（默认 5000ms）
- `quality`: 图片质量（默认 85）
- `sizes`: 响应式图片尺寸

```typescript
<Image
    src={photos[currentIndex].src}
    alt={`Photo ${currentIndex + 1}`}
    fill
    priority={currentIndex === 0}
    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
    quality={85}
    style={{ objectFit: 'contain' }}
/>
```

#### 网格展示配置
在 `app/page.tsx` 中：
```typescript
// 修改精选照片数量
const featuredPhotos = getSelectedPhotos(8)  // 8 为展示数量
```

### 6. 照片尺寸建议
- 最小宽度: 1200px
- 最大宽度: 1920px
- 推荐比例: 3:2 或 16:9
- 格式: JPG 或 PNG
- 色彩空间: sRGB

### 7. 性能优化建议
- 使用 WebP 格式
- 压缩图片大小（建议单张不超过 500KB）
- 使用统一的图片尺寸
- 保持合适的图片质量（建议 80-85）

### 8. 注意事项
- 确保照片命名不包含特殊字符
- 保持照片分类目录结构
- 建议使用相同比例的照片
- 注意版权问题

需要更多帮助，请查看 [Issues](https://github.com/your-repo/issues)。

## 阿里云 OSS 配置

本项目使用阿里云 OSS 存储图片，以提高访问速度和性能。

### 1. OSS 配置步骤

1. 创建阿里云 OSS Bucket：
   ```bash
   - 登录阿里云控制台
   - 创建 Bucket（例如：your-bucket-name）
   - 选择区域（例如：oss-cn-hangzhou）
   - 设置读写权限为"公共读"
   ```

2. 上传图片到 OSS：
   - 在 Bucket 中创建 photos 目录
   - 按季节创建子目录：Spring、Summer、Autumn、Winter
   - 上传照片并按格式命名：
     ```
     photos/
     ├── Spring/
     │   ├── spring_1.jpg
     │   ├── spring_2.jpg
     │   └── ...
     ├── Summer/
     │   ├── summer_1.jpg
     │   └── ...
     └── ...
     ```

3. 配置文件类型：
   ```bash
   在 Bucket 基础设置中添加：
   *.jpg -> image/jpeg
   *.jpeg -> image/jpeg
   *.png -> image/png
   ```

### 2. 替换为自己的图片

1. 修改 `app/page.tsx` 中的 OSS 配置：
   ```typescript
   const PHOTO_DATA = {
     Spring: Array.from({ length: 你的春季照片数量 }, (_, i) => ({
       id: i + 1,
       src: `https://你的bucket名称.oss-cn-地域.aliyuncs.com/photos/Spring/spring_${i + 1}.jpg`
     })),
     Summer: Array.from({ length: 你的夏季照片数量 }, (_, i) => ({
       id: i + 14,
       src: `https://你的bucket名称.oss-cn-地域.aliyuncs.com/photos/Summer/summer_${i + 1}.jpg`
     })),
     // ... 秋季和冬季照片配置
   }
   ```

2. 修改 `next.config.js` 中的域名配置：
   ```javascript
   const nextConfig = {
     images: {
       remotePatterns: [
         {
           protocol: 'https',
           hostname: '你的bucket名称.oss-cn-地域.aliyuncs.com',
         },
       ],
     },
   }
   ```

3. 修改背景图片（可选）：
   在 `app/page.module.css` 中更新 hero 背景：
   ```css
   .hero {
     background: linear-gradient(
       rgba(0, 0, 0, 0.5),
       rgba(0, 0, 0, 0.7)
     ),
     url('https://你的bucket名称.oss-cn-地域.aliyuncs.com/photos/Winter/winter_1.jpg') center/cover no-repeat fixed;
   }
   ```

### 3. 图片要求

- 最小宽度: 1200px
- 最大宽度: 1920px
- 推荐比例: 3:2 或 16:9
- 格式: JPG 或 PNG
- 单张大小: 建议不超过 500KB
- 命名规则: 必须按照 season_number.jpg 格式

### 4. 性能优化

1. 图片压缩：
   ```bash
   # 安装依赖
   npm install sharp

   # 运行优化脚本
   node scripts/optimizeImages.js
   ```

2. CDN 加速（可选）：
   - 在阿里云 OSS 中开启 CDN 加速
   - 配置 CDN 缓存规则
   - 使用 CDN 域名替换 OSS 域名

### 5. 注意事项

- 确保所有图片都是公开可访问的
- 保持图片命名规则一致
- 建议使用相同尺寸的图片
- 定期检查 OSS 存储费用
- 建议开启图片处理服务
