/**
 * Tracker 转换工具 Pro - 简化版集成脚本
 * 解决初始化问题的简化版本
 */

class SimpleTrackerApp {
    constructor() {
        this.version = '2.0.0';
        this.elements = {};
        this.init();
    }
    
    // 应用初始化
    init() {
        try {
            console.log(`🚀 初始化 Tracker 转换工具 Pro v${this.version}`);
            
            // 1. 获取DOM元素引用
            this.initElements();
            
            // 2. 设置基础事件监听
            this.setupBasicEventListeners();
            
            // 3. 初始化基础功能
            this.initBasicFeatures();
            
            // 4. 显示欢迎消息
            this.showWelcomeMessage();
            
            console.log('✅ 应用初始化完成');
            
        } catch (error) {
            console.error('❌ 应用初始化失败:', error);
            this.handleInitError(error);
        }
    }
    
    // 获取DOM元素引用
    initElements() {
        this.elements = {
            // 主要功能元素
            fetchBtn: document.getElementById('fetchBtn'),
            refreshBtn: document.getElementById('refreshBtn'),
            convertBtn: document.getElementById('convertBtn'),
            trackerList: document.getElementById('trackerList'),
            aria2Format: document.getElementById('aria2Format'),
            
            // 计数器和状态
            sourceCount: document.getElementById('sourceCount'),
            convertedCount: document.getElementById('convertedCount'),
            cacheStatus: document.getElementById('cacheStatus'),
            conversionStats: document.getElementById('conversionStats'),
            statusIndicator: document.getElementById('statusIndicator'),
            progressBar: document.getElementById('progressBar'),
            
            // 离线模式
            offlineMode: document.getElementById('offlineMode'),
            offlineTrackerOptions: document.getElementById('offlineTrackerOptions'),
            trackerCategory: document.getElementById('trackerCategory'),
            loadOfflineBtn: document.getElementById('loadOfflineBtn'),
            
            // 复制按钮
            copyPlainBtn: document.getElementById('copyPlainBtn'),
            copyFormattedBtn: document.getElementById('copyFormattedBtn'),
            copyJsonBtn: document.getElementById('copyJsonBtn'),
            
            // 快速操作按钮
            quickConvertBtn: document.getElementById('quickConvertBtn'),
            batchProcessBtn: document.getElementById('batchProcessBtn'),
            analyticsBtn: document.getElementById('analyticsBtn'),
            previewBtn: document.getElementById('previewBtn'),
            downloadBtn: document.getElementById('downloadBtn'),
            
            // 设置按钮
            settingsBtn: document.getElementById('settingsBtn'),
            aboutBtn: document.getElementById('aboutBtn')
        };
        
        // 验证必要元素
        const requiredElements = ['fetchBtn', 'convertBtn', 'trackerList', 'aria2Format'];
        const missingElements = requiredElements.filter(id => !this.elements[id]);
        
        if (missingElements.length > 0) {
            throw new Error(`缺少必要的DOM元素: ${missingElements.join(', ')}`);
        }
        
        console.log('✅ DOM元素引用初始化完成');
    }
    
    // 设置基础事件监听
    setupBasicEventListeners() {
        // 主要功能按钮
        this.elements.fetchBtn?.addEventListener('click', () => this.handleFetchTrackers());
        this.elements.refreshBtn?.addEventListener('click', () => this.handleRefreshTrackers());
        this.elements.convertBtn?.addEventListener('click', () => this.handleConvert());
        
        // 快速操作
        this.elements.quickConvertBtn?.addEventListener('click', () => this.handleQuickConvert());
        this.elements.downloadBtn?.addEventListener('click', () => this.handleDownload());
        
        // 复制按钮
        this.elements.copyPlainBtn?.addEventListener('click', () => this.handleCopyPlain());
        
        // 离线模式
        this.elements.offlineMode?.addEventListener('change', (e) => this.handleOfflineMode(e.target.checked));
        this.elements.loadOfflineBtn?.addEventListener('click', () => this.handleLoadOffline());
        
        // 输入变化
        this.elements.trackerList?.addEventListener('input', () => this.handleInputChange());
        
        // 设置按钮
        this.elements.aboutBtn?.addEventListener('click', () => this.handleAbout());
        
        console.log('✅ 事件监听器设置完成');
    }
    
