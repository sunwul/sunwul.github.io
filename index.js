
/**
 * 侧边栏导航交互逻辑
 * 功能：点击菜单项切换右侧 iframe 内容，并更新激活状态
 */

document.addEventListener('DOMContentLoaded', () => {
    const navItems = document.querySelectorAll('.nav-item');
    const contentFrame = document.getElementById('content-frame');
    const pageTitle = document.getElementById('page-title');
    const loader = document.getElementById('loader');

    // 初始化：根据当前 iframe src 设置激活状态（如果是刷新页面）
    updateActiveState(contentFrame.getAttribute('src'));

    navItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.preventDefault();
            
            // 1. 获取目标 URL
            const targetUrl = item.getAttribute('data-url');
            const titleText = item.querySelector('span').innerText;

            if (!targetUrl) return;

            // 2. 更新 UI 激活状态
            updateActiveState(targetUrl);

            // 3. 更新标题
            pageTitle.innerText = titleText;

            // 4. 显示加载动画
            showLoader();

            // 5. 切换 iframe 源
            // 使用 setTimeout 模拟一点延迟，让加载动画可见，实际项目中可直接赋值
            setTimeout(() => {
                contentFrame.src = targetUrl;
            }, 300);
        });
    });
});

/**
 * 更新导航项的激活样式
 * @param {string} currentUrl - 当前激活的 URL
 */
function updateActiveState(currentUrl) {
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        const itemUrl = item.getAttribute('data-url');
        if (itemUrl === currentUrl) {
            item.classList.add('active');
            item.classList.remove('text-gray-600');
        } else {
            item.classList.remove('active');
            item.classList.add('text-gray-600');
        }
    });
}

/**
 * 显示加载动画
 */
function showLoader() {
    const loader = document.getElementById('loader');
    if (loader) loader.classList.remove('hidden');
}

/**
 * 隐藏加载动画
 */
function hideLoader() {
    const loader = document.getElementById('loader');
    if (loader) loader.classList.add('hidden');
}

/**
 * 处理加载错误
 */
function handleLoadError() {
    hideLoader();
    alert('页面加载失败，请检查文件路径是否正确。');
}
