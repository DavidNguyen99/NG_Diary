document.addEventListener('DOMContentLoaded', () => {
    // --- CẤU HÌNH ---
    const START_DATE = new Date("2025-12-21"); 

    // --- DOM ELEMENTS ---
    const envelopeWrapper = document.getElementById('envelopeBtn');
    const introScreen = document.getElementById('intro-screen');
    const listScreen = document.getElementById('list-screen');
    const bgMusic = document.getElementById('bgMusic');
    const daysCountEl = document.getElementById('daysCount');
    const timelineContainer = document.getElementById('timelineContainer'); // Chỗ chứa nhật ký
    const modal = document.getElementById('reader-modal');
    const closeModalBtn = document.getElementById('closeBtn');
    const paperCard = document.getElementById('paperCard');
    const modalDate = document.getElementById('modalDate');
    const modalTitle = document.getElementById('modalTitle');
    const modalContent = document.getElementById('modalContent');

    // --- 1. RENDER NHẬT KÝ (CÓ GIỜ) ---
    function renderDiary() {
        timelineContainer.innerHTML = '';

        diaryData.forEach((entry, index) => {
            const dateObj = new Date(entry.date);
            const day = dateObj.getDate().toString().padStart(2, '0');
            const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
            const month = monthNames[dateObj.getMonth()];
            const year = dateObj.getFullYear();
            
            // Format ngày tháng đẹp cho Modal
            const fullDateStr = `${day} ${month} ${year}`; 

            const html = `
                <article class="diary-entry" style="animation-delay: ${index * 0.1}s">
                    <div class="entry-date">
                        <span class="day">${day}</span>
                        <span class="month">${month}</span>
                        <span class="time-tag">${entry.time}</span>
                    </div>
                    <div class="entry-preview">
                        <h3>${entry.title}</h3>
                        <p>${entry.content}</p>
                    </div>
                    <div class="entry-icon"><i class="fas fa-heart"></i></div>
                </article>
            `;

            const tempDiv = document.createElement('div');
            tempDiv.innerHTML = html.trim();
            const articleEl = tempDiv.firstChild;

            articleEl.addEventListener('click', () => {
                // Khi click vào, hiển thị Ngày + Giờ trong modal
                modalDate.innerHTML = `${fullDateStr} <br><span style="font-size:0.6em; opacity:0.7">lúc ${entry.time}</span>`;
                modalTitle.innerText = entry.title;
                modalContent.innerText = entry.content;
                paperCard.classList.remove('flipped');
                modal.classList.add('show');
            });

            timelineContainer.appendChild(articleEl);
        });
    }

    // Gọi hàm render ngay khi chạy
    renderDiary();

    // --- 2. CÁC LOGIC CŨ (GIỮ NGUYÊN) ---
    function updateLoveDays() {
        const today = new Date();
        const diffTime = Math.abs(today - START_DATE);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
        daysCountEl.innerText = diffDays;
    }
    updateLoveDays();

    function createHearts() {
        const container = document.getElementById('bgHearts');
        setInterval(() => {
            const heart = document.createElement('div');
            heart.classList.add('floating-heart');
            heart.innerHTML = '❤';
            heart.style.left = Math.random() * 100 + 'vw';
            heart.style.animationDuration = Math.random() * 3 + 5 + 's'; 
            heart.style.fontSize = Math.random() * 20 + 10 + 'px';
            container.appendChild(heart);
            setTimeout(() => { heart.remove(); }, 8000);
        }, 500);
    }
    createHearts();

    envelopeWrapper.addEventListener('click', () => {
        envelopeWrapper.classList.add('open');
        bgMusic.volume = 0.5;
        bgMusic.play().catch(e => console.log("Cần chạm để phát nhạc"));
        setTimeout(() => {
            introScreen.classList.remove('active');
            listScreen.classList.add('active');
        }, 1500);
    });

    closeModalBtn.addEventListener('click', () => {
        modal.classList.remove('show');
    });

    paperCard.addEventListener('click', () => {
        paperCard.classList.toggle('flipped');
    });

    // --- LOGIC ĐỒNG HỒ THỰC TẾ ---
    function updateRealTime() {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        const timeString = `${hours}:${minutes}`;
        
        // Cả SG và HN cùng múi giờ, nhưng hiển thị riêng cho đẹp
        document.getElementById('saigonTime').innerText = timeString;
        document.getElementById('hanoiTime').innerText = timeString;
    }
    setInterval(updateRealTime, 1000); // Cập nhật mỗi giây
    updateRealTime(); // Chạy ngay lập tức
});