    // 初始化基础功能
    initBasicFeatures() {
        // 设置初始状态
        this.updateStatusIndicator('success');
        
        // 检查缓存
        this.updateCacheStatus();
        
        // 初始化离线模式选项
        this.initOfflineOptions();
    }
    
    // 初始化离线选项
    initOfflineOptions() {
        const select = this.elements.trackerCategory;
        if (!select) return;
        
        // 清空并添加选项
        select.innerHTML = `
            <option value="all">全部 Tracker</option>
            <option value="premium">高质量公共</option>
            <option value="http">HTTP Tracker</option>
            <option value="udp">UDP Tracker</option>
            <option value="websocket">WebSocket Tracker</option>
            <option value="china">中国大陆优化</option>
            <option value="ipv6">IPv6 支持</option>
        `;
    }
    
    // 处理获取Tracker
    async handleFetchTrackers() {
        try {
            this.setLoadingState(true);
            this.updateStatusIndicator('loading');
            this.showNotification('正在获取最新Tracker列表...', 'info');
            
            // API端点列表
            const apiEndpoints = [
                'https://cdn.jsdelivr.net/gh/ngosang/trackerslist@master/trackers_all.txt',
                'https://fastly.jsdelivr.net/gh/ngosang/trackerslist@master/trackers_all.txt',
                'https://gcore.jsdelivr.net/gh/ngosang/trackerslist@master/trackers_all.txt',
                'https://pxy.3328.eu.org/proxy?url=https://raw.githubusercontent.com/ngosang/trackerslist/master/trackers_all.txt'
            ];
            
            let success = false;
            let lastError = null;
            
            for (const endpoint of apiEndpoints) {
                try {
                    console.log(`尝试从 ${endpoint} 获取...`);
                    
                    const controller = new AbortController();
                    const timeoutId = setTimeout(() => controller.abort(), 8000);
                    
                    const response = await fetch(endpoint, {
                        signal: controller.signal,
                        headers: {
                            'Accept': 'text/plain',
                            'Cache-Control': 'no-cache'
                        }
                    });
                    
                    clearTimeout(timeoutId);
                    
                    if (!response.ok) {
                        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
                    }
                    
                    const data = await response.text();
                    
                    if (!data || data.trim().length === 0) {
                        throw new Error('返回数据为空');
                    }
                    
                    // 成功获取数据
                    this.elements.trackerList.value = data;
                    this.handleInputChange();
                    
                    // 保存到缓存
                    this.saveToCache(data);
                    
                    this.showNotification('Tracker列表获取成功！', 'success');
                    this.updateStatusIndicator('success');
                    success = true;
                    break;
                    
                } catch (error) {
                    console.warn(`从 ${endpoint} 获取失败:`, error);
                    lastError = error;
                }
            }
            
            if (!success) {
                throw lastError || new Error('所有API源都无法访问');
            }
            
        } catch (error) {
            console.error('获取Tracker失败:', error);
            this.showNotification(`获取失败: ${error.message}`, 'danger');
            this.updateStatusIndicator('error');
            
            // 提供备用选项
            setTimeout(() => {
                if (confirm('获取失败，是否加载内置的备用Tracker列表？')) {
                    this.loadBackupTrackers();
                }
            }, 1000);
        } finally {
            this.setLoadingState(false);
        }
    }
    
    // 处理刷新
    async handleRefreshTrackers() {
        this.clearCache();
        await this.handleFetchTrackers();
    }
    
    // 处理转换
    handleConvert() {
        try {
            const trackerText = this.elements.trackerList.value.trim();
            
            if (!trackerText) {
                this.showNotification('请先输入或获取Tracker列表', 'warning');
                return;
            }
            
            this.setLoadingState(true);
            this.updateProgress(0);
            
            // 模拟进度
            let progress = 0;
            const progressInterval = setInterval(() => {
                progress += 20;
                this.updateProgress(progress);
                if (progress >= 100) {
                    clearInterval(progressInterval);
                    this.executeConversion(trackerText);
                }
            }, 100);
            
        } catch (error) {
            console.error('转换失败:', error);
            this.showNotification(`转换失败: ${error.message}`, 'danger');
            this.setLoadingState(false);
        }
    }
    
