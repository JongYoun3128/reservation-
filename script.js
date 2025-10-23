const url =
    "https://script.google.com/macros/s/AKfycbyiYzTH7VTrfMPs0WCETwIpjs0Ome-dtRVCkgb2zQitc3lJLA_EkdUOts2c7X1lNiJN9Q/exec";
const modal = document.querySelector(".modal");

const 실행하기 = async () => {
    const idName = document.getElementById("name").value;
    const idNumber = document.getElementById("phone").value;
    const address = document.getElementById("address").value;
    const idEmail = document.getElementById("email").value;
    if (!idName || !idNumber || !address || !idEmail) {
        alert("모든 필드를 작성해주세요.");
        return;
    }
    const modalText = document.getElementById("modal-text");

    // 조회
    const 결과 = await fetch(url);
    const 데이터 = await 결과.json();

    // 등록
    const res = await fetch(url, {
        redirect: "follow",
        method: "POST",
        headers: {
            "Content-Type": "text/plain;charset=utf-8",
        },
        body: JSON.stringify({
            name: idName,
            number: idNumber,
            address: address,
            email: idEmail,
        }),
    });
    const data = await res.json();

    document.getElementById("name").value = "";
    document.getElementById("phone").value = "";
    document.getElementById("address").value = "";
    document.getElementById("email").value = "";

    modal.style.display = "block";
    alert(
        Number(데이터.length) + 1 + "번째가 되셨습니다. 정보가 전송되었습니다"
    );
};
const modalClose = () => {
    const modalBtn = document.getElementById("close-btn");
    modal.style.display = "none";
};
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

        // // 간단한 유효성 검사
        // if (!data.name || !data.email || !data.phone) {
        //     alert("필수 항목을 모두 입력해주세요.");
        //     return;
        // }

        // // 이메일 형식 검사
        // const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        // if (!emailRegex.test(data.email)) {
        //     alert("올바른 이메일 형식을 입력해주세요.");
        //     return;
        // }

        // // 전화번호 형식 검사
        // const phoneRegex = /^[0-9-+\s()]+$/;
        // if (!phoneRegex.test(data.phone)) {
        //     alert("올바른 전화번호 형식을 입력해주세요.");
        //     return;
        // }

        // // 성공 메시지
        alert("사전예약이 성공적으로 신청되었습니다!\n잠시만 기다려 주세요.");

        // // 폼 초기화
        // this.reset();

        // // 콘솔에 데이터 출력 (실제로는 서버로 전송)
        // console.log("예약 데이터:", data);
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
const 조회하기 = async () => {
    const 결과 = await fetch(url);
    const 데이터 = await 결과.json();

    console.log(">>>> 데이터 ", 데이터);

    // 운영할 때 사용
    const param = {
        name: document.getElementById("rename").value,
        number: document.getElementById("rephone").value,
    };

    const 투자한결과리스트 = 데이터.filter((구글데이터) => {
        console.log(">>>> 구글데이터 ", 구글데이터);
        console.log(">>>> 구글데이터.이름 ", 구글데이터.이름);
        return (
            String(구글데이터.이름).trim() == param.name &&
            구글데이터.전화번호 == param.number
        );
    });

    console.log(">>>> 투자한결과리스트 ", 투자한결과리스트);
    document.getElementById("rename").value = "";
    document.getElementById("rephone").value = "";

    alert(
        `이름: ${param.name}\n전화번호: ${param.number}\n사전예약 횟수: ${투자한결과리스트.length}회`
    );
    document.querySelector(".reserch-modal").style.display = "none";
};
const reserchModalBtn = () => {
    const reserchModal = document.querySelector(".reserch-modal");
    reserchModal.style.display = "none";
};
const reModalOpen = () => {
    const reserchModal = document.querySelector(".reserch-modal");
    reserchModal.style.display = "block";
};
