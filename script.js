// 스무스 스크롤링
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
            target.scrollIntoView({
                behavior: "smooth",
                block: "start",
            });
        }
    });
});

// 예약 폼 처리
document
    .getElementById("reservationForm")
    .addEventListener("submit", function (e) {
        e.preventDefault();

        // 폼 데이터 수집
        const formData = new FormData(this);
        const data = {};

        for (let [key, value] of formData.entries()) {
            if (data[key]) {
                if (Array.isArray(data[key])) {
                    data[key].push(value);
                } else {
                    data[key] = [data[key], value];
                }
            } else {
                data[key] = value;
            }
        }

        // 간단한 유효성 검사
        if (!data.name || !data.email || !data.phone) {
            alert("필수 항목을 모두 입력해주세요.");
            return;
        }

        // 이메일 형식 검사
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(data.email)) {
            alert("올바른 이메일 형식을 입력해주세요.");
            return;
        }

        // 전화번호 형식 검사
        const phoneRegex = /^[0-9-+\s()]+$/;
        if (!phoneRegex.test(data.phone)) {
            alert("올바른 전화번호 형식을 입력해주세요.");
            return;
        }

        // 성공 메시지
        alert("사전예약이 성공적으로 신청되었습니다!\n곧 연락드리겠습니다.");

        // 폼 초기화
        this.reset();

        // 콘솔에 데이터 출력 (실제로는 서버로 전송)
        console.log("예약 데이터:", data);
    });

// 헤더 스크롤 효과
window.addEventListener("scroll", function () {
    const header = document.querySelector(".header");
    if (window.scrollY > 100) {
        header.style.background = "rgba(255, 255, 255, 0.95)";
        header.style.backdropFilter = "blur(10px)";
    } else {
        header.style.background = "#fff";
        header.style.backdropFilter = "none";
    }
});

// 통계 애니메이션
function animateNumbers() {
    const statNumbers = document.querySelectorAll(".stat-number");

    statNumbers.forEach((stat) => {
        const target = parseInt(stat.textContent.replace(/[^\d]/g, ""));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;

        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }

            if (stat.textContent.includes("%")) {
                stat.textContent = Math.floor(current) + "%";
            } else if (stat.textContent.includes("일")) {
                stat.textContent = Math.floor(current) + "일";
            } else {
                stat.textContent = Math.floor(current).toLocaleString();
            }
        }, 16);
    });
}

// 페이지 로드 시 애니메이션 실행
window.addEventListener("load", function () {
    setTimeout(animateNumbers, 500);
});

// 폼 입력 시 실시간 유효성 검사
document.querySelectorAll(".form-input").forEach((input) => {
    input.addEventListener("blur", function () {
        if (this.hasAttribute("required") && !this.value.trim()) {
            this.style.borderColor = "#e74c3c";
        } else {
            this.style.borderColor = "#e1e8ed";
        }
    });

    input.addEventListener("input", function () {
        if (this.style.borderColor === "rgb(231, 76, 60)") {
            this.style.borderColor = "#e1e8ed";
        }
    });
});
