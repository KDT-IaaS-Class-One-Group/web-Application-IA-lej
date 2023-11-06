// index.js (클라이언트 측 JavaScript)

document.addEventListener("DOMContentLoaded", () => {
    const hamburgerMenuIcon = document.querySelector(".fa-bars");
    const topAppbar = document.getElementById("topAppbar");
    const inputElement = document.querySelector("#inputAndButton input");
    const buttonElement = document.querySelector("#inputAndButton button");
    const chatHistory = document.getElementById("chatHistory");
    const rightBar = document.getElementById("rightBar");
    const inputAndButton = document.getElementById("inputAndButton")

    const logo = document.createElement('div')
    topAppbar.appendChild(logo);
    
    
    // 햄버거 메뉴 토글 기능
    let isMenuOpen = false;
    hamburgerMenuIcon.addEventListener("click", () => {
      isMenuOpen = !isMenuOpen;
      topAppbar.style.display = isMenuOpen ? "block" : "none";
    });
  
    // 메시지 추가 함수
    function appendMessage(type, message, timestamp) {
      const messageElement = document.createElement("div");
      messageElement.classList.add(type);
      messageElement.innerText = `${message} (${timestamp})`;
      chatHistory.appendChild(messageElement);
    }
  
    // 사용자 정보 표시
    const userInfo = {
      name: "John Doe",
      status: "Online",
      avatar: "👤"
    };

    const makediv=document.createElement("div")
    inputAndButton.appendChild(makediv)
    makediv.innerHTML = `
      <div class="user-info">
        <div class="avatar">${userInfo.avatar}</div>
        <div class="name">${userInfo.name}</div>
        <div class="status">${userInfo.status}</div>
      </div>
    `;
  
    // 메시지 전송 버튼 클릭 시
    buttonElement.addEventListener("click", () => {
      const userMessage = inputElement.value;
      if (userMessage) {
        // 서버로 데이터를 전송하고 메시지를 추가하는 로직을 구현해야 합니다.
        // 여기에서는 간단히 메시지만 추가합니다.
        const timestamp = new Date().toLocaleTimeString();
        appendMessage("user", userMessage, timestamp);
        inputElement.value = ""; // 입력 필드 비우기
  
        // 서버로 메시지 전송 및 서버 응답 처리
        // 서버로의 POST 요청 및 데이터 저장 (JSON 파일) 로직 추가
        // 서버로부터 응답을 받아와서 오른쪽 입력 기록창에 추가 (GET 요청) 로직 추가
      }
    });
  
    // 예시 메시지 추가
    const exampleMessages = [
      {
        type: "user",
        message: "How does OpenAI work?",
        timestamp: "10:23 AM"
      },
      {
        type: "assistant",
        message: "OpenAI is a machine learning model...",
        timestamp: "10:24 AM"
      }
    ];
  
    exampleMessages.forEach((message) => {
      appendMessage(message.type, message.message, message.timestamp);
    });
  });
  