    // 执行转换
    executeConversion(trackerText) {
        try {
            const trackers = this.parseTrackers(trackerText);
            
            if (trackers.length === 0) {
                this.showNotification('未找到有效的Tracker', 'warning');
                return;
            }
            
            // 验证和转换
            let validCount = 0;
            let invalidCount = 0;
            
            const aria2Format = trackers.map(tracker => {
                if (this.isValidTracker(tracker)) {
                    validCount++;
                    return `bt-tracker=${tracker}`;
                } else {
                    invalidCount++;
                    return null;
                }
            }).filter(t => t !== null).join('\n');
            
            // 添加头部注释
            const header = `# Aria2 BT Tracker 配置\n# 生成时间: ${new Date().toLocaleString()}\n# 总计: ${validCount} 个有效Tracker\n\n`;
            const result = header + aria2Format;
            
            // 更新结果
            this.elements.aria2Format.value = result;
            this.updateCounter(this.elements.convertedCount, validCount, '有效');
            
            // 更新统计
            this.updateConversionStats(trackers);
            
            this.showNotification('转换完成！', 'success');
            
        } catch (error) {
            this.showNotification(`转换失败: ${error.message}`, 'danger');
        } finally {
            this.setLoadingState(false);
            this.hideProgress();
        }
    }
    
    // 处理快速转换
    async handleQuickConvert() {
        if (confirm('快速转换将自动获取最新Tracker列表并转换，是否继续？')) {
            await this.handleFetchTrackers();
            setTimeout(() => this.handleConvert(), 500);
        }
    }
    
