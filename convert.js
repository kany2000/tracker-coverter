// 确保DOM完全加载后再执行
document.addEventListener('DOMContentLoaded', (event) => {
    document.getElementById('fetchBtn').addEventListener('click', function() {
        // 显示加载中状态（可选）
        document.getElementById('trackerList').value = 'Fetching trackers...';

        // 请求数据
        fetch('https://raw.githubusercontent.com/ngosang/trackerslist/master/trackers_all.txt')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.text();
            })
            .then(data => {
                // 清除加载中状态
                document.getElementById('trackerList').value = data;
            })
            .catch(error => {
                console.error('There has been a problem with your fetch operation:', error);
                // 错误处理，可以显示错误信息给用户
                document.getElementById('trackerList').value = 'Error fetching trackers: ' + error.message;
            });
    });

    // 保持原有的转换功能
    document.getElementById('convertBtn').addEventListener('click', function() {
        var trackerList = document.getElementById('trackerList').value;
        var trackers = trackerList.split('\n').filter(t => t.trim() !== '');
        
        var aria2Format = trackers.map(t => {
            t = t.trim();
            return `bt-tracker=${t}`;
        }).join('\n');
        
        document.getElementById('aria2Format').value = aria2Format;
    });
});
