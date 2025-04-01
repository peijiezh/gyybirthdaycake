请创建一个交互式生日卡片HTML网页，具有以下功能和特性：

总体需求：

初始界面显示一个可点击的信封
点击信封后，使用Three.js显示3D生日蛋糕模型和生日祝福信息
整个页面应该是响应式的，适应不同屏幕尺寸
初始信封界面：

创建一个宽300px、高200px的粉色信封（颜色代码：#ff9999）
信封上方有一个折叠的三角形翻盖（使用CSS ::before实现）
信封居中显示&amp;quot;Click to Open&amp;quot;文本
信封悬停时有轻微放大效果（transform: scale(1.05)）
背景为渐变色（从#f5f7fa到#c3cfe2）
3D场景实现：

使用Three.js创建3D场景、相机和渲染器
添加OrbitControls以实现交互式旋转和缩放功能
场景需包含环境光和定向光以正确照亮蛋糕
场景背景与页面背景保持一致
蛋糕模型细节：

三层蛋糕结构：

底层：直径4（半径2）、高0.5的圆柱体，颜色为#ffcc99
中层：直径3（半径1.5）、高0.5的圆柱体，颜色为#ff99cc
顶层：直径2（半径1）、高0.5的圆柱体，颜色为#ff6666
白色糖霜装饰：

每层蛋糕边缘添加环形（Torus）几何体作为糖霜
糖霜颜色为白色(#ffffff)
蜡烛：

在蛋糕顶部添加5根蜡烛（中间1根，周围4根呈十字形排列）
每根蜡烛为细长的白色圆柱体
每根蜡烛顶部有一个发光的橙色小球作为火焰（带有发光属性）
装饰细节：

在蛋糕表面随机分布约20个彩色小球装饰
装饰球使用多种颜色（红、绿、蓝、黄、紫、青）
动画与交互：

蛋糕应以慢速持续旋转（Y轴每帧旋转0.005弧度）
实现窗口大小变化时的自适应调整
使用OrbitControls允许用户用鼠标拖动来旋转视角和缩放
祝福信息区域：

在3D场景右侧显示一个宽300px的白色卡片
卡片包含&amp;quot;Happy Birthday!&amp;quot;标题和约200字的生日祝福文本
卡片应有圆角和阴影效果
文本应包含对寿星高媛媛的美好祝愿，格式为3段短文
技术要求：

使用最新版本的Three.js库
确保代码结构清晰，有适当的注释
实现点击信封到显示3D场景的平滑过渡
所有内容使用HTML/CSS/JavaScript实现，不依赖其他库
请提供完整的HTML代码，包含所有必要的CSS和JavaScript。



# Interactive Birthday Card

An interactive 3D birthday card created with HTML, CSS, JavaScript, and Three.js.

## Features

- Initial interface with a clickable pink envelope
- Confetti effect when the envelope is clicked
- 3D birthday cake model created with Three.js
- Interactive controls to rotate and zoom the cake
- Responsive design for different screen sizes
- Birthday wishes message

## How to Use

1. Open `index.html` in a web browser
2. Click on the envelope to open it
3. Enjoy the interactive 3D birthday cake and birthday wishes
4. You can rotate and zoom the cake using mouse controls:
   - Left-click and drag to rotate the view
   - Scroll to zoom in and out

## Technical Implementation

- **HTML/CSS**: For the envelope design and layout
- **JavaScript**: For event handling and animations
- **Three.js**: For creating and rendering the 3D cake model
- **OrbitControls**: For interactive rotation and zooming

## File Structure

- `index.html`: Main HTML file
- `styles.css`: CSS styles for the envelope and layout
- `script.js`: JavaScript code for Three.js implementation and interactions

## Credits

This birthday card was created as a special gift for Gao YuanYuan.

## Requirements

- Modern web browser with JavaScript enabled
- WebGL support for Three.js rendering

## License

This project is for personal use only.