    // 处理复制
    handleCopyPlain() {
        try {
            const text = this.elements.aria2Format.value.trim();
            
            if (!text) {
                this.showNotification('没有内容可复制', 'warning');
                return;
            }
            
            // 尝试现代API
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(text).then(() => {
                    this.showNotification('已复制到剪贴板！', 'success');
                }).catch(() => {
                    this.fallbackCopy(text);
                });
            } else {
                this.fallbackCopy(text);
            }
            
        } catch (error) {
            this.showNotification(`复制失败: ${error.message}`, 'danger');
        }
    }
    
    // 备用复制方法
    fallbackCopy(text) {
        try {
            const textArea = document.createElement('textarea');
            textArea.value = text;
            textArea.style.position = 'fixed';
            textArea.style.top = '-9999px';
            document.body.appendChild(textArea);
            textArea.select();
            
            const successful = document.execCommand('copy');
            document.body.removeChild(textArea);
            
            if (successful) {
                this.showNotification('已复制到剪贴板！', 'success');
            } else {
                this.showNotification('复制失败，请手动复制', 'warning');
            }
        } catch (error) {
            this.showNotification('复制失败，请手动复制', 'warning');
        }
    }
    
    // 处理下载
    handleDownload() {
        const content = this.elements.aria2Format.value.trim();
        if (!content) {
            this.showNotification('没有内容可下载', 'warning');
            return;
        }
        
        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = `aria2-trackers-${new Date().toISOString().split('T')[0]}.conf`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        this.showNotification('文件已下载', 'success');
    }
    
    // 处理离线模式
    handleOfflineMode(enabled) {
        const options = this.elements.offlineTrackerOptions;
        if (options) {
            options.style.display = enabled ? 'block' : 'none';
        }
        
        const fetchBtn = this.elements.fetchBtn;
        if (fetchBtn) {
            fetchBtn.disabled = enabled;
        }
    }
    
    // 处理加载离线列表
    handleLoadOffline() {
        const category = this.elements.trackerCategory?.value || 'all';
        const trackers = this.getOfflineTrackers(category);
        
        if (trackers) {
            this.elements.trackerList.value = trackers;
            this.handleInputChange();
            this.showNotification(`已加载${category === 'all' ? '全部' : category} Tracker列表`, 'info');
        }
    }
    
    // 获取离线Tracker列表
    getOfflineTrackers(category) {
        const offlineData = {
            all: `http://tracker.opentrackr.org:1337/announce
udp://open.tracker.cl:1337/announce
udp://tracker.openbittorrent.com:6969/announce
udp://opentracker.i2p.rocks:6969/announce
udp://tracker.torrent.eu.org:451/announce
udp://open.stealth.si:80/announce
udp://exodus.desync.com:6969/announce
http://tracker.gbitt.info:80/announce
udp://tracker.tiny-vps.com:6969/announce
udp://tracker.dler.org:6969/announce`,
            
            premium: `http://tracker.opentrackr.org:1337/announce
udp://tracker.opentrackr.org:1337/announce
udp://open.tracker.cl:1337/announce
udp://tracker.openbittorrent.com:6969/announce
udp://tracker.torrent.eu.org:451/announce
udp://open.stealth.si:80/announce`,
            
            http: `http://tracker.opentrackr.org:1337/announce
http://tracker.gbitt.info:80/announce
http://open.acgnxtracker.com:80/announce
https://tracker.imgoingto.icu:443/announce`,
            
            udp: `udp://open.tracker.cl:1337/announce
udp://tracker.openbittorrent.com:6969/announce
udp://tracker.torrent.eu.org:451/announce
udp://open.stealth.si:80/announce
udp://exodus.desync.com:6969/announce`,
            
            websocket: `wss://tracker.btorrent.xyz:443/announce
wss://tracker.openwebtorrent.com:443/announce
wss://tracker.files.fm:7073/announce`,
            
            china: `http://tracker.gbitt.info:80/announce
udp://tracker.dler.org:6969/announce
http://open.acgnxtracker.com:80/announce`,
            
            ipv6: `http://tracker.ipv6tracker.org:80/announce
udp://tracker.opentrackr.org:1337/announce`
        };
        
        return offlineData[category] || offlineData.all;
    }
    
    // 加载备用Tracker
    loadBackupTrackers() {
        const backup = this.getOfflineTrackers('premium');
        this.elements.trackerList.value = backup;
        this.handleInputChange();
        this.showNotification('已加载备用Tracker列表', 'info');
    }
    
    // 处理输入变化
    handleInputChange() {
        const trackers = this.parseTrackers(this.elements.trackerList.value);
        this.updateCounter(this.elements.sourceCount, trackers.length, '');
    }
    
    // 处理关于
    handleAbout() {
        alert(`Tracker 转换工具 Pro v${this.version}

一个功能强大的 BT Tracker 列表转换工具

主要特性：
• 智能多源获取
• 自动缓存系统
• 离线模式支持
• 多格式输出
• 高级复制功能

使用方法：
1. 点击"获取最新"获取Tracker列表
2. 点击"智能转换"进行格式转换
3. 使用复制按钮复制结果到剪贴板

快捷键：
• 快速转换：一键获取并转换
• 离线模式：使用内置高质量列表`);
    }
    
    // 工具方法
    parseTrackers(text) {
        return text.split('\n')
            .map(t => t.trim())
            .filter(t => t !== '' && !t.startsWith('#'));
    }
    
    isValidTracker(tracker) {
        try {
            const url = new URL(tracker);
            const validProtocols = ['http:', 'https:', 'udp:', 'ws:', 'wss:'];
            return validProtocols.includes(url.protocol) && url.pathname.includes('/announce');
        } catch {
            return false;
        }
    }
    
    updateCounter(element, count, type) {
        if (!element) return;
        
        if (count > 0) {
            element.textContent = `${count} 个${type}Tracker`;
            element.style.display = 'block';
        } else {
            element.textContent = '';
            element.style.display = 'none';
        }
    }
    
    updateStatusIndicator(status) {
        const indicator = this.elements.statusIndicator;
        if (!indicator) return;
        
        const colors = {
            success: '#198754',
            loading: '#ffc107',
            error: '#dc3545',
            offline: '#6c757d'
        };
        
        indicator.style.background = colors[status] || colors.success;
        indicator.title = this.getStatusText(status);
    }
    
    getStatusText(status) {
        const texts = {
            success: '系统正常',
            loading: '处理中...',
            error: '发生错误',
            offline: '离线模式'
        };
        return texts[status] || '未知状态';
    }
    
    updateCacheStatus() {
        const cacheStatus = this.elements.cacheStatus;
        if (!cacheStatus) return;
        
        try {
            const cached = localStorage.getItem('tracker_cache');
            if (cached) {
                const data = JSON.parse(cached);
                const cacheTime = new Date(data.timestamp).toLocaleString();
                cacheStatus.textContent = `缓存: ${cacheTime}`;
            } else {
                cacheStatus.textContent = '';
            }
        } catch {
            cacheStatus.textContent = '';
        }
    }
    
    updateConversionStats(trackers) {
        const statsElement = this.elements.conversionStats;
        if (!statsElement) return;
        
        const protocols = {};
        trackers.forEach(tracker => {
            try {
                const url = new URL(tracker);
                const protocol = url.protocol.slice(0, -1);
                protocols[protocol] = (protocols[protocol] || 0) + 1;
            } catch {}
        });
        
        const protocolText = Object.entries(protocols)
            .map(([protocol, count]) => `${protocol.toUpperCase()}(${count})`)
            .join(' ');
        
        statsElement.textContent = `协议分布: ${protocolText}`;
    }
    
    setLoadingState(loading) {
        const buttons = [this.elements.fetchBtn, this.elements.convertBtn, this.elements.quickConvertBtn];
        
        buttons.forEach(btn => {
            if (btn) {
                btn.disabled = loading;
                if (loading && !btn.innerHTML.includes('loading-spinner')) {
                    const icon = btn.querySelector('i');
                    if (icon) {
                        icon.className = 'loading-spinner';
                    }
                } else if (!loading) {
                    const spinner = btn.querySelector('.loading-spinner');
                    if (spinner) {
                        // 恢复原始图标
                        spinner.className = btn.id === 'fetchBtn' ? 'bi bi-cloud-download' : 
                                          btn.id === 'convertBtn' ? 'bi bi-arrow-repeat' : 
                                          'bi bi-play-fill';
                    }
                }
            }
        });
    }
    
    updateProgress(percent) {
        const progressBar = this.elements.progressBar;
        if (!progressBar) return;
        
        progressBar.style.display = 'block';
        const bar = progressBar.querySelector('.progress-bar');
        if (bar) {
            bar.style.width = `${percent}%`;
        }
    }
    
    hideProgress() {
        const progressBar = this.elements.progressBar;
        if (progressBar) {
            setTimeout(() => {
                progressBar.style.display = 'none';
            }, 500);
        }
    }
    
    saveToCache(data) {
        try {
            const cacheData = {
                data: data,
                timestamp: new Date().toISOString()
            };
            localStorage.setItem('tracker_cache', JSON.stringify(cacheData));
            this.updateCacheStatus();
        } catch (error) {
            console.warn('保存缓存失败:', error);
        }
    }
    
    clearCache() {
        try {
            localStorage.removeItem('tracker_cache');
            this.updateCacheStatus();
        } catch (error) {
            console.warn('清除缓存失败:', error);
        }
    }
    
    showNotification(message, type = 'info') {
        // 创建简单的通知
        const notification = document.createElement('div');
        notification.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
        notification.style.cssText = 'top: 20px; right: 20px; z-index: 9999; max-width: 400px;';
        
        const icons = {
            success: 'bi-check-circle-fill',
            info: 'bi-info-circle-fill',
            warning: 'bi-exclamation-triangle-fill',
            danger: 'bi-x-circle-fill'
        };
        
        notification.innerHTML = `
            <div class="d-flex align-items-center">
                <i class="bi ${icons[type] || icons.info} me-2"></i>
                <div class="flex-grow-1">${message}</div>
                <button type="button" class="btn-close" onclick="this.parentElement.parentElement.remove()"></button>
            </div>
        `;
        
        document.body.appendChild(notification);
        
        // 3秒后自动移除
        setTimeout(() => {
            if (notification.parentNode) {
                notification.classList.remove('show');
                setTimeout(() => notification.remove(), 300);
            }
        }, 3000);
    }
    
    showWelcomeMessage() {
        this.showNotification(`欢迎使用 Tracker 转换工具 Pro v${this.version}！所有功能已就绪。`, 'success');
    }
    
    handleInitError(error) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'alert alert-danger position-fixed';
        errorDiv.style.cssText = 'top: 20px; right: 20px; z-index: 9999; max-width: 400px;';
        errorDiv.innerHTML = `
            <h6><i class="bi bi-exclamation-triangle"></i> 初始化失败</h6>
            <p class="mb-2">${error.message}</p>
            <button class="btn btn-sm btn-outline-danger" onclick="location.reload()">
                <i class="bi bi-arrow-clockwise"></i> 重新加载
            </button>
        `;
        document.body.appendChild(errorDiv);
    }
}

// 导出类
window.SimpleTrackerApp = SimpleTrackerApp;

console.log('📦 简化版应用脚本加载完成');